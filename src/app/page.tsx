import {
  HeroHome,
  StatsSection,
  AboutPreview,
  ProductHighlights,
  Timeline,
  CertificationGrid,
  GlobalReachPreview,
  PartnerLogos,
  CTABanner,
} from '@/components/sections'

export default function HomePage() {
  return (
    <main className="bg-[#f0f9ff]">
      <HeroHome />
      <StatsSection />
      <PartnerLogos />
      <AboutPreview />
      <ProductHighlights />
      <Timeline />
      <CertificationGrid />
      <GlobalReachPreview />
      <CTABanner />
    </main>
  )
}
