import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, CreditCard, Activity } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-[#151822] border-[#1F2433] shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Wallet className="w-24 h-24 text-emerald-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Balance</CardTitle>
            <div className="bg-emerald-500/10 p-2 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
               <Wallet className="h-4 w-4 text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-bold text-white tracking-tight">$0.00</div>
            <p className="text-xs text-slate-500 mt-1">Ready to deploy</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#151822] border-[#1F2433] shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <CreditCard className="w-24 h-24 text-blue-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Active Cards</CardTitle>
            <div className="bg-blue-500/10 p-2 rounded-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
               <CreditCard className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-bold text-white tracking-tight">0</div>
            <p className="text-xs text-slate-500 mt-1">Stored in your vault</p>
          </CardContent>
        </Card>

        <Card className="bg-[#151822] border-[#1F2433] shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Activity className="w-24 h-24 text-rose-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Spent</CardTitle>
            <div className="bg-rose-500/10 p-2 rounded-md shadow-[0_0_15px_rgba(244,63,94,0.15)]">
               <Activity className="h-4 w-4 text-rose-400" />
            </div>
          </CardHeader>
          <CardContent className="z-10 relative">
            <div className="text-3xl font-bold text-white tracking-tight">$0.00</div>
            <p className="text-xs text-slate-500 mt-1">Lifetime platform usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-[#151822] border-[#1F2433] shadow-lg overflow-hidden">
        <CardHeader className="border-b border-[#1F2433] bg-[#11141D]">
          <CardTitle className="text-base text-slate-200 font-semibold flex items-center gap-2">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#090B10]">
              <TableRow className="hover:bg-transparent border-[#1F2433]">
                <TableHead className="text-slate-400 font-semibold h-10 px-6 text-[11px] uppercase tracking-wider">ID</TableHead>
                <TableHead className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Type</TableHead>
                <TableHead className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Amount</TableHead>
                <TableHead className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider text-right pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={5} className="h-32 text-center text-slate-500 text-sm">
                  No recent activity found.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
