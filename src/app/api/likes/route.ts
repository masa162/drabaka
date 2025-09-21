import { NextResponse } from 'next/server';
import { LikeService } from '@/lib/d1/likes';

// POST /api/likes
export async function POST(request: Request) {
  const db = process.env.DB;

  try {
    if (!db) {
      throw new Error("Database connection not found.");
    }
    const body = await request.json();

    // バリデーション
    if (!body.reviewId || !body.userSession) {
      return NextResponse.json({ error: 'reviewId and userSession are required' }, { status: 400 });
    }

    const result = await LikeService.toggleLike(db, body.reviewId, body.userSession);

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error toggling like:', error);
    if (error instanceof Error) {
        return NextResponse.json({ error: `Failed to toggle like: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to toggle like: Unknown error' }, { status: 500 });
  }
}