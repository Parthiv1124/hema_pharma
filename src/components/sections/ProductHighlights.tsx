'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Pill, Syringe, Atom, FlaskConical, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const categories = [
  {
    title: 'Active Pharmaceutical Ingredients',
    count: '85+ Products',
    icon: Pill,
    description: 'Wide range of APIs across therapeutic areas',
    href: '/products?category=active-pharmaceutical-ingredients',
  },
  {
    title: 'Sterile APIs',
    count: 'Injectable Grade',
    icon: Syringe,
    description: 'Highest purity sterile manufacturing',
    href: '/products?category=sterile-api',
  },
  {
    title: 'API Intermediates',
    count: 'Custom Synthesis',
    icon: Atom,
    description: 'Key intermediates for API production',
    href: '/products?category=api-intermediates',
  },
  {
    title: 'Under Development',
    count: 'Pipeline',
    icon: FlaskConical,
    description: 'Next-generation molecules in development',
    href: '/products?category=under-development',
  },
]

export function ProductHighlights() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-[#f0f9ff]"
    >
      <Container>
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">
            Our Products
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0c2d6b] md:text-4xl">
            Active Pharmaceutical Ingredients
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            85+ APIs across multiple therapeutic categories
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={cat.href} className="group flex h-full">
                  <div
                    className="flex flex-col h-full w-full rounded-2xl bg-white/60 backdrop-blur-md p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:bg-white/80 border border-white/80"
                    style={{ boxShadow: '0 4px 20px rgba(14,64,143,0.06)' }}
                  >
                    <Icon className="h-12 w-12 text-brand-500" strokeWidth={1.5} />
                    <p className="mt-4 text-sm font-semibold text-brand-500">{cat.count}</p>
                    <h3 className="mt-1 text-xl font-semibold text-[#0c2d6b]">{cat.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{cat.description}</p>
                    <div className="mt-auto pt-6 flex items-center gap-1 text-sm font-semibold text-brand-500 transition-colors group-hover:text-brand-600">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/products">
            <Button variant="primary" size="lg">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
