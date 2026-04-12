export interface Env {
  // Bindings like KV, D1, or Variables would be declared here
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*", // Restrict this to your specific domain in production
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Proxy API requests
    if (url.pathname.startsWith('/api/v1/cards')) {
      // Reconstruct the URL pointing to the external API while preserving query parameters
      const targetUrl = new URL(url.pathname + url.search, 'https://gen.visatk.us');

      // Create a fresh request to avoid passing incompatible browser headers (like Host)
      const proxyRequest = new Request(targetUrl.toString(), {
        method: request.method,
        headers: {
          "Accept": "application/json",
          "User-Agent": "Visatk-Cloudflare-Worker-Proxy/1.0",
        },
      });

      try {
        const response = await fetch(proxyRequest);
        
        // We clone the response to allow modifying headers before returning it to the browser
        const proxyResponse = new Response(response.body, response);
        
        // Ensure the frontend can read the response
        proxyResponse.headers.set("Access-Control-Allow-Origin", "*");
        
        return proxyResponse;
      } catch (error) {
        console.error("Worker Proxy Error:", error);
        return new Response(JSON.stringify({ error: "Bad Gateway", details: "Failed to connect to upstream API." }), {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    // Default response for unmatched routes
    return new Response(JSON.stringify({ error: "Not Found" }), { 
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  },
};
