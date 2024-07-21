'use client'

import Image from 'next/image'

export default function Hero() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="text-center mt-8">
      <div>
        <Image
          src="/profile.png"
          alt="William Jung"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>
      <h1 className="text-lg font-medium text-white mb-2 mt-6">William Jung</h1>
      <p className="text-small text-gray-300 mb-6">Capture, Write, Make sth</p>
      <div className="flex justify-center space-x-4">
        <a href="https://twitter.com/thewilliamjung" onClick={(e) => handleLinkClick(e, "https://twitter.com/thewilliamjung")} className="text-blue-400 hover:text-blue-100 transition-colors p-2 rounded-full hover:bg-[#222222]">
          <span className="inline-block">
            <Image src="/x-logo.svg" alt="X (Twitter)" width={20} height={20} />
          </span>
        </a>
        <a href="https://linkedin.com/in/minkyojung" onClick={(e) => handleLinkClick(e, "https://linkedin.com/in/minkyojung")} className="text-blue-400 hover:text-blue-100 transition-colors p-2 rounded-full hover:bg-[#222222]">
          <span className="inline-block">
            <Image src="/linkedin-logo.svg" alt="LinkedIn" width={20} height={20} />
          </span>
        </a>
        <a href="https://github.com/minkyojung" onClick={(e) => handleLinkClick(e, "https://github.com/minkyojung")} className="text-blue-400 hover:text-blue-100 transition-colors p-2 rounded-full hover:bg-[#222222]">
          <span className="inline-block">
            <Image src="/github-logo.svg" alt="GitHub" width={20} height={20} />
          </span>
        </a>
      </div>
    </div>
  )
}