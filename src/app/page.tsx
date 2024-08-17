'use client'

import { useRouter } from 'next/navigation'
import Book3D from '@/components/Book3D'
import Hero from '@/components/hero'

export default function Home() {
  const router = useRouter()

  const books = [
    {
      frontCover: "/CoverImage/capturing-front.png",
      backCover: "/CoverImage/capturing-back.png",
      spine: "/CoverImage/capturing-spine.png",
      slug: "capturing",
      title: "Capturing"
    },
    {
      frontCover: "/CoverImage/writing-front.png",
      backCover: "/CoverImage/writing-back.png",
      spine: "/CoverImage/writing-spine.png",
      slug: "writing",
      title: "Writing"
    },
    {
      frontCover: "/CoverImage/making-front.png",
      backCover: "/CoverImage/making-back.png",
      spine: "/CoverImage/making-spine.png",
      slug: "making",
      title: "Making"
    }
  ]

  const handleBookClick = (slug: string) => {
    router.push(`/${slug}`);
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-[#090909] p-8">
      <Hero />
      <div className="flex space-x-2">
        {books.map((book) => (
          <div 
            key={book.slug} 
            onClick={() => handleBookClick(book.slug)}
            className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
          >
            <Book3D 
              frontCover={book.frontCover}
              backCover={book.backCover}
              spine={book.spine}
              slug={book.slug}
            />
          </div>
        ))}
      </div>
    </main>
  )
}