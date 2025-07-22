import { DramaService } from '@/lib/supabase/dramas';
import { ReviewService } from '@/lib/supabase/reviews';
import Link from 'next/link';

export default async function HomePage() {
  // 実際のデータを取得
  const [featuredWeekly, featuredPopular, completedDramas, latestReviews] = await Promise.all([
    DramaService.getFeaturedWeekly(),
    DramaService.getFeaturedPopular(),
    DramaService.getCompletedDramas(),
    ReviewService.getLatest(3)
  ]);
  
  return (
    <div className="homepage">
      {/* 今週の要注意ドラマ */}
      <section className="featured-section mb-l">
        <div className="retro-panel">
          <div className="panel-header">
            <span className="sparkle">⚠️ 今週の要注意</span>
          </div>
          <div className="panel-content">
            {featuredWeekly ? (
              <div className="featured-drama">
                <Link href={`/drama/${featuredWeekly.id}`}>
                  <h3 className="mb-s">📺 {featuredWeekly.title}</h3>
                </Link>
                <div className="drama-meta mb-s">
                  <span className="color-primary">🏢 {featuredWeekly.broadcaster}</span> | 
                  <span className="color-primary">⏰ {featuredWeekly.timeslot || '時間未定'}</span> | 
                  <span className="color-primary">🎭 {featuredWeekly.main_cast || '出演者情報準備中'}</span>
                </div>
                <div className="warning-flags mb-s">
                  <span className="retro-button retro-button--danger">バカ度MAX</span>
                  <span className="retro-button">中毒注意</span>
                </div>
                <p className="color-muted">
                  {featuredWeekly.synopsis || 'このドラマは見始めたら最後、気がついたら次の話を見ているという恐ろしいドラマです...'}
                </p>
              </div>
            ) : (
              <div className="featured-drama">
                <h3 className="mb-s">📺 今週の要注意ドラマを準備中</h3>
                <p className="color-muted">
                  バカ度MAXなドラマを厳選中です。しばらくお待ちください...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 話題のドラマ（実データ） */}
      <section className="current-dramas mb-l">
        <div className="retro-panel">
          <div className="panel-header">📺 話題のドラマ</div>
          <div className="panel-content">
            <div className="drama-grid">
              {featuredPopular.length > 0 ? featuredPopular.map((drama) => (
                <Link key={drama.id} href={`/drama/${drama.id}`} className="drama-card-link">
                  <div className="drama-card">
                    <div className="drama-card-header mb-s">
                      <h3 className="drama-card-title">📺 {drama.title}</h3>
                      <span className={`drama-status drama-status--${drama.status}`}>
                        {drama.status === 'completed' ? '完了' : drama.status === 'airing' ? '放送中' : '予定'}
                      </span>
                    </div>
                    <div className="drama-card-meta mb-s">
                      <span className="color-muted">🏢 {drama.broadcaster}</span><br />
                      <span className="color-muted">⏰ {drama.timeslot}</span>
                    </div>
                    <div className="drama-card-stats">
                      <span className="rating">📺 {drama.genre}</span><br />
                      <span className="review-count color-muted">🎭 {drama.main_cast}</span>
                    </div>
                  </div>
                </Link>
              )) : (
                <p className="color-muted">話題のドラマを準備中です...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 最新レビュー（実データ） */}
      <section className="recent-reviews mb-l">
        <div className="retro-panel">
          <div className="panel-header">📝 最新の感想</div>
          <div className="panel-content">
            <div className="review-list">
              {latestReviews.map((review) => (
                <div key={review.id} className="review-item mb-m">
                  <div className="review-header mb-s">
                    <span className="reviewer-name font-bold">{review.nickname}</span>
                    <span className="review-rating">{'🧠'.repeat(review.rating)}</span>
                    <span className="review-date color-muted">
                      {new Date(review.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <div className="review-content mb-s">
                    <p>{review.comment}</p>
                  </div>
                  <div className="review-actions">
                    <button className="retro-button retro-button--primary">
                      👍 同じ穴のムジナ (0)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ・更新情報 */}
      <section className="updates mb-l">
        <div className="retro-panel">
          <div className="panel-header">📢 お知らせ</div>
          <div className="panel-content">
            <div className="update-list">
              <div className="update-item mb-s">
                <span className="update-date color-muted">2025/07/21</span>
                <span className="update-text">
                  🎉 <strong>ドラマバカ一代 v2</strong> リニューアルオープン！
                </span>
              </div>
              <div className="update-item mb-s">
                <span className="update-date color-muted">2025/07/21</span>
                <span className="update-text">
                  ✨ 新機能: レビュー投稿・いいね機能を追加
                </span>
              </div>
              <div className="update-item mb-s">
                <span className="update-date color-muted">2025/07/21</span>
                <span className="update-text">
                  🧠 懐かしの2000年代デザインを完全再現
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* サイト説明 */}
      <section className="site-description">
        <div className="retro-panel">
          <div className="panel-header">🧠 このサイトについて</div>
          <div className="panel-content">
            <p className="mb-m">
              <strong>ドラマバカ一代 v2</strong> は、40代over↑の地上波ドラマ好き日本人のための感想サイトです。
            </p>
            <p className="mb-m">
              見すぎて頭おかしくなったヤツら同士で、気軽にドラマの感想を共有しましょう！
            </p>
            <div className="feature-list">
              <p className="mb-s">✅ <strong>匿名投稿</strong>: お気軽に感想をどうぞ</p>
              <p className="mb-s">✅ <strong>5段階バカ度評価</strong>: 🧠で評価</p>
              <p className="mb-s">✅ <strong>同じ穴のムジナ機能</strong>: 共感したらいいね！</p>
              <p className="mb-s">✅ <strong>2000年代風デザイン</strong>: ノスタルジー満載</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}