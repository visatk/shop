import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function Rules() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-500" /> Platform Rules
        </h2>
        <p className="text-slate-400 text-sm mt-1">Please read carefully before using the marketplace.</p>
      </div>

      <Card className="bg-[#1a1e28] border-slate-800/60 shadow-xl overflow-hidden">
        <ScrollArea className="h-[60vh] md:h-[70vh]">
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="space-y-3 text-slate-300 leading-relaxed text-sm md:text-base">
              <h3 className="text-lg font-semibold text-white mb-2">1. General Terms</h3>
              <p>By registering and depositing funds on Visatk, you agree to these rules. Violation will result in an immediate account ban without refund.</p>
              <p>All sales are final. Funds deposited cannot be withdrawn, only used for purchases within the platform.</p>
            </div>

            <div className="space-y-3 text-slate-300 leading-relaxed text-sm md:text-base">
              <h3 className="text-lg font-semibold text-white mb-2">2. Replacement Policy</h3>
              <p>We provide a checker upon purchase. If a card is determined to be dead (DECLINED) by our internal checker at the exact moment of purchase, a refund is issued automatically to your platform balance.</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>We do not offer replacements for cards killed by the user after purchase.</li>
                <li>Manual checking via third-party gateways voids any replacement guarantee.</li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-5 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
              <div className="text-sm text-rose-200/80 leading-relaxed">
                <strong className="text-rose-300 font-semibold block mb-1">Anti-Scam Warning:</strong>
                Visatk will NEVER contact you on Telegram, Discord, or ICQ offering "deals" or direct sales. Any entity claiming to be us on social platforms is attempting to scam you. The ONLY official domain is visatk.us.
              </div>
            </div>
            
            <div className="space-y-3 text-slate-300 leading-relaxed text-sm md:text-base">
              <h3 className="text-lg font-semibold text-white mb-2">3. Account Sharing & Security</h3>
              <p>Account sharing is strictly prohibited. If our system detects multiple IP addresses accessing the same account simultaneously across different regions, the account will be locked for security purposes.</p>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
