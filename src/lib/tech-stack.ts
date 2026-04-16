export type TechDetails = {
  name: string;
  logo?: string;
  className?: string;
};

export const TECH_STACK_DATA: Record<string, TechDetails> = {
  'nextjs': {
    name: 'Next.js',
    logo: '/logo/nextjs.svg',
    className: 'fill-current',
  },
  'typescript': {
    name: 'TypeScript',
    logo: '/logo/typescript.svg'
  },
  'prisma': {
    name: 'Prisma',
    logo: '/logo/prismaorm.svg',
    className: ' fill-current',
  },
  'postgresql': {
    name: 'PostgreSQL',
    logo: '/logo/postgresql.svg'
  },
  'tailwindcss': {
    name: 'Tailwind CSS',
    logo: '/logo/tailwindcss.svg'
  },
  'reactjs': {
    name: 'React',
    logo: '/logo/reactjs.svg'
  },
  'laravel': {
    name: 'Laravel',
    logo: '/logo/laravel.svg'
  },
  'javascript': {
    name: 'JavaScript',
    logo: '/logo/javascript.svg'
  },
  'inertiajs': {
    name: 'Inertia',
    logo: '/logo/inertiajs.svg'
  },
  'payloadcms': {
    name: 'Payload',
    logo: '/logo/payloadcms.svg',
    className: 'invert',
  },
  'statamic': {
    name: 'Statamic',
    logo: '/logo/statamic.svg'
  },
  'php':{
    name:'PHP',
    logo: '/logo/php.svg'
  }
};

export const UNKNOWN_TECH: TechDetails = {
  name: 'Unknown',
};