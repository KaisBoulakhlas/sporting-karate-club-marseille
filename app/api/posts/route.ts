// app/api/posts/route.ts
import { NextResponse } from 'next/server';
export async function GET({ params }: { params: { slug: string } }) {
  const { slug } = params;
 // console.log("request",slug);
  // const sortedPosts = posts.sort(
  //   (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  // );
  
  // const latestPosts = sortedPosts.slice(1,2);

  return NextResponse.json(JSON.stringify(slug));
}
