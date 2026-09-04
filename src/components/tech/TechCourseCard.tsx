import React from 'react';
import Link from '@/components/common/Link';
import { BookOpen, Star, Users, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export interface TechCourseData {
  id: string;
  title: string;
  slug: string;
  provider: string;
  category: string;
  level: string;
  durationHours: number;
  priceType: string;
  rating: number;
  totalStudents: number;
  description: string;
  certificateIncluded?: boolean;
}

export default function TechCourseCard({ course }: { course: TechCourseData }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 hover:shadow-card-hover hover:border-purple-300 transition-all duration-200 flex flex-col justify-between space-y-4 group">
      
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-200">
            {course.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-current" /> {course.rating}
          </div>
        </div>

        <Link href={`/tech-courses/${course.slug}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.durationHours} Hours
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" /> {course.totalStudents.toLocaleString()} Learners
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Certification</span>
          <span className="font-black text-emerald-600 text-xs sm:text-sm">
            {course.priceType === 'FREE' ? '100% Free Access' : 'Certified'}
          </span>
        </div>

        <Link
          href={`/tech-courses/${course.slug}`}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Enroll Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
