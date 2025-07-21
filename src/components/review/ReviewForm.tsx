'use client';

import { useState } from 'react';
import { ReviewService } from '@/lib/supabase/reviews';
import { ReviewInsert } from '@/lib/types/database';

interface ReviewFormProps {
  dramaId: number;
  onSuccess?: () => void;
}

export default function ReviewForm({ dramaId, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    nickname: '匿名バカ仲間',
    rating: 3,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // バリデーション
      if (formData.nickname.trim().length === 0) {
        throw new Error('ニックネームを入力してください');
      }
      if (formData.nickname.length > 20) {
        throw new Error('ニックネームは20文字以内で入力してください');
      }
      if (formData.comment.length > 500) {
        throw new Error('コメントは500文字以内で入力してください');
      }

      const reviewData: ReviewInsert = {
        drama_id: dramaId,
        nickname: formData.nickname.trim(),
        rating: formData.rating,
        comment: formData.comment.trim() || null
      };

      await ReviewService.create(reviewData);
      
      // フォームリセット
      setFormData({
        nickname: '匿名バカ仲間',
        rating: 3,
        comment: ''
      });
      setShowForm(false);
      
      // 成功時の処理
      if (onSuccess) {
        onSuccess();
      } else {
        // ページリロード（シンプルな更新方式）
        window.location.reload();
      }
    } catch (error) {
      console.error('レビュー投稿エラー:', error);
      setError(error instanceof Error ? error.message : '投稿に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const getRatingDescription = (rating: number) => {
    switch (rating) {
      case 5: return 'バカ度MAX - 完全に頭がやられた';
      case 4: return '重症 - かなりハマってしまった';
      case 3: return '中等症 - そこそこ楽しめた';
      case 2: return '軽症 - まぁまぁだった';
      case 1: return '正常 - う〜ん...';
      default: return '';
    }
  };

  if (!showForm) {
    return (
      <section className="review-form-section mb-l">
        <div className="retro-panel">
          <div className="panel-header">📝 感想を書く</div>
          <div className="panel-content">
            <div className="review-form-cta">
              <p className="cta-message mb-m">
                🧠 <strong>あなたもバカ度を測定してみませんか？</strong>
              </p>
              <p className="cta-description mb-l color-muted">
                見すぎて頭おかしくなったヤツら同士で感想を共有しましょう！匿名なので気軽に投稿できます。
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="retro-button retro-button--primary review-form-trigger"
              >
                ✍️ 感想を書く
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="review-form-section mb-l">
      <div className="retro-panel">
        <div className="panel-header">📝 感想を書く</div>
        <div className="panel-content">
          {error && (
            <div className="error-message mb-m">
              <p className="color-danger">❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="review-form">
            {/* ニックネーム */}
            <div className="form-group">
              <label className="form-label" htmlFor="nickname">
                👤 ニックネーム
              </label>
              <input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                className="form-input"
                maxLength={20}
                placeholder="匿名バカ仲間"
                disabled={loading}
              />
              <p className="form-hint">20文字以内で入力してください</p>
            </div>
            
            {/* バカ度評価 */}
            <div className="form-group">
              <label className="form-label">
                🧠 バカ度評価
              </label>
              <div className="star-rating-form">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="star-label">
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={formData.rating === star}
                      onChange={() => handleRatingChange(star)}
                      disabled={loading}
                    />
                    <span className={`star ${formData.rating >= star ? 'star-active' : ''}`}>
                      🧠
                    </span>
                  </label>
                ))}
              </div>
              <p className="rating-description">
                {getRatingDescription(formData.rating)}
              </p>
            </div>
            
            {/* コメント */}
            <div className="form-group">
              <label className="form-label" htmlFor="comment">
                💬 感想・コメント
              </label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="form-textarea review-textarea"
                placeholder="このドラマについて一言どうぞ！どんな風に頭がおかしくなったか教えてください..."
                maxLength={500}
                disabled={loading}
                rows={4}
              />
              <p className="form-hint">
                {formData.comment.length}/500文字
                {formData.comment.length === 0 && ' (任意)'}
              </p>
            </div>
            
            {/* 投稿ボタン */}
            <div className="form-actions">
              <button 
                type="submit" 
                disabled={loading || formData.nickname.trim().length === 0}
                className="retro-button retro-button--primary submit-button"
              >
                {loading ? '投稿中...' : '🚀 投稿する'}
              </button>
              
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="retro-button cancel-button"
              >
                キャンセル
              </button>
            </div>
          </form>

          {/* 注意事項 */}
          <div className="form-notice mt-m">
            <p className="notice-text">
              📢 <strong>注意:</strong> 投稿した感想は削除できません。内容をよく確認してから投稿してください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}