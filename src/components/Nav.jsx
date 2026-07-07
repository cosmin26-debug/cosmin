import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import './Nav.css'

export default function Nav() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // "Contact" as a plain link was redundant with the "Let's talk" button —
  // both went to #contact — so the button is now the single path there.
  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#work', label: t.nav.work },
  ]

  const LangToggle = ({ className = '' }) => (
    <button
      type="button"
      className={`nav__lang ${className}`}
      onClick={toggle}
      aria-label={t.nav.langLabel}
    >
      <span className={lang === 'en' ? 'nav__lang-on' : ''}>EN</span>
      <span aria-hidden="true">/</span>
      <span className={lang === 'it' ? 'nav__lang-on' : ''}>IT</span>
    </button>
  )

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo">
          <span className="nav__logo-dot" />
          C. Grigore
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <LangToggle />
          <a href="#contact" className="btn btn-outline nav__cta">
            {t.nav.cta}
          </a>
        </nav>

        <div className="nav__mobile-controls">
          <LangToggle />
          <button
            className="nav__toggle"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-solid" onClick={() => setOpen(false)}>
            {t.nav.cta}
          </a>
        </div>
      )}
    </header>
  )
}
