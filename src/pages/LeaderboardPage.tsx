import React from 'react';
import LeaderboardView from '@/components/tools/LeaderboardView';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <LeaderboardView />
      </div>
    </div>
  );
}
