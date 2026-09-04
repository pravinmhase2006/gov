import React from 'react';
import CareerComparator from '@/components/tools/CareerComparator';

export default function CareerComparePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <CareerComparator />
      </div>
    </div>
  );
}
