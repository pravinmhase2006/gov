import React, { useState, useEffect } from 'react';
import InternshipCard from '@/components/tech/InternshipCard';
import { dataService, Internship } from '@/services/dataService';
import { Award, Search, Building2 } from 'lucide-react';

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    async function load() {
      const data = await dataService.getInternships();
      setInternships(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-500/20 border border-teal-400/30 rounded-2xl">
              <Award className="w-8 h-8 text-teal-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">Govt & Tech Internships 2026</h1>
              <p className="text-xs sm:text-sm text-teal-200 mt-1">
                Stipend-based government fellowships, research internships, and software development student traineeships.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={{
                id: internship.id,
                title: internship.title,
                slug: internship.slug,
                company: internship.company,
                location: internship.location,
                workMode: 'Remote',
                durationMonths: 3,
                stipendDisplay: internship.stipend,
                isPpoOffered: true,
                skillsRequired: internship.skills.join(', '),
                eligibility: 'College Students / Fresh Graduates',
                applyDeadline: internship.applyBy,
                isGovtFellowship: true,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
