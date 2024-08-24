'use client'

import React, { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import BookCard from '@/components/BookCard'
import Link from 'next/link'

const carouselPosts = [
  { title: "How to think", slug: "how-to-think", backgroundColor: "#971527" }
]

function adjustColor(color: string, opacity: number): string {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  const adjustedR = Math.round(r * opacity);
  const adjustedG = Math.round(g * opacity);
  const adjustedB = Math.round(b * opacity);
  
  return `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${opacity})`;
}

export default function WritingPage() {
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleHover = (color: string) => {
    setActiveColor(color)
  }

  const handleLeave = () => {
    setActiveColor(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <div 
        className="absolute inset-0 transition-all duration-500 ease-in-out"
        style={{
          background: activeColor 
            ? `linear-gradient(180deg, ${adjustColor(activeColor, 0.8)} 30%, #000000 100%)`
            : 'linear-gradient(180deg, transparent 30%, #000000 100%)',
          opacity: activeColor ? 1 : 0,
          pointerEvents: 'none'
        }}
      />
      
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} w-full max-w-full overflow-hidden`}
      >
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {carouselPosts.map((post) => (
              <CarouselItem 
                key={post.slug} 
                className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
              >
                <Link href={`/writing/${post.slug}`}>
                  <div className="p-1 flex justify-center items-center h-full">
                    <BookCard 
                      title={post.title} 
                      backgroundColor={post.backgroundColor}
                      onHover={handleHover}
                      onLeave={handleLeave}
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </div>
  )
}