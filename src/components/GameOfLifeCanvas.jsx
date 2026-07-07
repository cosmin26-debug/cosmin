import { useEffect, useRef } from 'react'
import './GameOfLifeCanvas.css'

// Classic 4x4 ordered (Bayer) dither matrix, normalized to 0..1
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16))

const VOID = [10, 14, 10]
const PINE = [0, 86, 59]
const OLIVE = [107, 142, 35]

function lerp(a, b, t) {
  return a + (b - a) * t
}

function colorAt(glow, bx, by) {
  // glow in [0,1] maps through VOID -> PINE -> OLIVE, dithered via Bayer threshold
  const threshold = BAYER_4[by % 4][bx % 4]
  if (glow <= 0.001) return VOID
  let lower, upper, t
  if (glow < 0.55) {
    lower = VOID
    upper = PINE
    t = glow / 0.55
  } else {
    lower = PINE
    upper = OLIVE
    t = (glow - 0.55) / 0.45
  }
  const pick = t > threshold ? upper : lower
  // slight smoothing so it never looks fully binary
  return [
    lerp(lower[0], pick[0], 0.85),
    lerp(lower[1], pick[1], 0.85),
    lerp(lower[2], pick[2], 0.85),
  ]
}

export default function GameOfLifeCanvas({ interactive = true }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const CELL = 13 // visual size of one Game of Life cell, in CSS px
    const DITHER = 4 // sub-pixels per cell (matches Bayer 4x4)

    let cols = 0
    let rows = 0
    let alive = null
    let glow = null
    let raf = null
    let tickTimer = null
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d', { willReadFrequently: true })

    function neighborCount(a, cols, rows, x, y) {
      let n = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          const nx = (x + dx + cols) % cols
          const ny = (y + dy + rows) % rows
          n += a[ny * cols + nx]
        }
      }
      return n
    }

    function seedRandom() {
      for (let i = 0; i < cols * rows; i++) {
        alive[i] = Math.random() < 0.16 ? 1 : 0
        glow[i] = alive[i]
      }
    }

    function step() {
      const next = new Uint8Array(cols * rows)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const n = neighborCount(alive, cols, rows, x, y)
          const isAlive = alive[i] === 1
          const willLive = isAlive ? n === 2 || n === 3 : n === 3
          next[i] = willLive ? 1 : 0
          if (willLive && !isAlive) {
            glow[i] = 1
          } else if (!willLive && isAlive) {
            // leave glow as-is, it will fade in draw loop
          } else if (willLive && isAlive) {
            glow[i] = Math.min(1, glow[i] + 0.4)
          }
        }
      }
      // sparse re-seed so the pattern never fully dies out
      let liveCount = 0
      for (let i = 0; i < next.length; i++) liveCount += next[i]
      if (liveCount < cols * rows * 0.02) {
        for (let k = 0; k < cols * rows * 0.01; k++) {
          const idx = Math.floor(Math.random() * cols * rows)
          next[idx] = 1
          glow[idx] = 1
        }
      }
      alive = next
    }

    function draw() {
      const offW = cols * DITHER
      const offH = rows * DITHER
      if (off.width !== offW || off.height !== offH) {
        off.width = offW
        off.height = offH
      }
      const imgData = offCtx.createImageData(offW, offH)
      const data = imgData.data
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const g = glow[i]
          if (!reduceMotion) {
            // fade glow toward alive(1)/dead(0) target each frame for smooth transitions
            const target = alive[i]
            glow[i] = lerp(g, target, 0.08)
          }
          for (let sy = 0; sy < DITHER; sy++) {
            for (let sx = 0; sx < DITHER; sx++) {
              const px = x * DITHER + sx
              const py = y * DITHER + sy
              const [r, gr, b] = colorAt(glow[i], px, py)
              const idx = (py * offW + px) * 4
              data[idx] = r
              data[idx + 1] = gr
              data[idx + 2] = b
              data[idx + 3] = 255
            }
          }
        }
      }
      offCtx.putImageData(imgData, 0, 0)
      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(off, 0, 0, offW, offH, 0, 0, canvas.width, canvas.height)
    }

    function resize() {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      cols = Math.max(8, Math.floor(w / CELL))
      rows = Math.max(8, Math.floor(h / CELL))
      alive = new Uint8Array(cols * rows)
      glow = new Float32Array(cols * rows)
      seedRandom()
      draw()
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(wrap)
    resize()

    if (!reduceMotion) {
      tickTimer = setInterval(step, 260)
      const renderLoop = () => {
        draw()
        raf = requestAnimationFrame(renderLoop)
      }
      raf = requestAnimationFrame(renderLoop)
    }

    let lastSeed = 0
    function handlePointer(e) {
      if (reduceMotion || !interactive) return
      const now = performance.now()
      if (now - lastSeed < 60) return
      lastSeed = now
      const rect = canvas.getBoundingClientRect()
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * cols)
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * rows)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (Math.random() > 0.55) continue
          const nx = (x + dx + cols) % cols
          const ny = (y + dy + rows) % rows
          const idx = ny * cols + nx
          alive[idx] = 1
          glow[idx] = 1
        }
      }
    }

    if (interactive) {
      canvas.addEventListener('pointermove', handlePointer)
    }

    return () => {
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (tickTimer) clearInterval(tickTimer)
      canvas.removeEventListener('pointermove', handlePointer)
    }
  }, [interactive])

  return (
    <div ref={wrapRef} className="gol-wrap" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
