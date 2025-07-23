'use client';

import Link from 'next/link';
import { Drama } from '@/lib/types/database';

interface CurrentDramasProps {
  dramasByDay: {[key: string]: Drama[]};
  onLinkClick?: () => void;
}

export default function CurrentDramas({ dramasByDay, onLinkClick }: CurrentDramasProps) {
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
    if (!timeslot) return '未定';
    // \"月21:00\" → \"21:00\" に変換
    return timeslot.replace(/^[月火水木金土日]/, '');
  };

  const truncateText = (text: string, maxLength: number = 18) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getCurrentDay = () => {
    const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();
  const daysOrder = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'];
  
  // 全ドラマを1つのリストに統合（曜日順、時間順でソート）
  const allDramas = daysOrder.flatMap(day => {
    const dramas = dramasByDay[day] || [];
    return dramas.map(drama => ({
      ...drama,
      dayOfWeek: day,
      dayShort: getDayShort(day),
      isToday: day === currentDay
    }));
  }).sort((a, b) => {
    // 曜日順 → 時間順でソート
    const dayOrder = daysOrder.indexOf(a.dayOfWeek) - daysOrder.indexOf(b.dayOfWeek);
    if (dayOrder !== 0) return dayOrder;
    
    const timeA = getTimeShort(a.timeslot);
    const timeB = getTimeShort(b.timeslot);
    return timeA.localeCompare(timeB);
  });
  
  return (
    <div className="retro-panel">
      <div className="panel-header">
        📺 放送中のドラマ
      </div>
      <div className="panel-content">
        <div className="current-dramas-schedule">
          {/* 統合されたドラマスケジュール表 */}
          <div className="drama-schedule-table-unified">
            {allDramas.map((drama, index) => {
              // 同じ曜日の先頭行かどうかを判定
              const isFirstOfDay = index === 0 || allDramas[index - 1].dayOfWeek !== drama.dayOfWeek;
              
              return (
                <Link 
                  key={drama.id} 
                  href={`/drama/${drama.id}`} 
                  className={`drama-schedule-row-unified ${drama.isToday ? 'today-drama' : ''}`}
                  onClick={onLinkClick}
                >
                  <div className="drama-day-col">
                    {isFirstOfDay ? drama.dayShort : ''}
                    {drama.isToday && isFirstOfDay && <span className="today-dot">●</span>}
                  </div>
                  <div className="drama-time-col">
                    {getTimeShort(drama.timeslot)}
                  </div>
                  <div className="drama-title-col">
                    {truncateText(drama.title)}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* フッター情報 */}
        <div className="schedule-footer">
          <div className="schedule-note">
            <p className="note-text">
              🗓️ 2025年 夏クール ({allDramas.length}番組)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}