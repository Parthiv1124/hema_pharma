'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'

const partners = [
  { name: 'Wockhardt', logo: '/partners/wockhardt.png' },
  { name: 'Alkem', logo: '/partners/alkem.png' },
  { name: 'Hetero', logo: '/partners/hetero.png' },
  { name: 'Medlet', logo: '/partners/medlet.png' },
  { name: 'Morepen', logo: '/partners/morepen.png' },
  { name: 'Dr. Reddy\'s', logo: '/partners/dr reddy.png' },
  { name: 'Intas', logo: '/partners/intas.png' },
  { name: 'Lupin', logo: '/partners/lupin.png' },
  { name: 'Windlas', logo: '/partners/windlas.jpg' },
  { name: 'Troikaa', logo: '/partners/troikka.png' },
  { name: 'Laurus Labs', logo: '/partners/laurus.png' },
  { name: 'Jubilant Ingrevia', logo: '/partners/jubiliant.png' },
  { name: 'Aristo', logo: '/partners/aristo.png' },
  { name: 'Aarti Drugs', logo: '/partners/aarti drugs.png' },
  { name: 'Ajanta Pharma', logo: '/partners/ajanta.jpg' },
  { name: 'Albert David', logo: '/partners/albert david.png' },
  { name: 'Themis', logo: '/partners/themis.png' },
  { name: 'Macleods', logo: '/partners/macleods.png' },
  { name: 'Eris', logo: '/partners/eris.png' },
  { name: 'Ind-Swift', logo: '/partners/ind swift.png' },
  { name: 'Akums', logo: '/partners/Akums_Logo.jpg' },
  { name: 'Optimus', logo: '/partners/optimus.jpeg' },
  { name: 'Laborate', logo: '/partners/laborate.png' },
  { name: 'Piramal', logo: '/partners/piramal.png' },
  { name: 'FDC', logo: '/partners/fdc.png' },
  { name: 'Synokem', logo: '/partners/synokem.jpg' },
  { name: 'Innova Captab', logo: '/partners/innova captab.png' },
  { name: 'Bal Pharma', logo: '/partners/bal pharma.png' },
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex shrink-0 gap-6 py-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
      >
        {/* Render twice for seamless loop */}
        {[...partners, ...partners].map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl px-4 grayscale transition-all duration-300 hover:grayscale-0 hover:-translate-y-0.5 hover:bg-white/80 bg-white/60 backdrop-blur-md border border-white/80"
            style={{ boxShadow: '0 2px 8px rgba(14,64,143,0.05)' }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={48}
              className="object-contain max-h-10 w-auto"
              unoptimized
            />
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
