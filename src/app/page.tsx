'use client'

import { useRouter } from 'next/navigation'
import Book3D from '@/components/Book3D'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  const books = [
    {
      frontCover: "/CoverImage/writing-front.png",
      backCover: "/CoverImage/writing-back.png",
      spine: "/CoverImage/writing-spine.png",
      slug: "book-1",
      title: "첫 번째 책"
    },
    {
      frontCover: "/CoverImage/capturing-front.png",
      backCover: "/CoverImage/capturing-back.png",
      spine: "/CoverImage/capturing-spine.png",
      slug: "book-2",
      title: "두 번째 책"
    },
    {
      frontCover: "/CoverImage/making-front.png",
      backCover: "/CoverImage/making-back.png",
      spine: "/CoverImage/making-spine.png",
      slug: "book-3",
      title: "세 번째 책"
    }
  ]

  const handleBookClick = (book: { slug: string }) => {
    router.push(`/book/${book.slug}`)
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-[#090909] p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-white mb-4">William Jung</h1>
        <div className="flex justify-center space-x-4">
          <Link href="https://twitter.com/thewilliamjung" className="text-blue-400 hover:text-blue-100">
            Twitter
          </Link>
          <Link href="https://linkedin.com/in/minkyojung" className="text-blue-400 hover:text-blue-100">
            LinkedIn
          </Link>
          <Link href="https://github.com/minkyojung" className="text-blue-400 hover:text-blue-100">
            GitHub
          </Link>
        </div>
      </div>
      <div className="flex space-x-2">
        {books.map((book) => (
          <div 
            key={book.slug} 
            onClick={() => handleBookClick(book)}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
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