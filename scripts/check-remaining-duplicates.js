const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkRemainingDuplicates() {
  console.log('=== 残存重複エントリの詳細調査 ===\n');
  
  const { data: dramas, error } = await supabase
    .from('dramas')
    .select('id, title, broadcaster, timeslot, created_at')
    .order('title');
    
  if (error) {
    console.error('データ取得エラー:', error);
    return;
  }
  
  // タイトルでグループ化
  const titleGroups = {};
  dramas.forEach(drama => {
    const title = drama.title.trim();
    if (!titleGroups[title]) {
      titleGroups[title] = [];
    }
    titleGroups[title].push(drama);
  });
  
  // 重複があるタイトルを特定
  const duplicatedTitles = Object.keys(titleGroups).filter(title => titleGroups[title].length > 1);
  
  console.log(`総ドラマ数: ${dramas.length}`);
  console.log(`ユニークタイトル数: ${Object.keys(titleGroups).length}`);
  console.log(`重複タイトル数: ${duplicatedTitles.length}\n`);
  
  if (duplicatedTitles.length > 0) {
    console.log('残存重複の詳細:');
    duplicatedTitles.forEach(title => {
      console.log(`\n=== ${title} ===`);
      titleGroups[title].forEach(drama => {
        console.log(`ID ${drama.id}: ${drama.broadcaster} ${drama.timeslot} - ${drama.created_at}`);
      });
    });
  } else {
    console.log('✓ 重複は完全に解消されました！');
  }
}

if (require.main === module) {
  checkRemainingDuplicates();
}