import { useState, useEffect } from 'react';
import { RefreshCw, Calendar, Lightbulb } from 'lucide-react';
import { StockCard } from './components/StockCard';
import { SignalIndicator } from './components/SignalIndicator';
import { ThemeToggle } from './components/ThemeToggle';
import { getFakeStockRecommendation } from './services/fakeStockData';
import type { StockRecommendation } from './types/stock';

function App() {
  const [recommendation, setRecommendation] = useState<StockRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecommendation = (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    // Simulate API delay
    setTimeout(() => {
      const newRecommendation = getFakeStockRecommendation();
      setRecommendation(newRecommendation);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadRecommendation();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Finding today's stock recommendation...</p>
        </div>
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Failed to load recommendation</p>
          <button
            onClick={() => loadRecommendation()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ThemeToggle />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Stock of the Day
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your daily NASDAQ stock recommendation
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{recommendation.date}</span>
            </div>
            <button
              onClick={() => loadRecommendation(true)}
              disabled={refreshing}
              className={`flex items-center gap-1 transition-all duration-200 ${refreshing
                ? 'text-blue-600 dark:text-blue-400 cursor-not-allowed'
                : 'hover:text-blue-600 dark:hover:text-blue-400'
                }`}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Loading...' : 'New Recommendation'}</span>
            </button>
          </div>
        </div>

        {/* Main Content with fade transition */}
        <div className={`transition-opacity duration-500 ${refreshing ? 'opacity-50' : 'opacity-100'}`}>
          {/* Main Stock Card */}
          <div className="mb-8">
            <StockCard
              stock={recommendation.stock}
              totalScore={recommendation.totalScore}
            />
          </div>

          {/* Reasoning Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Why This Stock?
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {recommendation.reasoning}
            </p>
          </div>

          {/* Market Signals */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Market Signals ({recommendation.signals.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendation.signals.map((signal) => (
                <SignalIndicator key={signal.id} signal={signal} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            This is a demo app with simulated data. Not financial advice.
          </p>
          <p>
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
