import QuickRating from '@/components/review/QuickRating';
import type { D1Database } from '@cloudflare/workers-types';

export const runtime = 'edge'; // Edge Runtimeを指定

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DramaPage({ params }: Props) {
  const db = process.env.DB as D1Database;
  if (!db) {
    console.error("Database connection not found.");
    return notFound();
  }

  const { id } = await params;
  const dramaId = parseInt(id);

  if (isNaN(dramaId)) {
    notFound();
  }

  const [drama, reviews, stats] = await Promise.all([
    DramaService.getById(db, dramaId),
    ReviewService.getByDramaId(db, dramaId),
    ReviewService.getStats(db, dramaId)
  ]);

  if (!drama) {
    notFound();
  }

  return (
    <div className="drama-page fade-in">
      <DramaDetail drama={drama} />
      <DramaStats stats={stats} />
      <QuickRating dramaId={dramaId} />
      <ReviewForm dramaId={dramaId} />
      <ReviewList reviews={reviews} dramaId={dramaId} />
    </div>
  );
}

export async function generateStaticParams() {
  const db = process.env.DB as D1Database;
  if (!db) return [];

  try {
    const dramas = await DramaService.getAll(db);
    return dramas.map((drama) => ({
      id: drama.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export const revalidate = 300;

export async function generateMetadata({ params }: Props) {
  const db = process.env.DB as D1Database;
  if (!db) return { title: 'データベース接続エラー' };

  const { id } = await params;
  const dramaId = parseInt(id);
  
  if (isNaN(dramaId)) {
    return { title: 'ドラマが見つかりません - ドラマバカ一代' };
  }

  const drama = await DramaService.getById(db, dramaId);
  
  if (!drama) {
    return { title: 'ドラマが見つかりません - ドラマバカ一代' };
  }

  return {
    title: `${drama.title} - ドラマバカ一代`,
    description: drama.synopsis || `${drama.title}の感想・レビューをチェック！`,
  };
}