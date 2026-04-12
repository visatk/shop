import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Mail, Lock, User, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API registration call
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully!");
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#090B10] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      
      <Card className="w-full max-w-md bg-[#11141D]/80 backdrop-blur-xl border-[#1F2433] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
        
        <CardHeader className="space-y-4 pb-6 pt-8 text-center">
          <div className="mx-auto bg-[#151822] border border-[#1F2433] w-12 h-12 rounded-xl flex items-center justify-center mb-1">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">Create an Account</CardTitle>
            <CardDescription className="text-slate-400 mt-1.5">Join the platform to access inventory.</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Username</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  type="text" 
                  placeholder="johndoe" 
                  required
                  className="pl-10 bg-[#090B10] border-[#1F2433] h-11 text-sm focus-visible:ring-1 focus-visible:ring-indigo-500/50 transition-all text-slate-200" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="pl-10 bg-[#090B10] border-[#1F2433] h-11 text-sm focus-visible:ring-1 focus-visible:ring-indigo-500/50 transition-all text-slate-200" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="pl-10 bg-[#090B10] border-[#1F2433] h-11 text-sm focus-visible:ring-1 focus-visible:ring-indigo-500/50 transition-all text-slate-200" 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-300"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400 border-t border-[#1F2433] pt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
