// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(JSON.stringify(true));
}
