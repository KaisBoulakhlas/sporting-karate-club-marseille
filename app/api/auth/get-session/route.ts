import { getServerSession } from '@/lib/auth-better';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      user: session.user,
      expires: session.session?.expiresAt,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(null);
  }
}
