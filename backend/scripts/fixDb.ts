import prisma from '../config/db.js';

async function main() {
  console.log('Sanitizing Job and Exam and Org collections in MongoDB...');
  try {
    // 1. Sanitize Organization
    await prisma.$runCommandRaw({
      update: 'Organization',
      updates: [
        {
          q: { $or: [{ name: null }, { name: { $exists: false } }] },
          u: { $set: { name: 'Government Recruitment Board' } },
          multi: true,
        },
        {
          q: { $or: [{ shortName: null }, { shortName: { $exists: false } }] },
          u: { $set: { shortName: 'Govt' } },
          multi: true,
        },
        {
          q: { $or: [{ category: null }, { category: { $exists: false } }] },
          u: { $set: { category: 'Central Govt' } },
          multi: true,
        },
      ],
    });

    // 2. Sanitize Job
    const jobUpdate = await prisma.$runCommandRaw({
      update: 'Job',
      updates: [
        {
          q: { $or: [{ postName: null }, { postName: { $exists: false } }] },
          u: { $set: { postName: 'Various Posts' } },
          multi: true,
        },
        {
          q: { $or: [{ totalVacancies: null }, { totalVacancies: { $exists: false } }] },
          u: { $set: { totalVacancies: 100 } },
          multi: true,
        },
        {
          q: { $or: [{ qualification: null }, { qualification: { $exists: false } }] },
          u: { $set: { qualification: "Bachelor's Degree in any discipline" } },
          multi: true,
        },
        {
          q: { $or: [{ ageLimitMin: null }, { ageLimitMin: { $exists: false } }] },
          u: { $set: { ageLimitMin: 18 } },
          multi: true,
        },
        {
          q: { $or: [{ ageLimitMax: null }, { ageLimitMax: { $exists: false } }] },
          u: { $set: { ageLimitMax: 30 } },
          multi: true,
        },
        {
          q: { $or: [{ startDate: null }, { startDate: { $exists: false } }] },
          u: { $set: { startDate: '2026-03-01' } },
          multi: true,
        },
        {
          q: { $or: [{ lastDate: null }, { lastDate: { $exists: false } }] },
          u: { $set: { lastDate: '2026-04-15' } },
          multi: true,
        },
        {
          q: { $or: [{ category: null }, { category: { $exists: false } }] },
          u: { $set: { category: 'Central Govt' } },
          multi: true,
        },
        {
          q: { $or: [{ state: null }, { state: { $exists: false } }] },
          u: { $set: { state: 'All India' } },
          multi: true,
        },
        {
          q: { $or: [{ status: null }, { status: { $exists: false } }] },
          u: { $set: { status: 'PUBLISHED' } },
          multi: true,
        },
        {
          q: { $or: [{ isFeatured: null }, { isFeatured: { $exists: false } }] },
          u: { $set: { isFeatured: false } },
          multi: true,
        },
        {
          q: { $or: [{ isTrending: null }, { isTrending: { $exists: false } }] },
          u: { $set: { isTrending: false } },
          multi: true,
        },
        {
          q: { $or: [{ viewsCount: null }, { viewsCount: { $exists: false } }] },
          u: { $set: { viewsCount: 0 } },
          multi: true,
        },
      ],
    });
    console.log('Job updates count:', jobUpdate);

    // 3. Sanitize Exam
    const examUpdate = await prisma.$runCommandRaw({
      update: 'Exam',
      updates: [
        {
          q: { $or: [{ name: null }, { name: { $exists: false } }] },
          u: { $set: { name: 'Govt Exam' } },
          multi: true,
        },
        {
          q: { $or: [{ code: null }, { code: { $exists: false } }] },
          u: { $set: { code: 'GOVT-EXAM' } },
          multi: true,
        },
        {
          q: { $or: [{ isPopular: null }, { isPopular: { $exists: false } }] },
          u: { $set: { isPopular: true } },
          multi: true,
        },
        {
          q: { $or: [{ viewsCount: null }, { viewsCount: { $exists: false } }] },
          u: { $set: { viewsCount: 0 } },
          multi: true,
        },
      ],
    });
    console.log('Exam updates count:', examUpdate);

    // Test Prisma queries
    const jobs = await prisma.job.findMany({ include: { organization: true }, take: 3 });
    console.log('Successfully queried jobs:', jobs.length);

    const exams = await prisma.exam.findMany({ include: { organization: true }, take: 3 });
    console.log('Successfully queried exams:', exams.length);
  } catch (err) {
    console.error('Error during sanitization:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
