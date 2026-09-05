import React from 'react';
import Link from '@/components/common/Link';
import { BookOpen, Star, Users, Clock, Award, CheckCircle2, ArrowRight, Sparkles, User, PlayCircle } from 'lucide-react';
import { TechCourseData } from '@/types';

export default function TechCourseCard({ course }: { course: TechCourseData }) {
  const studentsCount = course.enrolledCount || course.totalStudents || 1200;
  const lessonsTotal = course.lessonsCount || (course.modules ? course.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) : 6);
  const progress = course.enrollment?.progressPercent || 0;
  const isCompleted = course.enrollment?.isCompleted || false;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 hover:shadow-card-hover hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 flex flex-col justify-between space-y-4 group">
      
      <div className="space-y-3">
        {/* Category & Badge / Rating */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
              {course.category}
            </span>
            {course.badge && (
              <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" /> {course.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-current" /> {course.rating || 4.9}
          </div>
        </div>

        {/* Title */}
        <Link href={`/tech-courses/${course.slug}`}>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Skills Tag Pills */}
        {course.skills && course.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="text-[10px] text-slate-400 font-medium px-1">
                +{course.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Stats: Hours, Lessons, Learners */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-500" /> {course.durationHours} Hours
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" /> {lessonsTotal} Lessons
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-emerald-500" /> {studentsCount.toLocaleString()} Learners
          </span>
        </div>

        {/* Progress Bar if enrolled */}
        {progress > 0 && (
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-600 dark:text-slate-300">Your Progress</span>
              <span className="text-purple-600 dark:text-purple-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer / Action */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Certification</span>
          <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> 100% Free Certificate
          </span>
        </div>

        <Link
          href={`/tech-courses/${course.slug}`}
          className={`px-4 py-2 font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : progress > 0
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <Award className="w-3.5 h-3.5" />
              <span>View Certificate</span>
            </>
          ) : progress > 0 ? (
            <>
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <span>Start Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Link>
      </div>

    </div>
  );
}
