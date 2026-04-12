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
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Home, 
  ShoppingCart, 
  History, 
  Wallet, 
  BookOpen, 
  MessageSquare,
  LogOut,
  Settings as SettingsIcon,
  ChevronRight
} from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Categorized Navigation for better UX architecture
  const platformItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
    { name: 'Order History', path: '/orders', icon: History },
    { name: 'Add Funds', path: '/add-funds', icon: Wallet },
  ];

  const supportItems = [
    { name: 'Rules & Terms', path: '/rules', icon: BookOpen },
    { name: 'Support Tickets', path: '/tickets', icon: MessageSquare },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-[#090B10] text-slate-200 font-sans selection:bg-blue-500/30">
        
        {/* Enhanced Premium Sidebar */}
        <Sidebar variant="sidebar" className="border-r border-[#1F2433] bg-[#11141D]">
          {/* Logo Area */}
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-[#1F2433] cursor-pointer select-none group" onClick={() => navigate('/dashboard')}>
            <div className="flex items-center gap-3 w-full">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-50 transition-colors">
                Visatk
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent className="custom-scrollbar py-2">
            {/* Group 1: Platform */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold mb-2 px-3">
                Platform
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {platformItems.map((item) => {
                    const isActive = location.pathname.includes(item.path);
                    return (
                      <SidebarMenuItem key={item.path} className="px-2 mb-1 relative">
                        {/* Glowing Active Indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10" />
                        )}
                        <SidebarMenuButton 
                          isActive={isActive}
                          onClick={() => navigate(item.path)}
                          className={`h-10 transition-all duration-300 outline-none rounded-lg w-full group ${
                            isActive 
                            ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/15' 
                            : 'hover:bg-[#1A1F2C] text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <item.icon className={`w-[18px] h-[18px] mr-3 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                          <span className="font-medium text-sm">{item.name}</span>
                          
                          {/* Hover Arrow Indicator */}
                          {!isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-slate-500" />}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Group 2: Support & Info */}
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-slate-500 uppercase text-[10px] tracking-widest font-semibold mb-2 px-3">
                Help & Info
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {supportItems.map((item) => {
                    const isActive = location.pathname.includes(item.path);
                    return (
                      <SidebarMenuItem key={item.path} className="px-2 mb-1 relative">
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10" />
                        )}
                        <SidebarMenuButton 
                          isActive={isActive}
                          onClick={() => navigate(item.path)}
                          className={`h-10 transition-all duration-300 outline-none rounded-lg w-full group ${
                            isActive 
                            ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/15' 
                            : 'hover:bg-[#1A1F2C] text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <item.icon className={`w-[18px] h-[18px] mr-3 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                          <span className="font-medium text-sm">{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* User Profile Footer */}
          <SidebarFooter className="border-t border-[#1F2433] p-4 bg-[#0D1017]">
             <div className="flex items-center justify-between w-full group cursor-pointer hover:bg-[#151822] p-2 -m-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3" onClick={() => navigate('/settings')}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-inner border border-slate-500/30 group-hover:border-blue-500/50 transition-colors">
                    VH
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold text-slate-200 leading-none truncate w-[100px]">visatk_user</span>
                    <span className="text-[10px] text-emerald-400 font-medium mt-1 uppercase tracking-wider">Active</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/login'); }} 
                  className="text-slate-500 hover:text-rose-400 transition-colors p-2 rounded-md hover:bg-rose-500/10"
                  title="Sign Out"
                >
                  <LogOut className="w-[18px] h-[18px]" />
                </button>
             </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col bg-[#090B10] overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#1F2433] bg-[#11141D]/80 backdrop-blur-xl px-4 md:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-400 hover:text-white transition-colors p-2 -ml-2 rounded-md" />
              <div className="h-4 w-px bg-[#1F2433] hidden sm:block mx-1"></div>
              <h1 className="text-sm font-semibold text-slate-200 tracking-wide capitalize hidden sm:block">
                {location.pathname.replace('/', '').replace('-', ' ')}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-pointer px-3 py-1 text-[11px] uppercase tracking-wider font-semibold hidden lg:flex rounded-full">
                Claim Free Card
              </Badge>
              
              <div className="flex items-center gap-3 bg-[#090B10] px-3 py-1.5 rounded-full border border-[#1F2433] shadow-inner">
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-bold tracking-wide">$0.00</span>
                </div>
                <div className="h-4 w-px bg-slate-800"></div>
                <button onClick={() => navigate('/add-funds')} className="text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 rounded-full p-1" title="Add Funds">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>

              <button onClick={() => navigate('/settings')} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-[#1A1F2C] rounded-full hidden sm:block">
                <SettingsIcon className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-x-hidden overflow-y-auto w-full max-w-[1600px] mx-auto custom-scrollbar">
             <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
