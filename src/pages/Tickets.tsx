import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

export default function Tickets() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-500" /> Support Tickets
          </h2>
          <p className="text-slate-400 text-sm mt-1">Contact administration for account issues or payment disputes.</p>
        </div>
        <Button className="bg-[#242a35] hover:bg-slate-700 text-white border border-slate-700/50 hidden sm:flex">
          View Open Tickets
        </Button>
      </div>

      <Card className="bg-[#1a1e28] border-slate-800/60 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-slate-200">Open a New Ticket</CardTitle>
          <CardDescription className="text-slate-400">Do not create multiple tickets for the same issue. Average response time is 12-24 hours.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300 text-xs uppercase tracking-wider font-semibold">Subject</Label>
            <Input placeholder="E.g. Deposit not showing" className="bg-[#111318] border-slate-700/50 h-12" />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300 text-xs uppercase tracking-wider font-semibold">Message</Label>
            <Textarea 
              placeholder="Describe your issue in detail. If related to a deposit, include the TxID." 
              className="bg-[#111318] border-slate-700/50 min-h-[200px] resize-y" 
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-800/60 bg-[#161a22]/50 p-6">
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 h-12 px-8 text-base">
            <Send className="w-4 h-4 mr-2" />
            Submit Ticket
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
