import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import JobCard from '@/components/jobs/JobCard';
import ExamCard from '@/components/exams/ExamCard';
import TechJobCard from '@/components/tech/TechJobCard';
import AdBanner from '@/components/ads/AdBanner';
import QuestionOfTheDay from '@/components/common/QuestionOfTheDay';
import JobAlertModal from '@/components/common/JobAlertModal';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import DataBoundary from '@/components/common/DataBoundary';
import { CardSkeleton, MetricsSkeleton, ListSkeleton } from '@/components/common/SkeletonLoader';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import {
  dataService,
  Job,
  Exam,
  TechJob,
  ResultItem,
  AdmitCardItem,
  AnswerKeyItem,
  CurrentAffair,
} from '@/services/dataService';
import {
  Search,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Building2,
  Train,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Bell,
  HelpCircle,
  FileText,
  Clock,
  Briefcase,
  Layers,
  Swords,
  Keyboard,
  FileLock,
  Calculator,
  Compass,
  TrendingUp,
  Cpu,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [techJobs, setTechJobs] = useState<TechJob[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [admitCards, setAdmitCards] = useState<AdmitCardItem[]>([]);
  const [answerKeys, setAnswerKeys] = useState<AnswerKeyItem[]>([]);
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>([]);
  const [stats, setStats] = useState<any>({
    activeVacancies: 148520,
    totalJobs: 24,
    totalExams: 18,
    totalMockTests: 12,
    totalTestAttempts: 42950,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        jobsData,
        examsData,
        techJobsData,
        resultsData,
        admitCardsData,
        answerKeysData,
        caData,
        statsData,
      ] = await Promise.all([
        dataService.getJobs(),
        dataService.getExams(),
        dataService.getTechJobs(),
        dataService.getResults(),
        dataService.getAdmitCards(),
        dataService.getAnswerKeys(),
        dataService.getCurrentAffairs(),
        dataService.getStats(),
      ]);
      setJobs(jobsData);
      setExams(examsData);
      setTechJobs(techJobsData);
      setResults(resultsData);
      setAdmitCards(admitCardsData);
      setAnswerKeys(answerKeysData);
      setCurrentAffairs(caData);
      if (statsData) setStats(statsData);
    } catch (err: any) {
      console.error('Error loading homepage data', err);
      setError(err?.message || 'Failed to connect to backend server. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const featuredJobs = jobs.filter((j) => j.isFeatured);
  const latestJobs = jobs.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50/80 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-saffron-500" />
              <span>India’s Most Trusted Exam & Govt Job Discovery Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              One Stop Destination for{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-saffron-600 dark:from-blue-400 dark:via-indigo-300 dark:to-saffron-400 bg-clip-text text-transparent">
                Sarkari Jobs, Exams
              </span>{' '}
              &amp; Tech Careers
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Real-time notifications for 85,000+ vacancies, official syllabus, free All-India mock tests, PDF tools, and tech opportunities.
            </p>

            {/* Main Search Box */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-6">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-xl border border-slate-200 dark:border-slate-700 gap-2">
                <div className="flex items-center flex-1 px-2">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 10,000+ jobs (e.g. SSC CGL, Railway NTPC, Banking, 10th Pass)..."
                    className="w-full px-3 py-2.5 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors shrink-0 shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  Search Jobs
                </button>
              </div>
            </form>

            {/* Popular Search Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Trending Searches:</span>
              {[
                { label: 'SSC CGL 2026', to: '/jobs?q=SSC' },
                { label: 'RRB NTPC', to: '/jobs?q=RRB' },
                { label: 'UPSC CSE', to: '/jobs?q=UPSC' },
                { label: 'Bank PO', to: '/jobs?category=Banking' },
                { label: '10th/12th Pass', to: '/jobs?qualification=10th+Pass' },
                { label: 'Tech Jobs', to: '/tech-jobs' },
              ].map((tag, idx) => (
                <Link
                  key={idx}
                  to={tag.to}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                <AnimatedCounter target={stats.activeVacancies || 148520} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Live Vacancies</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                <AnimatedCounter target={stats.totalExams || 18} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Active Exam Boards</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-saffron-600 dark:text-saffron-400">
                <AnimatedCounter target={stats.totalTestAttempts || 42950} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Aspirants Connected</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                <AnimatedCounter target={(stats.totalMockTests || 12) * 350} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Mock Tests Taken</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SARKARI QUICK ACTION TILES (Grid Format) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { title: 'Latest Jobs', count: '14,500+ Posts', icon: Briefcase, to: '/jobs', color: 'bg-blue-600' },
            { title: 'Results', count: 'Declared Today', icon: Award, to: '/results', color: 'bg-emerald-600' },
            { title: 'Admit Cards', count: 'Download Live', icon: Clock, to: '/admit-cards', color: 'bg-purple-600' },
            { title: 'Answer Keys', count: 'Objection Active', icon: CheckCircle2, to: '/answer-keys', color: 'bg-amber-600' },
            { title: 'Free Mock Tests', count: 'Tier 1 & 2 CBT', icon: FileText, to: '/mock-tests', color: 'bg-rose-600' },
            { title: 'Tech Careers', count: 'Jobs & Courses', icon: Cpu, to: '/tech-jobs', color: 'bg-indigo-600' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.to}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 rounded-2xl p-4 shadow-sm hover:shadow-elevated transition-all flex flex-col items-center text-center group"
              >
                <div className={`w-11 h-11 rounded-xl ${item.color} text-white flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. SARKARI QUICK RESULT & NOTIFICATION TABLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Latest Results Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900 dark:text-white">Latest Results</h3>
              </div>
              <Link to="/results" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              {results.slice(0, 4).map((res) => (
                <Link
                  key={res.id}
                  to={`/results/${res.slug}`}
                  className="py-3 block group hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 line-clamp-2">
                    {res.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                      {res.organization}
                    </span>
                    <span>{res.releaseDate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Admit Cards Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="font-black text-base text-slate-900 dark:text-white">Admit Cards</h3>
              </div>
              <Link to="/admit-cards" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              {admitCards.slice(0, 4).map((ac) => (
                <Link
                  key={ac.id}
                  to={`/admit-cards/${ac.slug}`}
                  className="py-3 block group hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 line-clamp-2">
                    {ac.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span className="bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                      {ac.organization}
                    </span>
                    <span>Exam: {ac.examDate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Answer Keys Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                <h3 className="font-black text-base text-slate-900 dark:text-white">Answer Keys</h3>
              </div>
              <Link to="/answer-keys" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
              {answerKeys.slice(0, 4).map((ak) => (
                <Link
                  key={ak.id}
                  to={`/answer-keys/${ak.slug}`}
                  className="py-3 block group hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 line-clamp-2">
                    {ak.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded text-[10px]">
                      {ak.organization}
                    </span>
                    <span>Last Date: {ak.objectionLastDate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED VACANCIES & LATEST JOBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-saffron-500 animate-bounce" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Featured Government Vacancies
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top prioritized notifications with upcoming deadlines
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group"
          >
            <span>Browse All 85,000+ Vacancies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <DataBoundary
          loading={loading}
          error={error}
          isEmpty={featuredJobs.length === 0}
          onRetry={loadData}
          loadingComponent={<CardSkeleton count={3} />}
          emptyTitle="No Featured Vacancies Found"
          emptyDescription="Active notifications will appear here once updated by the central recruiting boards."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  id: job.id,
                  title: job.title,
                  slug: job.slug,
                  organization: job.organization.name,
                  organizationCode: job.organization.shortName,
                  totalVacancies: job.totalVacancies,
                  qualification: job.qualification,
                  salary: job.salaryText || 'As per 7th CPC',
                  state: job.state || 'All India',
                  lastDate: job.lastDate,
                  isFeatured: job.isFeatured,
                  isTrending: job.isTrending,
                  category: job.category || 'Central Govt',
                }}
              />
            ))}
          </div>
        </DataBoundary>
      </section>

      {/* 5. INTERACTIVE ASPIRANT UTILITIES SUITE */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 my-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-400">
              Free Smart Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">
              All-in-One Preparation & Application Toolkit
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Free online utilities specifically built for Indian competitive exams & application forms.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Resume Builder', desc: 'Govt & Tech Formats', icon: FileText, to: '/resume-builder', color: 'from-blue-500 to-indigo-600' },
              { title: 'Photo Resizer', desc: 'SSC / UPSC 20-50 KB', icon: Sparkles, to: '/photo-resizer', color: 'from-purple-500 to-pink-600' },
              { title: 'Mock Test CBT', desc: 'Real Exam Interface', icon: Layers, to: '/mock-tests', color: 'from-emerald-500 to-teal-600' },
              { title: 'Quiz Battle', desc: '1v1 Live Contest', icon: Swords, to: '/quiz-battle', color: 'from-rose-500 to-red-600' },
              { title: 'Typing Test', desc: 'SSC / RRB Standards', icon: Keyboard, to: '/typing-test', color: 'from-amber-500 to-orange-600' },
              { title: 'Eligibility Calc', desc: 'Check Age & Stream', icon: Calculator, to: '/eligibility-calculator', color: 'from-cyan-500 to-blue-600' },
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={idx}
                  to={tool.to}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-blue-400 rounded-3xl p-5 flex flex-col items-center text-center transition-all hover:scale-105 group shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">{tool.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. POPULAR EXAMS HUB & TECH CORNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Exam Hub */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Popular Exam Guides & Syllabus
                </h2>
              </div>
              <Link to="/exams" className="text-xs font-bold text-blue-600 hover:underline">
                All Exams
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={{
                    id: exam.id,
                    name: exam.name,
                    slug: exam.slug,
                    category: exam.organization.category,
                    organization: exam.organization.name,
                    frequency: exam.frequency || 'Annual',
                    isPopular: exam.isPopular,
                    totalApplicants: '10 Lakh+',
                  }}
                />
              ))}
            </div>

            {/* Daily Question of the Day */}
            <div className="mt-8">
              <QuestionOfTheDay />
            </div>
          </div>

          {/* Right Sidebar: Tech Opportunities & Current Affairs */}
          <div className="space-y-6">
            {/* Tech Careers Banner */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white border border-indigo-700/50 shadow-md">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Tech Careers Corner</span>
              </div>
              <h3 className="text-lg font-black mt-2">
                IT & Software Jobs for Govt Aspirants
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Explore tech roles, internships, and skill booster courses.
              </p>

              <div className="mt-4 space-y-3">
                {techJobs.slice(0, 2).map((tj) => (
                  <Link
                    key={tj.id}
                    to={`/tech-jobs/${tj.slug}`}
                    className="block bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-3 rounded-2xl transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-white group-hover:text-indigo-400">
                        {tj.title}
                      </span>
                      <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                        {tj.salary}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{tj.company} • {tj.location}</p>
                  </Link>
                ))}
              </div>

              <Link
                to="/tech-jobs"
                className="inline-flex items-center justify-center w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Browse All Tech Opportunities
              </Link>
            </div>

            {/* Top Current Affairs Widget */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-base text-slate-900 dark:text-white">Daily Current Affairs</h3>
                </div>
                <Link to="/current-affairs" className="text-xs font-bold text-blue-600 hover:underline">
                  Read More
                </Link>
              </div>

              <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                {currentAffairs.slice(0, 3).map((ca) => (
                  <Link
                    key={ca.id}
                    to={`/current-affairs/${ca.slug}`}
                    className="block pt-3 group"
                  >
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      {ca.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 line-clamp-2 mt-0.5">
                      {ca.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">{ca.publishedAt}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad Banner */}
            <AdBanner placement="JOB_SIDEBAR" />
          </div>
        </div>
      </section>

      {/* Job Alert Modal */}
      {isAlertModalOpen && <JobAlertModal onClose={() => setIsAlertModalOpen(false)} />}
    </div>
  );
}
