import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { dataService, ResultItem } from '@/services/dataService';
import { Award, Download, Search, CheckCircle2 } from 'lucide-react';

export default function ResultsPage() {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await dataService.getResults();
      setResults(data);
    }
    load();
  }, []);

  const filtered = results.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.organization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl">
              <Award className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">Sarkari Results & Scorecards 2026</h1>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                Direct official merit list PDF downloads, cutoff marks, and candidate selection links.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search results by exam or agency (SSC, UPSC, RRB)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">{filtered.length} Results Declared</span>
        </div>

        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded">
                    {item.organization}
                  </span>
                  <span className="text-[11px] text-slate-500">Declared on {item.releaseDate}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>

              <a
                href={item.directDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Result PDF</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
