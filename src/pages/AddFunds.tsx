import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, QrCode, ArrowRight } from "lucide-react";

export default function AddFunds() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Add Funds</h2>
          <p className="text-slate-400 text-sm mt-1">Top up your balance using cryptocurrency.</p>
        </div>
        <div className="bg-[#1a1e28] px-4 py-2 rounded-lg border border-slate-800/60 flex items-center gap-3">
          <Wallet className="w-5 h-5 text-slate-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Current Balance</span>
            <span className="text-emerald-400 font-bold leading-none">$0.00</span>
          </div>
        </div>
      </div>

      <Card className="bg-[#1a1e28] border-slate-800/60 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-200">Deposit Form</CardTitle>
          <CardDescription className="text-slate-400">Select your preferred asset and amount.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider font-semibold">Cryptocurrency</Label>
              <Select defaultValue="btc">
                <SelectTrigger className="bg-[#111318] border-slate-700/50 h-12 text-base">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1e28] border-slate-700">
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ltc">Litecoin (LTC)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT - TRC20)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs uppercase tracking-wider font-semibold">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <Input type="number" placeholder="0.00" className="pl-8 bg-[#111318] border-slate-700/50 h-12 text-base font-medium" />
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm text-blue-200/80 leading-relaxed">
              <strong className="text-blue-300 font-semibold">Note:</strong> Deposits require 1 network confirmation. Your account balance will be updated automatically once the transaction is confirmed on the blockchain. Minimum deposit is $10.00.
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-800/60 bg-[#161a22]/50 p-6">
          <Button className="w-full md:w-auto md:ml-auto bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 h-12 px-8 text-base font-medium">
            <QrCode className="w-5 h-5 mr-2" />
            Generate Payment Address
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
