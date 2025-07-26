const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// Supabaseクライアント初期化
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase環境変数が設定されていません');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeDramaUpdates() {
  console.log('📺 ドラマデータ更新を開始します...');
  
  // CSVデータから個別に処理
  const dramas = [
    {
      title: 'あんぱん',
      broadcaster: 'NHK総合',
      timeslot: '月08:00',
      air_day: '月曜日',
      year: 2025,
      season: 'spring',
      status: 'airing',
      genre: '朝ドラ',
      main_cast: '今田美桜、永瀬ゆずな、加瀬亮、江口のりこ',
      synopsis: '"アンパンマン"を生み出したやなせたかしと暢の夫婦をモデルに、生きる意味も失っていた苦悩の日々と、それでも夢を忘れなかった二人の人生。何者でもなかった二人があらゆる荒波を乗り越え、"逆転しない正義"を体現した『アンパンマン』にたどり着くまでを描き、生きる喜びが全身から湧いてくるような愛と勇気の物語です。'
    },
    {
      title: '明日はもっと、い日になる',
      broadcaster: 'フジテレビ',
      timeslot: '月21:00',
      air_day: '月曜日',
      year: 2025,
      season: 'summer',
      status: 'airing',
      genre: '恋愛、ヒューマン',
      main_cast: '福原遥、林遣都、生田絵梨花、小林きな子',
      synopsis: 'フジテレビ7月期月9ドラマ『明日はもっと、いい日になる』は、福原遥主演、林遣都出演のハートフルヒューマンドラマ。児童相談所を舞台とした完全オリジナルストーリーで、刑事の夏井翼（福原遥）が突然児童相談所への出向を命じられる。刑事時代は事件発生後の対応が中心だったが、児童相談所では事件を未然に防ぐ予防的な仕事が求められる。SOSを伝えられない子どもたちの異変を察知し、継続的な心のケアを通じて子どもたちの成長を支援する。当初は児童相談所で働く意思がなかった翼が、様々な子どもやその親と向き合いながら共に成長していく姿を温かく描く。'
    }
  ];

  let updateCount = 0;
  let errorCount = 0;

  for (const drama of dramas) {
    try {
      const { data, error } = await supabase
        .from('dramas')
        .update({
          broadcaster: drama.broadcaster,
          timeslot: drama.timeslot,
          air_day: drama.air_day,
          year: drama.year,
          season: drama.season,
          status: drama.status,
          genre: drama.genre,
          main_cast: drama.main_cast,
          synopsis: drama.synopsis
        })
        .eq('title', drama.title);

      if (error) {
        console.error(`❌ ${drama.title} の更新に失敗:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ ${drama.title} を更新しました`);
        updateCount++;
      }
    } catch (err) {
      console.error(`❌ ${drama.title} の処理中にエラー:`, err.message);
      errorCount++;
    }
  }

  console.log('\n📊 更新結果サマリー:');
  console.log(`✅ 成功: ${updateCount}件`);
  console.log(`❌ 失敗: ${errorCount}件`);
  
  if (errorCount === 0) {
    console.log('🎉 全てのドラマデータが正常に更新されました！');
  }
}

// 実行
executeDramaUpdates().catch(console.error);