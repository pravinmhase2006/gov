import React from 'react';
import CutoffPredictor from '@/components/tools/CutoffPredictor';

export default function CutoffPredictorPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <CutoffPredictor />
      </div>
    </div>
  );
}
