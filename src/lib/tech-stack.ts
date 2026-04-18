export type TechDetails = {
  name: string;
  logo?: string;
  logoWhite?: string;
  className?: string;
  url?: string;
};

export const TECH_STACK_DATA: Record<string, TechDetails> = {
  'nextjs': {
    name: 'Next.js',
    logo: '/logo/nextjs.svg',
    logoWhite: '/logo/white/nextjs.svg',
    className: '',
    url: "https://nextjs.org/"
  },
  'typescript': {
    name: 'TypeScript',
    logo: '/logo/typescript.svg',
    logoWhite: '/logo/white/typescript.svg',
    url: 'https://www.typescriptlang.org/'
  },
  'prisma': {
    name: 'Prisma',
    logo: '/logo/prismaorm.svg',
    logoWhite: '/logo/white/prismaorm.svg',
    className: '',
    url: 'https://www.prisma.io/docs/orm'
  },
  'postgresql': {
    name: 'PostgreSQL',
    logo: '/logo/postgresql.svg',
    logoWhite: '/logo/white/postgresql.svg',
    url: 'https://www.postgresql.org/'
  },
  'tailwindcss': {
    name: 'Tailwind CSS',
    logo: '/logo/tailwindcss.svg',
    logoWhite: '/logo/white/tailwindcss.svg',
    url: 'https://tailwindcss.com/'
  },
  'reactjs': {
    name: 'React',
    logo: '/logo/reactjs.svg',
    logoWhite: '/logo/white/reactjs.svg',
    url: 'https://react.dev/'
  },
  'laravel': {
    name: 'Laravel',
    logo: '/logo/laravel.svg',
    logoWhite: '/logo/white/laravel.svg',
    className: '',
    url: 'https://laravel.com/'
  },
  'javascript': {
    name: 'JavaScript',
    logo: '/logo/javascript.svg',
    logoWhite: '/logo/white/javascript.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  'inertiajs': {
    name: 'Inertia',
    logo: '/logo/inertiajs.svg',
    logoWhite: '/logo/white/inertiajs.svg',
    url: 'https://inertiajs.com/'
  },
  'payloadcms': {
    name: 'Payload',
    logo: '/logo/payloadcms.svg',
    logoWhite: '/logo/white/payloadcms.svg',
    className: '',
    url: 'https://payloadcms.com/'
  },
  'statamic': {
    name: 'Statamic',
    logo: '/logo/statamic.svg',
    logoWhite: '/logo/white/statamic.svg',
    url: 'https://statamic.com'
  },
  'php': {
    name: 'PHP',
    logo: '/logo/php.svg',
    logoWhite: '/logo/white/php.svg',
    url: 'https://www.php.net/'
  },
  'livewire': {
    name: 'Laravel Livewire',
    logo: '/logo/livewire.svg',
    logoWhite: '/logo/white/livewire.svg',
    url: 'https://livewire.laravel.com/'
  },
  'nodejs':{
    name: 'Node.js',
    logo: '/logo/nodejs.svg',
    logoWhite: '/logo/white/nodejs.svg',
    url: 'https://nodejs.org/en'
  },
  'unity':{
    name: 'Unity',
    logo: '/logo/unity.svg',
    logoWhite: '/logo/white/unity.svg',
    url: 'https://unity.com/'
  }
};

export const UNKNOWN_TECH: TechDetails = {
  name: 'Unknown',
};
