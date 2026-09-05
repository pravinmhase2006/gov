import { apiRequest } from './api';

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  category: string;
  logoUrl?: string | null;
  officialWebsite?: string | null;
}


export interface Job {
  id: string;
  title: string;
  slug: string;
  organizationId: string;
  organization: Organization;
  postName: string;
  totalVacancies: number;
  qualification: string;
  ageLimitMin: number;
  ageLimitMax: number;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryText?: string | null;
  startDate: string;
  lastDate: string;
  examDate?: string | null;
  admitCardDate?: string | null;
  resultDate?: string | null;
  applicationFeeGeneral?: number | null;
  applicationFeeReserved?: number | null;
  applicationFeeFemale?: number | null;
  officialNotificationUrl?: string | null;
  applyOnlineUrl?: string | null;
  selectionProcess?: string | null;
  eligibilityDetails?: string | null;
  status: string;
  isFeatured: boolean;
  isTrending: boolean;
  isUrgent: boolean;
  viewsCount: number;
  state?: string | null;
  category?: string | null;
  createdAt: string;
}

export interface Exam {
  id: string;
  name: string;
  slug: string;
  code: string;
  organizationId: string;
  organization: Organization;
  frequency?: string | null;
  eligibilitySummary?: string | null;
  selectionProcess?: string | null;
  examPatternSummary?: string | null;
  isPopular: boolean;
  viewsCount: number;
}

export interface TechJob {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  skills: string[];
  description: string;
  applyUrl: string;
  featured: boolean;
  postedDate: string;
}

export interface TechCourse {
  id: string;
  title: string;
  slug: string;
  provider: string;
  level: string;
  duration: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  thumbnailUrl: string;
  enrollUrl: string;
  isFree: boolean;
}

export interface Internship {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  skills: string[];
  applyBy: string;
  applyUrl: string;
  postedDate: string;
}

export interface MockTest {
  id: string;
  title: string;
  slug: string;
  examName: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  positiveMarks: number;
  negativeMarks: number;
  difficulty: string;
  isFree: boolean;
  attemptsCount: number;
}

export interface CurrentAffair {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export interface ResultItem {
  id: string;
  title: string;
  organization: string;
  slug: string;
  releaseDate: string;
  directDownloadUrl: string;
  status: string;
}

export interface AdmitCardItem {
  id: string;
  title: string;
  organization: string;
  slug: string;
  releaseDate: string;
  examDate: string;
  downloadUrl: string;
  status: string;
}

export interface AnswerKeyItem {
  id: string;
  title: string;
  organization: string;
  slug: string;
  releaseDate: string;
  objectionLastDate: string;
  downloadUrl: string;
}

// Mock Organizations
export const MOCK_ORGANIZATIONS: Record<string, Organization> = {
  ssc: { id: 'org-ssc', name: 'Staff Selection Commission', shortName: 'SSC', category: 'Central Govt' },
  upsc: { id: 'org-upsc', name: 'Union Public Service Commission', shortName: 'UPSC', category: 'Central Govt' },
  rrb: { id: 'org-rrb', name: 'Railway Recruitment Board', shortName: 'RRB', category: 'Railways' },
  ibps: { id: 'org-ibps', name: 'Institute of Banking Personnel Selection', shortName: 'IBPS', category: 'Banking' },
  sbi: { id: 'org-sbi', name: 'State Bank of India', shortName: 'SBI', category: 'Banking' },
  drdo: { id: 'org-drdo', name: 'Defence Research and Development Organisation', shortName: 'DRDO', category: 'Defence' },
  isro: { id: 'org-isro', name: 'Indian Space Research Organisation', shortName: 'ISRO', category: 'Defence/Science' },
  state_police: { id: 'org-police', name: 'State Police Recruitment Board', shortName: 'State Police', category: 'Police' },
};

// Mock Jobs
export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'SSC CGL 2026 Combined Graduate Level Examination',
    slug: 'ssc-cgl-2026-recruitment',
    organizationId: 'org-ssc',
    organization: MOCK_ORGANIZATIONS.ssc,
    postName: 'Assistant Section Officer, Inspector, Sub Inspector, Auditor',
    totalVacancies: 14582,
    qualification: 'Bachelor’s Degree in any discipline from a recognized University',
    ageLimitMin: 18,
    ageLimitMax: 32,
    salaryMin: 35400,
    salaryMax: 142400,
    salaryText: '₹35,400 - ₹1,42,400 (Level 4 to Level 8)',
    startDate: '2026-03-01',
    lastDate: '2026-04-15',
    examDate: '2026-07-10 to 2026-07-24',
    admitCardDate: '2026-06-25',
    resultDate: '2026-09-15',
    applicationFeeGeneral: 100,
    applicationFeeReserved: 0,
    applicationFeeFemale: 0,
    officialNotificationUrl: 'https://ssc.gov.in',
    applyOnlineUrl: 'https://ssc.gov.in/apply',
    selectionProcess: 'Tier-1 CBT (Qualifying), Tier-2 CBT (Merit), Document Verification',
    eligibilityDetails: 'Candidates must possess a Graduation Degree. Age relaxation applies for OBC/SC/ST/PwD.',
    status: 'PUBLISHED',
    isFeatured: true,
    isTrending: true,
    isUrgent: false,
    viewsCount: 148500,
    state: 'All India',
    category: 'Central Govt',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'job-2',
    title: 'RRB NTPC Non-Technical Popular Categories 2026',
    slug: 'rrb-ntpc-2026-recruitment',
    organizationId: 'org-rrb',
    organization: MOCK_ORGANIZATIONS.rrb,
    postName: 'Station Master, Goods Guard, Senior Clerk, Junior Clerk',
    totalVacancies: 11558,
    qualification: '12th Pass / Graduate depending on the specific post',
    ageLimitMin: 18,
    ageLimitMax: 33,
    salaryMin: 19900,
    salaryMax: 63200,
    salaryText: '₹19,900 - ₹63,200 (Level 2 to Level 6)',
    startDate: '2026-03-05',
    lastDate: '2026-04-20',
    examDate: '2026-08-15',
    admitCardDate: '2026-08-01',
    applicationFeeGeneral: 500,
    applicationFeeReserved: 250,
    applicationFeeFemale: 250,
    officialNotificationUrl: 'https://rrbcdg.gov.in',
    applyOnlineUrl: 'https://rrbcdg.gov.in/apply',
    selectionProcess: 'CBT 1, CBT 2, Typing Skill / CBAT, Document Verification, Medical Exam',
    status: 'PUBLISHED',
    isFeatured: true,
    isTrending: true,
    isUrgent: false,
    viewsCount: 124200,
    state: 'All India',
    category: 'Railways',
    createdAt: '2026-03-05T08:00:00Z',
  },
  {
    id: 'job-3',
    title: 'IBPS PO Probationary Officer / Management Trainee CRP XIV',
    slug: 'ibps-po-crp-xiv-2026',
    organizationId: 'org-ibps',
    organization: MOCK_ORGANIZATIONS.ibps,
    postName: 'Probationary Officer / Management Trainee',
    totalVacancies: 4455,
    qualification: 'A Degree (Graduation) in any discipline from a Govt recognized University',
    ageLimitMin: 20,
    ageLimitMax: 30,
    salaryMin: 36000,
    salaryMax: 63840,
    salaryText: '₹36,000 - ₹63,840 + DA, HRA, Perks',
    startDate: '2026-02-15',
    lastDate: '2026-03-25',
    examDate: '2026-06-05',
    admitCardDate: '2026-05-20',
    applicationFeeGeneral: 850,
    applicationFeeReserved: 175,
    applicationFeeFemale: 850,
    officialNotificationUrl: 'https://ibps.in',
    applyOnlineUrl: 'https://ibps.in/apply',
    selectionProcess: 'Online Preliminary Exam, Online Main Exam, Personal Interview',
    status: 'PUBLISHED',
    isFeatured: true,
    isTrending: false,
    isUrgent: true,
    viewsCount: 98200,
    state: 'All India',
    category: 'Banking',
    createdAt: '2026-02-15T09:00:00Z',
  },
  {
    id: 'job-4',
    title: 'UPSC Civil Services Examination (CSE) 2026',
    slug: 'upsc-cse-prelims-2026',
    organizationId: 'org-upsc',
    organization: MOCK_ORGANIZATIONS.upsc,
    postName: 'IAS, IPS, IFS, IRS, Group A & Group B Services',
    totalVacancies: 1105,
    qualification: 'Graduate degree in any discipline from recognized University',
    ageLimitMin: 21,
    ageLimitMax: 32,
    salaryMin: 56100,
    salaryMax: 250000,
    salaryText: '₹56,100 (Pay Level 10) up to Cabinet Secretary ₹2,50,000',
    startDate: '2026-02-01',
    lastDate: '2026-03-10',
    examDate: '2026-05-24',
    admitCardDate: '2026-05-01',
    applicationFeeGeneral: 100,
    applicationFeeReserved: 0,
    applicationFeeFemale: 0,
    officialNotificationUrl: 'https://upsc.gov.in',
    applyOnlineUrl: 'https://upsconline.nic.in',
    selectionProcess: 'Civil Services Preliminary Exam (Objective), Main Exam (Written), Personality Test (Interview)',
    status: 'PUBLISHED',
    isFeatured: true,
    isTrending: true,
    isUrgent: false,
    viewsCount: 210000,
    state: 'All India',
    category: 'Central Govt',
    createdAt: '2026-02-01T06:00:00Z',
  },
  {
    id: 'job-5',
    title: 'SBI Junior Associates (Customer Support & Sales) 2026',
    slug: 'sbi-clerk-junior-associates-2026',
    organizationId: 'org-sbi',
    organization: MOCK_ORGANIZATIONS.sbi,
    postName: 'Junior Associate (Clerk)',
    totalVacancies: 8283,
    qualification: 'Graduation in any discipline',
    ageLimitMin: 20,
    ageLimitMax: 28,
    salaryMin: 29000,
    salaryMax: 48000,
    salaryText: '₹29,000 - ₹48,000 + allowances',
    startDate: '2026-03-10',
    lastDate: '2026-04-10',
    examDate: '2026-06-20',
    applicationFeeGeneral: 750,
    applicationFeeReserved: 0,
    applicationFeeFemale: 750,
    officialNotificationUrl: 'https://sbi.co.in/careers',
    applyOnlineUrl: 'https://sbi.co.in/careers/apply',
    selectionProcess: 'Preliminary Examination, Main Examination, Local Language Test',
    status: 'PUBLISHED',
    isFeatured: false,
    isTrending: true,
    isUrgent: false,
    viewsCount: 76400,
    state: 'All India',
    category: 'Banking',
    createdAt: '2026-03-10T11:00:00Z',
  },
  {
    id: 'job-6',
    title: 'DRDO CEPTAM 11 Technical Assistant & Technician',
    slug: 'drdo-ceptam-11-recruitment-2026',
    organizationId: 'org-drdo',
    organization: MOCK_ORGANIZATIONS.drdo,
    postName: 'Senior Technical Assistant-B (STA-B) & Technician-A (Tech-A)',
    totalVacancies: 2240,
    qualification: 'Diploma in Engineering / B.Sc or ITI Certificate in relevant trade',
    ageLimitMin: 18,
    ageLimitMax: 28,
    salaryMin: 35400,
    salaryMax: 112400,
    salaryText: '₹35,400 - ₹1,12,400 (Level 6) / ₹19,900 - ₹63,200 (Level 2)',
    startDate: '2026-03-15',
    lastDate: '2026-04-25',
    examDate: '2026-07-05',
    applicationFeeGeneral: 100,
    applicationFeeReserved: 0,
    applicationFeeFemale: 0,
    officialNotificationUrl: 'https://drdo.gov.in',
    applyOnlineUrl: 'https://drdo.gov.in/ceptam-apply',
    selectionProcess: 'Tier-I (CBT), Tier-II (Trade / Skill Test)',
    status: 'PUBLISHED',
    isFeatured: false,
    isTrending: false,
    isUrgent: false,
    viewsCount: 45200,
    state: 'All India',
    category: 'Defence',
    createdAt: '2026-03-15T09:30:00Z',
  },
];

// Mock Exams
export const MOCK_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    name: 'SSC Combined Graduate Level (CGL)',
    slug: 'ssc-cgl',
    code: 'SSC-CGL',
    organizationId: 'org-ssc',
    organization: MOCK_ORGANIZATIONS.ssc,
    frequency: 'Annual',
    eligibilitySummary: 'Bachelor’s Degree in any discipline. Age 18-32 years.',
    selectionProcess: 'Tier 1 (Computer Based Test), Tier 2 (CBT + Typing Test)',
    examPatternSummary: 'Reasoning (50m), GA (50m), Quantitative Aptitude (50m), English (50m). Total 200 Marks.',
    isPopular: true,
    viewsCount: 350000,
  },
  {
    id: 'exam-2',
    name: 'UPSC Civil Services Preliminary & Mains (CSE)',
    slug: 'upsc-cse',
    code: 'UPSC-CSE',
    organizationId: 'org-upsc',
    organization: MOCK_ORGANIZATIONS.upsc,
    frequency: 'Annual',
    eligibilitySummary: 'Graduation in any stream. Age 21-32 years with permissible attempts.',
    selectionProcess: 'Prelims (GS + CSAT) -> Mains (9 Written Papers) -> Personality Interview',
    examPatternSummary: 'Prelims: 400 marks. Mains: 1750 marks. Interview: 275 marks.',
    isPopular: true,
    viewsCount: 520000,
  },
  {
    id: 'exam-3',
    name: 'RRB NTPC (Graduate & Under-Graduate)',
    slug: 'rrb-ntpc',
    code: 'RRB-NTPC',
    organizationId: 'org-rrb',
    organization: MOCK_ORGANIZATIONS.rrb,
    frequency: 'Bi-Annual / As Notified',
    eligibilitySummary: '12th Pass or Bachelor Degree from any recognized board/university.',
    selectionProcess: 'CBT Stage 1, CBT Stage 2, CBAT / Typing Test, Document Verification',
    examPatternSummary: 'CBT 1: 100 Questions (90 mins). CBT 2: 120 Questions (90 mins).',
    isPopular: true,
    viewsCount: 290000,
  },
  {
    id: 'exam-4',
    name: 'IBPS Probationary Officer (PO / MT)',
    slug: 'ibps-po',
    code: 'IBPS-PO',
    organizationId: 'org-ibps',
    organization: MOCK_ORGANIZATIONS.ibps,
    frequency: 'Annual',
    eligibilitySummary: 'Graduation Degree. Age limit 20 to 30 years.',
    selectionProcess: 'Prelims Exam (100 Qs) -> Mains Exam (200 Qs + Descriptive) -> Interview (100m)',
    examPatternSummary: 'Prelims 100 marks (1 hr), Mains 225 marks (3.5 hrs).',
    isPopular: true,
    viewsCount: 210000,
  },
  {
    id: 'exam-5',
    name: 'SSC Combined Higher Secondary Level (CHSL)',
    slug: 'ssc-chsl',
    code: 'SSC-CHSL',
    organizationId: 'org-ssc',
    organization: MOCK_ORGANIZATIONS.ssc,
    frequency: 'Annual',
    eligibilitySummary: '12th Standard or equivalent from a recognized board. Age 18-27.',
    selectionProcess: 'Tier 1 Objective Exam, Tier 2 Objective + Skill / Typing Test',
    examPatternSummary: 'Tier 1: 100 Questions, 200 Marks, 60 minutes.',
    isPopular: true,
    viewsCount: 180000,
  },
];

// Mock Tech Jobs
export const MOCK_TECH_JOBS: TechJob[] = [
  {
    id: 'tech-1',
    title: 'Full Stack Engineer (React + Node.js)',
    slug: 'full-stack-engineer-react-nodejs',
    company: 'TechCorp India',
    location: 'Bengaluru (Hybrid)',
    type: 'Full-time',
    salary: '₹12 - ₹20 LPA',
    experience: '2 - 5 Years',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    description: 'Looking for an ambitious Full Stack Developer to build high-scale cloud platforms.',
    applyUrl: 'https://careers.techcorp.in/jobs/1',
    featured: true,
    postedDate: '2026-03-02',
  },
  {
    id: 'tech-2',
    title: 'Junior Frontend Developer',
    slug: 'junior-frontend-developer',
    company: 'NextGen Solutions',
    location: 'Pune / Remote',
    type: 'Full-time',
    salary: '₹6 - ₹9 LPA',
    experience: '0 - 2 Years',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    description: 'Great opportunity for freshers and junior developers to join a high-growth tech startup.',
    applyUrl: 'https://nextgen.dev/careers',
    featured: true,
    postedDate: '2026-03-03',
  },
  {
    id: 'tech-3',
    title: 'Python / AI Backend Developer',
    slug: 'python-ai-backend-developer',
    company: 'Cognitive AI Labs',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹15 - ₹28 LPA',
    experience: '3 - 6 Years',
    skills: ['Python', 'FastAPI', 'PyTorch', 'LangChain', 'Docker'],
    description: 'Develop enterprise AI agentic workflows and scalable microservices.',
    applyUrl: 'https://cognitiveai.io/jobs/ai-dev',
    featured: false,
    postedDate: '2026-03-01',
  },
];

// Mock Tech Courses
export const MOCK_TECH_COURSES: TechCourse[] = [
  {
    id: 'course-1',
    title: 'Complete Modern Full-Stack Web Development 2026',
    slug: 'full-stack-web-dev-2026',
    provider: 'GovtPrep Tech Academy',
    level: 'Beginner to Advanced',
    duration: '40 Hours',
    rating: 4.9,
    reviewCount: 3420,
    tags: ['React', 'TypeScript', 'Node.js', 'Next.js', 'SQL'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    enrollUrl: '#',
    isFree: true,
  },
  {
    id: 'course-2',
    title: 'Data Structures & Algorithms in C++ & Java (Placement Ready)',
    slug: 'dsa-placement-masterclass',
    provider: 'Coding Champions',
    level: 'Intermediate',
    duration: '65 Hours',
    rating: 4.8,
    reviewCount: 5120,
    tags: ['DSA', 'LeetCode', 'Algorithms', 'C++', 'Java'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    enrollUrl: '#',
    isFree: false,
  },
  {
    id: 'course-3',
    title: 'Python for Data Science & AI Fundamentals',
    slug: 'python-data-science-ai',
    provider: 'GovtPrep Tech Academy',
    level: 'Beginner',
    duration: '28 Hours',
    rating: 4.7,
    reviewCount: 2190,
    tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    enrollUrl: '#',
    isFree: true,
  },
];

// Mock Internships
export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    title: 'Software Development Intern (React / Python)',
    slug: 'software-dev-intern',
    company: 'GovtTech Solutions',
    location: 'Remote',
    stipend: '₹25,000 / Month',
    duration: '3 Months (PPO Opportunity)',
    skills: ['React', 'Python', 'Git', 'REST APIs'],
    applyBy: '2026-03-31',
    applyUrl: '#',
    postedDate: '2026-03-01',
  },
  {
    id: 'intern-2',
    title: 'Data Analytics & Research Intern',
    slug: 'data-analytics-intern',
    company: 'Bharat Policy Institute',
    location: 'New Delhi / Hybrid',
    stipend: '₹20,000 / Month',
    duration: '6 Months',
    skills: ['Excel', 'SQL', 'Python', 'PowerBI'],
    applyBy: '2026-04-15',
    applyUrl: '#',
    postedDate: '2026-03-02',
  },
];

// Mock Tests
export const MOCK_TESTS: MockTest[] = [
  {
    id: 'test-1',
    title: 'SSC CGL 2026 Full Length Tier-1 Mock Test 01',
    slug: 'ssc-cgl-tier-1-mock-01',
    examName: 'SSC CGL 2026',
    durationMinutes: 60,
    totalMarks: 200,
    totalQuestions: 100,
    positiveMarks: 2,
    negativeMarks: 0.5,
    difficulty: 'Moderate',
    isFree: true,
    attemptsCount: 18450,
  },
  {
    id: 'test-2',
    title: 'RRB NTPC CBT-1 All India Grand Mock Test',
    slug: 'rrb-ntpc-cbt1-grand-mock',
    examName: 'RRB NTPC',
    durationMinutes: 90,
    totalMarks: 100,
    totalQuestions: 100,
    positiveMarks: 1,
    negativeMarks: 0.33,
    difficulty: 'Standard',
    isFree: true,
    attemptsCount: 22140,
  },
  {
    id: 'test-3',
    title: 'IBPS PO Prelims 2026 Speed & Accuracy Test',
    slug: 'ibps-po-prelims-mock-01',
    examName: 'IBPS PO',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 100,
    positiveMarks: 1,
    negativeMarks: 0.25,
    difficulty: 'Hard',
    isFree: true,
    attemptsCount: 14300,
  },
  {
    id: 'test-4',
    title: 'Daily Current Affairs & Static GK Booster Test',
    slug: 'daily-current-affairs-gk-test',
    examName: 'General Awareness',
    durationMinutes: 20,
    totalMarks: 50,
    totalQuestions: 25,
    positiveMarks: 2,
    negativeMarks: 0.5,
    difficulty: 'Easy to Moderate',
    isFree: true,
    attemptsCount: 45900,
  },
];

// Mock Results
export const MOCK_RESULTS: ResultItem[] = [
  {
    id: 'res-1',
    title: 'SSC CGL 2025 Final Result & Merit List Released',
    organization: 'SSC',
    slug: 'ssc-cgl-2025-final-result',
    releaseDate: '2026-03-02',
    directDownloadUrl: '#',
    status: 'DECLARED',
  },
  {
    id: 'res-2',
    title: 'UPSC CSE 2025 Mains Examination Result Declared with Cutoff',
    organization: 'UPSC',
    slug: 'upsc-cse-2025-mains-result',
    releaseDate: '2026-03-01',
    directDownloadUrl: '#',
    status: 'DECLARED',
  },
  {
    id: 'res-3',
    title: 'IBPS Clerk CRP XIII Final Allotment List Out',
    organization: 'IBPS',
    slug: 'ibps-clerk-crp-xiii-final-result',
    releaseDate: '2026-02-28',
    directDownloadUrl: '#',
    status: 'DECLARED',
  },
  {
    id: 'res-4',
    title: 'RRB Group D Physical Efficiency Test (PET) Result',
    organization: 'RRB',
    slug: 'rrb-group-d-pet-result',
    releaseDate: '2026-02-25',
    directDownloadUrl: '#',
    status: 'DECLARED',
  },
];

// Mock Admit Cards
export const MOCK_ADMIT_CARDS: AdmitCardItem[] = [
  {
    id: 'ac-1',
    title: 'UPSC Civil Services Prelims 2026 Hall Ticket Download',
    organization: 'UPSC',
    slug: 'upsc-cse-prelims-2026-admit-card',
    releaseDate: '2026-03-01',
    examDate: '2026-05-24',
    downloadUrl: '#',
    status: 'LIVE',
  },
  {
    id: 'ac-2',
    title: 'SSC Selection Post Phase XII Tier 1 Admit Card',
    organization: 'SSC',
    slug: 'ssc-selection-post-phase-xii-admit-card',
    releaseDate: '2026-03-03',
    examDate: '2026-04-12',
    downloadUrl: '#',
    status: 'LIVE',
  },
  {
    id: 'ac-3',
    title: 'SBI Clerk Mains 2026 Call Letter Download Active',
    organization: 'SBI',
    slug: 'sbi-clerk-mains-2026-admit-card',
    releaseDate: '2026-02-26',
    examDate: '2026-03-20',
    downloadUrl: '#',
    status: 'LIVE',
  },
];

// Mock Answer Keys
export const MOCK_ANSWER_KEYS: AnswerKeyItem[] = [
  {
    id: 'ak-1',
    title: 'SSC GD Constable 2026 Official Provisional Answer Key & Objection Link',
    organization: 'SSC',
    slug: 'ssc-gd-constable-2026-answer-key',
    releaseDate: '2026-03-04',
    objectionLastDate: '2026-03-10',
    downloadUrl: '#',
  },
  {
    id: 'ak-2',
    title: 'RRB ALP Stage 1 CBT Final Answer Key & Response Sheet',
    organization: 'RRB',
    slug: 'rrb-alp-cbt-1-answer-key',
    releaseDate: '2026-02-27',
    objectionLastDate: '2026-03-05',
    downloadUrl: '#',
  },
  {
    id: 'ak-3',
    title: 'CTET January 2026 Official Answer Key & Scanned OMR Sheet',
    organization: 'CBSE',
    slug: 'ctet-jan-2026-answer-key',
    releaseDate: '2026-02-20',
    objectionLastDate: '2026-02-25',
    downloadUrl: '#',
  },
];

// Mock Current Affairs
export const MOCK_CURRENT_AFFAIRS: CurrentAffair[] = [
  {
    id: 'ca-1',
    title: 'Union Budget 2026-27: Major Highlights for Govt Exams & Key Allocations',
    slug: 'union-budget-2026-highlights-exams',
    category: 'Economy & National',
    summary: 'Comprehensive analysis of key announcements, infrastructure budgets, education allocations, and taxation changes crucial for SSC, UPSC, and Banking exams.',
    content: 'The Union Finance Minister presented the Annual Financial Statement for FY 2026-27 with high focus on digital public infrastructure, youth employment, and defence modernization...',
    publishedAt: '2026-03-03',
    readTime: '4 min read',
    tags: ['Union Budget', 'Economy', 'UPSC', 'SSC'],
  },
  {
    id: 'ca-2',
    title: 'ISRO Chandrayaan-4 & Gaganyaan Mission Timeline Updated: Key Scientific Facts',
    slug: 'isro-chandrayaan-4-gaganyaan-updates',
    category: 'Science & Technology',
    summary: 'Essential science and technology updates on ISRO’s upcoming sample return lunar mission and crewed orbital flight tests.',
    content: 'ISRO Chairman announced readiness milestones for the Gaganyaan uncrewed test flight and orbital docking demonstration...',
    publishedAt: '2026-03-02',
    readTime: '3 min read',
    tags: ['ISRO', 'Space', 'Science & Tech'],
  },
  {
    id: 'ca-3',
    title: 'ICC Champions Trophy 2026: Records, Host Cities, and Sports Current Affairs',
    slug: 'icc-champions-trophy-2026-sports-gk',
    category: 'Sports',
    summary: 'Quick revision points on champions trophy tournaments, venues, winners list, and upcoming international sports summits.',
    content: 'A detailed recap of the championship, player of the tournament statistics, and sports GK questions frequently asked in RRB NTPC and SSC exams.',
    publishedAt: '2026-03-01',
    readTime: '2 min read',
    tags: ['Sports', 'Cricket', 'Static GK'],
  },
];

// Async Dynamic Data API Layer
export const dataService = {
  async getJobs(): Promise<Job[]> {
    try {
      const data = await apiRequest<Job[]>('/jobs');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Resilient fallback
    }
    return MOCK_JOBS;
  },

  async getJobBySlug(slug: string): Promise<Job | undefined> {
    try {
      const data = await apiRequest<Job>(`/jobs/${slug}`);
      if (data) return data;
    } catch {
      // Fallback
    }
    return MOCK_JOBS.find((j) => j.slug === slug);
  },

  async getFeaturedJobs(): Promise<Job[]> {
    try {
      const jobs = await this.getJobs();
      return jobs.filter((j) => j.isFeatured);
    } catch {
      return MOCK_JOBS.filter((j) => j.isFeatured);
    }
  },

  async getExams(): Promise<Exam[]> {
    try {
      const data = await apiRequest<Exam[]>('/exams');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return MOCK_EXAMS;
  },

  async getExamBySlug(slug: string): Promise<Exam | undefined> {
    try {
      const data = await apiRequest<Exam>(`/exams/${slug}`);
      if (data) return data;
    } catch {
      // Fallback
    }
    return MOCK_EXAMS.find((e) => e.slug === slug);
  },

  async getTechJobs(): Promise<TechJob[]> {
    try {
      const data = await apiRequest<TechJob[]>('/tech-jobs');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return MOCK_TECH_JOBS;
  },

  async getTechCourses(): Promise<TechCourse[]> {
    try {
      const data = await apiRequest<TechCourse[]>('/content/tech-courses');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return MOCK_TECH_COURSES;
  },

  async getInternships(): Promise<Internship[]> {
    try {
      const data = await apiRequest<Internship[]>('/content/internships');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return MOCK_INTERNSHIPS;
  },

  async getMockTests(): Promise<MockTest[]> {
    try {
      const data = await apiRequest<MockTest[]>('/tests');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return MOCK_TESTS;
  },

  async getMockTestBySlug(slug: string): Promise<MockTest | undefined> {
    try {
      const data = await apiRequest<MockTest>(`/tests/${slug}`);
      if (data) return data;
    } catch {
      // Fallback
    }
    return MOCK_TESTS.find((t) => t.slug === slug);
  },

  async submitMockTest(slug: string, submission: { answers: Record<string, string>; timeTakenSeconds: number; candidateName?: string }) {
    try {
      return await apiRequest<any>(`/tests/${slug}/submit`, {
        method: 'POST',
        body: JSON.stringify(submission),
      });
    } catch (e) {
      console.warn('Backend test submit failed, fallback to client calculations', e);
      return null;
    }
  },

  async getStats() {
    try {
      const stats = await apiRequest<any>('/content/stats');
      if (stats) return stats;
    } catch {
      // Fallback
    }
    return {
      activeVacancies: 148520,
      totalJobs: 24,
      totalExams: 18,
      totalMockTests: 12,
      totalTestAttempts: 42950,
      activeAspirantsOnline: 350,
      verifiedUpdatesToday: 18,
      avgAccuracyRate: '78.4%',
    };
  },

  async getTickers(): Promise<{ id: string; title: string; link: string; tag: string }[]> {
    try {
      const tickers = await apiRequest<any[]>('/content/tickers');
      if (Array.isArray(tickers) && tickers.length > 0) return tickers;
    } catch {
      // Fallback
    }
    return [
      { id: '1', title: 'SSC CGL 2026 Tier-1 Direct Admit Card Download Live', link: '/admit-cards', tag: 'URGENT' },
      { id: '2', title: 'Railway RRB NTPC 11,558 Vacancies Application Portal Closing Soon', link: '/jobs', tag: 'DEADLINE' },
      { id: '3', title: 'UPSC Civil Services Prelims 2026 Notification & Syllabus PDF Released', link: '/syllabus', tag: 'NEW' },
      { id: '4', title: 'IBPS PO 2026 Final Merit List & Cutoff Marks Declared', link: '/results', tag: 'RESULT' },
    ];
  },

  async getLeaderboard(): Promise<any[]> {
    try {
      const data = await apiRequest<any[]>('/content/leaderboard');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return [
      { id: '1', rank: 1, name: 'Aditya Sharma', state: 'Uttar Pradesh', score: 194.5, accuracy: '98.2%', streakDays: 42, avatar: '👨‍🎓' },
      { id: '2', rank: 2, name: 'Pooja Deshmukh', state: 'Maharashtra', score: 191.0, accuracy: '96.5%', streakDays: 38, avatar: '👩‍🎓' },
      { id: '3', rank: 3, name: 'Vikram Singh Rawat', state: 'Rajasthan', score: 188.0, accuracy: '95.0%', streakDays: 35, avatar: '👨‍🎓' },
      { id: '4', rank: 4, name: 'Ananya Roy', state: 'West Bengal', score: 184.5, accuracy: '94.2%', streakDays: 29, avatar: '👩‍🎓' },
    ];
  },

  async submitLeaderboard(entry: { name: string; state?: string; score: number; accuracy?: string }) {
    try {
      return await apiRequest<any>('/content/leaderboard', {
        method: 'POST',
        body: JSON.stringify(entry),
      });
    } catch {
      return null;
    }
  },

  async getFlashcards(): Promise<any[]> {
    try {
      const data = await apiRequest<any[]>('/content/flashcards');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return [];
  },

  async getTypingPassages(): Promise<any[]> {
    try {
      const data = await apiRequest<any[]>('/content/typing-passages');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return [];
  },

  async getQuizQuestions(): Promise<any[]> {
    try {
      const data = await apiRequest<any[]>('/content/quiz-questions');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return [];
  },

  async getSyllabus(): Promise<any[]> {
    try {
      const data = await apiRequest<any[]>('/content/syllabus');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return [];
  },

  async getPreviousPapers(): Promise<any[]> {
    try {
      const data = await apiRequest<any[]>('/content/previous-papers');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback
    }
    return [];
  },

  async getResults(): Promise<ResultItem[]> {
    return MOCK_RESULTS;
  },

  async getAdmitCards(): Promise<AdmitCardItem[]> {
    return MOCK_ADMIT_CARDS;
  },

  async getAnswerKeys(): Promise<AnswerKeyItem[]> {
    return MOCK_ANSWER_KEYS;
  },

  async getCurrentAffairs(): Promise<CurrentAffair[]> {
    try {
      const data = await apiRequest<any[]>('/content/current-affairs');
      if (Array.isArray(data) && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          title: d.title,
          slug: d.id,
          category: d.category,
          summary: d.summary,
          content: d.summary,
          publishedAt: d.date || '2026-03-05',
          readTime: d.readTime || '3 min read',
          tags: d.tags || ['GK'],
        }));
      }
    } catch {
      // Fallback
    }
    return MOCK_CURRENT_AFFAIRS;
  },

  async searchAll(query: string) {
    const q = query.toLowerCase();
    const [jobs, exams, techJobs] = await Promise.all([
      this.getJobs(),
      this.getExams(),
      this.getTechJobs(),
    ]);

    const filteredJobs = jobs.filter(
      (j) => j.title.toLowerCase().includes(q) || (j.organization?.name || '').toLowerCase().includes(q) || (j.qualification || '').toLowerCase().includes(q)
    );
    const filteredExams = exams.filter((e) => e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q));
    const filteredTech = techJobs.filter((t) => t.title.toLowerCase().includes(q) || t.skills.some((s) => s.toLowerCase().includes(q)));
    return { jobs: filteredJobs, exams: filteredExams, techJobs: filteredTech };
  },
};

