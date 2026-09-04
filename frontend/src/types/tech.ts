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

export interface TechCourseData {
  id: string;
  title: string;
  slug: string;
  provider: string;
  instructor?: string | null;
  category: string;
  level: string;
  durationHours: number;
  priceType: string;
  priceAmount?: number;
  certificateIncluded?: boolean;
  rating: number;
  totalStudents: number;
  thumbnailUrl?: string | null;
  description: string;
  syllabus?: string | null;
  prerequisites?: string | null;
  enrollUrl?: string;
  isFeatured?: boolean;
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
