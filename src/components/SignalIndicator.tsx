import type { MarketSignal } from '../types/stock';

interface SignalIndicatorProps {
  signal: MarketSignal;
}

export const SignalIndicator = ({ signal }: SignalIndicatorProps) => {
  const getStrengthColor = (strength: number) => {
    if (strength >= 8) return 'text-green-600 dark:text-green-400';
    if (strength >= 6) return 'text-blue-600 dark:text-blue-400';
    if (strength >= 4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getStrengthBg = (strength: number) => {
    if (strength >= 8) return 'bg-green-100 dark:bg-green-900/30';
    if (strength >= 6) return 'bg-blue-100 dark:bg-blue-900/30';
    if (strength >= 4) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-gray-100 dark:bg-gray-800';
  };

  return (
    <div className={`p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${getStrengthBg(signal.strength)} border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{signal.icon}</span>
          <span className="font-medium text-sm">{signal.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${i < signal.strength
                ? getStrengthColor(signal.strength).replace('text-', 'bg-')
                : 'bg-gray-300 dark:bg-gray-600'
                }`}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        {signal.description}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${signal.impact === 'positive'
          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
          : signal.impact === 'negative'
            ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}>
          {signal.impact}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {signal.category}
        </span>
      </div>
    </div>
  );
};
