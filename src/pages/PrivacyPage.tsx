import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        <p>GovtPrep India is committed to safeguarding your privacy and personal data.</p>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">1. Information We Collect</h3>
        <p>We may collect your name, email address, target exam preferences, and test attempt scores when you register on our platform.</p>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">2. How We Use Data</h3>
        <p>Your information is used strictly to personalize job alerts, provide test analytics, and optimize study tools. We do not sell your personal information to third parties.</p>
      </div>
    </div>
  );
}
