import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
        <p>By accessing and utilizing GovtPrep India, you agree to comply with our community terms and conditions.</p>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">1. Intellectual Property</h3>
        <p>Study guides, mock test algorithms, and software utilities are the intellectual property of GovtPrep India.</p>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">2. Accurate Usage</h3>
        <p>Candidates agree to use the discussion forums respectfully and verify official notifications independently.</p>
      </div>
    </div>
  );
}
