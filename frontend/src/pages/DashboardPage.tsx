import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { authService } from '@/services/api';
import {
  User,
  Bookmark,
  Award,
  Bell,
  CheckCircle2,
  Calendar,
  Flame,
  Layers,
  Sparkles,
  LogOut,
  Target,
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = authService.getUser() || {
      name: 'Aspirant Rahul Sharma',
      email: 'aspirant@govtprep.in',
      role: 'USER',
    };
    setUser(u);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Hero Greeting */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-saffron-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{user?.name}</h1>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded">
                  Active Prep
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-saffron-400 font-bold">
                <Flame className="w-4 h-4" /> 7-Day Study Streak Active!
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium block">Mock Tests Attempted</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">12 Tests</span>
            <span className="text-[10px] text-emerald-500 font-bold mt-0.5 block">Avg Accuracy: 84.5%</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium block">Target Goal Exam</span>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 block">SSC CGL 2026</span>
            <span className="text-[10px] text-slate-500 font-bold mt-0.5 block">Exam in ~120 Days</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium block">Saved Vacancies</span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">5 Jobs</span>
            <span className="text-[10px] text-rose-500 font-bold mt-0.5 block">1 Last Date this week</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium block">Quiz Battle Rank</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">#142</span>
            <span className="text-[10px] text-blue-500 font-bold mt-0.5 block">Top 5% of Aspirants</span>
          </div>
        </div>

        {/* Shortcuts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Quick Preparation Shortcuts
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/mock-tests"
                className="p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl transition-colors group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 block">
                  All-India Mock Tests
                </span>
                <span className="text-[11px] text-slate-400">Practice full-length test</span>
              </Link>

              <Link
                to="/study-planner"
                className="p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl transition-colors group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 block">
                  Study Schedule
                </span>
                <span className="text-[11px] text-slate-400">View daily targets</span>
              </Link>

              <Link
                to="/resume-builder"
                className="p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl transition-colors group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 block">
                  My Resume / CV
                </span>
                <span className="text-[11px] text-slate-400">Download formatted PDF</span>
              </Link>

              <Link
                to="/document-vault"
                className="p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl transition-colors group"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 block">
                  Certificates Vault
                </span>
                <span className="text-[11px] text-slate-400">Check uploaded docs</span>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Recommended Vacancy Alerts For You
            </h3>

            <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
              <div className="pt-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase">Staff Selection Commission</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">SSC CGL 2026 Examination (14,582 Posts)</h4>
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Last Date: 15 April 2026</span>
                  <Link to="/jobs/ssc-cgl-2026-recruitment" className="font-bold text-blue-600 hover:underline">Apply Now</Link>
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[10px] font-bold text-purple-600 uppercase">Railway Recruitment Board</span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">RRB NTPC Graduate Level (11,558 Posts)</h4>
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Last Date: 20 April 2026</span>
                  <Link to="/jobs/rrb-ntpc-2026-recruitment" className="font-bold text-blue-600 hover:underline">Apply Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
