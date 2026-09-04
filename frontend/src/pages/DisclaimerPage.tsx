import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-3xl p-6 sm:p-8 flex items-start gap-4">
          <ShieldAlert className="w-8 h-8 text-saffron-500 shrink-0 mt-1" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-900 dark:text-amber-200">
              Disclaimer & Government Non-Affiliation Policy
            </h1>
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
              Please read this disclaimer carefully before applying to any recruitment notification.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>1. Non-Affiliation Notice:</strong> GovtPrep India (govtprep.in) is an independent private educational and recruitment informational website. We are <strong>NOT</strong> affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with the Government of India, Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Railway Recruitment Boards (RRB), Institute of Banking Personnel Selection (IBPS), or any State Public Service Commission / Government body.
          </p>

          <p>
            <strong>2. Source of Information:</strong> The job advertisements, exam notifications, results, admit cards, and syllabi published on this portal are compiled strictly from publicly available gazette notifications, employment news (Rozgar Samachar), and official government websites for the convenience of candidates.
          </p>

          <p>
            <strong>3. Verification Requirement:</strong> While every effort is made to maintain accuracy, candidates are strongly urged to verify all eligibility rules, age criteria, reservation guidelines, and application procedures directly on the respective official recruitment website prior to submitting application fees.
          </p>
        </div>
      </div>
    </div>
  );
}
