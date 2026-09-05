import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/db.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Helper to generate URL-safe slugs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// All admin routes require ADMIN role
router.use(requireAdmin);

// ==========================================
// 1. ANALYTICS & DASHBOARD METRICS
// ==========================================
router.get('/analytics', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      totalUsers,
      totalJobs,
      totalExams,
      totalMockTests,
      totalTestResults,
      totalTechJobs,
      recentUsers,
      recentJobs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.job.count(),
      prisma.exam.count(),
      prisma.mockTest.count(),
      prisma.testResult.count(),
      prisma.techJob.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
      prisma.job.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { organization: true },
      }),
    ]);

    const activeAspirantsEstimate = Math.max(180, totalUsers * 12 + 45);

    res.json({
      stats: {
        totalUsers,
        totalJobs,
        totalExams,
        totalMockTests,
        totalTestResults,
        totalTechJobs,
        activeAspirantsEstimate,
      },
      recentUsers,
      recentJobs,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 2. USER MANAGEMENT CRUD
// ==========================================
// GET /api/admin/users - List users
router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const where: any = {};
    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      take: 100,
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/users/:id/role - Update user role (ADMIN / USER)
router.put('/users/:id/role', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const { role } = req.body;

    if (role !== 'USER' && role !== 'ADMIN') {
      return res.status(400).json({ message: 'Invalid role. Must be USER or ADMIN' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/users/:id - Delete a user
router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 3. JOB NOTIFICATIONS CRUD
// ==========================================
// GET /api/admin/jobs
router.get('/jobs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/jobs - Create new Job
router.post('/jobs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      organizationName,
      organizationShortName,
      postName,
      totalVacancies,
      qualification,
      ageLimitMin,
      ageLimitMax,
      salaryText,
      startDate,
      lastDate,
      examDate,
      officialNotificationUrl,
      applyOnlineUrl,
      selectionProcess,
      category,
      state,
      isFeatured,
      isTrending,
    } = req.body;

    if (!title || !postName) {
      return res.status(400).json({ message: 'Title and Post Name are required' });
    }

    // Find or create organization
    let org = await prisma.organization.findFirst({
      where: {
        OR: [
          { shortName: organizationShortName || organizationName || 'Govt' },
          { name: organizationName || 'Government Board' },
        ],
      },
    });

    if (!org) {
      org = await prisma.organization.create({
        data: {
          name: organizationName || 'Government Recruitment Board',
          shortName: organizationShortName || 'Govt',
          category: category || 'Central Govt',
        },
      });
    }

    const baseSlug = slugify(title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newJob = await prisma.job.create({
      data: {
        title,
        slug: uniqueSlug,
        organizationId: org.id,
        postName: postName || 'Various Posts',
        totalVacancies: Number(totalVacancies) || 100,
        qualification: qualification || "Bachelor's Degree in any discipline",
        ageLimitMin: Number(ageLimitMin) || 18,
        ageLimitMax: Number(ageLimitMax) || 30,
        salaryText: salaryText || 'Rs. 44,900 - 1,42,400 (Level 7)',
        startDate: startDate || new Date().toISOString().split('T')[0],
        lastDate: lastDate || '2026-06-30',
        examDate: examDate || null,
        officialNotificationUrl: officialNotificationUrl || null,
        applyOnlineUrl: applyOnlineUrl || null,
        selectionProcess: selectionProcess || 'Written Exam -> Document Verification',
        category: category || 'Central Govt',
        state: state || 'All India',
        isFeatured: Boolean(isFeatured),
        isTrending: Boolean(isTrending),
      },
      include: { organization: true },
    });

    res.status(201).json(newJob);
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/jobs/:id - Update Job
router.put('/jobs/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = req.body;

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.postName !== undefined) updateData.postName = data.postName;
    if (data.totalVacancies !== undefined) updateData.totalVacancies = Number(data.totalVacancies);
    if (data.qualification !== undefined) updateData.qualification = data.qualification;
    if (data.ageLimitMin !== undefined) updateData.ageLimitMin = Number(data.ageLimitMin);
    if (data.ageLimitMax !== undefined) updateData.ageLimitMax = Number(data.ageLimitMax);
    if (data.salaryText !== undefined) updateData.salaryText = data.salaryText;
    if (data.startDate !== undefined) updateData.startDate = data.startDate;
    if (data.lastDate !== undefined) updateData.lastDate = data.lastDate;
    if (data.examDate !== undefined) updateData.examDate = data.examDate;
    if (data.officialNotificationUrl !== undefined) updateData.officialNotificationUrl = data.officialNotificationUrl;
    if (data.applyOnlineUrl !== undefined) updateData.applyOnlineUrl = data.applyOnlineUrl;
    if (data.selectionProcess !== undefined) updateData.selectionProcess = data.selectionProcess;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.state !== undefined) updateData.state = data.state;
    if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured);
    if (data.isTrending !== undefined) updateData.isTrending = Boolean(data.isTrending);

    const updated = await prisma.job.update({
      where: { id },
      data: updateData,
      include: { organization: true },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/jobs/:id - Delete Job
router.delete('/jobs/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    await prisma.job.delete({ where: { id } });
    res.json({ message: 'Job deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 4. EXAMS CRUD
// ==========================================
// GET /api/admin/exams
router.get('/exams', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exams = await prisma.exam.findMany({
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(exams);
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/exams - Create Exam
router.post('/exams', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      code,
      organizationName,
      organizationShortName,
      frequency,
      eligibilitySummary,
      selectionProcess,
      examPatternSummary,
      isPopular,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Exam name is required' });
    }

    let org = await prisma.organization.findFirst({
      where: {
        OR: [
          { shortName: organizationShortName || organizationName || 'Govt' },
          { name: organizationName || 'Government Board' },
        ],
      },
    });

    if (!org) {
      org = await prisma.organization.create({
        data: {
          name: organizationName || 'Government Recruitment Board',
          shortName: organizationShortName || 'Govt',
          category: 'Central Govt',
        },
      });
    }

    const baseSlug = slugify(name);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newExam = await prisma.exam.create({
      data: {
        name,
        code: code || 'GOVT-EXAM',
        slug: uniqueSlug,
        organizationId: org.id,
        frequency: frequency || 'Annually',
        eligibilitySummary: eligibilitySummary || 'Graduate / 12th Pass',
        selectionProcess: selectionProcess || 'Preliminary -> Mains -> Interview',
        examPatternSummary: examPatternSummary || 'Tier-1 CBT, Tier-2 CBT',
        isPopular: Boolean(isPopular),
      },
      include: { organization: true },
    });

    res.status(201).json(newExam);
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/exams/:id - Update Exam
router.put('/exams/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = req.body;

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.code !== undefined) updateData.code = data.code;
    if (data.frequency !== undefined) updateData.frequency = data.frequency;
    if (data.eligibilitySummary !== undefined) updateData.eligibilitySummary = data.eligibilitySummary;
    if (data.selectionProcess !== undefined) updateData.selectionProcess = data.selectionProcess;
    if (data.examPatternSummary !== undefined) updateData.examPatternSummary = data.examPatternSummary;
    if (data.isPopular !== undefined) updateData.isPopular = Boolean(data.isPopular);

    const updated = await prisma.exam.update({
      where: { id },
      data: updateData,
      include: { organization: true },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/exams/:id - Delete Exam
router.delete('/exams/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    await prisma.exam.delete({ where: { id } });
    res.json({ message: 'Exam deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 5. MOCK TESTS CRUD
// ==========================================
// GET /api/admin/tests
router.get('/tests', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tests = await prisma.mockTest.findMany({
      include: {
        questions: true,
        _count: { select: { results: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/tests - Create Mock Test
router.post('/tests', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      examName,
      examCategory,
      durationMinutes,
      totalQuestions,
      totalMarks,
      difficulty,
    } = req.body;

    if (!title || !examName) {
      return res.status(400).json({ message: 'Test title and exam name are required' });
    }

    const baseSlug = slugify(title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newTest = await prisma.mockTest.create({
      data: {
        title,
        slug: uniqueSlug,
        examName,
        examCategory: examCategory || 'GOVT',
        durationMinutes: Number(durationMinutes) || 60,
        totalQuestions: Number(totalQuestions) || 25,
        totalMarks: Number(totalMarks) || 50,
        difficulty: difficulty || 'MODERATE',
        isLive: true,
      },
    });

    res.status(201).json(newTest);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/tests/:id - Delete Mock Test
router.delete('/tests/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    await prisma.mockTest.delete({ where: { id } });
    res.json({ message: 'Mock test deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

export default router;
