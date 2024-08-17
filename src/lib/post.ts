import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export const carouselPosts = [
  { title: "Anxiety", slug: "anxiety", backgroundColor: "#971527" },
  { title: "Depression", slug: "depression", backgroundColor: "#20481F" },
  { title: "Bipolar", slug: "bipolar", backgroundColor: "#155297" },
  { title: "Eating Disorder", slug: "eating-disorder", backgroundColor: "#966D0D" },
  { title: "ADHD", slug: "adhd", backgroundColor: "#157997" },
  { title: "Autism", slug: "autism", backgroundColor: "#F1FF33" }
];

export function getPostBackgroundColor(slug: string): string {
  const post = carouselPosts.find(post => post.slug === slug);
  return post ? post.backgroundColor : "#000000";
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string })
  };
}