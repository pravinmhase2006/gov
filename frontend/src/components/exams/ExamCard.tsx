import React from 'react';
import Link from '@/components/common/Link';
import { BookOpen, Calendar, ArrowRight, Award, CheckCircle2, Clock } from 'lucide-react';
import { ExamCardData } from '@/types';

interface ExamCardProps {
  exam: ExamCardData;
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <div className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-5 shadow-sm hover:shadow-elevated transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">
            {exam.category}
          </span>
          {exam.isPopular && (
            <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              🔥 Most Popular
            </span>
          )}
        </div>

        <Link href={`/exams/${exam.slug}`} className="block group-hover:text-blue-600 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1">
            {exam.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mb-4">{exam.organization.name}</p>

        <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Frequency:</span>
            <span className="font-semibold text-slate-800">{exam.frequency}</span>
          </div>
          {exam.upcomingDate && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Next Expected Exam:</span>
              <span className="font-bold text-blue-600">{exam.upcomingDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          href={`/syllabus/${exam.slug}-syllabus`}
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5" /> Syllabus
        </Link>

        <Link
          href={`/exams/${exam.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Explore Exam</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
