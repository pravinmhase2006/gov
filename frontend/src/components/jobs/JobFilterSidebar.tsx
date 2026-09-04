import React from 'react';
import { useRouter, useSearchParams, usePathname } from '@/lib/navigation';
import { Filter, X, RefreshCcw, Check } from 'lucide-react';

interface FilterSidebarProps {
  categories: { id: string; name: string; slug: string }[];
  states: { id: string; name: string; code: string }[];
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

export default function JobFilterSidebar({ categories, states }: FilterSidebarProps) {
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
    // reset page to 1
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters =
    (currentQualification && currentQualification !== 'All Qualifications') ||
    currentState !== 'all' ||
    currentCategory !== 'all' ||
    currentSort !== 'latest' ||
    currentQ;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filters & Refinements</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold"
          >
            <RefreshCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Qualification Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Educational Qualification
        </h4>
        <div className="space-y-1">
          {qualifications.map((q) => {
            const isSelected =
              q === currentQualification || (q === 'All Qualifications' && currentQualification === 'All Qualifications');
            return (
              <button
                key={q}
                onClick={() => updateFilter('qualification', q)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
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
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Job Sector / Category
        </h4>
        <select
          value={currentCategory}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Location / State
        </h4>
        <select
          value={currentState}
          onChange={(e) => updateFilter('state', e.target.value)}
          className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All India & Union Territories</option>
          {states.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Sort Results By
        </h4>
        <select
          value={currentSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Latest Published</option>
          <option value="closing_soon">Closing Soonest</option>
          <option value="most_viewed">Most Popular</option>
          <option value="vacancies">Highest Vacancies</option>
        </select>
      </div>
    </div>
  );
}
