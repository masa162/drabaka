const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function analyzeCreationPatterns() {
  console.log('=== データ作成パターン分析 ===\n');
  
  try {
    const { data: allDramas, error } = await supabase
      .from('dramas')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching dramas:', error);
      return;
    }
    
    // 作成日時でグループ化
    const creationGroups = {};
    allDramas.forEach(drama => {
      const createdDate = drama.created_at.split('T')[0]; // 日付部分のみ
      const createdTime = drama.created_at;
      
      if (!creationGroups[createdDate]) {
        creationGroups[createdDate] = [];
      }
      creationGroups[createdDate].push(drama);
    });
    
    console.log('日付別作成数:');
    Object.keys(creationGroups).forEach(date => {
      const count = creationGroups[date].length;
      console.log(`${date}: ${count}件`);
      
      // 同じ日に大量作成されたものを詳しく見る
      if (count > 10) {
        console.log('  -> 大量作成の詳細:');
        const times = creationGroups[date].map(d => d.created_at).sort();
        console.log(`     最初: ${times[0]}`);
        console.log(`     最後: ${times[times.length - 1]}`);
        
        // データの完全度チェック
        const incomplete = creationGroups[date].filter(d => 
          !d.genre || !d.main_cast || !d.synopsis
        );
        console.log(`     不完全データ: ${incomplete.length}件`);
      }
    });
    
    console.log('\n=== 疑わしいパターンの特定 ===');
    
    // 2025-07-22に作成されたデータ（おそらく初期データ）
    const jul22Data = creationGroups['2025-07-22'] || [];
    console.log(`7月22日作成データ: ${jul22Data.length}件`);
    console.log('特徴: 基本情報のみ、詳細情報（ジャンル、主演、あらすじ）が未設定');
    
    // 2025-07-23に作成されたデータ（おそらくスクリプトで追加）
    const jul23Data = creationGroups['2025-07-23'] || [];
    console.log(`7月23日作成データ: ${jul23Data.length}件`);
    console.log('特徴: 詳細情報が充実している');
    
    console.log('\n=== 重複の原因分析 ===');
    console.log('1. 7月22日: 手動またはバッチで基本データを投入');
    console.log('2. 7月23日: スクリプトで詳細データを追加投入');
    console.log('3. 結果: 同じタイトルのドラマが重複して登録される');
    
    console.log('\n=== 解決策 ===');
    console.log('1. 重複削除: ID 30, 28, 25, 31, 26 を削除');
    console.log('2. 今後の予防: タイトルでの一意制約追加を検討');
    console.log('3. データ投入前: 既存データとの重複チェック実装');
    
  } catch (error) {
    console.error('分析中にエラーが発生しました:', error);
  }
}

analyzeCreationPatterns();