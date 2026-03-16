'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface StatItem {
  value: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { value: 257, suffix: ' MT', label: 'Annual Production Capacity' },
  { value: 85, suffix: '+', label: 'API Products' },
  { value: 40, suffix: '+', label: 'International Markets' },
  { value: 24, suffix: '/7', label: 'Manufacturing Operations' },
]

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true

    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return count
}

function StatCard({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, inView)

  return (
    <motion.div
      className="relative flex flex-col items-center rounded-2xl px-6 py-8 text-center bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_rgba(14,64,143,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(14,64,143,0.12)] hover:bg-white/75"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-4xl font-extrabold text-[#0c2d6b] md:text-5xl">
        {count}
        <span className="text-brand-500">{stat.suffix}</span>
      </span>
      <span className="mt-2 text-sm font-medium text-gray-500 md:text-base">
        {stat.label}
      </span>
    </motion.div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative z-10 -mt-20 pb-4 bg-transparent"
    >
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative flex justify-center">
              {/* Vertical divider (desktop only, skip first) */}
              {i > 0 && (
                <div className="absolute top-4 bottom-4 left-0 hidden w-px bg-brand-100 lg:block" />
              )}
              <StatCard stat={stat} index={i} inView={inView} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
