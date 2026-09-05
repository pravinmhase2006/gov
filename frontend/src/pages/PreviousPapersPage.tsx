import React, { useState, useEffect } from 'react';
import { FileCheck2, Download, Search } from 'lucide-react';
import { dataService } from '@/services/dataService';

export default function PreviousPapersPage() {
  const [search, setSearch] = useState('');
  const [papers, setPapers] = useState<any[]>([
    { title: 'SSC CGL 2024 Tier 1 Official Shift-Wise Question Papers with Answer Keys', year: '2024', exam: 'SSC CGL', shifts: '39 Shifts', downloadUrl: '#' },
    { title: 'RRB NTPC 2022 Stage 1 & 2 Original Papers with Solutions', year: '2022', exam: 'RRB NTPC', shifts: '133 Shifts', downloadUrl: '#' },
    { title: 'UPSC Civil Services Prelims GS Paper 1 & CSAT (2015-2024) 10-Year Solved Papers', year: '2015-2024', exam: 'UPSC CSE', shifts: '10 Years', downloadUrl: '#' },
    { title: 'IBPS PO Prelims & Mains (2020-2024) Memory-Based Question Papers', year: '2020-2024', exam: 'IBPS PO', shifts: '5 Years', downloadUrl: '#' },
  ]);

  useEffect(() => {
    async function loadDynamicPapers() {
      const data = await dataService.getPreviousPapers();
      if (data && data.length > 0) {
        setPapers(data.map((d: any) => ({
          title: d.title,
          year: d.year,
          exam: d.exam,
          shifts: d.fileSize || 'Official PDF',
          downloadUrl: d.downloadUrl || '#',
        })));
      }
    }
    loadDynamicPapers();
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
      </div>
    </div>
  );
}
