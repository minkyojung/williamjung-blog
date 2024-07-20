'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BookModal from '@/components/BookModal'

interface BookModalPageProps {
  params: {
    slug: string
  }
}

export default function BookModalPage({ params }: BookModalPageProps) {
  const [book, setBook] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // 여기서 실제로는 API 호출 등을 통해 책 정보를 가져와야 합니다.
    const bookData = {
      'book-1': {
        frontCover: "/CoverImage/Front-Cover.png",
        title: "첫 번째 책",
        description: "이 책은 독자들에게 영감을 주는 내용으로 가득합니다."
      },
      'book-2': {
        frontCover: "/CoverImage/Front-Cover.png",
        title: "두 번째 책",
        description: "이 책은 독자들에게 실용적인 지식을 전달합니다."
      }
    }
    setBook(bookData[params.slug as keyof typeof bookData])
  }, [params.slug])

  const handleCloseModal = () => {
    router.push('/')
  }

  const handleGoToBook = () => {
    router.push(`/book/${params.slug}`)
  }

  if (!book) return null

  return (
    <BookModal
      isOpen={true}
      onClose={handleCloseModal}
      frontCover={book.frontCover}
      title={book.title}
      description={book.description}
      onGoToBook={handleGoToBook}
    />
  )
}