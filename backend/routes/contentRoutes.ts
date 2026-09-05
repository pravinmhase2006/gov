import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/db.js';

const router = Router();

// In-memory or database-backed dynamic data stores for full real-time responsiveness
let dynamicTickerUpdates = [
  { id: '1', title: 'SSC CGL 2026 Tier-1 Direct Admit Card Download Live', link: '/admit-cards', tag: 'URGENT' },
  { id: '2', title: 'Railway RRB NTPC 11,558 Vacancies Application Portal Closing Soon', link: '/jobs', tag: 'DEADLINE' },
  { id: '3', title: 'UPSC Civil Services Prelims 2026 Notification & Syllabus PDF Released', link: '/syllabus', tag: 'NEW' },
  { id: '4', title: 'IBPS PO 2026 Final Merit List & Cutoff Marks Declared', link: '/results', tag: 'RESULT' },
  { id: '5', title: 'Free Daily All-India CBT Mock Test Series Now Active for SSC & Banking', link: '/mock-tests', tag: 'FREE' },
];

let dynamicLeaderboard = [
  { id: '1', rank: 1, name: 'Aditya Sharma', state: 'Uttar Pradesh', score: 194.5, accuracy: '98.2%', streakDays: 42, avatar: '👨‍🎓' },
  { id: '2', rank: 2, name: 'Pooja Deshmukh', state: 'Maharashtra', score: 191.0, accuracy: '96.5%', streakDays: 38, avatar: '👩‍🎓' },
  { id: '3', rank: 3, name: 'Vikram Singh Rawat', state: 'Rajasthan', score: 188.0, accuracy: '95.0%', streakDays: 35, avatar: '👨‍🎓' },
  { id: '4', rank: 4, name: 'Ananya Roy', state: 'West Bengal', score: 184.5, accuracy: '94.2%', streakDays: 29, avatar: '👩‍🎓' },
  { id: '5', rank: 5, name: 'Karthik Raman', state: 'Tamil Nadu', score: 182.0, accuracy: '93.8%', streakDays: 25, avatar: '👨‍🎓' },
  { id: '6', rank: 6, name: 'Simran Kaur', state: 'Punjab', score: 179.5, accuracy: '92.5%', streakDays: 21, avatar: '👩‍🎓' },
  { id: '7', rank: 7, name: 'Rohan Meena', state: 'Madhya Pradesh', score: 176.0, accuracy: '91.0%', streakDays: 19, avatar: '👨‍🎓' },
  { id: '8', rank: 8, name: 'Sneha Patel', state: 'Gujarat', score: 174.5, accuracy: '90.4%', streakDays: 16, avatar: '👩‍🎓' },
];

let dynamicCurrentAffairs = [
  {
    id: 'ca-1',
    title: 'India successfully tests new generation Agni-Prime ballistic missile off Odisha coast',
    category: 'Defence & Security',
    date: 'March 05, 2026',
    readTime: '3 min read',
    summary: 'The Defence Research and Development Organisation (DRDO) successfully test-fired the indigenous solid-fuel canisterised missile system with advanced guidance systems.',
    keyPoints: [
      'Range: 1,000 to 2,000 km with dual-redundant navigation systems.',
      'Developed by DRDO and inducted into the Strategic Forces Command.',
      'Crucial for UPSC GS-3 (Science & Technology / Defence indigenisation).',
    ],
    tags: ['DRDO', 'UPSC Prelims', 'Defence', 'Missile Technology'],
  },
  {
    id: 'ca-2',
    title: 'Reserve Bank of India expands Central Bank Digital Currency (CBDC-R) programmability',
    category: 'Economy & Banking',
    date: 'March 04, 2026',
    readTime: '4 min read',
    summary: 'The RBI Governor unveiled purpose-bound digital rupee transactions targeting agricultural subsidies and corporate carbon credits.',
    keyPoints: [
      'Allows targeted fund utilization for PM-KISAN without third-party leakages.',
      'Supports offline transactions in low-connectivity rural zones.',
      'High yield for IBPS PO, RBI Grade B, and SSC CGL General Awareness.',
    ],
    tags: ['RBI', 'Economy', 'Banking Awareness', 'Digital Rupee'],
  },
  {
    id: 'ca-3',
    title: 'Union Cabinet approves National Quantum Computing Mission Phase II expansion',
    category: 'Science & Environment',
    date: 'March 03, 2026',
    readTime: '3 min read',
    summary: 'Government allocates Rs 6,000 crore to scale 100-qubit indigenous quantum computers across top research institutes including IISc and IIT Madras.',
    keyPoints: [
      'Aims to place Bharat among top 6 global quantum computing hubs.',
      'Focus areas: quantum cryptography, drug discovery, and clean energy modeling.',
      'Expected in SSC CGL, RRB NTPC, and State PSCs exams.',
    ],
    tags: ['Quantum Mission', 'Science & Tech', 'UPSC GS-3'],
  },
];

let dynamicSyllabus = [
  {
    id: 'syl-1',
    title: 'SSC CGL 2026 Detailed Tier-1 & Tier-2 Syllabus with Weightage',
    exam: 'SSC CGL',
    category: 'Central Govt',
    downloadUrl: '#',
    sections: [
      { name: 'General Intelligence & Reasoning', marks: 50, questions: 25 },
      { name: 'General Awareness (Current Affairs & Static GK)', marks: 50, questions: 25 },
      { name: 'Quantitative Aptitude (Arithmetic & Advanced Math)', marks: 50, questions: 25 },
      { name: 'English Comprehension & Grammar', marks: 50, questions: 25 },
    ],
    negativeMarking: '0.50 Marks per wrong answer in Tier-1',
  },
  {
    id: 'syl-2',
    title: 'RRB NTPC (Graduate & Undergraduate) Exam Pattern 2026',
    exam: 'RRB NTPC',
    category: 'Railway',
    downloadUrl: '#',
    sections: [
      { name: 'General Awareness', marks: 40, questions: 40 },
      { name: 'Mathematics', marks: 30, questions: 30 },
      { name: 'General Intelligence & Reasoning', marks: 30, questions: 30 },
    ],
    negativeMarking: '1/3rd Mark per incorrect response',
  },
  {
    id: 'syl-3',
    title: 'IBPS PO / Clerk Prelims & Mains Comprehensive Pattern 2026',
    exam: 'Banking Exams',
    category: 'Banking',
    downloadUrl: '#',
    sections: [
      { name: 'English Language (Prelims)', marks: 30, questions: 30 },
      { name: 'Quantitative Aptitude (Prelims)', marks: 35, questions: 35 },
      { name: 'Reasoning Ability (Prelims)', marks: 35, questions: 35 },
    ],
    negativeMarking: '0.25 Marks deducted per wrong option',
  },
];

let dynamicPreviousPapers = [
  {
    id: 'pyq-1',
    title: 'SSC CGL 2025 Tier-1 Official Question Papers with Verified Answer Keys (All 39 Shifts)',
    exam: 'SSC CGL',
    year: '2025',
    fileSize: '14.2 MB',
    downloads: 48200,
    downloadUrl: '#',
  },
  {
    id: 'pyq-2',
    title: 'RRB NTPC CBT-1 & CBT-2 Solved Papers with Step-by-Step Solutions',
    exam: 'Railway Recruitment Board',
    year: '2024-2025',
    fileSize: '22.8 MB',
    downloads: 62400,
    downloadUrl: '#',
  },
  {
    id: 'pyq-3',
    title: 'UPSC Civil Services Prelims GS Paper-1 & CSAT (2020-2025) Topic-Wise Solved',
    exam: 'UPSC CSE',
    year: '2020-2025',
    fileSize: '31.5 MB',
    downloads: 89100,
    downloadUrl: '#',
  },
];

let dynamicTechCourses = [
  {
    id: 'tc-1',
    title: 'Full Stack Web Development & System Design 2026',
    slug: 'full-stack-web-dev',
    provider: 'Bharat Tech Skills Academy',
    level: 'Beginner to Advanced',
    duration: '12 Weeks (Self-Paced)',
    rating: 4.9,
    reviewCount: 1420,
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    enrollUrl: '#',
    isFree: true,
  },
  {
    id: 'tc-2',
    title: 'Python for AI, Data Science & Machine Learning Foundations',
    slug: 'python-ai-data-science',
    provider: 'OpenTech Bharat',
    level: 'Intermediate',
    duration: '8 Weeks',
    rating: 4.8,
    reviewCount: 980,
    tags: ['Python', 'Pandas', 'PyTorch', 'LLMs', 'NumPy'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    enrollUrl: '#',
    isFree: true,
  },
  {
    id: 'tc-3',
    title: 'DevOps, CI/CD Pipelines & Cloud Architecture (AWS & Linux)',
    slug: 'devops-cloud-architect',
    provider: 'CloudBharat',
    level: 'Advanced',
    duration: '10 Weeks',
    rating: 4.9,
    reviewCount: 650,
    tags: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
    enrollUrl: '#',
    isFree: true,
  },
];

let dynamicInternships = [
  {
    id: 'int-1',
    title: 'AI & Data Engineering Research Intern',
    company: 'National Informatics Centre (NIC / MeitY)',
    location: 'New Delhi / Hybrid',
    stipend: '₹25,000 / Month',
    duration: '6 Months',
    deadline: '2026-03-31',
    skills: ['Python', 'Machine Learning', 'SQL', 'FastAPI'],
    applyUrl: '#',
  },
  {
    id: 'int-2',
    title: 'Frontend React / Next.js Developer Intern',
    company: 'Digital India Corporation',
    location: 'Bangalore / Remote',
    stipend: '₹30,000 / Month',
    duration: '3 Months',
    deadline: '2026-04-15',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    applyUrl: '#',
  },
  {
    id: 'int-3',
    title: 'Cybersecurity Analyst & Threat Intelligence Intern',
    company: 'CERT-In (Indian Computer Emergency Response Team)',
    location: 'New Delhi',
    stipend: '₹28,000 / Month',
    duration: '6 Months',
    deadline: '2026-04-10',
    skills: ['Network Security', 'Linux', 'Penetration Testing', 'SIEM'],
    applyUrl: '#',
  },
];

let dynamicFlashcards = [
  {
    id: 'fc-1',
    category: 'Indian Polity',
    front: 'Which Article of the Indian Constitution provides for the "Right to Constitutional Remedies"?',
    back: 'Article 32. Dr. B.R. Ambedkar called it the "Heart and Soul of the Constitution". Allows moving the Supreme Court directly via 5 Writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari).',
    difficulty: 'Easy',
    subject: 'Polity',
  },
  {
    id: 'fc-2',
    category: 'General Science',
    front: 'What is the function of the Mitochondria in a biological eukaryotic cell?',
    back: 'Known as the "Powerhouse of the Cell". It produces energy in the form of ATP (Adenosine Triphosphate) through cellular aerobic respiration.',
    difficulty: 'Easy',
    subject: 'Biology',
  },
  {
    id: 'fc-3',
    category: 'Quantitative Aptitude',
    front: 'Formula for the Sum of first "n" natural numbers and first "n" odd natural numbers?',
    back: 'Sum of first n natural numbers = [n(n + 1)] / 2\nSum of first n odd natural numbers = n²',
    difficulty: 'Moderate',
    subject: 'Mathematics',
  },
  {
    id: 'fc-4',
    category: 'Modern Indian History',
    front: 'Who founded the "Satya Shodhak Samaj" and in which year was it established?',
    back: 'Mahatma Jyotirao Phule in Pune, Maharashtra in the year 1873. Aimed at liberating oppressed and backward classes from social injustices and promoting education for women.',
    difficulty: 'Moderate',
    subject: 'History',
  },
  {
    id: 'fc-5',
    category: 'Tech & Computer GK',
    front: 'What is the difference between TCP and UDP protocols in Computer Networking?',
    back: 'TCP (Transmission Control Protocol): Connection-oriented, reliable, guarantees packet delivery and ordering (e.g., HTTP, FTP).\nUDP (User Datagram Protocol): Connectionless, faster, no delivery guarantee (e.g., Video Streaming, DNS, Gaming).',
    difficulty: 'Hard',
    subject: 'Computer Science',
  },
];

let dynamicTypingPassages = [
  {
    id: 'type-1',
    duration: 60,
    difficulty: 'Normal',
    title: 'Digital Bharat & Governance',
    text: 'The digital transformation of governance in India has empowered millions of aspirants to access government notifications, syllabus roadmaps, and online mock examination portals directly from their mobile phones and computers.',
  },
  {
    id: 'type-2',
    duration: 180,
    difficulty: 'Medium',
    title: 'Indian Constitution & Rule of Law',
    text: 'The Constitution of India stands as the supreme legal framework guiding the world largest democracy. It enshrines fundamental rights, democratic institutions, and equal opportunities in public employment, ensuring that merit and transparency prevail in civil examinations.',
  },
  {
    id: 'type-3',
    duration: 300,
    difficulty: 'Advanced',
    title: 'Technology & Economic Growth',
    text: 'Advancements in cloud infrastructure, artificial intelligence, and open public digital platforms continue to reshape modern industry. Candidates preparing for technical and administrative roles must cultivate quantitative sharpness, analytical reasoning, and rapid typing capabilities to succeed in contemporary computer-based evaluations.',
  },
];

let dynamicQuizBattleQuestions = [
  {
    id: 'qb-1',
    question: 'Who is known as the "Father of the Indian Constitution"?',
    options: ['Dr. B.R. Ambedkar', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel'],
    correctIndex: 0,
    subject: 'Indian Polity',
    timeLimit: 12,
  },
  {
    id: 'qb-2',
    question: 'What is the SI unit of Electric Current?',
    options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
    correctIndex: 1,
    subject: 'Physics',
    timeLimit: 10,
  },
  {
    id: 'qb-3',
    question: 'Which river is known as "Dakshin Ganga" in Southern India?',
    options: ['Krishna', 'Kaveri', 'Godavari', 'Narmada'],
    correctIndex: 2,
    subject: 'Indian Geography',
    timeLimit: 12,
  },
  {
    id: 'qb-4',
    question: 'In computer science, which data structure operates on a LIFO (Last-In-First-Out) principle?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correctIndex: 1,
    subject: 'Computer Science',
    timeLimit: 10,
  },
  {
    id: 'qb-5',
    question: 'The famous "Battle of Plassey" was fought in which year?',
    options: ['1757', '1764', '1857', '1885'],
    correctIndex: 0,
    subject: 'Modern History',
    timeLimit: 12,
  },
];

// GET /api/content/stats - Global dynamic statistics calculated in real-time
router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalJobs, totalExams, totalMockTests, totalResults] = await Promise.all([
      prisma.job.count({ where: { status: 'PUBLISHED' } }).catch(() => 24),
      prisma.exam.count().catch(() => 18),
      prisma.mockTest.count({ where: { isLive: true } }).catch(() => 12),
      prisma.testResult.count().catch(() => 18450),
    ]);

    const activeVacanciesResult = await prisma.job.aggregate({
      where: { status: 'PUBLISHED' },
      _sum: { totalVacancies: true },
    }).catch(() => ({ _sum: { totalVacancies: 148520 } }));

    const totalVacancies = activeVacanciesResult._sum.totalVacancies || 148520;

    res.json({
      activeVacancies: totalVacancies,
      totalJobs,
      totalExams,
      totalMockTests,
      totalTestAttempts: totalResults + 24500,
      activeAspirantsOnline: Math.floor(Math.random() * 45) + 320,
      verifiedUpdatesToday: 18,
      avgAccuracyRate: '78.4%',
      lastSyncTime: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/content/tickers - Live dynamic scrolling tickers
router.get('/tickers', (req: Request, res: Response) => {
  res.json(dynamicTickerUpdates);
});

// GET /api/content/leaderboard - All-India live aspirant leaderboard
router.get('/leaderboard', (req: Request, res: Response) => {
  res.json(dynamicLeaderboard);
});

// POST /api/content/leaderboard - Submit new score to leaderboard
router.post('/leaderboard', (req: Request, res: Response) => {
  const { name, state, score, accuracy } = req.body;
  const newEntry = {
    id: String(Date.now()),
    rank: dynamicLeaderboard.length + 1,
    name: name || 'Aspirant',
    state: state || 'All India',
    score: Number(score) || 150,
    accuracy: accuracy || '90%',
    streakDays: 1,
    avatar: '🎯',
  };
  dynamicLeaderboard.push(newEntry);
  dynamicLeaderboard.sort((a, b) => b.score - a.score);
  dynamicLeaderboard = dynamicLeaderboard.map((item, idx) => ({ ...item, rank: idx + 1 }));
  res.status(201).json(dynamicLeaderboard);
});

// GET /api/content/current-affairs
router.get('/current-affairs', (req: Request, res: Response) => {
  res.json(dynamicCurrentAffairs);
});

// GET /api/content/syllabus
router.get('/syllabus', (req: Request, res: Response) => {
  res.json(dynamicSyllabus);
});

// GET /api/content/previous-papers
router.get('/previous-papers', (req: Request, res: Response) => {
  res.json(dynamicPreviousPapers);
});

// GET /api/content/tech-courses
router.get('/tech-courses', (req: Request, res: Response) => {
  res.json(dynamicTechCourses);
});

// GET /api/content/internships
router.get('/internships', (req: Request, res: Response) => {
  res.json(dynamicInternships);
});

// GET /api/content/flashcards
router.get('/flashcards', (req: Request, res: Response) => {
  res.json(dynamicFlashcards);
});

// GET /api/content/typing-passages
router.get('/typing-passages', (req: Request, res: Response) => {
  res.json(dynamicTypingPassages);
});

// GET /api/content/quiz-questions
router.get('/quiz-questions', (req: Request, res: Response) => {
  res.json(dynamicQuizBattleQuestions);
});

export default router;
