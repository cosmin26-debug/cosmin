// HOW TO ADD OR CHANGE PROJECT PICTURES
//
// Drop image files into a folder named after the project's `id`:
//
//   src/data/screenshots/<project-id>/
//
//   e.g.  src/data/screenshots/iryse/01-homepage.png
//         src/data/screenshots/iryse/02-admin-dashboard.png
//
// That's it — no other file needs to change. This module finds them at
// build time. A few rules:
//
//   - Images show in filename order, so prefix with numbers (01-, 02-, …)
//     to control the sequence.
//   - The FIRST image is also used as the card thumbnail in the Work section.
//   - The rest of the filename becomes the image's alt text:
//     "02-admin-dashboard.png" → "admin dashboard".
//   - Supported formats: png, jpg, jpeg, webp, avif, gif, svg.
//   - A project with no folder (or an empty one) falls back to its
//     `preview` placeholder from src/data/projects.js.

const modules = import.meta.glob(
  './screenshots/*/*.{png,jpg,jpeg,webp,avif,gif,svg,PNG,JPG,JPEG,WEBP}',
  { eager: true, query: '?url', import: 'default' }
)

const byProject = {}

for (const [path, url] of Object.entries(modules)) {
  const match = /\.\/screenshots\/([^/]+)\/([^/]+)$/.exec(path)
  if (!match) continue
  const [, projectId, file] = match
  const name = file
    .replace(/\.[^.]+$/, '') // drop extension
    .replace(/^\d+[-_ ]*/, '') // drop the ordering prefix
    .replace(/[-_]+/g, ' ')
    .trim()
  ;(byProject[projectId] ||= []).push({ file, src: url, name })
}

for (const list of Object.values(byProject)) {
  list.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
}

export function screenshotsFor(projectId) {
  return byProject[projectId] || []
}
