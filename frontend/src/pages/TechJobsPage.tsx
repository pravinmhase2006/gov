import React, { useState, useEffect } from 'react';
import TechJobCard from '@/components/tech/TechJobCard';
import { dataService, TechJob } from '@/services/dataService';
import { Cpu, Search, Briefcase } from 'lucide-react';

import DataBoundary from '@/components/common/DataBoundary';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import EmptyState from '@/components/common/EmptyState';

export default function TechJobsPage() {
  const [techJobs, setTechJobs] = useState<TechJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadTechJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getTechJobs();
      setTechJobs(data);
    } catch (err: any) {
      console.error('Error loading tech jobs', err);
      setError(err?.message || 'Failed to load tech careers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTechJobs();
  }, []);

  const filtered = techJobs.filter(
    (tj) =>
      tj.title.toLowerCase().includes(search.toLowerCase()) ||
      tj.company.toLowerCase().includes(search.toLowerCase()) ||
      (tj.skills && tj.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl">
              <Cpu className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Tech & Software Careers in Bharat</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Curated IT, Full-Stack, Python, and AI developer job opportunities with salary transparencies.
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
              placeholder="Search tech roles (React, Node.js, Python, Fresher)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">{filtered.length} Tech Roles</span>
        </div>

        <DataBoundary
          loading={loading}
          error={error}
          isEmpty={filtered.length === 0}
          onRetry={loadTechJobs}
          loadingComponent={<CardSkeleton count={6} />}
          emptyTitle="No Tech Roles Found"
          emptyDescription="No software or tech vacancies match your search term. Try searching for other skills like React, Node.js, or Python."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job) => (
              <TechJobCard
                key={job.id}
                job={{
                  id: job.id,
                  title: job.title,
                  slug: job.slug,
                  company: job.company,
                  location: job.location,
                  workMode: 'Hybrid',
                  experienceLevel: job.experience,
                  salaryRange: job.salary || (job as any).salaryText || 'Best in Industry',
                  roleCategory: 'Engineering',
                  techStack: Array.isArray(job.skills) ? job.skills.join(', ') : 'Software',
                  isFeatured: job.featured || (job as any).isTrending,
                }}
              />
            ))}
          </div>
        </DataBoundary>
      </div>
    </div>
  );
}
