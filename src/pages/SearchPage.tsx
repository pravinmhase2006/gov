import React, { useState, useEffect } from 'react';
import { useSearchParams } from '@/lib/navigation';
import Link from '@/components/common/Link';
import JobCard from '@/components/jobs/JobCard';
import ExamCard from '@/components/exams/ExamCard';
import { dataService, Job, Exam, TechJob } from '@/services/dataService';
import { Search, Sparkles } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ jobs: Job[]; exams: Exam[]; techJobs: TechJob[] }>({
    jobs: [],
    exams: [],
    techJobs: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      const res = await dataService.searchAll(query);
      setResults(res);
      setLoading(false);
    }
    doSearch();
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across 85,000+ jobs, exams, syllabi, and tech careers..."
              className="w-full pl-12 pr-4 py-3 text-base bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500 font-medium animate-pulse">
            Searching all categories...
          </div>
        ) : (
          <div className="space-y-8">
            {/* Jobs matches */}
            {results.jobs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Government Jobs ({results.jobs.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={{
                        id: job.id,
                        title: job.title,
                        slug: job.slug,
                        organization: job.organization.name,
                        organizationCode: job.organization.shortName,
                        totalVacancies: job.totalVacancies,
                        qualification: job.qualification,
                        salary: job.salaryText || 'Standard Pay',
                        state: job.state || 'All India',
                        lastDate: job.lastDate,
                        isFeatured: job.isFeatured,
                        isTrending: job.isTrending,
                        category: job.category || 'Central Govt',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Exams matches */}
            {results.exams.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Competitive Exams ({results.exams.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.exams.map((exam) => (
                    <ExamCard
                      key={exam.id}
                      exam={{
                        id: exam.id,
                        name: exam.name,
                        slug: exam.slug,
                        category: exam.organization.category,
                        organization: exam.organization.name,
                        frequency: exam.frequency || 'Annual',
                        isPopular: exam.isPopular,
                        totalApplicants: '10 Lakh+',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {results.jobs.length === 0 && results.exams.length === 0 && results.techJobs.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
                <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                  No matching results found for "{query}"
                </p>
                <p className="text-xs text-slate-500 mt-1">Try searching for keywords like "SSC", "Railway", "UPSC", or "Graduation".</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
