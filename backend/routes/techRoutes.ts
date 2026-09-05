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

// Fallback in-memory store if db not yet migrated
let memoryTechJobs = [
  {
    id: 'tj-1',
    title: 'Senior Full Stack Engineer (React + Node.js)',
    slug: 'senior-full-stack-engineer-bangalore',
    company: 'Infosys Innovation Labs',
    location: 'Bengaluru, Karnataka (Hybrid)',
    jobType: 'FULL_TIME',
    experience: '3-6 Years',
    salaryText: '₹14,00,000 - ₹22,00,000 P.A.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    applyUrl: 'https://careers.infosys.com',
    isTrending: true,
  },
  {
    id: 'tj-2',
    title: 'AI / ML Engineer (Python, LLMs, PyTorch)',
    slug: 'ai-ml-engineer-tcs-research',
    company: 'Tata Consultancy Services (Research)',
    location: 'Hyderabad, Telangana',
    jobType: 'FULL_TIME',
    experience: '2-5 Years',
    salaryText: '₹12,00,000 - ₹18,00,000 P.A.',
    skills: ['Python', 'PyTorch', 'Hugging Face', 'LangChain', 'FastAPI'],
    applyUrl: 'https://www.tcs.com/careers',
    isTrending: true,
  },
  {
    id: 'tj-3',
    title: 'DevOps & Cloud Infrastructure Engineer',
    slug: 'devops-cloud-engineer-wipro',
    company: 'Wipro Digital',
    location: 'Pune, Maharashtra / Remote',
    jobType: 'FULL_TIME',
    experience: '2-4 Years',
    salaryText: '₹10,00,000 - ₹16,00,000 P.A.',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS'],
    applyUrl: 'https://careers.wipro.com',
    isTrending: false,
  },
  {
    id: 'tj-4',
    title: 'Junior Software Development Engineer (SDE-1 Fresher)',
    slug: 'junior-sde1-fresher-tech-mahindra',
    company: 'Tech Mahindra',
    location: 'Noida / Chennai',
    jobType: 'FULL_TIME',
    experience: '0-2 Years (Freshers Eligible)',
    salaryText: '₹6,50,000 - ₹9,00,000 P.A.',
    skills: ['Java', 'Spring Boot', 'Data Structures', 'MySQL', 'Git'],
    applyUrl: 'https://careers.techmahindra.com',
    isTrending: true,
  },
];

// GET /api/tech-jobs - List all tech jobs
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    try {
      const dbTechJobs = await prisma.techJob.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (dbTechJobs && dbTechJobs.length > 0) {
        if (search && typeof search === 'string') {
          const filtered = dbTechJobs.filter(j => 
            j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.company.toLowerCase().includes(search.toLowerCase()) ||
            j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
          );
          return res.json(filtered);
        }
        return res.json(dbTechJobs);
      }
    } catch {
      // fallback to memory
    }

    if (search && typeof search === 'string') {
      const filtered = memoryTechJobs.filter(j => 
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
      );
      return res.json(filtered);
    }
    res.json(memoryTechJobs);
  } catch (error) {
    next(error);
  }
});

// POST /api/tech-jobs - Create new tech job
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, company, location, experience, salaryText, skills, applyUrl } = req.body;
    if (!title || !company) {
      return res.status(400).json({ message: 'Title and company are required' });
    }

    const newJob = {
      id: String(Date.now()),
      title,
      slug: slugify(`${title}-${company}-${Date.now()}`),
      company,
      location: location || 'All India',
      jobType: 'FULL_TIME',
      experience: experience || '0-2 Years',
      salaryText: salaryText || 'Best in Industry',
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map((s: string) => s.trim()) : ['Tech']),
      applyUrl: applyUrl || '#',
      isTrending: true,
    };

    try {
      const saved = await prisma.techJob.create({
        data: newJob,
      });
      return res.status(201).json(saved);
    } catch {
      memoryTechJobs.unshift(newJob);
      return res.status(201).json(newJob);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tech-jobs/:id - Delete tech job
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    try {
      await prisma.techJob.delete({ where: { id } });
    } catch {
      memoryTechJobs = memoryTechJobs.filter(j => j.id !== id);
    }
    res.json({ message: 'Tech job deleted', id });
  } catch (error) {
    next(error);
  }
});

export default router;
