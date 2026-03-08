'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Pill } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mainNavigation } from '@/data/navigation'
import { CONTACT, CERTIFICATIONS } from '@/lib/constants'

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const lastScrollY = useRef(0)

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 10)
      if (currentY > 100) {
        setHidden(currentY > lastScrollY.current)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = pathname === '/'
  const isTransparent = isHome && !scrolled && !menuOpen

  return (
    <>
      {/* ─── Header Bar ─── */}
      <motion.header
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-[background,box-shadow] duration-300',
          menuOpen
            ? 'bg-[#1a1a1a]'
            : scrolled
              ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
              : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="relative z-10 flex shrink-0 items-center">
            <Image
              src="/images/hema-logo.png"
              alt="Hema Pharmaceuticals"
              width={160}
              height={48}
              className={cn(
                'h-10 w-auto transition-all duration-300',
                (isTransparent || menuOpen) && 'brightness-0 invert'
              )}
              priority
            />
          </Link>

          {/* Center — MENU / CLOSE toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              'absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200',
              menuOpen
                ? 'text-white/80 hover:text-white'
                : isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
            )}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <>
                <span>Close</span>
                <X className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span className="relative flex items-center gap-2">
                  <span className="flex flex-col gap-[3px]">
                    <span className={cn('block h-[1.5px] w-3.5 rounded-full', isTransparent ? 'bg-white/80' : 'bg-gray-500')} />
                    <span className={cn('block h-[1.5px] w-3.5 rounded-full', isTransparent ? 'bg-white/80' : 'bg-gray-500')} />
                  </span>
                  Menu
                </span>
              </>
            )}
          </button>

          {/* Right — CTA */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className={cn(
              'relative z-10 hidden items-center gap-2 rounded-sm border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 sm:flex',
              menuOpen
                ? 'border-brand-500 bg-brand-500 text-white hover:bg-brand-600 hover:border-brand-600'
                : isTransparent
                  ? 'border-white/30 text-white hover:border-white hover:bg-white/10'
                  : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            )}
          >
            Let&apos;s Connect
            <span className={cn(
              'flex h-5 w-5 items-center justify-center border-l',
              menuOpen ? 'border-white/30' : isTransparent ? 'border-white/30' : 'border-gray-300'
            )}>
              <span className="text-[10px] leading-none">+</span>
            </span>
          </Link>
        </div>
      </motion.header>

      {/* ─── Full-Screen Menu Overlay ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-[#1a1a1a]"
          >
            {/* Content area — below header */}
            <div className="mx-auto max-w-[1440px] px-5 pt-[5.5rem] pb-12 sm:px-8 lg:px-12">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

                {/* Left — Nav Links */}
                <nav className="lg:col-span-4" onMouseLeave={() => setHoveredNav(null)}>
                  <div className="pt-4">
                    {mainNavigation.map((item, i) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                      // Show capsule: on the hovered item, OR on active item if nothing is hovered
                      const showCapsule = hoveredNav
                        ? hoveredNav === item.label
                        : isActive
                      // Highlight text: same logic
                      const highlight = hoveredNav
                        ? hoveredNav === item.label
                        : isActive
                      return (
                        <div key={item.label}>
                          <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -12 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.04 * i,
                              ease: [0.32, 0.72, 0, 1],
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              onMouseEnter={() => setHoveredNav(item.label)}
                              className="flex items-center gap-3 py-2"
                            >
                              {/* Capsule icon — always in flow (w-7 slot), only scales in/out */}
                              <span
                                className="inline-flex w-7 shrink-0 items-center justify-center transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
                                style={{
                                  transform: showCapsule ? 'scale(1)' : 'scale(0)',
                                  opacity: showCapsule ? 1 : 0,
                                }}
                              >
                                <Pill className="h-5 w-5 text-brand-400" />
                              </span>

                              {/* Text — nudges right on hover, color transitions */}
                              <span
                                className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] transition-[transform,color] duration-300 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
                                style={{
                                  transform: showCapsule ? 'translateX(6px)' : 'translateX(0px)',
                                  color: highlight ? 'var(--color-brand-400)' : 'rgba(255,255,255,0.4)',
                                }}
                              >
                                {item.label}
                              </span>
                            </Link>
                          </motion.div>
                        </div>
                      )
                    })}
                  </div>
                </nav>

                {/* Center — Contact Info */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                  className="lg:col-span-4 lg:pt-4"
                >
                  {/* Contact */}
                  <div className="mb-8">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                      Contact
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="block text-sm text-white/80 transition-colors hover:text-brand-400"
                    >
                      {CONTACT.email}
                    </a>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="mt-2 block text-sm text-white/80 transition-colors hover:text-brand-400"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>

                  {/* Address */}
                  <div className="mb-8">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                      Location
                    </p>
                    <p className="max-w-xs text-sm leading-relaxed text-white/80">
                      {CONTACT.address}
                    </p>
                  </div>

                  {/* Social */}
                  <div className="mb-8">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                      Social
                    </p>
                    <a
                      href={CONTACT.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/80 transition-colors hover:text-brand-400"
                    >
                      LinkedIn
                    </a>
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                      Certified Quality
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CERTIFICATIONS.map((cert) => (
                        <span
                          key={cert}
                          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/60"
                        >
                          <Pill className="h-3 w-3 text-brand-500" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right — Feature Images */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="hidden gap-4 lg:col-span-4 lg:grid lg:grid-cols-2 lg:pt-4"
                >
                  {/* Image Card 1 */}
                  <Link
                    href="/manufacturing"
                    onClick={() => setMenuOpen(false)}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white/5">
                      <Image
                        src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=800&fit=crop"
                        alt="Manufacturing facility"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 transition-colors group-hover:text-white/60">
                      Manufacturing
                    </p>
                  </Link>

                  {/* Image Card 2 */}
                  <Link
                    href="/products"
                    onClick={() => setMenuOpen(false)}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white/5">
                      <Image
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=800&fit=crop"
                        alt="Pharmaceutical products"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 transition-colors group-hover:text-white/60">
                      Our Products
                    </p>
                  </Link>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
