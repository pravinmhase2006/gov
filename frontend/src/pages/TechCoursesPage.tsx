import React, { useState, useEffect } from 'react';
import TechCourseCard from '@/components/tech/TechCourseCard';
import { dataService, TechCourse } from '@/services/dataService';
import { BookOpen, Search, Sparkles } from 'lucide-react';

export default function TechCoursesPage() {
  const [courses, setCourses] = useState<TechCourse[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await dataService.getTechCourses();
      setCourses(data);
    }
    load();
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 border border-purple-400/30 rounded-2xl">
              <BookOpen className="w-8 h-8 text-purple-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black">Tech Skill Booster Courses & Certifications</h1>
              <p className="text-xs sm:text-sm text-purple-200 mt-1">
                Zero-to-Hero roadmaps for Full-Stack Web Development, Data Structures, Python AI, and placement preps.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <TechCourseCard
              key={course.id}
              course={{
                id: course.id,
                title: course.title,
                slug: course.slug,
                provider: course.provider,
                category: 'Full Stack',
                level: course.level,
                durationHours: parseInt(course.duration),
                priceType: course.isFree ? 'FREE' : 'PAID',
                rating: course.rating,
                totalStudents: course.reviewCount * 4,
                description: 'Master in-demand development practices with hands-on capstone projects.',
                certificateIncluded: true,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
