import GameOfLifeCanvas from './GameOfLifeCanvas'
import { useLang } from '../i18n/LanguageContext'
import './Hero.css'

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="top" className="hero">
      <GameOfLifeCanvas />
      <div className="hero__scrim" />
      <div className="container hero__content">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 className="hero__title">
          Cosmin
          <br />
          Grigore
        </h1>
        <p className="hero__role">{t.hero.role}</p>
        <p className="hero__lede">{t.hero.lede}</p>
        <div className="hero__cta">
          <a href="#work" className="btn btn-solid">
            {t.hero.ctaWork}
          </a>
          <a href="#contact" className="btn btn-outline">
            {t.hero.ctaContact}
          </a>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-track">
          <span className="hero__scroll-dot" />
        </span>
        {t.hero.scroll}
      </div>
    </section>
  )
}
