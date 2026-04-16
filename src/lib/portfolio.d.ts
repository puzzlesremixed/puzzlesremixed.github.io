export interface Portfolio {
  id: string;
  name: string;
  image?: {
    src: string
    width: number
    height: number
  } | null;
  slug: string;
  excerpts: string;
  stack?: string[];
  source?: string;
  url?: string;
}


export interface PortfolioData extends Portfolio {
  contentReact: React.ReactElement
}

export interface PortfolioFrontmatter extends Portfolio {
  image: string
}
