import React from 'react';
import Link from '@/components/common/Link';
import { BookOpen, Calendar, ArrowRight, Award, CheckCircle2, Clock } from 'lucide-react';
import { ExamCardData } from '@/types';

interface ExamCardProps {
  exam: ExamCardData;
}

export default function ExamCard({ exam }: ExamCardProps) {
  const orgName = typeof exam.organization === 'string'
    ? exam.organization
    : (exam.organization?.name || 'Examination Board');

  const categoryName = typeof exam.category === 'string'
    ? exam.category
    : (exam.category?.name || 'Competitive Exam');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-2xl p-5 shadow-sm hover:shadow-elevated transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
            {categoryName}
          </span>
          {exam.isPopular && (
            <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
              🔥 Most Popular
            </span>
          )}
        </div>

        <Link href={`/exams/${exam.slug}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-1">
            {exam.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{orgName}</p>

        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Frequency:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.frequency || 'Annual'}</span>
          </div>
          {exam.upcomingDate && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Next Expected Exam:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{exam.upcomingDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <Link
          href={`/syllabus`}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5" /> Syllabus
        </Link>

        <Link
          href={`/exams/${exam.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Explore Exam</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
