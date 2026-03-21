import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, MapPin, Phone, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SITE_TAGLINE, CONTACT, CERTIFICATIONS } from '@/lib/constants'
import { footerQuickLinks, footerProductLinks } from '@/data/navigation'

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 text-gray-500 border-t border-brand-100">
      <Container>
        {/* Main Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 font-extrabold text-white">
                H
              </div>
              <div>
                <span className="text-lg font-bold text-[#0c2d6b]">Hema</span>
                <span className="ml-1 text-lg font-light text-brand-500">Pharmaceuticals</span>
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold italic text-brand-400">
              &ldquo;{SITE_TAGLINE}&rdquo;
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              A rapidly growing pharmaceutical company committed to delivering
              high-quality Active Pharmaceutical Ingredients to the global market.
            </p>
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold tracking-wider text-[#0c2d6b] uppercase">
                Scan to visit
              </p>
              <Image
                src="/images/qr-code.png"
                alt="QR Code — Hema Pharmaceuticals"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-[#0c2d6b] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-[#0c2d6b] uppercase">
              Products
            </h3>
            <ul className="space-y-2.5">
              {footerProductLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-[#0c2d6b] uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{CONTACT.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-brand-400"
                >
                  <Linkedin className="h-4 w-4 shrink-0 text-brand-400" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Certification badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-brand-100 pt-8">
          {CERTIFICATIONS.map((cert) => (
            <span
              key={cert}
              className="rounded-md border border-brand-200 px-3 py-1.5 text-xs font-medium text-brand-600"
            >
              {cert}
            </span>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-brand-100 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Hema Pharmaceuticals Pvt. Ltd. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
