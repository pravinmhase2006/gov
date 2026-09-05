'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Check, ShieldCheck, IndianRupee, TrendingUp, BookOpen, Clock, Users } from 'lucide-react';

interface CareerProfile {
  id: string;
  name: string;
  category: string;
  levelPay: string;
  inHandSalary: string;
  workLifeBalance: string;
  promotionSpeed: string;
  jobSecurity: string;
  examDifficulty: string;
  selectionStages: string;
  syllabusOverlap: string;
  topPerks: string[];
}

const PROFILES: Record<string, CareerProfile> = {
  ssc_cgl: {
    id: 'ssc_cgl',
    name: 'SSC CGL (ASO / Income Tax Inspector)',
    category: 'Central Govt Group-B',
    levelPay: 'Level 7 (44,900 - 1,42,400)',
    inHandSalary: '₹72,000 - ₹85,000 / month (X Cities)',
    workLifeBalance: '⭐⭐⭐⭐⭐ (Fixed 9 to 5, Weekends Off in MEA/CSS)',
    promotionSpeed: 'Moderate to Fast (Inspector to Assistant Commissioner)',
    jobSecurity: '⭐⭐⭐⭐⭐ Permanent Central Govt Pension / NPS',
    examDifficulty: '⭐⭐⭐⭐ (Moderate - High Speed / Accuracy needed)',
    selectionStages: 'Tier-1 (CBT) + Tier-2 (CBT + Typing DEST)',
    syllabusOverlap: 'High overlap with Railways & State PCS',
    topPerks: ['CGHS Medical Facilities', 'Govt Quarters / HRA 30%', 'LTC Tour Concessions', 'High Social Prestige'],
  },
  ibps_po: {
    id: 'ibps_po',
    name: 'IBPS PO / Bank Probationary Officer',
    category: 'Public Sector Banking',
    levelPay: 'JMGS-I Scale (36,000 - 63,840)',
    inHandSalary: '₹58,000 - ₹66,000 / month + Leased Accommodation',
    workLifeBalance: '⭐⭐⭐ (Busy branch timings, Month-end closing)',
    promotionSpeed: '⭐⭐⭐⭐⭐ Very Fast (Can reach Scale-IV AGM in 8-10 yrs)',
    jobSecurity: '⭐⭐⭐⭐⭐ Public Sector Bank Permanent Job',
    examDifficulty: '⭐⭐⭐⭐ (High Sectional Cutoffs + Descriptive English)',
    selectionStages: 'Prelims + Mains (Objective + Essay) + Personal Interview',
    syllabusOverlap: 'High overlap with SBI PO, RBI Assistant, LIC AAO',
    topPerks: ['Leased House Rent Allowance (₹20k-₹35k)', 'Concessionary Home / Car Loans', 'Petrol & News Allowance', 'Medical Reimbursements'],
  },
  isro_scientist: {
    id: 'isro_scientist',
    name: 'ISRO Scientist / Engineer ‘SC’ (IT / CS)',
    category: 'Govt Research / Autonomous PSU',
    levelPay: 'Level 10 (56,100 - 1,77,500)',
    inHandSalary: '₹95,000 - ₹1,12,000 / month',
    workLifeBalance: '⭐⭐⭐⭐ High intellectual satisfaction, Mission crunch times',
    promotionSpeed: 'Flexible Merit Promotion Scheme (FMP - time bound)',
    jobSecurity: '⭐⭐⭐⭐⭐ Apex Scientific Autonomous Institute',
    examDifficulty: '⭐⭐⭐⭐⭐ (Hard - Deep GATE CS & Engineering core)',
    selectionStages: 'Written Exam (GATE Pattern) + Technical Interview',
    syllabusOverlap: 'High overlap with DRDO, CDAC, NIC Scientist-B, GATE',
    topPerks: ['Satellite Launch Rewards', 'Advanced Global Research Grants', 'ISRO Housing Colony', 'CHSS Comprehensive Healthcare'],
  },
  zomato_sde: {
    id: 'zomato_sde',
    name: 'Software Development Engineer (SDE-1)',
    category: 'High Growth Tech MNC / Startup',
    levelPay: 'CTC Band (₹18 - ₹26 LPA)',
    inHandSalary: '₹1,25,000 - ₹1,65,000 / month + ESOPs',
    workLifeBalance: '⭐⭐⭐ (Agile sprints, Production on-call rotations)',
    promotionSpeed: '⭐⭐⭐⭐⭐ Rapid (SDE-1 to SDE-2 in 1.5 - 2.5 yrs)',
    jobSecurity: '⭐⭐⭐ Market dependent (Performance driven)',
    examDifficulty: '⭐⭐⭐⭐ (DSA LeetCode Medium/Hard + System Design)',
    selectionStages: 'Online Coding Assessment + 3 Technical Coding Rounds + HR',
    syllabusOverlap: '100% overlap with Google, Swiggy, Razorpay, Amazon',
    topPerks: ['Competitive Stock Grants (ESOPs)', 'Free Gourmet Meals & Cab Pickups', 'Remote / Hybrid Flexibility', 'Latest MacBook Pro provided'],
  },
};

export default function CareerComparator() {
  const [leftId, setLeftId] = useState<string>('ssc_cgl');
  const [rightId, setRightId] = useState<string>('ibps_po');

  const left = PROFILES[leftId] || PROFILES.ssc_cgl;
  const right = PROFILES[rightId] || PROFILES.ibps_po;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-800 space-y-3">
        <span className="inline-block px-3 py-1 bg-saffron-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
          Career Decision Matrix
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Compare Government Exams vs. Tech Careers Side-by-Side
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Evaluate salary matrices, work-life balance, exam syllabus overlap, and long-term career growth before committing your preparation time.
        </p>

        {/* Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Career 1 (Left):</label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full bg-slate-800 text-white font-bold border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="ssc_cgl">SSC CGL (ASO / Income Tax)</option>
              <option value="ibps_po">IBPS PO (Bank Officer)</option>
              <option value="isro_scientist">ISRO Scientist IT (Govt Research)</option>
              <option value="zomato_sde">Zomato / Tech SDE-1</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Career 2 (Right):</label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full bg-slate-800 text-white font-bold border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="ibps_po">IBPS PO (Bank Officer)</option>
              <option value="ssc_cgl">SSC CGL (ASO / Income Tax)</option>
              <option value="isro_scientist">ISRO Scientist IT (Govt Research)</option>
              <option value="zomato_sde">Zomato / Tech SDE-1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="table-responsive">
          <table className="w-full min-w-[550px] text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                <th className="p-4 sm:p-5 w-1/4 font-black uppercase text-slate-500">Comparison Parameter</th>
                <th className="p-4 sm:p-5 w-[37.5%] font-black text-sm text-blue-900 bg-blue-50/50">{left.name}</th>
                <th className="p-4 sm:p-5 w-[37.5%] font-black text-sm text-indigo-900 bg-indigo-50/50">{right.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              
              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Category &amp; Cadre</td>
                <td className="p-4 font-semibold text-slate-900">{left.category}</td>
                <td className="p-4 font-semibold text-slate-900">{right.category}</td>
              </tr>

              <tr className="bg-amber-50/30">
                <td className="p-4 font-bold text-amber-900 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5" /> In-Hand Monthly Salary
                </td>
                <td className="p-4 font-black text-sm text-amber-900">{left.inHandSalary}</td>
                <td className="p-4 font-black text-sm text-amber-900">{right.inHandSalary}</td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Work-Life Balance</td>
                <td className="p-4 font-medium">{left.workLifeBalance}</td>
                <td className="p-4 font-medium">{right.workLifeBalance}</td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Promotion Velocity</td>
                <td className="p-4 font-medium">{left.promotionSpeed}</td>
                <td className="p-4 font-medium">{right.promotionSpeed}</td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Job Security Index</td>
                <td className="p-4 font-medium">{left.jobSecurity}</td>
                <td className="p-4 font-medium">{right.jobSecurity}</td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Exam / Interview Difficulty</td>
                <td className="p-4 font-medium">{left.examDifficulty}</td>
                <td className="p-4 font-medium">{right.examDifficulty}</td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Selection Process</td>
                <td className="p-4 font-medium text-slate-700">{left.selectionStages}</td>
                <td className="p-4 font-medium text-slate-700">{right.selectionStages}</td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-500 bg-slate-50/50">Top Allowances &amp; Perks</td>
                <td className="p-4">
                  <ul className="space-y-1">
                    {left.topPerks.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-slate-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4">
                  <ul className="space-y-1">
                    {right.topPerks.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-slate-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
