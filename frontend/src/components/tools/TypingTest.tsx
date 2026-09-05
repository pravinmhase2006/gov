'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw, Award, CheckCircle, Clock, Zap, Printer, ShieldCheck } from 'lucide-react';

const SAMPLE_PASSAGES = [
  "The Union Public Service Commission and Staff Selection Commission conduct national recruitment examinations for Group A and Group B executive officers. Candidate performance depends on regular speed practice, conceptual clarity, and time management during computer based tests. Consistency is the key to qualifying government competitive examinations in India.",
  "Digital India initiative has transformed public governance and citizen service delivery across Central and State departments. High speed broadband connectivity, national digital identity, and automated e-challan systems enable transparent administration, rapid grievance redressal, and seamless direct benefit transfers to millions of rural beneficiaries.",
  "National Informatics Centre and Indian Space Research Organisation are pioneer institutions in advancing India's indigenous software infrastructure and satellite telemetry. Engineering graduates with strong programming fundamentals, data structures, and cybersecurity knowledge contribute significantly to national mission critical operations.",
];

import { dataService } from '@/services/dataService';

export default function TypingTest() {
  const [duration, setDuration] = useState<number>(60); // 60, 300, 900 seconds
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [passage, setPassage] = useState<string>(SAMPLE_PASSAGES[0]);
  const [passagesList, setPassagesList] = useState<string[]>(SAMPLE_PASSAGES);
  const [userInput, setUserInput] = useState<string>('');
  const [candidateName, setCandidateName] = useState<string>('Aspirant Candidate');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function loadDynamicPassages() {
      const dynamicPassages = await dataService.getTypingPassages();
      if (dynamicPassages && dynamicPassages.length > 0) {
        const textArray = dynamicPassages.map((p: any) => p.text);
        setPassagesList(textArray);
        setPassage(textArray[0]);
      }
    }
    loadDynamicPassages();
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setIsFinished(false);
    setUserInput('');
    setTimeLeft(duration);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsFinished(false);
    setUserInput('');
    setTimeLeft(duration);
  };

  // Calculations
  const totalCharsTyped = userInput.length;
  const timeElapsedMinutes = (duration - timeLeft) / 60 || 1 / 60;
  
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === passage[i]) correctChars++;
  }

  const grossWPM = Math.round((totalCharsTyped / 5) / timeElapsedMinutes) || 0;
  const netWPM = Math.round((correctChars / 5) / timeElapsedMinutes) || 0;
  const accuracy = totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 100;
  const isSscQualified = netWPM >= 35 && accuracy >= 95;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3 print:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-saffron-50 dark:bg-saffron-950/50 border border-saffron-200 dark:border-saffron-800 text-saffron-700 dark:text-saffron-400 text-xs font-bold rounded-full uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" /> DEST Typing Skill Test
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          SSC CGL / CHSL &amp; Railway Live Typing Test Simulator
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Practice standard 35 WPM / 2000 key depressions typing test with real-time accuracy scoring, mistake highlighting, and downloadable typing certificate.
        </p>

        {/* Duration Selectors & Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Test Duration:</span>
          {[
            { label: '1 Min (Quick)', sec: 60 },
            { label: '5 Mins (Speed Drill)', sec: 300 },
            { label: '15 Mins (SSC Exam Mode)', sec: 900 },
          ].map((item) => (
            <button
              key={item.sec}
              onClick={() => {
                setDuration(item.sec);
                setTimeLeft(item.sec);
                handleReset();
              }}
              disabled={isActive}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                duration === item.sec
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 print:hidden">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Time Left</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Net Speed</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">
            {netWPM} <span className="text-xs font-bold text-slate-400">WPM</span>
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Accuracy</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            {accuracy}%
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Key Depressions</span>
          <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
            {totalCharsTyped} <span className="text-xs font-bold text-slate-400">strokes</span>
          </span>
        </div>
      </div>

      {/* Typing Workspace */}
      {!isFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 print:hidden">
          
          {/* Reference Passage Display */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm sm:text-base leading-relaxed font-mono select-none text-slate-700 dark:text-slate-200">
            {passage.split('').map((char, index) => {
              let colorClass = 'text-slate-700 dark:text-slate-300';
              if (index < userInput.length) {
                colorClass = userInput[index] === char
                  ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 font-bold'
                  : 'text-rose-700 dark:text-rose-300 bg-rose-200 dark:bg-rose-950/60 font-bold';
              }
              return (
                <span key={index} className={colorClass}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Typing Textarea */}
          <div className="space-y-3">
            <textarea
              ref={inputRef}
              disabled={!isActive}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={isActive ? "Start typing the passage above..." : "Click 'Start Typing Test' below to begin..."}
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-sm sm:text-base font-mono text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-600 focus:outline-none transition-all disabled:opacity-50"
            />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {!isActive ? (
                  <button
                    onClick={handleStart}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-sm transition-all"
                  >
                    Start Typing Test
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsActive(false);
                      setIsFinished(true);
                    }}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Submit &amp; View Result
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors"
                  title="Reset test"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-slate-400 font-medium">
                Target: 35 WPM (SSC Tier-2 DEST Criteria)
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* Printable Typing Proficiency Certificate */
        <div className="space-y-6">
          <div className="flex items-center justify-end gap-3 print:hidden">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Typing Certificate</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border-4 border-double border-slate-300 dark:border-slate-700 rounded-3xl p-8 sm:p-12 shadow-md text-slate-900 dark:text-white space-y-6 print:m-0 print:border-2">
            <div className="text-center space-y-2 border-b-2 border-slate-200 dark:border-slate-800 pb-6">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                GovtPrep &amp; TechPrep India Examination Cell
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 dark:text-white">
                Typing Skill Proficiency Certificate
              </h2>
              <p className="text-xs text-slate-500 italic">
                (Standard Computer Based Examination Assessment)
              </p>
            </div>

            <div className="text-center space-y-2 py-4">
              <p className="text-xs text-slate-600 dark:text-slate-400">This is to certify that candidate</p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white border-b border-dashed border-slate-400 inline-block px-6 pb-1">
                {candidateName}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                has successfully appeared in the simulated English Data Entry Speed Test (DEST).
              </p>
            </div>

            {/* Performance Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                <span className="text-xs text-blue-700 dark:text-blue-300 font-bold block">Net Speed</span>
                <span className="text-3xl font-black text-blue-900 dark:text-blue-100 mt-1 block">{netWPM} WPM</span>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold block">Accuracy</span>
                <span className="text-3xl font-black text-emerald-900 dark:text-emerald-100 mt-1 block">{accuracy}%</span>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50">
                <span className="text-xs text-purple-700 dark:text-purple-300 font-bold block">Key Depressions</span>
                <span className="text-3xl font-black text-purple-900 dark:text-purple-100 mt-1 block">{totalCharsTyped}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block">SSC DEST Status</span>
                <span className={`text-xl font-black mt-2 block ${isSscQualified ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isSscQualified ? 'QUALIFIED ✓' : 'NOT QUALIFIED'}
                </span>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Certificate ID: TYP-{Date.now().toString().slice(-8)}</p>
                <p>Date of Evaluation: {new Date().toLocaleDateString('en-IN')}</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="border-b border-slate-500 w-36 mb-1"></div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Authorized Examiner</span>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
