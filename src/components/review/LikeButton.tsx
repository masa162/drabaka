'use client';

import { useState, useEffect } from 'react';
import { LikeService } from '@/lib/supabase/likes';
import { getUserSession } from '@/lib/utils/session';

interface LikeButtonProps {
  reviewId: string;
  initialCount?: number;
  initialLiked?: boolean;
}

export default function LikeButton({ 
  reviewId, 
  initialCount = 0, 
  initialLiked = false 
}: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<string>('');

  // クライアントサイドでセッションIDを取得
  useEffect(() => {
    const sessionId = getUserSession();
    setUserSession(sessionId);
    
    // 初期状態を取得
    if (sessionId && sessionId !== 'server_session') {
      loadInitialState(sessionId);
    }
  }, [reviewId]);

  const loadInitialState = async (sessionId: string) => {
    try {
      const [count, hasLiked] = await Promise.all([
        LikeService.getLikeCount(reviewId),
        LikeService.hasUserLiked(reviewId, sessionId)
      ]);
      
      setLikeCount(count);
      setIsLiked(hasLiked);
    } catch (error) {
      console.error('Error loading initial like state:', error);
    }
  };

  const handleLikeClick = async () => {
    if (!userSession || userSession === 'server_session') {
      setError('セッションが無効です');
      return;
    }

    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await LikeService.toggleLike(reviewId, userSession);
      
      setIsLiked(result.liked);
      setLikeCount(result.likeCount);
      
      // 成功時のフィードバック（2000年代風演出）
      if (result.liked) {
        // いいね追加時のアニメーション
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
      
      // エラー時は元の状態に戻す
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getLikeButtonText = () => {
    if (loading) return '処理中...';
    if (isLiked) return '👍 同じ穴のムジナ';
    return '👍 同じ穴のムジナ';
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
        disabled={loading}
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
      
      {/* 2000年代風のいいね数表示演出 */}
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