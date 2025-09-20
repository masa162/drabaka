'use client';

import { useState, useEffect } from 'react';
import { Drama } from '@/lib/types/database';
import Link from 'next/link';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drama[]>([]);
  const [allDramas, setAllDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 全ドラマデータをAPIから取得
  useEffect(() => {
    const fetchAllDramas = async () => {
      try {
        const response = await fetch('/api/dramas');
        if (!response.ok) {
          throw new Error('Failed to fetch dramas');
        }
        const dramas = await response.json();
        setAllDramas(dramas);
      } catch (error) {
        console.error('ドラマデータ取得エラー:', error);
      }
    };
    
    fetchAllDramas();
  }, []);

  // 検索実行
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      // クライアントサイドでの検索（シンプル実装）
      const results = allDramas.filter(drama =>
        drama.title.toLowerCase().includes(query.toLowerCase()) ||
        drama.broadcaster.toLowerCase().includes(query.toLowerCase()) ||
        drama.main_cast?.toLowerCase().includes(query.toLowerCase()) ||
        drama.genre?.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
    } catch (error) {
      console.error('検索エラー:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // リアルタイム検索
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, allDramas]);

  return (
    <div className="search-page fade-in">
      {/* 検索フォーム */}
      <section className="search-form-section mb-l">
        <div className="retro-panel">
          <div className="panel-header">🔍 ドラマ検索</div>
          <div className="panel-content">
            <div className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ドラマタイトル、放送局、出演者、ジャンルで検索..."
                  className="search-input"
                  autoFocus
                />
                <div className="search-input-icon">🔍</div>
              </div>
              <div className="search-hints mt-s">
                <p className="color-muted">
                  💡 <strong>検索のコツ:</strong> 「あんぱん」「NHK」「恋愛」などで検索できます
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 検索結果 */}
      <section className="search-results-section">
        {loading && (
          <div className="loading-state text-center mb-l">
            <div className="retro-panel">
              <div className="panel-content">
                <p className="color-primary">🔍 検索中...</p>
              </div>
            </div>
          </div>
        )}

        {!loading && hasSearched && (
          <div className="retro-panel">
            <div className="panel-header">
              📋 検索結果 ({searchResults.length}件)
            </div>
            <div className="panel-content">
              {searchResults.length > 0 ? (
                <div className="search-results-list">
                  {searchResults.map((drama) => (
                    <Link 
                      key={drama.id} 
                      href={`/drama/${drama.id}`}
                      className="search-result-link"
                    >
                      <div className="search-result-item">
                        <div className="search-result-header">
                          <h3 className="search-result-title">
                            📺 {drama.title}
                          </h3>
                          <span className={`drama-status drama-status--${drama.status}`}>
                            {drama.status === 'completed' ? '完了' : 
                             drama.status === 'airing' ? '放送中' : '予定'}
                          </span>
                        </div>
                        
                        <div className="search-result-meta">
                          <div className="meta-row">
                            <span className="meta-label">📻 放送局:</span>
                            <span className="meta-value">{drama.broadcaster}</span>
                          </div>
                          {drama.timeslot && (
                            <div className="meta-row">
                              <span className="meta-label">⏰ 時間:</span>
                              <span className="meta-value">{drama.timeslot}</span>
                            </div>
                          )}
                          {drama.genre && (
                            <div className="meta-row">
                              <span className="meta-label">🎭 ジャンル:</span>
                              <span className="meta-value">{drama.genre}</span>
                            </div>
                          )}
                          {drama.main_cast && (
                            <div className="meta-row">
                              <span className="meta-label">🎬 出演:</span>
                              <span className="meta-value">{drama.main_cast}</span>
                            </div>
                          )}
                        </div>

                        {drama.synopsis && (
                          <div className="search-result-synopsis">
                            <p className="synopsis-text">
                              {drama.synopsis.length > 100 
                                ? drama.synopsis.substring(0, 100) + '...' 
                                : drama.synopsis}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-results text-center">
                  <div className="no-results-icon mb-m">
                    <span style={{ fontSize: '3rem' }}>😅</span>
                  </div>
                  <h3 className="mb-s">該当するドラマが見つかりませんでした</h3>
                  <p className="color-muted mb-m">
                    「{searchQuery}」に関連するドラマはありませんでした。
                  </p>
                  <div className="search-suggestions">
                    <p className="color-muted">
                      <strong>別のキーワードでお試しください:</strong>
                    </p>
                    <ul className="suggestion-list">
                      <li>ドラマタイトルの一部</li>
                      <li>放送局名（NHK、フジテレビなど）</li>
                      <li>出演者名</li>
                      <li>ジャンル（恋愛、刑事など）</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="search-welcome">
            <div className="retro-panel">
              <div className="panel-content text-center">
                <div className="welcome-icon mb-m">
                  <span style={{ fontSize: '4rem' }}>🔍</span>
                </div>
                <h2 className="mb-m">ドラマを検索してみましょう！</h2>
                <p className="color-muted mb-m">
                  タイトル、放送局、出演者、ジャンルなど、様々なキーワードで検索できます。
                </p>
                <div className="example-searches">
                  <p className="mb-s"><strong>検索例:</strong></p>
                  <div className="example-tags">
                    <span className="example-tag" onClick={() => setSearchQuery('NHK')}>
                      NHK
                    </span>
                    <span className="example-tag" onClick={() => setSearchQuery('恋愛')}>
                      恋愛
                    </span>
                    <span className="example-tag" onClick={() => setSearchQuery('刑事')}>
                      刑事
                    </span>
                    <span className="example-tag" onClick={() => setSearchQuery('月9')}>
                      月9
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}