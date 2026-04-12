import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, CreditCard, Activity, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-[#1a1e28] border-slate-800/60 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$0.00</div>
            <p className="text-xs text-slate-500 mt-1">Ready to deploy</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1e28] border-slate-800/60 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">0</div>
            <p className="text-xs text-slate-500 mt-1">Stored in your vault</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1e28] border-slate-800/60 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Spent</CardTitle>
            <Activity className="h-4 w-4 text-rose-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$0.00</div>
            <p className="text-xs text-slate-500 mt-1">Lifetime platform usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-[#1a1e28] border-slate-800/60 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-slate-800/60 bg-[#161a22]/50">
          <CardTitle className="text-lg text-slate-200 font-semibold flex items-center gap-2">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#111318]/40">
              <TableRow className="hover:bg-transparent border-slate-800/60">
                <TableHead className="text-slate-400 font-semibold h-10 px-6">ID</TableHead>
                <TableHead className="text-slate-400 font-semibold">Date</TableHead>
                <TableHead className="text-slate-400 font-semibold">Type</TableHead>
                <TableHead className="text-slate-400 font-semibold">Amount</TableHead>
                <TableHead className="text-slate-400 font-semibold text-right pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Empty State for Dashboard */}
              <TableRow className="hover:bg-transparent border-0">
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
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
