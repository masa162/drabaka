const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 削除推奨IDリスト（調査結果より）
const duplicateIds = [30, 28, 25, 31, 26];

async function removeDuplicates() {
  console.log('=== 重複エントリ削除処理開始 ===\n');
  
  try {
    // 削除前に該当データを確認
    console.log('削除予定のエントリ:');
    for (const id of duplicateIds) {
      const { data: drama, error } = await supabase
        .from('dramas')
        .select('id, title, broadcaster, created_at')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error(`ID ${id} の取得エラー:`, error);
        continue;
      }
      
      if (drama) {
        console.log(`ID ${id}: ${drama.title} (${drama.broadcaster}) - ${drama.created_at}`);
      } else {
        console.log(`ID ${id}: エントリが見つかりません`);
      }
    }
    
    console.log('\n削除を実行しますか？ (本番環境では慎重に実行してください)');
    
    // 実際の削除実行
    console.log('\n削除処理を開始...');
    
    for (const id of duplicateIds) {
      const { error } = await supabase
        .from('dramas')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error(`ID ${id} の削除エラー:`, error);
      } else {
        console.log(`✓ ID ${id} を削除しました`);
      }
    }
    
    console.log('\n削除処理完了！');
    
    // 削除後の確認
    console.log('\n=== 削除後の確認 ===');
    const { data: remainingDramas, error: fetchError } = await supabase
      .from('dramas')
      .select('*')
      .order('title');
      
    if (fetchError) {
      console.error('確認取得エラー:', fetchError);
      return;
    }
    
    // タイトル別のグループ化で重複チェック
    const titleGroups = {};
    remainingDramas.forEach(drama => {
      const title = drama.title.trim();
      if (!titleGroups[title]) {
        titleGroups[title] = [];
      }
      titleGroups[title].push(drama);
    });
    
    const stillDuplicated = Object.keys(titleGroups).filter(title => titleGroups[title].length > 1);
    
    console.log(`総ドラマ数: ${remainingDramas.length}`);
    console.log(`ユニークタイトル数: ${Object.keys(titleGroups).length}`);
    console.log(`残存重複タイトル数: ${stillDuplicated.length}`);
    
    if (stillDuplicated.length > 0) {
      console.log('\n残存重複:');
      stillDuplicated.forEach(title => {
        console.log(`  - ${title} (${titleGroups[title].length}件)`);
      });
    } else {
      console.log('\n✓ 重複は完全に解消されました！');
    }
    
  } catch (error) {
    console.error('削除処理中にエラーが発生しました:', error);
  }
}

// 実行確認
async function confirmAndExecute() {
  console.log('このスクリプトは以下のIDのエントリを削除します:');
  console.log(duplicateIds.join(', '));
  console.log('\n本当に削除を実行しますか？');
  console.log('本番環境での実行は十分注意してください。');
  console.log('\n実行するには、このスクリプトのconfirmAndExecute()の代わりにremoveDuplicates()を直接呼び出してください。');
}

// 実行部分
if (require.main === module) {
  // 安全のため、最初は確認のみ
  // 実際に削除する場合は下の行のコメントアウトを外す
  confirmAndExecute();
  // removeDuplicates();
}

module.exports = { removeDuplicates, duplicateIds };