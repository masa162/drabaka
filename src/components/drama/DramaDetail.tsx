import { Drama } from '@/lib/types/database';

interface DramaDetailProps {
  drama: Drama;
}

export default function DramaDetail({ drama }: DramaDetailProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'airing': return '放送中';
      case 'completed': return '完了';
      case 'upcoming': return '予定';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'airing': return 'drama-status--airing';
      case 'completed': return 'drama-status--completed';
      case 'upcoming': return 'drama-status--upcoming';
      default: return '';
    }
  };

  const getSeasonLabel = (season: string) => {
    switch (season) {
      case 'spring': return '春';
      case 'summer': return '夏';
      case 'autumn': return '秋';
      case 'winter': return '冬';
      default: return season;
    }
  };

  return (
    <section className="drama-info mb-l">
      <div className="retro-panel">
        <div className="panel-header">
          📺 ドラマ詳細情報
        </div>
        <div className="panel-content">
          {/* タイトルとステータス */}
          <div className="drama-title-section mb-m">
            <h1 className="drama-title">
              📺 {drama.title}
            </h1>
            <span className={`drama-status ${getStatusClass(drama.status)}`}>
              {getStatusLabel(drama.status)}
            </span>
          </div>

          {/* 基本情報 */}
          <div className="drama-meta-grid mb-m">
            <div className="meta-item">
              <span className="meta-label">🏢 放送局:</span>
              <span className="meta-value">{drama.broadcaster}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">⏰ 放送時間:</span>
              <span className="meta-value">{drama.timeslot || '情報なし'}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">📅 曜日:</span>
              <span className="meta-value">{drama.air_day || '情報なし'}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">🗓️ 放送年:</span>
              <span className="meta-value">{drama.year}年 {getSeasonLabel(drama.season)}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">🎭 ジャンル:</span>
              <span className="meta-value">{drama.genre || '情報なし'}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">🌟 主要キャスト:</span>
              <span className="meta-value">{drama.main_cast || '情報なし'}</span>
            </div>
          </div>

          {/* あらすじ */}
          {drama.synopsis && (
            <div className="drama-synopsis">
              <h3 className="synopsis-title mb-s">📖 あらすじ</h3>
              <p className="synopsis-content">
                {drama.synopsis}
              </p>
            </div>
          )}

          {/* 警告フラグ（2000年代風演出） */}
          <div className="warning-flags mt-m">
            <div className="warning-item sparkle">
              ⚠️ <strong>中毒注意</strong>: 見始めたら止まらない可能性があります
            </div>
            <div className="warning-item">
              🧠 <strong>バカ度測定中</strong>: みんなの感想で盛り上がろう！
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}