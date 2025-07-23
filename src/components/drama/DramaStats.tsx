interface DramaStatsProps {
  stats: {
    total: number;
    average: number;
    brainEmojis: string;
  };
}

export default function DramaStats({ stats }: DramaStatsProps) {
  const getRatingLevel = (average: number) => {
    if (average >= 4.5) return { label: '殿堂入り', class: 'rating-max', emoji: '🏆' };
    if (average >= 4.0) return { label: '高評価', class: 'rating-high', emoji: '⭐' };
    if (average >= 3.0) return { label: '好評', class: 'rating-mid', emoji: '🙂' };
    if (average >= 2.0) return { label: '普通', class: 'rating-low', emoji: '😊' };
    return { label: '低評価', class: 'rating-min', emoji: '😐' };
  };

  const ratingLevel = getRatingLevel(stats.average);

  return (
    <section className="drama-stats mb-l">
      <div className="retro-panel">
        <div className="panel-header">
          📊 番組統計
        </div>
        <div className="panel-content">
          {stats.total === 0 ? (
            <div className="no-stats text-center">
              <p className="color-muted mb-m">
                📊 まだレビューがないため、統計データがありません
              </p>
              <p className="color-muted">
                最初のレビューを投稿して、評価を始めましょう！
              </p>
            </div>
          ) : (
            <div className="stats-grid">
              {/* 平均評価 */}
              <div className="stat-item stat-main">
                <div className="stat-header mb-s">
                  <h3 className="stat-title">⭐ 平均評価</h3>
                </div>
                <div className="stat-content">
                  <div className="average-display mb-s">
                    <span className="brain-emojis">{stats.brainEmojis}</span>
                    <span className="average-number">
                      {stats.average.toFixed(1)}/5.0
                    </span>
                  </div>
                  <div className={`baka-level-badge ${ratingLevel.class} sparkle`}>
                    {ratingLevel.emoji} {ratingLevel.label}
                  </div>
                </div>
              </div>

              {/* 総レビュー数 */}
              <div className="stat-item">
                <div className="stat-header mb-s">
                  <h4 className="stat-title">📝 総レビュー数</h4>
                </div>
                <div className="stat-content">
                  <div className="review-count-display">
                    <span className="count-number">{stats.total}</span>
                    <span className="count-label">件</span>
                  </div>
                </div>
              </div>

              {/* 評価分析（2000年代風演出） */}
              <div className="stat-item stat-distribution">
                <div className="stat-header mb-s">
                  <h4 className="stat-title">🎯 評価分析</h4>
                </div>
                <div className="stat-content">
                  <div className="diagnosis-result">
                    {stats.average >= 4.0 && (
                      <div className="diagnosis-text">
                        <p className="color-danger font-bold">
                          🔥 超話題作
                        </p>
                        <p className="color-muted">
                          みんながハマる名作ドラマです
                        </p>
                      </div>
                    )}
                    {stats.average >= 3.0 && stats.average < 4.0 && (
                      <div className="diagnosis-text">
                        <p className="color-primary font-bold">
                          📺 人気作品
                        </p>
                        <p className="color-muted">
                          多くの人が楽しんでいます
                        </p>
                      </div>
                    )}
                    {stats.average < 3.0 && (
                      <div className="diagnosis-text">
                        <p className="color-success font-bold">
                          😊 注目作品
                        </p>
                        <p className="color-muted">
                          これからの評価が楽しみです
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2000年代風の演出エリア */}
          <div className="retro-marquee mt-m">
            <div className="marquee-content">
              <span className="sparkle">
                ⭐ みんなで評価中... 📊 次はあなたの番です！ 💭
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}