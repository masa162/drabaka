import { notFound } from 'next/navigation';
import { DramaService } from '@/lib/d1/dramas';
import { ReviewService } from '@/lib/d1/reviews';
import DramaDetail from '@/components/drama/DramaDetail';
import ReviewList from '@/components/review/ReviewList';
import DramaStats from '@/components/drama/DramaStats';
import QuickRating from '@/components/review/QuickRating';
import { LikeService } from '@/lib/d1/likes';
import { getUserSession } from '@/lib/utils/session';

export default async function DramaPage({ params }: { params: { id: string } }) {
  const db = process.env.DB;
  const dramaId = parseInt(params.id);

  if (!db) {
    return <div>データベース接続エラー: 管理者に連絡してください。</div>;
  }
  if (isNaN(dramaId)) {
    notFound();
  }

  // 並列でデータを取得
  const [drama, reviews, stats] = await Promise.all([
    DramaService.getById(db, dramaId),
    ReviewService.getByDramaId(db, dramaId),
    ReviewService.getStats(db, dramaId)
  ]);

  if (!drama) {
    notFound();
  }

  const userSession = getUserSession();
  const reviewIds = reviews.map(r => r.id);
  const likeInfo = await LikeService.getBulkLikeInfo(db, reviewIds, userSession);

  return (
    <div className="drama-detail-page">
      <DramaStats stats={stats} />
      <DramaDetail drama={drama} />
      <QuickRating dramaId={drama.id} onSuccess={() => { /* revalidate */ }} />
      <ReviewList reviews={reviews} likeInfo={likeInfo} />
    </div>
  );
}

// 静的パス生成（ISR対応）
export async function generateStaticParams() {
  const db = process.env.DB;
  if (!db) return [];

  try {
    const dramas = await DramaService.getAll(db);
    return dramas.map((drama) => ({
      id: drama.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for dramas:', error);
    return [];
  }
}

// メタデータ生成
export async function generateMetadata({ params }: { params: { id: string } }) {
  const db = process.env.DB;
  const dramaId = parseInt(params.id);

  if (!db || isNaN(dramaId)) {
    return { title: 'ドラマ情報' };
  }

  const drama = await DramaService.getById(db, dramaId);

  if (!drama) {
    return { title: '見つかりませんでした' };
  }

  return {
    title: `${drama.title} - ドラマ情報 | ドラマバカ一代`,
    description: `${drama.title}のキャスト、あらすじ、レビュー。${drama.synopsis?.substring(0, 100)}...`,
  };
}