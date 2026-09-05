import React, { useState } from 'react';
import Link from '@/components/common/Link';
import {
  Building2,
  MapPin,
  GraduationCap,
  Calendar,
  IndianRupee,
  Users,
  Bookmark,
  ExternalLink,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { formatDate, formatTimeRemaining } from '@/lib/utils';
import { JobCardData } from '@/types';

interface JobCardProps {
  job: JobCardData;
  isBookmarkedInitial?: boolean;
}

export default function JobCard({ job, isBookmarkedInitial = false }: JobCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarkedInitial);
  const [loading, setLoading] = useState(false);

  const orgShort = typeof job.organization === 'string' 
    ? job.organization 
    : (job.organization?.shortName || job.organization?.name || (job as any).organizationCode || 'GOVT');

  const vacanciesCount = job.vacancies ?? (job as any).totalVacancies ?? 0;
  const locationText = job.location || (job as any).state || 'All India';
  const endDate = job.applicationEnd || (job as any).lastDate;
  const salaryText = job.salary || (job as any).salaryText || 'Standard 7th CPC Pay';
  const qualificationText = job.qualification || 'Any Graduate';

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType: 'JOB',
          itemId: job.id,
          itemTitle: job.title,
          itemSlug: job.slug,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBookmarked(data.bookmarked);
      } else if (res.status === 401) {
        window.location.href = '/login?callback=/jobs/' + job.slug;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const timeRemaining = endDate ? formatTimeRemaining(endDate.toString()) : '';

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 rounded-2xl p-5 shadow-sm hover:shadow-elevated transition-all duration-200 flex flex-col justify-between">
      {/* Top Row: Org Name & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold border border-blue-200/70 dark:border-blue-800">
              {orgShort}
            </span>
            {job.isFeatured && (
              <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Featured
              </span>
            )}
            {job.isUrgent && (
              <span className="inline-flex items-center bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-[11px] font-bold px-2 py-0.5 rounded-md border border-red-200 dark:border-red-800">
                Closing Soon
              </span>
            )}
          </div>

          <button
            onClick={toggleBookmark}
            disabled={loading}
            title={bookmarked ? 'Remove Bookmark' : 'Save Job'}
            className={`p-2 rounded-xl transition-colors ${
              bookmarked
                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Job Title */}
        <Link href={`/jobs/${job.slug}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-2">
            {job.title}
          </h3>
        </Link>

        {/* Meta badges grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-slate-600 dark:text-slate-400 my-4 bg-slate-50/70 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 truncate">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate font-semibold text-slate-800 dark:text-slate-200">{qualificationText}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate font-semibold text-slate-800 dark:text-slate-200">
              {job.vacanciesDisplay || (vacanciesCount > 0 ? `${vacanciesCount.toLocaleString()} Posts` : 'Various Posts')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <IndianRupee className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="truncate">{salaryText}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-col text-[11px]">
          <span className="text-slate-400 font-medium">Last Date:</span>
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{endDate ? formatDate(endDate) : 'See Notification'}</span>
            {timeRemaining && (
              <span className="text-[10px] text-saffron-600 dark:text-saffron-400 bg-saffron-50 dark:bg-saffron-950/40 px-1.5 py-0.2 rounded font-semibold border border-saffron-200 dark:border-saffron-800">
                {timeRemaining}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm"
        >
          <span>View Details</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
