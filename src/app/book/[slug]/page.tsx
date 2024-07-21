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
    'writing': { title: '글쓰기', description: '글쓰기에 대한 설명' },
    'capturing': { title: '촬영', description: '촬영에 대한 설명' },
    'making': { title: '제작', description: '제작에 대한 설명' },
  }
  return books[slug as keyof typeof books] || null
}