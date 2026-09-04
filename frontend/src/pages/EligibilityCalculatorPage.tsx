import React from 'react';
import EligibilityCalculator from '@/components/jobs/EligibilityCalculator';

export default function EligibilityCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <EligibilityCalculator />
      </div>
    </div>
  );
}
