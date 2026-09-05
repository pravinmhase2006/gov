import React, { useState, useEffect } from 'react';
import { useSearchParams } from '@/lib/navigation';
import JobCard from '@/components/jobs/JobCard';
import JobFilterSidebar from '@/components/jobs/JobFilterSidebar';
import { dataService, Job } from '@/services/dataService';
import { Briefcase, Search, Filter } from 'lucide-react';
import DataBoundary from '@/components/common/DataBoundary';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const categoryFilter = searchParams.get('category') || 'all';
  const qualificationFilter = searchParams.get('qualification') || 'all';
  const stateFilter = searchParams.get('state') || 'all';

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getJobs();
      setJobs(data);
    } catch (err: any) {
      console.error('Error loading jobs', err);
      setError(err?.message || 'Failed to load government job notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const q = searchTerm.toLowerCase();
    const orgName = (job.organization?.name || (job as any).organization || '').toLowerCase();
    const orgCategory = (job.organization?.category || job.category || '').toLowerCase();
    const jobTitle = (job.title || '').toLowerCase();
    const postName = (job.postName || '').toLowerCase();
    const qual = (job.qualification || '').toLowerCase();
    const jobState = (job.state || 'All India').toLowerCase();

    const matchesSearch =
      !q ||
      jobTitle.includes(q) ||
      orgName.includes(q) ||
      postName.includes(q);

    const matchesCategory =
      categoryFilter === 'all' ||
      orgCategory.includes(categoryFilter.toLowerCase()) ||
      (job.category && job.category.toLowerCase().includes(categoryFilter.toLowerCase()));

    const matchesQualification =
      qualificationFilter === 'all' ||
      qualificationFilter === 'All Qualifications' ||
      qual.includes(qualificationFilter.toLowerCase());

    const matchesState =
      stateFilter === 'all' || jobState.includes(stateFilter.toLowerCase());

    return matchesSearch && matchesCategory && matchesQualification && matchesState;
  });

  const categories = [
    { id: '1', name: 'Central Govt', slug: 'Central Govt' },
    { id: '2', name: 'Railways', slug: 'Railways' },
    { id: '3', name: 'Banking', slug: 'Banking' },
    { id: '4', name: 'Defence', slug: 'Defence' },
    { id: '5', name: 'Police', slug: 'Police' },
    { id: '6', name: 'Teaching', slug: 'Teaching' },
  ];

  const states = [
    { id: '1', name: 'All India', code: 'IN' },
    { id: '2', name: 'Delhi', code: 'DL' },
    { id: '3', name: 'Maharashtra', code: 'MH' },
    { id: '4', name: 'Uttar Pradesh', code: 'UP' },
    { id: '5', name: 'Bihar', code: 'BR' },
    { id: '6', name: 'Rajasthan', code: 'RJ' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 rounded-2xl">
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Latest Government Job Notifications</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Explore active vacancies, age eligibility, qualification requirements, and official direct application links.
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <JobFilterSidebar categories={categories} states={states} />
          </div>

          {/* Jobs Listing */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by keyword..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-4">
                Showing {filteredJobs.length} Jobs
              </span>
            </div>

            <DataBoundary
              loading={loading}
              error={error}
              isEmpty={filteredJobs.length === 0}
              onRetry={loadJobs}
              loadingComponent={<CardSkeleton count={4} />}
              emptyTitle="No Government Jobs Matched"
              emptyDescription="No vacancies currently match your selected filters. Try broadening your qualification, state, or category search."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
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
                      salary: job.salaryText || 'Standard Grade Pay',
                      state: job.state || 'All India',
                      lastDate: job.lastDate,
                      isFeatured: job.isFeatured,
                      isTrending: job.isTrending,
                      category: job.category || 'Central Govt',
                    }}
                  />
                ))}
              </div>
            </DataBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
