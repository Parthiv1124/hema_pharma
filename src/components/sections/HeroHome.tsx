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
        bgImageSrc='https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&auto=format&fit=crop&q=80'
        title='Unwavering Quality, Unmatched Consistency'
        date='WHO-GMP Certified API Manufacturer'
        scrollToExpand='Scroll to Explore'
        textBlend
      />
    </div>
  )
}
