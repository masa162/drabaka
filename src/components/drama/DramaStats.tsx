interface DramaStatsProps {
  stats: {
    total: number;
    average: number;
    brainEmojis: string;
  };
}

export default function DramaStats({ stats }: DramaStatsProps) {
  const getBakaLevel = (average: number) => {
    if (average >= 4.5) return { label: 'バカ度MAX', class: 'baka-max', emoji: '🏆' };
    if (average >= 4.0) return { label: '重症', class: 'baka-high', emoji: '⭐' };
    if (average >= 3.0) return { label: '中等症', class: 'baka-mid', emoji: '🙂' };
    if (average >= 2.0) return { label: '軽症', class: 'baka-low', emoji: '😊' };
    return { label: '正常', class: 'baka-min', emoji: '😐' };
  };

  const bakaLevel = getBakaLevel(stats.average);

  return (
    <section className="drama-stats mb-l">
      <div className="retro-panel">
        <div className="panel-header">
          📊 バカ度統計
        </div>
        <div className="panel-content">
          {stats.total === 0 ? (
            <div className="no-stats text-center">
              <p className="color-muted mb-m">
                📊 まだレビューがないため、統計データがありません
              </p>
              <p className="color-muted">
                最初のレビューを投稿して、バカ度を測定しましょう！
              </p>
            </div>
          ) : (
            <div className="stats-grid">
              {/* 平均バカ度 */}
              <div className="stat-item stat-main">
                <div className="stat-header mb-s">
                  <h3 className="stat-title">🧠 平均バカ度</h3>
                </div>
                <div className="stat-content">
                  <div className="average-display mb-s">
                    <span className="brain-emojis">{stats.brainEmojis}</span>
                    <span className="average-number">
                      {stats.average.toFixed(1)}/5.0
                    </span>
                  </div>
                  <div className={`baka-level-badge ${bakaLevel.class} sparkle`}>
                    {bakaLevel.emoji} {bakaLevel.label}
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

              {/* バカ度分布（2000年代風演出） */}
              <div className="stat-item stat-distribution">
                <div className="stat-header mb-s">
                  <h4 className="stat-title">🎯 バカ度診断</h4>
                </div>
                <div className="stat-content">
                  <div className="diagnosis-result">
                    {stats.average >= 4.0 && (
                      <div className="diagnosis-text">
                        <p className="color-danger font-bold">
                          ⚠️ 危険レベル
                        </p>
                        <p className="color-muted">
                          見すぎて完全に頭がやられています
                        </p>
                      </div>
                    )}
                    {stats.average >= 3.0 && stats.average < 4.0 && (
                      <div className="diagnosis-text">
                        <p className="color-primary font-bold">
                          📺 中毒レベル
                        </p>
                        <p className="color-muted">
                          適度にハマって楽しんでいます
                        </p>
                      </div>
                    )}
                    {stats.average < 3.0 && (
                      <div className="diagnosis-text">
                        <p className="color-success font-bold">
                          😊 健全レベル
                        </p>
                        <p className="color-muted">
                          まだ正常な判断力を保っています
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
                🧠 みんなでバカ度を測定中... 📊 次はあなたの番です！ 💭
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}