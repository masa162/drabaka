'use client';

import { useState } from 'react';

interface QuickRatingProps {
  dramaId: number;
  onSuccess?: () => void;
}

export default function QuickRating({ dramaId, onSuccess }: QuickRatingProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = async (selectedRating: number) => {
    setRating(selectedRating);
    setLoading(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drama_id: dramaId,
          nickname: '匿名ユーザー',
          rating: selectedRating,
          comment: null, // コメントなし
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '評価の投稿に失敗しました。');
      }

      setSubmitted(true);
      
      if (onSuccess) {
        onSuccess();
      } else {
        // 少し遅らせてページリロード
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('評価投稿エラー:', error);
      setLoading(false);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 5: return '最高でした！';
      case 4: return 'とても良かった';
      case 3: return '楽しめました';
      case 2: return 'まあまあでした';
      case 1: return 'う〜ん...';
      default: return 'タップして評価';
    }
  };

  if (submitted) {
    return (
      <section className="quick-rating-section mb-l">
        <div className="retro-panel">
          <div className="panel-header">⭐ ５段階評価</div>
          <div className="panel-content">
            <div className="rating-success text-center">
              <div className="success-animation mb-m">
                <span className="sparkle text-success" style={{ fontSize: '2rem' }}>
                  🎉 評価ありがとうございます！
                </span>
              </div>
              <div className="submitted-rating mb-m">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="star star-large">
                      {star <= rating ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
                <p className="rating-text">
                  {getRatingText(rating)}
                </p>
              </div>
              <p className="color-muted">
                さらに詳しい感想も書いてみませんか？
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quick-rating-section mb-l">
      <div className="retro-panel">
        <div className="panel-header">⭐ ５段階評価</div>
        <div className="panel-content">
          <div className="quick-rating-content">
            <p className="rating-prompt mb-m text-center">
              <strong>このドラマはいかがでしたか？</strong>
            </p>
            <p className="rating-hint mb-l text-center color-muted">
              星をタップして評価してください（匿名・簡単投稿）
            </p>
            
            <div className="rating-stars-container">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`star-button ${
                      (hoveredRating || rating) >= star ? 'star-active' : ''
                    }`}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => handleRatingClick(star)}
                    disabled={loading}
                  >
                    <span className="star star-large">
                      {(hoveredRating || rating) >= star ? '⭐' : '☆'}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="rating-description text-center mt-s">
                <p className="rating-text">
                  {getRatingText(hoveredRating || rating)}
                </p>
              </div>
            </div>

            {loading && (
              <div className="loading-state text-center mt-m">
                <p className="color-primary">
                  📤 評価を投稿中...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}