import type { NavItem } from '@/types/common'

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Active Pharmaceutical Ingredients', href: '/products?category=api' },
      { label: 'Sterile APIs', href: '/products?category=sterile' },
      { label: 'API Intermediates', href: '/products?category=intermediate' },
      { label: 'Under Development', href: '/products?category=development' },
    ],
  },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Quality Assurance', href: '/quality' },
  { label: 'Research & Development', href: '/research' },
  { label: 'Leadership', href: '/leadership' },
]

export const footerQuickLinks: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Quality Assurance', href: '/quality' },
  { label: 'Research & Development', href: '/research' },
  { label: 'Global Reach', href: '/global-reach' },
  { label: 'Careers', href: '/careers' },
]

export const footerProductLinks: NavItem[] = [
  { label: 'Active Pharmaceutical Ingredients', href: '/products?category=api' },
  { label: 'Sterile APIs', href: '/products?category=sterile' },
  { label: 'API Intermediates', href: '/products?category=intermediate' },
  { label: 'Under Development', href: '/products?category=development' },
]
