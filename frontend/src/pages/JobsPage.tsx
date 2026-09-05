import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from '@/lib/navigation';
import JobCard from '@/components/jobs/JobCard';
import JobFilterSidebar from '@/components/jobs/JobFilterSidebar';
import { dataService, Job } from '@/services/dataService';
import {
  Briefcase,
  Search,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Building2,
  X,
  ChevronRight,
  Calendar,
  IndianRupee,
  MapPin,
  GraduationCap,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import DataBoundary from '@/components/common/DataBoundary';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import Link from '@/components/common/Link';
import { formatDate } from '@/lib/utils';

export default function JobsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categoryFilter = searchParams.get('category') || 'all';
  const qualificationFilter = searchParams.get('qualification') || 'all';
  const stateFilter = searchParams.get('state') || 'all';
  const sortFilter = searchParams.get('sort') || 'latest';
  const quickTab = searchParams.get('tab') || 'all';

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

  // Synchronize search term with URL params if updated externally
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchTerm(q);
  }, [searchParams]);

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all' && value !== 'All Qualifications') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const removeFilter = (key: string) => {
    updateSearchParam(key, 'all');
  };

  const categories = [
    { id: '1', name: 'Central Govt', slug: 'Central Govt' },
    { id: '2', name: 'Railways', slug: 'Railways' },
    { id: '3', name: 'Banking', slug: 'Banking' },
    { id: '4', name: 'Defence', slug: 'Defence' },
    { id: '5', name: 'Police', slug: 'Police' },
    { id: '6', name: 'Teaching', slug: 'Teaching' },
    { id: '7', name: 'SSC / Staff Selection', slug: 'SSC' },
    { id: '8', name: 'UPSC / Civil Services', slug: 'UPSC' },
  ];

  const states = [
    { id: '1', name: 'All India', code: 'IN' },
    { id: '2', name: 'Delhi', code: 'DL' },
    { id: '3', name: 'Maharashtra', code: 'MH' },
    { id: '4', name: 'Uttar Pradesh', code: 'UP' },
    { id: '5', name: 'Bihar', code: 'BR' },
    { id: '6', name: 'Rajasthan', code: 'RJ' },
    { id: '7', name: 'Madhya Pradesh', code: 'MP' },
    { id: '8', name: 'Karnataka', code: 'KA' },
  ];

  // Quick category tabs with icons
  const quickTabs = [
    { label: 'All Jobs', value: 'all', icon: Briefcase },
    { label: 'Closing Soon', value: 'closing_soon', icon: Clock },
    { label: 'Railways', value: 'Railways', icon: Building2 },
    { label: 'Banking', value: 'Banking', icon: Building2 },
    { label: 'Defence', value: 'Defence', icon: Sparkles },
    { label: 'Central Govt', value: 'Central Govt', icon: Building2 },
    { label: '10th/12th Pass', value: '10th Pass', icon: GraduationCap },
  ];

  // Metric calculation
  const totalLiveVacancies = useMemo(() => {
    return jobs.reduce((acc, curr) => acc + (curr.totalVacancies || 0), 0);
  }, [jobs]);

  const closingSoonCount = useMemo(() => {
    const now = new Date().getTime();
    const sevenDaysLater = now + 7 * 24 * 60 * 60 * 1000;
    return jobs.filter((j) => {
      if (!j.lastDate) return false;
      const last = new Date(j.lastDate).getTime();
      return last >= now && last <= sevenDaysLater;
    }).length;
  }, [jobs]);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const q = searchTerm.trim().toLowerCase();
      const orgName = (job.organization?.name || (job as any).organization || '').toLowerCase();
      const orgCategory = (job.organization?.category || job.category || '').toLowerCase();
      const jobTitle = (job.title || '').toLowerCase();
      const postName = (job.postName || '').toLowerCase();
      const qual = (job.qualification || '').toLowerCase();
      const jobState = (job.state || 'All India').toLowerCase();

      // Search keyword
      const matchesSearch =
        !q ||
        jobTitle.includes(q) ||
        orgName.includes(q) ||
        postName.includes(q) ||
        qual.includes(q);

      // Quick Tab
      let matchesQuickTab = true;
      if (quickTab === 'closing_soon') {
        const now = new Date().getTime();
        const sevenDays = now + 7 * 24 * 60 * 60 * 1000;
        const last = job.lastDate ? new Date(job.lastDate).getTime() : 0;
        matchesQuickTab = Boolean((last >= now && last <= sevenDays) || job.isUrgent);
      } else if (quickTab === '10th Pass') {
        matchesQuickTab = qual.includes('10th') || qual.includes('12th') || qual.includes('matric');
      } else if (quickTab !== 'all') {
        matchesQuickTab =
          orgCategory.includes(quickTab.toLowerCase()) ||
          Boolean(job.category && job.category.toLowerCase().includes(quickTab.toLowerCase()));
      }

      // Sector / Category filter
      const matchesCategory =
        categoryFilter === 'all' ||
        orgCategory.includes(categoryFilter.toLowerCase()) ||
        Boolean(job.category && job.category.toLowerCase().includes(categoryFilter.toLowerCase()));

      // Qualification filter
      const matchesQualification =
        qualificationFilter === 'all' ||
        qualificationFilter === 'All Qualifications' ||
        qual.includes(qualificationFilter.toLowerCase());

      // State / Location filter
      const matchesState =
        stateFilter === 'all' ||
        jobState.includes(stateFilter.toLowerCase()) ||
        (stateFilter === 'IN' && jobState.includes('all india'));

      return matchesSearch && matchesQuickTab && matchesCategory && matchesQualification && matchesState;
    });

    // Sorting Engine
    result.sort((a, b) => {
      if (sortFilter === 'closing_soon') {
        const dateA = a.lastDate ? new Date(a.lastDate).getTime() : Infinity;
        const dateB = b.lastDate ? new Date(b.lastDate).getTime() : Infinity;
        return dateA - dateB;
      }
      if (sortFilter === 'most_viewed') {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      if (sortFilter === 'vacancies') {
        return (b.totalVacancies || 0) - (a.totalVacancies || 0);
      }
      // 'latest' default: by createdAt or startDate
      const timeA = new Date(a.createdAt || a.startDate || 0).getTime();
      const timeB = new Date(b.createdAt || b.startDate || 0).getTime();
      return timeB - timeA;
    });

    return result;
  }, [jobs, searchTerm, quickTab, categoryFilter, qualificationFilter, stateFilter, sortFilter]);

  const hasActiveFilters =
    categoryFilter !== 'all' ||
    (qualificationFilter !== 'all' && qualificationFilter !== 'All Qualifications') ||
    stateFilter !== 'all' ||
    Boolean(searchTerm);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 1. Header Banner & Live Stats */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-800/40">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Official Recruitment Notifications</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Government Job Notifications & Vacancies
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore active central & state sarkari vacancies with direct notification PDFs, eligibility matrices, and application deadlines.
              </p>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shrink-0">
              <div className="text-center px-2">
                <div className="text-xl sm:text-2xl font-black text-amber-300">
                  {jobs.length > 0 ? jobs.length : '—'}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Live Posts</div>
              </div>
              <div className="text-center px-2 border-x border-white/15">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  {totalLiveVacancies > 0 ? `${(totalLiveVacancies / 1000).toFixed(1)}k+` : '—'}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Vacancies</div>
              </div>
              <div className="text-center px-2">
                <div className="text-xl sm:text-2xl font-black text-rose-300">
                  {closingSoonCount}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 font-medium">Ending Soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Quick Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {quickTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = quickTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => updateSearchParam('tab', tab.value)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1 sticky top-20">
            <JobFilterSidebar categories={categories} states={states} />
          </div>

          {/* Mobile Filter Modal */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
              <div className="w-full max-w-sm bg-slate-50 dark:bg-slate-950 h-full p-4 overflow-y-auto shadow-2xl">
                <JobFilterSidebar
                  categories={categories}
                  states={states}
                  onCloseMobile={() => setMobileFilterOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Right Column: Controls Bar, Active Filter Chips & Job Listings */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Search & Layout Control Toolbar */}
            <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateSearchParam('q', e.target.value);
                  }}
                  placeholder="Search by job title, organization (SSC, UPSC, SBI), qualification..."
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      updateSearchParam('q', '');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Switcher & Mobile Filter Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </button>

                {/* Grid / List View Toggle */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    title="List View"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                </span>
              </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 p-2.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-900/40 text-xs">
                <span className="font-semibold text-blue-900 dark:text-blue-300 mr-1">Active Filters:</span>
                {categoryFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium shadow-xs">
                    Sector: {categoryFilter}
                    <button onClick={() => removeFilter('category')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {qualificationFilter !== 'all' && qualificationFilter !== 'All Qualifications' && (
                  <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium shadow-xs">
                    Qual: {qualificationFilter}
                    <button onClick={() => removeFilter('qualification')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {stateFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium shadow-xs">
                    State: {stateFilter}
                    <button onClick={() => removeFilter('state')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium shadow-xs">
                    Keyword: "{searchTerm}"
                    <button onClick={() => { setSearchTerm(''); updateSearchParam('q', ''); }} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => router.push(pathname)}
                  className="ml-auto text-rose-600 dark:text-rose-400 hover:underline font-semibold"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Job Listings Area */}
            <DataBoundary
              loading={loading}
              error={error}
              isEmpty={filteredJobs.length === 0}
              onRetry={loadJobs}
              loadingComponent={<CardSkeleton count={4} />}
              emptyTitle="No Matching Government Jobs Found"
              emptyDescription="No current vacancies match your selected filters. Try broadening your qualification, sector, or state selection."
            >
              {viewMode === 'grid' ? (
                /* Grid Layout */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={{
                        id: job.id,
                        title: job.title,
                        slug: job.slug,
                        organization: job.organization?.name || 'Govt Department',
                        organizationCode: job.organization?.shortName || 'GOVT',
                        totalVacancies: job.totalVacancies,
                        qualification: job.qualification,
                        salary: job.salaryText || 'Standard Grade Pay',
                        state: job.state || 'All India',
                        lastDate: job.lastDate,
                        isFeatured: job.isFeatured,
                        isTrending: job.isTrending,
                        isUrgent: job.isUrgent,
                        category: job.category || 'Central Govt',
                      }}
                    />
                  ))}
                </div>
              ) : (
                /* High-Density List Layout */
                <div className="space-y-3">
                  {filteredJobs.map((job) => {
                    const orgShort = job.organization?.shortName || job.organization?.name || 'GOVT';
                    return (
                      <div
                        key={job.id}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-4 transition-all shadow-xs hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                      >
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200 dark:border-blue-800">
                              {orgShort}
                            </span>
                            {job.isFeatured && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-[10px] border border-amber-200 dark:border-amber-800">
                                Featured
                              </span>
                            )}
                            {job.isUrgent && (
                              <span className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-bold text-[10px] border border-red-200 dark:border-red-800">
                                Closing Soon
                              </span>
                            )}
                          </div>

                          <Link
                            href={`/jobs/${job.slug}`}
                            className="block font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate"
                          >
                            {job.title}
                          </Link>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                            <span className="inline-flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                              {job.qualification}
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                              <Users className="w-3.5 h-3.5" />
                              {job.totalVacancies > 0 ? `${job.totalVacancies.toLocaleString()} Posts` : 'Various'}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-rose-500" />
                              {job.state || 'All India'}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <IndianRupee className="w-3.5 h-3.5 text-amber-500" />
                              {job.salaryText || '7th CPC'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Deadline: <span className="font-bold text-slate-800 dark:text-slate-200">{job.lastDate ? formatDate(job.lastDate) : 'Open'}</span>
                          </div>
                          <Link
                            href={`/jobs/${job.slug}`}
                            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-xs"
                          >
                            <span>View Notification</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </DataBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
