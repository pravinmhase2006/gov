import React from 'react';
import { BookOpen, ExternalLink, Star } from 'lucide-react';

interface RecommendedBooksProps {
  examCategory?: string;
}

const bookCatalog: Record<string, { title: string; author: string; subject: string; rating: number; link: string }[]> = {
  default: [
    {
      title: 'Quantitative Aptitude for Competitive Examinations',
      author: 'Dr. R.S. Aggarwal',
      subject: 'Mathematics & Arithmetic',
      rating: 4.8,
      link: 'https://amazon.in',
    },
    {
      title: 'A Modern Approach to Verbal & Non-Verbal Reasoning',
      author: 'R.S. Aggarwal',
      subject: 'Logical & Analytical Reasoning',
      rating: 4.7,
      link: 'https://amazon.in',
    },
    {
      title: 'General Knowledge 2026 Handbook',
      author: 'Lucent Publications',
      subject: 'Static GK, History & Polity',
      rating: 4.9,
      link: 'https://amazon.in',
    },
    {
      title: 'Objective General English',
      author: 'S.P. Bakshi (Arihant)',
      subject: 'Grammar & Vocabulary',
      rating: 4.6,
      link: 'https://amazon.in',
    },
  ],
};

export default function RecommendedBooks({ examCategory = 'default' }: RecommendedBooksProps) {
  const books = bookCatalog[examCategory] || bookCatalog.default;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          Recommended Preparation Books &amp; Resources
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase">Toppers' Choice</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {books.map((b, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 transition-colors flex flex-col justify-between space-y-2"
          >
            <div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {b.subject}
              </span>
              <h4 className="font-bold text-slate-900 line-clamp-2 mt-1.5">{b.title}</h4>
              <p className="text-slate-500 text-[11px]">By {b.author}</p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                <Star className="w-3.5 h-3.5 fill-current" /> {b.rating}
              </div>
              <a
                href={b.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View Book</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
