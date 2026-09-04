import React from 'react';
import Link from '@/components/common/Link';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdBannerProps {
  placement: 'TOP_BANNER' | 'JOB_SIDEBAR' | 'HOMEPAGE_MID' | 'ARTICLE_INLINE' | 'FOOTER_BANNER';
  className?: string;
}

export default function AdBanner({ placement, className = '' }: AdBannerProps) {
  if (placement === 'TOP_BANNER') {
    return (
      <div className={`w-full max-w-7xl mx-auto my-4 px-4 ${className}`}>
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-700/40 shadow-card">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-saffron-500 text-white flex items-center justify-center shrink-0 shadow">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-saffron-400 uppercase">
                Free Preparation Partner
              </span>
              <h4 className="text-sm sm:text-base font-black">
                Join GovtPrep India All-India Test Series 2026
              </h4>
              <p className="text-xs text-slate-300">
                100+ Free Sectional & Full Length Mock Tests with All India Percentile Ranking.
              </p>
            </div>
          </div>
          <Link
            href="/mock-tests"
            className="shrink-0 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <span>Start Free Test</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  if (placement === 'JOB_SIDEBAR') {
    return (
      <div className={`bg-gradient-to-br from-slate-900 to-navy-900 rounded-2xl p-5 text-white border border-slate-800 shadow space-y-3 ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>SPONSORED PREPARATION</span>
          <span className="bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">PRO</span>
        </div>
        <h4 className="text-sm font-bold leading-snug">
          Complete SSC & Railway Solved Papers Handbook (2020-2025)
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          Download PDF notes & chapter-wise formula cheatsheets for Quantitative Aptitude & Reasoning.
        </p>
        <Link
          href="/study-material"
          className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
        >
          Access Study Notes Free
        </Link>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-5xl mx-auto my-6 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-1.5 min-h-[90px] ${className}`}>
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Advertisement Slot</span>
      <p className="text-slate-600 font-medium">
        Targeted Job Aspirant Advertising Placement (Google AdSense Ready)
      </p>
    </div>
  );
}
