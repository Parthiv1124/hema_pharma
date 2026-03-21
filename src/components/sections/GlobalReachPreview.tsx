'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import dynamic from 'next/dynamic'

const MarketsMap = dynamic(() => import('@/components/markets/MarketsMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] items-center justify-center rounded-2xl bg-[#1e3a8a]">
      <span className="text-sm text-slate-500">Loading map…</span>
    </div>
  ),
})

export function GlobalReachPreview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24"
      style={{ background: 'linear-gradient(180deg, #1e3a8a 0%, #0369a1 100%)' }}
    >

      <Container>
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center rounded-2xl px-8 py-6"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-widest text-sky-300 uppercase">
            Global Presence
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Serving 40+ International Markets
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/80">
            From our manufacturing facility in Ankleshwar, Gujarat, we export APIs
            to markets across 6 continents
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          className="mt-12 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <MarketsMap />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link href="/global-reach">
            <Button variant="primary" size="lg">
              Explore Our Global Network
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>

    </section>
  )
}
