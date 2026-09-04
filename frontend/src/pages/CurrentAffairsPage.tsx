import React, { useState, useEffect } from 'react';
import { dataService, CurrentAffair } from '@/services/dataService';
import { BookOpen, Calendar, Clock, Tag } from 'lucide-react';

export default function CurrentAffairsPage() {
  const [articles, setArticles] = useState<CurrentAffair[]>([]);

  useEffect(() => {
    async function load() {
      const data = await dataService.getCurrentAffairs();
      setArticles(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 border border-blue-400/30 rounded-2xl">
              <BookOpen className="w-8 h-8 text-saffron-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">Daily Current Affairs & Static GK</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Exam-focused daily news analysis, editorial summaries, and GK points for UPSC, SSC, and Banking exams.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-lg">
                  {item.category}
                </span>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {item.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.readTime}
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {item.title}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.summary}
              </p>

              <div className="pt-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                {item.content}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg"
                  >
                    <Tag className="w-3 h-3 text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
