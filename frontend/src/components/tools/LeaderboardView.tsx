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

import { dataService } from '@/services/dataService';

export default function LeaderboardView() {
  const [selectedExam, setSelectedExam] = useState('ALL');
  const [rankers, setRankers] = useState<LeaderboardUser[]>(TOP_RANKERS);

  React.useEffect(() => {
    async function loadDynamicLeaderboard() {
      const data = await dataService.getLeaderboard();
      if (data && data.length >= 3) {
        const mapped: LeaderboardUser[] = data.map((d: any, idx: number) => ({
          rank: idx + 1,
          name: d.name,
          avatar: d.avatar || (idx % 2 === 0 ? '👨‍🎓' : '👩‍🎓'),
          state: d.state || 'All India',
          score: d.score,
          totalMarks: 200,
          accuracy: parseFloat(d.accuracy) || 95,
          timeSpent: '48m 10s',
          testName: 'National CBT Mock 2026',
          streakDays: d.streakDays || 12,
          badges: idx === 0 ? ['AIR 1 🏆', '99.9%ile'] : idx === 1 ? ['AIR 2 🥈', 'Speedster ⚡'] : ['AIR 3 🥉', 'Top 1% ⭐'],
        }));
        setRankers(mapped);
      }
    }
    loadDynamicLeaderboard();
  }, []);

  const rank1 = rankers[0] || TOP_RANKERS[0];
  const rank2 = rankers[1] || TOP_RANKERS[1];
  const rank3 = rankers[2] || TOP_RANKERS[2];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
        <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider">
          All-India Aspirant Rankings
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          National CBT Mock Test Leaderboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
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
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
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
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm text-center space-y-3 order-2 md:order-1">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-3xl flex items-center justify-center mx-auto border-2 border-slate-300 dark:border-slate-700">
            {rank2.avatar}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              🥈 Rank #2 (Silver)
            </span>
            <h3 className="font-extrabold text-slate-900 dark:text-white mt-2 text-lg">{rank2.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{rank2.state}</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
            <span className="text-xl font-black text-slate-800 dark:text-slate-100">{rank2.score}</span>
            <span className="text-xs text-slate-400"> / {rank2.totalMarks} Marks</span>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{rank2.accuracy}% Accuracy</p>
          </div>
        </div>

        {/* Rank 1 (Gold - Center Hero) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-400 dark:border-amber-500/80 p-8 shadow-md text-center space-y-4 order-1 md:order-2 transform md:-translate-y-4 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-black px-4 py-1 rounded-full shadow-md">
            👑 ALL-INDIA TOPPER
          </div>
          <div className="w-20 h-20 rounded-full bg-amber-50 dark:bg-amber-950/40 text-4xl flex items-center justify-center mx-auto border-4 border-amber-400 shadow-md">
            {rank1.avatar}
          </div>
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-xl">{rank1.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{rank1.state}</p>
          </div>
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl space-y-1">
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400">{rank1.score}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Out of {rank1.totalMarks} Marks</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{rank1.accuracy}% Accuracy</div>
          </div>
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-sm text-center space-y-3 order-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-3xl flex items-center justify-center mx-auto border-2 border-amber-700/30">
            {rank3.avatar}
          </div>
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
              🥉 Rank #3 (Bronze)
            </span>
            <h3 className="font-extrabold text-slate-900 dark:text-white mt-2 text-lg">{rank3.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{rank3.state}</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
            <span className="text-xl font-black text-slate-800 dark:text-slate-100">{rank3.score}</span>
            <span className="text-xs text-slate-400"> / {rank3.totalMarks} Marks</span>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{rank3.accuracy}% Accuracy</p>
          </div>
        </div>
      </div>

      {/* Ranks 4+ Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 font-extrabold text-sm text-slate-900 dark:text-white">
          Complete All-India Rank List
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Candidate &amp; Location</th>
                <th className="p-4">Test Attempted</th>
                <th className="p-4">Score &amp; Accuracy</th>
                <th className="p-4">Earned Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
              {rankers.map((u) => (
                <tr key={u.rank} className={u.rank === 1 ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''}>
                  <td className="p-4 font-black text-sm">
                    {u.rank === 1 ? '🥇 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : `#${u.rank}`}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-400">{u.state}</div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-semibold">{u.testName}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    <div>{u.score} / {u.totalMarks}</div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{u.accuracy}% Acc. • {u.timeSpent}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {u.badges.map((b, idx) => (
                        <span key={idx} className="bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 px-2 py-0.5 rounded text-[10px] font-bold">
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
