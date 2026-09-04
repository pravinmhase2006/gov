'use client';

import React, { useRef } from 'react';
import { Download, Printer, CheckCircle, Award, ShieldCheck, QrCode } from 'lucide-react';
import { TestResultReport } from '@/types/tests';

interface ScorecardPdfGeneratorProps {
  report: TestResultReport;
  testTitle: string;
  candidateName?: string;
}

export default function ScorecardPdfGenerator({
  report,
  testTitle,
  candidateName = 'GovtPrep Aspirant',
}: ScorecardPdfGeneratorProps) {
  const scorecardRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const isPassed = report.percentage >= 40;

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <Printer className="w-4 h-4" />
          Print / Save PDF Scorecard
        </button>
      </div>

      {/* Official Scorecard Preview Card */}
      <div
        ref={scorecardRef}
        className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md print:shadow-none print:border-none print:m-0"
      >
        {/* Scorecard Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-slate-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-black text-xl shadow-inner">
              GP
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                GovtPrep &amp; TechPrep India Examination Cell
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Official CBT Mock Performance Scorecard
              </h2>
            </div>
          </div>

          <div className="text-right sm:border-l sm:pl-6 border-slate-200">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Test Attempt</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Candidate & Test Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Candidate Name</span>
            <span className="font-bold text-slate-900 text-sm">{candidateName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Test Name</span>
            <span className="font-bold text-slate-900 line-clamp-1">{testTitle}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Passing Status</span>
            <span className={`font-black ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPassed ? 'PASSED (QUALIFIED)' : 'NEEDS IMPROVEMENT'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated AIR Rank</span>
            <span className="font-black text-blue-600">Top {Math.max(1, 100 - Math.round(report.percentage))}%</span>
          </div>
        </div>

        {/* Performance Metrics Big Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 text-center">
            <span className="text-[11px] font-semibold text-blue-700 block">Marks Obtained</span>
            <span className="text-3xl font-black text-blue-900 mt-1 block">
              {report.score} <span className="text-xs text-blue-500 font-bold">/ {report.totalMarks}</span>
            </span>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[11px] font-semibold text-emerald-700 block">Percentage</span>
            <span className="text-3xl font-black text-emerald-900 mt-1 block">
              {report.percentage}%
            </span>
          </div>

          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 text-center">
            <span className="text-[11px] font-semibold text-purple-700 block">Accuracy</span>
            <span className="text-3xl font-black text-purple-900 mt-1 block">
              {report.accuracy}%
            </span>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100 text-center">
            <span className="text-[11px] font-semibold text-amber-700 block">Correct / Attempted</span>
            <span className="text-3xl font-black text-amber-900 mt-1 block">
              {report.correctCount} <span className="text-xs text-amber-600 font-bold">/ {report.correctCount + report.incorrectCount}</span>
            </span>
          </div>
        </div>

        {/* Verification Footer & QR Code */}
        <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded-xl flex flex-col items-center justify-center text-[8px] font-bold text-slate-600">
              <QrCode className="w-8 h-8 text-slate-800 mb-0.5" />
              <span>SCAN VERIFY</span>
            </div>
            <div>
              <p className="font-bold text-slate-800">GovtPrep India Automated Evaluation Engine</p>
              <p className="text-[11px] text-slate-400">Scorecard ID: GP-{Date.now().toString().slice(-8)}</p>
              <p className="text-[10px] text-slate-400">https://govtprep.in/verify</p>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-block border-b border-slate-400 px-6 pb-1 font-serif italic text-slate-700 font-bold">
              Controller of Examinations
            </div>
            <span className="block text-[9px] text-slate-400 mt-1">GovtPrep &amp; TechPrep India Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
