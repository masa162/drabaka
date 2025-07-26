const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const csv = require('csv-parse/sync');
require('dotenv').config({ path: '.env.local' });

// Supabaseクライアント初期化
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase環境変数が設定されていません');
  console.log('必要な環境変数:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY または SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('🔑 Supabase接続設定:');
console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseKey.substring(0, 20)}...`);

const supabase = createClient(supabaseUrl, supabaseKey);

// 季節マッピング
function mapSeason(seasonStr) {
  if (!seasonStr) return 'summer';
  if (seasonStr.includes('4月') || seasonStr.includes('春')) return 'spring';
  if (seasonStr.includes('7月') || seasonStr.includes('夏')) return 'summer';
  if (seasonStr.includes('10月') || seasonStr.includes('秋')) return 'autumn';
  if (seasonStr.includes('1月') || seasonStr.includes('冬')) return 'winter';
  return 'summer';
}

async function updateAllDramas() {
  console.log('📺 ドラマデータベース一括更新を開始します...');
  console.log('🔄 CSVファイルを読み込み中...');
  
  try {
    // CSVファイルを読み込み
    const csvData = fs.readFileSync('/Users/nakayamamasayuki/Documents/GitHub/drabaka/docs/データ_資料/2025_7月放送中_tuned.csv', 'utf8');
    
    // CSVをパース
    const records = csv.parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    console.log(`📄 ${records.length}件のドラマデータを読み込みました`);
    console.log('');

    let updateCount = 0;
    let insertCount = 0;
    let errorCount = 0;

    // 各レコードを処理
    for (const record of records) {
      const title = record.title?.trim();
      if (!title) continue;

      const dramaData = {
        title: title,
        broadcaster: record.broadcaster?.trim() || null,
        timeslot: record.timeslot?.trim() || null,
        air_day: record.air_day?.trim() || null,
        year: parseInt(record.year) || 2025,
        season: mapSeason(record.season?.trim()),
        status: record.status?.trim() || 'airing',
        genre: record.genre?.trim() || null,
        main_cast: record.main_cast?.trim() || null,
        synopsis: record['あらすじ']?.trim() || null
      };

      try {
        // 既存データを確認
        const { data: existingData, error: selectError } = await supabase
          .from('dramas')
          .select('id')
          .eq('title', title)
          .single();

        if (selectError && selectError.code !== 'PGRST116') {
          throw selectError;
        }

        if (existingData) {
          // 既存データを更新
          const { error: updateError } = await supabase
            .from('dramas')
            .update({
              broadcaster: dramaData.broadcaster,
              timeslot: dramaData.timeslot,
              air_day: dramaData.air_day,
              year: dramaData.year,
              season: dramaData.season,
              status: dramaData.status,
              genre: dramaData.genre,
              main_cast: dramaData.main_cast,
              synopsis: dramaData.synopsis
            })
            .eq('title', title);

          if (updateError) {
            throw updateError;
          }

          console.log(`✅ UPDATE: ${title}`);
          updateCount++;
        } else {
          // 新規データを挿入
          const { error: insertError } = await supabase
            .from('dramas')
            .insert([dramaData]);

          if (insertError) {
            throw insertError;
          }

          console.log(`🆕 INSERT: ${title}`);
          insertCount++;
        }

      } catch (err) {
        console.error(`❌ ERROR: ${title} - ${err.message}`);
        errorCount++;
      }
    }

    console.log('');
    console.log('📊 更新結果サマリー:');
    console.log(`✅ 更新成功: ${updateCount}件`);
    console.log(`🆕 新規追加: ${insertCount}件`);
    console.log(`❌ エラー: ${errorCount}件`);
    console.log(`📝 総処理件数: ${updateCount + insertCount + errorCount}件`);
    
    if (errorCount === 0) {
      console.log('');
      console.log('🎉 全てのドラマデータが正常に更新されました！');
    } else {
      console.log('');
      console.log('⚠️  一部のデータでエラーが発生しました。上記のエラーメッセージを確認してください。');
    }

  } catch (error) {
    console.error('❌ スクリプト実行エラー:', error.message);
    process.exit(1);
  }
}

// 実行
updateAllDramas().catch(console.error);