import { useEffect, useState } from 'react'
import GameOfLifeCanvas from './GameOfLifeCanvas'
import { useLang } from '../i18n/LanguageContext'
import './Footer.css'

function useRomeTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())

    setTime(format())
    const id = setInterval(() => setTime(format()), 30000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function Footer() {
  const { t } = useLang()
  const romeTime = useRomeTime()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__strip">
        <GameOfLifeCanvas interactive={false} />
      </div>
      <div className="container footer__bottom">
        <p>© {year} Cosmin Grigore</p>
        <p className="footer__clock">
          <span className="footer__dot" /> {romeTime} {t.footer.clock}
        </p>
        <p>{t.footer.built}</p>
      </div>
    </footer>
  )
}
