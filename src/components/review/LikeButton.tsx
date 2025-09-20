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

    if (loading) return;

    setLoading(true);
    setError(null);

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
      
      setIsLiked(result.liked);
      setLikeCount(result.likeCount);
      
      // 成功時のフィードバック（2000年代風演出）
      if (result.liked) {
        const button = document.querySelector(`[data-review-id="${reviewId}"] .like-button`);
        if (button) {
          button.classList.add('like-animation');
          setTimeout(() => {
            button.classList.remove('like-animation');
          }, 600);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setError(error instanceof Error ? error.message : 'いいねに失敗しました');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getLikeButtonText = () => {
    if (loading) return '処理中...';
    return '👍 いいね';
  };

  const getLikeButtonClass = () => {
    let className = 'retro-button like-button';
    if (isLiked) {
      className += ' retro-button--primary like-button--active';
    }
    if (loading) {
      className += ' like-button--loading';
    }
    return className;
  };

  return (
    <div className="like-button-container" data-review-id={reviewId}>
      <button 
        onClick={handleLikeClick}
        disabled={loading || !userSession}
        className={getLikeButtonClass()}
        title={isLiked ? 'いいねを取り消す' : 'いいねする'}
      >
        {getLikeButtonText()} ({likeCount})
      </button>
      
      {error && (
        <div className="like-error">
          <span className="error-text">❌ {error}</span>
        </div>
      )}
      
      {likeCount > 0 && !loading && (
        <div className="like-stats">
          {likeCount >= 10 && (
            <span className="like-milestone sparkle">🔥 人気レビュー！</span>
          )}
          {likeCount >= 5 && likeCount < 10 && (
            <span className="like-milestone">⭐ 注目レビュー</span>
          )}
        </div>
      )}
    </div>
  );
}