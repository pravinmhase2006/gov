import React, { useState } from 'react';
import { BookOpen, Download, Search, CheckCircle } from 'lucide-react';

export default function StudyMaterialPage() {
  const [search, setSearch] = useState('');

  const materials = [
    { title: 'Complete Indian History & Freedom Struggle Revision Notes (UPSC/SSC)', subject: 'History', size: '5.2 MB', pages: '120 Pages', downloadUrl: '#' },
    { title: 'Quantitative Aptitude 1000+ Shortcut Formulas & Tricks Handbook', subject: 'Maths', size: '3.8 MB', pages: '85 Pages', downloadUrl: '#' },
    { title: 'Reasoning Ability Concept Theory & 500 Practice Questions', subject: 'Reasoning', size: '4.5 MB', pages: '95 Pages', downloadUrl: '#' },
    { title: 'General Science NCERT Summary (Class 6-10 Physics, Chem, Bio)', subject: 'Science', size: '6.1 MB', pages: '140 Pages', downloadUrl: '#' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl">
              <BookOpen className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">Free Study Material & Hand-Written Notes</h1>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                Curated PDF notes, formula sheets, NCERT summaries, and subject-wise revision booklets.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded">
                  {item.subject}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <span className="text-xs text-slate-400 block">{item.pages} • {item.size}</span>
              </div>

              <a
                href={item.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Free PDF Notes</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
