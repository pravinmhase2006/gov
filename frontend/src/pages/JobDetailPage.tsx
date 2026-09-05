import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@/lib/navigation';
import Link from '@/components/common/Link';
import { dataService, Job } from '@/services/dataService';
import DiscussionForum from '@/components/jobs/DiscussionForum';
import JobShareModal from '@/components/jobs/JobShareModal';
import {
  Building2,
  MapPin,
  GraduationCap,
  Calendar,
  IndianRupee,
  Users,
  ExternalLink,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    async function loadJob() {
      if (!slug) return;
      setLoading(true);
      const data = await dataService.getJobBySlug(slug);
      setJob(data || null);
      setLoading(false);
    }
    loadJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-500">Loading vacancy details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Job Notification Not Found</h2>
        <p className="text-sm text-slate-500">The notification you requested might have been updated or removed.</p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Jobs Listing
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShareOpen(true)}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors shadow-sm ${
                bookmarked ? 'text-blue-600 bg-blue-50' : 'text-slate-700 dark:text-slate-300'
              }`}
              title="Bookmark"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Primary Job Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-lg">
              {job.organization?.shortName || job.organization?.name || 'GOVT'}
            </span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg">
              {job.category || 'Central Govt'}
            </span>
            {job.isTrending && (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg">
                🔥 High Demand
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
            {job.title}
          </h1>

          {/* Quick Key Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Total Vacancies</span>
              <span className="text-base font-black text-slate-900 dark:text-white">
                {(job.totalVacancies || 0).toLocaleString('en-IN')} Posts
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Salary / Grade Pay</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {job.salaryText || 'Level 4 to 8'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Age Limit</span>
              <span className="text-base font-black text-slate-900 dark:text-white">
                {job.ageLimitMin || 18} - {job.ageLimitMax || 35} Years
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Application Deadline</span>
              <span className="text-base font-black text-rose-600 dark:text-rose-400">
                {job.lastDate}
              </span>
            </div>
          </div>

          {/* Direct CTA Application Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={job.applyOnlineUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Apply Online Direct</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={job.officialNotificationUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-2xl font-bold text-sm transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Official Notification PDF</span>
            </a>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8">
          {/* Eligibility */}
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Educational Qualification & Eligibility
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {job.qualification}
            </p>
          </section>

          {/* Selection Process */}
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Selection Process & Exam Stages
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {job.selectionProcess || 'Computer Based Test (CBT), Followed by Document Verification and Medical Examination.'}
            </p>
          </section>

          {/* Important Dates & Application Fees */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Important Dates
              </h3>
              <div className="text-xs space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Application Start:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{job.startDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Last Date to Apply:</span>
                  <span className="font-bold text-rose-600">{job.lastDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Exam Schedule:</span>
                  <span className="font-bold text-blue-600">{job.examDate || 'To be announced'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-amber-600" />
                Application Fee Structure
              </h3>
              <div className="text-xs space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">General / OBC / EWS:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">₹{job.applicationFeeGeneral ?? 100}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">SC / ST / PwD:</span>
                  <span className="font-bold text-emerald-600">₹{job.applicationFeeReserved ?? 0} (Exempted)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Female Candidates:</span>
                  <span className="font-bold text-emerald-600">₹{job.applicationFeeFemale ?? 0} (Exempted)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Forum Component */}
        <DiscussionForum jobId={job.id} />

        {/* Share Modal */}
        {shareOpen && (
          <JobShareModal
            jobTitle={job.title}
            jobSlug={job.slug}
            onClose={() => setShareOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
