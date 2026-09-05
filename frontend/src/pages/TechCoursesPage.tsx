import React, { useState, useEffect, useMemo } from 'react';
import TechCourseCard from '@/components/tech/TechCourseCard';
import { dataService } from '@/services/dataService';
import {
  BookOpen,
  Search,
  Sparkles,
  Award,
  Users,
  Clock,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  GraduationCap,
  X,
  Flame,
  Terminal,
  Brain,
  ShieldCheck,
} from 'lucide-react';
import DataBoundary from '@/components/common/DataBoundary';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import { TechCourseData } from '@/types';

export default function TechCoursesPage() {
  const [courses, setCourses] = useState<TechCourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [viewOnlyEnrolled, setViewOnlyEnrolled] = useState(false);

  // Retrieve user ID from localStorage or auth
  const [userId] = useState(() => {
    let saved = localStorage.getItem('govtprep_user_id');
    if (!saved) {
      saved = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem('govtprep_user_id', saved);
    }
    return saved;
  });

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getTechCourses();
      setCourses(data);
    } catch (err: any) {
      console.error('Error loading courses:', err);
      setError(err?.message || 'Failed to load free IT courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const categories = [
    { label: 'All Courses', value: 'All', icon: BookOpen },
    { label: 'Python', value: 'Python', icon: Terminal },
    { label: 'Web Development', value: 'Web Development', icon: Code2 },
    { label: 'React & Next.js', value: 'React', icon: Layers },
    { label: 'Java & Spring', value: 'Java', icon: Cpu },
    { label: 'AI & Machine Learning', value: 'AI / ML', icon: Brain },
    { label: 'DSA & Algorithms', value: 'DSA', icon: Code2 },
    { label: 'Cloud & DevOps', value: 'Cloud & DevOps', icon: ShieldCheck },
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'All Levels'];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        (course.skills && course.skills.some((s) => s.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === 'All' ||
        course.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesLevel =
        selectedLevel === 'All' ||
        course.level.toLowerCase().includes(selectedLevel.toLowerCase());

      const matchesEnrolled = !viewOnlyEnrolled || (course.enrollment && course.enrollment.progressPercent > 0);

      return matchesSearch && matchesCategory && matchesLevel && matchesEnrolled;
    });
  }, [courses, search, selectedCategory, selectedLevel, viewOnlyEnrolled]);

  const totalLearners = useMemo(() => {
    return courses.reduce((acc, c) => acc + (c.enrolledCount || c.totalStudents || 1200), 0);
  }, [courses]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-purple-800/40">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>100% Free Learning & Industry Certification</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Free IT & Software Engineering Courses
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
                Zero-to-hero curriculum in Python, Full-Stack Web, React, Java Microservices, AI/ML, and DSA. Track your progress with quizzes and earn verifiable Certificates upon completion.
              </p>
            </div>

            {/* Live Key Metrics */}
            <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
              <div className="text-center px-3">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  {courses.length > 0 ? courses.length : '7+'}
                </div>
                <div className="text-[10px] sm:text-xs text-purple-200 font-medium">Free Courses</div>
              </div>
              <div className="text-center px-3 border-x border-white/15">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {totalLearners > 0 ? `${(totalLearners / 1000).toFixed(1)}k+` : '100k+'}
                </div>
                <div className="text-[10px] sm:text-xs text-purple-200 font-medium">Active Learners</div>
              </div>
              <div className="text-center px-3">
                <div className="text-2xl sm:text-3xl font-black text-indigo-300">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs text-purple-200 font-medium">Free Certificate</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Category Quick Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setViewOnlyEnrolled(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-500 dark:text-purple-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Search & Level Filters Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses by skill (e.g. Python, React, Spring Boot, Docker)..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Level Filter & Result Count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    selectedLevel === lvl
                      ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden md:inline-block">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}
            </span>
          </div>
        </div>

        {/* 4. Course Cards Grid */}
        <DataBoundary
          loading={loading}
          error={error}
          isEmpty={filteredCourses.length === 0}
          onRetry={loadCourses}
          loadingComponent={<CardSkeleton count={6} />}
          emptyTitle="No IT Courses Found"
          emptyDescription="No courses match your selected category or search keyword. Try clearing filters to see all free offerings."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <TechCourseCard key={course.id} course={course} />
            ))}
          </div>
        </DataBoundary>

        {/* 5. How It Works Section */}
        <div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900 dark:to-purple-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              How Free Certification Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Three simple steps to build your tech portfolio and land software developer roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 font-black flex items-center justify-center text-base">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Enroll in Any Course Free</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose any track (Python, React, Java, DSA, AI/ML) and start learning immediately with no fees or card requirements.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center text-base">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Watch Lessons & Pass Quizzes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Watch curated video tutorials, review study notes, solve hands-on code examples, and complete quick knowledge check quizzes.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center text-base">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Download & Share Certificate</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Upon reaching 100% completion, generate your verifiable Certificate of Completion with a unique credential code to showcase on LinkedIn.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
