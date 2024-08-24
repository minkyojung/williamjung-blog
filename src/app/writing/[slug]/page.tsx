'use server'

import { getPostData } from '@/lib/post';
import Image from 'next/image'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-[#090909]">
      <div className="bg-[#191919] border-[1px] border-[#2a2a2a] rounded-3xl shadow-lg p-20 max-w-3xl w-full my-8">
        <h1 className="text-2xl font-semibold mb-12 text-white text-center">{postData.title}</h1>
        <div 
          className="text-white font-sm prose prose-invert mx-auto"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </div>
    </div>
  );
}