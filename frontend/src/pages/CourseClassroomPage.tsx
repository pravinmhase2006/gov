import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dataService } from '@/services/dataService';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  PlayCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code2,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Share2,
  Clock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Lock,
} from 'lucide-react';
import Link from '@/components/common/Link';
import DataBoundary from '@/components/common/DataBoundary';
import { CourseLesson, CourseModule, TechCourseData } from '@/types';

export default function CourseClassroomPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<TechCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active Lesson State
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'code' | 'quiz'>('video');

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Code Copy State
  const [copiedCode, setCopiedCode] = useState(false);

  // Certificate Modal State
  const [showCertModal, setShowCertModal] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [claimingCert, setClaimingCert] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);

  // Local user ID & Progress tracking
  const [userId] = useState(() => {
    let saved = localStorage.getItem('govtprep_user_id');
    if (!saved) {
      saved = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem('govtprep_user_id', saved);
    }
    return saved;
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`course_progress_${slug}`);
    return saved ? JSON.parse(saved) : [];
  });

  const loadCourse = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getCourseBySlug(slug, userId);
      if (!data) throw new Error('Course not found');
      setCourse(data);

      if (data.enrollment && Array.isArray(data.enrollment.completedLessonIds)) {
        setCompletedLessonIds(data.enrollment.completedLessonIds);
      }

      // Auto-enroll if not enrolled yet
      if (!data.enrollment && data.id) {
        dataService.enrollCourse(data.id, userId).catch(() => {});
      }
    } catch (err: any) {
      console.error('Error loading course:', err);
      setError(err?.message || 'Failed to load course contents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  // Save progress locally as fallback
  useEffect(() => {
    if (slug) {
      localStorage.setItem(`course_progress_${slug}`, JSON.stringify(completedLessonIds));
    }
  }, [completedLessonIds, slug]);

  // Flatten all lessons for linear navigation
  const allLessons = useMemo(() => {
    if (!course || !course.modules) return [];
    const flat: { moduleIndex: number; lessonIndex: number; lesson: CourseLesson }[] = [];
    course.modules.forEach((mod, mIdx) => {
      if (mod.lessons) {
        mod.lessons.forEach((les, lIdx) => {
          flat.push({ moduleIndex: mIdx, lessonIndex: lIdx, lesson: les });
        });
      }
    });
    return flat;
  }, [course]);

  const currentLessonData = useMemo(() => {
    if (!course?.modules?.[activeModuleIndex]?.lessons?.[activeLessonIndex]) {
      return allLessons[0]?.lesson || null;
    }
    return course.modules[activeModuleIndex].lessons[activeLessonIndex];
  }, [course, activeModuleIndex, activeLessonIndex, allLessons]);

  const currentFlatIndex = useMemo(() => {
    return allLessons.findIndex(
      (item) => item.moduleIndex === activeModuleIndex && item.lessonIndex === activeLessonIndex
    );
  }, [allLessons, activeModuleIndex, activeLessonIndex]);

  const totalLessonsCount = allLessons.length || 1;
  const progressPercent = Math.min(
    100,
    Math.round((completedLessonIds.length / totalLessonsCount) * 100)
  );
  const isFullyCompleted = progressPercent >= 100;

  // Toggle lesson complete
  const toggleLessonComplete = async (lessonId: string) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    const updated = isCompleted
      ? completedLessonIds.filter((id) => id !== lessonId)
      : [...completedLessonIds, lessonId];

    setCompletedLessonIds(updated);

    if (course?.id) {
      try {
        await dataService.updateCourseProgress(course.id, userId, lessonId, !isCompleted, recipientName);
      } catch (err) {
        console.error('Failed to sync progress to server:', err);
      }
    }
  };

  // Move to next lesson
  const handleNextLesson = async () => {
    if (currentLessonData && !completedLessonIds.includes(currentLessonData.id)) {
      await toggleLessonComplete(currentLessonData.id);
    }

    if (currentFlatIndex < allLessons.length - 1) {
      const next = allLessons[currentFlatIndex + 1];
      setActiveModuleIndex(next.moduleIndex);
      setActiveLessonIndex(next.lessonIndex);
      setSelectedAnswers({});
      setQuizSubmitted({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (progressPercent >= 100 || completedLessonIds.length >= allLessons.length - 1) {
      setShowCertModal(true);
    }
  };

  // Move to previous lesson
  const handlePrevLesson = () => {
    if (currentFlatIndex > 0) {
      const prev = allLessons[currentFlatIndex - 1];
      setActiveModuleIndex(prev.moduleIndex);
      setActiveLessonIndex(prev.lessonIndex);
      setSelectedAnswers({});
      setQuizSubmitted({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Copy code snippet
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Handle Certificate Claim
  const handleClaimCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course?.id) return;
    if (!recipientName.trim()) {
      setCertError('Please enter your full name for the certificate.');
      return;
    }

    setClaimingCert(true);
    setCertError(null);
    try {
      const res = await dataService.claimCourseCertificate(
        course.id,
        userId,
        recipientName.trim(),
        recipientEmail.trim() || undefined
      );

      if (res && res.certificateCode) {
        setShowCertModal(false);
        navigate(`/certificates/${res.certificateCode}`);
      } else {
        throw new Error('Could not issue certificate. Please make sure all lessons are completed.');
      }
    } catch (err: any) {
      console.error('Error claiming certificate:', err);
      setCertError(err?.message || 'Failed to generate certificate.');
    } finally {
      setClaimingCert(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <DataBoundary loading={loading} error={error} onRetry={loadCourse}>
        {course && currentLessonData && (
          <div className="flex-1 flex flex-col">
            
            {/* Top Navigation Bar */}
            <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30">
              <div className="flex items-center gap-3 min-w-0">
                <Link
                  href="/tech-courses"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-purple-400 font-bold">
                    <span>{course.category}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                  <h1 className="text-sm sm:text-base font-bold text-white truncate">
                    {course.title}
                  </h1>
                </div>
              </div>

              {/* Progress & Certificate Button */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                  <div className="w-20 bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="font-bold text-emerald-400">{progressPercent}%</span>
                </div>

                {isFullyCompleted ? (
                  <button
                    onClick={() => setShowCertModal(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow-md animate-pulse"
                  >
                    <Award className="w-4 h-4 fill-current" />
                    <span>Get Certificate</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowCertModal(true)}
                    title="Complete 100% of lessons to unlock certificate"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-700 opacity-80"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Certificate ({progressPercent}%)</span>
                  </button>
                )}
              </div>
            </header>

            {/* Main Learning Workspace */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              
              {/* Left Column: Lesson Player & Content Tabs (8 cols) */}
              <div className="lg:col-span-8 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-5xl mx-auto w-full">
                
                {/* 1. Video Player Container */}
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800">
                  {currentLessonData.videoUrl ? (
                    <iframe
                      src={currentLessonData.videoUrl}
                      title={currentLessonData.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-slate-900 to-purple-950 p-6 text-center">
                      <PlayCircle className="w-16 h-16 text-purple-400 animate-pulse" />
                      <h3 className="text-lg font-bold text-white">Interactive Reading & Code Exercise</h3>
                      <p className="text-xs text-slate-400 max-w-md">
                        Review the lesson notes and code examples below to complete this module.
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Lesson Title & Action Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                      <span>Module {activeModuleIndex + 1}</span>
                      <span>•</span>
                      <span>Lesson {activeLessonIndex + 1} of {allLessons.length}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" /> {currentLessonData.duration}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {currentLessonData.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleLessonComplete(currentLessonData.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      completedLessonIds.includes(currentLessonData.id)
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 shadow-sm'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedLessonIds.includes(currentLessonData.id)
                        ? 'Completed'
                        : 'Mark as Completed'}
                    </span>
                  </button>
                </div>

                {/* 3. Content Tabs: Video / Notes / Code / Quiz */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
                    {[
                      { key: 'video', label: 'Overview & Notes', icon: FileText },
                      { key: 'code', label: 'Code Snippets', icon: Code2 },
                      {
                        key: 'quiz',
                        label: `Knowledge Check (${currentLessonData.quiz?.length || 0})`,
                        icon: HelpCircle,
                      },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isSelected = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as any)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab 1: Overview & Notes */}
                  {activeTab === 'video' && (
                    <div className="space-y-4 text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-5 sm:p-6 rounded-2xl border border-slate-800">
                      {currentLessonData.summary && (
                        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-200 text-xs font-medium">
                          💡 <strong>Key Takeaway:</strong> {currentLessonData.summary}
                        </div>
                      )}
                      <div className="whitespace-pre-line font-normal text-slate-300">
                        {currentLessonData.content || (
                          <p>
                            In this lesson, you will master essential engineering concepts, design patterns, and standard practices used in top software firms.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Code Snippets */}
                  {activeTab === 'code' && (
                    <div className="space-y-3">
                      {currentLessonData.codeSnippet ? (
                        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
                            <span>Code Example</span>
                            <button
                              onClick={() => handleCopyCode(currentLessonData.codeSnippet || '')}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                            >
                              {copiedCode ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Code</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-4 text-xs sm:text-sm font-mono text-purple-200 overflow-x-auto leading-relaxed">
                            <code>{currentLessonData.codeSnippet}</code>
                          </pre>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-500 text-xs bg-slate-950/40 rounded-2xl border border-slate-800">
                          No custom code playground snippet for this conceptual lesson.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 3: Knowledge Check Quiz */}
                  {activeTab === 'quiz' && (
                    <div className="space-y-6">
                      {currentLessonData.quiz && currentLessonData.quiz.length > 0 ? (
                        currentLessonData.quiz.map((q, qIdx) => {
                          const isSubmitted = quizSubmitted[q.id];
                          const selected = selectedAnswers[q.id];
                          const isCorrect = selected === q.answer;

                          return (
                            <div
                              key={q.id}
                              className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4"
                            >
                              <div className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-purple-900/60 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                  {qIdx + 1}
                                </span>
                                <h4 className="font-bold text-sm sm:text-base text-white">
                                  {q.question}
                                </h4>
                              </div>

                              <div className="space-y-2 pl-9">
                                {q.options.map((opt, optIdx) => {
                                  let optionStyle =
                                    'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800/80';
                                  if (selected === optIdx) {
                                    optionStyle =
                                      'bg-purple-950 text-purple-200 border-purple-600 ring-2 ring-purple-500/30';
                                  }
                                  if (isSubmitted) {
                                    if (optIdx === q.answer) {
                                      optionStyle =
                                        'bg-emerald-950 text-emerald-200 border-emerald-600 font-bold';
                                    } else if (selected === optIdx && !isCorrect) {
                                      optionStyle =
                                        'bg-rose-950 text-rose-200 border-rose-600 font-bold';
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      disabled={isSubmitted}
                                      onClick={() => {
                                        setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                                        setQuizSubmitted((prev) => ({ ...prev, [q.id]: true }));
                                      }}
                                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${optionStyle}`}
                                    >
                                      <span>{opt}</span>
                                      {isSubmitted && optIdx === q.answer && (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {isSubmitted && (
                                <div
                                  className={`p-3.5 rounded-xl text-xs space-y-1 ${
                                    isCorrect
                                      ? 'bg-emerald-950/60 border border-emerald-800/50 text-emerald-300'
                                      : 'bg-rose-950/60 border border-rose-800/50 text-rose-300'
                                  }`}
                                >
                                  <div className="font-bold">
                                    {isCorrect ? '✅ Correct Answer!' : '❌ Incorrect'}
                                  </div>
                                  {q.explanation && (
                                    <p className="text-slate-300">{q.explanation}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-slate-500 text-xs bg-slate-950/40 rounded-2xl border border-slate-800">
                          No quiz questions required for this lesson.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 4. Bottom Navigation Buttons */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4 mt-auto">
                  <button
                    onClick={handlePrevLesson}
                    disabled={currentFlatIndex === 0}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      currentFlatIndex === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Lesson</span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>
                      {currentFlatIndex === allLessons.length - 1
                        ? 'Finish Course & Get Certificate'
                        : 'Next Lesson'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Column: Course Curriculum Sidebar (4 cols) */}
              <div className="lg:col-span-4 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 sm:p-6 overflow-y-auto space-y-6">
                
                {/* Course Progress Summary */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Course Progress</span>
                    <span className="text-sm font-black text-purple-400">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{completedLessonIds.length} of {allLessons.length} completed</span>
                    {isFullyCompleted && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </div>
                </div>

                {/* Modules & Lessons Tree */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Curriculum Content
                  </h3>

                  <div className="space-y-3">
                    {course.modules?.map((module, mIdx) => (
                      <div
                        key={module.id || mIdx}
                        className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden"
                      >
                        <div className="p-3.5 bg-slate-900 border-b border-slate-800/80">
                          <h4 className="text-xs font-bold text-slate-200 line-clamp-1">
                            {module.title}
                          </h4>
                          {module.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {module.description}
                            </p>
                          )}
                        </div>

                        <div className="p-2 space-y-1">
                          {module.lessons?.map((lesson, lIdx) => {
                            const isCurrent =
                              mIdx === activeModuleIndex && lIdx === activeLessonIndex;
                            const isDone = completedLessonIds.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id || lIdx}
                                onClick={() => {
                                  setActiveModuleIndex(mIdx);
                                  setActiveLessonIndex(lIdx);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-colors ${
                                  isCurrent
                                    ? 'bg-purple-950 text-purple-200 font-bold border border-purple-800'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                                  )}
                                  <span className="truncate">{lesson.title}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 shrink-0">
                                  {lesson.duration}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificate Banner in Sidebar */}
                <div className="bg-gradient-to-br from-amber-950/40 via-purple-950/40 to-slate-900 p-4 rounded-2xl border border-amber-800/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-amber-300">
                        Official IT Certificate
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Verifiable with unique credential code
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCertModal(true)}
                    disabled={!isFullyCompleted}
                    className={`w-full py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      isFullyCompleted
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md animate-pulse'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>{isFullyCompleted ? 'Claim Your Certificate' : `Locked (${progressPercent}%)`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Certificate Claim Modal */}
            {showCertModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto shadow-md">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-white">
                      Congratulations, Graduate! 🎉
                    </h3>
                    <p className="text-xs text-slate-400">
                      You have successfully completed <strong>{course.title}</strong>. Enter your full name exactly as it should appear on your verified credential.
                    </p>
                  </div>

                  <form onSubmit={handleClaimCertificate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Your Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Pravin Mhase"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Email Address (Optional for verification)
                      </label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="e.g. aspirant@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    {certError && (
                      <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{certError}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCertModal(false)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={claimingCert}
                        className="flex-1 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        {claimingCert ? (
                          <span>Generating...</span>
                        ) : (
                          <>
                            <Award className="w-4 h-4" />
                            <span>Issue Certificate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}
      </DataBoundary>
    </div>
  );
}
