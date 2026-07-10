import { useEffect } from 'react'
import { projects } from '../data/projects'
import { screenshotsFor } from '../data/screenshots'
import { useLang, pick } from '../i18n/LanguageContext'
import Gallery from './Gallery'
import './ProjectDetail.css'

export default function ProjectDetail({ slug }) {
  const { lang, t } = useLang()
  const project = projects.find((p) => p.id === slug)

  // Each detail page opens scrolled to the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="container section-inner detail detail--missing">
        <p>{t.work.detail.notFound}</p>
        <a href="#top" className="btn btn-outline">
          {t.work.detail.backHome}
        </a>
      </div>
    )
  }

  const { title, year, status, location, tags, link, preview } = project
  const description = pick(project.description, lang)
  const statusText = pick(status, lang)
  const cs = project.caseStudy
  const role = cs ? pick(cs.role, lang) : null
  const timeline = cs ? pick(cs.timeline, lang) : null
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  const shots = screenshotsFor(project.id)
  const images =
    shots.length > 0
      ? shots.map((s) => ({
          src: s.src,
          alt: s.name ? `${title} — ${s.name}` : `${t.work.previewAlt} ${title}`,
        }))
      : [{ src: base + (preview || '/previews/placeholder-wide.svg'), alt: `${t.work.previewAlt} ${title}` }]

  return (
    <article className="detail">
      <div className="container section-inner">
        <a href="#work" className="detail__back">
          {t.work.detail.back}
        </a>

        <div className="detail__head">
          <div className="detail__heading">
            <p className="detail__meta">
              {location} · {year}
            </p>
            <h1>{title}</h1>
          </div>
          {statusText && <span className="project-card__status">{statusText}</span>}
        </div>

        {(role || timeline) && (
          <dl className="detail__facts">
            {role && (
              <div>
                <dt>{t.work.detail.role}</dt>
                <dd>{role}</dd>
              </div>
            )}
            {timeline && (
              <div>
                <dt>{t.work.detail.timeline}</dt>
                <dd>{timeline}</dd>
              </div>
            )}
            <div>
              <dt>{t.work.detail.stack}</dt>
              <dd>{tags.join(' · ')}</dd>
            </div>
          </dl>
        )}

        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="btn btn-solid detail__cta">
            {t.work.detail.visitSite}
          </a>
        )}

        <Gallery
          images={images}
          label={`${t.work.detail.gallery} — ${title}`}
          prevLabel={t.work.detail.prevImage}
          nextLabel={t.work.detail.nextImage}
          expandLabel={t.work.detail.expandImage}
          closeLabel={t.work.detail.closeImage}
        />

        <p className="detail__desc">{description}</p>

        {cs?.sections?.length > 0 ? (
          <div className="detail__sections">
            {cs.sections.map((section, i) => (
              <section key={i} className="detail__section">
                <h2>{pick(section.heading, lang)}</h2>
                <p>{pick(section.body, lang)}</p>
              </section>
            ))}
          </div>
        ) : (
          <p className="detail__soon">{t.work.detail.comingSoon}</p>
        )}

        <div className="detail__tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
