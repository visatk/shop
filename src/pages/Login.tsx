import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back!");
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090B10] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Card className="w-full max-w-md bg-[#11141D]/80 backdrop-blur-xl border-[#1F2433] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 relative overflow-hidden">
        {/* Top subtle gradient line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        
        <CardHeader className="space-y-4 pb-6 pt-8 text-center">
          <div className="mx-auto bg-gradient-to-br from-blue-500 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] mb-2">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
            <CardDescription className="text-slate-400 mt-1.5">Sign in to access your vault.</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="pl-10 bg-[#090B10] border-[#1F2433] h-12 text-sm focus-visible:ring-1 focus-visible:ring-blue-500/50 transition-all text-slate-200" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Password</Label>
                <Link to="#" className="text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  className="pl-10 bg-[#090B10] border-[#1F2433] h-12 text-sm focus-visible:ring-1 focus-visible:ring-blue-500/50 transition-all text-slate-200" 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 relative group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center justify-center w-full">
                  Sign In <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
