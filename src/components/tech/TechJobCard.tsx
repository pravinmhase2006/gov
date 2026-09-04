import React from 'react';
import Link from '@/components/common/Link';
import {
  Building2,
  MapPin,
  Briefcase,
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export interface TechJobData {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  workMode: string;
  experienceLevel: string;
  salaryRange: string;
  roleCategory: string;
  techStack: string;
  isFeatured?: boolean;
  isPsuGovt?: boolean;
}

export default function TechJobCard({ job }: { job: TechJobData }) {
  const stack = job.techStack ? job.techStack.split(',').map((s) => s.trim()) : [];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 hover:shadow-card-hover hover:border-blue-300 transition-all duration-200 flex flex-col justify-between space-y-4 group">
      
      {/* Top badges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-black text-sm shrink-0">
              {job.company.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-xs text-slate-800 block line-clamp-1">
                {job.company}
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {job.location} ({job.workMode})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {job.isPsuGovt ? (
              <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600" /> Govt PSU Tech
              </span>
            ) : (
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                IT / Corporate
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <Link href={`/tech-jobs/${job.slug}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {job.title}
          </h3>
        </Link>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {stack.map((s, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Package / CTC</span>
          <span className="font-black text-emerald-700 text-xs sm:text-sm">{job.salaryRange}</span>
        </div>

        <Link
          href={`/tech-jobs/${job.slug}`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition-colors flex items-center gap-1 shrink-0"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
