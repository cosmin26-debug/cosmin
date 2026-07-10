import { useRef, useState } from 'react'
import './Gallery.css'

// Horizontal screenshot carousel: native scroll + snap does the heavy
// lifting (touch, trackpad, keyboard arrows when the track is focused),
// the buttons and counter are layered on top of it.
export default function Gallery({ images, label, prevLabel, nextLabel }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const count = images.length

  const scrollToSlide = (i) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[Math.max(0, Math.min(count - 1, i))]
    if (!slide) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const i = Math.round(track.scrollLeft / track.clientWidth)
    setIndex(Math.max(0, Math.min(count - 1, i)))
  }

  return (
    <div className="gallery" role="group" aria-label={label}>
      <div
        className="gallery__track"
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={count > 1 ? 0 : undefined}
      >
        {images.map((img, i) => (
          <figure className="gallery__slide" key={img.src}>
            <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </figure>
        ))}
      </div>

      {count > 1 && (
        <div className="gallery__controls">
          <button
            type="button"
            className="gallery__btn"
            onClick={() => scrollToSlide(index - 1)}
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
            onClick={() => scrollToSlide(index + 1)}
            disabled={index === count - 1}
            aria-label={nextLabel}
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
