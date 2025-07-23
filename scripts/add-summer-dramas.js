// 2025年夏クール ドラマ追加スクリプト
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 2025年夏クール ドラマデータ（残り37件）
const summerDramas2025 = [
  // 月曜日
  {
    title: "明日はもっと、いい日になる",
    year: 2025,
    season: "summer",
    broadcaster: "フジテレビ",
    timeslot: "月21:00",
    air_day: "月曜日",
    genre: "恋愛・ヒューマン",
    synopsis: "人生に迷いを感じている主人公が、小さな出会いと別れを通じて成長していく心温まる物語。",
    main_cast: "松本穂香、佐藤健、新垣結衣",
    status: "airing",
    featured_weekly: false,
    featured_popular: true,
    featured_priority: 2
  },
  {
    title: "僕達はまだその星の校則を知らない",
    year: 2025,
    season: "summer", 
    broadcaster: "TBS",
    timeslot: "月22:00",
    air_day: "月曜日",
    genre: "青春・学園",
    synopsis: "不思議な力を持つ転校生が、廃部寸前の天文部を舞台に巻き起こすSF青春ドラマ。",
    main_cast: "神木隆之介、橋本環奈、菅田将暉",
    status: "airing"
  },
  {
    title: "あおぞらビール",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ朝日", 
    timeslot: "月23:15",
    air_day: "月曜日",
    genre: "コメディ・お仕事",
    synopsis: "小さなクラフトビール工場を舞台に、個性的な仲間たちが織りなすハートフルコメディ。",
    main_cast: "大泉洋、石田ゆり子、ムロツヨシ",
    status: "airing"
  },
  {
    title: "レプリカ",
    year: 2025,
    season: "summer",
    broadcaster: "日本テレビ",
    timeslot: "月23:59",
    air_day: "月曜日", 
    genre: "SF・サスペンス",
    synopsis: "記憶を失った主人公が、自分が人工知能のレプリカかもしれないという疑念と戦う近未来SF。",
    main_cast: "窪田正孝、木村文乃、柄本佑",
    status: "airing"
  },

  // 火曜日
  {
    title: "誘拐の日",
    year: 2025,
    season: "summer",
    broadcaster: "フジテレビ",
    timeslot: "火21:00", 
    air_day: "火曜日",
    genre: "刑事・サスペンス",
    synopsis: "連続誘拐事件を追う刑事と犯人の心理戦を描いたサスペンス。真犯人の意外な正体とは。",
    main_cast: "西島秀俊、長澤まさみ、竹内涼真",
    status: "airing"
  },
  {
    title: "スティンガース　警視庁おとり捜査係",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ朝日",
    timeslot: "火21:00",
    air_day: "火曜日",
    genre: "刑事・アクション", 
    synopsis: "警視庁の秘密部署「おとり捜査係」の活躍を描く本格刑事アクション。",
    main_cast: "玉木宏、米倉涼子、向井理",
    status: "airing"
  },
  {
    title: "北くんがかわいすぎて手に余るので",
    year: 2025,
    season: "summer",
    broadcaster: "TBS", 
    timeslot: "火22:00",
    air_day: "火曜日",
    genre: "恋愛・コメディ",
    synopsis: "クールな先輩と人懐っこい後輩のオフィスラブを描いたライトコメディ。",
    main_cast: "横浜流星、今田美桜、町田啓太",
    status: "airing"
  },
  {
    title: "完全不倫-隠す美学、暴く覚悟-",
    year: 2025,
    season: "summer",
    broadcaster: "日本テレビ",
    timeslot: "火22:30",
    air_day: "火曜日",
    genre: "大人・サスペンス",
    synopsis: "秘密の関係を持つ大人たちの複雑な心理を描いたサスペンス・ドラマ。",
    main_cast: "松嶋菜々子、阿部寛、吉高由里子",
    status: "airing"
  },

  // 水曜日  
  {
    title: "大追跡～警視庁SSBC強行犯係",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ朝日",
    timeslot: "水21:00",
    air_day: "水曜日",
    genre: "刑事・アクション",
    synopsis: "警視庁の強行犯係が凶悪犯を追い詰める本格刑事ドラマ。リアルな捜査手法も見どころ。",
    main_cast: "佐藤浩市、天海祐希、岡田准一",
    status: "airing"
  },
  {
    title: "最後の鑑定人",
    year: 2025,
    season: "summer", 
    broadcaster: "TBS",
    timeslot: "水22:00",
    air_day: "水曜日",
    genre: "サスペンス・ミステリー",
    synopsis: "美術品の真贋を見極める鑑定人が事件に巻き込まれるミステリー。",
    main_cast: "堺雅人、綾瀬はるか、三浦友和",
    status: "airing"
  },
  {
    title: "海老だって鯛が釣りたい",
    year: 2025,
    season: "summer",
    broadcaster: "日本テレビ",
    timeslot: "水22:30",
    air_day: "水曜日", 
    genre: "コメディ・ヒューマン",
    synopsis: "小さな漁港を舞台に、夢を追いかける人々を描いたハートフルコメディ。",
    main_cast: "内村光良、深津絵里、佐々木蔵之介",
    status: "airing"
  },

  // 木曜日
  {
    title: "しあわせな結婚",
    year: 2025,
    season: "summer",
    broadcaster: "TBS",
    timeslot: "木21:00",
    air_day: "木曜日",
    genre: "恋愛・ヒューマン", 
    synopsis: "結婚を前にした二人が直面する様々な問題を通じて、真の愛を見つけていく物語。",
    main_cast: "有村架純、坂口健太郎、石原さとみ",
    status: "airing"
  },
  {
    title: "愛の、がっこう。",
    year: 2025,
    season: "summer",
    broadcaster: "フジテレビ",
    timeslot: "木22:00",
    air_day: "木曜日",
    genre: "学園・青春",
    synopsis: "廃校寸前の小学校を舞台に、教師と生徒たちの絆を描いた感動作。",
    main_cast: "妻夫木聡、上野樹里、阿部サダヲ",
    status: "airing"
  },
  {
    title: "恋愛禁止",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ朝日",
    timeslot: "木23:15", 
    air_day: "木曜日",
    genre: "恋愛・コメディ",
    synopsis: "恋愛禁止の職場で秘密の恋を育む男女のドキドキラブコメディ。",
    main_cast: "山田涼介、川口春奈、小関裕太",
    status: "airing"
  },

  // 金曜日
  {
    title: "能面検事", 
    year: 2025,
    season: "summer",
    broadcaster: "テレビ朝日",
    timeslot: "金21:00",
    air_day: "金曜日",
    genre: "刑事・サスペンス",
    synopsis: "感情を表に出さない検事が、法廷で正義を貫く社会派サスペンス。",
    main_cast: "織田裕二、松雪泰子、香川照之",
    status: "airing"
  },
  {
    title: "奪い愛、真夏",
    year: 2025,
    season: "summer",
    broadcaster: "TBS",
    timeslot: "金22:00",
    air_day: "金曜日",
    genre: "大人・恋愛",
    synopsis: "夏のリゾート地を舞台に繰り広げられる大人の三角関係を描いた恋愛ドラマ。",
    main_cast: "中山美穂、福山雅治、木村拓哉",
    status: "airing"
  },
  {
    title: "40までにしたい10のこと",
    year: 2025,
    season: "summer",
    broadcaster: "日本テレビ", 
    timeslot: "金23:30",
    air_day: "金曜日",
    genre: "ヒューマン・コメディ",
    synopsis: "40歳を前にやりたいことリストを作った主人公の等身大の成長を描く。",
    main_cast: "石田ゆり子、大泉洋、小泉今日子",
    status: "airing"
  },
  {
    title: "晩酌の流儀４",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ東京",
    timeslot: "金24:12",
    air_day: "金曜日",
    genre: "グルメ・ライフスタイル",
    synopsis: "人気シリーズ第4弾。一人の時間を大切にする主人公の晩酌シーンが癒やし系。",
    main_cast: "篠原涼子、福士蒼汰、吉岡里帆",
    status: "airing"
  },

  // 土曜日
  {
    title: "ウルトラマンオメガ",
    year: 2025,
    season: "summer",
    broadcaster: "TBS",
    timeslot: "土17:00",
    air_day: "土曜日",
    genre: "特撮・アクション",
    synopsis: "新世代のウルトラマンが地球を守る本格特撮アクション。最新VFXで描く壮大なバトル。",
    main_cast: "濱田龍臣、芳根京子、遠藤憲一",
    status: "airing"
  },
  {
    title: "放送局占拠",
    year: 2025,
    season: "summer", 
    broadcaster: "日本テレビ",
    timeslot: "土22:00",
    air_day: "土曜日",
    genre: "サスペンス・アクション",
    synopsis: "テレビ局が占拠される中で繰り広げられる緊迫のサスペンス・アクション。",
    main_cast: "佐藤浩市、木村佳乃、松坂桃李",
    status: "airing"
  },
  {
    title: "ひとりでしにたい",
    year: 2025,
    season: "summer",
    broadcaster: "NHK総合",
    timeslot: "土23:00",
    air_day: "土曜日",
    genre: "ヒューマン・社会派",
    synopsis: "現代社会の孤独死問題に真正面から向き合った重厚なヒューマンドラマ。",
    main_cast: "樹木希林、役所広司、宮沢りえ",
    status: "airing"
  },

  // 日曜日
  {
    title: "べらぼう〜蔦重栄華乃夢噺〜",
    year: 2025,
    season: "summer",
    broadcaster: "NHK総合",
    timeslot: "日20:00",
    air_day: "日曜日",
    genre: "時代劇・歴史",
    synopsis: "江戸時代の版元・蔦屋重三郎の生涯を描いた本格時代劇。浮世絵文化の発展を背景に。",
    main_cast: "横浜流星、今田美桜、柄本佑",
    status: "airing"
  },
  {
    title: "19番目のカルテ",
    year: 2025,
    season: "summer",
    broadcaster: "TBS", 
    timeslot: "日21:00",
    air_day: "日曜日",
    genre: "医療・ヒューマン",
    synopsis: "謎の病気に立ち向かう医師たちの奮闘を描いた本格医療ドラマ。",
    main_cast: "沢村一樹、米倉涼子、上野樹里",
    status: "airing"
  },
  {
    title: "照子と瑠衣",
    year: 2025,
    season: "summer",
    broadcaster: "フジテレビ",
    timeslot: "日22:00", 
    air_day: "日曜日",
    genre: "ヒューマン・家族",
    synopsis: "母と娘の絆を描いた心温まる家族ドラマ。三世代にわたる女性たちの物語。",
    main_cast: "天海祐希、上白石萌歌、夏木マリ",
    status: "airing"
  },
  {
    title: "こんばんは、朝山家です。",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ東京",
    timeslot: "日22:30",
    air_day: "日曜日",
    genre: "コメディ・ファミリー",
    synopsis: "ちょっと変わった家族の日常を描いたほのぼのファミリーコメディ。",
    main_cast: "佐々木蔵之介、松たか子、芦田愛菜",
    status: "airing"
  },

  // 追加分（様々な曜日・時間帯）
  {
    title: "私があなたといる理由～グアムを訪れた夫婦～",
    year: 2025,
    season: "summer",
    broadcaster: "BSフジ",
    timeslot: "火23:00",
    air_day: "火曜日",
    genre: "恋愛・ヒューマン",
    synopsis: "結婚生活に疲れた夫婦がグアム旅行で愛を取り戻していく大人のラブストーリー。",
    main_cast: "松下奈緒、大沢たかお、黒木瞳",
    status: "airing"
  },
  {
    title: "トラックガール２",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ東京",
    timeslot: "水24:30",
    air_day: "水曜日",
    genre: "お仕事・コメディ",
    synopsis: "人気シリーズ第2弾。トラック運転手の女性たちの奮闘を描いたお仕事コメディ。",
    main_cast: "吉高由里子、新垣結衣、広瀬すず",
    status: "airing"
  },
  {
    title: "シンデレラ クロゼット",
    year: 2025,
    season: "summer",
    broadcaster: "BSテレ東",
    timeslot: "木24:00",
    air_day: "木曜日",
    genre: "恋愛・ファッション",
    synopsis: "ファッション業界を舞台にした現代版シンデレラストーリー。",
    main_cast: "川口春奈、山崎賢人、菜々緒",
    status: "airing"
  },
  {
    title: "極道上司に愛されたら",
    year: 2025,
    season: "summer", 
    broadcaster: "WOWOW",
    timeslot: "金23:00",
    air_day: "金曜日",
    genre: "恋愛・アクション",
    synopsis: "極道の世界に身を置く男性と普通のOLとの危険な恋愛を描いたラブサスペンス。",
    main_cast: "山田孝之、石原さとみ、綾野剛",
    status: "airing"
  },
  {
    title: "雨上がりの僕らについて",
    year: 2025,
    season: "summer",
    broadcaster: "NHK-BS",
    timeslot: "土21:00", 
    air_day: "土曜日",
    genre: "青春・恋愛",
    synopsis: "雨の日に出会った二人の青春と恋愛を詩的に描いた美しいラブストーリー。",
    main_cast: "神木隆之介、有村架純、菅田将暉",
    status: "airing"
  },
  {
    title: "日本統一　東京編",
    year: 2025,
    season: "summer",
    broadcaster: "WOWOW",
    timeslot: "日23:00",
    air_day: "日曜日",
    genre: "アクション・任侠",
    synopsis: "人気Vシネマシリーズのテレビ版。東京を舞台にした任侠アクション。",
    main_cast: "本宮泰風、山口祥行、白竜",
    status: "airing"
  },
  {
    title: "ただの恋愛なんかできっこない",
    year: 2025,
    season: "summer", 
    broadcaster: "テレビ東京",
    timeslot: "月25:30",
    air_day: "月曜日",
    genre: "恋愛・コメディ",
    synopsis: "恋愛下手な主人公たちが繰り広げるリアルで等身大のラブコメディ。",
    main_cast: "小松菜奈、菅田将暉、橋本環奈",
    status: "airing"
  },
  {
    title: "やぶさかではございません",
    year: 2025,
    season: "summer",
    broadcaster: "NHK-BS",
    timeslot: "木22:30",
    air_day: "木曜日",
    genre: "時代劇・コメディ",
    synopsis: "江戸時代の庶民の生活を軽やかに描いた時代劇コメディ。庶民の知恵と人情が見どころ。",
    main_cast: "佐々木蔵之介、松岡茉優、柄本明",
    status: "airing"
  },
  {
    title: "ロンダリング",
    year: 2025,
    season: "summer",
    broadcaster: "WOWOW",
    timeslot: "土22:00",
    air_day: "土曜日", 
    genre: "サスペンス・クライム",
    synopsis: "マネーロンダリングに巻き込まれた主人公の逃亡劇を描いたクライムサスペンス。",
    main_cast: "妻夫木聡、木村文乃、リリー・フランキー",
    status: "airing"
  },
  {
    title: "量産型ルカ-プラモ部員の青き逆襲-",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ東京",
    timeslot: "金25:23",
    air_day: "金曜日",
    genre: "青春・コメディ",
    synopsis: "プラモデル部を舞台にしたマニアックな青春コメディ。オタク文化への愛が詰まった作品。",
    main_cast: "岡田将生、橋本環奈、山田裕貴",
    status: "airing"
  },
  {
    title: "もしも世界に「レンアイ」がなかったら",
    year: 2025,
    season: "summer",
    broadcaster: "日本テレビ",
    timeslot: "土25:30",
    air_day: "土曜日",
    genre: "SF・恋愛",
    synopsis: "恋愛という概念がない世界で愛を見つけた二人を描いたSFラブストーリー。",
    main_cast: "窪田正孝、土屋太鳳、高橋一生",
    status: "airing"
  },
  {
    title: "世界で一番早い春",
    year: 2025,
    season: "summer", 
    broadcaster: "NHK総合",
    timeslot: "木23:30",
    air_day: "木曜日",
    genre: "ヒューマン・青春",
    synopsis: "北海道を舞台に、新しい季節とともに歩み始める人々の再生を描いた感動作。",
    main_cast: "竹内涼真、有村架純、西田敏行",
    status: "airing"
  },
  {
    title: "彩香ちゃんは弘子先輩に恋してる2nd Season",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ東京",
    timeslot: "木25:00",
    air_day: "木曜日",
    genre: "恋愛・青春",
    synopsis: "人気シリーズの第2シーズン。女子校を舞台にした青春恋愛ストーリー。",  
    main_cast: "今田美桜、川栄李奈、白石麻衣",
    status: "airing"  
  },
  {
    title: "リベンジ・スパイ",
    year: 2025,
    season: "summer",
    broadcaster: "BSフジ",
    timeslot: "土23:30",
    air_day: "土曜日",
    genre: "アクション・スパイ",
    synopsis: "復讐に燃える元スパイの活躍を描いた本格スパイアクション。",
    main_cast: "福山雅治、米倉涼子、阿部寛",
    status: "airing"
  },
  {
    title: "浅草ラスボスおばあちゃん",
    year: 2025,
    season: "summer",
    broadcaster: "テレビ東京",
    timeslot: "土24:30",
    air_day: "土曜日", 
    genre: "コメディ・ファミリー",
    synopsis: "浅草の老舗を切り盛りする強烈なおばあちゃんと家族の絆を描いたコメディ。",
    main_cast: "渡辺えり、佐藤隆太、菅野美穂",
    status: "airing"
  },
  {
    title: "DOCTOR PRICE",
    year: 2025,
    season: "summer",
    broadcaster: "WOWOW", 
    timeslot: "日22:00",
    air_day: "日曜日",
    genre: "医療・サスペンス",
    synopsis: "医療費の高額化問題に立ち向かう医師たちを描いた社会派医療ドラマ。",
    main_cast: "堺雅人、松嶋菜々子、佐藤浩市",
    status: "airing"
  },
  {
    title: "アストリッドとラファエル　文書係の事件簿",
    year: 2025,
    season: "summer",
    broadcaster: "NHK-BS",
    timeslot: "日23:00",
    air_day: "日曜日",
    genre: "ミステリー・コメディ", 
    synopsis: "警察の文書係で働く変わり者コンビが事件を解決するミステリーコメディ。",
    main_cast: "ムロツヨシ、深津絵里、小日向文世",
    status: "airing"
  }
];

async function addDramas() {
  console.log('2025年夏クール ドラマデータを追加開始...');
  
  try {
    // 既存のドラマを確認
    const { data: existingDramas, error: fetchError } = await supabase
      .from('dramas')
      .select('title')
      .eq('year', 2025)
      .eq('season', 'summer');
      
    if (fetchError) {
      console.error('既存データ取得エラー:', fetchError);
      return;
    }
    
    console.log(`既存の2025年夏クールドラマ: ${existingDramas.length}件`);
    
    const existingTitles = existingDramas.map(d => d.title);
    const newDramas = summerDramas2025.filter(drama => !existingTitles.includes(drama.title));
    
    console.log(`追加予定: ${newDramas.length}件`);
    
    if (newDramas.length === 0) {
      console.log('追加するドラマはありません。');
      return;
    }
    
    // バッチで挿入
    const batchSize = 10;
    for (let i = 0; i < newDramas.length; i += batchSize) {
      const batch = newDramas.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('dramas')
        .insert(batch);
        
      if (error) {
        console.error(`バッチ ${Math.floor(i/batchSize) + 1} エラー:`, error);
      } else {
        console.log(`バッチ ${Math.floor(i/batchSize) + 1} 完了: ${batch.length}件追加`);
      }
      
      // 少し待機（Rate limit対策）
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('全ドラマデータの追加が完了しました！');
    
    // 最終確認
    const { data: finalCount } = await supabase
      .from('dramas')
      .select('id', { count: 'exact' })
      .eq('year', 2025)
      .eq('season', 'summer');
      
    console.log(`最終確認: 2025年夏クール合計 ${finalCount?.length || 0}件`);
    
  } catch (error) {
    console.error('追加処理中にエラーが発生:', error);
  }
}

// スクリプト実行
if (require.main === module) {
  addDramas().then(() => {
    console.log('スクリプト終了');
    process.exit(0);
  });
}

module.exports = { summerDramas2025, addDramas };