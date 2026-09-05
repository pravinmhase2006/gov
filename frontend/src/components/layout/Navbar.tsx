import React, { useState, useEffect, useRef } from 'react';
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
  Briefcase,
  Laptop,
  Flame,
  CheckCircle2,
  Sparkles,
  Bot,
  Zap,
  Wrench,
  HelpCircle,
  FileCode2
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);

  // Close menus on path change or outside click
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setUserDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    router.push('/');
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white flex items-center justify-center font-black text-xl shadow-md border-t border-blue-400 group-hover:scale-105 transition-transform">
              <span className="text-amber-400">G</span>
              <span>P</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  GovtPrep<span className="text-blue-600 dark:text-blue-400">.in</span>
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  BHARAT
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block -mt-0.5">
                Sarkari Jobs, Exams & AI Tools
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
                placeholder="Search jobs (SSC, Railway, Banking, 10th Pass)..."
                className="w-full pl-10 pr-20 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner"
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
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      {user.role === 'ADMIN' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 text-[10px] font-bold rounded">
                          ADMINISTRATOR
                        </span>
                      )}
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Sliders className="w-4 h-4" /> Candidate Dashboard
                    </Link>
                    <Link
                      href="/dashboard/bookmarks"
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Bookmark className="w-4 h-4" /> Saved Jobs & Notes
                    </Link>
                    <Link
                      href="/dashboard/mock-tests"
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Award className="w-4 h-4" /> My Test Scores
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium"
                      >
                        <ShieldAlert className="w-4 h-4" /> Admin Management
                      </Link>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
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
                  className="px-3 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm hover:shadow transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-slate-900 border-t border-slate-800 text-white text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between">
            
            <div className="flex items-center space-x-1">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className={`px-3 py-2.5 block hover:bg-slate-800 rounded transition-colors ${
                    pathname === '/' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  Home
                </Link>
              </li>

              {/* Govt Jobs Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setActiveDropdown('jobs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href="/jobs"
                  className={`px-3 py-2.5 flex items-center gap-1.5 hover:bg-slate-800 rounded transition-colors ${
                    pathname.startsWith('/jobs') || pathname.startsWith('/qualification')
                      ? 'bg-slate-800 text-blue-400 font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Govt Jobs</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {activeDropdown === 'jobs' && (
                  <div className="absolute left-0 top-full w-96 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-b-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 grid grid-cols-2 gap-4 z-50 animate-in fade-in slide-in-from-top-1">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> By Qualification
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li>
                          <Link href="/qualification/10th-pass" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            🎓 10th Pass Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="/qualification/12th-pass" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            🎓 12th Pass Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="/qualification/graduate" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            📜 Graduate (Any Degree)
                          </Link>
                        </li>
                        <li>
                          <Link href="/qualification/diploma" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            🔧 Diploma / Polytechnic
                          </Link>
                        </li>
                        <li>
                          <Link href="/qualification/iti" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            ⚡ ITI Trade Trainee
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Top Categories
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li>
                          <Link href="/jobs?category=central-govt" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            🏛️ Central Govt (SSC/UPSC)
                          </Link>
                        </li>
                        <li>
                          <Link href="/jobs?category=railway-jobs" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            🚆 Railway (RRB NTPC/ALP)
                          </Link>
                        </li>
                        <li>
                          <Link href="/jobs?category=banking-jobs" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            🏦 Banking (IBPS/SBI)
                          </Link>
                        </li>
                        <li>
                          <Link href="/jobs?category=defence-police" className="hover:text-blue-600 dark:hover:text-blue-400 py-1 block">
                            🛡️ Defence & Police
                          </Link>
                        </li>
                        <li className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                          <Link href="/jobs" className="text-blue-600 dark:text-blue-400 font-bold py-1 block flex items-center gap-1">
                            View All Govt Jobs →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              {/* IT, Tech & Careers Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setActiveDropdown('tech')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2.5 flex items-center gap-1.5 hover:bg-slate-800 rounded transition-colors ${
                    pathname.startsWith('/tech') || pathname.startsWith('/internships')
                      ? 'bg-slate-800 text-purple-400 font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5 text-purple-400" />
                  <span>Tech & Internships</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === 'tech' && (
                  <div className="absolute left-0 top-full w-64 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-b-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-1">
                    <ul className="space-y-1 text-xs">
                      <li>
                        <Link href="/tech-jobs" className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 block">
                          <span className="text-base">💻</span>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">IT & Software Jobs</p>
                            <p className="text-[11px] text-slate-500">Fullstack, AI, DevOps & Testing</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/internships" className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 block">
                          <span className="text-base">💼</span>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">Paid Internships</p>
                            <p className="text-[11px] text-slate-500">Govt & Corporate stipend internships</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tech-courses" className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 block">
                          <span className="text-base">🎓</span>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">Tech Skill Courses</p>
                            <p className="text-[11px] text-slate-500">Free & certified industry roadmaps</p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Exams & Mock Tests */}
              <li>
                <Link
                  href="/exams"
                  className={`px-3 py-2.5 block hover:bg-slate-800 rounded transition-colors ${
                    pathname.startsWith('/exams') ? 'bg-slate-800 text-blue-400 font-semibold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  Exams
                </Link>
              </li>

              <li>
                <Link
                  href="/mock-tests"
                  className={`px-3 py-2.5 flex items-center gap-1.5 hover:bg-slate-800 rounded transition-colors ${
                    pathname.startsWith('/mock-tests') ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Free Mock Tests</span>
                  <span className="bg-amber-500 text-slate-950 text-[9px] px-1.5 py-0.5 rounded font-black tracking-wide animate-pulse">
                    LIVE
                  </span>
                </Link>
              </li>

              {/* Results & Admit Cards Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setActiveDropdown('updates')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2.5 flex items-center gap-1.5 hover:bg-slate-800 rounded transition-colors ${
                    pathname.startsWith('/results') || pathname.startsWith('/admit-cards') || pathname.startsWith('/answer-keys')
                      ? 'bg-slate-800 text-emerald-400 font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Results & Updates</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === 'updates' && (
                  <div className="absolute left-0 top-full w-56 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-b-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-1">
                    <ul className="space-y-1 text-xs">
                      <li>
                        <Link href="/results" className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <span>🏆</span> Sarkari Results
                        </Link>
                      </li>
                      <li>
                        <Link href="/admit-cards" className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <span>🎫</span> Admit Cards & Hall Tickets
                        </Link>
                      </li>
                      <li>
                        <Link href="/answer-keys" className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <span>🔑</span> Official Answer Keys
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* Study Material & Resources Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setActiveDropdown('study')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2.5 flex items-center gap-1.5 hover:bg-slate-800 rounded transition-colors ${
                    pathname.startsWith('/current-affairs') || pathname.startsWith('/syllabus') || pathname.startsWith('/study-material') || pathname.startsWith('/previous-papers')
                      ? 'bg-slate-800 text-sky-400 font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                  <span>Study Hub</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === 'study' && (
                  <div className="absolute left-0 top-full w-60 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-b-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-1">
                    <ul className="space-y-1 text-xs">
                      <li>
                        <Link href="/current-affairs" className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <span>📰</span> Daily Current Affairs
                        </Link>
                      </li>
                      <li>
                        <Link href="/syllabus" className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <span>📚</span> Exam Syllabus & Pattern
                        </Link>
                      </li>
                      <li>
                        <Link href="/previous-papers" className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <span>📝</span> Previous Year Papers (PYQ)
                        </Link>
                      </li>
                      <li>
                        <Link href="/study-material" className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <span>📖</span> Free Notes & Handbooks
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* AI & Prep Tools Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`px-3 py-2.5 flex items-center gap-1.5 hover:bg-slate-800 rounded transition-colors ${
                    activeDropdown === 'tools' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI & Tools</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {activeDropdown === 'tools' && (
                  <div className="absolute left-0 top-full w-96 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-b-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 grid grid-cols-2 gap-3 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px] mb-1">AI Prep Engine</p>
                      <Link href="/resume-builder" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>📝</span> AI Resume Builder
                      </Link>
                      <Link href="/quiz-battle" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>⚔️</span> 1v1 Quiz Battle
                      </Link>
                      <Link href="/typing-test" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>⌨️</span> Typing Speed Test
                      </Link>
                      <Link href="/flashcards" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>🎴</span> 3D Flashcards
                      </Link>
                      <Link href="/study-planner" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>📅</span> AI Study Planner
                      </Link>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px] mb-1">Utilities & Calculators</p>
                      <Link href="/cutoff-predictor" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>📊</span> Cutoff Predictor
                      </Link>
                      <Link href="/eligibility-calculator" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>🧮</span> Eligibility Check
                      </Link>
                      <Link href="/photo-resizer" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>📷</span> Photo & Sign Resizer
                      </Link>
                      <Link href="/document-vault" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>📂</span> Document Vault
                      </Link>
                      <Link href="/leaderboard" className="p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 block">
                        <span>🏆</span> All-India Leaderboard
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            </div>

            {/* Right: API Docs Link */}
            <li>
              <a
                href="https://gov-ly37.onrender.com/docs"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Swagger API Docs</span>
              </a>
            </li>

          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, exams, admit cards..."
              className="w-full pl-9 pr-16 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md font-semibold"
            >
              Search
            </button>
          </form>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Core Portals</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link href="/jobs" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700">
                💼 All Govt Jobs
              </Link>
              <Link href="/tech-jobs" className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
                💻 IT & Tech Careers
              </Link>
              <Link href="/mock-tests" className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
                🎯 Free Mock Tests (CBT)
              </Link>
              <Link href="/exams" className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                🏛️ Exams Directory
              </Link>
              <Link href="/results" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                🏆 Sarkari Results
              </Link>
              <Link href="/admit-cards" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                🎫 Admit Cards
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Prep Tools</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link href="/quiz-battle" className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
                ⚔️ 1v1 Quiz Battle
              </Link>
              <Link href="/resume-builder" className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                📝 AI Resume Builder
              </Link>
              <Link href="/cutoff-predictor" className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300">
                📊 Cutoff Predictor
              </Link>
              <Link href="/typing-test" className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                ⌨️ Typing Test
              </Link>
              <Link href="/flashcards" className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300">
                🎴 3D Flashcards
              </Link>
              <Link href="/study-planner" className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
                📅 Study Planner
              </Link>
              <Link href="/document-vault" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                📂 Document Locker
              </Link>
              <Link href="/photo-resizer" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                📷 Photo Resizer
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Study Hub</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link href="/current-affairs" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                📰 Current Affairs
              </Link>
              <Link href="/syllabus" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                📚 Syllabus
              </Link>
              <Link href="/previous-papers" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                📝 Previous Papers
              </Link>
              <Link href="/study-material" className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                📖 Study Notes
              </Link>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <a
              href="https://gov-ly37.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <FileCode2 className="w-4 h-4" /> Open Swagger API Documentation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
