'use client';

import Link from 'next/link';
import { Drama } from '@/lib/types/database';

interface CurrentDramasProps {
  dramasByDay: {[key: string]: Drama[]};
  onLinkClick?: () => void;
}

export default function CurrentDramas({ dramasByDay, onLinkClick }: CurrentDramasProps) {
  // デバッグ用ログ（一時的）
  console.log('CurrentDramas - dramasByDay:', dramasByDay);
  console.log('CurrentDramas - Object.keys:', Object.keys(dramasByDay));
  
  // 各曜日のドラマ数詳細チェック
  Object.keys(dramasByDay).forEach(day => {
    console.log(`CurrentDramas - ${day}:`, dramasByDay[day].length, dramasByDay[day]);
  });
  
  const getDayShort = (day: string) => {
    switch (day) {
      case '月曜日': return '月';
      case '火曜日': return '火';
      case '水曜日': return '水';
      case '木曜日': return '木';
      case '金曜日': return '金';
      case '土曜日': return '土';
      case '日曜日': return '日';
      default: return '他';
    }
  };

  const getTimeShort = (timeslot: string | null) => {
    if (!timeslot) return '';
    // "月21:00" → "21:00" に変換
    return timeslot.replace(/^[月火水木金土日]/, '');
  };

  const getCurrentDay = () => {
    const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();
  const daysOrder = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'];

  console.log('CurrentDramas - About to return JSX');
  
  return (
    <div>
      {/* 最もシンプルなテスト表示 */}
      <div style={{
        background: 'orange', 
        color: 'black',
        padding: '20px', 
        fontSize: '20px', 
        fontWeight: 'bold',
        margin: '10px',
        border: '3px solid red',
        zIndex: 9999,
        position: 'relative'
      }}>
        🧪 TEST: {Object.values(dramasByDay).flat().length} dramas loaded
      </div>
      
      {/* シンプルなドラマリスト */}
      <div style={{padding: '10px'}}>
        {daysOrder.map((day) => {
          const dramas = dramasByDay[day] || [];
          return dramas.length > 0 ? (
            <div key={day} style={{marginBottom: '10px', padding: '5px', background: 'lightgray'}}>
              <strong>{day}: </strong>
              {dramas.map(drama => (
                <Link 
                  key={drama.id} 
                  href={`/drama/${drama.id}`}
                  style={{
                    textDecoration: 'none', 
                    color: 'inherit',
                    display: 'block',
                    fontSize: '14px', 
                    margin: '2px 0',
                    padding: '2px 0',
                    borderRadius: '3px'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#e0e0e0';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = 'transparent';
                  }}
                  onClick={onLinkClick}
                >
                  • {drama.title} ({drama.broadcaster})
                </Link>
              ))}
            </div>
          ) : null;
        })}
      </div>
      
      <div className="retro-panel" style={{display: 'none'}}>
        <div className="panel-header">
          📺 放送中のドラマ
        </div>
        <div className="panel-content">
          <div className="drama-schedule">
            {daysOrder.map((day) => {
              const dramas = dramasByDay[day] || [];
              const isToday = day === currentDay;
              
              return (
                <div key={day} className={`day-section ${isToday ? 'day-today' : ''}`}>
                  <div className="day-header">
                    <span className="day-label">
                      {getDayShort(day)}
                      {isToday && <span className="today-badge">今日</span>}
                    </span>
                    <span className="drama-count">({dramas.length})</span>
                  </div>
                  
                  {dramas.length > 0 ? (
                    <div className="drama-list">
                      {dramas.map((drama) => (
                        <Link 
                          key={drama.id} 
                          href={`/drama/${drama.id}`} 
                          className="drama-item-link"
                        >
                          <div className="drama-item">
                            <div className="drama-time">
                              {getTimeShort(drama.timeslot)}
                            </div>
                            <div className="drama-info">
                              <div className="drama-title-mini">
                                {drama.title}
                              </div>
                              <div className="drama-broadcaster-mini">
                                {drama.broadcaster}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="no-dramas">
                      <span className="no-dramas-text">放送なし</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* クール風の注釈 */}
          <div className="schedule-note">
            <p className="note-text">
              🗓️ 2025年 冬クール
            </p>
            <p className="note-subtitle">
              毎日更新中 📺
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}