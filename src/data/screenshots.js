// Collects project screenshots from ./screenshots/<project-id>/ at build time,
// sorted by filename. Alt text is derived from the filename.

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
