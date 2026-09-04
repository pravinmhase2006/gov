import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { usePathname, useRouter } from '@/lib/navigation';
import {
  Search,
  Menu,
  X,
  Bookmark,
  Bell,
  User,
  ShieldAlert,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  Clock,
  LogOut,
  Sliders,
  CheckCircle2
} from 'lucide-react';

import ThemeToggle from '@/components/common/ThemeToggle';

interface NavbarProps {
  initialUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function Navbar({ initialUser = null }: NavbarProps) {
  const [user, setUser] = useState(initialUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setJobsDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-navy-900 text-white flex items-center justify-center font-black text-xl shadow-md border-t border-blue-400 group-hover:scale-105 transition-transform">
              <span className="text-saffron-500">G</span>
              <span>P</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  GovtPrep<span className="text-blue-600">.in</span>
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                  INDIA
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 hidden sm:block -mt-1">
                Jobs, Exams & Mock Prep
              </span>
            </div>
          </Link>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs (SSC, Railway, Bank, 10th Pass)..."
                className="w-full pl-10 pr-20 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* User / Auth Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-medium transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-semibold text-slate-800 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      {user.role === 'ADMIN' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded">
                          ADMINISTRATOR
                        </span>
                      )}
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Sliders className="w-4 h-4" /> Candidate Dashboard
                    </Link>
                    <Link
                      href="/dashboard/bookmarks"
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Bookmark className="w-4 h-4" /> Saved Jobs & Notes
                    </Link>
                    <Link
                      href="/dashboard/mock-tests"
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Award className="w-4 h-4" /> My Test Scores
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                      >
                        <ShieldAlert className="w-4 h-4" /> Admin Management Panel
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm hover:shadow transition-all"
                >
                  Register Free
                </Link>
              </div>
            )}

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-slate-900 text-white text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-1">
            <li>
              <Link
                href="/"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-200'
                }`}
              >
                Home
              </Link>
            </li>

            {/* Jobs Dropdown */}
            <li className="relative" onMouseLeave={() => setJobsDropdownOpen(false)}>
              <button
                onMouseEnter={() => setJobsDropdownOpen(true)}
                onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
                className={`px-3 py-2.5 flex items-center gap-1 hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/jobs') || pathname.startsWith('/qualification')
                    ? 'bg-slate-800 text-blue-400 font-semibold'
                    : 'text-slate-200'
                }`}
              >
                <span>Govt Jobs</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {jobsDropdownOpen && (
                <div className="absolute left-0 top-full w-80 bg-white text-slate-800 rounded-b-xl shadow-2xl border border-slate-200 p-4 grid grid-cols-2 gap-3 z-50 animate-in fade-in slide-in-from-top-1">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      By Qualification
                    </h4>
                    <ul className="space-y-1 text-xs">
                      <li>
                        <Link href="/qualification/10th-pass" className="hover:text-blue-600 py-1 block">
                          10th Pass Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/qualification/12th-pass" className="hover:text-blue-600 py-1 block">
                          12th Pass Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/qualification/graduate" className="hover:text-blue-600 py-1 block">
                          Graduate Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/qualification/diploma" className="hover:text-blue-600 py-1 block">
                          Diploma Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/qualification/iti" className="hover:text-blue-600 py-1 block">
                          ITI Trainee Jobs
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Top Categories
                    </h4>
                    <ul className="space-y-1 text-xs">
                      <li>
                        <Link href="/jobs?category=central-govt" className="hover:text-blue-600 py-1 block">
                          Central Govt (SSC/UPSC)
                        </Link>
                      </li>
                      <li>
                        <Link href="/jobs?category=railway-jobs" className="hover:text-blue-600 py-1 block">
                          Railway (RRB NTPC/ALP)
                        </Link>
                      </li>
                      <li>
                        <Link href="/jobs?category=banking-jobs" className="hover:text-blue-600 py-1 block">
                          Banking (IBPS/SBI)
                        </Link>
                      </li>
                      <li>
                        <Link href="/jobs?category=defence-police" className="hover:text-blue-600 py-1 block">
                          Defence & Police
                        </Link>
                      </li>
                      <li>
                        <Link href="/jobs" className="text-blue-600 font-bold py-1 block">
                          View All Jobs →
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link
                href="/tech-jobs"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/tech-jobs') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                💻 IT Jobs
              </Link>
            </li>

            <li>
              <Link
                href="/internships"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/internships') ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-200'
                }`}
              >
                💼 Internships
              </Link>
            </li>

            <li>
              <Link
                href="/tech-courses"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/tech-courses') ? 'bg-slate-800 text-purple-400 font-semibold' : 'text-slate-200'
                }`}
              >
                🎓 Courses
              </Link>
            </li>

            <li>
              <Link
                href="/exams"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/exams') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Exams
              </Link>
            </li>

            <li>
              <Link
                href="/mock-tests"
                className={`px-3 py-2.5 flex items-center gap-1.5 hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/mock-tests') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                <span>Free Mock Tests</span>
                <span className="bg-saffron-500 text-white text-[9px] px-1.5 py-0.2 rounded font-black tracking-wide animate-pulse">
                  LIVE
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/results"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/results') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Results
              </Link>
            </li>

            <li>
              <Link
                href="/admit-cards"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/admit-cards') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Admit Card
              </Link>
            </li>

            <li>
              <Link
                href="/answer-keys"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/answer-keys') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Answer Key
              </Link>
            </li>

            <li>
              <Link
                href="/syllabus"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/syllabus') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Syllabus
              </Link>
            </li>

            <li>
              <Link
                href="/current-affairs"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/current-affairs') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Current Affairs
              </Link>
            </li>

            <li>
              <Link
                href="/study-material"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname.startsWith('/study-material') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                Study Notes
              </Link>
            </li>

            <li>
              <Link
                href="/resume-builder"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/resume-builder' ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                📝 AI Resume
              </Link>
            </li>

            <li>
              <Link
                href="/compare"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/compare' ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                ⚔️ Compare
              </Link>
            </li>

            <li>
              <Link
                href="/leaderboard"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/leaderboard' ? 'bg-slate-800 text-saffron-400 font-semibold' : 'text-slate-200'
                }`}
              >
                🏆 Leaderboard
              </Link>
            </li>

            <li>
              <Link
                href="/exam-centers"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/exam-centers' ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                📍 Exam Centers
              </Link>
            </li>

            <li>
              <Link
                href="/quiz-battle"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/quiz-battle' ? 'bg-slate-800 text-rose-400 font-semibold' : 'text-slate-200'
                }`}
              >
                ⚔️ Quiz Battle
              </Link>
            </li>

            <li>
              <Link
                href="/cutoff-predictor"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/cutoff-predictor' ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-200'
                }`}
              >
                📊 Cutoff Predictor
              </Link>
            </li>

            <li>
              <Link
                href="/vocab-builder"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/vocab-builder' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-200'
                }`}
              >
                🗣️ Word Power
              </Link>
            </li>

            <li>
              <Link
                href="/document-vault"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/document-vault' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-200'
                }`}
              >
                📂 Document Locker
              </Link>
            </li>

            <li>
              <Link
                href="/typing-test"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/typing-test' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-200'
                }`}
              >
                ⌨️ Typing Test
              </Link>
            </li>

            <li>
              <Link
                href="/flashcards"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/flashcards' ? 'bg-slate-800 text-purple-400 font-semibold' : 'text-slate-200'
                }`}
              >
                🎴 Flashcards
              </Link>
            </li>

            <li>
              <Link
                href="/study-planner"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/study-planner' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-200'
                }`}
              >
                📅 Study Planner
              </Link>
            </li>

            <li>
              <Link
                href="/eligibility-calculator"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/eligibility-calculator' ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                🧮 Calculator
              </Link>
            </li>

            <li>
              <Link
                href="/photo-resizer"
                className={`px-3 py-2.5 block hover:bg-slate-800 rounded-t transition-colors ${
                  pathname === '/photo-resizer' ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200'
                }`}
              >
                📷 Resizer
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, exams..."
              className="w-full pl-9 pr-16 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-2.5 py-1 rounded"
            >
              Search
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link href="/jobs" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800 hover:bg-blue-50">
              💼 All Govt Jobs
            </Link>
            <Link href="/quiz-battle" className="p-2.5 rounded-lg bg-rose-50 font-medium text-rose-700">
              ⚔️ 1v1 Quiz Battle
            </Link>
            <Link href="/cutoff-predictor" className="p-2.5 rounded-lg bg-sky-50 font-medium text-sky-700">
              📊 Cutoff Predictor
            </Link>
            <Link href="/vocab-builder" className="p-2.5 rounded-lg bg-emerald-50 font-medium text-emerald-800">
              🗣️ Word Power
            </Link>
            <Link href="/document-vault" className="p-2.5 rounded-lg bg-amber-50 font-medium text-amber-800">
              📂 Document Locker
            </Link>
            <Link href="/mock-tests" className="p-2.5 rounded-lg bg-blue-50 font-medium text-blue-700">
              🎯 Free Mock Tests
            </Link>
            <Link href="/typing-test" className="p-2.5 rounded-lg bg-emerald-50 font-medium text-emerald-800">
              ⌨️ Typing Test
            </Link>
            <Link href="/flashcards" className="p-2.5 rounded-lg bg-purple-50 font-medium text-purple-800">
              🎴 3D Flashcards
            </Link>
            <Link href="/study-planner" className="p-2.5 rounded-lg bg-amber-50 font-medium text-amber-800">
              📅 Study Planner
            </Link>
            <Link href="/qualification/10th-pass" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              🎓 10th Pass Jobs
            </Link>
            <Link href="/qualification/12th-pass" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              🎓 12th Pass Jobs
            </Link>
            <Link href="/results" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              🏆 Latest Results
            </Link>
            <Link href="/admit-cards" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              🎫 Admit Cards
            </Link>
            <Link href="/answer-keys" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              🔑 Answer Keys
            </Link>
            <Link href="/syllabus" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              📚 Syllabus
            </Link>
            <Link href="/current-affairs" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              📰 Current Affairs
            </Link>
            <Link href="/study-material" className="p-2.5 rounded-lg bg-slate-50 font-medium text-slate-800">
              📖 Study Notes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
