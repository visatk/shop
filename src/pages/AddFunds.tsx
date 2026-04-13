import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, QrCode, Copy, CheckCircle2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export default function AddFunds() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("btc");
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);

  // Fetch user balance
  useEffect(() => {
    fetch('/api/v1/balance')
      .then(res => res.json())
      .then(data => setBalance(data.balance || 0));
  }, []);

  const handleDeposit = async () => {
    const usdAmount = parseFloat(amount);
    if (isNaN(usdAmount) || usdAmount < 10) {
      toast.error("Minimum deposit is $10.00");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: usdAmount, currency })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setInvoice(data);
      toast.success("Payment invoice generated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate invoice");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Add Funds</h2>
          <p className="text-slate-400 text-sm mt-1">Top up your balance using cryptocurrency.</p>
        </div>
        <div className="bg-[#151822] px-4 py-2 rounded-lg border border-[#1F2433] flex items-center gap-3">
          <Wallet className="w-5 h-5 text-slate-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Current Balance</span>
            <span className="text-emerald-400 font-bold leading-none">${balance.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {!invoice ? (
        <Card className="bg-[#151822] border-[#1F2433] shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200">Deposit Form</CardTitle>
            <CardDescription className="text-slate-400">Select your preferred asset and amount.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300 text-[11px] uppercase tracking-wider font-semibold">Cryptocurrency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-[#090B10] border-[#1F2433] h-11 text-sm focus:ring-1 focus:ring-blue-500/50">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151822] border-[#1F2433]">
                    <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ltc">Litecoin (LTC)</SelectItem>
                    <SelectItem value="usdt@trx">Tether (USDT - TRC20)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-[11px] uppercase tracking-wider font-semibold">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                  <Input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="10.00" 
                    min="10"
                    className="pl-8 bg-[#090B10] border-[#1F2433] h-11 text-sm focus-visible:ring-1 focus-visible:ring-blue-500/50 transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 shadow-inner">
              <p className="text-sm text-blue-200/80 leading-relaxed">
                <strong className="text-blue-300 font-semibold">Note:</strong> Deposits require 1 network confirmation. Your account balance will be updated automatically once the transaction is confirmed on the blockchain via Apirone. Minimum deposit is $10.00.
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#1F2433] bg-[#11141D] p-6">
            <Button onClick={handleDeposit} disabled={loading} className="w-full md:w-auto md:ml-auto bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.25)] h-11 px-8 text-sm font-medium transition-all">
              <QrCode className="w-4 h-4 mr-2" />
              {loading ? "Processing..." : "Generate Payment Address"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-[#151822] border-[#1F2433] shadow-lg animate-in fade-in zoom-in duration-300">
          <CardHeader className="border-b border-[#1F2433] bg-[#11141D]/50 text-center pb-8 pt-8">
             <div className="mx-auto bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
             </div>
            <CardTitle className="text-2xl text-white">Awaiting Payment</CardTitle>
            <CardDescription className="text-slate-400 mt-2 max-w-md mx-auto">
              Please send exactly <strong className="text-white">{(invoice.amount_crypto / (invoice.currency.includes('usdt') ? 1000000 : 100000000)).toFixed(8)} {invoice.currency.toUpperCase()}</strong> to the address below.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="bg-[#090B10] border border-[#1F2433] rounded-xl p-4 flex flex-col items-center gap-4">
              {/* Optional: Add QR Code Library Here */}
              <div className="w-48 h-48 bg-white p-2 rounded-lg flex items-center justify-center">
                 {/* QR code fallback text */}
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${invoice.currency}:${invoice.address}?amount=${invoice.amount_crypto / 100000000}`} alt="QR Code" />
              </div>
              <div className="w-full space-y-2">
                <Label className="text-slate-400 text-xs uppercase tracking-wider text-center block">Payment Address</Label>
                <div className="flex gap-2">
                  <Input readOnly value={invoice.address} className="bg-[#151822] border-[#1F2433] font-mono text-center text-blue-400" />
                  <Button variant="outline" className="border-[#1F2433] hover:bg-[#1F2433]" onClick={() => copyToClipboard(invoice.address)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#1F2433] bg-[#11141D] p-6 flex flex-col gap-4">
            <Button variant="link" className="w-full text-slate-400 border-[#1F2433]" onClick={() => window.open(invoice.invoice_url, '_blank')}>
               View Invoice Status <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="ghost" onClick={() => setInvoice(null)} className="w-full text-slate-500">Go Back</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
