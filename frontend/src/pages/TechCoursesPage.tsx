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
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-2xl">
              <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Tech Skill Booster Courses & Certifications</h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
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
