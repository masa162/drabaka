'use client';

import { useState, useEffect, useMemo } from 'react';
import { Drama } from '@/lib/types/database';
import Link from 'next/link';

export default function SearchPage() {
  const [allDramas, setAllDramas] = useState<Drama[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  // 全ドラマデータをAPIから取得
  useEffect(() => {
    const fetchAllDramas = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/dramas');
        if (!response.ok) {
          throw new Error('Failed to fetch dramas');
        }
        const dramas = await response.json();
        setAllDramas(dramas);
      } catch (error) {
        console.error('ドラマデータ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDramas();
  }, []);

  const filteredDramas = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    return allDramas.filter(drama =>
      drama.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drama.main_cast?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drama.broadcaster.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allDramas]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="search-page">
      <div className="retro-panel">
        <div className="panel-header">🔍 ドラマ検索</div>
        <div className="panel-content">
          <form onSubmit={handleSearch} className="search-form mb-m">
            <input
              type="text"
              placeholder="タイトル、出演者、放送局..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHasSearched(true); // 入力時にリアルタイムで検索結果を表示
              }}
              className="retro-input"
            />
            <button type="submit" className="retro-button">検索</button>
          </form>

          {loading && <p>ロード中...</p>}

          {!loading && hasSearched && (
            <div className="search-results">
              {filteredDramas.length > 0 ? (
                <div className="drama-grid">
                  {filteredDramas.map((drama) => (
                    <Link key={drama.id} href={`/drama/${drama.id}`} className="drama-card-link">
                      <div className="drama-card">
                        <div className="drama-card-header mb-s">
                          <h3 className="drama-card-title">📺 {drama.title}</h3>
                        </div>
                        <div className="drama-card-meta mb-s">
                          <span className="color-muted">🏢 {drama.broadcaster}</span><br />
                          <span className="color-muted">⏰ {drama.timeslot}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="color-muted">該当するドラマが見つかりませんでした。</p>
              )}
            </div>
          )}

          {!loading && !hasSearched && (
            <p className="color-muted">検索ボックスにキーワードを入力してください。</p>
          )}
        </div>
      </div>
    </div>
  );
}
