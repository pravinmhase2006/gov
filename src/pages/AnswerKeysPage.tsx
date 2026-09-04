import React, { useState, useEffect } from 'react';
import { dataService, AnswerKeyItem } from '@/services/dataService';
import { CheckCircle2, Download, Search } from 'lucide-react';

export default function AnswerKeysPage() {
  const [keys, setKeys] = useState<AnswerKeyItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await dataService.getAnswerKeys();
      setKeys(data);
    }
    load();
  }, []);

  const filtered = keys.filter((k) =>
    k.title.toLowerCase().includes(search.toLowerCase()) ||
    k.organization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 border border-amber-400/30 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">Official Answer Keys & Response Sheets</h1>
              <p className="text-xs sm:text-sm text-amber-200 mt-1">
                Check official key solutions, submit online objections, and calculate tentative marks.
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
              placeholder="Search answer keys by exam or body..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">{filtered.length} Answer Keys</span>
        </div>

        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-amber-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[10px] font-bold rounded">
                    {item.organization}
                  </span>
                  <span className="text-[11px] text-rose-500 font-semibold">
                    Objection Last Date: {item.objectionLastDate}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>

              <a
                href={item.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Answer Key</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
