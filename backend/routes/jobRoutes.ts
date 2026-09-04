import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

const router = Router();

// GET /api/jobs
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: 'PUBLISHED' },
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:slug
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

export default router;
