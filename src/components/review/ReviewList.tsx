import { Review } from '@/lib/types/database';
import LikeButton from './LikeButton';

interface ReviewListProps {
  reviews: Review[];
  dramaId: number;
}

export default function ReviewList({ reviews, dramaId }: ReviewListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBrainEmojis = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  if (reviews.length === 0) {
    return (
      <section className="reviews-section mb-l">
        <div className="retro-panel">
          <div className="panel-header">💬 みんなの感想</div>
          <div className="panel-content">
            <div className="no-reviews">
              <p className="text-center color-muted">
                📝 まだレビューがありません。<br />
                最初の感想を投稿してみませんか？
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews-section mb-l">
      <div className="retro-panel">
        <div className="panel-header">
          💬 みんなの感想 ({reviews.length}件)
        </div>
        <div className="panel-content">
          <div className="review-list">
            {reviews.map((review, index) => (
              <div key={review.id} className={`review-item ${index < reviews.length - 1 ? 'mb-m' : ''}`}>
                {/* レビューヘッダー */}
                <div className="review-header mb-s">
                  <div className="reviewer-info">
                    <span className="reviewer-name font-bold color-primary">
                      {review.nickname}
                    </span>
                    <span className="review-rating ml-m">
                      {getBrainEmojis(review.rating)}
                      <span className="rating-text color-muted ml-s">
                        ({review.rating}/5)
                      </span>
                    </span>
                  </div>
                  <span className="review-date color-muted">
                    {formatDate(review.created_at)}
                  </span>
                </div>

                {/* レビューコンテンツ */}
                {review.comment && (
                  <div className="review-content mb-s">
                    <p className="review-text">
                      {review.comment}
                    </p>
                  </div>
                )}

                {/* レビューアクション */}
                <div className="review-actions">
                  <LikeButton reviewId={review.id} />
                  
                  {/* バカ度レベル表示（2000年代風演出） */}
                  <div className="baka-level ml-m">
                    {review.rating === 5 && (
                      <span className="baka-badge baka-max sparkle">🏆 バカ度MAX</span>
                    )}
                    {review.rating === 4 && (
                      <span className="baka-badge baka-high">⭐ 重症</span>
                    )}
                    {review.rating === 3 && (
                      <span className="baka-badge baka-mid">🙂 中等症</span>
                    )}
                    {review.rating === 2 && (
                      <span className="baka-badge baka-low">😊 軽症</span>
                    )}
                    {review.rating === 1 && (
                      <span className="baka-badge baka-min">😐 正常</span>
                    )}
                  </div>
                </div>

                {/* 区切り線（最後以外） */}
                {index < reviews.length - 1 && (
                  <hr className="review-divider mt-m" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}