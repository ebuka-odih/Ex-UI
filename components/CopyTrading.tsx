
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Trophy, Users, History, TrendingUp, Shield, Star, Copy, Settings, X, MoreHorizontal, UserCheck, AlertCircle, LayoutGrid, Target, Check, Loader2, Sparkles } from 'lucide-react';

interface Trader {
  id: string;
  name: string;
  username: string;
  avatarColor: string;
  return: number;
  winRate: number;
  copiers: number;
  isFollowing: boolean;
  strategy: string;
  isVerified?: boolean;
  allocated?: number;
  pnl?: number;
  trades?: number;
  riskScore: number; // Added for filtering logic
  joinedDate: number; // Added for "Rising Stars" logic
}

const TRADERS_DATA: Trader[] = [
  { id: '1', name: 'Tommy Massey', username: 'day_trading', avatarColor: 'emerald', return: 145.2, winRate: 68, copiers: 1240, isFollowing: true, strategy: 'day_trading', allocated: 100.00, pnl: 0.00, trades: 12, riskScore: 4, joinedDate: Date.now() - 10000000 },
  { id: '2', name: 'THOMAS', username: 'day_trading', avatarColor: 'emerald', return: 89.4, winRate: 52, copiers: 2450, isFollowing: true, strategy: 'day_trading', allocated: 100.00, pnl: 0.00, trades: 45, riskScore: 3, joinedDate: Date.now() - 50000000 },
  { id: '3', name: 'Frank Taylor', username: 'DCA& MOMENTUM', avatarColor: 'emerald', return: 210.5, winRate: 36, copiers: 312, isFollowing: false, strategy: 'DCA& MOMENTUM', isVerified: true, riskScore: 6, joinedDate: Date.now() - 1000000 },
  { id: '4', name: 'Elite Trader', username: 'scalp_master', avatarColor: 'emerald', return: 12.4, winRate: 78, copiers: 154, isFollowing: false, strategy: 'SCALPING', riskScore: 2, joinedDate: Date.now() - 20000000 },
  { id: '5', name: 'Alpha Whale', username: 'alpha_w', avatarColor: 'blue', return: 340.1, winRate: 82, copiers: 5600, isFollowing: false, strategy: 'LONG_TERM', riskScore: 2, joinedDate: Date.now() - 80000000 },
  { id: '6', name: 'Neo Trader', username: 'neo_1', avatarColor: 'purple', return: 15.6, winRate: 91, copiers: 45, isFollowing: false, strategy: 'SCALPING', riskScore: 1, joinedDate: Date.now() - 500000 },
];

type FilterType = 'Top Return' | 'Most Copied' | 'Low Risk' | 'Rising Stars';

const CopyTrading: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Discover' | 'Following' | 'History'>('Discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('Top Return');
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [allocation, setAllocation] = useState('100');
  const [copyRatio, setCopyRatio] = useState(2);
  const [modalStatus, setModalStatus] = useState<'input' | 'processing' | 'success'>('input');
  
  const [traders, setTraders] = useState<Trader[]>(TRADERS_DATA);

  const followingCount = traders.filter(t => t.isFollowing).length;
  const totalAllocated = traders.filter(t => t.isFollowing).reduce((sum, t) => sum + (t.allocated || 0), 0);

  const filterInfo = {
    'Top Return': {
      icon: TrendingUp,
      title: 'Highest Total Return',
      description: 'Showing traders with the best historical performance.',
      color: 'text-emerald-500'
    },
    'Most Copied': {
      icon: Copy,
      title: 'Total Copiers',
      description: 'Highlighting the most trusted and popular traders in the community.',
      color: 'text-blue-500'
    },
    'Low Risk': {
      icon: Shield,
      title: 'Risk Level',
      description: 'Focusing on traders with steady performance and higher win rates.',
      color: 'text-yellow-500'
    },
    'Rising Stars': {
      icon: Star,
      title: 'Rising Stars',
      description: 'Featuring new, high-performance traders with growing momentum.',
      color: 'text-purple-500'
    }
  };

  const filteredAndSortedTraders = useMemo(() => {
    let result = [...traders];

    // Search filter
    if (searchQuery) {
      result = result.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Logic
    switch (activeFilter) {
      case 'Top Return':
        result.sort((a, b) => b.return - a.return);
        break;
      case 'Most Copied':
        result.sort((a, b) => b.copiers - a.copiers);
        break;
      case 'Low Risk':
        result = result.filter(t => t.riskScore <= 3).sort((a, b) => b.winRate - a.winRate);
        break;
      case 'Rising Stars':
        result.sort((a, b) => b.joinedDate - a.joinedDate);
        break;
    }

    return result;
  }, [traders, searchQuery, activeFilter]);

  const handleCopyClick = (trader: Trader) => {
    setSelectedTrader(trader);
    setIsEditing(false);
    setAllocation('100');
    setCopyRatio(2);
    setModalStatus('input');
  };

  const handleManageClick = (trader: Trader) => {
    setSelectedTrader(trader);
    setIsEditing(true);
    setAllocation(trader.allocated?.toString() || '100');
    setCopyRatio(2); 
    setModalStatus('input');
  };

  const handleStartCopying = () => {
    setModalStatus('processing');
    setTimeout(() => {
      setModalStatus('success');
      setTraders(prev => prev.map(t => 
        t.id === selectedTrader?.id 
          ? { ...t, isFollowing: true, allocated: parseFloat(allocation) } 
          : t
      ));
    }, 1500);
  };

  const handleFinish = () => {
    setSelectedTrader(null);
    setActiveTab('Following');
  };

  const renderStats = () => (
    <div className="bg-[#0c120e] border border-[#1a2d21] rounded-2xl p-5 mb-6 flex justify-between items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="text-center flex-1">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Following</p>
        <p className="text-2xl font-black text-white">{followingCount}</p>
      </div>
      <div className="w-[1px] h-8 bg-white/5" />
      <div className="text-center flex-1">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Allocated</p>
        <p className="text-2xl font-black text-white">${totalAllocated.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
      </div>
      <div className="w-[1px] h-8 bg-white/5" />
      <div className="text-center flex-1">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total P&L</p>
        <p className="text-2xl font-black text-emerald-500">$0.00</p>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="bg-[#1a1a1e] p-1 rounded-xl flex gap-1 mb-6">
      <button 
        onClick={() => setActiveTab('Discover')}
        className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-black transition-all ${activeTab === 'Discover' ? 'bg-[#0a0a0a] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-400'}`}
      >
        <Trophy size={14} /> Discover
      </button>
      <button 
        onClick={() => setActiveTab('Following')}
        className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-black transition-all ${activeTab === 'Following' ? 'bg-[#0a0a0a] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-400'}`}
      >
        <Users size={14} /> Following
      </button>
      <button 
        onClick={() => setActiveTab('History')}
        className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-black transition-all ${activeTab === 'History' ? 'bg-[#0a0a0a] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-400'}`}
      >
        <History size={14} /> History
      </button>
    </div>
  );

  const renderDiscover = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search traders..."
          className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-white/10 transition-all placeholder:text-zinc-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: TrendingUp, label: 'Top Return' as const, color: 'text-emerald-500' },
          { icon: Copy, label: 'Most Copied' as const, color: 'text-blue-500' },
          { icon: Shield, label: 'Low Risk' as const, color: 'text-yellow-500' },
          { icon: Star, label: 'Rising Stars' as const, color: 'text-purple-500' },
        ].map((cat) => {
          const isActive = activeFilter === cat.label;
          return (
            <button 
              key={cat.label} 
              onClick={() => setActiveFilter(cat.label)}
              className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all duration-300 active:scale-95 group relative ${
                isActive 
                  ? 'bg-emerald-500/10 border-emerald-500/60 ring-2 ring-emerald-500/20' 
                  : 'bg-[#121212] border-white/5 hover:bg-white/[0.02]'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-emerald-500/5 blur-xl pointer-events-none rounded-2xl" />
              )}
              <cat.icon className={`${isActive ? 'text-emerald-400 scale-110' : cat.color} transition-transform`} size={20} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-[#0c140e] border border-emerald-500/20 rounded-2xl p-4 flex gap-4 items-center animate-in fade-in zoom-in-95">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
          {React.createElement(filterInfo[activeFilter].icon, { size: 14, className: 'text-emerald-500' })}
        </div>
        <p className="text-[12px] text-zinc-300 leading-snug font-medium">
          Sorting by <span className="text-white font-black">{filterInfo[activeFilter].title}</span>. {filterInfo[activeFilter].description}
        </p>
      </div>

      <div className="space-y-4">
        {filteredAndSortedTraders.map((trader) => (
          <div key={trader.id} className="bg-[#121212] border border-white/5 rounded-[24px] p-5 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-500/10 text-emerald-500 text-xl font-black">
                  {trader.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-white">{trader.name}</h4>
                    {trader.isVerified && (
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full">
                        <UserCheck size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-black text-zinc-500 uppercase">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">{trader.strategy}</p>
                </div>
              </div>
              <button 
                onClick={() => handleCopyClick(trader)}
                className={`px-6 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                  trader.isFollowing 
                    ? 'border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700' 
                    : 'bg-[#10b981] text-black hover:bg-[#059669]'
                }`}
              >
                {trader.isFollowing ? 'Following' : 'Copy'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
              <div>
                <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Return</p>
                <p className="text-emerald-500 font-black">+{trader.return.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Win Rate</p>
                <p className="text-white font-black">{trader.winRate}%</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Copiers</p>
                <p className="text-white font-black">{trader.copiers.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
        {filteredAndSortedTraders.length === 0 && (
          <div className="py-20 text-center bg-[#121212] rounded-3xl border border-dashed border-white/10">
            <Search className="mx-auto text-zinc-800 mb-4" size={40} />
            <p className="text-zinc-500 font-black">No traders match your search.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderFollowing = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {traders.filter(t => t.isFollowing).map((trader) => (
        <div key={trader.id} className="bg-[#121212] border border-white/5 rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-500/10 text-emerald-500 text-lg font-black">
                {trader.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-black text-white">{trader.name}</h4>
                  <span className="bg-emerald-500/20 text-emerald-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Active</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Allocated</p>
                  <p className="text-[10px] font-black text-white">${trader.allocated?.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleManageClick(trader)}
              className="p-2 text-zinc-600 hover:text-white transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
            <div>
              <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Allocated</p>
              <p className="text-white font-black">${trader.allocated?.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">P&L</p>
              <p className="text-emerald-500 font-black">${trader.pnl?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Trades</p>
                <p className="text-white font-black">{trader.trades}</p>
              </div>
              <button className="p-2 text-red-500/50 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
      {traders.filter(t => t.isFollowing).length === 0 && (
        <div className="bg-[#121212] border border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
          <Users size={48} className="text-zinc-800 mb-4" />
          <h4 className="text-lg font-black text-white mb-2">No active copies</h4>
          <p className="text-sm text-zinc-600 font-medium">Browse our top traders in Discover to start mirroring their moves.</p>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="bg-[#121212] border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
      <LayoutGrid size={48} className="text-zinc-800 mb-6" />
      <h4 className="text-xl font-black text-white mb-3">No copy trades yet</h4>
      <p className="text-sm text-zinc-600 font-medium leading-relaxed max-w-[240px]">
        Your copied trades will appear here once you start following traders
      </p>
    </div>
  );

  return (
    <div className="px-4 py-6 pb-32 max-w-xl mx-auto min-h-screen">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Copy Trading</h2>
        <p className="text-sm text-zinc-500 font-medium">Follow top traders and mirror their moves</p>
      </header>

      {renderStats()}
      {renderTabs()}

      {activeTab === 'Discover' && renderDiscover()}
      {activeTab === 'Following' && renderFollowing()}
      {activeTab === 'History' && renderHistory()}

      {/* Copy Flow Modal */}
      {selectedTrader && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[#121212] w-full max-w-md rounded-[32px] p-6 border border-white/5 animate-in slide-in-from-bottom-8 shadow-2xl relative overflow-hidden">
            
            {/* Modal Content - Input Stage */}
            {modalStatus === 'input' && (
              <div className="animate-in fade-in zoom-in-95">
                <button 
                  onClick={() => setSelectedTrader(null)}
                  className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center mt-4 mb-8">
                  <h3 className="text-xl font-black text-white mb-1">
                    {isEditing ? 'Manage Copy Settings' : `Copy ${selectedTrader.name}`}
                  </h3>
                  <p className="text-zinc-500 text-xs font-bold leading-relaxed px-4">
                    {isEditing 
                      ? `Adjust your allocation and copy ratio for ${selectedTrader.name} .`
                      : 'Configure your copy trading settings'
                    }
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Allocation Amount */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black text-white uppercase tracking-widest block">Allocation Amount ($)</label>
                      <span className="text-emerald-500 font-black text-sm">${allocation}</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        value={allocation}
                        onChange={(e) => setAllocation(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 px-4 text-xl font-black text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-800"
                        placeholder="100"
                      />
                    </div>
                    {!isEditing && <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Min: $100</p>}
                  </div>

                  {/* Copy Ratio */}
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black text-white uppercase tracking-widest">Copy Ratio</label>
                      <span className="text-base font-black text-emerald-500">{copyRatio}x</span>
                    </div>
                    <div className="relative pt-2">
                      <input 
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={copyRatio}
                        onChange={(e) => setCopyRatio(parseFloat(e.target.value))}
                        className="w-full h-2 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <div className="absolute -inset-x-1 top-2 h-2 bg-emerald-500 rounded-full -z-10" style={{ width: `${(copyRatio / 5) * 100}%` }} />
                    </div>
                    {isEditing ? (
                      <p className="text-[11px] font-bold text-zinc-600 leading-relaxed italic px-1">
                        Example: If the leader risks $100 and your ratio is 0.5x, your account will risk $50.
                      </p>
                    ) : (
                      <p className="text-[10px] font-black text-zinc-600 leading-tight uppercase tracking-widest">
                        Multiply the leader's trade size by this ratio
                      </p>
                    )}
                  </div>

                  {!isEditing && (
                    <div className="bg-[#1a1a1e]/50 border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="text-emerald-500" size={20} />
                      </div>
                      <p className="text-sm font-bold text-zinc-300 leading-relaxed py-1">
                        Trades will be copied automatically in real-time
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <button 
                      onClick={handleStartCopying}
                      className="w-full py-4 bg-[#10b981] hover:bg-[#059669] text-black font-black rounded-full uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98]"
                    >
                      {isEditing ? 'Save Changes' : 'Start Copying'}
                    </button>
                    <button 
                      onClick={() => setSelectedTrader(null)}
                      className="w-full py-4 border border-zinc-800 hover:border-zinc-700 text-zinc-400 font-black rounded-full uppercase tracking-widest text-sm transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Processing Stage */}
            {modalStatus === 'processing' && (
              <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                <div className="relative mb-8">
                  <Loader2 size={48} className="text-emerald-500 animate-spin" strokeWidth={3} />
                  <div className="absolute inset-0 bg-emerald-500/20 blur-2xl animate-pulse" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Setting up Copy</h3>
                <p className="text-zinc-500 text-sm font-bold">Synchronizing account with leader moves...</p>
              </div>
            )}

            {/* Success Stage */}
            {modalStatus === 'success' && (
              <div className="animate-in zoom-in-95 duration-500 text-center pb-4">
                <div className="flex flex-col items-center mb-8 mt-6">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
                    <Check size={40} className="text-emerald-500" strokeWidth={3} />
                    <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20" />
                    <Sparkles className="absolute -top-1 -right-1 text-yellow-400 animate-bounce" size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">You're All Set!</h3>
                  <p className="text-zinc-500 text-sm font-bold max-w-[280px]">
                    Successfully linked to <span className="text-white">{selectedTrader.name}</span>.
                  </p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-4 mb-10 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Allocation</span>
                    <span className="font-black text-white text-lg">${allocation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Copy Ratio</span>
                    <span className="font-black text-emerald-500 text-lg">{copyRatio}x</span>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[11px] font-bold text-zinc-500 leading-relaxed italic">
                      Mirroring will start automatically on the next trade. You can manage these settings anytime from your Following list.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleFinish}
                  className="w-full py-4 bg-white text-black font-black rounded-full uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98]"
                >
                  View My Following
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default CopyTrading;
