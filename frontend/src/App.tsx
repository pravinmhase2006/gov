import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout & Global Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import LiveTicker from '@/components/layout/LiveTicker';
import AspirantAIAssistant from '@/components/common/AspirantAIAssistant';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import PageLoader from '@/components/common/PageLoader';
import ProtectedRoute from '@/components/common/ProtectedRoute';

// Code-Split Lazy Loaded Pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const JobsPage = lazy(() => import('@/pages/JobsPage'));
const JobDetailPage = lazy(() => import('@/pages/JobDetailPage'));
const ExamsPage = lazy(() => import('@/pages/ExamsPage'));
const ExamDetailPage = lazy(() => import('@/pages/ExamDetailPage'));
const ResultsPage = lazy(() => import('@/pages/ResultsPage'));
const AdmitCardsPage = lazy(() => import('@/pages/AdmitCardsPage'));
const AnswerKeysPage = lazy(() => import('@/pages/AnswerKeysPage'));
const MockTestsPage = lazy(() => import('@/pages/MockTestsPage'));
const MockTestRunPage = lazy(() => import('@/pages/MockTestRunPage'));
const TechJobsPage = lazy(() => import('@/pages/TechJobsPage'));
const TechCoursesPage = lazy(() => import('@/pages/TechCoursesPage'));
const InternshipsPage = lazy(() => import('@/pages/InternshipsPage'));
const CurrentAffairsPage = lazy(() => import('@/pages/CurrentAffairsPage'));
const SyllabusPage = lazy(() => import('@/pages/SyllabusPage'));
const PreviousPapersPage = lazy(() => import('@/pages/PreviousPapersPage'));
const StudyMaterialPage = lazy(() => import('@/pages/StudyMaterialPage'));

// Interactive Tool Pages
const ResumeBuilderPage = lazy(() => import('@/pages/ResumeBuilderPage'));
const PhotoResizerPage = lazy(() => import('@/pages/PhotoResizerPage'));
const QuizBattlePage = lazy(() => import('@/pages/QuizBattlePage'));
const TypingTestPage = lazy(() => import('@/pages/TypingTestPage'));
const StudyPlannerPage = lazy(() => import('@/pages/StudyPlannerPage'));
const VocabBuilderPage = lazy(() => import('@/pages/VocabBuilderPage'));
const FlashcardsPage = lazy(() => import('@/pages/FlashcardsPage'));
const CutoffPredictorPage = lazy(() => import('@/pages/CutoffPredictorPage'));
const DocumentVaultPage = lazy(() => import('@/pages/DocumentVaultPage'));
const CareerComparePage = lazy(() => import('@/pages/CareerComparePage'));
const EligibilityCalculatorPage = lazy(() => import('@/pages/EligibilityCalculatorPage'));
const ExamCenterFinderPage = lazy(() => import('@/pages/ExamCenterFinderPage'));
const LeaderboardPage = lazy(() => import('@/pages/LeaderboardPage'));

// Auth, User & Info Pages
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const DisclaimerPage = lazy(() => import('@/pages/DisclaimerPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Automatic Scroll to Top & Title Management
function RouteTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Dynamic Title Management
    const pageTitles: Record<string, string> = {
      '/': 'GovtPrep India | Sarkari Result, Jobs, Mock Tests & Tech Careers',
      '/jobs': 'Latest Govt Jobs & Vacancy Notifications | GovtPrep India',
      '/exams': 'Competitive Exams Syllabus & Pattern | GovtPrep India',
      '/results': 'Sarkari Results & Selection Lists | GovtPrep India',
      '/admit-cards': 'Admit Cards & Hall Tickets Download | GovtPrep India',
      '/answer-keys': 'Official Exam Answer Keys & Objections | GovtPrep India',
      '/mock-tests': 'Free All-India Live Mock Test CBT | GovtPrep India',
      '/tech-jobs': 'Tech & Software Careers in Bharat | GovtPrep India',
      '/tech-courses': 'Tech Skill Courses & Certifications | GovtPrep India',
      '/internships': 'Govt & Tech Stipend Internships | GovtPrep India',
      '/current-affairs': 'Daily Current Affairs & Static GK | GovtPrep India',
      '/syllabus': 'Exam Syllabus & Pattern Guides | GovtPrep India',
      '/previous-papers': 'Previous Year Question Papers (PYQ) | GovtPrep India',
      '/study-material': 'Free Notes & Formulas Handbooks | GovtPrep India',
      '/resume-builder': 'Online Govt & Tech Resume Builder | GovtPrep India',
      '/photo-resizer': 'Photo & Signature Resizer for Govt Forms | GovtPrep India',
      '/quiz-battle': '1v1 Live Quiz Battle Arena | GovtPrep India',
      '/typing-test': 'Typing Speed & Accuracy Test | GovtPrep India',
      '/study-planner': 'AI Smart Study Planner | GovtPrep India',
      '/vocab-builder': 'Daily Vocabulary Booster | GovtPrep India',
      '/flashcards': 'Spaced Repetition Flashcards | GovtPrep India',
      '/cutoff-predictor': 'Expected Cutoff Marks Predictor | GovtPrep India',
      '/document-vault': 'Secure Document Vault | GovtPrep India',
      '/compare': 'Government vs Private Career Comparator | GovtPrep India',
      '/eligibility-calculator': 'Age & Qualification Eligibility Calculator | GovtPrep India',
      '/leaderboard': 'All India Aspirants Leaderboard | GovtPrep India',
      '/login': 'Sign In to Account | GovtPrep India',
      '/register': 'Create Aspirant Account | GovtPrep India',
      '/dashboard': 'Candidate Dashboard | GovtPrep India',
      '/admin': 'Admin Control Panel | GovtPrep India',
      '/search': 'Search Jobs, Exams & Resources | GovtPrep India',
      '/about': 'About Us | GovtPrep India',
      '/contact': 'Contact Support | GovtPrep India',
      '/disclaimer': 'Disclaimer & Policy | GovtPrep India',
    };

    document.title = pageTitles[pathname] || 'GovtPrep India - India’s Premier Exam Prep Portal';
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <RouteTracker />

        {/* Top Notification Updates Marquee */}
        <LiveTicker />

        {/* Main Header Navigation Bar */}
        <Navbar />

        {/* Main Routed Area with Suspense Lazy Loading */}
        <main className="flex-1 pb-16 md:pb-0">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Core Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:slug" element={<JobDetailPage />} />
              <Route path="/exams" element={<ExamsPage />} />
              <Route path="/exams/:slug" element={<ExamDetailPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/results/:slug" element={<ResultsPage />} />
              <Route path="/admit-cards" element={<AdmitCardsPage />} />
              <Route path="/admit-cards/:slug" element={<AdmitCardsPage />} />
              <Route path="/answer-keys" element={<AnswerKeysPage />} />
              <Route path="/answer-keys/:slug" element={<AnswerKeysPage />} />

              {/* Mock Tests & CBT Exam Engine */}
              <Route path="/mock-tests" element={<MockTestsPage />} />
              <Route path="/mock-tests/:slug" element={<MockTestRunPage />} />

              {/* Tech Careers & Internships */}
              <Route path="/tech-jobs" element={<TechJobsPage />} />
              <Route path="/tech-jobs/:slug" element={<TechJobsPage />} />
              <Route path="/tech-courses" element={<TechCoursesPage />} />
              <Route path="/tech-courses/:slug" element={<TechCoursesPage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/internships/:slug" element={<InternshipsPage />} />

              {/* Study & Prep Material */}
              <Route path="/current-affairs" element={<CurrentAffairsPage />} />
              <Route path="/current-affairs/:slug" element={<CurrentAffairsPage />} />
              <Route path="/syllabus" element={<SyllabusPage />} />
              <Route path="/syllabus/:slug" element={<SyllabusPage />} />
              <Route path="/previous-papers" element={<PreviousPapersPage />} />
              <Route path="/study-material" element={<StudyMaterialPage />} />
              <Route path="/study-material/:slug" element={<StudyMaterialPage />} />

              {/* Smart Aspirant Utilities */}
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/photo-resizer" element={<PhotoResizerPage />} />
              <Route path="/quiz-battle" element={<QuizBattlePage />} />
              <Route path="/typing-test" element={<TypingTestPage />} />
              <Route path="/study-planner" element={<StudyPlannerPage />} />
              <Route path="/vocab-builder" element={<VocabBuilderPage />} />
              <Route path="/flashcards" element={<FlashcardsPage />} />
              <Route path="/cutoff-predictor" element={<CutoffPredictorPage />} />
              <Route path="/document-vault" element={<DocumentVaultPage />} />
              <Route path="/compare" element={<CareerComparePage />} />
              <Route path="/eligibility-calculator" element={<EligibilityCalculatorPage />} />
              <Route path="/qualification/:slug" element={<EligibilityCalculatorPage />} />
              <Route path="/exam-centers" element={<ExamCenterFinderPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />

              {/* Authentication & User Accounts */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />


              {/* Information & Legal */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        {/* Floating AI Exam Preparation Assistant */}
        <AspirantAIAssistant />

        {/* Primary Footer */}
        <Footer />

        {/* Mobile Sticky Quick Navigation */}
        <MobileBottomNav />
      </div>
    </ErrorBoundary>
  );
}
