import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/lib/navigation';
import {
  Clock,
  Globe,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  Send,
  HelpCircle,
  Award
} from 'lucide-react';
import TestResultView from './TestResultView';
import { MockTestDetail, TestResultReport } from '@/types';

interface MockTestEngineProps {
  test: MockTestDetail;
  userId?: string;
}

export default function MockTestEngine({ test, userId }: MockTestEngineProps) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  
  // State for user answers: key = questionId -> { chosenAnswer, status: 'ANSWERED' | 'REVIEW' | 'SKIPPED' }
  const [userAnswers, setUserAnswers] = useState<
    Record<string, { chosenAnswer: string | null; status: 'ANSWERED' | 'REVIEW' | 'SKIPPED' }>
  >({});

  // Timer in seconds
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [resultReport, setResultReport] = useState<TestResultReport | null>(null);

  const questions = test.questions.map((q) => q.question);
  const currentQ = questions[currentIdx];

  // Timer interval
  useEffect(() => {
    if (resultReport) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resultReport]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionKey: string) => {
    const qId = currentQ.id;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: {
        chosenAnswer: optionKey,
        status: prev[qId]?.status === 'REVIEW' ? 'REVIEW' : 'ANSWERED',
      },
    }));
  };

  const handleClearResponse = () => {
    const qId = currentQ.id;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleSaveAndNext = () => {
    const qId = currentQ.id;
    const existing = userAnswers[qId];
    if (existing?.chosenAnswer) {
      setUserAnswers((prev) => ({
        ...prev,
        [qId]: { chosenAnswer: existing.chosenAnswer, status: 'ANSWERED' },
      }));
    }
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    const qId = currentQ.id;
    const existing = userAnswers[qId];
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: {
        chosenAnswer: existing?.chosenAnswer || null,
        status: 'REVIEW',
      },
    }));
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleSubmitTest = async () => {
    try {
      setIsSubmitting(true);
      setShowSubmitModal(false);

      const timeTakenSeconds = test.durationMinutes * 60 - timeLeft;

      const res = await fetch(`/api/mock-tests/${test.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: userAnswers,
          timeTakenSeconds,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResultReport(data.report);
      } else {
        // Fallback local evaluation if offline/demo
        evaluateLocally(timeTakenSeconds);
      }
    } catch (err) {
      console.error(err);
      evaluateLocally(test.durationMinutes * 60 - timeLeft);
    } finally {
      setIsSubmitting(false);
    }
  };

  const evaluateLocally = (timeTakenSeconds: number) => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const answerReports = questions.map((q) => {
      const ans = userAnswers[q.id]?.chosenAnswer;
      const isCorrect = ans === q.correctAnswer;

      if (!ans) {
        skippedCount++;
      } else if (isCorrect) {
        correctCount++;
        score += q.marks || 2.0;
      } else {
        incorrectCount++;
        score -= q.negativeMarks || 0.5;
      }

      const marksObtained = isCorrect ? (q.marks || 2.0) : (!ans ? 0 : -(q.negativeMarks || 0.5));

      return {
        id: q.id,
        questionId: q.id,
        questionText: q.questionText,
        questionTextHi: q.questionTextHi,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        userAnswer: ans || null,
        correctAnswer: q.correctAnswer || 'A',
        isCorrect,
        explanation: q.explanation,
        marksObtained,
      };
    });

    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 2.0), 0);
    const percentage = Math.max(0, Math.round((score / totalMarks) * 1000) / 10);
    const accuracy =
      correctCount + incorrectCount > 0
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 1000) / 10
        : 0;

    setResultReport({
      score: Math.max(0, Math.round(score * 100) / 100),
      totalMarks,
      percentage,
      correctCount,
      incorrectCount,
      skippedCount,
      accuracy,
      timeTakenSeconds,
      answers: answerReports,
    });
  };

  if (resultReport) {
    return (
      <TestResultView
        report={resultReport}
        testTitle={test.title}
        onRetake={() => window.location.reload()}
      />
    );
  }

  // Count states for question palette
  let answeredCount = 0;
  let reviewCount = 0;
  let notAnsweredCount = 0;

  questions.forEach((q) => {
    const a = userAnswers[q.id];
    if (a?.status === 'ANSWERED' && a.chosenAnswer) answeredCount++;
    else if (a?.status === 'REVIEW') reviewCount++;
    else notAnsweredCount++;
  });

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col font-sans select-none">
      {/* Test Top Navigation Header */}
      <header className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 truncate">
            <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded">
              {test.exam.category}
            </span>
            <h1 className="text-sm sm:text-base font-bold truncate text-slate-100">
              {test.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Bilingual Toggle */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                  language === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('HI')}
                className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                  language === 'HI' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Countdown Timer */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold border shadow-inner ${
                timeLeft < 300
                  ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse'
                  : 'bg-slate-800 text-emerald-400 border-slate-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            {/* Direct Submit button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-xl shadow transition-all"
            >
              Submit Test
            </button>
          </div>
        </div>
      </header>

      {/* Test Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Left Column: Question Area */}
        <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden min-h-[560px]">
          
          {/* Question Header Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-slate-900 text-sm font-bold">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +{currentQ.marks || 2.0} Marks
              </span>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                -{currentQ.negativeMarks || 0.5} Negative
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-500">
              <span>Section: General Knowledge & Math</span>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed mb-6">
                {language === 'HI' && currentQ.questionTextHi ? currentQ.questionTextHi : currentQ.questionText}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {[
                  {
                    key: 'A',
                    text: language === 'HI' && currentQ.optionAHi ? currentQ.optionAHi : currentQ.optionA,
                  },
                  {
                    key: 'B',
                    text: language === 'HI' && currentQ.optionBHi ? currentQ.optionBHi : currentQ.optionB,
                  },
                  {
                    key: 'C',
                    text: language === 'HI' && currentQ.optionCHi ? currentQ.optionCHi : currentQ.optionC,
                  },
                  {
                    key: 'D',
                    text: language === 'HI' && currentQ.optionDHi ? currentQ.optionDHi : currentQ.optionD,
                  },
                ].map((opt) => {
                  const isSelected = userAnswers[currentQ.id]?.chosenAnswer === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 text-blue-950 shadow-sm font-semibold'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 border border-slate-300'
                        }`}
                      >
                        {opt.key}
                      </div>
                      <span className="text-sm leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 mt-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearResponse}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Response
                </button>
                <button
                  onClick={handleMarkForReviewAndNext}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 flex items-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" /> Mark for Review & Next
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={handleSaveAndNext}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center gap-1 transition-colors"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Question Navigator Palette */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Question Palette
            </h3>

            {/* Status counts */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="flex items-center gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <span className="text-slate-600">Answered: <strong>{answeredCount}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg border border-purple-100">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                <span className="text-slate-600">Review: <strong>{reviewCount}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg border border-slate-200">
                <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                <span className="text-slate-600">Unanswered: <strong>{notAnsweredCount}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg border border-blue-100">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="text-slate-600">Total: <strong>{questions.length}</strong></span>
              </div>
            </div>

            {/* Question Grid Buttons */}
            <div className="grid grid-cols-5 gap-2 max-h-[340px] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCurrent = idx === currentIdx;
                let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';

                if (ans?.status === 'ANSWERED' && ans.chosenAnswer) {
                  bgClass = 'bg-emerald-600 text-white font-bold border-emerald-700';
                } else if (ans?.status === 'REVIEW') {
                  bgClass = 'bg-purple-600 text-white font-bold border-purple-700';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-xl text-xs font-semibold flex items-center justify-center border transition-all ${bgClass} ${
                      isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 scale-105 shadow-sm' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Final Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900">Confirm Test Submission</h3>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to finish the test? Once submitted, you cannot change your responses.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Questions:</span>
                <span className="font-bold text-slate-800">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Answered Questions:</span>
                <span className="font-bold text-emerald-600">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Marked for Review:</span>
                <span className="font-bold text-purple-600">{reviewCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unanswered Questions:</span>
                <span className="font-bold text-rose-600">{notAnsweredCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
              >
                Resume Test
              </button>
              <button
                onClick={handleSubmitTest}
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow"
              >
                {isSubmitting ? 'Evaluating...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
