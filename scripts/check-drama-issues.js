const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkDuplicatesAndIncomplete() {
  console.log('🔍 重複と未完了データをチェック中...');
  
  // 全ドラマデータを取得
  const { data: allDramas, error } = await supabase
    .from('dramas')
    .select('id, title, broadcaster, main_cast, synopsis')
    .order('title');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log(`総ドラマ数: ${allDramas.length}件`);
  console.log('');
  
  // 重複チェック
  const titleCounts = {};
  allDramas.forEach(drama => {
    titleCounts[drama.title] = (titleCounts[drama.title] || 0) + 1;
  });
  
  const duplicates = Object.entries(titleCounts).filter(([title, count]) => count > 1);
  
  if (duplicates.length > 0) {
    console.log('🔄 重複番組:');
    duplicates.forEach(([title, count]) => {
      console.log(`  - ${title}: ${count}件`);
      
      // 重複の詳細を表示
      const dupEntries = allDramas.filter(d => d.title === title);
      dupEntries.forEach((entry, index) => {
        console.log(`    [${index + 1}] ID:${entry.id}, キャスト: ${entry.main_cast || '未設定'}`);
      });
    });
    console.log('');
  }
  
  // 未完了データチェック
  const incomplete = allDramas.filter(drama => 
    !drama.main_cast || 
    !drama.synopsis || 
    drama.main_cast.trim() === '' || 
    drama.synopsis.trim() === ''
  );
  
  if (incomplete.length > 0) {
    console.log('📝 未完了データ:');
    incomplete.forEach(drama => {
      console.log(`  - ${drama.title} (ID:${drama.id})`);
      if (!drama.main_cast || drama.main_cast.trim() === '') {
        console.log(`    キャスト情報なし`);
      }
      if (!drama.synopsis || drama.synopsis.trim() === '') {
        console.log(`    あらすじなし`);
      }
    });
  }
  
  // 特定の問題をチェック
  console.log('🎯 特定の問題をチェック:');
  
  // "明日はもっと、いい"で始まるタイトル
  const incompleteTitle = allDramas.filter(d => d.title.includes('明日はもっと、いい'));
  if (incompleteTitle.length > 0) {
    console.log('  「明日はもっと、いい」関連:');
    incompleteTitle.forEach(d => {
      console.log(`    ID:${d.id} - "${d.title}"`);
    });
  }
}

checkDuplicatesAndIncomplete().catch(console.error);