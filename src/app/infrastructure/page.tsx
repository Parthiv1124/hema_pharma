'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, Factory, FlaskConical, Wind, Droplets, Zap,
  Warehouse, X, Beaker, Microscope, Package, Building, Settings, Thermometer
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { CTABanner } from '@/components/sections/CTABanner'

/* ─── Count-up hook ─── */
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
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return count
}

/* ─── ScrollReveal ─── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const stats = [
  { numeric: 257, suffix: ' MT', label: 'Annual Production Capacity' },
  { numeric: 85,  suffix: '+',   label: 'API Products' },
  { numeric: 40,  suffix: '+',   label: 'International Markets' },
  { numeric: 24,  suffix: '/7',  label: 'Manufacturing Operations' },
]

const facilityImages = [
  { name: 'Production Floor', icon: Factory },
  { name: 'Clean Rooms', icon: Wind },
  { name: 'QC Laboratory', icon: Beaker },
  { name: 'Microbiology Lab', icon: Microscope },
  { name: 'Warehouse', icon: Warehouse },
  { name: 'R&D Lab', icon: FlaskConical },
  { name: 'Packaging Area', icon: Package },
  { name: 'Utility Block', icon: Settings },
  { name: 'Admin Building', icon: Building },
]

const highlights = [
  { icon: Factory, title: 'Multi-Purpose Reactors', description: 'Versatile reactor systems for diverse API synthesis from 500L to 10KL capacity' },
  { icon: Thermometer, title: 'SS/GLR/Hastelloy Vessels', description: 'Specialized reaction vessels for corrosive and high-temperature processes' },
  { icon: Droplets, title: 'Centrifugation & Filtration', description: 'Advanced solid-liquid separation with ANFD, centrifuges, and Nutsche filters' },
  { icon: Wind, title: 'HVAC Systems', description: 'Pharmaceutical-grade climate control with HEPA filtration and pressure cascades' },
  { icon: Zap, title: 'ETP Plant', description: 'Zero liquid discharge effluent treatment plant for sustainable operations' },
  { icon: FlaskConical, title: 'Clean Room Facilities', description: 'ISO-classified clean rooms for sterile API manufacturing and handling' },
]

/* ─── Animated stat card ─── */
function StatItem({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCountUp(stat.numeric, inView)
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-4xl md:text-5xl font-extrabold text-[#0c2d6b]">
        {count}<span className="text-brand-500">{stat.suffix}</span>
      </div>
      <p className="mt-2 text-sm text-gray-500 font-medium">{stat.label}</p>
    </motion.div>
  )
}

export default function InfrastructurePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const statsRef = useRef<HTMLElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-10%' })
  const galleryRef = useRef<HTMLElement>(null)
  const galleryInView = useInView(galleryRef, { once: true, margin: '-10%' })
  const highlightsRef = useRef<HTMLElement>(null)
  const highlightsInView = useInView(highlightsRef, { once: true, margin: '-10%' })

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Infrastructure</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            World-Class Infrastructure
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            State-of-the-art manufacturing facility in Ankleshwar, Gujarat — built for scale, precision, and compliance
          </motion.p>
        </Container>
      </section>

      {/* ─── Capacity Stats ─── */}
      <section ref={statsRef} className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} inView={statsInView} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Facility Gallery ─── */}
      <section ref={galleryRef} className="bg-gray-50 py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={galleryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Our Facility</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Manufacturing Facility Tour</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilityImages.map((img, i) => {
              const Icon = img.icon
              return (
                <motion.button
                  key={img.name}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-[4/3] rounded-xl bg-gradient-to-br from-navy-900 to-navy-950 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <Icon className="h-12 w-12 text-brand-400/60 group-hover:text-brand-400 transition-colors" strokeWidth={1.5} />
                    <span className="mt-3 text-white font-medium text-sm">{img.name}</span>
                  </div>
                  <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/10 transition-colors" />
                </motion.button>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl rounded-2xl bg-navy-900 p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-white/60 hover:text-white">
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col items-center justify-center py-12">
                {(() => { const Icon = facilityImages[lightboxIndex].icon; return <Icon className="h-24 w-24 text-brand-400" strokeWidth={1} /> })()}
                <h3 className="mt-6 text-2xl font-bold text-white">{facilityImages[lightboxIndex].name}</h3>
                <p className="mt-2 text-gray-400 text-sm">Facility image placeholder — upload actual photos</p>
              </div>
              {/* Navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setLightboxIndex((lightboxIndex - 1 + facilityImages.length) % facilityImages.length)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % facilityImages.length)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Infrastructure Highlights ─── */}
      <section ref={highlightsRef} className="bg-white py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={highlightsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Key Capabilities</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Infrastructure Highlights</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="flex gap-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── Plant Video ─── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Virtual Tour</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">See Our Facility in Action</h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-xl">
              <video
                className="w-full aspect-video object-cover"
                controls
                preload="metadata"
              >
                <source src="/videos/Infrastructure.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ─── CTA Banner ─── */}
      <CTABanner />
    </main>
  )
}
