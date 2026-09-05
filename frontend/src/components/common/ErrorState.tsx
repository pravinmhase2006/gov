import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = 'Failed to Load Content',
  message = 'We encountered an error while connecting to the live API servers. Please check your internet connection and try again.',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div
      className={`bg-rose-50/50 dark:bg-rose-950/20 rounded-3xl border border-rose-200 dark:border-rose-900/50 p-8 sm:p-10 text-center shadow-xs flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto my-6 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl font-black text-rose-950 dark:text-rose-200">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-400 max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}
