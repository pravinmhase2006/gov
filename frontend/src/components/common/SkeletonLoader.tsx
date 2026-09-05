import React from 'react';

export function CardSkeleton({ count = 3, type = 'job' }: { count?: number; type?: 'job' | 'exam' | 'test' | 'course' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800/60 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
            <div className="h-4 w-full bg-slate-200/60 dark:bg-slate-700/50 rounded" />
            <div className="h-4 w-full bg-slate-200/60 dark:bg-slate-700/50 rounded" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-9 w-28 bg-blue-100 dark:bg-blue-900/30 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4 animate-pulse">
      <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl gap-4">
            <div className="h-5 w-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-1/4 bg-slate-100 dark:bg-slate-800 rounded hidden sm:block" />
            <div className="h-5 w-20 bg-blue-100 dark:bg-blue-900/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-center">
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/60 rounded mx-auto" />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/60 rounded" />
        </div>
      ))}
    </div>
  );
}
