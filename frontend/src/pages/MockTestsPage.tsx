import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { dataService, MockTest } from '@/services/dataService';
import { Layers, Clock, Award, CheckCircle2, Play, Users, Sparkles } from 'lucide-react';

import DataBoundary from '@/components/common/DataBoundary';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import EmptyState from '@/components/common/EmptyState';

export default function MockTestsPage() {
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getMockTests();
      setTests(data);
    } catch (err: any) {
      console.error('Error loading mock tests', err);
      setError(err?.message || 'Failed to load free live mock tests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/50 rounded-2xl">
              <Layers className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-[10px] font-bold mb-1 border border-rose-200 dark:border-rose-800">
                <Sparkles className="w-3 h-3" /> Real Exam Interface CBT
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Free All-India Live Mock Tests</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Practice in the exact NTA/TCS CBT software pattern with instant AI scorecards, rank predictors, and section analytics.
              </p>
            </div>
          </div>
        </div>

        <DataBoundary
          loading={loading}
          error={error}
          isEmpty={tests.length === 0}
          onRetry={loadTests}
          loadingComponent={<CardSkeleton count={4} />}
          emptyTitle="No Mock Tests Scheduled"
          emptyDescription="Live CBT mock tests for SSC, RRB, and Banking are currently being scheduled. Check back shortly."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-elevated hover:border-rose-500 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-lg">
                      {test.examName}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                      ✓ 100% FREE
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {test.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Duration</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{test.durationMinutes} Mins</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Questions</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{test.totalQuestions} Qs</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Marks</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{test.totalMarks} M</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>{test.attemptsCount.toLocaleString('en-IN')} Aspirants Attempted</span>
                    </div>
                    <span className="font-semibold text-amber-600">Difficulty: {test.difficulty}</span>
                  </div>
                </div>

                <Link
                  to={`/mock-tests/${test.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black shadow-md hover:shadow-lg transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Live Test Now</span>
                </Link>
              </div>
            ))}
          </div>
        </DataBoundary>
      </div>
    </div>
  );
}
