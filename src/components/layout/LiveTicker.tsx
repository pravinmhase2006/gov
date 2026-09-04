import React from 'react';
import Link from '@/components/common/Link';
import { Flame, Bell, Sparkles } from 'lucide-react';

const tickerItems = [
  { id: '1', title: 'SSC CGL 2026 Notification Released - 17,727 Vacancies', link: '/jobs/ssc-cgl-recruitment-2026', tag: 'NEW' },
  { id: '2', title: 'RRB NTPC 2026 Application Portal Active - 35,280 Posts', link: '/jobs/rrb-ntpc-recruitment-2026', tag: 'URGENT' },
  { id: '3', title: 'SSC CHSL 2025 Tier 1 Final Result & Cutoff Marks Declared', link: '/results/ssc-chsl-2025-tier-1-result-cutoff', tag: 'RESULT' },
  { id: '4', title: 'SSC MTS 2025 Provisional Answer Key & Objection Link Live', link: '/answer-keys/ssc-mts-2025-answer-key', tag: 'KEY' },
  { id: '5', title: 'UP Police Constable 60,244 Posts Exam City Slip Available', link: '/admit-cards/up-police-constable-admit-card-2026', tag: 'ADMIT CARD' },
  { id: '6', title: 'Free All-India SSC CGL Tier 1 Live Mock Test Available Now', link: '/mock-tests/ssc-cgl-tier-1-all-india-mock-1', tag: 'MOCK TEST' },
];

export default function LiveTicker() {
  return (
    <div className="bg-gradient-to-r from-navy-900 via-blue-900 to-navy-900 text-white text-xs font-medium border-b border-blue-800/50 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
        <div className="flex items-center gap-1.5 bg-saffron-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 uppercase tracking-wider shadow-sm animate-pulse">
          <Flame className="w-3.5 h-3.5" />
          <span>Updates</span>
        </div>

        <div className="overflow-hidden relative flex-1 ml-3">
          <div className="animate-ticker flex items-center gap-8">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={item.link}
                className="inline-flex items-center gap-2 hover:text-saffron-300 transition-colors whitespace-nowrap"
              >
                <span className="bg-blue-800/80 text-blue-200 text-[10px] px-1.5 py-0.2 rounded font-semibold border border-blue-700/50">
                  {item.tag}
                </span>
                <span>{item.title}</span>
                <span className="text-slate-500 mx-2">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
