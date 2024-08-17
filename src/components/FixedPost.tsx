import React from 'react'
import Book3D from './Book3D'
import Link from 'next/link'

interface FixedPostProps {
  title: string
  slug: string
  coverImage: string
}

export default function FixedPost({ title, slug, coverImage }: FixedPostProps) {
  return (
    <Link href={`/writing/${slug}`}>
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="w-32 h-48">
          <Book3D frontCover={coverImage} backCover={coverImage} spine={coverImage} slug={slug} />
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
    </Link>
  )
}