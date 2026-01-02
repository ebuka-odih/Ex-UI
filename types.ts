
export interface Asset {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  changePercent: number;
  isCrypto: boolean;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface MarketMover {
  symbol: string;
  change: number;
}
