import { projects } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import ProjectCard from './ProjectCard'
import './Work.css'

export default function Work() {
  const { t } = useLang()
  return (
    <section id="work">
      <div className="container section-inner">
        <div className="section-head">
          <span className="eyebrow">{t.work.eyebrow}</span>
          <h2>{t.work.title}</h2>
        </div>

        <div className="work__list">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
