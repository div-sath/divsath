import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
}

export default function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function getNavOffset() {
      const nav = document.querySelector('.navbar') as HTMLElement | null
      return nav ? Math.ceil(nav.getBoundingClientRect().height) : 0
    }
    let particles: Particle[] = []
    let raf = 0

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      const navOffset = getNavOffset()
      // position canvas below navbar and size to remaining viewport
      canvas.style.top = navOffset + 'px'
      const width = window.innerWidth
      const height = Math.max(0, window.innerHeight - navOffset)
      canvas.style.left = '0px'
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
    }

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    function initParticles() {
      if (!canvas) return
      const width = parseFloat(canvas.style.width || String(canvas.clientWidth))
      const height = parseFloat(canvas.style.height || String(canvas.clientHeight))
      const area = width * height
      const count = Math.max(10, Math.floor(area / 35000)) // keep low CPU
      particles = []
      for (let i = 0; i < count; i++) {
        const r = rand(0.6, 2.4)
        particles.push({
          x: rand(0, width),
          y: rand(0, height),
          r,
          vx: rand(-0.15, 0.15),
          vy: rand(-0.05, 0.15),
          alpha: rand(0.08, 0.22),
        })
      }
    }

    function draw() {
      if (!ctx || !canvas) return
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // wrap around within the visible canvas area
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        grd.addColorStop(0, `rgba(255,105,180,${p.alpha})`)
        grd.addColorStop(1, `rgba(255,105,180,0)`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop() {
      draw()
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="particle-bg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
