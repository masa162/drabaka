const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 特定のタイトルの重複調査対象
const targetTitles = [
  '明日はもっと、いい日になる',
  '誘拐の日',
  '大追跡～警視庁SSBC強行犯係',
  'しあわせな結婚'
];

async function investigateDuplicates() {
  console.log('=== ドラマテーブル重複エントリ調査開始 ===\n');
  
  try {
    // 1. 全ドラマデータ取得
    const { data: allDramas, error: allError } = await supabase
      .from('dramas')
      .select('*')
      .order('title', { ascending: true });
    
    if (allError) {
      console.error('Error fetching all dramas:', allError);
      return;
    }
    
    console.log(`総ドラマ数: ${allDramas.length}\n`);
    
    // 2. タイトル別のグループ化
    const titleGroups = {};
    allDramas.forEach(drama => {
      const title = drama.title.trim();
      if (!titleGroups[title]) {
        titleGroups[title] = [];
      }
      titleGroups[title].push(drama);
    });
    
    // 3. 重複があるタイトルの特定
    const duplicatedTitles = Object.keys(titleGroups).filter(title => titleGroups[title].length > 1);
    
    console.log(`重複タイトル数: ${duplicatedTitles.length}`);
    console.log(`重複タイトル一覧:`);
    duplicatedTitles.forEach(title => {
      console.log(`  - ${title} (${titleGroups[title].length}件)`);
    });
    console.log();
    
    // 4. 各重複タイトルの詳細分析
    console.log('=== 重複エントリ詳細分析 ===\n');
    
    for (const title of duplicatedTitles) {
      const dramas = titleGroups[title];
      console.log(`【${title}】 - ${dramas.length}件の重複`);
      console.log('----------------------------------------');
      
      dramas.forEach((drama, index) => {
        console.log(`${index + 1}. ID: ${drama.id}`);
        console.log(`   放送局: ${drama.broadcaster}`);
        console.log(`   時間枠: ${drama.timeslot || '未設定'}`);
        console.log(`   放送曜日: ${drama.air_day || '未設定'}`);
        console.log(`   ステータス: ${drama.status}`);
        console.log(`   年: ${drama.year}`);
        console.log(`   シーズン: ${drama.season}`);
        console.log(`   ジャンル: ${drama.genre || '未設定'}`);
        console.log(`   主演: ${drama.main_cast || '未設定'}`);
        console.log(`   作成日時: ${drama.created_at}`);
        console.log(`   更新日時: ${drama.updated_at}`);
        console.log(`   あらすじ: ${drama.synopsis ? drama.synopsis.substring(0, 100) + '...' : '未設定'}`);
        console.log('');
      });
      
      // 削除推奨の判定
      console.log('【削除推奨判定】');
      const sortedByCreated = dramas.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      const oldest = sortedByCreated[0];
      const newest = sortedByCreated[sortedByCreated.length - 1];
      
      // より完全な情報を持つものを保持すべき
      const mostComplete = dramas.reduce((best, current) => {
        const bestScore = getCompletenessScore(best);
        const currentScore = getCompletenessScore(current);
        return currentScore > bestScore ? current : best;
      });
      
      console.log(`最も古いエントリ: ID ${oldest.id} (${oldest.created_at})`);
      console.log(`最も新しいエントリ: ID ${newest.id} (${newest.created_at})`);
      console.log(`最も完全なエントリ: ID ${mostComplete.id} (完全度スコア: ${getCompletenessScore(mostComplete)})`);
      
      const toDelete = dramas.filter(d => d.id !== mostComplete.id);
      console.log(`削除推奨: ID ${toDelete.map(d => d.id).join(', ')}`);
      console.log(`保持推奨: ID ${mostComplete.id}`);
      
      console.log('\n' + '='.repeat(60) + '\n');
    }
    
    // 5. 特定タイトルの重点調査
    console.log('=== 特定タイトル重点調査 ===\n');
    
    for (const targetTitle of targetTitles) {
      if (titleGroups[targetTitle]) {
        console.log(`【${targetTitle}】の詳細:`);
        const dramas = titleGroups[targetTitle];
        
        dramas.forEach((drama, index) => {
          console.log(`  ${index + 1}. ID: ${drama.id}, 放送局: ${drama.broadcaster}, 作成: ${drama.created_at}`);
        });
        console.log();
      } else {
        console.log(`【${targetTitle}】は見つかりませんでした\n`);
      }
    }
    
    // 6. 統計情報
    console.log('=== 統計情報 ===');
    console.log(`総ドラマ数: ${allDramas.length}`);
    console.log(`ユニークタイトル数: ${Object.keys(titleGroups).length}`);
    console.log(`重複タイトル数: ${duplicatedTitles.length}`);
    console.log(`重複により余分なエントリ数: ${allDramas.length - Object.keys(titleGroups).length}`);
    
    const totalDuplicateEntries = duplicatedTitles.reduce((sum, title) => {
      return sum + (titleGroups[title].length - 1);
    }, 0);
    console.log(`削除すべき重複エントリ数: ${totalDuplicateEntries}`);
    
    // 7. 削除推奨リスト生成
    console.log('\n=== 削除推奨IDリスト ===');
    const deleteIds = [];
    
    for (const title of duplicatedTitles) {
      const dramas = titleGroups[title];
      const mostComplete = dramas.reduce((best, current) => {
        const bestScore = getCompletenessScore(best);
        const currentScore = getCompletenessScore(current);
        return currentScore > bestScore ? current : best;
      });
      
      const toDelete = dramas.filter(d => d.id !== mostComplete.id);
      deleteIds.push(...toDelete.map(d => d.id));
    }
    
    console.log('削除推奨ID一覧:');
    console.log(deleteIds.join(', '));
    console.log('\nSQL文例:');
    console.log(`DELETE FROM dramas WHERE id IN (${deleteIds.join(', ')});`);
    
  } catch (error) {
    console.error('調査中にエラーが発生しました:', error);
  }
}

// エントリの完全度スコアを計算
function getCompletenessScore(drama) {
  let score = 0;
  
  // 基本情報
  if (drama.title) score += 1;
  if (drama.broadcaster) score += 1;
  if (drama.year) score += 1;
  if (drama.season) score += 1;
  
  // 詳細情報
  if (drama.timeslot) score += 2;
  if (drama.air_day) score += 2;
  if (drama.genre) score += 1;
  if (drama.main_cast) score += 2;
  if (drama.synopsis && drama.synopsis.length > 50) score += 3;
  
  // ステータス情報
  if (drama.status) score += 1;
  
  return score;
}

// 実行
investigateDuplicates();