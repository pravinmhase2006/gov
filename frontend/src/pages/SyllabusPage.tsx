import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Search, FileText } from 'lucide-react';
import { dataService } from '@/services/dataService';

export default function SyllabusPage() {
  const [search, setSearch] = useState('');
  const [syllabusList, setSyllabusList] = useState<any[]>([
    { title: 'SSC CGL Tier 1 & Tier 2 Detailed Subject-Wise Syllabus 2026', exam: 'SSC CGL', size: '2.4 MB', downloadUrl: '#' },
    { title: 'UPSC Civil Services (Preliminary & Main) Detailed Syllabus PDF', exam: 'UPSC CSE', size: '3.1 MB', downloadUrl: '#' },
    { title: 'RRB NTPC CBT 1 & CBT 2 Topic-Wise Weightage & Syllabus 2026', exam: 'RRB NTPC', size: '1.8 MB', downloadUrl: '#' },
    { title: 'IBPS PO & Clerk Comprehensive Quantitative & Reasoning Syllabus', exam: 'IBPS PO', size: '2.0 MB', downloadUrl: '#' },
    { title: 'UP Police Constable Examination Syllabus & Physical Standards', exam: 'UP Police', size: '1.5 MB', downloadUrl: '#' },
  ]);

  useEffect(() => {
    async function loadDynamicSyllabus() {
      const data = await dataService.getSyllabus();
      if (data && data.length > 0) {
        setSyllabusList(data.map((d: any) => ({
          title: d.title,
          exam: d.exam,
          size: '2.5 MB',
          downloadUrl: d.downloadUrl || '#',
        })));
      }
    }
    loadDynamicSyllabus();
  }, []);

  const filtered = syllabusList.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.exam.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 rounded-2xl">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Official Exam Syllabus & Pattern 2026</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Download verified chapter-wise syllabus, marks weightage, and negative marking schemes.
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
              placeholder="Search syllabus by exam name..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">{filtered.length} Syllabus Guides</span>
        </div>

        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-blue-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[10px] font-bold rounded">
                  {item.exam}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <span className="text-xs text-slate-400">PDF File • {item.size}</span>
              </div>

              <a
                href={item.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Syllabus PDF</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
