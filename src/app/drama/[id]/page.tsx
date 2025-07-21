import { notFound } from 'next/navigation';
import { DramaService } from '@/lib/supabase/dramas';
import { ReviewService } from '@/lib/supabase/reviews';
import DramaDetail from '@/components/drama/DramaDetail';
import ReviewList from '@/components/review/ReviewList';
import DramaStats from '@/components/drama/DramaStats';
import ReviewForm from '@/components/review/ReviewForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DramaPage({ params }: Props) {
  const { id } = await params;
  const dramaId = parseInt(id);

  if (isNaN(dramaId)) {
    notFound();
  }

  // 並列でデータを取得
  const [drama, reviews, stats] = await Promise.all([
    DramaService.getById(dramaId),
    ReviewService.getByDramaId(dramaId),
    ReviewService.getStats(dramaId)
  ]);

  if (!drama) {
    notFound();
  }

  return (
    <div className="drama-page fade-in">
      {/* ドラマ基本情報 */}
      <DramaDetail drama={drama} />
      
      {/* 統計情報 */}
      <DramaStats stats={stats} />
      
      {/* レビュー投稿フォーム */}
      <ReviewForm dramaId={dramaId} />
      
      {/* レビュー一覧 */}
      <ReviewList reviews={reviews} dramaId={dramaId} />
    </div>
  );
}

// 静的パス生成（ISR対応）
export async function generateStaticParams() {
  try {
    const dramas = await DramaService.getAll();
    
    return dramas.map((drama) => ({
      id: drama.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ISR設定（5分間キャッシュ）
export const revalidate = 300;

// メタデータ生成
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const dramaId = parseInt(id);
  
  if (isNaN(dramaId)) {
    return {
      title: 'ドラマが見つかりません - ドラマバカ一代',
    };
  }

  const drama = await DramaService.getById(dramaId);
  
  if (!drama) {
    return {
      title: 'ドラマが見つかりません - ドラマバカ一代',
    };
  }

  return {
    title: `${drama.title} - ドラマバカ一代`,
    description: drama.synopsis || `${drama.title}の感想・レビューをチェック！`,
  };
}