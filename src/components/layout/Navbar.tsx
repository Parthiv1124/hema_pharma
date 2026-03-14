'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X, ChevronDown, Pill, Syringe, TestTubes, Microscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mainNavigation } from '@/data/navigation'
import { Button } from '@/components/ui/Button'

const categoryIcons = [
  { icon: Pill, color: 'text-brand-400' },
  { icon: Syringe, color: 'text-emerald-400' },
  { icon: TestTubes, color: 'text-amber-400' },
  { icon: Microscope, color: 'text-purple-400' },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const showSolid = !isHome || scrolled
  const productsNav = mainNavigation.find((n) => n.label === 'Products')

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  }
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 z-50 h-20 transition-all duration-300',
          showSolid
            ? 'bg-white/92 backdrop-blur-xl shadow-[0_2px_20px_rgba(14,64,143,0.08)] border-b border-brand-500/10'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/hema-logo.png"
              alt="Hema Pharmaceuticals"
              width={180}
              height={56}
              className={cn('h-12 w-auto transition-all duration-300', !showSolid && 'brightness-0 invert')}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              const isProducts = item.label === 'Products'

              if (isProducts) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? showSolid ? 'text-brand-600' : 'text-white'
                          : showSolid ? 'text-gray-600 hover:text-brand-600' : 'text-white/85 hover:text-white'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          megaOpen && 'rotate-180'
                        )}
                      />
                    </Link>
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-500" />
                    )}

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {megaOpen && productsNav?.children && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 mt-2 w-[600px] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white/96 p-6 shadow-2xl shadow-brand-900/10 backdrop-blur-xl"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            {productsNav.children.map((child, i) => {
                              const IconComp = categoryIcons[i]?.icon ?? Pill
                              const iconColor = categoryIcons[i]?.color ?? 'text-brand-400'
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMegaOpen(false)}
                                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                                >
                                  <div className={cn('mt-0.5 rounded-lg bg-brand-50 p-2', iconColor)}>
                                    <IconComp className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-600">
                                      {child.label}
                                    </p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <div key={item.label} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? showSolid ? 'text-brand-600' : 'text-white'
                        : showSolid ? 'text-gray-600 hover:text-brand-600' : 'text-white/85 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-500" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden lg:block">
              <Button variant="primary" size="sm">
                Contact Us
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className={cn('rounded-lg p-2 transition-colors lg:hidden', showSolid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10')}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-white lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
              >
                <Image
                  src="/images/hema-logo.png"
                  alt="Hema Pharmaceuticals"
                  width={160}
                  height={50}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col items-center gap-2 px-6">
              {mainNavigation.map((item, i) => {
                const isProducts = item.label === 'Products'

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="w-full max-w-sm"
                  >
                    {isProducts ? (
                      <div>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xl font-semibold text-gray-800 transition-colors hover:text-brand-600"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              'h-5 w-5 transition-transform',
                              mobileProductsOpen && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileProductsOpen && productsNav?.children && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col items-center gap-1 pb-2">
                                {productsNav.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg py-2 text-base text-gray-500 transition-colors hover:text-brand-600"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl py-3 text-center text-xl font-semibold text-gray-800 transition-colors hover:text-brand-600"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * mainNavigation.length, duration: 0.3 }}
                className="mt-6"
              >
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
