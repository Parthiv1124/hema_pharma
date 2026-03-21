'use client'

import { useState, memo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { markets, regions, type Market, type Region } from './marketsData'

// ─── Hand-tuned pin positions (% of the map image) ─────────────────────────
// Calibrated for public/images/world-map.png (1050×600, Robinson-style)
const pinPositions: Record<string, { x: number; y: number }> = {
  // Latin America
  'Brazil': { x: 35.5, y: 62.0 },
  'Mexico': { x: 21.1, y: 38.3 },
  'Peru': { x: 28.8, y: 55.0 },
  'Chile': { x: 30.3, y: 68.3 },
  'Guatemala': { x: 22.7, y: 42.0 },
  'Argentina': { x: 31.9, y: 71.0 },

  // Africa
  'Kenya': { x: 53.2, y: 53.7 },
  'Uganda': { x: 53.3, y: 47.3 },
  'Egypt': { x: 54.4, y: 33.3 },

  // Middle East
  'Saudi Arabia': { x: 56.5, y: 43.3 },

  // Europe
  'Germany': { x: 48.6, y: 28.0 },
  'Switzerland': { x: 47.6, y: 30.3 },
  'Spain': { x: 45.6, y: 25.7 },
  'Russia': { x: 62.9, y: 14.0 },

  // Asia
  'South Korea': { x: 77.9, y: 34.7 },
  'China': { x: 70.2, y: 28.3 },
  'Indonesia': { x: 69.0, y: 52.7 },
  'Vietnam': { x: 72.1, y: 36.7 },
  'Thailand': { x: 70.2, y: 38.3 },
  'Bangladesh': { x: 65.9, y: 37.7 },
  'Uzbekistan': { x: 62.9, y: 24.3 },
}

// ─── Gold Pin SVG (teardrop marker) ─────────────────────────────────────────
function GoldPin({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12c0 9 12 22 12 22s12-13 12-22c0-6.627-5.373-12-12-12z"
        fill="#F5A623"
      />
      <circle cx="12" cy="11" r="4.5" fill="white" />
    </svg>
  )
}

// ─── Tooltip ────────────────────────────────────────────────────────────────
interface TooltipProps {
  market: Market
  x: number
  y: number
}

const Tooltip = memo(function Tooltip({ market, x, y }: TooltipProps) {
  return (
    <motion.div
      key={market.country}
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 6 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none fixed z-50"
      style={{ left: x, top: y, transform: 'translate(-50%, -110%)' }}
    >
      <div
        className="min-w-[180px] max-w-[240px] rounded-xl border border-white/10 px-4 py-3 shadow-2xl"
        style={{
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <p className="text-sm font-semibold text-sky-400">{market.country}</p>
        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-slate-400">
          {market.region}
        </p>
        <p className="mt-2 text-xs leading-snug text-slate-300">{market.description}</p>
      </div>
    </motion.div>
  )
})

// ─── Animated Pin ───────────────────────────────────────────────────────────
interface PinProps {
  market: Market
  onEnter: (m: Market, x: number, y: number) => void
  onLeave: () => void
  delay: number
}

const Pin = memo(function Pin({ market, onEnter, onLeave, delay }: PinProps) {
  const pos = pinPositions[market.country]
  if (!pos) return null

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => onEnter(market, e.clientX, e.clientY),
    [market, onEnter],
  )

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -100%)',
      }}
      initial={{ opacity: 0, y: -10, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 260, damping: 20 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.25, y: -2 }}
    >
      <GoldPin size={20} />
    </motion.div>
  )
})

// ─── Region Filter ──────────────────────────────────────────────────────────
interface FilterBarProps {
  active: Region
  onChange: (r: Region) => void
}

const FilterBar = memo(function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {regions.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={[
            'relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200',
            active === r
              ? 'text-white'
              : 'border border-white/10 text-slate-400 hover:border-sky-400/40 hover:text-sky-400',
          ].join(' ')}
        >
          {active === r && (
            <motion.span
              layoutId="pill"
              className="absolute inset-0 rounded-full bg-sky-500"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative">{r}</span>
        </button>
      ))}
    </div>
  )
})

// ─── Main Component ─────────────────────────────────────────────────────────
export default function MarketsMap() {
  const [activeRegion, setActiveRegion] = useState<Region>('All')
  const [tooltip, setTooltip] = useState<{ market: Market; x: number; y: number } | null>(null)

  const visibleMarkets =
    activeRegion === 'All' ? markets : markets.filter((m) => m.region === activeRegion)

  const handleEnter = useCallback((market: Market, x: number, y: number) => {
    setTooltip({ market, x, y })
  }, [])

  const handleLeave = useCallback(() => setTooltip(null), [])

  const handleRegion = useCallback((r: Region) => {
    setTooltip(null)
    setActiveRegion(r)
  }, [])

  return (
    <div className="relative w-full select-none">
      {/* Region Filter */}
      <FilterBar active={activeRegion} onChange={handleRegion} />

      {/* Map */}
      <motion.div
        className="relative mt-8 overflow-hidden rounded-2xl"
        style={{ background: '#0f172a' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full">
          <Image
            src="/images/world-map.png"
            alt="World Map"
            width={1050}
            height={600}
            className="w-full h-auto"
            priority
          />

          {/* Pin Overlay */}
          <AnimatePresence mode="popLayout">
            {visibleMarkets.map((m, i) => (
              <Pin
                key={m.country}
                market={m}
                onEnter={handleEnter}
                onLeave={handleLeave}
                delay={i * 0.06}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Tooltip portal */}
      <AnimatePresence>
        {tooltip && (
          <Tooltip market={tooltip.market} x={tooltip.x} y={tooltip.y} />
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <GoldPin size={14} />
        <span className="text-xs text-slate-400">API delivery markets</span>
      </div>
    </div>
  )
}
