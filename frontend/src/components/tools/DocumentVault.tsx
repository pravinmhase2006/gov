'use client';

import React, { useState, useEffect } from 'react';
import { 
  FolderLock, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Save, 
  FileText, 
  GraduationCap, 
  User, 
  MapPin,
  Lock
} from 'lucide-react';

interface VaultData {
  // Personal Details
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  category: string;
  aadhaarNumber: string;

  // 10th Class
  tenthBoard: string;
  tenthRollNo: string;
  tenthYear: string;
  tenthPercentage: string;

  // 12th Class
  twelfthBoard: string;
  twelfthRollNo: string;
  twelfthYear: string;
  twelfthPercentage: string;

  // Graduation
  gradDegree: string;
  gradUniversity: string;
  gradRollNo: string;
  gradYear: string;
  gradPercentage: string;

  // Address
  addressLine: string;
  district: string;
  state: string;
  pincode: string;
}

const DEFAULT_VAULT: VaultData = {
  fullName: 'Rahul Sharma',
  fatherName: 'Rajesh Sharma',
  motherName: 'Sunita Sharma',
  dob: '1998-08-15',
  gender: 'Male',
  category: 'OBC (Non-Creamy Layer)',
  aadhaarNumber: 'XXXX-XXXX-4589',

  tenthBoard: 'CBSE New Delhi',
  tenthRollNo: '6145892',
  tenthYear: '2014',
  tenthPercentage: '88.4%',

  twelfthBoard: 'Maharashtra State Board',
  twelfthRollNo: 'M148902',
  twelfthYear: '2016',
  twelfthPercentage: '82.6%',

  gradDegree: 'B.Sc Computer Science',
  gradUniversity: 'Savitribai Phule Pune University',
  gradRollNo: 'PU16BCS890',
  gradYear: '2020',
  gradPercentage: '78.5%',

  addressLine: 'Flat 402, Shivneri Residency, Kothrud',
  district: 'Pune',
  state: 'Maharashtra',
  pincode: '411038'
};

export default function DocumentVault() {
  const [vault, setVault] = useState<VaultData>(DEFAULT_VAULT);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('govtprep_document_vault');
      if (saved) {
        setVault(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleCopy = (key: string, value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('govtprep_document_vault', JSON.stringify(vault));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      // Ignore
    }
  };

  const updateField = (field: keyof VaultData, value: string) => {
    setVault(prev => ({ ...prev, [field]: value }));
  };

  const renderField = (label: string, field: keyof VaultData, placeholder: string) => {
    const val = vault[field];
    const isCopied = copiedKey === field;

    return (
      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={placeholder}
            value={val}
            onChange={(e) => updateField(field, e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <button
            type="button"
            onClick={() => handleCopy(field, val)}
            className={`p-2 rounded-xl border text-xs font-semibold shrink-0 transition-all flex items-center justify-center ${
              isCopied
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
            title="Copy to clipboard"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/20">
              <Lock className="w-3.5 h-3.5" /> 100% Client-Side Encrypted Local Vault
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              One-Click Document Locker & Form Fill Assistant
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Save your academic marks, roll numbers, and personal details once. Use 1-click copy to fill SSC, UPSC & IBPS application forms in seconds without errors.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-all"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Saved to Browser!' : 'Save Vault Details'}</span>
          </button>
        </div>
      </div>

      {/* Privacy Notice Alert */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>
          <strong>Zero Server Upload Guarantee:</strong> All document numbers and personal data are stored exclusively in your browser's private local storage. No information is transmitted to any server.
        </span>
      </div>

      {/* Vault Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Personal Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
            <User className="w-4 h-4 text-blue-600" />
            <span>1. Candidate Personal Identification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderField('Full Name (As per 10th)', 'fullName', 'Rahul Sharma')}
            {renderField('Date of Birth (YYYY-MM-DD)', 'dob', '1998-08-15')}
            {renderField("Father's Name", 'fatherName', 'Rajesh Sharma')}
            {renderField("Mother's Name", 'motherName', 'Sunita Sharma')}
            {renderField('Gender', 'gender', 'Male')}
            {renderField('Category & Quota', 'category', 'OBC-NCL')}
            <div className="sm:col-span-2">
              {renderField('Aadhaar / ID Card Number', 'aadhaarNumber', 'XXXX-XXXX-XXXX')}
            </div>
          </div>
        </div>

        {/* 2. 10th Matriculation Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>2. 10th Standard (Matriculation)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderField('Board / Education Council', 'tenthBoard', 'CBSE New Delhi')}
            {renderField('10th Roll Number / Hall Ticket', 'tenthRollNo', '6145892')}
            {renderField('Passing Year', 'tenthYear', '2014')}
            {renderField('Percentage / CGPA', 'tenthPercentage', '88.4%')}
          </div>
        </div>

        {/* 3. 12th Higher Secondary Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>3. 12th Standard / HSC / Diploma</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderField('Board / State Council', 'twelfthBoard', 'Maharashtra State Board')}
            {renderField('12th Roll Number', 'twelfthRollNo', 'M148902')}
            {renderField('Passing Year', 'twelfthYear', '2016')}
            {renderField('Percentage / CGPA', 'twelfthPercentage', '82.6%')}
          </div>
        </div>

        {/* 4. Graduation Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>4. Graduation / Degree Qualification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderField('Degree & Branch', 'gradDegree', 'B.Sc Computer Science')}
            {renderField('University / Institute', 'gradUniversity', 'SPPU Pune')}
            {renderField('Registration / PRN No', 'gradRollNo', 'PU16BCS890')}
            {renderField('Passing Year', 'gradYear', '2020')}
            <div className="sm:col-span-2">
              {renderField('Final Percentage / CGPA', 'gradPercentage', '78.5%')}
            </div>
          </div>
        </div>

        {/* 5. Address Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 font-bold text-slate-900 text-sm">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>5. Permanent & Correspondence Address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              {renderField('Address Line', 'addressLine', 'Flat 402, Shivneri Residency')}
            </div>
            {renderField('District / City', 'district', 'Pune')}
            {renderField('State', 'state', 'Maharashtra')}
            {renderField('PIN Code', 'pincode', '411038')}
          </div>
        </div>
      </div>
    </div>
  );
}
