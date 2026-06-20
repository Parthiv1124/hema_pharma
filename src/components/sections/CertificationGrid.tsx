'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Award, FileCheck, Microscope } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const certifications = [
  {
    name: 'WHO-GMP Certification',
    status: '2020',
    icon: ShieldCheck,
    description: 'World Health Organization Good Manufacturing Practice certified facility, ensuring international manufacturing standards.',
    isNew: false,
    accent: 'brand',
  },
  {
    name: 'CDSCO Written Confirmation',
    status: '2024',
    icon: FileCheck,
    description: 'Central Drugs Standard Control Organisation approval for API manufacturing and export compliance.',
    isNew: false,
    accent: 'emerald',
  },
  {
    name: 'CEP & EU-GMP',
    status: '2025',
    icon: Award,
    description: 'Certificate of Suitability to European Pharmacopoeia and EU-GMP compliance for European market access.',
    isNew: true,
    accent: 'gold',
  },
  {
    name: 'ISO 9001:2015',
    status: 'Active',
    icon: ShieldCheck,
    description: 'Quality Management System certification ensuring consistent quality processes across all operations.',
    isNew: false,
    accent: 'brand',
  },
  {
    name: 'ISO 14001:2015',
    status: 'Active',
    icon: ShieldCheck,
    description: 'Environmental Management System certification demonstrating commitment to sustainable operations.',
    isNew: false,
    accent: 'emerald',
  },
  {
    name: 'HALAL Certified',
    status: 'Active',
    icon: Award,
    description: 'Products manufactured in compliance with Halal standards for markets requiring religious certification.',
    isNew: false,
    accent: 'purple',
  },
  {
    name: 'KOSHER Certified',
    status: 'Active',
    icon: Award,
    description: 'Products manufactured under Kosher supervision meeting the requirements of Kosher dietary laws.',
    isNew: false,
    accent: 'brand',
  },
  {
    name: 'FSSAI Certified',
    status: 'Active',
    icon: FileCheck,
    description: 'Food Safety and Standards Authority of India certification for pharmaceutical excipient production.',
    isNew: false,
    accent: 'emerald',
  },
]

const accentMap = {
  brand: {
    glow: 'rgba(0,140,201,0.35)',
    ring: 'rgba(0,140,201,0.5)',
    iconBg: 'rgba(0,140,201,0.15)',
    iconColor: '#38bdf8',
    statusColor: '#7dd3fc',
  },
  emerald: {
    glow: 'rgba(16,185,129,0.3)',
    ring: 'rgba(16,185,129,0.45)',
    iconBg: 'rgba(16,185,129,0.12)',
    iconColor: '#34d399',
    statusColor: '#6ee7b7',
  },
  gold: {
    glow: 'rgba(251,191,36,0.35)',
    ring: 'rgba(251,191,36,0.55)',
    iconBg: 'rgba(251,191,36,0.12)',
    iconColor: '#fcd34d',
    statusColor: '#fde68a',
  },
  purple: {
    glow: 'rgba(139,92,246,0.3)',
    ring: 'rgba(139,92,246,0.45)',
    iconBg: 'rgba(139,92,246,0.12)',
    iconColor: '#a78bfa',
    statusColor: '#c4b5fd',
  },
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5   // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5   // -0.5 to 0.5
    setTransform(
      `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.03,1.03,1.03)`
    )
  }, [])

  const onMouseLeave = useCallback(() => {
    setTransform('perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)')
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform,
        transition: transform === '' ? 'none' : 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

export function CertificationGrid() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background: '#f0f9ff',
      }}
    >
      {/* Hex grid background */}
      <div className="pointer-events-none absolute inset-0 hex-pattern-blue opacity-50" aria-hidden="true" />

      {/* Floating decorative hexagons */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute top-16 left-[5%] h-20 w-20 animate-hex-float opacity-[0.06]" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#008cc9" strokeWidth="2" />
        </svg>
        <svg className="absolute top-24 right-[8%] h-14 w-14 animate-hex-float-reverse opacity-[0.10]" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="#FBBF24" opacity="0.35" />
        </svg>
        <svg className="absolute bottom-20 left-[12%] h-10 w-10 animate-hex-float opacity-[0.12]" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="#FBBF24" opacity="0.3" />
        </svg>
        <svg className="absolute bottom-12 right-[5%] h-24 w-24 animate-hex-float-reverse opacity-[0.05]" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="#008cc9" />
        </svg>
      </div>

      <Container>
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{
              background: 'rgba(0,140,201,0.12)',
              borderColor: 'rgba(0,140,201,0.35)',
              color: '#7dd3fc',
              backdropFilter: 'blur(12px)',
            }}
          >
            Certifications
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0c2d6b] md:text-4xl lg:text-5xl">
            Quality Without Compromise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Internationally recognized certifications ensuring the highest standards
            of pharmaceutical manufacturing
          </p>
        </motion.div>

        {/* Certification Cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => {
            const Icon = cert.icon
            const acc = accentMap[cert.accent as keyof typeof accentMap]

            return (
              <TiltCard key={cert.name}>
              <motion.div
                className="group relative cursor-default"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Outer glow on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-sm"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${acc.ring}, transparent 70%)` }}
                />

                {/* Card */}
                <div
                  className="relative h-full rounded-2xl p-6 transition-all duration-500 group-hover:-translate-y-1.5"
                  style={{
                    background: cert.isNew
                      ? 'rgba(255,255,255,0.75)'
                      : 'rgba(255,255,255,0.60)',
                    backdropFilter: 'blur(16px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                    border: cert.isNew
                      ? '1px solid rgba(251,191,36,0.5)'
                      : '1px solid rgba(255,255,255,0.85)',
                    boxShadow: cert.isNew
                      ? '0 4px 24px rgba(251,191,36,0.12), 0 1px 0 rgba(255,255,255,0.9) inset'
                      : '0 4px 24px rgba(14,64,143,0.08), 0 1px 0 rgba(255,255,255,0.9) inset',
                  }}
                >
                  {/* Specular highlight streak */}
                  <div
                    className="pointer-events-none absolute top-0 left-6 right-6 h-px"
                    style={{
                      background: cert.isNew
                        ? 'linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                    }}
                  />

                  {/* NEW badge */}
                  {cert.isNew && (
                    <div
                      className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(251,191,36,0.1))',
                        border: '1px solid rgba(251,191,36,0.5)',
                        color: '#fcd34d',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      NEW 2025
                    </div>
                  )}

                  {/* Hexagonal Icon */}
                  <div className="relative">
                    <div
                      className="flex h-12 w-12 items-center justify-center clip-hexagon transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: acc.iconBg,
                        boxShadow: `0 0 16px ${acc.glow}`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: acc.iconColor }} strokeWidth={1.75} />
                    </div>
                    {/* Hex border ring */}
                    <svg className="absolute -inset-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)] -top-0.5 -left-0.5 pointer-events-none" viewBox="0 0 100 100">
                      <polygon points="50,3 97,26 97,74 50,97 3,74 3,26" fill="none" stroke={acc.ring} strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 className="mt-4 text-[15px] font-semibold leading-snug text-[#0c2d6b]">
                    {cert.name}
                  </h3>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: acc.statusColor }}
                  >
                    {cert.status}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {cert.description}
                  </p>

                  {/* Bottom shimmer line on hover */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${acc.ring}, transparent)`,
                      transformOrigin: 'center',
                    }}
                  />
                </div>
              </motion.div>
              </TiltCard>
            )
          })}
        </div>

        {/* Bottom trust line */}
        <motion.div
          className="mt-14 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-200" />
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400">
            All certifications current & verified
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-200" />
        </motion.div>
      </Container>
    </section>
  )
}
