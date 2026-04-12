import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const portfolioRootDirectory = path.join(process.cwd(), 'portfolio-content');
const outputPath = path.join(process.cwd(), 'src', 'lib', 'generated');
const outputFile = path.join(outputPath, 'slug-map.json');

function generateMap() {
  console.log('Generating portfolio slug map...');

  // This will store the primary mapping: id -> {lang: slug}
  const idToSlugsMap = {};
  // This will store the reverse mapping: {lang: {slug: id}}
  const slugsToIdMap = {};

  try {
    const langDirs = fs.readdirSync(portfolioRootDirectory);

    for (const lang of langDirs) {
      const langPath = path.join(portfolioRootDirectory, lang);
      if (fs.statSync(langPath).isDirectory()) {
        slugsToIdMap[lang] = {}; // Initialize language in reverse map
        const files = fs.readdirSync(langPath);

        for (const file of files.filter(f => f.endsWith('.md'))) {
          const slug = file.replace(/\.md$/, '');
          const fullPath = path.join(langPath, file);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);

          if (data.id) {
            // Populate id -> slugs map
            if (!idToSlugsMap[data.id]) {
              idToSlugsMap[data.id] = {};
            }
            idToSlugsMap[data.id][lang] = slug;

            // Populate slug -> id reverse map
            slugsToIdMap[lang][slug] = data.id;
          }
        }
      }
    }

    // Ensure the output directory exists
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Write the combined map to the file
    const combinedMap = {
      idToSlugs: idToSlugsMap,
      slugsToId: slugsToIdMap,
    };
    fs.writeFileSync(outputFile, JSON.stringify(combinedMap, null, 2));

    console.log(`Slug map generated successfully at ${outputFile}`);
  } catch (error) {
    console.error('Error generating slug map:', error);
  }
}

generateMap();