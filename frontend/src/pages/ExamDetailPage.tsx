import React, { useState, useEffect } from 'react';
import { useParams } from '@/lib/navigation';
import Link from '@/components/common/Link';
import { dataService, Exam } from '@/services/dataService';
import {
  GraduationCap,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  Award,
  ExternalLink,
} from 'lucide-react';

export default function ExamDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExam() {
      if (!slug) return;
      setLoading(true);
      const data = await dataService.getExamBySlug(slug);
      setExam(data || null);
      setLoading(false);
    }
    loadExam();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen py-16 px-4 text-center max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Exam Not Found</h2>
        <Link to="/exams" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Return to Exams
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/exams"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Exams Listing
        </Link>

        {/* Main Exam Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-lg">
              {exam.organization.shortName}
            </span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg">
              {exam.organization.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {exam.name}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Exam Code</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{exam.code}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Conducting Body</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{exam.organization.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Frequency</span>
              <span className="font-bold text-emerald-600">{exam.frequency || 'Annual'}</span>
            </div>
          </div>
        </div>

        {/* Pattern & Selection Details */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <section className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Eligibility Summary
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
              {exam.eligibilitySummary || 'Graduation / Relevant qualification from a recognized university.'}
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              Selection Process & Stages
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
              {exam.selectionProcess || 'Preliminary Examination -> Main Written Examination -> Interview / Skill Test.'}
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Exam Pattern & Marking Scheme
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
              {exam.examPatternSummary || 'Objective multiple choice questions with negative marking per incorrect response.'}
            </p>
          </section>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to="/mock-tests"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow"
            >
              Take Free Mock Tests for this Exam
            </Link>
            <Link
              to="/syllabus"
              className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl transition-colors"
            >
              Download Full Syllabus PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
