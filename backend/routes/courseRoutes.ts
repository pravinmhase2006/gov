import express, { Request, Response } from 'express';
import prisma from '../config/db.js';
import crypto from 'crypto';

const router = express.Router();

// 1. GET /api/courses - List all published courses with filtering & search
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, level, search, sort } = req.query;

    const whereClause: any = {
      isPublished: true,
    };

    if (category && category !== 'all' && category !== 'All') {
      whereClause.category = {
        equals: String(category),
        mode: 'insensitive',
      };
    }

    if (level && level !== 'all' && level !== 'All Levels') {
      whereClause.level = {
        equals: String(level),
        mode: 'insensitive',
      };
    }

    if (search) {
      const searchStr = String(search).trim();
      whereClause.OR = [
        { title: { contains: searchStr, mode: 'insensitive' } },
        { description: { contains: searchStr, mode: 'insensitive' } },
        { category: { contains: searchStr, mode: 'insensitive' } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'popular' || sort === 'most_viewed') {
      orderBy = { enrolledCount: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    } else if (sort === 'duration') {
      orderBy = { durationHours: 'asc' };
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      orderBy,
    });

    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch courses', error: error?.message || 'Server error' });
  }
});

// 2. GET /api/courses/:slug - Get single course by slug with curriculum and enrollment state
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug || '');
    const userId = req.query.userId ? String(req.query.userId) : undefined;

    if (!slug) {
      return res.status(400).json({ success: false, message: 'Course slug is required' });
    }

    const course = await prisma.course.findUnique({
      where: { slug },
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check enrollment if userId provided
    let enrollment = null;
    if (userId) {
      enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: course.id,
          },
        },
      });
    }

    res.json({
      success: true,
      data: {
        ...course,
        enrollment,
      },
    });
  } catch (error: any) {
    console.error('Error fetching course by slug:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch course details', error: error?.message || 'Server error' });
  }
});

// 3. POST /api/courses/enroll - Enroll user in a course
router.post('/enroll', async (req: Request, res: Response) => {
  try {
    const { courseId, userId, userName, userEmail } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: 'courseId is required' });
    }

    const effectiveUserId = String(userId || `guest_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);
    const effectiveUserName = String(userName || 'Aspirant Learner');
    const targetCourseId = String(courseId);

    const course = await prisma.course.findUnique({
      where: { id: targetCourseId },
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Upsert enrollment
    const enrollment = await prisma.courseEnrollment.upsert({
      where: {
        userId_courseId: {
          userId: effectiveUserId,
          courseId: course.id,
        },
      },
      update: {},
      create: {
        userId: effectiveUserId,
        userName: effectiveUserName,
        userEmail: userEmail ? String(userEmail) : null,
        courseId: course.id,
        courseSlug: course.slug,
        completedLessonIds: [],
        progressPercent: 0,
        isCompleted: false,
      },
    });

    // Increment course enrolledCount
    await prisma.course.update({
      where: { id: course.id },
      data: { enrolledCount: { increment: 1 } },
    });

    res.json({
      success: true,
      message: 'Enrolled successfully in course',
      data: enrollment,
    });
  } catch (error: any) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ success: false, message: 'Failed to enroll in course', error: error?.message || 'Server error' });
  }
});

// 4. POST /api/courses/progress - Mark lesson completed/uncompleted & compute progress
router.post('/progress', async (req: Request, res: Response) => {
  try {
    const { courseId, userId, lessonId, completed } = req.body;

    if (!courseId || !userId || !lessonId) {
      return res.status(400).json({ success: false, message: 'courseId, userId and lessonId are required' });
    }

    const targetCourseId = String(courseId);
    const targetUserId = String(userId);
    const targetLessonId = String(lessonId);

    const course = await prisma.course.findUnique({
      where: { id: targetCourseId },
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Calculate total lessons in course
    let totalLessons = 0;
    if (Array.isArray(course.modules)) {
      course.modules.forEach((m: any) => {
        totalLessons += Array.isArray(m.lessons) ? m.lessons.length : 0;
      });
    }
    if (totalLessons === 0) totalLessons = 1;

    // Get current enrollment
    let enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId: targetUserId,
          courseId: course.id,
        },
      },
    });

    let completedList: string[] = enrollment ? [...enrollment.completedLessonIds] : [];

    if (completed) {
      if (!completedList.includes(targetLessonId)) {
        completedList.push(targetLessonId);
      }
    } else {
      completedList = completedList.filter((id) => id !== targetLessonId);
    }

    const progressPercent = Math.min(100, Math.round((completedList.length / totalLessons) * 100));
    const isCompleted = progressPercent >= 100;

    enrollment = await prisma.courseEnrollment.upsert({
      where: {
        userId_courseId: {
          userId: targetUserId,
          courseId: course.id,
        },
      },
      update: {
        completedLessonIds: completedList,
        progressPercent,
        isCompleted,
        completedAt: isCompleted ? (enrollment?.completedAt || new Date()) : null,
      },
      create: {
        userId: targetUserId,
        userName: req.body.userName ? String(req.body.userName) : 'Aspirant Learner',
        courseId: course.id,
        courseSlug: course.slug,
        completedLessonIds: completedList,
        progressPercent,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: enrollment,
    });
  } catch (error: any) {
    console.error('Error updating progress:', error);
    res.status(500).json({ success: false, message: 'Failed to update progress', error: error?.message || 'Server error' });
  }
});

// 5. POST /api/courses/certificate/claim - Claim certificate upon course completion
router.post('/certificate/claim', async (req: Request, res: Response) => {
  try {
    const { courseId, userId, recipientName, recipientEmail } = req.body;

    if (!courseId || !userId) {
      return res.status(400).json({ success: false, message: 'courseId and userId are required' });
    }

    const targetCourseId = String(courseId);
    const targetUserId = String(userId);

    const course = await prisma.course.findUnique({
      where: { id: targetCourseId },
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId: targetUserId,
          courseId: course.id,
        },
      },
    });

    if (!enrollment || enrollment.progressPercent < 100) {
      return res.status(400).json({
        success: false,
        message: 'Course is not yet 100% completed. Please finish all lessons to claim your certificate.',
        currentProgress: enrollment?.progressPercent || 0,
      });
    }

    const certName = String(recipientName || enrollment.userName || 'Aspirant Graduate');
    const certEmail = recipientEmail ? String(recipientEmail) : (enrollment.userEmail || null);

    // Check if certificate already claimed
    let certificate = await prisma.certificate.findFirst({
      where: {
        courseId: course.id,
        userId: targetUserId,
      },
    });

    if (!certificate) {
      // Generate unique certificate code (e.g. GP-CERT-PY-8X49A)
      const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
      const prefix = course.category ? course.category.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'IT') : 'IT';
      const certificateCode = `GP-CERT-${prefix}-${randomSuffix}`;

      certificate = await prisma.certificate.create({
        data: {
          certificateCode,
          courseId: course.id,
          courseTitle: course.title,
          recipientName: certName,
          recipientEmail: certEmail,
          userId: targetUserId,
          issueDate: new Date(),
          grade: 'Distinction (Honor Roll)',
          skills: course.skills || [],
        },
      });

      // Update enrollment record with certificate code
      await prisma.courseEnrollment.update({
        where: {
          userId_courseId: {
            userId: targetUserId,
            courseId: course.id,
          },
        },
        data: {
          certificateCode,
        },
      });
    }

    res.json({
      success: true,
      message: 'Certificate issued successfully!',
      data: certificate,
    });
  } catch (error: any) {
    console.error('Error claiming certificate:', error);
    res.status(500).json({ success: false, message: 'Failed to claim certificate', error: error?.message || 'Server error' });
  }
});

// 6. GET /api/courses/certificate/:code - Public certificate verification
router.get('/certificate/:code', async (req: Request, res: Response) => {
  try {
    const code = String(req.params.code || '');

    if (!code) {
      return res.status(400).json({ success: false, message: 'Certificate code is required' });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { certificateCode: code },
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found or verification code is invalid.',
      });
    }

    const course = await prisma.course.findUnique({
      where: { id: certificate.courseId },
    });

    res.json({
      success: true,
      verified: true,
      data: {
        ...certificate,
        courseCategory: course?.category || 'Information Technology',
        durationHours: course?.durationHours || 20,
        instructor: course?.instructor || 'GovtPrep Faculty',
        verificationUrl: `/certificates/${certificate.certificateCode}`,
      },
    });
  } catch (error: any) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ success: false, message: 'Failed to verify certificate', error: error?.message || 'Server error' });
  }
});

export default router;

