import { NextResponse } from 'next/server';
import { ReviewService } from '@/lib/d1/reviews';
import { ReviewInsert } from '@/lib/types/database';

export const runtime = 'edge'; // Edge Runtimeを指定

// POST /api/reviews
export async function POST(request: Request) {
  const db = process.env.DB;
  if (!db) {
    return NextResponse.json({ error: 'Database connection not found.' }, { status: 500 });
  }

  try {
    const body = await request.json();

    // バリデーション
    if (!body.drama_id || !body.rating) {
      return NextResponse.json({ error: 'drama_id and rating are required' }, { status: 400 });
    }

    const reviewData: ReviewInsert = {
      drama_id: body.drama_id,
      rating: body.rating,
      comment: body.comment || null,
      nickname: body.nickname || '匿名ユーザー',
    };

    const newReview = await ReviewService.create(db, reviewData);

    return NextResponse.json(newReview, { status: 201 });

  } catch (error) {
    console.error('Error creating review:', error);
    if (error instanceof Error) {
        return NextResponse.json({ error: `Failed to create review: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to create review: Unknown error' }, { status: 500 });
  }
}
