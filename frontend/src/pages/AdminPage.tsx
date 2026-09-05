import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { adminApi, authService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
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
  Trash2,
  Edit,
  Search,
  ExternalLink,
  X,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Award,
  BookOpen,
  UserCheck,
  UserX,
  HelpCircle,
  Activity,
} from 'lucide-react';
import DataBoundary from '@/components/common/DataBoundary';
import { TableSkeleton } from '@/components/common/SkeletonLoader';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'jobs' | 'exams' | 'tests'>('analytics');

  // Live Data States
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Submissions
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form States for Job
  const [jobForm, setJobForm] = useState({
    title: '',
    organizationName: '',
    organizationShortName: '',
    postName: '',
    totalVacancies: 100,
    qualification: 'Graduation in any stream from a recognized university',
    ageLimitMin: 18,
    ageLimitMax: 30,
    salaryText: 'Level 7 (₹44,900 - ₹1,42,400)',
    startDate: new Date().toISOString().split('T')[0],
    lastDate: '2026-06-30',
    examDate: 'August 2026',
    officialNotificationUrl: 'https://ssc.gov.in',
    applyOnlineUrl: 'https://ssc.gov.in',
    category: 'Central Govt',
    state: 'All India',
  });

  // Form States for Exam
  const [examForm, setExamForm] = useState({
    name: '',
    code: '',
    organizationName: '',
    organizationShortName: '',
    frequency: 'Annually',
    eligibilitySummary: '10th / 12th / Graduate based on post',
    selectionProcess: 'Tier-1 CBT -> Tier-2 CBT -> Skill Test',
    examPatternSummary: 'Reasoning (25 Qs), GK (25 Qs), Quant (25 Qs), English (25 Qs)',
    isPopular: true,
  });

  // Form States for Mock Test
  const [testForm, setTestForm] = useState({
    title: '',
    examName: 'SSC CGL',
    examCategory: 'SSC',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 50,
    difficulty: 'MODERATE',
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [analyticsData, usersData, jobsData, examsData, testsData] = await Promise.all([
        adminApi.getAnalytics().catch(() => null),
        adminApi.getUsers().catch(() => []),
        adminApi.getJobs().catch(() => []),
        adminApi.getExams().catch(() => []),
        adminApi.getTests().catch(() => []),
      ]);

      setAnalytics(analyticsData);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setExams(Array.isArray(examsData) ? examsData : []);
      setTests(Array.isArray(testsData) ? testsData : []);
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
      showToast('error', 'Error syncing with backend database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // ==========================================
  // USER ACTIONS
  // ==========================================
  const handleToggleRole = async (targetUser: any) => {
    const newRole = targetUser.role === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!window.confirm(`Change ${targetUser.email} role to ${newRole}?`)) return;

    try {
      await adminApi.updateUserRole(targetUser.id, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === targetUser.id ? { ...u, role: newRole } : u))
      );
      showToast('success', `User ${targetUser.email} updated to ${newRole}.`);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update user role.');
    }
  };

  const handleDeleteUser = async (targetUser: any) => {
    if (!window.confirm(`Are you sure you want to permanently delete user "${targetUser.name || targetUser.email}"?`)) return;

    try {
      await adminApi.deleteUser(targetUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      showToast('success', 'User account removed from database.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete user.');
    }
  };

  // ==========================================
  // JOB CRUD ACTIONS
  // ==========================================
  const handleOpenJobModal = (jobToEdit?: any) => {
    if (jobToEdit) {
      setEditingItem(jobToEdit);
      setJobForm({
        title: jobToEdit.title,
        organizationName: jobToEdit.organization?.name || 'Government Board',
        organizationShortName: jobToEdit.organization?.shortName || 'Govt',
        postName: jobToEdit.postName || '',
        totalVacancies: jobToEdit.totalVacancies || 100,
        qualification: jobToEdit.qualification || '',
        ageLimitMin: jobToEdit.ageLimitMin || 18,
        ageLimitMax: jobToEdit.ageLimitMax || 30,
        salaryText: jobToEdit.salaryText || '',
        startDate: jobToEdit.startDate || '',
        lastDate: jobToEdit.lastDate || '',
        examDate: jobToEdit.examDate || '',
        officialNotificationUrl: jobToEdit.officialNotificationUrl || '',
        applyOnlineUrl: jobToEdit.applyOnlineUrl || '',
        category: jobToEdit.category || 'Central Govt',
        state: jobToEdit.state || 'All India',
      });
    } else {
      setEditingItem(null);
      setJobForm({
        title: '',
        organizationName: '',
        organizationShortName: '',
        postName: '',
        totalVacancies: 100,
        qualification: 'Graduation in any stream from a recognized university',
        ageLimitMin: 18,
        ageLimitMax: 30,
        salaryText: 'Level 7 (₹44,900 - ₹1,42,400)',
        startDate: new Date().toISOString().split('T')[0],
        lastDate: '2026-06-30',
        examDate: 'August 2026',
        officialNotificationUrl: 'https://ssc.gov.in',
        applyOnlineUrl: 'https://ssc.gov.in',
        category: 'Central Govt',
        state: 'All India',
      });
    }
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.postName || !jobForm.lastDate) {
      showToast('error', 'Please fill all required job fields.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        const updated = await adminApi.updateJob(editingItem.id, jobForm);
        setJobs((prev) => prev.map((j) => (j.id === editingItem.id ? updated : j)));
        showToast('success', `Job "${jobForm.title}" updated in database.`);
      } else {
        const created = await adminApi.createJob(jobForm);
        setJobs((prev) => [created, ...prev]);
        showToast('success', `Job notification "${jobForm.title}" published!`);
      }
      setIsJobModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save job notification.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      await adminApi.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      showToast('success', 'Job notification deleted from database.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete job.');
    }
  };

  // ==========================================
  // EXAM CRUD ACTIONS
  // ==========================================
  const handleOpenExamModal = (examToEdit?: any) => {
    if (examToEdit) {
      setEditingItem(examToEdit);
      setExamForm({
        name: examToEdit.name,
        code: examToEdit.code,
        organizationName: examToEdit.organization?.name || '',
        organizationShortName: examToEdit.organization?.shortName || '',
        frequency: examToEdit.frequency || 'Annually',
        eligibilitySummary: examToEdit.eligibilitySummary || '',
        selectionProcess: examToEdit.selectionProcess || '',
        examPatternSummary: examToEdit.examPatternSummary || '',
        isPopular: Boolean(examToEdit.isPopular),
      });
    } else {
      setEditingItem(null);
      setExamForm({
        name: '',
        code: '',
        organizationName: '',
        organizationShortName: '',
        frequency: 'Annually',
        eligibilitySummary: '10th / 12th / Graduate based on post',
        selectionProcess: 'Tier-1 CBT -> Tier-2 CBT -> Skill Test',
        examPatternSummary: 'Reasoning (25 Qs), GK (25 Qs), Quant (25 Qs), English (25 Qs)',
        isPopular: true,
      });
    }
    setIsExamModalOpen(true);
  };

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examForm.name || !examForm.code) {
      showToast('error', 'Exam Name and Code are required.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        const updated = await adminApi.updateExam(editingItem.id, examForm);
        setExams((prev) => prev.map((ex) => (ex.id === editingItem.id ? updated : ex)));
        showToast('success', `Exam "${examForm.name}" updated successfully!`);
      } else {
        const created = await adminApi.createExam(examForm);
        setExams((prev) => [created, ...prev]);
        showToast('success', `Exam "${examForm.name}" created successfully!`);
      }
      setIsExamModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save exam.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExam = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete exam "${name}"?`)) return;

    try {
      await adminApi.deleteExam(id);
      setExams((prev) => prev.filter((e) => e.id !== id));
      showToast('success', 'Exam deleted successfully.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete exam.');
    }
  };

  // ==========================================
  // MOCK TEST CRUD ACTIONS
  // ==========================================
  const handleSaveTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.title || !testForm.examName) {
      showToast('error', 'Test Title and Exam Name are required.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await adminApi.createTest(testForm);
      setTests((prev) => [created, ...prev]);
      showToast('success', `Mock Test "${testForm.title}" published!`);
      setIsTestModalOpen(false);
      setTestForm({
        title: '',
        examName: 'SSC CGL',
        examCategory: 'SSC',
        durationMinutes: 60,
        totalQuestions: 25,
        totalMarks: 50,
        difficulty: 'MODERATE',
      });
    } catch (err: any) {
      showToast('error', err.message || 'Failed to create mock test.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTest = async (id: string, title: string) => {
    if (!window.confirm(`Delete mock test "${title}"?`)) return;

    try {
      await adminApi.deleteTest(id);
      setTests((prev) => prev.filter((t) => t.id !== id));
      showToast('success', 'Mock test deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete test.');
    }
  };

  // Filtering
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
  });

  const filteredJobs = jobs.filter((j) => {
    const q = searchQuery.toLowerCase();
    return (j.title || '').toLowerCase().includes(q) || (j.organization?.name || '').toLowerCase().includes(q);
  });

  const filteredExams = exams.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (e.name || '').toLowerCase().includes(q) || (e.code || '').toLowerCase().includes(q);
  });

  const filteredTests = tests.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (t.title || '').toLowerCase().includes(q) || (t.examName || '').toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Toast Notification Banner */}
        {notification && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold shadow-lg animate-in slide-in-from-top-2 ${
              notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-2xl">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black">GovtPrep Admin Control Center</h1>
                <span className="px-2.5 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 text-[10px] font-bold rounded-full border border-red-200 dark:border-red-800">
                  {user?.role || 'ADMIN'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Manage live database records, registered candidates, recruitment vacancies, exams, and CBT mock tests.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={loadAllAdminData}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors"
              title="Refresh live data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2 shadow"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Registered Users</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
              {analytics?.stats?.totalUsers ?? users.length}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Govt Vacancies</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
              {analytics?.stats?.totalJobs ?? jobs.length}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tracked Exams</span>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
              {analytics?.stats?.totalExams ?? exams.length}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live Mock Tests</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {analytics?.stats?.totalMockTests ?? tests.length}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 lg:col-span-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Database Status</span>
            <span className="text-2xl font-black text-emerald-500 mt-1 block">
              Connected (Live)
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => { setActiveTab('analytics'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              📊 Analytics Overview
            </button>
            <button
              onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              👥 Users Manager ({users.length})
            </button>
            <button
              onClick={() => { setActiveTab('jobs'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'jobs'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              🏛️ Jobs Manager ({jobs.length})
            </button>
            <button
              onClick={() => { setActiveTab('exams'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'exams'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              📚 Exams Manager ({exams.length})
            </button>
            <button
              onClick={() => { setActiveTab('tests'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'tests'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              📝 CBT Mock Tests ({tests.length})
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeTab === 'jobs' && (
              <button
                onClick={() => handleOpenJobModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" /> Post New Vacancy
              </button>
            )}
            {activeTab === 'exams' && (
              <button
                onClick={() => handleOpenExamModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" /> Add Exam Notification
              </button>
            )}
            {activeTab === 'tests' && (
              <button
                onClick={() => setIsTestModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" /> Create Mock Test
              </button>
            )}
          </div>
        </div>

        {/* TAB 0: ANALYTICS OVERVIEW */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent User Signups */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" /> Recent User Registrations
                  </h3>
                  <button
                    onClick={() => setActiveTab('users')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {users.slice(0, 5).map((u) => (
                    <div key={u.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-900 dark:text-white block">
                          {u.name || 'Aspirant'}
                        </span>
                        <span className="text-[11px] text-slate-500">{u.email}</span>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Jobs */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" /> Latest Recruitment Notices
                  </h3>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {jobs.slice(0, 5).map((j) => (
                    <div key={j.id} className="py-3 flex items-center justify-between">
                      <div className="max-w-[70%]">
                        <span className="font-bold text-xs text-slate-900 dark:text-white block line-clamp-1">
                          {j.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {j.organization?.shortName || 'Govt'} • {j.totalVacancies || 0} Vacancies
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-rose-600">
                        {j.lastDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: USERS MANAGER */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter users by name or email..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredUsers.length} registered accounts
              </span>
            </div>

            <div className="table-responsive">
              <table className="w-full min-w-[700px] text-xs text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">User Details</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Verification</th>
                    <th className="p-4">Registered Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold">
                        <span className="text-slate-900 dark:text-white block">{u.name || 'Candidate'}</span>
                        <span className="text-[11px] text-slate-500 font-normal">{u.email}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${
                          u.role === 'ADMIN'
                            ? 'bg-purple-50 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-200'
                            : 'bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-200'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Verified
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleToggleRole(u)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg transition-colors"
                            title="Toggle User/Admin Role"
                          >
                            {u.role === 'ADMIN' ? 'Demote to User' : 'Promote to Admin'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: JOBS MANAGEMENT */}
        {activeTab === 'jobs' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter published jobs by title or board..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredJobs.length} recruitment postings
              </span>
            </div>

            <div className="table-responsive">
              <table className="w-full min-w-[700px] text-xs text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Recruitment Title</th>
                    <th className="p-4">Board / Org</th>
                    <th className="p-4">Vacancies</th>
                    <th className="p-4">Last Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold max-w-xs">
                        <Link to={`/jobs/${job.slug}`} className="hover:text-blue-600 line-clamp-1">
                          {job.title}
                        </Link>
                        <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                          {job.postName || 'Various Posts'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold rounded text-[11px]">
                          {job.organization?.shortName || job.organization?.name || 'Govt'}
                        </span>
                      </td>
                      <td className="p-4 font-semibold">
                        {job.totalVacancies?.toLocaleString('en-IN') || '—'} Posts
                      </td>
                      <td className="p-4 font-semibold text-rose-600 dark:text-rose-400">
                        {job.lastDate}
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenJobModal(job)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Job"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            to={`/jobs/${job.slug}`}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete Job"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: EXAMS MANAGEMENT */}
        {activeTab === 'exams' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter exams by title or code..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredExams.length} tracked exams
              </span>
            </div>

            <div className="table-responsive">
              <table className="w-full min-w-[700px] text-xs text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Exam Name</th>
                    <th className="p-4">Code</th>
                    <th className="p-4">Frequency</th>
                    <th className="p-4">Selection Process</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        <Link to={`/exams/${exam.slug}`} className="hover:text-blue-600">
                          {exam.name}
                        </Link>
                      </td>
                      <td className="p-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                        {exam.code}
                      </td>
                      <td className="p-4">{exam.frequency || 'Annually'}</td>
                      <td className="p-4 text-slate-500 max-w-xs truncate">
                        {exam.selectionProcess || 'CBT + Skill Test'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenExamModal(exam)}
                            className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Exam"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            to={`/exams/${exam.slug}`}
                            className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 inline-block"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteExam(exam.id, exam.name)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete Exam"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MOCK TESTS MANAGEMENT */}
        {activeTab === 'tests' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter mock tests..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredTests.length} CBT tests
              </span>
            </div>

            <div className="table-responsive">
              <table className="w-full min-w-[700px] text-xs text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Test Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration / Marks</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {filteredTests.map((test) => (
                    <tr key={test.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        <Link to={`/mock-tests/${test.slug}`} className="hover:text-emerald-600">
                          {test.title}
                        </Link>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold rounded text-[11px]">
                          {test.examCategory || test.examName}
                        </span>
                      </td>
                      <td className="p-4 font-semibold">
                        {test.durationMinutes} Mins • {test.totalMarks} Marks
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded text-[10px]">
                          {test.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            to={`/mock-tests/${test.slug}`}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Run CBT Test"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteTest(test.id, test.title)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete Test"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL 1: JOB ADD / EDIT */}
        {isJobModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {editingItem ? 'Edit Government Job Notification' : 'Publish New Recruitment Notification'}
                </h3>
                <button onClick={() => setIsJobModalOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Notification Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g., SSC CGL 2026 Notification - 17,727 Group B & C Vacancies"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Organization / Board Name *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.organizationName}
                      onChange={(e) => setJobForm({ ...jobForm, organizationName: e.target.value })}
                      placeholder="e.g., Staff Selection Commission"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Short Code *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.organizationShortName}
                      onChange={(e) => setJobForm({ ...jobForm, organizationShortName: e.target.value })}
                      placeholder="e.g., SSC"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Post Name *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.postName}
                      onChange={(e) => setJobForm({ ...jobForm, postName: e.target.value })}
                      placeholder="e.g., Assistant Section Officer"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Total Vacancies *</label>
                    <input
                      type="number"
                      required
                      value={jobForm.totalVacancies}
                      onChange={(e) => setJobForm({ ...jobForm, totalVacancies: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      value={jobForm.category}
                      onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    >
                      <option>Central Govt</option>
                      <option>Railways</option>
                      <option>Banking</option>
                      <option>Defence</option>
                      <option>Police</option>
                      <option>Teaching</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Start Date</label>
                    <input
                      type="date"
                      value={jobForm.startDate}
                      onChange={(e) => setJobForm({ ...jobForm, startDate: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Last Date *</label>
                    <input
                      type="date"
                      required
                      value={jobForm.lastDate}
                      onChange={(e) => setJobForm({ ...jobForm, lastDate: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Educational Qualification</label>
                  <input
                    type="text"
                    value={jobForm.qualification}
                    onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="px-4 py-2 text-slate-500 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Saving to Database...' : editingItem ? 'Update Notification' : 'Publish Notification'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: EXAM ADD / EDIT */}
        {isExamModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {editingItem ? 'Edit Exam Notification' : 'Add New Competitive Exam'}
                </h3>
                <button onClick={() => setIsExamModalOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveExam} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Exam Name *</label>
                    <input
                      type="text"
                      required
                      value={examForm.name}
                      onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                      placeholder="e.g., SSC CGL 2026"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Exam Code *</label>
                    <input
                      type="text"
                      required
                      value={examForm.code}
                      onChange={(e) => setExamForm({ ...examForm, code: e.target.value })}
                      placeholder="e.g., SSC-CGL"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Conducting Board</label>
                    <input
                      type="text"
                      value={examForm.organizationName}
                      onChange={(e) => setExamForm({ ...examForm, organizationName: e.target.value })}
                      placeholder="Staff Selection Commission"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={examForm.frequency}
                      onChange={(e) => setExamForm({ ...examForm, frequency: e.target.value })}
                      placeholder="Annually / Twice a Year"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Selection Process</label>
                  <input
                    type="text"
                    value={examForm.selectionProcess}
                    onChange={(e) => setExamForm({ ...examForm, selectionProcess: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsExamModalOpen(false)}
                    className="px-4 py-2 text-slate-500 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : editingItem ? 'Update Exam' : 'Create Exam'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: MOCK TEST ADD */}
        {isTestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Publish New All-India CBT Mock Test
                </h3>
                <button onClick={() => setIsTestModalOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveTest} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Test Title *</label>
                  <input
                    type="text"
                    required
                    value={testForm.title}
                    onChange={(e) => setTestForm({ ...testForm, title: e.target.value })}
                    placeholder="e.g., SSC CGL Tier-1 Full Length Grand Mock Test 02"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Exam *</label>
                    <input
                      type="text"
                      required
                      value={testForm.examName}
                      onChange={(e) => setTestForm({ ...testForm, examName: e.target.value })}
                      placeholder="e.g., SSC CGL"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      value={testForm.examCategory}
                      onChange={(e) => setTestForm({ ...testForm, examCategory: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    >
                      <option>SSC</option>
                      <option>RAILWAYS</option>
                      <option>BANKING</option>
                      <option>UPSC</option>
                      <option>DEFENCE</option>
                      <option>STATE_PSC</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Duration (Mins)</label>
                    <input
                      type="number"
                      value={testForm.durationMinutes}
                      onChange={(e) => setTestForm({ ...testForm, durationMinutes: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Total Marks</label>
                    <input
                      type="number"
                      value={testForm.totalMarks}
                      onChange={(e) => setTestForm({ ...testForm, totalMarks: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
                    <select
                      value={testForm.difficulty}
                      onChange={(e) => setTestForm({ ...testForm, difficulty: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    >
                      <option>EASY</option>
                      <option>MODERATE</option>
                      <option>HARD</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsTestModalOpen(false)}
                    className="px-4 py-2 text-slate-500 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Creating Test...' : 'Publish Test'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
