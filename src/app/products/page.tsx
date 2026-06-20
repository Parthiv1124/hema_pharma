'use client'

import { useState, useMemo, useTransition, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid3X3, List, ChevronRight, X, SlidersHorizontal } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import {
  getAllProducts,
  getCategories,
  getTherapeuticAreas,
  categoryLabels,
  therapeuticAreaLabels,
} from '@/lib/products'
import type { ProductCategory, TherapeuticArea, Product } from '@/types/product'

/* ─── JSON-LD (rendered in head via script tag) ─── */
function ProductListJsonLd({ products }: { products: Product[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hema Pharmaceuticals API Product Portfolio',
    description: 'Active Pharmaceutical Ingredients from Hema Pharmaceuticals',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        sku: p.casNumber,
        url: `https://hemapharma.com/products/${p.slug}`,
        manufacturer: {
          '@type': 'Organization',
          name: 'Hema Pharmaceuticals Pvt. Ltd.',
        },
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/* ─── Metadata (client components can't export metadata, so use Head) ─── */
function PageHead() {
  useEffect(() => {
    document.title = 'API Products | Hema Pharmaceuticals'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Explore our portfolio of 100+ Active Pharmaceutical Ingredients including sterile injectable APIs, intermediates, and molecules under development.'
      )
    }
  }, [])
  return null
}

/* ─── Grade Badge ─── */
function GradeBadge({ grade }: { grade: Product['grade'] }) {
  if (grade === 'sterile')
    return (
      <Badge variant="success" size="sm">
        Sterile
      </Badge>
    )
  if (grade === 'both')
    return (
      <Badge variant="success" size="sm">
        Sterile &amp; Non-Sterile
      </Badge>
    )
  return (
    <Badge size="sm" className="bg-gray-100 text-gray-600">
      Non-Sterile
    </Badge>
  )
}

/* ─── Product Card (Grid) ─── */
function ProductCardGrid({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.6) }}
    >
      <Link
        href={`/products/${product.slug}`}
        id={`product-card-${product.slug}`}
        className="group block h-full rounded-2xl border border-white/70 bg-white/65 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/90 hover:bg-white/80 hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.13)]"
      >
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 font-mono text-sm text-gray-500">{product.casNumber}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Tag className="text-xs">{categoryLabels[product.category]}</Tag>
          <Tag className="bg-navy-900/5 text-navy-900 text-xs">
            {therapeuticAreaLabels[product.therapeuticArea]}
          </Tag>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <GradeBadge grade={product.grade} />
          {product.pharmacopeia?.map((p) => (
            <span
              key={p}
              className="inline-flex items-center rounded border border-gray-300 px-1.5 py-0.5 text-[11px] font-medium text-gray-500"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center text-sm font-medium text-brand-500 group-hover:text-brand-600 transition-colors">
          View Details
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Product Card (List) ─── */
function ProductCardList({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-white/70 bg-white/65 p-5 shadow-[0_4px_24px_0_rgba(31,38,135,0.07)] backdrop-blur-md transition-all duration-300 hover:border-white/90 hover:bg-white/80 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors truncate">
            {product.name}
          </h3>
          <p className="font-mono text-sm text-gray-500">{product.casNumber}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag className="text-xs">{categoryLabels[product.category]}</Tag>
          <Tag className="bg-navy-900/5 text-navy-900 text-xs">
            {therapeuticAreaLabels[product.therapeuticArea]}
          </Tag>
          <GradeBadge grade={product.grade} />
        </div>

        <div className="flex items-center text-sm font-medium text-brand-500 group-hover:text-brand-600 transition-colors whitespace-nowrap">
          View Details
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Main Catalog Page ─── */
export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  /* Read URL params */
  const searchQuery = searchParams.get('q') ?? ''
  const categoryFilter = (searchParams.get('category') ?? '') as ProductCategory | ''
  const areaFilter = (searchParams.get('area') ?? '') as TherapeuticArea | ''
  const viewMode = (searchParams.get('view') ?? 'grid') as 'grid' | 'list'

  /* Local search input (synced to URL on change) */
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const allProducts = getAllProducts()
  const categories = getCategories()
  const therapeuticAreas = getTherapeuticAreas()

  /* Update URL search params */
  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString())
        for (const [key, value] of Object.entries(updates)) {
          if (value) params.set(key, value)
          else params.delete(key)
        }
        router.push(`/products?${params.toString()}`, { scroll: false })
      })
    },
    [searchParams, router, startTransition]
  )

  /* Debounced search */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localSearch !== searchQuery) {
        updateParams({ q: localSearch })
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [localSearch, searchQuery, updateParams])

  /* Filtered products */
  const filteredProducts = useMemo(() => {
    let result = allProducts

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.casNumber.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter)
    }

    if (areaFilter) {
      result = result.filter((p) => p.therapeuticArea === areaFilter)
    }

    return result
  }, [allProducts, searchQuery, categoryFilter, areaFilter])

  const hasActiveFilters = searchQuery || categoryFilter || areaFilter

  const clearAllFilters = () => {
    setLocalSearch('')
    updateParams({ q: '', category: '', area: '' })
  }

  return (
    <main>
      <PageHead />
      <ProductListJsonLd products={filteredProducts} />

      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Products</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            API Product Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-white/80"
          >
            {allProducts.length}+ Active Pharmaceutical Ingredients across multiple therapeutic
            categories
          </motion.p>
        </Container>
      </section>

      {/* ─── Filter Bar ─── */}
      <div className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_2px_16px_0_rgba(31,38,135,0.06)]">
        <Container>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 py-4">
            {/* Search */}
            <div className="relative flex-1 min-w-0 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="product-search"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search by product name or CAS number..."
                className="w-full rounded-lg border border-white/60 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch('')
                    updateParams({ q: '' })
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category filter */}
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => updateParams({ category: e.target.value })}
              className="rounded-lg border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-gray-700 backdrop-blur-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label} ({c.count})
                </option>
              ))}
            </select>

            {/* Therapeutic Area filter */}
            <select
              id="area-filter"
              value={areaFilter}
              onChange={(e) => updateParams({ area: e.target.value })}
              className="rounded-lg border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-gray-700 backdrop-blur-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">All Therapeutic Areas</option>
              {therapeuticAreas
                .filter((a) => a.count > 0)
                .map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label} ({a.count})
                  </option>
                ))}
            </select>

            {/* View toggle */}
            <div className="flex rounded-lg border border-white/60 overflow-hidden backdrop-blur-sm bg-white/70">
              <button
                id="view-grid"
                onClick={() => updateParams({ view: 'grid' })}
                className={`px-3 py-2.5 transition-colors ${viewMode === 'grid'
                    ? 'bg-brand-500 text-white'
                    : 'bg-transparent text-gray-500 hover:bg-white/50'
                  }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                id="view-list"
                onClick={() => updateParams({ view: 'list' })}
                className={`px-3 py-2.5 transition-colors ${viewMode === 'list'
                    ? 'bg-brand-500 text-white'
                    : 'bg-transparent text-gray-500 hover:bg-white/50'
                  }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── Results ─── */}
      <section className="relative overflow-hidden py-12" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fb 30%, #f5f0ff 60%, #eef6f0 100%)' }}>
        {/* decorative blobs so glass effect is visible */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-navy-900/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/8 blur-3xl" />
        </div>
        <Container>
          {/* Results count + clear filters */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{' '}
              <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{allProducts.length}</span> products
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-100"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/60 bg-white/65 py-20 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
            >
              <Search className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-600">
                No products found matching your criteria.
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : viewMode === 'grid' ? (
            /* ── Grid View ── */
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredProducts.map((product, i) => (
                  <ProductCardGrid key={product.slug} product={product} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* ── List View ── */
            <AnimatePresence mode="popLayout">
              <motion.div layout className="flex flex-col gap-3">
                {filteredProducts.map((product, i) => (
                  <ProductCardList key={product.slug} product={product} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </Container>
      </section>
    </main>
  )
}
