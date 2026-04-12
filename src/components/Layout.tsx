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
import { CreditCard, Home, Settings as SettingsIcon, ShoppingCart } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-[#111318] text-slate-200 font-sans">
        
        {/* Sidebar */}
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
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={location.pathname === '/dashboard'}
                      onClick={() => navigate('/dashboard')}
                      tooltip="Dashboard" 
                      className={`h-10 transition-colors ${location.pathname === '/dashboard' ? 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300' : 'hover:bg-slate-800 hover:text-white'}`}
                    >
                      <Home className="w-4 h-4" />
                      <span className="font-medium">Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={location.pathname === '/marketplace'}
                      onClick={() => navigate('/marketplace')}
                      tooltip="Purchase Cards" 
                      className={`h-10 transition-colors ${location.pathname === '/marketplace' ? 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300' : 'hover:bg-slate-800 hover:text-white'}`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="font-medium">Marketplace</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={location.pathname === '/settings'}
                      onClick={() => navigate('/settings')}
                      tooltip="Settings" 
                      className={`h-10 transition-colors ${location.pathname === '/settings' ? 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300' : 'hover:bg-slate-800 hover:text-white'}`}
                    >
                      <SettingsIcon className="w-4 h-4" />
                      <span className="font-medium">Account Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col bg-[#111318]">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/60 bg-[#161a22]/80 backdrop-blur-md px-4 md:px-6 sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-slate-400 hover:text-white transition-colors" />
              <h1 className="text-sm font-medium text-slate-200 tracking-wide hidden sm:block capitalize">
                {location.pathname.replace('/', '')}
              </h1>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer px-3 py-1 text-xs hidden sm:flex">
                Claim Free Card
              </Badge>
              <div className="flex items-center gap-2 bg-[#1e232e] px-3 py-1.5 rounded-lg border border-slate-700/50 shadow-inner">
                <span className="text-emerald-400 text-sm font-semibold tracking-wide">$ 0.00</span>
                <div className="h-4 w-px bg-slate-700 mx-1"></div>
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors" title="Add Funds">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div 
                onClick={() => navigate('/settings')}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-sm font-bold border-2 border-[#161a22] ring-2 ring-slate-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              >
                VH
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-auto max-w-[1600px] mx-auto w-full">
             <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
