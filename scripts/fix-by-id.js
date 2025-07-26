const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// IDベースでの修正データ
const fixDataById = [
  {
    id: 42, // DOPE 麻薬取締部捜査課
    title: 'DOPE 麻薬取締部特捜課',
    main_cast: '髙橋海人（King & Prince）、中村倫也',
    synopsis: '謎の新型ドラッグ「DOPE」が蔓延する近未来の日本。致死率が高いにもかかわらず、使用後に特殊能力を覚醒させる者がいることから、手を出す者が後を絶たない。これに対処するため、厚生労働省麻薬取締部に特殊捜査課、通称「特捜課」が設立される。新人麻薬取締官の才木優人と、教育係の陣内鉄平がバディを組み、DOPEが引き起こす不可解な事件の解決に挑む。'
  },
  {
    id: 24, // あんぱん
    main_cast: '今田美桜、永瀬ゆずな、加瀬亮、江口のりこ',
    synopsis: '"アンパンマン"を生み出したやなせたかしと暢の夫婦をモデルに、生きる意味も失っていた苦悩の日々と、それでも夢を忘れなかった二人の人生。何者でもなかった二人があらゆる荒波を乗り越え、"逆転しない正義"を体現した『アンパンマン』にたどり着くまでを描き、生きる喜びが全身から湧いてくるような愛と勇気の物語です。'
  },
  {
    id: 29, // ちはやふる-めぐり-
    main_cast: '當真あみ、上白石萌音',
    synopsis: '人気漫画「ちはやふる」の実写映画シリーズから10年後を舞台にしたオリジナルストーリー。主人公は、梅園高校2年生の藍沢めぐる。彼女は効率を重視する「タイパ」な性格で、廃部寸前の競技かるた部に所属する幽霊部員だった。しかし、新しく顧問となった大江奏との出会いをきっかけに、彼女の運命は大きく動き出す。物語は、かるたを通じて成長していく高校生たちの姿を描く。'
  },
  {
    id: 27, // 初恋DOGs
    main_cast: '清原果耶、成田凌、ナ・イヌ',
    synopsis: '愛を信じないクールな弁護士と、動物しか愛せないこじらせ獣医の"愛犬"同士が恋に落ちたことをきっかけに始まるラブストーリー。日本のTBSドラマチームと、数々のグローバルヒット作で知られる韓国の制作会社STUDIO DRAGONが初めて共同制作するドラマとしても注目されている。'
  }
];

async function fixByIdAndCheckPermissions() {
  console.log('🔧 IDベースで修正中...');
  
  for (const drama of fixDataById) {
    try {
      console.log(`\n🔄 修正中: ID ${drama.id}`);
      
      // 現在のデータを確認
      const { data: currentData } = await supabase
        .from('dramas')
        .select('title, main_cast, synopsis')
        .eq('id', drama.id)
        .single();
      
      console.log(`現在のタイトル: ${currentData?.title || '(なし)'}`);
      console.log(`現在のキャスト: ${currentData?.main_cast || '(なし)'}`);
      
      // アップデート実行
      const updateData = {
        main_cast: drama.main_cast,
        synopsis: drama.synopsis
      };
      
      if (drama.title) {
        updateData.title = drama.title;
      }
      
      const { data: updatedData, error } = await supabase
        .from('dramas')
        .update(updateData)
        .eq('id', drama.id)
        .select();
      
      if (error) {
        console.error(`❌ UPDATE ERROR: ${error.message}`);
        console.error('詳細:', error);
      } else {
        console.log(`✅ 更新成功: ${updatedData?.length || 0}件`);
      }
      
    } catch (err) {
      console.error(`❌ SCRIPT ERROR: ${err.message}`);
    }
  }
}

fixByIdAndCheckPermissions().catch(console.error);