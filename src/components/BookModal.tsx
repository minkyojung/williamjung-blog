import Image from 'next/image'
import { useState, useEffect } from 'react'

interface BookModalProps {
  isOpen: boolean
  onClose: () => void
  frontCover: string
  title: string
  description: string
  onGoToBook: () => void
}

export default function BookModal({ isOpen, onClose, frontCover, title, description, onGoToBook }: BookModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex mb-4">
          <Image src={frontCover} alt={title} width={200} height={300} className="rounded-lg shadow-lg" />
          <div className="ml-6">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <button 
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            닫기
          </button>
          <button 
            onClick={onGoToBook}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </div>
  )
}