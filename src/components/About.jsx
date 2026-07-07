import { useLang } from '../i18n/LanguageContext'
import './About.css'

export default function About() {
  const { t } = useLang()
  return (
    <section id="about">
      <div className="container section-inner about">
        <div className="section-head">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2>{t.about.title}</h2>
        </div>

        <div className="about__grid">
          <div className="about__copy">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>

          <dl className="about__facts">
            {t.about.facts.map((f) => (
              <div key={f.label} className="about__fact">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
