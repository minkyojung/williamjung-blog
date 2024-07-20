// components/BookDetails.tsx
export default function BookDetails() {
    return (
      <div className="max-w-md">
        <h1 className="text-xl font-bold mb-4">책 제목</h1>
        <p className="text-gray-400 text-medium mb-4">
          이 책은 독자들에게 영감을 주는 내용으로 가득합니다. 저자의 통찰력 있는 조언과 경험을 통해 
          독자들은 새로운 관점을 얻을 수 있습니다.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          구매하기
        </button>
      </div>
    )
  }