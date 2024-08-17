'use server'

import { getPostData } from '@/lib/post';
import Image from 'next/image'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">{postData.title}</h1>
      <p className="text-sm font-light mb-6 text-zinc-500 text-center">{postData.date}</p>
      <div 
        className="text-white font-normal prose prose-invert mx-auto max-w-2xl"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </div>
  );
}