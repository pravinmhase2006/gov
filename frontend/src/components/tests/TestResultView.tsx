import React, { useEffect } from 'react';
import Link from '@/components/common/Link';
import {
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TestResultReport } from '@/types';
import ScorecardPdfGenerator from './ScorecardPdfGenerator';

interface TestResultViewProps {
  report: TestResultReport;
  testTitle: string;
  onRetake: () => void;
}

export default function TestResultView({ report, testTitle, onRetake }: TestResultViewProps) {
  useEffect(() => {
    if (report.percentage >= 50) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [report.percentage]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Scorecard & Performance Analysis
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {testTitle}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={onRetake}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Test
              </button>
              <Link
                href="/dashboard"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/80 flex flex-col">
              <span className="text-xs font-semibold text-blue-700">Total Score</span>
              <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">
                {report.score} <span className="text-xs font-medium text-blue-600">/ {report.totalMarks}</span>
              </div>
              <span className="text-[11px] text-blue-700 mt-1 font-medium">
                {report.percentage}% Total Score
              </span>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-2xl border border-emerald-200/80 flex flex-col">
              <span className="text-xs font-semibold text-emerald-700">Accuracy</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">
                {report.accuracy}%
              </div>
              <span className="text-[11px] text-emerald-700 mt-1 font-medium">
                {report.correctCount} Correct of {report.correctCount + report.incorrectCount} attempted
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col">
              <span className="text-xs font-semibold text-amber-700">Time Taken</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-900 mt-1">
                {formatSeconds(report.timeTakenSeconds)}
              </div>
              <span className="text-[11px] text-amber-700 mt-1 font-medium">
                Avg. ~{Math.round(report.timeTakenSeconds / ((report.answers || report.questions || []).length || 1))}s per question
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500">Breakdown</span>
              <div className="flex items-center gap-3 text-xs font-bold mt-1">
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> {report.correctCount}
                </span>
                <span className="text-rose-600 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> {report.incorrectCount}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {report.skippedCount}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Correct / Wrong / Skipped</span>
            </div>
          </div>
        </div>

        {/* Printable Scorecard Generator Section */}
        <ScorecardPdfGenerator report={report} testTitle={testTitle} />

        {/* Detailed Solutions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Detailed Solutions &amp; Explanations ({(report.answers || report.questions || []).length} Questions)
            </h2>
          </div>

          <div className="space-y-4">
            {(report.answers || report.questions || []).map((item: any, idx: number) => {
              return (
                <div
                  key={item.id || item.questionId || idx}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
                    item.userAnswer === null
                      ? 'border-slate-200'
                      : item.isCorrect
                      ? 'border-emerald-300 ring-1 ring-emerald-100'
                      : 'border-rose-300 ring-1 ring-rose-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-bold text-slate-500">
                      Question {idx + 1}
                    </span>
                    <div>
                      {item.userAnswer === null ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                          Skipped
                        </span>
                      ) : item.isCorrect ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Correct (+2.0)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Incorrect (-0.5)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-slate-900 mb-4 leading-relaxed">
                    {item.questionText}
                  </p>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs mb-4">
                    {[
                      { key: 'A', text: item.optionA },
                      { key: 'B', text: item.optionB },
                      { key: 'C', text: item.optionC },
                      { key: 'D', text: item.optionD },
                    ].map((opt) => {
                      const isCorrectOpt = opt.key === item.correctAnswer;
                      const isUserChosen = opt.key === item.userAnswer;

                      let style = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isCorrectOpt) {
                        style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isUserChosen && !isCorrectOpt) {
                        style = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border flex items-center gap-2.5 ${style}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-white/80 border border-current flex items-center justify-center font-bold text-[11px]">
                            {opt.key}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                          {isCorrectOpt && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isUserChosen && !isCorrectOpt && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step by step explanation */}
                  {item.explanation && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                      <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5 text-blue-700">
                        <Sparkles className="w-3.5 h-3.5" /> Step-by-Step Solution:
                      </div>
                      <p className="text-slate-600 leading-relaxed">{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
