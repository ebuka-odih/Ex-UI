
import React, { useState } from 'react';
import Header from './components/Header';
import PortfolioCard from './components/PortfolioCard';
import Analytics from './components/Analytics';
import AssetList from './components/AssetList';
import Heatmap from './components/Heatmap';
import BottomNav from './components/BottomNav';
import TradePage from './components/TradePage';
import TradingDesk from './components/TradingDesk';
import AssetDetail from './components/AssetDetail';
import CopyTrading from './components/CopyTrading';
import WalletPage from './components/WalletPage';
import ProfilePage from './components/ProfilePage';
import { MarketProvider } from './context/MarketContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isTradingDeskOpen, setIsTradingDeskOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const handleAssetSelect = (asset: any) => {
    setSelectedAsset(asset);
  };

  if (selectedAsset) {
    return (
      <div className="max-w-xl mx-auto min-h-screen relative bg-[#050505]">
        <AssetDetail asset={selectedAsset} onBack={() => setSelectedAsset(null)} />
        <BottomNav activeTab={activeTab} onTabChange={(tab) => {
          setSelectedAsset(null);
          setActiveTab(tab);
        }} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Trade':
        return (
          <TradePage 
            onOpenTradingDesk={() => setIsTradingDeskOpen(true)} 
            onAssetClick={handleAssetSelect}
          />
        );
      case 'Copy':
        return <CopyTrading />;
      case 'Wallet':
        return <WalletPage />;
      case 'Profile':
        return <ProfilePage />;
      case 'Home':
      default:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <PortfolioCard />
            <div className="h-2 bg-black/40 border-y border-white/5 my-2" />
            <AssetList onAssetClick={handleAssetSelect} />
            <div className="h-2 bg-black/40 border-y border-white/5 my-2" />
            <Analytics />
            <Heatmap />
          </div>
        );
    }
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen pb-24 relative overflow-x-hidden bg-[#050505]">
      {/* Visual background accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[40vh] bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-green-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-0 w-64 h-64 bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

      {activeTab !== 'Profile' && <Header />}
      
      <main>
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {isTradingDeskOpen && (
        <TradingDesk onClose={() => setIsTradingDeskOpen(false)} onSelectAsset={(asset) => {
          setIsTradingDeskOpen(false);
          handleAssetSelect(asset);
        }} />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <MarketProvider>
    <AppContent />
  </MarketProvider>
);

export default App;
