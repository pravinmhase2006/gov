import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/db.js';

const router = Router();

// GET /api/tests - List all live mock tests
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search } = req.query;

    const where: any = { isLive: true };
    if (category && typeof category === 'string' && category !== 'ALL') {
      where.examCategory = category;
    }
    if (search && typeof search === 'string') {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { examName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const tests = await prisma.mockTest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { questions: true, results: true },
        },
      },
      take: 50,
    });

    res.json(tests);
  } catch (error) {
    next(error);
  }
});

// GET /api/tests/:slug - Get detailed mock test with questions for CBT runner
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug);
    const test = await prisma.mockTest.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!test) {
      return res.status(404).json({ message: 'Mock test not found' });
    }

    res.json(test);
  } catch (error) {
    next(error);
  }
});

// POST /api/tests/:slug/submit - Calculate score, accuracy, and save test result
router.post('/:slug/submit', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = String(req.params.slug);
    const { answers, timeTakenSeconds, candidateName, userId } = req.body;

    const test = await prisma.mockTest.findUnique({
      where: { slug },
      include: { questions: true },
    });

    if (!test) {
      return res.status(404).json({ message: 'Mock test not found' });
    }

    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const userAnswers: Record<string, string> = answers || {};

    const questionResults = test.questions.map((q) => {
      const selectedOptionId = userAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const isAttempted = Boolean(selectedOptionId);
      const isCorrect = isAttempted && correctOption && selectedOptionId === correctOption.id;

      if (!isAttempted) {
        unattemptedCount++;
      } else if (isCorrect) {
        correctCount++;
        score += q.marks;
      } else {
        incorrectCount++;
        score -= q.negativeMarks;
      }

      return {
        questionId: q.id,
        selectedOptionId: selectedOptionId || null,
        correctOptionId: correctOption ? correctOption.id : null,
        isCorrect: Boolean(isCorrect),
        isAttempted,
        explanation: q.explanation,
        marksObtained: isCorrect ? q.marks : isAttempted ? -q.negativeMarks : 0,
      };
    });

    const totalAttempted = correctCount + incorrectCount;
    const accuracyPercent = totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0;
    const finalScore = Math.max(0, Math.round(score * 100) / 100);

    // Save test result
    const savedResult = await prisma.testResult.create({
      data: {
        testId: test.id,
        userId: userId || undefined,
        candidateName: candidateName || 'Anonymous Aspirant',
        score: finalScore,
        totalMarks: test.totalMarks,
        accuracyPercent: Math.round(accuracyPercent * 10) / 10,
        timeTakenSeconds: timeTakenSeconds || 0,
        correctCount,
        incorrectCount,
        unattemptedCount,
      },
    });

    // Increment attempts count on test
    await prisma.mockTest.update({
      where: { id: test.id },
      data: { attemptsCount: { increment: 1 } },
    });

    res.json({
      resultId: savedResult.id,
      score: finalScore,
      totalMarks: test.totalMarks,
      accuracyPercent: Math.round(accuracyPercent * 10) / 10,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeTakenSeconds,
      questionResults,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
