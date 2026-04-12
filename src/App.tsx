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
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Home, 
  Settings, 
  ShoppingCart, 
  AlertTriangle, 
  Search,
  Loader2
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
  issuer_phone: string;
  issuer_url: string;
  iso_code_2: string;
  iso_code_3: string;
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
  company: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  base: string;
  price: string;
  binDetails: BinDetails;
}

interface ApiDataResponse {
  data: CardData[];
}

// --- Main Application Component ---
function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search Form State
  const [bins, setBins] = useState('');
  const [base, setBase] = useState('All');
  const [exp, setExp] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('All');
  const [company, setCompany] = useState('All');
  const [type, setType] = useState('All');
  
  // Switches
  const [ssnDob, setSsnDob] = useState(false);
  const [mmn, setMmn] = useState(false);
  const [address, setAddress] = useState(false);
  const [phone, setPhone] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchCards({ limit: 50 });
  }, []);

  const fetchCards = async (params: Record<string, string | number>) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All') {
          queryParams.append(key, String(value));
        }
      });

      // We ensure the limit is always set if not provided in search
      if (!queryParams.has('limit')) {
         queryParams.append('limit', '50');
      }

      const response = await fetch(`https://gen.visatk.us/api/v1/cards?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiDataResponse = await response.json();
      setCards(result.data || []);
      
      if(result.data && result.data.length > 0) {
          toast.success(`Loaded ${result.data.length} cards`);
      } else {
          toast.info("No cards found matching your criteria.");
      }
      
    } catch (e: any) {
      console.error("Failed to fetch cards", e);
      setError("Failed to load data. Please try again.");
      toast.error("Failed to fetch data from API");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params: Record<string, string> = {};
    
    // Extract BIN prefix if multiple are comma separated, API might only support one but we'll take the first for now
    if (bins.trim()) {
        const firstBin = bins.split(',')[0].trim();
        params.bin = firstBin;
    }
    
    if (country !== 'All') params.country = country;
    if (company !== 'All') params.brand = company; // Assuming company maps to brand in API
    if (type !== 'All') params.type = type;
    
    // Limits
    params.limit = '20'; // Example limit for search

    fetchCards(params);
  };

  const handleBuy = (card: CardData) => {
    toast(`Purchase Initiated for ${card.binDetails.brand} ending in ${card.cardNumber.slice(-4)}`);
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#1e232e] text-slate-200 font-sans selection:bg-blue-500/30">
        <Toaster theme="dark" />
        
        {/* Navigation Sidebar */}
        <Sidebar variant="sidebar" className="border-r-slate-800 bg-[#161a22]">
          <SidebarHeader className="h-16 flex items-center px-6 border-b border-slate-800 text-xl font-bold tracking-tight text-white">
            <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
            Visatk
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-500 uppercase text-xs tracking-wider">Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard" className="hover:bg-slate-800 hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white transition-colors">
                      <Home />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Purchase Cards" className="hover:bg-slate-800 hover:text-white data-[active=true]:bg-blue-600/20 data-[active=true]:text-blue-400 transition-colors">
                      <ShoppingCart />
                      <span>Purchase Cards</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings" className="hover:bg-slate-800 hover:text-white transition-colors">
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col bg-[#1e232e]">
          
          {/* Top Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 bg-[#161a22] px-4 md:px-6 sticky top-0 z-10">
            <SidebarTrigger className="text-slate-400 hover:text-white" />
            <div className="w-full flex justify-between items-center ml-4">
               <h1 className="text-lg font-semibold text-white">Purchase Cards</h1>
               <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                    Claim your free card!
                  </Badge>
                  <div className="flex items-center gap-2 text-sm font-medium bg-[#1e232e] px-3 py-1.5 rounded-md border border-slate-700">
                    <span className="text-emerald-400">$ 0.00</span>
                    <button className="text-emerald-400 hover:text-emerald-300 w-5 h-5 flex items-center justify-center rounded-full hover:bg-emerald-500/20 transition-colors" aria-label="Add funds">+</button>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold border border-slate-600 cursor-pointer hover:bg-slate-600 transition-colors">
                    H
                  </div>
               </div>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-auto max-w-7xl mx-auto w-full space-y-6">
            
            {/* Warning Note */}
            <Card className="bg-[#161a22] border-rose-500/20 text-slate-300 shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-rose-400 flex items-center text-sm font-semibold tracking-wide">
                        <AlertTriangle className="w-4 h-4 mr-2" /> Note
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 leading-relaxed">
                    <p>Visatk only uses the following domains.</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">https://visatk.us/</Badge>
                    </div>
                    <p>All other domains are fake/scam. We do not sell on Telegram or any other social platform!</p>
                </CardContent>
            </Card>

            {/* Filter Form */}
            <Card className="bg-[#242938] border-slate-800 shadow-md">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bins" className="text-slate-400 text-xs uppercase tracking-wider">BINs</Label>
                            <Input 
                                id="bins" 
                                placeholder="Comma Separated (e.g. 414720)" 
                                value={bins}
                                onChange={(e) => setBins(e.target.value)}
                                className="bg-[#1a1f2b] border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-slate-400 text-xs uppercase tracking-wider">City</Label>
                            <Input 
                                id="city" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="bg-[#1a1f2b] border-slate-700 text-slate-200 focus-visible:ring-blue-500/50"
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="company" className="text-slate-400 text-xs uppercase tracking-wider">Brand <span className="text-rose-500">*</span></Label>
                            <Select value={company} onValueChange={setCompany}>
                                <SelectTrigger id="company" className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="VISA">VISA</SelectItem>
                                    <SelectItem value="MASTERCARD">MASTERCARD</SelectItem>
                                    <SelectItem value="AMEX">AMEX</SelectItem>
                                    <SelectItem value="DISCOVER">DISCOVER</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="base" className="text-slate-400 text-xs uppercase tracking-wider">Base <span className="text-rose-500">*</span></Label>
                            <Select value={base} onValueChange={setBase}>
                                <SelectTrigger id="base" className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="APR#12_USA">APR#12_USA</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stateCode" className="text-slate-400 text-xs uppercase tracking-wider">State</Label>
                            <Input 
                                id="stateCode" 
                                value={stateCode}
                                onChange={(e) => setStateCode(e.target.value)}
                                className="bg-[#1a1f2b] border-slate-700 text-slate-200 focus-visible:ring-blue-500/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-slate-400 text-xs uppercase tracking-wider">Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger id="type" className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="CREDIT">CREDIT</SelectItem>
                                    <SelectItem value="DEBIT">DEBIT</SelectItem>
                                    <SelectItem value="PREPAID">PREPAID</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="exp" className="text-slate-400 text-xs uppercase tracking-wider">EXP</Label>
                            <Input 
                                id="exp" 
                                placeholder="MM/YYYY" 
                                value={exp}
                                onChange={(e) => setExp(e.target.value)}
                                className="bg-[#1a1f2b] border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-slate-400 text-xs uppercase tracking-wider">ZIP Code</Label>
                            <Input 
                                id="zipCode" 
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="bg-[#1a1f2b] border-slate-700 text-slate-200 focus-visible:ring-blue-500/50"
                            />
                        </div>
                         <div className="space-y-2 pt-6">
                           <div className="flex items-center space-x-2">
                                <Switch 
                                    id="ssn-dob" 
                                    checked={ssnDob} 
                                    onCheckedChange={setSsnDob}
                                    className="data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="ssn-dob" className="text-slate-300 font-normal">SSN + DOB</Label>
                            </div>
                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="space-y-4">
                        <div className="space-y-2 lg:mt-[4.5rem]">
                            <Label htmlFor="country" className="text-slate-400 text-xs uppercase tracking-wider">Country <span className="text-rose-500">*</span></Label>
                            <Select value={country} onValueChange={setCountry}>
                                <SelectTrigger id="country" className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1f2b] border-slate-700 text-slate-200">
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="US">United States</SelectItem>
                                    <SelectItem value="GB">United Kingdom</SelectItem>
                                    <SelectItem value="CA">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                  </div>

                  {/* Extra Toggles Row */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700/50">
                        <div className="flex items-center space-x-2">
                            <Switch id="mmn" checked={mmn} onCheckedChange={setMmn} className="data-[state=checked]:bg-blue-500" />
                            <Label htmlFor="mmn" className="text-slate-300 font-normal">MMN</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="address" checked={address} onCheckedChange={setAddress} className="data-[state=checked]:bg-blue-500" />
                            <Label htmlFor="address" className="text-slate-300 font-normal">Address</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="phone" checked={phone} onCheckedChange={setPhone} className="data-[state=checked]:bg-blue-500" />
                            <Label htmlFor="phone" className="text-slate-300 font-normal">Phone</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="emailToggle" checked={emailToggle} onCheckedChange={setEmailToggle} className="data-[state=checked]:bg-blue-500" />
                            <Label htmlFor="emailToggle" className="text-slate-300 font-normal">Email</Label>
                        </div>
                   </div>

                  <div className="pt-2">
                    <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 transition-all">
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                      Search Cards
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Results Table */}
            <div className="rounded-xl border border-slate-800 bg-[#242938] overflow-hidden shadow-lg">
              {error ? (
                 <div className="p-8 text-center text-rose-400">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p>{error}</p>
                 </div>
              ) : (
                <Table>
                  <TableHeader className="bg-[#1a1f2b]">
                    <TableRow className="border-b border-slate-800 hover:bg-transparent">
                      <TableHead className="text-slate-400 font-medium h-12">Expiration</TableHead>
                      <TableHead className="text-slate-400 font-medium">Company</TableHead>
                      <TableHead className="text-slate-400 font-medium">City</TableHead>
                      <TableHead className="text-slate-400 font-medium">State</TableHead>
                      <TableHead className="text-slate-400 font-medium">ZIP</TableHead>
                      <TableHead className="text-slate-400 font-medium">Country</TableHead>
                      <TableHead className="text-slate-400 font-medium">Bank</TableHead>
                      <TableHead className="text-slate-400 font-medium text-right pr-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow className="hover:bg-transparent border-slate-800">
                        <TableCell colSpan={8} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-500">
                             <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
                             <p>Fetching latest inventory...</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : cards.length === 0 ? (
                      <TableRow className="hover:bg-transparent border-slate-800">
                         <TableCell colSpan={8} className="h-48 text-center text-slate-500">
                            No cards found matching your criteria.
                         </TableCell>
                      </TableRow>
                    ) : (
                      cards.map((card, index) => (
                        <TableRow key={`${card.cardNumber}-${index}`} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <TableCell className="font-medium text-slate-300 py-4">
                            {card.expMonth}/{card.expYear.slice(-2)}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            <div className="flex flex-col">
                                <span className="font-semibold">{card.binDetails.brand}</span>
                                <span className="text-xs text-slate-500">{card.binDetails.type} {card.binDetails.category !== 'TRADITIONAL' ? card.binDetails.category : ''}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-400">{card.city || 'N/A'}</TableCell>
                          <TableCell className="text-slate-400">{card.state || 'N/A'}</TableCell>
                          <TableCell className="text-slate-400">{card.zip || 'N/A'}</TableCell>
                          <TableCell>
                             <div className="flex items-center gap-2">
                                <span className="text-lg leading-none" title={card.binDetails.country_name}>{card.binDetails.flag}</span>
                                <span className="text-slate-400">{card.binDetails.iso_code_2}</span>
                             </div>
                          </TableCell>
                          <TableCell className="text-slate-400 max-w-[200px] truncate" title={card.bank}>
                            {card.bank || 'Unknown'}
                          </TableCell>
                          <TableCell className="text-right pr-4">
                            <Button 
                                size="sm" 
                                onClick={() => handleBuy(card)}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-sm transition-colors"
                            >
                              Buy {card.price}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
            
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default App;
