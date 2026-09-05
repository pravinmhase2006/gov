import React from 'react';
import { useRouter, useSearchParams, usePathname } from '@/lib/navigation';
import { Filter, X, RefreshCcw, Check, Sparkles, Building2, MapPin, GraduationCap, ArrowUpDown } from 'lucide-react';

interface FilterSidebarProps {
  categories: { id: string; name: string; slug: string }[];
  states: { id: string; name: string; code: string }[];
  onCloseMobile?: () => void;
}

const qualifications = [
  'All Qualifications',
  '10th Pass',
  '12th Pass',
  'Graduate',
  'Diploma',
  'ITI',
  'Engineering',
  'Post Graduate',
];

export default function JobFilterSidebar({ categories, states, onCloseMobile }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQualification = searchParams.get('qualification') || 'All Qualifications';
  const currentState = searchParams.get('state') || 'all';
  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'latest';
  const currentQ = searchParams.get('q') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all' && value !== 'All Qualifications') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
    if (onCloseMobile) onCloseMobile();
  };

  const hasActiveFilters =
    (currentQualification && currentQualification !== 'All Qualifications') ||
    currentState !== 'all' ||
    currentCategory !== 'all' ||
    currentSort !== 'latest' ||
    Boolean(currentQ);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
          <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Filters & Refinements</span>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Reset All
            </button>
          )}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Qualification Filter */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Educational Qualification</span>
        </div>
        <div className="space-y-1">
          {qualifications.map((q) => {
            const isSelected =
              q === currentQualification || (q === 'All Qualifications' && currentQualification === 'All Qualifications');
            return (
              <button
                key={q}
                onClick={() => updateFilter('qualification', q)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <span>{q}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Job Sector / Category</span>
        </div>
        <select
          value={currentCategory}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="all">All Sectors (Central, Banking, Railway, etc.)</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* State / Location Filter */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Location / State</span>
        </div>
        <select
          value={currentState}
          onChange={(e) => updateFilter('state', e.target.value)}
          className="w-full text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="all">All India & Union Territories</option>
          {states.map((s) => (
            <option key={s.code} value={s.name}>
              {s.name} ({s.code})
            </option>
          ))}
        </select>
      </div>

      {/* Sorting Filter */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Sort Results By</span>
        </div>
        <select
          value={currentSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="latest">Latest Published</option>
          <option value="closing_soon">Closing Soonest (Urgent)</option>
          <option value="most_viewed">Most Popular</option>
          <option value="vacancies">Highest Vacancies</option>
        </select>
      </div>
    </div>
  );
}
