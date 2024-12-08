// app/api/posts/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const latestPosts = await prisma.post.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      take: 3,
    });

    return NextResponse.json(latestPosts);
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers articles:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des derniers articles' }, { status: 500 });
  }
}
