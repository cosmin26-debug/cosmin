import { useEffect, useState } from 'react'

// A deliberately small router: this site has exactly one "page type" that
// needs a real route (project detail), everything else is anchor-scroll on
// a single page. Hash-based routing means no server rewrite rules are
// needed — important since GitHub Pages serves static files and can't be
// told "send every path to index.html".
//
// Route shapes:
//   ''  or  '#top' / '#about' / '#services' / '#work' / '#contact'  -> home
//   '#/project/<id>'                                                -> detail page
//
// The leading slash after '#' is what distinguishes a route from a plain
// in-page anchor, so the two schemes can't collide.

function parse(hash) {
  const match = /^#\/project\/([\w-]+)$/.exec(hash)
  return match ? { name: 'project', slug: match[1] } : { name: 'home' }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

export function projectHref(id) {
  return `#/project/${id}`
}
