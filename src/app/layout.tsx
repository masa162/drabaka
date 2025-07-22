import type { Metadata } from 'next';
import './globals.css';
import '@/styles/components/footer.css';
import '@/styles/components/homepage.css';
import '@/styles/components/drama-detail.css';
import '@/styles/components/review-form.css';
import '@/styles/components/like-button.css';
import '@/styles/components/sidebar.css';
import '@/styles/components/mobile-menu.css';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import MobileMenu from '@/components/layout/MobileMenu';
import { DramaService } from '@/lib/supabase/dramas';
import CurrentDramas from '@/components/sidebar/CurrentDramas';

export const metadata: Metadata = {
  title: 'ドラマバカ一代 v2 - 見すぎて頭おかしくなったヤツらの感想サイト',
  description: '2000年代風デザインのドラマレビューサイト。40代over↑の地上波ドラマ好き日本人向け。',
  keywords: 'ドラマ, レビュー, 感想, 2000年代, レトロ',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 放送中ドラマデータを取得
  let dramasByDay = {};
  try {
    dramasByDay = await DramaService.getCurrentDramasByDay();
  } catch (error) {
    console.error('Error loading current dramas:', error);
  }

  return (
    <html lang="ja">
      <body>
        <div className="page-wrapper">
          <MobileMenu dramasByDay={dramasByDay} />
          <Header />
          <Navigation />
          
          <div className="container">
            <div className="layout-grid">
              <Sidebar side="left">
                <CurrentDramas dramasByDay={dramasByDay} />
              </Sidebar>
              
              <main className="main-content fade-in">
                {children}
              </main>
              
              <Sidebar side="right" />
            </div>
          </div>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}