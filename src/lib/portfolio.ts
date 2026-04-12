export interface Portfolio {
  name: string
  image: string | null
  slug: string
  excerpts: string
}

export const portfolios: Portfolio[] = [
  {
    name: 'E-commerce Platform',
    image: null,
    slug: 'ecommerce-platform',
    excerpts: 'A modern e-commerce platform built with Next.js and TypeScript, featuring real-time inventory management and seamless checkout experience.',
  },
  {
    name: 'AI Chat Application',
    image: null,
    slug: 'ai-chat-app',
    excerpts: 'An intelligent chat application powered by LLMs, with real-time messaging, conversation history, and advanced NLP capabilities.',
  },
  {
    name: 'Data Analytics Dashboard',
    image: null,
    slug: 'analytics-dashboard',
    excerpts: 'A comprehensive analytics dashboard providing real-time data visualization, custom reports, and actionable business insights.',
  },
]

export function getPortfolioBySlug(slug: string): Portfolio | undefined {
  return portfolios.find(p => p.slug === slug)
}
