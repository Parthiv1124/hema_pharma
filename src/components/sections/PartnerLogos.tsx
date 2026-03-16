'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const partners = [
  'Wockhardt', 'Alkem', 'Hetero', 'Medley', 'Morepen', "Dr. Reddy's",
  'Intas', 'Lupin', 'Windlas', 'Troikaa', 'Laurus Labs', 'Jubilant Ingrevia',
  'Aristo', 'Aarti Drugs', 'Ajanta Pharma', 'Albert David', 'Themis',
  'Macleods', 'Eris', 'Ind-Swift', 'Akums', 'Optimus', 'Laborate',
  'Piramal', 'FDC', 'Synokem', 'Innova Captab',
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-6 py-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
      >
        {/* Render twice for seamless loop */}
        {[...partners, ...partners].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex h-14 w-40 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-semibold text-gray-400 grayscale transition-all duration-300 hover:text-[#0c2d6b] hover:grayscale-0 hover:-translate-y-0.5 hover:bg-white/80 bg-white/60 backdrop-blur-md border border-white/80"
            style={{ boxShadow: '0 2px 8px rgba(14,64,143,0.05)' }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PartnerLogos() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="overflow-hidden pt-6 pb-16 bg-[#f0f9ff]"
    >
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">
            Trusted By
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c2d6b]">
            Our Partners
          </h2>
        </motion.div>
      </Container>

      <motion.div
        className="mt-10 space-y-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <MarqueeRow />
        <MarqueeRow reverse />
      </motion.div>
    </section>
  )
}
