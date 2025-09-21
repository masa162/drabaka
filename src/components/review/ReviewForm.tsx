'use client';

import { useState } from 'react';

interface ReviewFormProps {
  dramaId: number;
  onSuccess: () => void;
}

export default function ReviewForm({ dramaId, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    nickname: '',
    rating: 0,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.rating === 0) {
        throw new Error('評価（★）は必須です');
      }
      if (formData.comment.length > 500) {
        throw new Error('コメントは500文字以内で入力してください');
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drama_id: dramaId,
          nickname: formData.nickname.trim() || '匿名ユーザー',
          rating: formData.rating,
          comment: formData.comment.trim() || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'レビューの投稿に失敗しました。');
      }

      // フォームリセット
      setFormData({ nickname: '', rating: 0, comment: '' });
      onSuccess(); // 親コンポーネントに成功を通知

    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-panel review-form">
      <div className="panel-header">📝 感想を投稿する</div>
      <div className="panel-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickname">ニックネーム (任意)</label>
            <input
              type="text"
              id="nickname"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              className="retro-input"
              maxLength={50}
            />
          </div>
          <div className="form-group">
            <label>評価 (必須)</label>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} title={`${star}点`}>
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={formData.rating === star}
                    onChange={() => setFormData({ ...formData, rating: star })}
                  />
                  <span className="star">★</span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comment">コメント (任意, 500文字まで)</label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="retro-textarea"
              rows={4}
              maxLength={500}
            />
          </div>
          {error && <p className="error-message">エラー: {error}</p>}
          <button type="submit" className="retro-button" disabled={loading}>
            {loading ? '投稿中...' : '投稿する'}
          </button>
        </form>
      </div>
    </div>
  );
}
