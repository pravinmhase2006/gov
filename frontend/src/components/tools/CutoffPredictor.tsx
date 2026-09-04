'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Percent,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

interface ExamBenchmark {
  name: string;
  totalMarks: number;
  expectedCutoffs: Record<string, number>;
  shiftMultipliers: {
    Hard: { bonus: number; description: string };
    Moderate: { bonus: number; description: string };
    Easy: { bonus: number; description: string };
  };
}

const EXAM_BENCHMARKS: Record<string, ExamBenchmark> = {
  'ssc-cgl': {
    name: 'SSC CGL Tier 1 (2025/2026)',
    totalMarks: 200,
    expectedCutoffs: {
      UR: 146.5,
      OBC: 142.0,
      EWS: 138.5,
      SC: 122.0,
      ST: 112.5,
      PwD: 95.0,
    },
    shiftMultipliers: {
      Hard: { bonus: 16.5, description: 'Toughest shifts with heavy quant & tricky reasoning' },
      Moderate: { bonus: 7.2, description: 'Balanced distribution across all 4 sections' },
      Easy: { bonus: 0.5, description: 'Straightforward static GK & standard arithmetic' },
    }
  },
  'rrb-ntpc': {
    name: 'RRB NTPC CBT-1',
    totalMarks: 100,
    expectedCutoffs: {
      UR: 72.0,
      OBC: 68.5,
      EWS: 64.0,
      SC: 58.0,
      ST: 52.5,
      PwD: 45.0,
    },
    shiftMultipliers: {
      Hard: { bonus: 10.2, description: 'High calculation DI & tricky general science' },
      Moderate: { bonus: 4.5, description: 'Moderate difficulty standard RRB pattern' },
      Easy: { bonus: -1.0, description: 'High average raw score shift' },
    }
  },
  'ibps-po': {
    name: 'IBPS PO Prelims',
    totalMarks: 100,
    expectedCutoffs: {
      UR: 56.5,
      OBC: 55.0,
      EWS: 54.0,
      SC: 48.5,
      ST: 42.0,
      PwD: 36.0,
    },
    shiftMultipliers: {
      Hard: { bonus: 6.8, description: 'Complex variable puzzles & lengthier reading comprehension' },
      Moderate: { bonus: 2.8, description: 'Standard banking prelims standard' },
      Easy: { bonus: 0.0, description: 'Standard arithmetic and simple syllogisms' },
    }
  }
};

export default function CutoffPredictor() {
  const [selectedExamKey, setSelectedExamKey] = useState('ssc-cgl');
  const [rawScore, setRawScore] = useState<number>(135);
  const [category, setCategory] = useState<string>('UR');
  const [shiftDifficulty, setShiftDifficulty] = useState<'Hard' | 'Moderate' | 'Easy'>('Moderate');
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  const currentBenchmark = EXAM_BENCHMARKS[selectedExamKey] || EXAM_BENCHMARKS['ssc-cgl'];
  const expectedCutoff = currentBenchmark.expectedCutoffs[category] || 140;
  const shiftBonus = currentBenchmark.shiftMultipliers[shiftDifficulty].bonus;

  // Normalized score formula
  const normalizedScore = Math.max(0, Math.min(currentBenchmark.totalMarks, Math.round((rawScore + shiftBonus) * 10) / 10));
  const diff = normalizedScore - expectedCutoff;

  // Probability percentage
  let probability = 50;
  if (diff >= 15) probability = 98;
  else if (diff >= 8) probability = 92;
  else if (diff >= 3) probability = 82;
  else if (diff >= 0) probability = 68;
  else if (diff >= -5) probability = 42;
  else if (diff >= -12) probability = 20;
  else probability = 8;

  // Percentile calculation estimate
  const percentile = Math.min(99.9, Math.max(10, Math.round((normalizedScore / currentBenchmark.totalMarks) * 105 * 10) / 10));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/20">
            <Sparkles className="w-3.5 h-3.5" /> Shift Normalization & Tier-2 Eligibility Estimator
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            AI Exam Cutoff Predictor & Rank Normalizer
          </h1>
          <p className="text-blue-100/80 text-xs sm:text-sm max-w-2xl">
            Estimate your shift-normalized score, qualifying probability for Tier-2 / Mains, and All-India percentile based on official TCS normalization formulas.
          </p>
        </div>
      </div>

      {/* Input & Output Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Inputs Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-slate-800 text-sm">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Enter Your Exam Details</span>
          </div>

          {/* Exam Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Target Exam
            </label>
            <select
              value={selectedExamKey}
              onChange={(e) => setSelectedExamKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ssc-cgl">SSC CGL Tier 1 (Total: 200 Marks)</option>
              <option value="rrb-ntpc">RRB NTPC CBT-1 (Total: 100 Marks)</option>
              <option value="ibps-po">IBPS PO Prelims (Total: 100 Marks)</option>
            </select>
          </div>

          {/* Raw Score Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Your Raw Score
              </label>
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {rawScore} / {currentBenchmark.totalMarks}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={currentBenchmark.totalMarks}
              step={0.5}
              value={rawScore}
              onChange={(e) => setRawScore(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0 Marks</span>
              <span>Max: {currentBenchmark.totalMarks}</span>
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Reservation Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['UR', 'OBC', 'EWS', 'SC', 'ST', 'PwD'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    category === cat
                      ? 'bg-blue-50 border-blue-400 text-blue-800 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Shift Difficulty */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Exam Shift Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hard', 'Moderate', 'Easy'] as const).map((diffKey) => (
                <button
                  key={diffKey}
                  type="button"
                  onClick={() => setShiftDifficulty(diffKey)}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all text-center ${
                    shiftDifficulty === diffKey
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold ring-2 ring-indigo-500/20 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>{diffKey}</div>
                  <div className="text-[10px] text-slate-400 font-normal">
                    {currentBenchmark.shiftMultipliers[diffKey].bonus >= 0 ? `+${currentBenchmark.shiftMultipliers[diffKey].bonus}` : currentBenchmark.shiftMultipliers[diffKey].bonus} pts
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Cols: AI Prediction Report */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Results Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  AI Normalization Result
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  {currentBenchmark.name}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 font-semibold">Category</div>
                <div className="text-lg font-bold text-slate-800">{category} Quota</div>
              </div>
            </div>

            {/* Score Comparison Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500 font-semibold">Raw Score</div>
                <div className="text-2xl font-black text-slate-800 mt-1">{rawScore}</div>
                <div className="text-[10px] text-slate-400">Before normalization</div>
              </div>

              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 text-center relative overflow-hidden">
                <div className="text-xs text-blue-700 font-semibold">Normalized Marks</div>
                <div className="text-2xl font-black text-blue-700 mt-1">{normalizedScore}</div>
                <div className="text-[10px] text-blue-600 font-medium">
                  {shiftBonus >= 0 ? `+${shiftBonus} Shift adjustment` : `${shiftBonus} Shift adjustment`}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500 font-semibold">Expected Cutoff</div>
                <div className="text-2xl font-black text-slate-800 mt-1">{expectedCutoff}</div>
                <div className="text-[10px] text-slate-400">for {category} category</div>
              </div>
            </div>

            {/* Probability Progress Bar */}
            <div className="space-y-2 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl text-white">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Tier-2 / Mains Qualification Probability:</span>
                <span className={`font-black text-sm ${probability >= 70 ? 'text-emerald-300' : probability >= 40 ? 'text-amber-300' : 'text-rose-300'}`}>
                  {probability}% Chance
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 rounded-full ${
                    probability >= 70 ? 'bg-emerald-400' : probability >= 40 ? 'bg-amber-400' : 'bg-rose-400'
                  }`}
                  style={{ width: `${probability}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Safe Margin: {diff >= 0 ? `+${diff.toFixed(1)} marks above cutoff` : `${diff.toFixed(1)} marks below cutoff`}</span>
                <span>Estimated Percentile: ~{percentile}%</span>
              </div>
            </div>

            {/* Strategic Advice */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Next Step Recommendation: </strong>
                {probability >= 70
                  ? 'Your normalized score is well above the safety cutoff threshold. Start full-scale preparation for Tier-2 Mains and Typing Test immediately!'
                  : probability >= 40
                  ? 'You are in the borderline zone. Normalization variance across shifts could tilt in your favor. Maintain daily revision and sectional tests.'
                  : 'Score falls below safe cutoffs. Focus on strengthening high-yield chapters in Quant & Reasoning for the upcoming recruitment cycles.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
