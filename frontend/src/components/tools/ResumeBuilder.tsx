'use client';

import React, { useState } from 'react';
import { FileText, Download, Printer, User, Briefcase, GraduationCap, Code, Sparkles, Check } from 'lucide-react';

type TemplateType = 'GOVT_BIODATA' | 'TECH_SDE';

export default function ResumeBuilder() {
  const [template, setTemplate] = useState<TemplateType>('TECH_SDE');

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    githubOrWebsite: 'https://github.com/rahulsharma',
    linkedin: 'https://linkedin.com/in/rahulsharma',
    dob: '15/08/2000',
    category: 'General (UR)',
    fatherName: 'Shri Ramesh Sharma',
    summary:
      'Proactive Software Engineer / Exam Aspirant with a strong background in Computer Science, full-stack development, and competitive problem-solving. Seeking to contribute expertise in high-impact national systems.',
    education: [
      { degree: 'B.Tech in Computer Science', inst: 'Delhi Technological University (DTU)', year: '2018 - 2022', score: '8.4 CGPA' },
      { degree: 'Senior Secondary (Class XII)', inst: 'Kendriya Vidyalaya, CBSE', year: '2018', score: '92.4%' },
      { degree: 'Secondary (Class X)', inst: 'Kendriya Vidyalaya, CBSE', year: '2016', score: '95.0%' },
    ],
    experience: [
      {
        role: 'Full Stack Software Engineer',
        company: 'Zomato / Tech Services Ltd',
        duration: '2022 - Present',
        description: 'Developed scalable microservices in Node.js & Next.js handling 100k+ daily requests. Optimized database queries reducing latency by 35%.',
      },
      {
        role: 'Software Engineering Intern',
        company: 'NIC / Government Tech Project',
        duration: 'Jan 2022 - Jun 2022',
        description: 'Assisted in building responsive dashboards for state governance portal with secure role-based access control.',
      },
    ],
    skills: 'JavaScript, TypeScript, Next.js, React, Node.js, Python, PostgreSQL, Prisma, TailwindCSS, Git, Docker, System Design',
    projects: [
      {
        title: 'GovtPrep India - CBT Testing Platform',
        tech: 'Next.js 14, TypeScript, Tailwind, Prisma, SQLite',
        description: 'Architected an automated CBT mock test engine with bilingual questions, negative marking evaluation, and client-side photo resizer.',
      },
      {
        title: 'AI Resume & Performance Analytics Dashboard',
        tech: 'React, Node.js, Web Speech API, Canvas',
        description: 'Built an interactive career counseling suite with real-time audio narration and instant PDF certificate generation.',
      },
    ],
    declaration:
      'I hereby declare that all information furnished above is true, complete and correct to the best of my knowledge and belief.',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Template Selector & Action Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Resume &amp; Biodata Generator
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Create ATS-Friendly Tech Resume &amp; Govt Job Biodata
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Template Switcher */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setTemplate('TECH_SDE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                template === 'TECH_SDE'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              💻 Tech / SDE Resume
            </button>
            <button
              onClick={() => setTemplate('GOVT_BIODATA')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                template === 'GOVT_BIODATA'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏛️ Govt Proforma Biodata
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Inputs (Left) & Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls (Hidden in Print) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 print:hidden max-h-[800px] overflow-y-auto">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Personal &amp; Contact Details
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category (Govt)</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Professional Summary / Objective</label>
              <textarea
                rows={3}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Technical Skills / Certifications</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Document Preview */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl p-8 sm:p-12 print:border-none print:shadow-none print:p-0 print:m-0 min-h-[900px]">
            
            {/* TEMPLATE A: TECH SDE RESUME */}
            {template === 'TECH_SDE' && (
              <div className="space-y-6 text-slate-800 font-sans">
                {/* Header */}
                <div className="border-b-2 border-blue-600 pb-4 text-center space-y-1">
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                    {formData.fullName}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
                    <span>{formData.email}</span>
                    <span>•</span>
                    <span>{formData.phone}</span>
                    <span>•</span>
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-[11px] text-blue-600 font-semibold mt-1">
                    <span>{formData.githubOrWebsite}</span>
                    <span>•</span>
                    <span>{formData.linkedin}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                    Professional Summary
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">{formData.summary}</p>
                </div>

                {/* Experience */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                    Work Experience
                  </h3>
                  {formData.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{exp.role} — <span className="text-blue-700">{exp.company}</span></span>
                        <span className="text-[11px] text-slate-500 font-semibold">{exp.duration}</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                    Key Projects
                  </h3>
                  {formData.projects.map((proj, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{proj.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{proj.tech}</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                    Technical Skills &amp; Tools
                  </h3>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">{formData.skills}</p>
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1">
                    Education &amp; Credentials
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {formData.education.map((edu, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">{edu.degree}</span>
                          <span className="text-slate-500 text-xs block">{edu.inst}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-blue-600">{edu.score}</span>
                          <span className="text-slate-400 text-[10px] block">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TEMPLATE B: GOVT PROFORMA BIODATA */}
            {template === 'GOVT_BIODATA' && (
              <div className="space-y-6 text-slate-900 font-serif">
                <div className="text-center border-b-2 border-slate-800 pb-4 space-y-1">
                  <h2 className="text-xl font-bold uppercase tracking-wider">
                    CURRICULUM VITAE / BIODATA PROFORMA
                  </h2>
                  <p className="text-xs text-slate-600 font-sans italic">
                    (Standard Form for Government / PSU Recruitment Submissions)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-y-3 text-xs border border-slate-300 p-4 rounded-xl">
                  <div><strong>1. Full Name:</strong> {formData.fullName}</div>
                  <div><strong>2. Father&apos;s Name:</strong> {formData.fatherName}</div>
                  <div><strong>3. Date of Birth:</strong> {formData.dob}</div>
                  <div><strong>4. Category / Quota:</strong> {formData.category}</div>
                  <div><strong>5. Mobile Contact:</strong> {formData.phone}</div>
                  <div><strong>6. Email Address:</strong> {formData.email}</div>
                  <div className="col-span-2"><strong>7. Address for Correspondence:</strong> {formData.location}</div>
                </div>

                {/* Academic Record Table */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wide">
                    8. Educational &amp; Professional Qualifications:
                  </h3>
                  <table className="w-full border-collapse border border-slate-300 text-xs text-left">
                    <thead className="bg-slate-100 font-bold border-b border-slate-300">
                      <tr>
                        <th className="border border-slate-300 p-2">Examination Passed</th>
                        <th className="border border-slate-300 p-2">Board / University</th>
                        <th className="border border-slate-300 p-2">Year</th>
                        <th className="border border-slate-300 p-2">% / CGPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.education.map((edu, idx) => (
                        <tr key={idx}>
                          <td className="border border-slate-300 p-2">{edu.degree}</td>
                          <td className="border border-slate-300 p-2">{edu.inst}</td>
                          <td className="border border-slate-300 p-2">{edu.year}</td>
                          <td className="border border-slate-300 p-2 font-bold">{edu.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Declaration */}
                <div className="pt-6 border-t border-slate-200 space-y-8 text-xs">
                  <p className="leading-relaxed italic">{formData.declaration}</p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
                      <p>Place: {formData.location}</p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-slate-600 w-36 mb-1"></div>
                      <span className="font-bold">Signature of Candidate</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
