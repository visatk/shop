import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Search, ServerCrash } from "lucide-react";
import { toast } from 'sonner';

// Keep your existing CardData and BinDetails interfaces here...
interface BinDetails { brand: string; type: string; category: string; iso_code_2: string; country_name: string; flag: string; }
interface CardData { cardNumber: string; bin: string; expMonth: string; expYear: string; cvv: string; bank: string; city: string; state: string; zip: string; price: string; binDetails: BinDetails; }

export default function Marketplace() {
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
  const [toggles, setToggles] = useState({ ssnDob: false, mmn: false, address: false, phone: false, email: false });

  const handleToggle = (key: keyof typeof toggles) => (checked: boolean) => {
    setToggles(prev => ({ ...prev, [key]: checked }));
  };

  const fetchCards = useCallback(async (params: Record<string, string | number> = { limit: 50 }) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All' && String(value).trim() !== '') {
          queryParams.append(key, String(value).trim());
        }
      });

      const response = await fetch(`/api/v1/cards?${queryParams.toString()}`);
      if (!response.ok) throw new Error(`Worker returned status: ${response.status}`);
      
      const result = await response.json();
      if (!result.data) {
        setCards([]);
      } else {
        setCards(result.data);
      }
    } catch (e: any) {
      setError("Unable to communicate with the edge network. Please try again later.");
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

  return (
    <div className="space-y-6">
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start sm:items-center gap-3 shadow-sm">
        <div className="bg-rose-500/20 p-2 rounded-lg mt-0.5 sm:mt-0">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
        </div>
        <div className="text-sm text-rose-200/80 leading-relaxed">
          <strong className="text-rose-300 font-semibold block sm:inline mr-1">Security Notice:</strong>
          Our only official domain is <span className="bg-rose-950 px-1.5 py-0.5 rounded text-rose-300 border border-rose-800/50 font-mono text-xs">visatk.us</span>. We do not operate via Telegram or Discord.
        </div>
      </div>

      <Card className="bg-[#1a1e28] border-slate-800/60 shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <form onSubmit={handleSearch} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              {/* Block 1 */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">BIN Prefix</Label>
                  <Input placeholder="e.g. 414720" value={bins} onChange={(e) => setBins(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">City</Label>
                  <Input placeholder="e.g. New York" value={city} onChange={(e) => setCity(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 h-10" />
                </div>
                  <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Network Brand</Label>
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10"><SelectValue placeholder="All Brands" /></SelectTrigger>
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
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Database Base</Label>
                  <Select value={base} onValueChange={setBase}>
                    <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10"><SelectValue placeholder="All Bases" /></SelectTrigger>
                    <SelectContent className="bg-[#1a1e28] border-slate-700">
                      <SelectItem value="All">Any Base</SelectItem>
                      <SelectItem value="APR#12_USA">APR#12_USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">State / Region</Label>
                  <Input placeholder="e.g. NY" value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Card Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10"><SelectValue placeholder="All Types" /></SelectTrigger>
                    <SelectContent className="bg-[#1a1e28] border-slate-700">
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="CREDIT">CREDIT</SelectItem>
                      <SelectItem value="DEBIT">DEBIT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Block 3 */}
              <div className="space-y-5">
                  <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Expiration Date</Label>
                  <Input placeholder="MM/YYYY" value={exp} onChange={(e) => setExp(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">ZIP / Postal Code</Label>
                  <Input placeholder="e.g. 10001" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="bg-[#111318] border-slate-700/50 focus-visible:ring-blue-500/50 h-10" />
                </div>
              </div>

              {/* Block 4 */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Issuing Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="bg-[#111318] border-slate-700/50 h-10"><SelectValue placeholder="All Countries" /></SelectTrigger>
                    <SelectContent className="bg-[#1a1e28] border-slate-700">
                      <SelectItem value="All">Worldwide</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider w-full md:w-auto self-center">Require Data:</span>
                {[{ id: 'ssnDob', label: 'SSN + DOB' }, { id: 'mmn', label: 'MMN' }, { id: 'address', label: 'Address' }, { id: 'phone', label: 'Phone' }, { id: 'email', label: 'Email' }].map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Switch id={item.id} checked={toggles[item.id as keyof typeof toggles]} onCheckedChange={handleToggle(item.id as keyof typeof toggles)} className="data-[state=checked]:bg-blue-600 scale-90" />
                    <Label htmlFor={item.id} className="text-slate-300 font-medium cursor-pointer text-sm">{item.label}</Label>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 h-10 px-8">
                {loading ? <div className="w-4 h-4 mr-2 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                {loading ? 'Searching Edge...' : 'Query Inventory'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-slate-800/60 bg-[#1a1e28] shadow-xl overflow-hidden relative min-h-[400px]">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#1a1e28] z-10">
            <div className="bg-rose-500/10 p-4 rounded-full mb-4"><ServerCrash className="w-8 h-8 text-rose-500" /></div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Connection Failed</h3>
            <p className="text-slate-400 max-w-sm">{error}</p>
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
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={`skel-${i}`} className="border-b border-slate-800/40">
                      <TableCell className="px-6 py-4"><Skeleton className="h-5 w-14 bg-slate-800" /></TableCell>
                      <TableCell><div className="space-y-2"><Skeleton className="h-4 w-24 bg-slate-800" /></div></TableCell>
                      <TableCell><div className="space-y-2"><Skeleton className="h-4 w-28 bg-slate-800" /></div></TableCell>
                      <TableCell><Skeleton className="h-6 w-12 bg-slate-800" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40 bg-slate-800" /></TableCell>
                      <TableCell className="text-right pr-6"><Skeleton className="h-8 w-20 bg-slate-800 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : cards.length === 0 ? (
                  <TableRow className="hover:bg-transparent border-0"><TableCell colSpan={6} className="h-[300px] text-center text-slate-500">No inventory matches your filters.</TableCell></TableRow>
                ) : (
                  cards.map((card, index) => (
                    <TableRow key={`${card.cardNumber}-${index}`} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors group">
                      <TableCell className="font-semibold text-slate-300 py-3 px-6 whitespace-nowrap">{card.expMonth}/{card.expYear.slice(-2)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={`font-bold tracking-wide ${card.binDetails.brand === 'VISA' ? 'text-blue-400' : 'text-slate-200'}`}>{card.binDetails.brand}</span>
                          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">{card.binDetails.type}</span>
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
                      <TableCell className="text-sm text-slate-400 max-w-[220px] truncate">{card.bank || 'Unknown Issuer'}</TableCell>
                      <TableCell className="text-right pr-6 align-middle">
                        <Button size="sm" onClick={() => toast.success('Added to cart')} className="bg-[#242a35] hover:bg-emerald-600/90 text-emerald-400 hover:text-white border border-slate-700/50 font-medium">
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
    </div>
  );
}
