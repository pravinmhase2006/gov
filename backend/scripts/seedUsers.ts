import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';

async function seedUsers() {
  console.log('Seeding default Admin & Aspirant accounts into MongoDB...');
  try {
    const adminEmail = 'admin@govtprep.in';
    const candidateEmail = 'aspirant@govtprep.in';

    // 1. Admin Account
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const createdAdmin = await prisma.user.create({
        data: {
          name: 'GovtPrep Administrator',
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN',
          isVerified: true,
        },
      });
      console.log('Created Admin user:', createdAdmin.email);
    } else {
      // Ensure admin has role ADMIN
      if (existingAdmin.role !== 'ADMIN') {
        await prisma.user.update({
          where: { email: adminEmail },
          data: { role: 'ADMIN' },
        });
        console.log('Updated existing user to ADMIN role:', adminEmail);
      } else {
        console.log('Admin user already configured:', adminEmail);
      }
    }

    // 2. Candidate Account
    const existingCandidate = await prisma.user.findUnique({ where: { email: candidateEmail } });
    if (!existingCandidate) {
      const hashedPassword = await bcrypt.hash('User@123', 10);
      const createdCandidate = await prisma.user.create({
        data: {
          name: 'Rahul Aspirant',
          email: candidateEmail,
          password: hashedPassword,
          role: 'USER',
          isVerified: true,
        },
      });
      console.log('Created Demo Aspirant user:', createdCandidate.email);
    } else {
      console.log('Demo Aspirant user already exists:', candidateEmail);
    }

    console.log('User seed complete.');
  } catch (err) {
    console.error('Error seeding users:', err);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
