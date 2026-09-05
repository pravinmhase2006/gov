import React, { useState, useEffect } from 'react';
import { FileCheck2, Download, Search } from 'lucide-react';
import { dataService } from '@/services/dataService';
import DataBoundary from '@/components/common/DataBoundary';
import { CardSkeleton } from '@/components/common/SkeletonLoader';

export default function PreviousPapersPage() {
  const [search, setSearch] = useState('');
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadPapers() {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getPreviousPapers();
      if (Array.isArray(data) && data.length > 0) {
        setPapers(
          data.map((d: any) => ({
            title: d.title,
            year: d.year || '2024-2026',
            exam: d.exam || 'Govt Exam',
            shifts: d.fileSize || 'Official PDF',
            downloadUrl: d.downloadUrl || '#',
          }))
        );
      } else {
        setPapers([]);
      }
    } catch (err: any) {
      console.error('Failed to load previous papers:', err);
      setError('Unable to load previous question papers. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPapers();
  }, []);

  const filtered = papers.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.exam.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-2xl">
              <FileCheck2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Previous Year Question Papers (PYQ)</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Authentic official shift-wise question papers with official answers and explanations for 10+ exams.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search question papers by exam name (e.g., SSC CGL, RRB NTPC)..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
        </div>

        <DataBoundary
          loading={loading}
          error={error}
          isEmpty={filtered.length === 0}
          onRetry={loadPapers}
          loadingComponent={<CardSkeleton count={4} />}
          emptyTitle="No Question Papers Found"
          emptyDescription="No papers match your search keywords. Try searching for SSC, UPSC, or RRB."
        >
          <div className="space-y-3">
            {filtered.map((paper, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-purple-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-[10px] font-bold rounded">
                      {paper.exam}
                    </span>
                    <span className="text-xs text-slate-500">{paper.shifts}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {paper.title}
                  </h3>
                </div>

                <a
                  href={paper.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Papers PDF</span>
                </a>
              </div>
            ))}
          </div>
        </DataBoundary>
      </div>
    </div>
  );
}

