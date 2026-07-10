import { useLang, pick } from '../i18n/LanguageContext'
import { projectHref } from '../router'
import { screenshotsFor } from '../data/screenshots'
import './ProjectCard.css'

export default function ProjectCard({ project, index }) {
  const { lang, t } = useLang()
  const { id, title, year, status, location, tags, link, preview } = project
  const description = pick(project.description, lang)
  const statusText = pick(status, lang)
  const num = String(index + 1).padStart(2, '0')

  const firstShot = screenshotsFor(id)[0]
  const previewSrc =
    firstShot?.src ||
    (preview ? import.meta.env.BASE_URL.replace(/\/$/, '') + preview : null)

  return (
    <div className="project-card">
      {previewSrc && (
        <div className="project-card__preview">
          <img
            src={previewSrc}
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
          <span className="project-card__link">{t.work.openDetail} →</span>
        </div>
      </div>

      {/* Stretched link: whole card is clickable without nesting <a> tags. */}
      <a
        className="project-card__stretched-link"
        href={projectHref(id)}
        aria-label={`${t.work.openDetail}: ${title}`}
      />

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="project-card__external"
          onClick={(e) => e.stopPropagation()}
        >
          {t.work.visit}
        </a>
      )}
    </div>
  )
}
