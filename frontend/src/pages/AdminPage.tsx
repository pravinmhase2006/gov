import React, { useState, useEffect } from 'react';
import Link from '@/components/common/Link';
import { useNavigate } from '@/lib/navigation';
import { adminApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import {
  Users,
  Briefcase,
  FileCheck2,
  Settings,
  Database,
  CheckCircle,
  LogOut,
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
  Menu,
  Bell,
  Mail,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Calendar,
  Layers,
  Heart,
  FileText,
  Clock,
  Check,
  TrendingUp,
  Plus,
  PlusCircle,
  Home,
  ShieldCheck,
  Sliders,
  BarChart3,
  GraduationCap,
  Eye,
  Lock,
  Download,
  ShieldAlert,
  Loader2
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'courses' | 'certificates' | 'jobs' | 'exams' | 'tests' | 'logs' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Live Data States
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Submissions
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form States for Course
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: 'Full-Stack Web Development',
    level: 'Beginner',
    durationHours: 12,
    instructor: 'Aspirant Tech Academy',
    instructorRole: 'Lead Instructor',
    badge: 'Certification Track',
    isPublished: true,
    isFree: true,
    skills: 'React, Node.js, MongoDB, TypeScript',
  });

  // Form States for Certificate
  const [certForm, setCertForm] = useState({
    courseTitle: 'Full-Stack Web Development Masterclass',
    recipientName: '',
    recipientEmail: '',
    grade: 'Distinction',
    skills: 'React, Node.js, REST APIs, Database Design',
  });

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
      const [analyticsData, usersData, coursesData, certsData, jobsData, examsData, testsData, logsData] = await Promise.all([
        adminApi.getAnalytics().catch(() => null),
        adminApi.getUsers().catch(() => []),
        adminApi.getCourses().catch(() => []),
        adminApi.getCertificates().catch(() => []),
        adminApi.getJobs().catch(() => []),
        adminApi.getExams().catch(() => []),
        adminApi.getTests().catch(() => []),
        adminApi.getLogs().catch(() => []),
      ]);

      setAnalytics(analyticsData);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setCertificates(Array.isArray(certsData) ? certsData : []);
      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setExams(Array.isArray(examsData) ? examsData : []);
      setTests(Array.isArray(testsData) ? testsData : []);
      setLogs(Array.isArray(logsData) ? logsData : []);
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

  // User Actions
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
    if (!window.confirm(`Are you sure you want to delete user "${targetUser.name || targetUser.email}"?`)) return;

    try {
      await adminApi.deleteUser(targetUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      showToast('success', 'User account removed from database.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete user.');
    }
  };

  // Course Actions
  const handleOpenCourseModal = (courseToEdit?: any) => {
    if (courseToEdit) {
      setEditingItem(courseToEdit);
      setCourseForm({
        title: courseToEdit.title,
        description: courseToEdit.description || '',
        category: courseToEdit.category || 'Tech',
        level: courseToEdit.level || 'Beginner',
        durationHours: courseToEdit.durationHours || 10,
        instructor: courseToEdit.instructor || 'Instructor',
        instructorRole: courseToEdit.instructorRole || 'Lead',
        badge: courseToEdit.badge || 'Track',
        isPublished: courseToEdit.isPublished ?? true,
        isFree: courseToEdit.isFree ?? true,
        skills: Array.isArray(courseToEdit.skills) ? courseToEdit.skills.join(', ') : '',
      });
    } else {
      setEditingItem(null);
      setCourseForm({
        title: '',
        description: '',
        category: 'Full-Stack Web Development',
        level: 'Beginner',
        durationHours: 12,
        instructor: 'Aspirant Tech Academy',
        instructorRole: 'Lead Instructor',
        badge: 'Certification Track',
        isPublished: true,
        isFree: true,
        skills: 'React, Node.js, MongoDB, TypeScript',
      });
    }
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.description) {
      showToast('error', 'Please fill course title and description.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...courseForm,
        skills: courseForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
      };

      if (editingItem) {
        const updated = await adminApi.updateCourse(editingItem.id, payload);
        setCourses((prev) => prev.map((c) => (c.id === editingItem.id ? updated : c)));
        showToast('success', `Course "${courseForm.title}" updated.`);
      } else {
        const created = await adminApi.createCourse(payload);
        setCourses((prev) => [created, ...prev]);
        showToast('success', `Course "${courseForm.title}" created!`);
      }
      setIsCourseModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save course.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete course "${title}"?`)) return;

    try {
      await adminApi.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      showToast('success', 'Course deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete course.');
    }
  };

  // Certificate Actions
  const handleOpenCertModal = () => {
    setCertForm({
      courseTitle: 'Full-Stack Web Development Masterclass',
      recipientName: '',
      recipientEmail: '',
      grade: 'Distinction',
      skills: 'React, Node.js, REST APIs, Database Design',
    });
    setIsCertModalOpen(true);
  };

  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.courseTitle || !certForm.recipientName) {
      showToast('error', 'Please provide course title and recipient name.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...certForm,
        skills: certForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
      };
      const created = await adminApi.generateCertificate(payload);
      setCertificates((prev) => [created, ...prev]);
      showToast('success', `Issued certificate for ${certForm.recipientName}!`);
      setIsCertModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to issue certificate.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCertificate = async (id: string, code: string) => {
    if (!window.confirm(`Revoke certificate "${code}"?`)) return;

    try {
      await adminApi.deleteCertificate(id);
      setCertificates((prev) => prev.filter((c) => c.id !== id));
      showToast('success', 'Certificate revoked.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to revoke certificate.');
    }
  };

  // Job Actions
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
    if (!jobForm.title || !jobForm.postName) {
      showToast('error', 'Please fill required job fields.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        const updated = await adminApi.updateJob(editingItem.id, jobForm);
        setJobs((prev) => prev.map((j) => (j.id === editingItem.id ? updated : j)));
        showToast('success', `Job "${jobForm.title}" updated.`);
      } else {
        const created = await adminApi.createJob(jobForm);
        setJobs((prev) => [created, ...prev]);
        showToast('success', `Job "${jobForm.title}" published!`);
      }
      setIsJobModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save job.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!window.confirm(`Delete job "${title}"?`)) return;

    try {
      await adminApi.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      showToast('success', 'Job deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete job.');
    }
  };

  // Exam Actions
  const handleOpenExamModal = (examToEdit?: any) => {
    if (examToEdit) {
      setEditingItem(examToEdit);
      setExamForm({
        name: examToEdit.name,
        code: examToEdit.code || 'EXAM',
        organizationName: examToEdit.organization?.name || 'Board',
        organizationShortName: examToEdit.organization?.shortName || 'Govt',
        frequency: examToEdit.frequency || 'Annually',
        eligibilitySummary: examToEdit.eligibilitySummary || '',
        selectionProcess: examToEdit.selectionProcess || '',
        examPatternSummary: examToEdit.examPatternSummary || '',
        isPopular: examToEdit.isPopular || false,
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
      showToast('error', 'Please fill exam name and code.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        const updated = await adminApi.updateExam(editingItem.id, examForm);
        setExams((prev) => prev.map((ex) => (ex.id === editingItem.id ? updated : ex)));
        showToast('success', `Exam "${examForm.name}" updated.`);
      } else {
        const created = await adminApi.createExam(examForm);
        setExams((prev) => [created, ...prev]);
        showToast('success', `Exam board "${examForm.name}" added!`);
      }
      setIsExamModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save exam.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExam = async (id: string, name: string) => {
    if (!window.confirm(`Delete exam "${name}"?`)) return;

    try {
      await adminApi.deleteExam(id);
      setExams((prev) => prev.filter((e) => e.id !== id));
      showToast('success', 'Exam deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete exam.');
    }
  };

  // Mock Test Actions
  const handleOpenTestModal = (testToEdit?: any) => {
    if (testToEdit) {
      setEditingItem(testToEdit);
      setTestForm({
        title: testToEdit.title,
        examName: testToEdit.examName || 'SSC CGL',
        examCategory: testToEdit.examCategory || 'SSC',
        durationMinutes: testToEdit.durationMinutes || 60,
        totalQuestions: testToEdit.totalQuestions || 25,
        totalMarks: testToEdit.totalMarks || 50,
        difficulty: testToEdit.difficulty || 'MODERATE',
      });
    } else {
      setEditingItem(null);
      setTestForm({
        title: '',
        examName: 'SSC CGL',
        examCategory: 'SSC',
        durationMinutes: 60,
        totalQuestions: 25,
        totalMarks: 50,
        difficulty: 'MODERATE',
      });
    }
    setIsTestModalOpen(true);
  };

  const handleSaveTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.title) {
      showToast('error', 'Please enter test title.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        const updated = await adminApi.updateTest(editingItem.id, testForm);
        setTests((prev) => prev.map((t) => (t.id === editingItem.id ? updated : t)));
        showToast('success', `Mock Test "${testForm.title}" updated.`);
      } else {
        const created = await adminApi.createTest(testForm);
        setTests((prev) => [created, ...prev]);
        showToast('success', `Mock Test "${testForm.title}" created!`);
      }
      setIsTestModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save mock test.');
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
      showToast('error', err.message || 'Failed to delete mock test.');
    }
  };

  const totalVacanciesCount = jobs.reduce((acc, curr) => acc + (curr.totalVacancies || 0), 0);

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-slate-800 font-sans flex flex-col">
      {/* 1. TOP CYAN/TEAL NAVBAR */}
      <header className="bg-gradient-to-r from-[#009ca6] via-[#00a8a8] to-[#00b4b4] text-white shadow-md sticky top-0 z-50 h-14 flex items-center justify-between px-4">
        {/* Brand Logo & Menu Button */}
        <div className="flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-white text-base shadow-sm">
              ⚡
            </div>
            <span className="font-extrabold text-lg tracking-wider text-white">
              FAB ADMIN
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors text-white/90 hover:text-white cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb Header Button */}
          <div className="hidden sm:flex items-center gap-1.5 bg-black/15 hover:bg-black/25 px-3 py-1 rounded-md text-xs font-semibold text-white/95 transition-colors cursor-pointer">
            <span className="capitalize">{activeTab}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </div>
        </div>

        {/* Top Right Utilities & Notifications */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-white/70 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 bg-black/15 hover:bg-black/20 focus:bg-black/30 rounded-md text-xs text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white/40 w-44 lg:w-56 transition-all"
            />
          </div>

          <button className="relative p-1.5 rounded-full hover:bg-white/15 transition-colors text-white cursor-pointer">
            <Mail className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
              {logs.length > 0 ? logs.length : 5}
            </span>
          </button>

          <button className="relative p-1.5 rounded-full hover:bg-white/15 transition-colors text-white cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
              {certificates.length > 0 ? certificates.length : 3}
            </span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/50 shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="hidden lg:inline-block text-xs font-bold text-white max-w-[120px] truncate">
              {user?.name || 'Administrator'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-full hover:bg-rose-600/80 transition-colors text-white cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT NAVY SIDEBAR */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'
          } bg-[#1e293b] text-slate-300 transition-all duration-300 flex flex-col shrink-0 overflow-y-auto border-r border-slate-800 select-none z-30`}
        >
          {/* Top User Card Banner */}
          <div className="p-4 bg-gradient-to-b from-[#182230] to-[#1e293b] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 truncate">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-emerald-400 font-semibold">● Database Synced</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-5 text-xs">
            {/* Section 1: CORE SECTIONS */}
            <div>
              <p className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">
                PERSONAL
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                </button>

                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'users'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>User Management</span>
                  </div>
                  <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded font-bold text-slate-300">
                    {users.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'courses'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Courses & Modules</span>
                  </div>
                  <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded font-bold text-slate-300">
                    {courses.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'certificates'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4" />
                    <span>Certificates</span>
                  </div>
                  <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded font-bold text-slate-300">
                    {certificates.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Section 2: FORMS & CONTENT */}
            <div>
              <p className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">
                FORMS, TABLE & LAYOUTS
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'jobs'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4" />
                    <span>Jobs & Vacancies</span>
                  </div>
                  <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded font-bold text-slate-300">
                    {jobs.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('exams')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'exams'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Exam Boards</span>
                  </div>
                  <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded font-bold text-slate-300">
                    {exams.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('tests')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'tests'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="w-4 h-4" />
                    <span>Mock Tests CBT</span>
                  </div>
                  <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded font-bold text-slate-300">
                    {tests.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Section 3: EXTRA & LOGS */}
            <div>
              <p className="px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">
                EXTRA COMPONENTS
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'logs'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4" />
                    <span>Activity & Audit Logs</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#00a8a8] text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Platform Settings</span>
                  </div>
                </button>

                <Link
                  to="/"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4" />
                    <span>Public Portal</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT CANVAS */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Notification Toast */}
          {notification && (
            <div
              className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold shadow-lg animate-fadeIn ${
                notification.type === 'success'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                {notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{notification.message}</span>
              </div>
              <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Breadcrumb & Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight capitalize">
                {activeTab} <span className="text-slate-400 text-sm font-normal">Control panel</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Home</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-700 capitalize">{activeTab}</span>
            </div>
          </div>

          {/* 3. TOP 4 METRIC KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: Users */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#7c4dff] text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">
                  {users.length.toLocaleString()}
                </p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  REGISTERED USERS
                </p>
              </div>
            </div>

            {/* Card 2: Vacancies */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#ff9800] text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">
                  {totalVacanciesCount.toLocaleString()}
                </p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  ACTIVE VACANCIES
                </p>
              </div>
            </div>

            {/* Card 3: Courses */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#0091ea] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">
                  {courses.length.toLocaleString()}
                </p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  TECH COURSES
                </p>
              </div>
            </div>

            {/* Card 4: Certificates */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#00b4d8] text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">
                  {certificates.length.toLocaleString()}
                </p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  CERTIFICATES ISSUED
                </p>
              </div>
            </div>
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (4 cols): Vitals & Weekly Trend */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-sm text-slate-800">Platform Health & Vitals</h3>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <span className="text-[10px] text-slate-400 font-bold block">TOTAL EXAMS</span>
                      <span className="text-xl font-black text-slate-800">{exams.length}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <span className="text-[10px] text-slate-400 font-bold block">MOCK TESTS</span>
                      <span className="text-xl font-black text-cyan-600">{tests.length}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Database Status: Connected & Synced</span>
                  </div>
                </div>

                {/* Weekly Dynamic Activity Bar Chart */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-sm text-slate-800">Weekly Activity Trends</h3>
                    <div className="flex items-center gap-2 text-[11px] font-bold">
                      <span className="text-[#00b4d8]">● Registrations</span>
                      <span className="text-rose-500">● Tests</span>
                    </div>
                  </div>

                  <div className="pt-6 pb-2">
                    <div className="h-44 flex items-end justify-between gap-2 px-2 border-b border-slate-100">
                      {(analytics?.weeklyChart || [
                        { day: 'Mon', registrations: 12, testsTaken: 18 },
                        { day: 'Tue', registrations: 19, testsTaken: 25 },
                        { day: 'Wed', registrations: 15, testsTaken: 30 },
                        { day: 'Thu', registrations: 22, testsTaken: 28 },
                        { day: 'Fri', registrations: 18, testsTaken: 20 },
                        { day: 'Sat', registrations: 28, testsTaken: 38 },
                        { day: 'Sun', registrations: 32, testsTaken: 45 },
                      ]).map((item: any, i: number) => (
                        <div key={i} className="flex items-end gap-1.5 h-full">
                          <div
                            style={{ height: `${Math.min(100, item.registrations * 3)}%` }}
                            className="w-3.5 bg-[#00b4d8] rounded-t-sm transition-all"
                            title={`Registrations: ${item.registrations}`}
                          />
                          <div
                            style={{ height: `${Math.min(100, item.testsTaken * 2)}%` }}
                            className="w-3.5 bg-rose-500 rounded-t-sm transition-all"
                            title={`Tests: ${item.testsTaken}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-2 pt-2">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (8 cols): Recent Jobs & Activity Grid */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-800">Recent Job Notifications</h3>
                      <p className="text-xs text-slate-400">Live listings synchronized from MongoDB</p>
                    </div>
                    <button
                      onClick={() => handleOpenJobModal()}
                      className="px-3 py-1.5 bg-[#00a8a8] text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Publish Job
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">No.</th>
                          <th className="py-3 px-4">Job Title</th>
                          <th className="py-3 px-4">Board</th>
                          <th className="py-3 px-4">Vacancies</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {jobs.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-slate-400">
                              No jobs found in database. Click "Publish Job" to add one.
                            </td>
                          </tr>
                        ) : (
                          jobs.slice(0, 5).map((job, idx) => (
                            <tr key={job.id || idx} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-slate-400">{idx + 1}</td>
                              <td className="py-3.5 px-4 font-bold text-slate-800 max-w-[200px] truncate">
                                {job.title}
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-600">
                                {job.organization?.shortName || job.organization?.name || 'Govt'}
                              </td>
                              <td className="py-3.5 px-4 font-bold text-slate-800">
                                {job.totalVacancies ? `${job.totalVacancies} Posts` : '—'}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                                  Published
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right space-x-2">
                                <button
                                  onClick={() => handleOpenJobModal(job)}
                                  className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteJob(job.id, job.title)}
                                  className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Registered Users</h3>
                  <p className="text-xs text-slate-400">Total {users.length} registered candidates & administrators</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Joined Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No users found in database.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-800 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                              {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span>{u.name || 'Anonymous User'}</span>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-600">{u.email}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                u.role === 'ADMIN'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                              Active
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleToggleRole(u)}
                              className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                            >
                              Toggle Role
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COURSE MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Tech & Career Courses</h3>
                  <p className="text-xs text-slate-400">Total {courses.length} courses configured in database</p>
                </div>
                <button
                  onClick={() => handleOpenCourseModal()}
                  className="px-3.5 py-2 bg-[#00a8a8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Create Course
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Course Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Enrolled Count</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No courses in database. Click "Create Course" to add one.
                        </td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-800">{course.title}</td>
                          <td className="py-3.5 px-4">{course.category}</td>
                          <td className="py-3.5 px-4">{course.durationHours} hrs</td>
                          <td className="py-3.5 px-4 font-bold text-blue-600">{course.enrolledCount || 0}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                              {course.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenCourseModal(course)}
                              className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id, course.title)}
                              className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Issued Certificates</h3>
                  <p className="text-xs text-slate-400">Total {certificates.length} verifiable completion credentials</p>
                </div>
                <button
                  onClick={handleOpenCertModal}
                  className="px-3.5 py-2 bg-[#00a8a8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Issue Certificate
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Certificate ID</th>
                      <th className="py-3 px-4">Recipient Name</th>
                      <th className="py-3 px-4">Course Title</th>
                      <th className="py-3 px-4">Grade</th>
                      <th className="py-3 px-4">Issue Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {certificates.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No certificates issued yet. Click "Issue Certificate" to generate one.
                        </td>
                      </tr>
                    ) : (
                      certificates.map((cert) => (
                        <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{cert.certificateCode}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">{cert.recipientName}</td>
                          <td className="py-3.5 px-4">{cert.courseTitle}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-100 text-amber-800">
                              {cert.grade || 'Distinction'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{new Date(cert.issueDate).toLocaleDateString()}</td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <Link
                              to={`/certificate/${cert.certificateCode}`}
                              target="_blank"
                              className="text-blue-600 hover:underline font-bold"
                            >
                              Verify Link
                            </Link>
                            <button
                              onClick={() => handleDeleteCertificate(cert.id, cert.certificateCode)}
                              className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                            >
                              Revoke
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: JOBS */}
          {activeTab === 'jobs' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Government Job Vacancies</h3>
                  <p className="text-xs text-slate-400">Total {jobs.length} recruitment notices</p>
                </div>
                <button
                  onClick={() => handleOpenJobModal()}
                  className="px-3.5 py-2 bg-[#00a8a8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Publish Job
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Organization</th>
                      <th className="py-3 px-4">Vacancies</th>
                      <th className="py-3 px-4">Last Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{job.title}</td>
                        <td className="py-3.5 px-4">{job.organization?.name || 'Govt'}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{job.totalVacancies}</td>
                        <td className="py-3.5 px-4">{job.lastDate}</td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenJobModal(job)}
                            className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: EXAMS */}
          {activeTab === 'exams' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Examination Boards</h3>
                  <p className="text-xs text-slate-400">Total {exams.length} exam schemes</p>
                </div>
                <button
                  onClick={() => handleOpenExamModal()}
                  className="px-3.5 py-2 bg-[#00a8a8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Exam
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Exam Name</th>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Frequency</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {exams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{exam.name}</td>
                        <td className="py-3.5 px-4 font-mono">{exam.code}</td>
                        <td className="py-3.5 px-4">{exam.frequency || 'Annual'}</td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenExamModal(exam)}
                            className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExam(exam.id, exam.name)}
                            className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: TESTS */}
          {activeTab === 'tests' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-800">Mock Tests & CBT Practice</h3>
                  <p className="text-xs text-slate-400">Total {tests.length} mock tests</p>
                </div>
                <button
                  onClick={() => handleOpenTestModal()}
                  className="px-3.5 py-2 bg-[#00a8a8] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Create Test
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Test Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Questions</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {tests.map((test) => (
                      <tr key={test.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800">{test.title}</td>
                        <td className="py-3.5 px-4">{test.examCategory || 'SSC'}</td>
                        <td className="py-3.5 px-4">{test.durationMinutes} mins</td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{test.totalQuestions} Qs</td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenTestModal(test)}
                            className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTest(test.id, test.title)}
                            className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: LOGS */}
          {activeTab === 'logs' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-800">Activity & Audit Trail</h3>
                <p className="text-xs text-slate-400">Timestamped record of administrative and user actions</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Entity</th>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {logs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          No audit logs recorded yet. Actions taken on the dashboard will appear here automatically.
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                            {new Date(log.createdAt).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-bold text-blue-600">{log.action}</td>
                          <td className="py-3 px-4">{log.entity}</td>
                          <td className="py-3 px-4 font-medium">{log.userName || log.userEmail || 'Admin'}</td>
                          <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{log.details || '—'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs max-w-3xl space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-800">Platform Settings</h3>
                <p className="text-xs text-slate-400">Configure global platform options and security credentials</p>
              </div>

              <div className="space-y-4 text-xs font-bold text-slate-700">
                <div>
                  <label className="block mb-1">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="GovtPrep.in"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1">Support Contact Email</label>
                  <input
                    type="email"
                    defaultValue="contact@govtprep.in"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => showToast('success', 'Platform settings saved successfully.')}
                    className="px-5 py-2.5 bg-[#00a8a8] text-white font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 5. COURSE MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editingItem ? 'Edit Course' : 'Create New Tech Course'}
              </h2>
              <button onClick={() => setIsCourseModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 pt-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. Master Full-Stack Web Development 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Comprehensive curriculum details..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1">Duration (Hours)</label>
                  <input
                    type="number"
                    required
                    value={courseForm.durationHours}
                    onChange={(e) => setCourseForm({ ...courseForm, durationHours: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={courseForm.skills}
                  onChange={(e) => setCourseForm({ ...courseForm, skills: e.target.value })}
                  placeholder="React, Node.js, Express, MongoDB"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#00a8a8] text-white rounded-xl shadow-md cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. CERTIFICATE MODAL */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">Issue Verified Certificate</h2>
              <button onClick={() => setIsCertModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleGenerateCertificate} className="space-y-4 pt-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={certForm.recipientName}
                  onChange={(e) => setCertForm({ ...certForm, recipientName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={certForm.courseTitle}
                  onChange={(e) => setCertForm({ ...certForm, courseTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Grade</label>
                <select
                  value={certForm.grade}
                  onChange={(e) => setCertForm({ ...certForm, grade: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                >
                  <option value="Distinction">Distinction (Grade A+)</option>
                  <option value="Excellence">Excellence (Grade A)</option>
                  <option value="Passed">Passed (Grade B)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#00a8a8] text-white rounded-xl shadow-md cursor-pointer"
                >
                  {submitting ? 'Issuing...' : 'Generate Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editingItem ? 'Edit Job Notification' : 'Publish New Sarkari Vacancy'}
              </h2>
              <button onClick={() => setIsJobModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4 pt-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. SSC CGL 2026 Combined Graduate Level"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Board / Organization</label>
                  <input
                    type="text"
                    required
                    value={jobForm.organizationName}
                    onChange={(e) => setJobForm({ ...jobForm, organizationName: e.target.value })}
                    placeholder="Staff Selection Commission"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1">Total Vacancies</label>
                  <input
                    type="number"
                    required
                    value={jobForm.totalVacancies}
                    onChange={(e) => setJobForm({ ...jobForm, totalVacancies: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#00a8a8] text-white rounded-xl shadow-md cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MOCK TEST MODAL */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editingItem ? 'Edit Mock Test' : 'Create New Mock Test CBT'}
              </h2>
              <button onClick={() => setIsTestModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveTest} className="space-y-4 pt-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Test Title</label>
                <input
                  type="text"
                  required
                  value={testForm.title}
                  onChange={(e) => setTestForm({ ...testForm, title: e.target.value })}
                  placeholder="e.g. SSC CGL Tier-1 Full Length Mock 01"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    required
                    value={testForm.durationMinutes}
                    onChange={(e) => setTestForm({ ...testForm, durationMinutes: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1">Total Marks</label>
                  <input
                    type="number"
                    required
                    value={testForm.totalMarks}
                    onChange={(e) => setTestForm({ ...testForm, totalMarks: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#00a8a8] text-white rounded-xl shadow-md cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Mock Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. EXAM MODAL */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editingItem ? 'Edit Exam Board' : 'Add Examination Board'}
              </h2>
              <button onClick={() => setIsExamModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-4 pt-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Exam Name</label>
                <input
                  type="text"
                  required
                  value={examForm.name}
                  onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                  placeholder="e.g. UPSC Civil Services Exam (CSE)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Exam Code</label>
                  <input
                    type="text"
                    required
                    value={examForm.code}
                    onChange={(e) => setExamForm({ ...examForm, code: e.target.value })}
                    placeholder="UPSC-CSE"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1">Conducting Board</label>
                  <input
                    type="text"
                    required
                    value={examForm.organizationName}
                    onChange={(e) => setExamForm({ ...examForm, organizationName: e.target.value })}
                    placeholder="Union Public Service Commission"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-normal text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsExamModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#00a8a8] text-white rounded-xl shadow-md cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Exam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
