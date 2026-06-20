'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTABanner() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20"
      style={{ background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #38bdf8 100%)' }}
    >
      {/* Hex grid pattern */}
      <div className="pointer-events-none absolute inset-0 hex-pattern-white" aria-hidden="true" />

      {/* Floating hexagons — blue, gold, white mix */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -top-12 -left-12 h-48 w-48 animate-hex-float" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="white" opacity="0.08" />
        </svg>
        <svg className="absolute -right-8 -bottom-8 h-64 w-64 animate-hex-float-reverse" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#FBBF24" strokeWidth="1.5" opacity="0.2" />
        </svg>
        <svg className="absolute top-1/4 right-1/4 h-32 w-32 animate-hex-float" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="white" opacity="0.06" />
        </svg>
        <svg className="absolute top-[60%] left-[8%] h-20 w-20 animate-hex-float-reverse" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="#FBBF24" opacity="0.12" />
        </svg>
        <svg className="absolute top-[10%] left-[35%] h-12 w-12 animate-hex-float" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="white" strokeWidth="2.5" opacity="0.1" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div
          className="rounded-3xl px-8 py-12 sm:px-12"
          style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          <motion.h2
            className="text-3xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Ready to Partner with Us?
          </motion.h2>

          <motion.p
            className="mt-4 text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get in touch with our team to discuss your API requirements
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#0c2d6b] hover:bg-gray-50 font-bold shadow-lg">
                Request a Quote
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              leftIcon={<FileText className="h-4 w-4" />}
            >
              Download Brochure
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
