import { useEffect } from 'react'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import { useRoute } from './router'
import { projects } from './data/projects'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'

const ANCHOR_IDS = ['top', 'about', 'services', 'work', 'contact']

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Work />
      <Contact />
    </>
  )
}

function Site() {
  const { lang, t } = useLang()
  const route = useRoute()
  const isDetail = route.name === 'project'
  const project = isDetail ? projects.find((p) => p.id === route.slug) : null

  // Keep <title> and the meta description in sync with whichever "page" is
  // showing — the home page's own copy, or the project being viewed.
  useEffect(() => {
    if (isDetail && project) {
      const projectTitle = typeof project.title === 'object' ? project.title[lang] : project.title
      document.title = `${projectTitle} — Cosmin Grigore`
      const desc = document.querySelector('meta[name="description"]')
      const shortDesc =
        typeof project.description === 'object' ? project.description[lang] : project.description
      if (desc) desc.setAttribute('content', shortDesc)
    } else {
      document.title = t.meta.title
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', t.meta.description)
    }
  }, [isDetail, project, lang, t])

  // Coming back to the home page from a detail page needs a manual scroll:
  // the target section isn't in the DOM yet at the moment the hash changes
  // (this component still has to re-render into "home" mode first), so the
  // browser's native anchor-jump has nothing to jump to.
  useEffect(() => {
    if (isDetail) return
    const id = window.location.hash.replace('#', '')
    if (!ANCHOR_IDS.includes(id)) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView()
  }, [isDetail])

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>
      <Nav />
      <main id="main">{isDetail ? <ProjectDetail slug={route.slug} /> : <Home />}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}
