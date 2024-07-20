import { notFound } from 'next/navigation'

interface BookPageProps {
  params: {
    slug: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  // 여기서 slug에 따라 책 정보를 가져오는 로직을 구현합니다.
  // 예를 들어, 데이터베이스나 API에서 책 정보를 조회할 수 있습니다.
  const bookInfo = getBookInfo(params.slug)

  if (!bookInfo) {
    notFound()
  }

  return (
    <div>
      <h1>{bookInfo.title}</h1>
      <p>{bookInfo.description}</p>
      {/* 책에 대한 더 자세한 정보를 여기에 표시합니다 */}
    </div>
  )
}

// 이 함수는 실제로 책 정보를 가져오는 로직을 구현해야 합니다.
function getBookInfo(slug: string) {
  // 예시 데이터
  const books = {
    'book-1': { title: '첫 번째 책', description: '첫 번째 책에 대한 설명' },
    'book-2': { title: '두 번째 책', description: '두 번째 책에 대한 설명' },
  }
  return books[slug as keyof typeof books] || null
}