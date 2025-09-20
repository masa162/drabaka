import { NextResponse } from 'next/server';
import { DramaService } from '@/lib/d1/dramas';

export const runtime = 'edge'; // Edge Runtimeを指定

// GET /api/dramas
export async function GET() {
  const db = process.env.DB;
  if (!db) {
    return NextResponse.json({ error: 'Database connection not found.' }, { status: 500 });
  }

  try {
    const allDramas = await DramaService.getAll(db);
    return NextResponse.json(allDramas, { status: 200 });

  } catch (error) {
    console.error('Error fetching all dramas:', error);
    if (error instanceof Error) {
        return NextResponse.json({ error: `Failed to fetch dramas: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to fetch dramas: Unknown error' }, { status: 500 });
  }
}
