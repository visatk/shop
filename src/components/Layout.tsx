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
import { CreditCard, Home, ShoppingCart, History, Wallet, BookOpen, MessageSquare } from "lucide-react";

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
      <div className="flex min-h-screen w-full bg-[#090B10] text-slate-200 font-sans">
        
        {/* Sidebar */}
        <Sidebar variant="sidebar" className="border-r border-[#1F2433] bg-[#11141D]">
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-[#1F2433] text-xl font-bold tracking-tight text-white cursor-pointer select-none" onClick={() => navigate('/dashboard')}>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-1.5 rounded-lg mr-3 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <CreditCard className="w-5 h-5 text-white" />
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
                          className={`h-11 transition-all duration-200 outline-none ${
                            isActive 
                            ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/15 hover:text-blue-300 border-l-2 border-blue-500 rounded-none' 
                            : 'hover:bg-[#1A1F2C] text-slate-400 hover:text-slate-200 border-l-2 border-transparent rounded-none'
                          }`}
                        >
                          <item.icon className={`w-4 h-4 mr-2 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                          <span className="font-medium text-[14px]">{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col bg-[#090B10] overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#1F2433] bg-[#11141D]/90 backdrop-blur-xl px-4 md:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-400 hover:text-white transition-colors p-2 -ml-2 rounded-md" />
              <h1 className="text-sm font-medium text-slate-200 tracking-wide capitalize hidden sm:block">
                {location.pathname.replace('/', '').replace('-', ' ')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer px-3 py-1 text-xs hidden lg:flex rounded-full">
                Claim Free Card
              </Badge>
              <div className="flex items-center gap-3 bg-[#151822] px-3 py-1.5 rounded-full border border-[#1F2433] shadow-inner">
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-semibold tracking-wide">$ 0.00</span>
                </div>
                <div className="h-4 w-px bg-slate-700"></div>
                <button onClick={() => navigate('/add-funds')} className="text-emerald-400 hover:text-emerald-300 transition-colors" title="Add Funds">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div 
                onClick={() => navigate('/settings')}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-sm font-bold border-2 border-[#11141D] ring-2 ring-[#1F2433] shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              >
                VH
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-x-hidden overflow-y-auto w-full max-w-[1600px] mx-auto">
             <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
