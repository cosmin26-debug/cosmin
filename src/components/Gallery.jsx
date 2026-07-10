import { useCallback, useEffect, useRef, useState } from 'react'
import './Gallery.css'

export default function Gallery({ images, label, prevLabel, nextLabel, expandLabel, closeLabel }) {
  const trackRef = useRef(null)
  const closeRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const count = images.length

  const goTo = useCallback(
    (i, instant = false) => {
      const clamped = Math.max(0, Math.min(count - 1, i))
      setIndex(clamped)
      const slide = trackRef.current?.children[clamped]
      if (!slide) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      trackRef.current.scrollTo({
        left: slide.offsetLeft,
        behavior: instant || reduceMotion ? 'auto' : 'smooth',
      })
    },
    [count]
  )

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const i = Math.round(track.scrollLeft / track.clientWidth)
    setIndex(Math.max(0, Math.min(count - 1, i)))
  }

  useEffect(() => {
    if (!expanded) return
    const track = trackRef.current
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      track?.focus()
    }
  }, [expanded])

  useEffect(() => {
    if (!expanded) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setExpanded(false)
      if (e.key === 'ArrowLeft') goTo(index - 1, true)
      if (e.key === 'ArrowRight') goTo(index + 1, true)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [expanded, index, goTo])

  return (
    <>
      <div className="gallery" role="group" aria-label={label}>
        <div
          className="gallery__track"
          ref={trackRef}
          onScroll={onScroll}
          tabIndex={count > 1 ? 0 : undefined}
        >
          {images.map((img, i) => (
            <figure className="gallery__slide" key={img.src}>
              <button
                type="button"
                className="gallery__zoom"
                onClick={() => setExpanded(true)}
                aria-label={`${expandLabel} — ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              </button>
            </figure>
          ))}
        </div>

        {count > 1 && (
          <div className="gallery__controls">
            <button
              type="button"
              className="gallery__btn"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label={prevLabel}
            >
              ←
            </button>
            <span className="gallery__counter" aria-hidden="true">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="gallery__btn"
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              aria-label={nextLabel}
            >
              →
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={(e) => {
            if (e.target === e.currentTarget) setExpanded(false)
          }}
        >
          <button
            type="button"
            className="gallery__btn lightbox__close"
            ref={closeRef}
            onClick={() => setExpanded(false)}
            aria-label={closeLabel}
          >
            ✕
          </button>

          <img className="lightbox__img" src={images[index].src} alt={images[index].alt} />

          {count > 1 && (
            <div className="lightbox__controls">
              <button
                type="button"
                className="gallery__btn"
                onClick={() => goTo(index - 1, true)}
                disabled={index === 0}
                aria-label={prevLabel}
              >
                ←
              </button>
              <span className="gallery__counter" aria-hidden="true">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="gallery__btn"
                onClick={() => goTo(index + 1, true)}
                disabled={index === count - 1}
                aria-label={nextLabel}
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
