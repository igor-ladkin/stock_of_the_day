import type { StockData, MarketSignal, StockRecommendation } from '../types/stock';

const fakeStocks: StockData[] = [
  {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    currentPrice: 875.42,
    previousClose: 852.30,
    change: 23.12,
    changePercent: 2.71,
    volume: 45678900,
    marketCap: 2150000000000,
    sector: 'Technology',
    description: 'Designs and manufactures graphics processing units and system on a chip units for gaming and professional markets.'
  },
  {
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    currentPrice: 245.67,
    previousClose: 238.90,
    change: 6.77,
    changePercent: 2.83,
    volume: 67890100,
    marketCap: 780000000000,
    sector: 'Automotive',
    description: 'Electric vehicles, clean energy and sustainable power generation and storage.'
  },
  {
    ticker: 'AMD',
    companyName: 'Advanced Micro Devices, Inc.',
    currentPrice: 156.78,
    previousClose: 148.25,
    change: 8.53,
    changePercent: 5.75,
    volume: 34567800,
    marketCap: 253000000000,
    sector: 'Technology',
    description: 'Semiconductor company that develops computer processors and related technologies.'
  },
  {
    ticker: 'META',
    companyName: 'Meta Platforms, Inc.',
    currentPrice: 498.32,
    previousClose: 485.10,
    change: 13.22,
    changePercent: 2.73,
    volume: 23456700,
    marketCap: 1260000000000,
    sector: 'Technology',
    description: 'Social media and technology company that connects billions of people.'
  },
  {
    ticker: 'NFLX',
    companyName: 'Netflix, Inc.',
    currentPrice: 678.45,
    previousClose: 665.20,
    change: 13.25,
    changePercent: 1.99,
    volume: 12345600,
    marketCap: 293000000000,
    sector: 'Communication Services',
    description: 'Streaming entertainment service with movies, TV shows, and original content.'
  }
];

const marketSignals: MarketSignal[] = [
  {
    id: 'volume-spike',
    name: 'Volume Spike',
    description: 'Trading volume 50% above average',
    impact: 'positive',
    strength: 8,
    category: 'technical',
    icon: '📈'
  },
  {
    id: 'price-momentum',
    name: 'Price Momentum',
    description: '5%+ gain in the last 5 days',
    impact: 'positive',
    strength: 7,
    category: 'technical',
    icon: '🚀'
  },
  {
    id: 'analyst-upgrade',
    name: 'Analyst Upgrade',
    description: 'Recent positive analyst revisions',
    impact: 'positive',
    strength: 6,
    category: 'fundamental',
    icon: '📊'
  },
  {
    id: 'earnings-beat',
    name: 'Earnings Beat',
    description: 'Better than expected quarterly results',
    impact: 'positive',
    strength: 9,
    category: 'fundamental',
    icon: '💰'
  },
  {
    id: 'insider-buying',
    name: 'Insider Buying',
    description: 'Company executives purchasing shares',
    impact: 'positive',
    strength: 8,
    category: 'fundamental',
    icon: '👔'
  },
  {
    id: 'sector-rotation',
    name: 'Sector Rotation',
    description: 'Money flowing into the sector',
    impact: 'positive',
    strength: 5,
    category: 'sentiment',
    icon: '🔄'
  },
  {
    id: 'social-trending',
    name: 'Social Trending',
    description: 'High social media engagement',
    impact: 'positive',
    strength: 4,
    category: 'sentiment',
    icon: '📱'
  },
  {
    id: 'short-squeeze',
    name: 'Short Squeeze Potential',
    description: 'High short interest with price momentum',
    impact: 'positive',
    strength: 7,
    category: 'technical',
    icon: '🔥'
  }
];

export const getFakeStockRecommendation = (): StockRecommendation => {
  // Randomly select a stock
  const stock = fakeStocks[Math.floor(Math.random() * fakeStocks.length)];

  // Randomly select 3-5 signals
  const shuffledSignals = [...marketSignals].sort(() => 0.5 - Math.random());
  const selectedSignals = shuffledSignals.slice(0, Math.floor(Math.random() * 3) + 3);

  // Calculate total score
  const totalScore = selectedSignals.reduce((sum, signal) => sum + signal.strength, 0);

  // Generate reasoning
  const reasoning = `${stock.companyName} (${stock.ticker}) is showing strong momentum with a ${stock.changePercent.toFixed(2)}% gain today. ` +
    `The stock is attracting attention due to ${selectedSignals.map(s => s.name.toLowerCase()).join(', ')}. ` +
    `With a market cap of $${(stock.marketCap / 1000000000).toFixed(1)}B, this ${stock.sector.toLowerCase()} company ` +
    `deserves closer attention from investors looking for growth opportunities.`;

  return {
    stock,
    signals: selectedSignals,
    totalScore,
    reasoning,
    date: new Date().toISOString().split('T')[0]
  };
};

export const getFakeStockData = (ticker: string): StockData | null => {
  return fakeStocks.find(stock => stock.ticker === ticker) || null;
};
