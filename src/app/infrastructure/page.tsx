'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, Factory, FlaskConical, Wind, Droplets, Zap,
  X, Thermometer, Image as ImageIcon
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
  { numeric: 100, suffix: '+',   label: 'API Products' },
  { numeric: 40,  suffix: '+',   label: 'International Markets' },
  { numeric: 24,  suffix: '/7',  label: 'Manufacturing Operations' },
]

type GalleryPhoto = { src: string; alt: string }
type Gallery = { name: string; description: string; cover: string; photos: GalleryPhoto[] }

const galleries: Gallery[] = [
  {
    name: 'Warehouse',
    description: 'Climate-controlled storage for raw materials and finished goods',
    cover: '/images/infrastructure/warehouse-1.jpg',
    photos: [
      { src: '/images/infrastructure/warehouse-1.jpg', alt: 'Warehouse storage racking with palletised raw materials' },
      { src: '/images/infrastructure/warehouse-2.jpg', alt: 'Temperature-controlled warehouse storage area' },
      { src: '/images/infrastructure/warehouse-3.jpg', alt: 'Organised warehouse aisles with labelled inventory' },
      { src: '/images/infrastructure/warehouse-4.jpg', alt: 'Finished goods and raw material storage warehouse' },
      { src: '/images/infrastructure/warehouse-5.jpg', alt: 'GMP-compliant warehouse facility' },
    ],
  },
  {
    name: 'Product Development Lab',
    description: 'Process development and scale-up of new API molecules',
    cover: '/images/infrastructure/product-dev-1.jpg',
    photos: [
      { src: '/images/infrastructure/product-dev-1.jpg', alt: 'Product development laboratory workstation' },
      { src: '/images/infrastructure/product-dev-2.jpg', alt: 'Process development glassware and instrumentation' },
      { src: '/images/infrastructure/product-dev-3.jpg', alt: 'Laboratory-scale reaction setup' },
      { src: '/images/infrastructure/product-dev-4.jpg', alt: 'Analytical bench in the product development lab' },
      { src: '/images/infrastructure/product-dev-5.jpg', alt: 'Product development lab equipment' },
    ],
  },
  {
    name: 'R&D Lab',
    description: 'Research and analytical development for new chemistries',
    cover: '/images/infrastructure/rd-1.jpg',
    photos: [
      { src: '/images/infrastructure/rd-1.jpg', alt: 'Research and development laboratory' },
      { src: '/images/infrastructure/rd-2.jpg', alt: 'R&D analytical instrumentation' },
      { src: '/images/infrastructure/rd-3.jpg', alt: 'Research lab workbench and apparatus' },
      { src: '/images/infrastructure/rd-4.png', alt: 'R&D laboratory facility' },
    ],
  },
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
  // Which category gallery is open in the lightbox (null = closed), and the active photo within it
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const openGallery = (categoryIndex: number) => { setActiveCategory(categoryIndex); setPhotoIndex(0) }
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
            <p className="mt-3 text-gray-500">Select a section to view its photo gallery</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleries.map((gallery, i) => (
              <motion.button
                key={gallery.name}
                onClick={() => openGallery(i)}
                className="group relative aspect-[4/3] rounded-xl bg-navy-900 overflow-hidden cursor-pointer text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
              >
                <Image
                  src={gallery.cover}
                  alt={gallery.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for legible text */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                {/* Photo count badge */}
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <ImageIcon className="h-3.5 w-3.5" />
                  {gallery.photos.length}
                </span>
                {/* Title */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-bold text-white">{gallery.name}</h3>
                  <p className="mt-1 text-sm text-white/70 line-clamp-2">{gallery.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-300 transition-colors group-hover:text-brand-200">
                    View photos
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Lightbox Modal (per-category gallery) ─── */}
      <AnimatePresence>
        {activeCategory !== null && (() => {
          const gallery = galleries[activeCategory]
          const photo = gallery.photos[photoIndex]
          const count = gallery.photos.length
          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCategory(null)}
            >
              <motion.div
                className="relative w-full max-w-4xl rounded-2xl bg-navy-900 p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="mb-3 flex items-center justify-between pr-10">
                  <h3 className="text-lg font-bold text-white">{gallery.name}</h3>
                </div>
                <button onClick={() => setActiveCategory(null)} className="absolute top-4 right-4 z-10 rounded-full bg-black/40 p-1.5 text-white/80 hover:text-white">
                  <X className="h-6 w-6" />
                </button>

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy-950">
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-contain"
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4 px-1">
                  <button
                    onClick={() => setPhotoIndex((photoIndex - 1 + count) % count)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-white/60">{photoIndex + 1} / {count}</span>
                  <button
                    onClick={() => setPhotoIndex((photoIndex + 1) % count)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                  >
                    Next →
                  </button>
                </div>

                {/* Thumbnail strip */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {gallery.photos.map((p, idx) => (
                    <button
                      key={p.src}
                      onClick={() => setPhotoIndex(idx)}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all ${idx === photoIndex ? 'ring-2 ring-brand-400' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={p.src} alt={p.alt} fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
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
