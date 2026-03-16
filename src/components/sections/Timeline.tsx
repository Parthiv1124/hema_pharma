'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion'
import { Container } from '@/components/ui/Container'

/* Translucent yellow hexagon node */
function HexNode({ small = false }: { small?: boolean }) {
  const size = small ? 30 : 44
  const cx = size / 2
  const cy = size / 2
  const r = small ? 12 : 18

  const pts = (radius: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2
      return `${(cx + radius * Math.cos(a)).toFixed(1)},${(cy + radius * Math.sin(a)).toFixed(1)}`
    }).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ filter: 'drop-shadow(0 0 5px rgba(251,191,36,0.55))', overflow: 'visible' }}
    >
      {/* Outer halo ring */}
      <polygon
        points={pts(r + 5)}
        fill="rgba(251,191,36,0.06)"
        stroke="rgba(251,191,36,0.22)"
        strokeWidth="1"
      />
      {/* Main hexagon — translucent yellow */}
      <polygon
        points={pts(r)}
        fill="rgba(251,191,36,0.18)"
        stroke="rgba(251,191,36,0.85)"
        strokeWidth="1.75"
      />
      {/* Inner hex dot */}
      <polygon
        points={pts(r * 0.32)}
        fill="rgba(251,191,36,0.9)"
      />
    </svg>
  )
}

const milestones = [
  { year: 2012, description: 'Embarked on the production of API intermediates' },
  { year: 2015, description: 'Proudly began production of Active Pharmaceutical Ingredients' },
  { year: 2017, description: 'Received GMP certification for quality and compliance' },
  { year: 2020, description: 'Manufacturing standards recognized with WHO-GMP Standard' },
  { year: 2021, description: 'Constructed a new GMP Manufacturing block' },
  { year: 2022, description: 'Production capacity increased to 257 Metric Tonnes' },
  { year: 2023, description: 'Strengthened R&D and QA capacities for developing and filing DMFs' },
  { year: 2024, description: 'Written Confirmation received from The Central Drugs Standard Control Organisation' },
  { year: 2025, description: 'CEP and EU-GMP certification achieved' },
]

/* --- Desktop: Horizontal scroll timeline (receives scrollYProgress from parent) --- */
function DesktopTimeline({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [maxShift, setMaxShift] = useState(0)

  useEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current
      const rail = railRef.current
      if (!wrap || !rail) return
      setMaxShift(Math.max(0, rail.scrollWidth - wrap.clientWidth))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="hidden lg:block">
      {/* Progress bar */}
      <div className="relative mx-auto mb-10 h-1 max-w-5xl overflow-hidden rounded-full bg-brand-100">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Horizontal rail */}
      <div ref={wrapRef} className="overflow-hidden">
        <motion.div
          ref={railRef}
          className="flex gap-12 px-8"
          style={{ x }}
        >
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="relative flex w-[260px] shrink-0 flex-col items-center text-center"
            >
              {/* Connecting line */}
              {i < milestones.length - 1 && (
                <div className="absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(260px-8px)] bg-brand-100" />
              )}
              {/* Hex node */}
              <div className="relative z-10 flex items-center justify-center">
                <HexNode />
              </div>
              {/* Year + Description card */}
              <div
                className="mt-4 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-md border border-white/80"
                style={{ boxShadow: '0 2px 12px rgba(14,64,143,0.06)' }}
              >
                <span className="text-2xl font-bold text-[#0c2d6b]">{m.year}</span>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{m.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* --- Mobile: Vertical timeline --- */
function MobileTimeline() {
  return (
    <div className="relative lg:hidden">
      {/* Vertical line centred on the hex (hex is 30px wide → centre at 15px) */}
      <div className="absolute top-0 bottom-0 left-[14px] w-0.5 bg-brand-100" />
      {milestones.map((m, i) => (
        <MobileNode key={m.year} milestone={m} index={i} />
      ))}
    </div>
  )
}

function MobileNode({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start gap-3 pb-10 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hex node — in-flow, never overlaps card */}
      <div className="relative z-10 shrink-0">
        <HexNode small />
      </div>
      {/* Card */}
      <div
        className="flex-1 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-md border border-white/80"
        style={{ boxShadow: '0 2px 12px rgba(14,64,143,0.06)' }}
      >
        <span className="text-xl font-bold text-[#0c2d6b]">{milestone.year}</span>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{milestone.description}</p>
      </div>
    </motion.div>
  )
}

/* --- Main Section --- */
export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  // scrollYProgress spans the full tall container — starts the moment the
  // section top hits the viewport top, ends when the bottom leaves
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <>
      {/* ── Desktop: tall scroll-driver, sticky inner content ── */}
      <div ref={containerRef} className="hidden lg:flex" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen w-full bg-white flex flex-col justify-center py-16">
          <Container>
            {/* Header */}
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">
                Our Journey
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0c2d6b] md:text-4xl">
                A Decade of Growth
              </h2>
            </div>
            <DesktopTimeline scrollYProgress={scrollYProgress} />
          </Container>
        </div>
      </div>

      {/* ── Mobile: normal vertical layout, unaffected by sticky ── */}
      <section className="py-16 bg-white lg:hidden">
        <Container>
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">
              Our Journey
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0c2d6b] md:text-4xl">
              A Decade of Growth
            </h2>
          </div>
          <MobileTimeline />
        </Container>
      </section>
    </>
  )
}
