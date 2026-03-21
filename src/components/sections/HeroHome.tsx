'use client'

import { useEffect } from 'react'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

export function HeroHome() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='min-h-screen bg-navy-950'>
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc='/videos/hallway.mp4'
        bgImageSrc='/images/hero-back.png'
        title='Unwavering Quality, Unmatched Consistency'
        date='WHO-GMP Certified API Manufacturer'
        scrollToExpand='Scroll to Explore'
        textBlend
      />
    </div>
  )
}
