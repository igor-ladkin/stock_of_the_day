import type { StockData } from '../types/stock';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StockCardProps {
  stock: StockData;
  totalScore: number;
}

export const StockCard = ({ stock, totalScore }: StockCardProps) => {
  const isPositive = stock.changePercent > 0;
  const isNegative = stock.changePercent < 0;

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(1)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {stock.ticker}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {stock.companyName}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${stock.currentPrice.toFixed(2)}
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' :
            isNegative ? 'text-red-600 dark:text-red-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {isNegative && <TrendingDown className="w-4 h-4" />}
            {!isPositive && !isNegative && <Minus className="w-4 h-4" />}
            <span>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Market Cap
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatMarketCap(stock.marketCap)}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Volume
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatVolume(stock.volume)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Interest Score
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {totalScore}/50
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(totalScore / 50) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
          {stock.sector}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {stock.description}
      </p>
    </div>
  );
};
