import { useState } from 'react'
import { email, socials } from '../data/socials'
import { useLang } from '../i18n/LanguageContext'
import './Contact.css'


const FORM_ENDPOINT = 'https://formspree.io/f/mgojqrqp'

export default function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked — the mailto link below still works
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get('name') || ''
    const message = data.get('message') || ''
    const replyTo = data.get('email') || ''

    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent(`${t.contact.subject} ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${replyTo})`)
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact">
      <div className="container section-inner contact">
        <div className="section-head">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2>{t.contact.title}</h2>
        </div>

        <div className="contact__grid">
          <div className="contact__panel" role="group" aria-label={t.contact.panelLabel}>
            <p className="contact__line">
              <span className="contact__prompt">$</span> mail --to cosmin
            </p>
            <div className="contact__email-row">
              <a href={`mailto:${email}`} className="contact__email">
                {email}
              </a>
              <button type="button" className="contact__copy" onClick={copyEmail}>
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>

            <p className="contact__line contact__line--muted">$ ls ./elsewhere</p>
            <ul className="contact__socials">
              {socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    <span className="contact__soon">
                      {s.label} · {t.contact.soon}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="name">{t.contact.name}</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className="contact__field">
              <label htmlFor="email">{t.contact.email}</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="contact__field">
              <label htmlFor="message">{t.contact.message}</label>
              <textarea id="message" name="message" rows={5} required />
            </div>
            <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
              {status === 'sending' ? t.contact.sending : t.contact.send}
            </button>
            {status === 'sent' && (
              <p className="contact__status contact__status--ok">{t.contact.sent}</p>
            )}
            {status === 'error' && (
              <p className="contact__status contact__status--err">
                {t.contact.error.replace('{email}', email)}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
