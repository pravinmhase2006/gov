import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

const router = Router();

// GET /api/exams
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

// GET /api/exams/:slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: { slug: req.params.slug },
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

export default router;
