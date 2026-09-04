'use client';

import React, { useState } from 'react';
import { Trophy, Medal, Award, Flame, Zap, CheckCircle, ArrowUpRight, Search } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  state: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  timeSpent: string;
  testName: string;
  streakDays: number;
  badges: string[];
}

const TOP_RANKERS: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Pooja Vishwakarma',
    avatar: '👩‍🎓',
    state: 'Uttar Pradesh (Varanasi)',
    score: 188.5,
    totalMarks: 200,
    accuracy: 97.4,
    timeSpent: '48m 12s',
    testName: 'SSC CGL Tier-1 Full Mock 2026',
    streakDays: 19,
    badges: ['AIR 1 🏆', '99.9%ile', '19-Day Streak 🔥'],
  },
  {
    rank: 2,
    name: 'Abhishek Kumar',
    avatar: '👨‍💻',
    state: 'Bihar (Patna)',
    score: 184.0,
    totalMarks: 200,
    accuracy: 95.8,
    timeSpent: '51m 30s',
    testName: 'SSC CGL Tier-1 Full Mock 2026',
    streakDays: 14,
    badges: ['AIR 2 🥈', 'Speedster ⚡', '14-Day Streak 🔥'],
  },
  {
    rank: 3,
    name: 'Deepika S.',
    avatar: '👩‍🏫',
    state: 'Karnataka (Bangalore)',
    score: 179.5,
    totalMarks: 200,
    accuracy: 94.2,
    timeSpent: '46m 05s',
    testName: 'ISRO Scientist-B (CS/IT) Mock',
    streakDays: 22,
    badges: ['AIR 3 🥉', 'Code Master 💻', '22-Day Streak 🔥'],
  },
  {
    rank: 4,
    name: 'Rohan Mehra',
    avatar: '👨‍💼',
    state: 'Delhi NCR',
    score: 175.0,
    totalMarks: 200,
    accuracy: 92.5,
    timeSpent: '54m 20s',
    testName: 'IBPS PO Prelims Speed Test',
    streakDays: 8,
    badges: ['Top 1% ⭐', 'Quant Ace'],
  },
  {
    rank: 5,
    name: 'Anjali Sharma',
    avatar: '👩‍🎓',
    state: 'Rajasthan (Jaipur)',
    score: 172.5,
    totalMarks: 200,
    accuracy: 91.0,
    timeSpent: '52m 45s',
    testName: 'SSC CGL Tier-1 Full Mock 2026',
    streakDays: 11,
    badges: ['Top 1% ⭐', 'Reasoning Genius'],
  },
];

export default function LeaderboardView() {
  const [selectedExam, setSelectedExam] = useState('ALL');

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-800 space-y-3">
        <span className="inline-block px-3 py-1 bg-saffron-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
          All-India Aspirant Rankings
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          National CBT Mock Test Leaderboard
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Celebrate top scorers across India. Practice mock tests daily to earn preparation streak multipliers, performance badges, and rank in the Top 1%.
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 pt-3 text-xs">
          {['ALL', 'SSC CGL', 'Banking', 'ISRO / Tech', 'Railways'].map((ex) => (
            <button
              key={ex}
              onClick={() => setSelectedExam(ex)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                selectedExam === ex
                  ? 'bg-saffron-500 text-white shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {ex === 'ALL' ? '🏆 All Competitions' : ex}
            </button>
          ))}
        </div>
      </div>

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        
        {/* Rank 2 (Silver) */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm text-center space-y-3 order-2 md:order-1">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-3xl flex items-center justify-center mx-auto border-2 border-slate-300">
            {TOP_RANKERS[1].avatar}
          </div>
          <span className="inline-block px-3 py-1 bg-slate-200 text-slate-800 text-xs font-black rounded-full">
            🥈 AIR 2 (SILVER)
          </span>
          <h3 className="font-black text-slate-900 text-base">{TOP_RANKERS[1].name}</h3>
          <p className="text-xs text-slate-500">{TOP_RANKERS[1].state}</p>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs font-bold text-slate-800">
            {TOP_RANKERS[1].score} / 200 Marks ({TOP_RANKERS[1].accuracy}% Accuracy)
          </div>
        </div>

        {/* Rank 1 (Gold - Elevated) */}
        <div className="bg-gradient-to-b from-amber-500 to-amber-600 text-white rounded-3xl p-7 shadow-xl text-center space-y-3 order-1 md:order-2 transform md:-translate-y-4">
          <div className="w-20 h-20 rounded-full bg-white text-4xl flex items-center justify-center mx-auto shadow-inner border-4 border-amber-300">
            {TOP_RANKERS[0].avatar}
          </div>
          <span className="inline-block px-4 py-1 bg-white text-amber-900 text-xs font-black rounded-full shadow-xs">
            🏆 ALL-INDIA RANK 1 (GOLD)
          </span>
          <h3 className="font-black text-white text-lg">{TOP_RANKERS[0].name}</h3>
          <p className="text-xs text-amber-100">{TOP_RANKERS[0].state}</p>
          <div className="bg-amber-700/50 rounded-2xl p-3.5 border border-amber-400/30 text-xs font-black">
            {TOP_RANKERS[0].score} / 200 Marks ({TOP_RANKERS[0].accuracy}% Accuracy)
          </div>
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="bg-white rounded-3xl border-2 border-amber-100 p-6 shadow-sm text-center space-y-3 order-3">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-3xl flex items-center justify-center mx-auto border-2 border-amber-200">
            {TOP_RANKERS[2].avatar}
          </div>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">
            🥉 AIR 3 (BRONZE)
          </span>
          <h3 className="font-black text-slate-900 text-base">{TOP_RANKERS[2].name}</h3>
          <p className="text-xs text-slate-500">{TOP_RANKERS[2].state}</p>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs font-bold text-slate-800">
            {TOP_RANKERS[2].score} / 200 Marks ({TOP_RANKERS[2].accuracy}% Accuracy)
          </div>
        </div>

      </div>

      {/* Ranks 4+ Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 font-black text-sm text-slate-900">
          Complete National Rank List
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Candidate &amp; Location</th>
                <th className="p-4">Test Attempted</th>
                <th className="p-4">Score &amp; Accuracy</th>
                <th className="p-4">Earned Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {TOP_RANKERS.map((u) => (
                <tr key={u.rank} className={u.rank === 1 ? 'bg-amber-50/40' : ''}>
                  <td className="p-4 font-black text-sm">
                    {u.rank === 1 ? '🥇 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : `#${u.rank}`}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-400">{u.state}</div>
                  </td>
                  <td className="p-4 text-slate-600 font-semibold">{u.testName}</td>
                  <td className="p-4 font-bold text-slate-900">
                    <div>{u.score} / {u.totalMarks}</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">{u.accuracy}% Acc. • {u.timeSpent}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {u.badges.map((b, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
