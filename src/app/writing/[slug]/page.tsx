'use server'

import { getPostData } from '@/lib/post';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">{postData.title}</h1>
      <div 
        className="text-white prose prose-invert mx-auto max-w-2xl"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </div>
  );
}