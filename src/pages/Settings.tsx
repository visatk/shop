import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings updated successfully. Changes synced to Edge.");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-[#1a1e28] border border-slate-800 w-full justify-start h-12 p-1">
          <TabsTrigger value="account" className="data-[state=active]:bg-[#242a35] data-[state=active]:text-white">Account Info</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#242a35] data-[state=active]:text-white">Security</TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-[#242a35] data-[state=active]:text-white">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="mt-6">
          <Card className="bg-[#1a1e28] border-slate-800/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200">Account Preferences</CardTitle>
              <CardDescription className="text-slate-400">Update your email and display settings.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSave}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Registered Email</Label>
                  <Input id="email" defaultValue="user@visatk.us" disabled className="bg-[#111318] border-slate-700/50 text-slate-400 cursor-not-allowed" />
                  <p className="text-xs text-slate-500">Contact support to change your base email.</p>
                </div>
                <div className="flex items-center justify-between border border-slate-800/60 bg-[#111318] p-4 rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-slate-300">Email Notifications</Label>
                    <p className="text-sm text-slate-500">Receive alerts for low balances and new inventory drops.</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-800/60 bg-[#161a22]/50 py-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white ml-auto">Save Preferences</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-[#1a1e28] border-slate-800/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200">Security Parameters</CardTitle>
              <CardDescription className="text-slate-400">Manage your password and active sessions.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSave}>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-slate-300">Current Password</Label>
                  <Input type="password" placeholder="••••••••" className="bg-[#111318] border-slate-700/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">New Password</Label>
                  <Input type="password" placeholder="••••••••" className="bg-[#111318] border-slate-700/50" />
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-800/60 bg-[#161a22]/50 py-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white ml-auto">Update Password</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
           <Card className="bg-[#1a1e28] border-slate-800/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-200">Developer Access</CardTitle>
              <CardDescription className="text-slate-400">Manage API keys for programmatic access.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="border border-slate-800/60 bg-[#111318] p-6 rounded-lg text-center space-y-3">
                 <p className="text-slate-400 text-sm">You do not have any active API keys.</p>
                 <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                   Generate New Token
                 </Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
