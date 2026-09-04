import React, { useState, useEffect } from 'react';
import TechJobCard from '@/components/tech/TechJobCard';
import { dataService, TechJob } from '@/services/dataService';
import { Cpu, Search, Briefcase } from 'lucide-react';

export default function TechJobsPage() {
  const [techJobs, setTechJobs] = useState<TechJob[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await dataService.getTechJobs();
      setTechJobs(data);
    }
    load();
  }, []);

  const filtered = techJobs.filter(
    (tj) =>
      tj.title.toLowerCase().includes(search.toLowerCase()) ||
      tj.company.toLowerCase().includes(search.toLowerCase()) ||
      tj.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 border border-indigo-400/30 rounded-2xl">
              <Cpu className="w-8 h-8 text-indigo-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">Tech & Software Careers in Bharat</h1>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1">
                Curated IT, Full-Stack, Python, and AI developer job opportunities with salary transparencies.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tech roles (React, Node.js, Python, Fresher)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">{filtered.length} Tech Roles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((job) => (
            <TechJobCard
              key={job.id}
              job={{
                id: job.id,
                title: job.title,
                slug: job.slug,
                company: job.company,
                location: job.location,
                workMode: 'Hybrid',
                experienceLevel: job.experience,
                salaryRange: job.salary,
                roleCategory: 'Engineering',
                techStack: job.skills.join(', '),
                isFeatured: job.featured,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
