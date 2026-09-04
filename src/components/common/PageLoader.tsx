import React from 'react';

export default function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border-2 border-blue-600 border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-blue-600">
          GP
        </div>
      </div>
      <p className="text-xs font-bold text-slate-400 tracking-wide animate-pulse">
        Loading GovtPrep India...
      </p>
    </div>
  );
}
