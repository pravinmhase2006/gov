import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/db.js';

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

// GET /api/jobs - List published jobs
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, state, search } = req.query;

    const where: any = {};
    if (category && typeof category === 'string') {
      where.category = category;
    }
    if (state && typeof state === 'string') {
      where.state = state;
    }
    if (search && typeof search === 'string') {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { postName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const jobs = await prisma.job.findMany({
      where,
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:slug - Get single job by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug);
    const job = await prisma.job.findUnique({
      where: { slug },
      include: { organization: true },
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs - Create new job notification (Admin)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      organizationName,
      organizationShortName,
      organizationCategory,
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

    if (!title || !postName || !lastDate) {
      return res.status(400).json({ message: 'Title, post name, and last date are required' });
    }

    // Find or create Organization
    const orgName = organizationName || 'Government of India';
    const orgShort = organizationShortName || orgName.slice(0, 8).toUpperCase();
    const orgCat = organizationCategory || category || 'CENTRAL';

    let org = await prisma.organization.findFirst({
      where: {
        OR: [{ shortName: orgShort }, { name: orgName }],
      },
    });

    if (!org) {
      org = await prisma.organization.create({
        data: {
          name: orgName,
          shortName: orgShort,
          category: orgCat,
        },
      });
    }

    // Generate unique slug
    let baseSlug = slugify(`${title}-${orgShort}`);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.job.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        slug,
        organizationId: org.id,
        postName,
        totalVacancies: Number(totalVacancies) || 1,
        qualification: qualification || 'Any Graduate',
        ageLimitMin: Number(ageLimitMin) || 18,
        ageLimitMax: Number(ageLimitMax) || 30,
        salaryText: salaryText || 'As per 7th CPC Matrix',
        startDate: startDate || new Date().toISOString().split('T')[0],
        lastDate,
        examDate: examDate || null,
        officialNotificationUrl: officialNotificationUrl || null,
        applyOnlineUrl: applyOnlineUrl || null,
        selectionProcess: selectionProcess || 'Written Exam (CBT) & Document Verification',
        category: category || 'Central',
        state: state || 'All India',
        isFeatured: Boolean(isFeatured),
        isTrending: Boolean(isTrending),
        status: 'PUBLISHED',
      },
      include: { organization: true },
    });

    res.status(201).json(newJob);
  } catch (error) {
    next(error);
  }
});

// PUT /api/jobs/:id - Update job (Admin)
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const updates = { ...req.body };
    delete updates.id;
    delete updates.organization;

    if (updates.totalVacancies) updates.totalVacancies = Number(updates.totalVacancies);
    if (updates.ageLimitMin) updates.ageLimitMin = Number(updates.ageLimitMin);
    if (updates.ageLimitMax) updates.ageLimitMax = Number(updates.ageLimitMax);

    const updated = await prisma.job.update({
      where: { id },
      data: updates,
      include: { organization: true },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/jobs/:id - Delete job (Admin)
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    await prisma.job.delete({
      where: { id },
    });
    res.json({ message: 'Job deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

export default router;
