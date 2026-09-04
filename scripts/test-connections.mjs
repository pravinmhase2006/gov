import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Parse .env manually
try {
  const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  }
} catch (e) {
  console.log('Failed to read .env');
}

console.log('🔍 Running Live Upload & Database Verification Test...\n');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function runTests() {
  let uploadOk = false;
  let mongoOk = false;

  console.log('--- 1. TESTING CLOUDINARY UPLOAD & DELIVERY ---');
  try {
    const pingResult = await cloudinary.api.ping();
    console.log('  📡 API Ping Status:', pingResult.status);

    // Test a real 1x1 transparent PNG upload
    const sampleBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const uploadRes = await cloudinary.uploader.upload(sampleBase64, {
      folder: 'govtprep/test',
      public_id: 'test_badge',
      overwrite: true,
    });

    console.log('  ✅ Upload Successful!');
    console.log('  🔗 Live Secure CDN URL:', uploadRes.secure_url);
    console.log('  🆔 Public ID:', uploadRes.public_id);
    console.log('  📐 Format:', uploadRes.format, '| Size:', uploadRes.bytes, 'bytes');

    // Clean up test image
    await cloudinary.uploader.destroy(uploadRes.public_id);
    console.log('  🧹 Test Cleanup Completed');
    uploadOk = true;
  } catch (err) {
    console.error('  ❌ Cloudinary Upload Error:', err.message || err);
  }

  console.log('\n--- 2. TESTING MONGODB ATLAS CLOUD DATABASE ---');
  const prisma = new PrismaClient();
  try {
    const userCount = await prisma.user.count();
    const jobCount = await prisma.job.count();
    const techJobCount = await prisma.techJob.count();
    const mockTestCount = await prisma.mockTest.count();
    const questionCount = await prisma.question.count();

    console.log('  ✅ MongoDB Atlas Connection Active!');
    console.log(`  📊 Database Stats:
     - Users: ${userCount}
     - Govt Jobs: ${jobCount}
     - Tech Jobs: ${techJobCount}
     - CBT Mock Tests: ${mockTestCount}
     - Question Bank: ${questionCount} questions`);
    mongoOk = true;
  } catch (err) {
    console.error('  ❌ MongoDB Atlas Error:', err.message || err);
  } finally {
    await prisma.$disconnect();
  }

  console.log('\n======================================================');
  if (uploadOk && mongoOk) {
    console.log('🎉 ALL CREDENTIALS & CONNECTIONS TESTED & WORKING 100%!');
  } else {
    console.log('⚠️ Some checks failed. Review the logs above.');
  }
  console.log('======================================================');
}

runTests();
