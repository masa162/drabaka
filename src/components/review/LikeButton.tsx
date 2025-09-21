'use client';

import { useState, useEffect } from 'react';
import { getUserSession } from '@/lib/utils/session';

interface LikeButtonProps {
  reviewId: string;
  initialCount: number;
  initialLiked: boolean;
}

export default function LikeButton({
  reviewId,
  initialCount,
  initialLiked
}: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userSession = getUserSession(); // セッションIDは一度だけ取得

  // 親から渡された初期値が変更された場合に同期する
  useEffect(() => {
    setLikeCount(initialCount);
    setIsLiked(initialLiked);
  }, [initialCount, initialLiked]);

  const handleLikeClick = async () => {
    if (!userSession) {
      setError('セッションが無効です');
      return;
    }
    setLoading(true);
    setError(null);

    // UIを即時反映
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId: reviewId,
          userSession: userSession
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'いいねに失敗しました');
      }

      const result = await response.json();

      // サーバーからの正式な値で同期
      setIsLiked(result.liked);
      setLikeCount(result.likeCount);

    } catch (error) {
      console.error('Error toggling like:', error);
      setError(error instanceof Error ? error.message : 'いいねに失敗しました');
      // エラー時はUIを元に戻す
      setIsLiked(isLiked);
      setLikeCount(likeCount);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getLikeButtonClass = () => {
    let classes = 'retro-button like-button';
    if (isLiked) classes += ' liked';
    if (loading) classes += ' loading';
    return classes;
  };

  return (
    <div className="like-button-container" data-review-id={reviewId}>
      <button
        onClick={handleLikeClick}
        disabled={loading || !userSession}
        className={getLikeButtonClass()}
        title={isLiked ? 'いいねを取り消す' : 'いいねする'}
      >
        <span className="like-icon">{isLiked ? '❤️' : '🤍'}</span>
        <span className="like-text">いいね</span>
        {likeCount > 0 && (
          <span className="like-count">{likeCount}</span>
        )}
      </button>
      {error && <p className="error-message" style={{ fontSize: '12px', color: 'red', marginTop: '4px' }}>{error}</p>}
    </div>
  );
}
