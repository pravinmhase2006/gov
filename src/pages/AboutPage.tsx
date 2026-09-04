import React from 'react';
import { ShieldCheck, Users, Award, BookOpen, Target, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Built for Bharat's Aspirants
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            About GovtPrep India
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Empowering millions of government exam candidates with authentic notifications, real-time exam alerts, free CBT test simulations, and high-performance study tools.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Our Mission</h2>
          <p>
            GovtPrep India was created with a singular focus: to eliminate misinformation, fake job notifications, and inaccessible exam resources for aspirants preparing for SSC, UPSC, Railways, Banking, Defence, and State PSC examinations across Bharat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-slate-900 dark:text-white">100% Verified Info</h3>
              <p className="text-xs text-slate-500">Every notification is cross-referenced with official gazettes and recruitment boards.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white">Free Practice CBTs</h3>
              <p className="text-xs text-slate-500">Accessible All-India mock test engine matching exact TCS/NTA exam interfaces.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <Target className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-slate-900 dark:text-white">Smart Aspirant Tools</h3>
              <p className="text-xs text-slate-500">Photo resizers, typing testers, cutoff predictors, and structured study planners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
