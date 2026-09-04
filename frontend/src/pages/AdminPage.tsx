import React, { useState } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { authService } from '@/services/api';
import {
  ShieldAlert,
  PlusCircle,
  Users,
  Briefcase,
  FileCheck2,
  Settings,
  Database,
  CheckCircle,
  LogOut,
  UploadCloud,
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-2xl">
              <ShieldAlert className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">GovtPrep Admin Control Center</h1>
                <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Manage recruitment postings, question banks, and notifications</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Management Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Published Jobs</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">142 Active</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Question Bank</span>
            <span className="text-2xl font-black text-blue-600 mt-1 block">25,480 Qs</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Registered Aspirants</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">1.2M Users</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Server API Status</span>
            <span className="text-2xl font-black text-purple-600 mt-1 block">99.98% Healthy</span>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="font-black text-base text-slate-900 dark:text-white">Admin Operations</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <PlusCircle className="w-6 h-6 text-blue-600" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Post New Job Notification</h4>
              <p className="text-xs text-slate-500">Create new vacancy, deadlines, eligibility criteria, and PDF links.</p>
              <button className="text-xs font-bold text-blue-600 hover:underline pt-1">Open Job Editor →</button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <UploadCloud className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bulk Question Import</h4>
              <p className="text-xs text-slate-500">Upload CSV or JSON files of test questions with bilingual options.</p>
              <button className="text-xs font-bold text-emerald-600 hover:underline pt-1">Import CSV →</button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
              <Database className="w-6 h-6 text-purple-600" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Broadcast Alerts</h4>
              <p className="text-xs text-slate-500">Send instant browser push notifications and email digests.</p>
              <button className="text-xs font-bold text-purple-600 hover:underline pt-1">Send Broadcast →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
