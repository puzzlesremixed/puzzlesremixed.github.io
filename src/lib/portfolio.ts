import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'
import matter from 'gray-matter'
import {unified} from "unified";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeImgSize from 'rehype-img-size'
import rehypeReact from 'rehype-react'
import {createElement} from 'react'
import {jsx, jsxs, Fragment} from 'react/jsx-runtime'
import {CustomImage} from "@/components/custom-image";
import {
  StyledBlockquote,
  StyledCode,
  StyledH2,
  StyledH3,
  StyledOL,
  StyledP,
  StyledUL
} from "@/components/styled-paragraph";

export interface Portfolio {
  id: string // The unique, language-independent ID
  name: string
  image: string | null
  slug: string
  excerpts: string
  id: string;
  name: string;
  image?: {
    src: string
    width: number
    height: number
  } | null;
  slug: string;
  excerpts: string;
}

export interface PortfolioData extends Portfolio {
  contentReact: React.ReactElement
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

  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkRehype) // Convert to HTML AST
    .use(rehypeImgSize, {dir: 'public'}) // Find images in /public and add dimensions
    .use(rehypeReact, {   // Convert to React
      jsx,
      jsxs,
      createElement,
      Fragment,
      components: {
        img: CustomImage,
        h2: StyledH2,
        h3: StyledH3,
        p: StyledP,
        ul: StyledUL,
        ol: StyledOL,
        blockquote: StyledBlockquote,
        code: StyledCode,
      },
    })
    .process(matterResult.content)

  const contentReact = processedContent.result

  const frontmatter = matterResult.data as {
    id: string
    name: string
    image: string | null
    excerpts: string
    stack?: string[]
  }

  let image = null

  if (frontmatter.image) {
    try {
      const imagePath = path.join(process.cwd(), 'public', frontmatter.image)

      if (fs.existsSync(imagePath)) {
        const buffer = fs.readFileSync(imagePath)
        const dimensions = sizeOf(buffer)

        if (dimensions.width && dimensions.height) {
          image = {
            src: frontmatter.image,
            width: dimensions.width,
            height: dimensions.height,
          }
        }
      }
    } catch (err) {
      console.warn(`Invalid image: ${frontmatter.image}`, err)
    }
  }

  return {
    slug,
    contentReact,
    ...frontmatter,
    image,
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
        ...(matterResult.data as {
          id: string; name: string; image?: {
            src: string
            width: number
            height: number
          } | null; excerpts: string
        }),
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