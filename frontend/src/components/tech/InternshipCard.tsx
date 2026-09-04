import React from 'react';
import Link from '@/components/common/Link';
import { Building2, MapPin, Calendar, DollarSign, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface InternshipData {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  workMode: string;
  durationMonths: number;
  stipendDisplay: string;
  isPpoOffered?: boolean;
  skillsRequired: string;
  eligibility: string;
  applyDeadline?: Date | string | null;
  isGovtFellowship?: boolean;
}

export default function InternshipCard({ internship }: { internship: InternshipData }) {
  const skills = internship.skillsRequired ? internship.skillsRequired.split(',').map((s) => s.trim()) : [];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 hover:shadow-card-hover hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between space-y-4 group">
      
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0">
              {internship.company.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-xs text-slate-800 block line-clamp-1">
                {internship.company}
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {internship.location} ({internship.workMode})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {internship.isGovtFellowship ? (
              <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600" /> Govt Fellowship
              </span>
            ) : (
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Tech Internship
              </span>
            )}
          </div>
        </div>

        <Link href={`/internships/${internship.slug}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
            {internship.title}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 line-clamp-1">
          🎓 Eligibility: <strong>{internship.eligibility}</strong>
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.map((s, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Monthly Stipend</span>
          <span className="font-black text-emerald-700 text-xs sm:text-sm">
            {internship.stipendDisplay}
          </span>
        </div>

        <Link
          href={`/internships/${internship.slug}`}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
