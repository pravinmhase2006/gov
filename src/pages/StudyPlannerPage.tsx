import React from 'react';
import StudyPlanner from '@/components/tools/StudyPlanner';

export default function StudyPlannerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <StudyPlanner />
      </div>
    </div>
  );
}
