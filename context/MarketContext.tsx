
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { MY_ASSETS, WATCHLIST } from '../constants';

interface PriceState {
  [symbol: string]: {
    price: number;
    changePercent: number;
    lastAction: 'up' | 'down' | 'none';
    timestamp: number;
  };
}

interface MarketContextType {
  prices: PriceState;
  calculatePortfolioValue: (buyingPower: number) => number;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<PriceState>(() => {
    const initial: PriceState = {};
    [...MY_ASSETS, ...WATCHLIST].forEach(asset => {
      initial[asset.symbol] = {
        price: asset.price,
        changePercent: asset.changePercent,
        lastAction: 'none',
        timestamp: Date.now()
      };
    });
    return initial;
  });

  const pricesRef = useRef(prices);
  pricesRef.current = prices;

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrices = { ...pricesRef.current };
      let changed = false;

      // Update a subset of assets each tick for realism
      Object.keys(newPrices).forEach(symbol => {
        if (Math.random() > 0.4) { // 60% chance to tick
          const current = newPrices[symbol];
          const volatility = symbol === 'BTC' || symbol === 'ETH' ? 0.0005 : 0.0002;
          const change = (Math.random() - 0.49) * (current.price * volatility);
          
          newPrices[symbol] = {
            ...current,
            price: current.price + change,
            lastAction: change > 0 ? 'up' : 'down',
            timestamp: Date.now()
          };
          changed = true;
        }
      });

      if (changed) {
        setPrices(newPrices);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const calculatePortfolioValue = (buyingPower: number) => {
    let total = buyingPower;
    MY_ASSETS.forEach(asset => {
      const livePrice = prices[asset.symbol]?.price || asset.price;
      total += livePrice * asset.shares;
    });
    return total;
  };

  return (
    <MarketContext.Provider value={{ prices, calculatePortfolioValue }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarket must be used within MarketProvider');
  return context;
};
