import { useLang } from '../i18n/LanguageContext'
import './Services.css'

export default function Services() {
  const { t } = useLang()
  return (
    <section id="services">
      <div className="container section-inner">
        <div className="section-head">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2>{t.services.title}</h2>
        </div>

        <div className="services__grid">
          {t.services.items.map((item, i) => (
            <article key={item.name} className="services__item">
              <span className="services__marker" aria-hidden="true">
                {/* tiny still-life from the site's automaton: a different Game of Life
                    pattern per service (block, blinker, glider) */}
                <ServiceGlyph index={i} />
              </span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        <p className="services__note">{t.services.note}</p>
      </div>
    </section>
  )
}

const PATTERNS = [
  // block (still life)
  [[1, 1], [2, 1], [1, 2], [2, 2]],
  // blinker (oscillator)
  [[0, 1], [1, 1], [2, 1], [3, 1]],
  // glider
  [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
]

function ServiceGlyph({ index }) {
  const cells = PATTERNS[index % PATTERNS.length]
  const size = 7
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" role="presentation">
      {cells.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x * size}
          y={y * size}
          width={size - 1}
          height={size - 1}
          fill="var(--olive)"
        />
      ))}
    </svg>
  )
}
