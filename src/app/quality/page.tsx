'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChevronRight, TestTubes, ClipboardCheck, FlaskConical, Timer, FileCheck,
  ShieldCheck, Award, FileCheck2
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { CTABanner } from '@/components/sections/CTABanner'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const processSteps = [
  { icon: TestTubes, title: 'Raw Material Testing', description: 'Incoming materials undergo rigorous identity, purity, and quality testing before approval for production.' },
  { icon: ClipboardCheck, title: 'In-Process Controls', description: 'Critical process parameters are monitored at every stage with real-time sampling and analysis.' },
  { icon: FlaskConical, title: 'Finished Product Testing', description: 'Comprehensive analytical testing including assay, impurities, residual solvents, and microbial limits.' },
  { icon: Timer, title: 'Stability Studies', description: 'ICH-compliant accelerated and long-term stability studies under controlled temperature and humidity conditions.' },
  { icon: FileCheck, title: 'Release & Documentation', description: 'Complete batch documentation, certificates of analysis, and regulatory-compliant release procedures.' },
]

const certifications = [
  { name: 'WHO-GMP Certification', year: '2020', icon: ShieldCheck, description: 'World Health Organization Good Manufacturing Practice certified facility, ensuring international manufacturing standards.', isNew: false },
  { name: 'CDSCO Written Confirmation', year: '2024', icon: FileCheck2, description: 'Central Drugs Standard Control Organisation approval for API manufacturing and export compliance.', isNew: false },
  { name: 'CEP & EU-GMP', year: '2025', icon: Award, description: 'Certificate of Suitability to European Pharmacopoeia and EU-GMP compliance for European market access.', isNew: true },
  { name: 'ISO 9001:2015', year: 'Active', icon: ShieldCheck, description: 'Quality Management System certification ensuring consistent quality processes across all operations.', isNew: false },
  { name: 'ISO 14001:2015', year: 'Active', icon: ShieldCheck, description: 'Environmental Management System certification demonstrating commitment to sustainable operations.', isNew: false },
  { name: 'HALAL Certified', year: 'Active', icon: Award, description: 'Products manufactured in compliance with Halal standards for markets requiring religious certification.', isNew: false },
  { name: 'KOSHER Certified', year: 'Active', icon: Award, description: 'Products manufactured under Kosher supervision meeting the requirements of Kosher dietary laws.', isNew: false },
  { name: 'FSSAI Certified', year: 'Active', icon: FileCheck2, description: 'Food Safety and Standards Authority of India certification for pharmaceutical excipient production.', isNew: false },
]

export default function QualityPage() {
  const philosophyRef = useRef<HTMLElement>(null)
  const philosophyInView = useInView(philosophyRef, { once: true, margin: '-10%' })
  const processRef = useRef<HTMLElement>(null)
  const processInView = useInView(processRef, { once: true, margin: '-10%' })
  const certRef = useRef<HTMLElement>(null)
  const certInView = useInView(certRef, { once: true, margin: '-10%' })

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Quality</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Quality Assurance
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            Uncompromising commitment to cGMP compliance and product excellence at every step
          </motion.p>
        </Container>
      </section>

      {/* ─── QA Philosophy ─── */}
      <section ref={philosophyRef} className="bg-white py-16 md:py-24">
        <Container size="lg">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Our Philosophy</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Quality Built Into Every Molecule</h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                At Hema Pharmaceuticals, quality is not an afterthought — it is the foundation upon which every product is built. Our quality management system is designed to exceed the requirements of cGMP, WHO-GMP, and ICH guidelines, ensuring that every batch we manufacture meets the highest global standards.
              </p>
              <p>
                Our dedicated quality team operates independently from production, providing unbiased oversight of all manufacturing activities. From raw material sourcing to final product release, every step is documented, verified, and validated to guarantee consistency and compliance.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ─── Quality Process Flow ─── */}
      <section ref={processRef} className="bg-gray-50 py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={processInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Our Process</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Five Pillars of Quality Control</h2>
          </motion.div>

          <div className="relative">
            {/* Connection line (desktop) */}
            <div className="absolute top-14 left-0 right-0 h-0.5 bg-brand-200 hidden lg:block" style={{ left: '10%', right: '10%' }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {processSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={processInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.12 * i }}
                  >
                    {/* Numbered circle */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white font-bold text-lg shadow-md">
                      {i + 1}
                    </div>
                    <div className="mt-2 flex h-10 w-10 items-center justify-center">
                      <Icon className="h-5 w-5 text-brand-500" />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Certifications (Expanded) ─── */}
      <section ref={certRef} className="bg-white py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={certInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Certifications</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Quality Without Compromise</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
              Internationally recognized certifications ensuring the highest standards of pharmaceutical manufacturing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.name}
                  className={`relative rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cert.isNew ? 'border-t-4 border-t-gold-500 border-gray-200' : 'border-gray-200 hover:border-brand-200'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={certInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                >
                  {cert.isNew && (
                    <Badge variant="gold" size="sm" className="absolute top-4 right-4">NEW 2025</Badge>
                  )}
                  <Icon className="h-8 w-8 text-brand-500" strokeWidth={1.5} />
                  <h3 className="mt-3 text-base font-semibold text-gray-900">{cert.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-brand-500">{cert.year}</p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{cert.description}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(90deg, #008cc9 0%, #006a9e 100%)' }}>
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Request Quality Documentation</h2>
              <p className="mt-4 text-lg text-white/80 mx-auto max-w-xl">
                Need certificates of analysis, stability data, or DMF documentation? Our quality team is ready to help.
              </p>
              <div className="mt-8">
                <Link href="/contact?type=quality" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-700 transition-all hover:bg-gray-100 hover:shadow-md active:scale-[0.98]">
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
