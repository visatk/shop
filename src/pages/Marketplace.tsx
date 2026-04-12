import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Search, ServerCrash, CreditCard } from "lucide-react";
import { toast } from 'sonner';

// Interfaces...
interface BinDetails { brand: string; type: string; category: string; iso_code_2: string; country_name: string; flag: string; }
interface CardData { cardNumber: string; bin: string; expMonth: string; expYear: string; cvv: string; bank: string; city: string; state: string; zip: string; price: string; binDetails: BinDetails; }

export default function Marketplace() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States...
  const [bins, setBins] = useState('');
  const [base, setBase] = useState('All');
  const [exp, setExp] = useState('');
  const [city, setCity] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('All');
  const [brand, setBrand] = useState('All');
  const [type, setType] = useState('All');
  const [toggles, setToggles] = useState({ ssnDob: false, mmn: false, address: false, phone: false, email: false });

  const handleToggle = (key: keyof typeof toggles) => (checked: boolean) => {
    setToggles(prev => ({ ...prev, [key]: checked }));
  };

  const fetchCards = useCallback(async (params: Record<string, string | number> = { limit: 50 }) => {
    setLoading(true); setError(null);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All' && String(value).trim() !== '') queryParams.append(key, String(value).trim());
      });

      const response = await fetch(`/api/v1/cards?${queryParams.toString()}`);
      if (!response.ok) throw new Error(`Worker returned status: ${response.status}`);
      const result = await response.json();
      setCards(result.data || []);
    } catch (e: any) {
      setError("Unable to communicate with the edge network.");
      toast.error("Network synchronization failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCards({ limit: 50 }); }, [fetchCards]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = { limit: '20' };
    if (bins) params.bin = bins.split(',')[0];
    if (country !== 'All') params.country = country;
    if (brand !== 'All') params.brand = brand;
    if (type !== 'All') params.type = type;
    fetchCards(params);
  };

  const getBrandColor = (brand: string) => {
    switch (brand.toUpperCase()) {
      case 'VISA': return 'text-blue-400';
      case 'MASTERCARD': return 'text-orange-400';
      case 'AMEX': return 'text-sky-300';
      case 'DISCOVER': return 'text-amber-500';
      default: return 'text-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start sm:items-center gap-3 shadow-sm">
        <div className="bg-rose-500/20 p-2 rounded-lg mt-0.5 sm:mt-0 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-sm text-rose-200/90 leading-relaxed">
          <strong className="text-rose-300 font-semibold block sm:inline mr-1">Security Notice:</strong>
          Our only official domain is <span className="bg-[#11141D] px-1.5 py-0.5 rounded text-rose-300 border border-rose-500/30 font-mono text-xs shadow-inner">visatk.us</span>.
        </div>
      </div>

      <Card className="bg-[#151822] border-[#1F2433] shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={handleSearch} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
              {/* Form elements with refined focus states and heights */}
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">BIN Prefix</Label>
                <Input placeholder="e.g. 414720" value={bins} onChange={(e) => setBins(e.target.value)} className="bg-[#090B10] border-[#1F2433] focus-visible:ring-1 focus-visible:ring-blue-500/50 h-9 text-sm placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">City</Label>
                <Input placeholder="e.g. New York" value={city} onChange={(e) => setCity(e.target.value)} className="bg-[#090B10] border-[#1F2433] focus-visible:ring-1 focus-visible:ring-blue-500/50 h-9 text-sm placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Network Brand</Label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger className="bg-[#090B10] border-[#1F2433] h-9 text-sm focus:ring-1 focus:ring-blue-500/50">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151822] border-[#1F2433]">
                    <SelectItem value="All">All Networks</SelectItem>
                    <SelectItem value="VISA">VISA</SelectItem>
                    <SelectItem value="MASTERCARD">MASTERCARD</SelectItem>
                    <SelectItem value="AMEX">AMEX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Database Base</Label>
                <Select value={base} onValueChange={setBase}>
                  <SelectTrigger className="bg-[#090B10] border-[#1F2433] h-9 text-sm">
                    <SelectValue placeholder="All Bases" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151822] border-[#1F2433]">
                    <SelectItem value="All">Any Base</SelectItem>
                    <SelectItem value="APR#12_USA">APR#12_USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">State / Region</Label>
                <Input placeholder="e.g. NY" value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="bg-[#090B10] border-[#1F2433] h-9 text-sm placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Card Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-[#090B10] border-[#1F2433] h-9 text-sm">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151822] border-[#1F2433]">
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="CREDIT">CREDIT</SelectItem>
                    <SelectItem value="DEBIT">DEBIT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">Expiration</Label>
                <Input placeholder="MM/YYYY" value={exp} onChange={(e) => setExp(e.target.value)} className="bg-[#090B10] border-[#1F2433] h-9 text-sm placeholder:text-slate-600" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">ZIP Code</Label>
                <Input placeholder="e.g. 10001" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="bg-[#090B10] border-[#1F2433] h-9 text-sm placeholder:text-slate-600" />
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#1F2433] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-full md:w-auto self-center">Require Data:</span>
                {[{ id: 'ssnDob', label: 'SSN + DOB' }, { id: 'mmn', label: 'MMN' }, { id: 'address', label: 'Address' }, { id: 'phone', label: 'Phone' }, { id: 'email', label: 'Email' }].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Switch id={item.id} checked={toggles[item.id as keyof typeof toggles]} onCheckedChange={handleToggle(item.id as keyof typeof toggles)} className="data-[state=checked]:bg-blue-600 scale-[0.85]" />
                    <Label htmlFor={item.id} className="text-slate-300 font-medium cursor-pointer text-xs">{item.label}</Label>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.25)] transition-all h-9 px-6 text-sm">
                {loading ? <div className="w-3.5 h-3.5 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Search className="w-3.5 h-3.5 mr-2" />}
                {loading ? 'Searching...' : 'Query Inventory'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Modern Data Table */}
      <div className="rounded-xl border border-[#1F2433] bg-[#151822] shadow-lg overflow-hidden relative min-h-[400px]">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
            <div className="bg-rose-500/10 p-3 rounded-full mb-3 shadow-[0_0_15px_rgba(244,63,94,0.15)]"><ServerCrash className="w-6 h-6 text-rose-500" /></div>
            <h3 className="text-base font-semibold text-slate-200 mb-1">Connection Failed</h3>
            <p className="text-sm text-slate-400 max-w-sm">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full text-sm">
              <TableHeader className="bg-[#11141D] sticky top-0 z-10 border-b border-[#1F2433]">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-slate-400 font-semibold h-10 text-[10px] uppercase tracking-widest whitespace-nowrap px-6">Exp</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest whitespace-nowrap">Network</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest whitespace-nowrap">Location</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest whitespace-nowrap">Geo</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest whitespace-nowrap">Issuer</TableHead>
                  <TableHead className="text-slate-400 font-semibold text-[10px] uppercase tracking-widest whitespace-nowrap text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={`skel-${i}`} className="border-b border-[#1F2433]/50">
                      <TableCell className="px-6 py-3"><Skeleton className="h-4 w-12 bg-[#1F2433]" /></TableCell>
                      <TableCell><div className="space-y-1.5"><Skeleton className="h-3.5 w-20 bg-[#1F2433]" /><Skeleton className="h-2.5 w-14 bg-[#1F2433]/50" /></div></TableCell>
                      <TableCell><div className="space-y-1.5"><Skeleton className="h-3.5 w-24 bg-[#1F2433]" /><Skeleton className="h-2.5 w-16 bg-[#1F2433]/50" /></div></TableCell>
                      <TableCell><Skeleton className="h-5 w-8 bg-[#1F2433]" /></TableCell>
                      <TableCell><Skeleton className="h-3.5 w-32 bg-[#1F2433]" /></TableCell>
                      <TableCell className="text-right pr-6"><Skeleton className="h-7 w-16 bg-[#1F2433] ml-auto rounded-md" /></TableCell>
                    </TableRow>
                  ))
                ) : cards.length === 0 ? (
                  <TableRow className="hover:bg-transparent border-0"><TableCell colSpan={6} className="h-[300px] text-center text-slate-500 text-sm">No inventory matches your filters.</TableCell></TableRow>
                ) : (
                  cards.map((card, index) => (
                    <TableRow key={`${card.cardNumber}-${index}`} className="border-b border-[#1F2433]/50 hover:bg-[#1A1F2C] transition-colors group">
                      <TableCell className="font-medium text-slate-300 py-3 px-6 whitespace-nowrap">{card.expMonth}/{card.expYear.slice(-2)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={`font-bold tracking-wide ${getBrandColor(card.binDetails.brand)}`}>{card.binDetails.brand}</span>
                          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">{card.binDetails.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                          <div className="flex flex-col">
                            <span className="text-slate-300 capitalize">{card.city?.toLowerCase() || '—'}</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{card.state} {card.zip}</span>
                          </div>
                      </TableCell>
                      <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-xl leading-none drop-shadow-sm" title={card.binDetails.country_name}>{card.binDetails.flag}</span>
                            <span className="text-[11px] font-semibold text-slate-400">{card.binDetails.iso_code_2}</span>
                          </div>
                      </TableCell>
                      <TableCell className="text-slate-400 max-w-[200px] truncate">{card.bank || 'Unknown Issuer'}</TableCell>
                      <TableCell className="text-right pr-6 align-middle">
                        <Button 
                          size="sm" 
                          onClick={() => toast.success('Added to cart')} 
                          className="h-7 bg-transparent hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 font-medium transition-all"
                        >
                          Buy <span className="ml-1 opacity-80">{card.price}</span>
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
    </div>
  );
}
