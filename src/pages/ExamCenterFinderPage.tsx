import React from 'react';
import ExamCenterFinder from '@/components/tools/ExamCenterFinder';

export default function ExamCenterFinderPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <ExamCenterFinder />
      </div>
    </div>
  );
}
