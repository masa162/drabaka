'use client';

import { useState } from 'react';

interface QuickRatingProps {
  dramaId: number;
  onSuccess: () => void;
}

export default function QuickRating({ dramaId, onSuccess }: QuickRatingProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRating = async (rating: number) => {
    setSelectedRating(rating);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drama_id: dramaId,
          nickname: '匿名ユーザー',
          rating: rating,
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
      }
      // 3秒後に初期状態に戻る
      setTimeout(() => {
        setSubmitted(false);
        setSelectedRating(null);
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="retro-panel quick-rating submitted">
        <div className="panel-header">✅ 評価ありがとうございます！</div>
      </div>
    );
  }

  return (
    <div className="retro-panel quick-rating">
      <div className="panel-header">✍️ ワンクリック評価</div>
      <div className="panel-content">
        <div className="star-rating large">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} title={`${star}点`}>
              <input
                type="radio"
                name="quick-rating"
                value={star}
                checked={selectedRating === star}
                onChange={() => handleRating(star)}
                disabled={loading}
              />
              <span className="star">★</span>
            </label>
          ))}
        </div>
        {loading && <p>投稿中...</p>}
        {error && <p className="error-message">エラー: {error}</p>}
      </div>
    </div>
  );
}
