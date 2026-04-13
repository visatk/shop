export interface Env {
  DB: D1Database;
  APIRONE_ACCOUNT: string;
  APP_URL: string; // The public URL of your worker for callbacks, e.g. "https://api.yourdomain.com"
}

// Utility: Convert USD to minor crypto units (Satoshi, etc.) using Apirone Ticker
async function getCryptoAmount(usdAmount: number, currency: string): Promise<number> {
  const res = await fetch(`https://apirone.com/api/v2/ticker?currency=${currency}`);
  if (!res.ok) throw new Error("Failed to fetch rate");
  const data: any = await res.json();
  const rateUsd = data.usd; 
  
  // Apirone uses minor units: BTC/LTC = 10^8, USDT (TRC20/ERC20) = 10^6
  const decimals = currency.startsWith('usdt') || currency.startsWith('usdc') ? 1000000 : 100000000;
  return Math.floor((usdAmount / rateUsd) * decimals);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...corsHeaders, "Access-Control-Max-Age": "86400" } });
    }

    // Mocked Auth User for demonstration. In production, decode JWT from `Authorization` header.
    const userId = 1; 

    try {
      /* ==========================================
         [1] CREATE DEPOSIT INVOICE (APIRONE API)
         ========================================== */
      if (url.pathname === '/api/v1/deposit' && request.method === 'POST') {
        const { currency, amountUsd } = await request.json() as any;
        if (!currency || amountUsd < 10) return new Response(JSON.stringify({ error: "Minimum deposit is $10" }), { status: 400, headers: corsHeaders });

        const cryptoAmount = await getCryptoAmount(amountUsd, currency);
        
        // Generate Apirone Invoice
        const apironeRes = await fetch(`https://apirone.com/api/v2/accounts/${env.APIRONE_ACCOUNT}/invoices`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: cryptoAmount,
            currency: currency,
            lifetime: 3600, // 1 hour
            callback_url: `${env.APP_URL}/api/v1/apirone/callback`,
            "user-data": {
              title: "Account Top-up",
              merchant: "Visatk",
              price: `$${amountUsd}`,
            }
          })
        });

        const invoice = await apironeRes.json() as any;

        // Store invoice state in D1 as pending
        await env.DB.prepare(
          "INSERT INTO invoices (id, user_id, amount_usd, crypto_currency, crypto_amount, address, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(invoice.invoice, userId, amountUsd, currency, cryptoAmount, invoice.address, 'created').run();

        return new Response(JSON.stringify({
          invoice_id: invoice.invoice,
          address: invoice.address,
          amount_crypto: cryptoAmount,
          currency: invoice.currency,
          expire: invoice.expire,
          invoice_url: invoice['invoice-url']
        }), { headers: corsHeaders });
      }

      /* ==========================================
         [2] APIRONE CALLBACK WEBHOOK
         ========================================== */
      if (url.pathname === '/api/v1/apirone/callback' && request.method === 'POST') {
        const callbackData = await request.json() as any;
        const { invoice, status } = callbackData;

        // Verify the invoice exists
        const dbInvoice = await env.DB.prepare("SELECT * FROM invoices WHERE id = ?").bind(invoice).first();
        if (!dbInvoice) return new Response("*error*", { status: 404 });

        // Update invoice status
        await env.DB.prepare("UPDATE invoices SET status = ? WHERE id = ?").bind(status, invoice).run();

        // If paid or completed, credit the user
        if ((status === 'paid' || status === 'completed') && dbInvoice.status !== 'completed' && dbInvoice.status !== 'paid') {
          await env.DB.prepare("UPDATE users SET balance = balance + ? WHERE id = ?").bind(dbInvoice.amount_usd, dbInvoice.user_id).run();
        }

        // Apirone expects *ok* in plain text
        return new Response("*ok*", { headers: { "Content-Type": "text/plain" } });
      }

      /* ==========================================
         [3] GET USER BALANCE
         ========================================== */
      if (url.pathname === '/api/v1/balance' && request.method === 'GET') {
        const user = await env.DB.prepare("SELECT balance FROM users WHERE id = ?").bind(userId).first() as any;
        return new Response(JSON.stringify({ balance: user?.balance || 0 }), { headers: corsHeaders });
      }

      /* ==========================================
         [4] PURCHASE A CARD
         ========================================== */
      if (url.pathname === '/api/v1/purchase' && request.method === 'POST') {
        const { cardId, price } = await request.json() as any;
        
        // Use a D1 Transaction (Batch) to ensure safety
        const user = await env.DB.prepare("SELECT balance FROM users WHERE id = ?").bind(userId).first() as any;
        if (!user || user.balance < price) {
          return new Response(JSON.stringify({ error: "Insufficient funds. Please top up your balance." }), { status: 400, headers: corsHeaders });
        }

        // Deduct balance and assign card
        await env.DB.batch([
          env.DB.prepare("UPDATE users SET balance = balance - ? WHERE id = ?").bind(price, userId),
          env.DB.prepare("UPDATE cards SET sold_to = ?, sold_at = CURRENT_TIMESTAMP WHERE id = ? AND sold_to IS NULL").bind(userId, cardId)
        ]);

        return new Response(JSON.stringify({ success: true, message: "Purchase successful!" }), { headers: corsHeaders });
      }

      // Proxy API requests for the Marketplace table
      if (url.pathname.startsWith('/api/v1/cards')) {
        const targetUrl = new URL(url.pathname + url.search, 'https://gen.visatk.us');
        const proxyRequest = new Request(targetUrl.toString(), {
          method: request.method,
          headers: { "Accept": "application/json", "User-Agent": "Visatk-Cloudflare-Worker-Proxy/1.0" },
        });

        try {
          const response = await fetch(proxyRequest);
          const proxyResponse = new Response(response.body, response);
          proxyResponse.headers.set("Access-Control-Allow-Origin", "*");
          return proxyResponse;
        } catch (error) {
          return new Response(JSON.stringify({ error: "Bad Gateway" }), { status: 502, headers: corsHeaders });
        }
      }

      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404, headers: corsHeaders });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: "Internal Server Error", details: e.message }), { status: 500, headers: corsHeaders });
    }
  },
};
