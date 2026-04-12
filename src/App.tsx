import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  CreditCard, 
  Home, 
  Settings, 
  ShoppingCart, 
  AlertTriangle, 
  Search,
  ServerCrash
} from "lucide-react";
import { Toaster, toast } from 'sonner';

// --- Types ---
interface BinDetails {
  id: number;
  bin: string;
  brand: string;
  type: string;
  category: string;
  issuer: string;
  iso_code_2: string;
  country_name: string;
  flag: string;
}

interface CardData {
  cardNumber: string;
  bin: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  holder: string;
  bank: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  base: string;
  price: string;
  binDetails: BinDetails;
}

// --- Component ---
export default function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [bins, setBins] = useState('');
  const [base, setBase] = useState('All');
  const [exp, setExp] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('All');
  const [brand, setBrand] = useState('All');
  const [type, setType] = useState('All');
  
  // Feature Toggles (UI only for this scope)
  const [toggles, setToggles] = useState({
    ssnDob: false, mmn: false, address: false, phone: false, email: false
  });

  const handleToggle = (key: keyof typeof toggles) => (checked: boolean) => {
    setToggles(prev => ({ ...prev, [key]: checked }));
  };

  // API Call using the Worker Proxy
  const fetchCards = useCallback(async (params: Record<string, string | number> = { limit: 50 }) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      
      // Clean up params: only send valid, non-'All' fields
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All' && String(value).trim() !== '') {
          queryParams.append(key, String(value).trim());
        }
      });

      // Crucial: We hit the relative path, so the Worker/Vite proxy intercepts it
      const response = await fetch(`/api/v1/cards?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Worker returned status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.data) {
        setCards([]);
        toast.info("No results found.");
      } else {
        setCards(result.data);
        if (params.limit !== 50) toast.success(`Found ${result.data.length} cards matching criteria`);
      }
    } catch (e: any) {
      console.error("Proxy fetch failed:", e);
      setError("Unable to communicate with the edge network. Please try again later.");
      toast.error("Network synchronization failed");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    fetchCards({ limit: 50 });
  }, [fetchCards]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = { limit: '20' };
    
    if (bins) params.bin = bins.split(',')[0]; // Assuming API takes one BIN prefix
    if (country !== 'All') params.country = country;
    if (brand !== 'All') params.brand = brand;
    if (type !== 'All') params.type = type;

    fetchCards(params);
  };

  const handleBuy = (card: CardData) => {
    toast.success(`Processing purchase for ${card.binDetails.brand} ending in ${card.cardNumber.slice(-4)}`);
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-[#111318] text-slate-200 font-sans">
        <Toaster theme="dark" position="top-right" />
        
        {/* Sidebar */}
        <Sidebar variant="sidebar" className="border-r-slate-800/60 bg-[#161a22]">
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-slate-800/60 text-xl font-bold tracking-tight text-white">
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
                    <SidebarMenuButton tooltip="Dashboard" className="hover:bg-slate-800 hover:text-white transition-colors h-10">
                      <Home className="w-4 h-4" />
                      <span className="font-medium">Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Purchase Cards" className="bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 transition-colors h-10">
                      <ShoppingCart className="w-4 h-4" />
                      <span className="font-medium">Marketplace</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings" className="hover:bg-slate-800 hover:text-white transition-colors h-10">
                      <Settings className="w-4 h-4" />
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
              <h1 className="text-sm font-medium text-slate-200 tracking-wide hidden sm:block">
                Card Inventory
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
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-sm font-bold border-2 border-[#161a22] ring-2 ring-slate-800 shadow-md cursor-pointer hover:opacity-90 transition-opacity">
                VH
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-auto max-w-[1600px] mx-auto w-full space-y-6">
            {/* Alert / Notice */}
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start sm:items-center gap-3">
              <div className="bg-rose-500/20 p-2 rounded-lg mt-0.5 sm:mt-0">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div className="text-sm text-rose-200/80 leading-relaxed">
                <strong className="text-rose-300 font-semibold block sm:inline mr-1">Security Notice:</strong>
                Our only official domain is <span className="bg-rose-950 px-1.5 py-0.5 rounded text-rose-300 border border-rose-800/50">visatk.us</span>. We do not operate via Telegram, Discord, or any other social platforms. Beware of impersonators.
              </div>
            </div>

            {/* Advanced Search Filter */}
            <Card className="bg-[#1a1e28] border-slate-800/60 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <form onSubmit={handleSearch} className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                    {/* Block 1 */}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="bins" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">BIN Prefix</Label>
                        <Input id="bins" placeholder="e.g. 414720" value={bins} onChange={(e) => setBins(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 transition-all h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">City</Label>
                        <Input id="city" placeholder="e.g. New York" value={city} onChange={(e) => setCity(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 transition-all h-10" />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="brand" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Network Brand</Label>
                        <Select value={brand} onValueChange={setBrand}>
                          <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10">
                            <SelectValue placeholder="All Brands" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1e28] border-slate-700">
                            <SelectItem value="All">All Networks</SelectItem>
                            <SelectItem value="VISA">VISA</SelectItem>
                            <SelectItem value="MASTERCARD">MASTERCARD</SelectItem>
                            <SelectItem value="AMEX">AMEX</SelectItem>
                            <SelectItem value="DISCOVER">DISCOVER</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Block 2 */}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="base" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Database Base</Label>
                        <Select value={base} onValueChange={setBase}>
                          <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10">
                            <SelectValue placeholder="All Bases" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1e28] border-slate-700">
                            <SelectItem value="All">Any Base</SelectItem>
                            <SelectItem value="APR#12_USA">APR#12_USA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stateCode" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">State / Region</Label>
                        <Input id="stateCode" placeholder="e.g. NY" value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 transition-all h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Card Type</Label>
                        <Select value={type} onValueChange={setType}>
                          <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1e28] border-slate-700">
                            <SelectItem value="All">All Types</SelectItem>
                            <SelectItem value="CREDIT">CREDIT</SelectItem>
                            <SelectItem value="DEBIT">DEBIT</SelectItem>
                            <SelectItem value="PREPAID">PREPAID</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Block 3 */}
                    <div className="space-y-5">
                       <div className="space-y-2">
                        <Label htmlFor="exp" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Expiration Date</Label>
                        <Input id="exp" placeholder="MM/YYYY" value={exp} onChange={(e) => setExp(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 transition-all h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">ZIP / Postal Code</Label>
                        <Input id="zipCode" placeholder="e.g. 10001" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 transition-all h-10" />
                      </div>
                    </div>

                    {/* Block 4 */}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Issuing Country</Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10">
                            <SelectValue placeholder="All Countries" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a1e28] border-slate-700">
                            <SelectItem value="All">Worldwide</SelectItem>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Extras / Required Fields */}
                  <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-full md:w-auto self-center">Require Data:</span>
                      {[
                        { id: 'ssnDob', label: 'SSN + DOB' },
                        { id: 'mmn', label: 'MMN' },
                        { id: 'address', label: 'Full Address' },
                        { id: 'phone', label: 'Phone No.' },
                        { id: 'email', label: 'Email Address' }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <Switch id={item.id} checked={toggles[item.id as keyof typeof toggles]} onCheckedChange={handleToggle(item.id as keyof typeof toggles)} className="data-[state=checked]:bg-blue-600 scale-90" />
                          <Label htmlFor={item.id} className="text-slate-300 font-medium cursor-pointer">{item.label}</Label>
                        </div>
                      ))}
                    </div>

                    <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all h-10 px-8">
                      {loading ? (
                        <>
                           <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                           Searching Edge...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Query Inventory
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Data Grid */}
            <div className="rounded-xl border border-slate-800/60 bg-[#1a1e28] shadow-xl overflow-hidden relative min-h-[400px]">
              {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#1a1e28] z-10">
                  <div className="bg-rose-500/10 p-4 rounded-full mb-4">
                     <ServerCrash className="w-8 h-8 text-rose-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-1">Connection Failed</h3>
                  <p className="text-slate-400 max-w-sm">{error}</p>
                  <Button variant="outline" onClick={() => fetchCards()} className="mt-6 border-slate-700 bg-transparent hover:bg-slate-800">
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader className="bg-[#111318]/80 sticky top-0 backdrop-blur-sm z-10 border-b border-slate-800/60">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-slate-400 font-semibold h-12 text-xs uppercase tracking-wider whitespace-nowrap px-6">EXP</TableHead>
                        <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Brand / Level</TableHead>
                        <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Location</TableHead>
                        <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Country</TableHead>
                        <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Issuing Bank</TableHead>
                        <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap text-right pr-6">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        // Professional Loading Skeletons
                        Array.from({ length: 10 }).map((_, i) => (
                          <TableRow key={`skel-${i}`} className="border-b border-slate-800/40">
                            <TableCell className="px-6 py-4"><Skeleton className="h-5 w-14 bg-slate-800" /></TableCell>
                            <TableCell><div className="space-y-2"><Skeleton className="h-4 w-24 bg-slate-800" /><Skeleton className="h-3 w-16 bg-slate-800/60" /></div></TableCell>
                            <TableCell><div className="space-y-2"><Skeleton className="h-4 w-28 bg-slate-800" /><Skeleton className="h-3 w-20 bg-slate-800/60" /></div></TableCell>
                            <TableCell><Skeleton className="h-6 w-12 bg-slate-800" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-40 bg-slate-800" /></TableCell>
                            <TableCell className="text-right pr-6"><Skeleton className="h-8 w-20 bg-slate-800 ml-auto" /></TableCell>
                          </TableRow>
                        ))
                      ) : cards.length === 0 ? (
                        <TableRow className="hover:bg-transparent border-0">
                          <TableCell colSpan={6} className="h-[300px]">
                            <div className="flex flex-col items-center justify-center text-slate-500">
                              <Search className="w-10 h-10 mb-4 opacity-20" />
                              <p className="text-lg">No inventory matches your filters.</p>
                              <p className="text-sm mt-1">Try broadening your search criteria.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        cards.map((card, index) => (
                          <TableRow key={`${card.cardNumber}-${index}`} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors group">
                            <TableCell className="font-semibold text-slate-300 py-3 px-6 whitespace-nowrap">
                              {card.expMonth}/{card.expYear.slice(-2)}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className={`font-bold tracking-wide ${card.binDetails.brand === 'VISA' ? 'text-blue-400' : card.binDetails.brand === 'MASTERCARD' ? 'text-amber-400' : 'text-slate-200'}`}>
                                  {card.binDetails.brand}
                                </span>
                                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
                                  {card.binDetails.type} {card.binDetails.category !== 'TRADITIONAL' ? `• ${card.binDetails.category}` : ''}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                               <div className="flex flex-col">
                                  <span className="text-sm text-slate-300">{card.city || '—'}</span>
                                  <span className="text-[11px] text-slate-500 mt-0.5">{card.state} {card.zip}</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <div className="flex items-center gap-2">
                                  <span className="text-2xl leading-none drop-shadow-md" title={card.binDetails.country_name}>{card.binDetails.flag}</span>
                                  <span className="text-xs font-medium text-slate-400">{card.binDetails.iso_code_2}</span>
                               </div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-400 max-w-[220px] truncate" title={card.bank}>
                              {card.bank || 'Unknown Issuer'}
                            </TableCell>
                            <TableCell className="text-right pr-6 align-middle">
                              <Button 
                                  size="sm" 
                                  onClick={() => handleBuy(card)}
                                  className="bg-[#242a35] hover:bg-emerald-600/90 text-emerald-400 hover:text-white border border-slate-700/50 hover:border-emerald-500 font-medium shadow-sm transition-all group-hover:shadow-md"
                              >
                                Buy <span className="ml-1.5 opacity-80">{card.price}</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
            
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
