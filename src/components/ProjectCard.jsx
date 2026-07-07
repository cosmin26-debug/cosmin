import { useLang, pick } from '../i18n/LanguageContext'
import './ProjectCard.css'

export default function ProjectCard({ project, index }) {
  const { lang, t } = useLang()
  const { title, year, status, location, tags, link, preview } = project
  const description = pick(project.description, lang)
  const statusText = pick(status, lang)
  const num = String(index + 1).padStart(2, '0')

  const CardTag = link ? 'a' : 'div'
  const cardProps = link ? { href: link, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <CardTag className="project-card" {...cardProps}>
      <div className="project-card__layout">
        {preview && (
          <div className="project-card__preview">
            <img
              src={preview}
              alt={`${t.work.previewAlt} ${title}`}
              loading="lazy"
              width="640"
              height="400"
            />
          </div>
        )}

        <div className="project-card__body">
          <div className="project-card__top">
            <span className="project-card__num">{num}</span>
            <div className="project-card__heading">
              <h3>{title}</h3>
              <p className="project-card__meta">
                {location} · {year}
              </p>
            </div>
            {statusText && <span className="project-card__status">{statusText}</span>}
          </div>

          <p className="project-card__desc">{description}</p>

          <div className="project-card__bottom">
            <div className="project-card__tags">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            {link && <span className="project-card__link">{t.work.visit}</span>}
          </div>
        </div>
      </div>
    </CardTag>
  )
}
