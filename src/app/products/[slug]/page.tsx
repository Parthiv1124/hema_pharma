import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, FlaskConical, FileText, Phone, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import {
  getAllProducts,
  getProductBySlug,
  getProductsByTherapeuticArea,
  categoryLabels,
  therapeuticAreaLabels,
} from '@/lib/products'

/* ─── Static Params (pre-render all product pages at build time) ─── */
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
}

/* ─── Dynamic Metadata per Product ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} | API Products`,
    description: `${product.name} (CAS ${product.casNumber}) — ${product.description} Available from Hema Pharmaceuticals.`,
    openGraph: {
      title: product.name,
      description: product.description,
    },
  }
}

/* ─── JSON-LD Product Schema ─── */
function ProductJsonLd({
  product,
}: {
  product: {
    name: string
    description: string
    casNumber: string
    category: string
    slug: string
  }
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.casNumber,
    category: product.category,
    url: `https://hemapharma.com/products/${product.slug}`,
    manufacturer: {
      '@type': 'Organization',
      name: 'Hema Pharmaceuticals Pvt. Ltd.',
      url: 'https://hemapharma.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/* ─── Spec Row Component ─── */
function SpecRow({ label, value, alt }: { label: string; value?: string | null; alt?: boolean }) {
  if (!value) return null
  return (
    <tr className={alt ? 'bg-gray-50' : 'bg-white'}>
      <td className="py-3 px-4 text-sm font-medium text-gray-600 w-1/3">{label}</td>
      <td className="py-3 px-4 text-sm text-gray-900 text-right">{value}</td>
    </tr>
  )
}

/* ─── Main Detail Page ─── */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  /* Related products: same therapeutic area, exclude current */
  const relatedProducts = getProductsByTherapeuticArea(product.therapeuticArea)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)

  const gradeDisplay =
    product.grade === 'sterile'
      ? 'Sterile'
      : product.grade === 'both'
        ? 'Sterile & Non-Sterile'
        : 'Non-Sterile'

  return (
    <main>
      <ProductJsonLd product={product} />

      {/* ─── Hero ─── */}
      <section className="gradient-hero py-16 pt-32">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white truncate max-w-[200px]">{product.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 font-mono text-lg text-brand-400">{product.casNumber}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Tag className="bg-white/15 text-white border border-white/20 text-sm">
              {categoryLabels[product.category]}
            </Tag>
            <Tag className="bg-white/15 text-white border border-white/20 text-sm">
              {therapeuticAreaLabels[product.therapeuticArea]}
            </Tag>
          </div>
        </Container>
      </section>

      {/* ─── Main Content ─── */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Specifications Table */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <tbody>
                      <SpecRow label="CAS Number" value={product.casNumber} alt />
                      <SpecRow label="Molecular Formula" value={product.molecularFormula} />
                      <SpecRow label="Molecular Weight" value={product.molecularWeight} alt />
                      <SpecRow label="Category" value={categoryLabels[product.category]} />
                      <SpecRow label="Used In Synthesis Of" value={product.parentApi} />
                      <SpecRow label="Grade" value={gradeDisplay} alt />
                      <SpecRow
                        label="Pharmacopeia Compliance"
                        value={product.pharmacopeia?.join(', ')}
                      />
                      <SpecRow label="DMF Status" value={product.dmfStatus} alt />
                      <SpecRow
                        label="Therapeutic Area"
                        value={therapeuticAreaLabels[product.therapeuticArea]}
                      />
                      <SpecRow
                        label="Availability"
                        value={product.available ? 'Available' : 'On Request'}
                        alt
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Interested in this product?
                  </h3>
                  <p className="text-sm text-gray-500 mb-5">
                    Get in touch with our team for samples, certificates, and pricing.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href={`/contact?product=${product.slug}&type=sample`}
                      className="flex items-center justify-center gap-2 w-full rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-md active:scale-[0.98]"
                    >
                      <FlaskConical className="h-4 w-4" />
                      Request Sample
                    </Link>
                    <Link
                      href={`/contact?product=${product.slug}&type=coa`}
                      className="flex items-center justify-center gap-2 w-full rounded-full border-2 border-brand-500 px-5 py-3 text-sm font-semibold text-brand-500 transition-all hover:bg-brand-50 active:scale-[0.98]"
                    >
                      <FileText className="h-4 w-4" />
                      Request CoA
                    </Link>
                    <Link
                      href={`/contact?product=${product.slug}&type=sales`}
                      className="flex items-center justify-center gap-2 w-full rounded-full px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 active:scale-[0.98]"
                    >
                      <Phone className="h-4 w-4" />
                      Contact Sales
                    </Link>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Department Contact
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-brand-500" />
                      <a
                        href="mailto:marketing@hemapharma.com"
                        className="hover:text-brand-500 transition-colors"
                      >
                        marketing@hemapharma.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-brand-500" />
                      <a
                        href="tel:+918591198728"
                        className="hover:text-brand-500 transition-colors"
                      >
                        +91 85911 98728
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Related Products ─── */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <Container>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.slug}`}
                  className="group block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                >
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {rp.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-gray-500">{rp.casNumber}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Tag className="text-xs">{categoryLabels[rp.category]}</Tag>
                    {rp.grade === 'sterile' && (
                      <Badge variant="success" size="sm">
                        Sterile
                      </Badge>
                    )}
                  </div>

                  <div className="mt-3 flex items-center text-sm font-medium text-brand-500 group-hover:text-brand-600 transition-colors">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
