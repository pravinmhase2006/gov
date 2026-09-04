'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle2, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';

interface EligibilityCalculatorProps {
  minAge?: number | null;
  maxAge?: number | null;
  requiredQualification?: string;
  cutoffDate?: string | Date | null;
  jobTitle?: string;
}

export default function EligibilityCalculator({
  minAge = 18,
  maxAge = 30,
  requiredQualification = 'Graduate',
  cutoffDate = null,
  jobTitle,
}: EligibilityCalculatorProps) {
  const [dob, setDob] = useState('2000-01-01');
  const [category, setCategory] = useState<'UR' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'PWD'>('UR');
  const [userQualification, setUserQualification] = useState(requiredQualification || 'Graduate');
  const [result, setResult] = useState<{
    isEligible: boolean;
    ageYears: number;
    ageMonths: number;
    ageDays: number;
    maxAllowedAge: number;
    reason?: string;
  } | null>(null);

  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    const targetDate = cutoffDate ? new Date(cutoffDate) : new Date('2026-08-01');

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += 30;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Age relaxation calculation
    let relaxation = 0;
    if (category === 'OBC') relaxation = 3;
    else if (category === 'SC' || category === 'ST') relaxation = 5;
    else if (category === 'PWD') relaxation = 10;

    const effectiveMaxAge = (maxAge || 30) + relaxation;
    const effectiveMinAge = minAge || 18;

    const isAgeEligible = years >= effectiveMinAge && years <= effectiveMaxAge;
    
    // Qualification check logic
    const qualRank: Record<string, number> = {
      '10th Pass': 1,
      '12th Pass': 2,
      'ITI': 2,
      'Diploma': 3,
      'Graduate': 4,
      'Engineering': 4,
      'Post Graduate': 5,
    };

    const userRank = qualRank[userQualification] || 4;
    const reqRank = qualRank[requiredQualification || 'Graduate'] || 4;
    const isQualEligible = userRank >= reqRank;

    const isEligible = isAgeEligible && isQualEligible;

    let reason = '';
    if (!isAgeEligible) {
      if (years < effectiveMinAge) reason = `Minimum age required is ${effectiveMinAge} years (You are ${years} years).`;
      else reason = `Maximum allowed age for ${category} is ${effectiveMaxAge} years (You are ${years} years).`;
    } else if (!isQualEligible) {
      reason = `Minimum qualification required is ${requiredQualification}.`;
    }

    setResult({
      isEligible,
      ageYears: years,
      ageMonths: months,
      ageDays: days,
      maxAllowedAge: effectiveMaxAge,
      reason,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Live Age &amp; Eligibility Calculator
        </h3>
        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
          Official Criteria Engine
        </span>
      </div>

      <form onSubmit={calculateEligibility} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Your Date of Birth</label>
          <input
            type="date"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Category / Quota</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
          >
            <option value="UR">General / Unreserved</option>
            <option value="OBC">OBC (Non-Creamy) (+3 Yrs)</option>
            <option value="SC">SC (+5 Yrs Relaxation)</option>
            <option value="ST">ST (+5 Yrs Relaxation)</option>
            <option value="EWS">EWS (Economically Weaker)</option>
            <option value="PWD">PwD (+10 Yrs Relaxation)</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Your Qualification</label>
          <select
            value={userQualification}
            onChange={(e) => setUserQualification(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
          >
            <option value="10th Pass">10th Pass (Matric)</option>
            <option value="12th Pass">12th Pass (Inter)</option>
            <option value="ITI">ITI Certified</option>
            <option value="Diploma">Polytechnic Diploma</option>
            <option value="Graduate">Graduate (Any Degree)</option>
            <option value="Engineering">B.Tech / B.E.</option>
            <option value="Post Graduate">Post Graduate</option>
          </select>
        </div>

        <div className="sm:col-span-3 pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" /> Check My Eligibility Now
          </button>
        </div>
      </form>

      {result && (
        <div
          className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in slide-in-from-top-1 ${
            result.isEligible
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {result.isEligible ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-emerald-800">You Are Eligible To Apply! 🎉</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="text-rose-800">Not Eligible For This Notification</span>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-slate-500 block">Your Exact Age:</span>
              <strong>{result.ageYears} Years, {result.ageMonths} Months, {result.ageDays} Days</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Max Age Allowed ({category}):</span>
              <strong>{result.maxAllowedAge} Years</strong>
            </div>
          </div>

          {result.reason && (
            <p className="text-[11px] font-semibold text-rose-700 bg-rose-100/60 p-2 rounded-lg mt-1">
              Note: {result.reason}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
