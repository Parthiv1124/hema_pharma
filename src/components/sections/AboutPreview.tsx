'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'

/* ── Shared content for both desktop + mobile ── */
function TextBlock({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">
        About Us
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0c2d6b] md:text-4xl">
        Pioneering API Excellence Since 2012
      </h2>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
        <p>
          Hema Pharmaceuticals Pvt. Ltd. is a leading manufacturer of active
          pharmaceutical ingredients (APIs) established in 2012. With over a
          decade of expertise, we deliver high-quality API bulk drugs meeting
          the stringent standards of the global healthcare market.
        </p>
        <p>
          Our commitment to excellence and innovation drives us to continuously
          improve our processes. We specialize in sterile injectable grade APIs,
          chiral reaction chemistry, and enzymatic separation.
        </p>
      </div>
      <Link
        href="/about"
        className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-500 transition-colors hover:text-brand-600"
      >
        Learn more about us
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

function HexImage() {
  return (
    <motion.div className="relative">
      <div
        className="flex h-[340px] w-[340px] items-center justify-center md:h-[420px] md:w-[420px]"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-2 text-[#1d4ed8]">
          <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
          <span className="text-sm font-medium">Facility Image</span>
        </div>
      </div>
      <div className="absolute -bottom-4 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-full bg-brand-900/10 blur-xl" />
    </motion.div>
  )
}

const glassStyle = {
  background: 'rgba(255,255,255,0.82)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.9)',
} as const

/* ── Main export ── */
export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section ref={sectionRef} className="[overflow-x:clip] py-16 bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <TextBlock inView={inView} />

          {/* Right column — hex + static badges */}
          <motion.div
            className="relative flex items-center justify-center overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <HexImage />

            {/* Right badge */}
            <div
              className="absolute -right-4 top-[88px] min-w-[134px] rounded-xl px-4 py-3 shadow-lg"
              style={glassStyle}
            >
              <p className="text-xs font-bold text-[#0c2d6b]">257 MT</p>
              <p className="text-[10px] font-medium text-gray-500">Annual Capacity</p>
            </div>

            {/* Left badge */}
            <div
              className="absolute -left-4 bottom-16 min-w-[134px] rounded-xl px-4 py-3 shadow-lg"
              style={glassStyle}
            >
              <p className="text-xs font-bold text-[#0284c7]">40+ Markets</p>
              <p className="text-[10px] font-medium text-gray-500">Global Reach</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
