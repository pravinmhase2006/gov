export interface TechJobData {
  id: string;
  title: string;
  slug: string;
  company: string;
  companyLogo?: string | null;
  location: string;
  workMode: string;
  experienceLevel: string;
  salaryRange: string;
  ctcNumeric?: number | null;
  roleCategory: string;
  techStack: string;
  jobType?: string;
  description?: string;
  requirements?: string | null;
  eligibility?: string | null;
  applyUrl?: string;
  isFeatured?: boolean;
  isPsuGovt?: boolean;
  status?: string;
  createdAt?: Date | string;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string | null;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string | null;
  summary?: string | null;
  content?: string | null;
  codeSnippet?: string | null;
  quiz?: LessonQuizQuestion[];
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string | null;
  lessons: CourseLesson[];
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string | null;
  courseId: string;
  courseSlug: string;
  completedLessonIds: string[];
  progressPercent: number;
  isCompleted: boolean;
  completedAt?: string | null;
  certificateCode?: string | null;
  createdAt: string;
}

export interface CertificateData {
  id: string;
  certificateCode: string;
  courseId: string;
  courseTitle: string;
  recipientName: string;
  recipientEmail?: string | null;
  userId?: string | null;
  issueDate: string;
  grade: string;
  skills: string[];
  courseCategory?: string;
  durationHours?: number;
  instructor?: string;
  verificationUrl?: string;
  createdAt: string;
}

export interface TechCourseData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: string;
  durationHours: number;
  thumbnail?: string | null;
  thumbnailUrl?: string | null;
  instructor: string;
  instructorRole?: string | null;
  provider?: string;
  badge?: string | null;
  rating: number;
  reviewCount?: number;
  enrolledCount?: number;
  totalStudents?: number;
  lessonsCount?: number;
  skills: string[];
  isPublished?: boolean;
  isFree?: boolean;
  priceType?: string;
  certificateIncluded?: boolean;
  modules?: CourseModule[];
  enrollment?: CourseEnrollment | null;
  createdAt?: Date | string;
}

export interface InternshipData {
  id: string;
  title: string;
  slug: string;
  company: string;
  companyLogo?: string | null;
  location: string;
  workMode: string;
  durationMonths: number;
  stipendAmount?: number | null;
  stipendDisplay: string;
  isPpoOffered?: boolean;
  roleCategory: string;
  skillsRequired: string;
  eligibility: string;
  description?: string;
  applyDeadline?: Date | string | null;
  applyUrl?: string;
  isFeatured?: boolean;
  isGovtFellowship?: boolean;
  status?: string;
  createdAt?: Date | string;
}
