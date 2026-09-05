import React from 'react';
import Link from '@/components/common/Link';
import { BookOpen, Calendar, ArrowRight, Award, CheckCircle2, Clock, Users, Sparkles } from 'lucide-react';
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-blue-500/80 rounded-2xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
            {categoryName}
          </span>
          {exam.isPopular && (
            <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-3 h-3 text-amber-500" /> Popular
            </span>
          )}
        </div>

        <Link href={`/exams/${exam.slug}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-1 font-heading">
            {exam.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{orgName}</p>

        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-850/80 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
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
          {exam.totalApplicants && !exam.upcomingDate && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Applicants:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.totalApplicants}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-500">Official Syllabus & Papers</span>
        <Link
          href={`/exams/${exam.slug}`}
          className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs"
        >
          <span>Explore Exam</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
