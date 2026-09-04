import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'GovtPrep API Server Running', timestamp: new Date().toISOString() });
});

// Jobs API
app.get('/api/jobs', async (req: Request, res: Response, next: NextFunction) => {
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

app.get('/api/jobs/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await prisma.job.findUnique({
      where: { slug: req.params.slug },
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

// Exams API
app.get('/api/exams', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exams = await prisma.exam.findMany({
      include: { organization: true },
      orderBy: { viewsCount: 'desc' },
    });
    res.json(exams);
  } catch (error) {
    next(error);
  }
});

app.get('/api/exams/:slug', async (req: Request, res: Response, next: NextFunction) => {
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

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
});

export default app;
