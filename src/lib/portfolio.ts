import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface Portfolio {
  id: string // The unique, language-independent ID
  name: string
  image: string | null
  slug: string
  excerpts: string
}

export interface PortfolioData extends Portfolio {
  contentHtml: string
}

const portfolioRootDirectory = path.join(process.cwd(), 'portfolio-content')

/**
 * Gets the data for a single portfolio item by slug and language.
 * Reads from /portfolio-content/{lang}/{slug}.md
 */
export async function getPortfolioData(slug: string, lang: string): Promise<PortfolioData> {
  const fullPath = path.join(portfolioRootDirectory, lang, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { id: string, name: string; image: string | null; excerpts: string }),
  }
}

/**
 * Gets all portfolio items for a given language.
 * Reads all files from /portfolio-content/{lang}/
 */
export function getAllPortfolios(lang: string): Portfolio[] {
  const langDirectory = path.join(portfolioRootDirectory, lang)

  if (!fs.existsSync(langDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(langDirectory)
  const allPortfoliosData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(langDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        ...(matterResult.data as { id: string; name: string; image: string | null; excerpts: string }),
      }
    })

  return allPortfoliosData.sort((a, b) => (a.name < b.name ? -1 : 1))
}

/**
 * Gets all possible paths for static generation.
 * Iterates through all lang folders and all .md files within them.
 */
export function getAllPortfolioPaths() {
  const langDirs = fs.readdirSync(portfolioRootDirectory)
  const paths: { lang: string, slug: string }[] = []

  langDirs.forEach((lang) => {
    const langPath = path.join(portfolioRootDirectory, lang)
    if (fs.statSync(langPath).isDirectory()) {
      const files = fs.readdirSync(langPath)
      files
        .filter((file) => file.endsWith('.md'))
        .forEach((file) => {
          paths.push({
            lang,
            slug: file.replace(/\.md$/, ''),
          })
        })
    }
  })

  return paths
}