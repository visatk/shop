import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function OrderHistory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Orders History</h2>
          <p className="text-slate-400 text-sm mt-1">Review your previously purchased cards and data.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input placeholder="Search orders..." className="pl-9 bg-[#1a1e28] border-slate-800 focus-visible:ring-blue-500/50 h-10 w-full" />
        </div>
      </div>

      <Card className="bg-[#1a1e28] border-slate-800/60 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Mobile responsive table wrapper */}
          <div className="overflow-x-auto w-full">
            <Table className="w-full min-w-[700px]">
              <TableHeader className="bg-[#111318]/80 border-b border-slate-800/60">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-slate-400 font-semibold h-12 text-xs uppercase tracking-wider">Date Purchased</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Card/BIN</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Base</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider">Price</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider text-right pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-transparent border-0">
                  <TableCell colSpan={5} className="h-[400px]">
                    <div className="flex flex-col items-center justify-center text-slate-500 space-y-3">
                      <div className="bg-slate-800/30 p-4 rounded-full">
                        <History className="w-8 h-8 opacity-40 text-slate-300" />
                      </div>
                      <p className="text-base font-medium">No order history found.</p>
                      <p className="text-sm">When you buy cards, they will appear here.</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
