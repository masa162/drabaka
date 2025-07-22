'use client';

import { useState, useEffect } from 'react';
import CurrentDramas from '@/components/sidebar/CurrentDramas';

interface MobileMenuProps {
  dramasByDay: { [key: string]: any[] };
}

export default function MobileMenu({ dramasByDay }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // デバッグ用ログ（一時的）
  console.log('MobileMenu - dramasByDay:', dramasByDay);
  console.log('MobileMenu - Object.keys(dramasByDay):', Object.keys(dramasByDay));
  console.log('MobileMenu - Total dramas:', Object.values(dramasByDay).flat().length);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // メニューが開いているときは背景のスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // コンポーネントアンマウント時にクラスを削除
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isOpen]);

  return (
    <>
      {/* ハンバーガーメニューボタン */}
      <button 
        className={`mobile-menu-button ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="メニューを開く"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* オーバーレイ */}
      {isOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMenu}
        />
      )}

      {/* スライドアウトメニュー */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h3>📺 放送中のドラマ</h3>
          <button 
            className="close-button"
            onClick={closeMenu}
            aria-label="メニューを閉じる"
          >
            ×
          </button>
        </div>
        <div className="mobile-menu-content">
          <CurrentDramas dramasByDay={dramasByDay} />
        </div>
      </div>
    </>
  );
}