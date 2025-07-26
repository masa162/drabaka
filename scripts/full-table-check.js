const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fullTableCheck() {
  console.log('🔍 dramasテーブル全件チェック開始...');
  
  const { data: allDramas, error } = await supabase
    .from('dramas')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('❌ エラー:', error);
    return;
  }
  
  console.log(`📊 総件数: ${allDramas.length}件`);
  console.log('');
  
  // 基本統計
  let completeCount = 0;
  let incompleteCount = 0;
  let duplicateCheck = {};
  
  console.log('📋 全データ一覧:');
  console.log('ID  | タイトル                 | 放送局    | キャスト | あらすじ | 更新日');
  console.log('----+------------------------+---------+--------+--------+--------');
  
  allDramas.forEach(drama => {
    const hasCast = drama.main_cast && drama.main_cast.trim() !== '';
    const hasSynopsis = drama.synopsis && drama.synopsis.trim() !== '';
    const complete = hasCast && hasSynopsis;
    
    if (complete) completeCount++;
    else incompleteCount++;
    
    // 重複チェック
    if (duplicateCheck[drama.title]) {
      duplicateCheck[drama.title]++;
    } else {
      duplicateCheck[drama.title] = 1;
    }
    
    const castStatus = hasCast ? '✅' : '❌';
    const synopsisStatus = hasSynopsis ? '✅' : '❌';
    const titleShort = drama.title.length > 22 ? drama.title.substring(0, 22) + '...' : drama.title;
    const broadcasterShort = (drama.broadcaster || '').length > 8 ? (drama.broadcaster || '').substring(0, 8) + '..' : (drama.broadcaster || '');
    const updateDate = drama.updated_at ? drama.updated_at.substring(5, 10) : '';
    
    console.log(`${drama.id.toString().padStart(3)} | ${titleShort.padEnd(24)} | ${broadcasterShort.padEnd(9)} | ${castStatus}     | ${synopsisStatus}     | ${updateDate}`);
  });
  
  console.log('');
  console.log('📈 統計情報:');
  console.log(`  完全データ: ${completeCount}件`);
  console.log(`  不完全データ: ${incompleteCount}件`);
  
  // 重複チェック結果
  const duplicates = Object.entries(duplicateCheck).filter(([title, count]) => count > 1);
  if (duplicates.length > 0) {
    console.log('');
    console.log('🔄 重複データ:');
    duplicates.forEach(([title, count]) => {
      console.log(`  - ${title}: ${count}件`);
    });
  } else {
    console.log('  重複: なし');
  }
  
  if (incompleteCount > 0) {
    console.log('');
    console.log('❌ 不完全データ詳細:');
    allDramas.filter(d => !(d.main_cast && d.main_cast.trim() !== '' && d.synopsis && d.synopsis.trim() !== '')).forEach(drama => {
      console.log(`  ID:${drama.id} - ${drama.title}`);
      if (!drama.main_cast || drama.main_cast.trim() === '') console.log(`    → キャストなし`);
      if (!drama.synopsis || drama.synopsis.trim() === '') console.log(`    → あらすじなし`);
    });
  }

  // 最近の更新をチェック
  console.log('');
  console.log('📅 最近の更新 (直近10件):');
  const recentUpdates = [...allDramas]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 10);
  
  recentUpdates.forEach(drama => {
    console.log(`  ${drama.updated_at.substring(5, 16)} - ID:${drama.id} ${drama.title}`);
  });
}

fullTableCheck().catch(console.error);