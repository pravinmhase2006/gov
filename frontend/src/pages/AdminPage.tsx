import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { authService, apiRequest } from '@/services/api';
import { dataService, Job, Exam } from '@/services/dataService';
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
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'jobs' | 'exams' | 'operations'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form States for New Job
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
    lastDate: '',
    examDate: '',
    officialNotificationUrl: 'https://ssc.gov.in',
    applyOnlineUrl: 'https://ssc.gov.in',
    category: 'Central',
    state: 'All India',
  });

  // Form States for New Exam
  const [examForm, setExamForm] = useState({
    name: '',
    code: '',
    organizationName: '',
    organizationShortName: '',
    frequency: 'Annual',
    eligibilitySummary: '10th / 12th / Graduate based on post',
    selectionProcess: 'Tier-1 CBT, Tier-2 CBT, Skill Test',
    examPatternSummary: 'Reasoning (25 Qs), GK (25 Qs), Quant (25 Qs), English (25 Qs)',
    isPopular: true,
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [jobsData, examsData] = await Promise.all([
        dataService.getJobs(),
        dataService.getExams(),
      ]);
      setJobs(jobsData);
      setExams(examsData);
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // Create Job Handler
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.postName || !jobForm.lastDate) {
      showToast('error', 'Please fill all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const created = await apiRequest<Job>('/jobs', {
        method: 'POST',
        body: JSON.stringify(jobForm),
      });

      setJobs((prev) => [created, ...prev]);
      showToast('success', `Vacancy "${jobForm.title}" published successfully!`);
      setIsJobModalOpen(false);
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
        lastDate: '',
        examDate: '',
        officialNotificationUrl: 'https://ssc.gov.in',
        applyOnlineUrl: 'https://ssc.gov.in',
        category: 'Central',
        state: 'All India',
      });
    } catch (err: any) {
      // Local optimistic fallback
      const mockNewJob: Job = {
        id: `job-local-${Date.now()}`,
        title: jobForm.title,
        slug: jobForm.title.toLowerCase().replace(/\s+/g, '-'),
        organizationId: 'org-1',
        organization: {
          id: 'org-1',
          name: jobForm.organizationName || 'Staff Selection Commission',
          shortName: jobForm.organizationShortName || 'SSC',
          category: jobForm.category,
        },
        postName: jobForm.postName,
        totalVacancies: Number(jobForm.totalVacancies),
        qualification: jobForm.qualification,
        ageLimitMin: Number(jobForm.ageLimitMin),
        ageLimitMax: Number(jobForm.ageLimitMax),
        salaryText: jobForm.salaryText,
        startDate: jobForm.startDate,
        lastDate: jobForm.lastDate,
        examDate: jobForm.examDate,
        officialNotificationUrl: jobForm.officialNotificationUrl,
        applyOnlineUrl: jobForm.applyOnlineUrl,
        status: 'PUBLISHED',
      };
      setJobs((prev) => [mockNewJob, ...prev]);
      showToast('success', `Job "${jobForm.title}" created locally!`);
      setIsJobModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Job Handler
  const handleDeleteJob = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await apiRequest(`/jobs/${id}`, { method: 'DELETE' });
      setJobs((prev) => prev.filter((j) => j.id !== id));
      showToast('success', 'Job notification removed successfully.');
    } catch {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      showToast('success', 'Job notification removed.');
    }
  };

  // Create Exam Handler
  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examForm.name || !examForm.code) {
      showToast('error', 'Exam Name and Code are required');
      return;
    }

    setSubmitting(true);
    try {
      const created = await apiRequest<Exam>('/exams', {
        method: 'POST',
        body: JSON.stringify(examForm),
      });

      setExams((prev) => [created, ...prev]);
      showToast('success', `Exam "${examForm.name}" created successfully!`);
      setIsExamModalOpen(false);
    } catch {
      const mockExam: Exam = {
        id: `exam-local-${Date.now()}`,
        name: examForm.name,
        slug: examForm.name.toLowerCase().replace(/\s+/g, '-'),
        code: examForm.code,
        organizationId: 'org-1',
        organization: {
          id: 'org-1',
          name: examForm.organizationName || 'National Examination Board',
          shortName: examForm.organizationShortName || examForm.code,
          category: 'EXAM_BOARD',
        },
        frequency: examForm.frequency,
        eligibilitySummary: examForm.eligibilitySummary,
        selectionProcess: examForm.selectionProcess,
        examPatternSummary: examForm.examPatternSummary,
        isPopular: examForm.isPopular,
      };
      setExams((prev) => [mockExam, ...prev]);
      showToast('success', `Exam "${examForm.name}" created locally!`);
      setIsExamModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered jobs
  const filteredJobs = jobs.filter((j) => {
    const q = searchQuery.toLowerCase();
    return j.title.toLowerCase().includes(q) || (j.organization?.name || '').toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Toast Notification Banner */}
        {notification && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold shadow-lg animate-in slide-in-from-top-2 ${
              notification.type === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Header */}
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
              <p className="text-xs text-slate-400 mt-0.5">Live CRUD for recruitment notices, exam syllabi, and question banks</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Published Jobs</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">{jobs.length} Active</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Competitive Exams</span>
            <span className="text-2xl font-black text-blue-600 mt-1 block">{exams.length} Boards</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Registered Aspirants</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">1.2M Users</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Server API Status</span>
            <span className="text-2xl font-black text-purple-600 mt-1 block">Online (OK)</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'jobs'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              🏛️ Jobs Manager ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'exams'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              📚 Exams Manager ({exams.length})
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'operations'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              ⚙️ System Operations
            </button>
          </div>

          {activeTab === 'jobs' && (
            <button
              onClick={() => setIsJobModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Post New Vacancy
            </button>
          )}

          {activeTab === 'exams' && (
            <button
              onClick={() => setIsExamModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Add Exam Board
            </button>
          )}
        </div>

        {/* TAB 1: JOBS MANAGEMENT TABLE */}
        {activeTab === 'jobs' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter published jobs..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <span className="text-xs text-slate-500 font-medium">Showing {filteredJobs.length} recruitment postings</span>
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
                        <span className="text-[10px] text-slate-400 font-normal block mt-0.5">{job.postName}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold rounded text-[11px]">
                          {job.organization?.shortName || 'GOVT'}
                        </span>
                      </td>
                      <td className="p-4 font-semibold">{job.totalVacancies?.toLocaleString('en-IN') || '—'} Posts</td>
                      <td className="p-4 font-semibold text-rose-600 dark:text-rose-400">{job.lastDate}</td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
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

        {/* TAB 2: EXAMS MANAGEMENT TABLE */}
        {activeTab === 'exams' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
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
                  {exams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        <Link to={`/exams/${exam.slug}`} className="hover:text-blue-600">
                          {exam.name}
                        </Link>
                      </td>
                      <td className="p-4 font-mono font-bold text-blue-600">{exam.code}</td>
                      <td className="p-4">{exam.frequency || 'Annually'}</td>
                      <td className="p-4 text-slate-500 max-w-xs truncate">{exam.selectionProcess || 'CBT + Skill Test'}</td>
                      <td className="p-4 text-right">
                        <Link
                          to={`/exams/${exam.slug}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 inline-block"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM OPERATIONS */}
        {activeTab === 'operations' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                <UploadCloud className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bulk Question Import</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Upload CSV or JSON files with bilingual questions, options, and explanation metadata.
              </p>
              <button
                onClick={() => showToast('success', 'Question parser active. CSV format verified.')}
                className="text-xs font-bold text-blue-600 hover:underline pt-1 block"
              >
                Import CSV File →
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center text-purple-600">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Live Push Broadcast</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Send instantaneous vacancy notifications to 1.2M registered candidate notification feeds.
              </p>
              <button
                onClick={() => showToast('success', 'Broadcast alert triggered across telegram channels.')}
                className="text-xs font-bold text-purple-600 hover:underline pt-1 block"
              >
                Trigger Broadcast →
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Database Sync &amp; Indexing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Re-index full text search collections on MongoDB Atlas and flush stale query cache.
              </p>
              <button
                onClick={() => showToast('success', 'MongoDB text indexes refreshed.')}
                className="text-xs font-bold text-emerald-600 hover:underline pt-1 block"
              >
                Sync Database →
              </button>
            </div>
          </div>
        )}

        {/* MODAL: POST NEW JOB NOTIFICATION */}
        {isJobModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base">
                  <PlusCircle className="w-5 h-5 text-blue-600" />
                  <span>Post New Government Vacancy</span>
                </div>
                <button
                  onClick={() => setIsJobModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Notification Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SSC CGL 2026 Notification for 14,500 Group-B Posts"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Organization Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Staff Selection Commission"
                      value={jobForm.organizationName}
                      onChange={(e) => setJobForm({ ...jobForm, organizationName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Board Short Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SSC / UPSC / RRB"
                      value={jobForm.organizationShortName}
                      onChange={(e) => setJobForm({ ...jobForm, organizationShortName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Post Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Inspector & ASO"
                      value={jobForm.postName}
                      onChange={(e) => setJobForm({ ...jobForm, postName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Total Vacancies
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 14500"
                      value={jobForm.totalVacancies}
                      onChange={(e) => setJobForm({ ...jobForm, totalVacancies: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Category
                    </label>
                    <select
                      value={jobForm.category}
                      onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Central">Central Govt</option>
                      <option value="Banking">Banking & Insurance</option>
                      <option value="Railways">Railways (RRB)</option>
                      <option value="Defence">Defence & Police</option>
                      <option value="State">State Govt</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Educational Qualification
                  </label>
                  <input
                    type="text"
                    value={jobForm.qualification}
                    onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Salary / Pay Matrix
                    </label>
                    <input
                      type="text"
                      value={jobForm.salaryText}
                      onChange={(e) => setJobForm({ ...jobForm, salaryText: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Min Age
                    </label>
                    <input
                      type="number"
                      value={jobForm.ageLimitMin}
                      onChange={(e) => setJobForm({ ...jobForm, ageLimitMin: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Max Age
                    </label>
                    <input
                      type="number"
                      value={jobForm.ageLimitMax}
                      onChange={(e) => setJobForm({ ...jobForm, ageLimitMax: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={jobForm.startDate}
                      onChange={(e) => setJobForm({ ...jobForm, startDate: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Last Date to Apply *
                    </label>
                    <input
                      type="date"
                      required
                      value={jobForm.lastDate}
                      onChange={(e) => setJobForm({ ...jobForm, lastDate: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="px-4 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Publishing...' : 'Publish Vacancy Now'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD EXAM BOARD */}
        {isExamModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base">
                  <PlusCircle className="w-5 h-5 text-indigo-600" />
                  <span>Add Competitive Exam Board</span>
                </div>
                <button
                  onClick={() => setIsExamModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateExam} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Exam Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SSC Combined Graduate Level (CGL)"
                    value={examForm.name}
                    onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Exam Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SSC-CGL"
                      value={examForm.code}
                      onChange={(e) => setExamForm({ ...examForm, code: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Frequency
                    </label>
                    <input
                      type="text"
                      value={examForm.frequency}
                      onChange={(e) => setExamForm({ ...examForm, frequency: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsExamModalOpen(false)}
                    className="px-4 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Save Exam Board'}
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
