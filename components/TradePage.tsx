
import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useMarket } from '../context/MarketContext';

interface TradePageAsset {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
}

interface TradePageProps {
  onOpenTradingDesk: () => void;
  onAssetClick: (asset: any) => void;
}

const TradePage: React.FC<TradePageProps> = ({ onOpenTradingDesk, onAssetClick }) => {
  const [activeTab, setActiveTab] = useState('Stocks');
  const { prices } = useMarket();

  const stocks: TradePageAsset[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 273.08, changePercent: -0.25, isPositive: false },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 486.99, changePercent: 2.10, isPositive: true },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 454.43, changePercent: -1.13, isPositive: false },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 180.39, changePercent: 1.45, isPositive: true },
    { symbol: 'XOM', name: 'Exxon Mobil Corporation', price: 112.35, changePercent: 5.61, isPositive: true },
    { symbol: 'MA', name: 'Mastercard Incorporated', price: 425.67, changePercent: 6.89, isPositive: true },
  ];

  const crypto: TradePageAsset[] = [
    { symbol: 'BTC', name: 'Bitcoin', price: 96432.10, changePercent: 2.45, isPositive: true },
    { symbol: 'ETH', name: 'Ethereum', price: 2970.16, changePercent: -0.17, isPositive: false },
    { symbol: 'SOL', name: 'Solana', price: 212.45, changePercent: 4.12, isPositive: true },
    { symbol: 'MATIC', name: 'Polygon', price: 0.65, changePercent: 0.00, isPositive: true },
    { symbol: 'TRX', name: 'Tron', price: 0.28, changePercent: -0.49, isPositive: false },
    { symbol: 'APT', name: 'Aptos', price: 1.69, changePercent: -1.18, isPositive: false },
  ];

  const currentAssets = activeTab === 'Stocks' ? stocks : activeTab === 'Crypto' ? crypto : [];

  const renderAssetRow = (asset: TradePageAsset) => {
    // Try to get live price from context if available
    const liveData = prices[asset.symbol];
    const displayPrice = liveData ? liveData.price : asset.price;
    const displayChange = liveData ? liveData.changePercent : asset.changePercent;
    const isUp = displayChange >= 0;
    
    // Pulse effect when price moves
    const flashClass = liveData?.lastAction === 'up' ? 'bg-green-500/5' : liveData?.lastAction === 'down' ? 'bg-red-500/5' : '';

    return (
      <div 
        key={asset.symbol} 
        onClick={() => onAssetClick(asset)}
        className={`bg-[#141414]/60 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-900/40 hover:border-white/10 transition-all cursor-pointer active:scale-[0.98] ${flashClass}`}
      >
        <div>
          <h4 className="font-extrabold text-white tracking-tight text-base">{asset.symbol}</h4>
          <p className="text-xs text-zinc-500 font-bold">{asset.name}</p>
        </div>
        <div className="text-right">
          <p className={`font-extrabold text-white transition-colors duration-300 ${liveData?.lastAction === 'up' ? 'text-green-400' : liveData?.lastAction === 'down' ? 'text-red-400' : ''}`}>
            ${displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-xs font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? '+' : ''}{displayChange.toFixed(2)}%
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">Trading Hub</p>
        <h2 className="text-2xl font-bold text-white mb-2">Ready to trade, Franklin?</h2>
        <p className="text-sm text-zinc-500 font-medium">Launch live trading or explore curated market ideas.</p>
      </header>

      {/* Live Trading Card */}
      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] pointer-events-none" />
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Live Trading</p>
        <h3 className="text-xl font-bold text-white mb-2">Trade crypto & stocks</h3>
        <p className="text-sm text-zinc-500 mb-6 max-w-[240px]">Use the advanced trading workstation for real-time execution.</p>
        
        <button 
          onClick={onOpenTradingDesk}
          className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
        >
          Open Trading Desk <ArrowRight size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/5 pb-2 overflow-x-auto scrollbar-hide">
        {['Stocks', 'Crypto', 'History'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div className="space-y-3 pb-20">
        {currentAssets.map(renderAssetRow)}
        {activeTab === 'History' && (
          <div className="text-center py-10">
            <p className="text-zinc-500 text-sm font-medium">No recent trading history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradePage;
