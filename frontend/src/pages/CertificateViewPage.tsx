import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { dataService } from '@/services/dataService';
import {
  Award,
  CheckCircle2,
  Download,
  Share2,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Calendar,
  User,
  GraduationCap,
  Building2,
  FileText,
} from 'lucide-react';
import Link from '@/components/common/Link';
import DataBoundary from '@/components/common/DataBoundary';
import { CertificateData } from '@/types';
import { formatDate } from '@/lib/utils';

export default function CertificateViewPage() {
  const { code } = useParams<{ code: string }>();
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const loadCertificate = async () => {
    if (!code) return;
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getCertificateByCode(code);
      if (!data) throw new Error('Certificate not found or verification code is invalid.');
      setCert(data);
    } catch (err: any) {
      console.error('Error fetching certificate:', err);
      setError(err?.message || 'Certificate record could not be verified.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificate();
  }, [code]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const shareLinkedIn = () => {
    if (!cert) return;
    const title = encodeURIComponent(`I just completed "${cert.courseTitle}" on GovtPrep Academy!`);
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      '_blank'
    );
  };

  const shareWhatsApp = () => {
    if (!cert) return;
    const text = encodeURIComponent(
      `🎉 I earned a certified credential in "${cert.courseTitle}" from GovtPrep Academy! View & verify my certificate here: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareTwitter = () => {
    if (!cert) return;
    const text = encodeURIComponent(
      `Excited to share that I just finished "${cert.courseTitle}" on GovtPrep Academy! 🚀 Verified Certificate: ${shareUrl} #GovtPrep #TechSkills`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Verification Status Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Officially Verified Credential
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h1 className="text-lg font-black text-white">
                GovtPrep Academy Certificate of Completion
              </h1>
              <p className="text-xs text-slate-400">
                Credential ID: <span className="font-mono text-purple-400 font-bold">{code}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
            <button
              onClick={shareLinkedIn}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share on LinkedIn</span>
            </button>
          </div>
        </div>

        <DataBoundary loading={loading} error={error} onRetry={loadCertificate}>
          {cert && (
            <div className="space-y-8">
              
              {/* 🎓 The Certificate Paper Frame */}
              <div
                ref={certRef}
                className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-8 border-double border-amber-500/60 rounded-3xl p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden print:border-black print:bg-white print:text-black"
              >
                {/* Decorative Corner Ornaments */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <Award className="w-96 h-96 text-amber-300" />
                </div>

                <div className="relative z-10 text-center space-y-8">
                  
                  {/* Header Logo & Title */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-black tracking-widest uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>GovtPrep India Academy • Engineering Institute</span>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-200 tracking-wide uppercase drop-shadow-md">
                      Certificate of Completion
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest font-semibold">
                      This is to certify that
                    </p>
                  </div>

                  {/* Recipient Name */}
                  <div className="space-y-2 py-2">
                    <h3 className="text-3xl sm:text-5xl font-black text-white border-b-2 border-amber-500/40 inline-block px-8 py-2 tracking-tight">
                      {cert.recipientName}
                    </h3>
                  </div>

                  {/* Course Details */}
                  <div className="max-w-2xl mx-auto space-y-3">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
                      has successfully satisfied all rigorous requirements, comprehensive curriculum assessments, code exercises, and capstone project modules for the specialization:
                    </p>
                    <div className="text-xl sm:text-2xl font-black text-purple-300">
                      {cert.courseTitle}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                      <span>Awarded with {cert.grade || 'Distinction'}</span>
                    </div>
                  </div>

                  {/* Skills Mastered Tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Verified Skills Mastered
                      </span>
                      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-purple-200 text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer Signatures & Hologram Seal */}
                  <div className="pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 items-center gap-6 text-left">
                    
                    {/* Left: Issue Date & Credential ID */}
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>
                        Issue Date: <span className="font-bold text-white">{formatDate(cert.issueDate || cert.createdAt)}</span>
                      </div>
                      <div>
                        Credential ID: <span className="font-mono text-purple-400 font-bold">{cert.certificateCode}</span>
                      </div>
                      <div>
                        Verification: <span className="text-emerald-400 font-semibold">govtprep.in/verify</span>
                      </div>
                    </div>

                    {/* Middle: Gold Foil Hologram Seal */}
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 p-1 shadow-lg flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-slate-950 border-2 border-amber-300 flex flex-col items-center justify-center text-center p-1">
                          <Award className="w-6 h-6 text-amber-400" />
                          <span className="text-[8px] font-black text-amber-300 uppercase tracking-tighter">
                            Official Seal
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Academic Director Signature */}
                    <div className="text-right sm:text-right space-y-1">
                      <div className="font-serif italic text-base text-amber-200">
                        Vikramaditya Rao
                      </div>
                      <div className="h-0.5 bg-slate-700 w-36 ml-auto" />
                      <div className="text-[11px] font-bold text-slate-300">
                        Academic Dean & Director
                      </div>
                      <div className="text-[10px] text-slate-500">
                        GovtPrep Engineering Council
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Share Bar */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-sm text-white">
                    Showcase this achievement on your profile!
                  </h4>
                  <p className="text-xs text-slate-400">
                    Share your verified certificate link directly with recruiters and on social platforms.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={shareLinkedIn}
                    className="px-3.5 py-2 rounded-xl bg-[#0077b5] hover:opacity-90 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:opacity-90 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={shareTwitter}
                    className="px-3.5 py-2 rounded-xl bg-[#1DA1F2] hover:opacity-90 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Twitter (X)
                  </button>
                  <Link
                    href="/tech-courses"
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all"
                  >
                    Explore More Free Courses
                  </Link>
                </div>
              </div>

            </div>
          )}
        </DataBoundary>

      </div>
    </div>
  );
}
