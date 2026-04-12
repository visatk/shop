import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, QrCode } from "lucide-react";

export default function AddFunds() {
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
            <span className="text-emerald-400 font-bold leading-none">$0.00</span>
          </div>
        </div>
      </div>

      <Card className="bg-[#151822] border-[#1F2433] shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-slate-200">Deposit Form</CardTitle>
          <CardDescription className="text-slate-400">Select your preferred asset and amount.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-300 text-[11px] uppercase tracking-wider font-semibold">Cryptocurrency</Label>
              <Select defaultValue="btc">
                <SelectTrigger className="bg-[#090B10] border-[#1F2433] h-11 text-sm focus:ring-1 focus:ring-blue-500/50">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent className="bg-[#151822] border-[#1F2433]">
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ltc">Litecoin (LTC)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT - TRC20)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-[11px] uppercase tracking-wider font-semibold">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                <Input type="number" placeholder="0.00" className="pl-8 bg-[#090B10] border-[#1F2433] h-11 text-sm focus-visible:ring-1 focus-visible:ring-blue-500/50 transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 shadow-inner">
            <p className="text-sm text-blue-200/80 leading-relaxed">
              <strong className="text-blue-300 font-semibold">Note:</strong> Deposits require 1 network confirmation. Your account balance will be updated automatically once the transaction is confirmed on the blockchain. Minimum deposit is $10.00.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t border-[#1F2433] bg-[#11141D] p-6">
          <Button className="w-full md:w-auto md:ml-auto bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.25)] h-11 px-8 text-sm font-medium transition-all">
            <QrCode className="w-4 h-4 mr-2" />
            Generate Payment Address
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
