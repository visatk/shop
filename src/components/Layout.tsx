import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Home, ShoppingCart, History, Wallet, BookOpen, MessageSquare, Menu } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Buy Cards', path: '/marketplace', icon: ShoppingCart },
    { name: 'Orders History', path: '/orders', icon: History },
    { name: 'Add Funds', path: '/add-funds', icon: Wallet },
    { name: 'Rules', path: '/rules', icon: BookOpen },
    { name: 'Tickets', path: '/tickets', icon: MessageSquare },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-[#111318] text-slate-200 font-sans selection:bg-blue-500/30">
        
        {/* Mobile & Desktop Sidebar */}
        <Sidebar variant="sidebar" className="border-r-slate-800/60 bg-[#161a22]">
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-slate-800/60 text-xl font-bold tracking-tight text-white cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="bg-blue-600/20 p-1.5 rounded-lg mr-3 border border-blue-500/30">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            Visatk
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold mt-4 mb-2">
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const isActive = location.pathname.includes(item.path);
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton 
                          isActive={isActive}
                          onClick={() => navigate(item.path)}
                          className={`h-11 md:h-10 transition-all ${isActive ? 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 border-r-2 border-blue-500 rounded-r-none' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                          <item.icon className="w-5 h-5 md:w-4 md:h-4 mr-2" />
                          <span className="font-medium text-[15px] md:text-sm">{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col bg-[#111318] overflow-hidden">
          {/* Mobile-Responsive Header */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/60 bg-[#161a22]/95 backdrop-blur-md px-4 md:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-md md:bg-transparent md:p-0" />
              <h1 className="text-base font-semibold text-slate-200 tracking-wide capitalize hidden sm:block md:text-sm md:font-medium">
                {location.pathname.replace('/', '').replace('-', ' ')}
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-5">
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer px-3 py-1 text-xs hidden lg:flex">
                Claim Free Card
              </Badge>
              <div className="flex items-center gap-2 bg-[#1e232e] px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-slate-700/50 shadow-inner">
                <Wallet className="w-4 h-4 text-emerald-400 sm:hidden" />
                <span className="text-emerald-400 text-sm font-semibold tracking-wide">$ 0.00</span>
                <div className="h-4 w-px bg-slate-700 mx-0.5 md:mx-1"></div>
                <button onClick={() => navigate('/add-funds')} className="text-emerald-400 hover:text-emerald-300 transition-colors p-1" title="Add Funds">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div 
                onClick={() => navigate('/settings')}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-xs md:text-sm font-bold border-2 border-[#161a22] ring-2 ring-slate-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              >
                VH
              </div>
            </div>
          </header>

          {/* Main Content Wrapper - Ensures scrolling works properly on mobile */}
          <main className="p-3 sm:p-4 md:p-6 lg:p-8 flex-1 overflow-x-hidden overflow-y-auto w-full max-w-[1600px] mx-auto">
             <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
