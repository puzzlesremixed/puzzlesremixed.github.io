export type TechDetails = {
  name: string;
  logo?: string;
};

export const TECH_STACK_DATA: Record<string, TechDetails> = {
  'nextjs': {
    name: 'Next.js',
  },
  'typescript': {
    name: 'TypeScript',
  },
  'prisma': {
    name: 'Prisma',
  },
  'postgresql': {
    name: 'PostgreSQL',
  },
  'tailwindcss': {
    name: 'Tailwind CSS',
  },
  'reactjs': {
    name: 'React',
  },
  'vercel': {
    name: 'Vercel',
  },
};

export const UNKNOWN_TECH: TechDetails = {
  name: 'Unknown',
};