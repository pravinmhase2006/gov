import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/db.js';

const router = Router();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// GET /api/exams - List all exams
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exams = await prisma.exam.findMany({
      include: { organization: true },
      orderBy: { name: 'asc' },
    });
    res.json(exams);
  } catch (error) {
    next(error);
  }
});

// GET /api/exams/:slug - Get single exam by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug);
    const exam = await prisma.exam.findUnique({
      where: { slug },
      include: { organization: true },
    });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.json(exam);
  } catch (error) {
    next(error);
  }
});

// POST /api/exams - Create new exam (Admin)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
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

    if (!name || !code) {
      return res.status(400).json({ message: 'Exam name and exam code are required' });
    }

    const orgName = organizationName || 'National Examination Board';
    const orgShort = organizationShortName || code.slice(0, 6).toUpperCase();

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
          category: 'EXAM_BOARD',
        },
      });
    }

    let baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.exam.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newExam = await prisma.exam.create({
      data: {
        name,
        slug,
        code,
        organizationId: org.id,
        frequency: frequency || 'Annually',
        eligibilitySummary: eligibilitySummary || '10th / 12th / Graduate based on post',
        selectionProcess: selectionProcess || 'Tier-1 CBT, Tier-2 CBT, Skill Test',
        examPatternSummary: examPatternSummary || 'General Awareness, Quant, Reasoning, English',
        isPopular: Boolean(isPopular),
      },
      include: { organization: true },
    });

    res.status(201).json(newExam);
  } catch (error) {
    next(error);
  }
});

// PUT /api/exams/:id - Update exam (Admin)
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const updates = { ...req.body };
    delete updates.id;
    delete updates.organization;

    const updated = await prisma.exam.update({
      where: { id },
      data: updates,
      include: { organization: true },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/exams/:id - Delete exam (Admin)
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    await prisma.exam.delete({
      where: { id },
    });
    res.json({ message: 'Exam deleted successfully', id });
  } catch (error) {
    next(error);
  }
});

export default router;
