import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop();

  if (!slug) {
    return NextResponse.json({ error: 'Le slug est requis' }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: 'Article introuvable' }, { status: 404 });
    }

    return NextResponse.json(post, { status:200 });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la récupération de l\'article' }, { status: 500 });
  }
}
