import { LanguageProvider, useLang } from './i18n/LanguageContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Site() {
  const { t } = useLang()
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
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
