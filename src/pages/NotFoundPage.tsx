import React from 'react';
import Link from '@/components/common/Link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-16 px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-7xl font-black text-blue-600 dark:text-blue-400">404</div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Page Not Found</h1>
        <p className="text-xs text-slate-500">
          The page or vacancy notification you were looking for doesn't exist or has moved.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
