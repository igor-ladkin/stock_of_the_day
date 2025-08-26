export interface StockData {
  ticker: string;
  companyName: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  description: string;
}

export interface MarketSignal {
  id: string;
  name: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  strength: number; // 1-10
  category: 'technical' | 'fundamental' | 'sentiment';
  icon: string;
}

export interface StockRecommendation {
  stock: StockData;
  signals: MarketSignal[];
  totalScore: number;
  reasoning: string;
  date: string;
}
