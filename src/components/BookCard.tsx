import React from 'react'

interface BookCardProps {
  title: string
  backgroundColor: string
  onHover: (color: string) => void
  onLeave: () => void
}

export default function BookCard({ title, backgroundColor, onHover, onLeave }: BookCardProps) {
  return (
    <div 
      className="w-64 aspect-[2/3] flex items-center justify-center p-3 cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg"
      style={{ backgroundColor }}
      onMouseEnter={() => onHover(backgroundColor)}
      onMouseLeave={onLeave}
    >
      <h3 className="text-base font-medium text-center text-white">{title}</h3>
    </div>
  )
}