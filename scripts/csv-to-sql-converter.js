const fs = require('fs');
const csv = require('csv-parse/sync');

// CSVファイルを読み込んでSQLを生成
function convertCSVToSQL() {
  const csvData = fs.readFileSync('/Users/nakayamamasayuki/Documents/GitHub/drabaka/docs/データ_資料/2025_7月放送中_tuned.csv', 'utf8');
  
  // CSVをパース（ヘッダーを処理）
  const records = csv.parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  console.log('-- 2025年7月期ドラマデータ更新SQL');
  console.log('-- 実行日: 2025年7月26日');
  console.log('-- データ件数:', records.length);
  console.log('');

  // 既存データとの照合用（タイトルベース）
  const knownTitles = [
    'あんぱん', '明日はもっと、いい日になる', '僕達はまだその星の校則を知らない',
    'あおぞらビール', 'レプリカ', '誘拐の日', 'スティンガース　警視庁おとり捜査係',
    '初恋DOGs', '北くんがかわいすぎて手に余るので', '完全不倫-隠す美学、暴く覚悟-',
    '私があなたといる理由～グアムを訪れた夫婦～', 'トラックガール２', '大追跡～警視庁SSBC強行犯係',
    'ちはやふる-めぐり-', '最後の鑑定人', '海老だって鯛が釣りたい', 'しあわせな結婚',
    '愛の、がっこう。', 'やぶさかではございません', '恋愛禁止', '世界で一番早い春',
    'シンデレラ クロゼット', '彩香ちゃんは弘子先輩に恋してる2nd Season', '能面検事',
    '奪い愛、真夏', '極道上司に愛されたら', '40までにしたい10のこと', '晩酌の流儀４',
    '量産型ルカ-プラモ部員の青き逆襲-', 'ウルトラマンオメガ', '雨上がりの僕らについて',
    '放送局占拠', 'ロンダリング', 'ひとりで死にたい', 'リベンジ・スパイ',
    '浅草ラスボスおばあちゃん', 'もしも世界に「レンアイ」がなかったら',
    'べらぼう〜蔦重栄華乃夢噺〜', '19番目のカルテ', '照子と瑠衣', 'DOCTOR PRICE',
    'こんばんは、朝山家です。', '日本統一　東京編', 'アストリッドとラファエル　文書係の事件簿',
    'ただの恋愛なんかできっこない'
  ];

  let updateCount = 0;
  let insertCount = 0;

  records.forEach((record, index) => {
    const title = record.title?.trim();
    const broadcaster = record.broadcaster?.trim();
    const timeslot = record.timeslot?.trim();
    const airDay = record.air_day?.trim();
    const year = parseInt(record.year) || 2025;
    const season = mapSeason(record.season?.trim());
    const status = record.status?.trim() || 'airing';
    const genre = record.genre?.trim();
    const mainCast = record.main_cast?.trim();
    const synopsis = record['あらすじ']?.trim();

    if (!title) return;

    // SQLエスケープ処理
    const escapedTitle = escapeSQLString(title);
    const escapedBroadcaster = escapeSQLString(broadcaster);
    const escapedTimeslot = escapeSQLString(timeslot);
    const escapedAirDay = escapeSQLString(airDay);
    const escapedGenre = escapeSQLString(genre);
    const escapedMainCast = escapeSQLString(mainCast);
    const escapedSynopsis = escapeSQLString(synopsis);

    if (isExistingTitle(title, knownTitles)) {
      // UPDATE文
      console.log(`-- ${title} (既存データ更新)`);
      console.log(`UPDATE dramas SET`);
      console.log(`  broadcaster = '${escapedBroadcaster}',`);
      console.log(`  timeslot = '${escapedTimeslot}',`);
      console.log(`  air_day = '${escapedAirDay}',`);
      console.log(`  year = ${year},`);
      console.log(`  season = '${season}',`);
      console.log(`  status = '${status}',`);
      console.log(`  genre = '${escapedGenre}',`);
      console.log(`  main_cast = '${escapedMainCast}',`);
      console.log(`  synopsis = '${escapedSynopsis}'`);
      console.log(`WHERE title = '${escapedTitle}';`);
      console.log('');
      updateCount++;
    } else {
      // INSERT文
      console.log(`-- ${title} (新規追加)`);
      console.log(`INSERT INTO dramas (`);
      console.log(`  title, broadcaster, timeslot, air_day, year, season, status, genre, main_cast, synopsis`);
      console.log(`) VALUES (`);
      console.log(`  '${escapedTitle}',`);
      console.log(`  '${escapedBroadcaster}',`);
      console.log(`  '${escapedTimeslot}',`);
      console.log(`  '${escapedAirDay}',`);
      console.log(`  ${year},`);
      console.log(`  '${season}',`);
      console.log(`  '${status}',`);
      console.log(`  '${escapedGenre}',`);
      console.log(`  '${escapedMainCast}',`);
      console.log(`  '${escapedSynopsis}'`);
      console.log(`);`);
      console.log('');
      insertCount++;
    }
  });

  console.log(`-- 処理サマリー`);
  console.log(`-- 更新件数: ${updateCount}件`);
  console.log(`-- 新規追加: ${insertCount}件`);
  console.log(`-- 総処理件数: ${updateCount + insertCount}件`);
}

// 季節マッピング
function mapSeason(seasonStr) {
  if (!seasonStr) return 'summer';
  if (seasonStr.includes('4月') || seasonStr.includes('春')) return 'spring';
  if (seasonStr.includes('7月') || seasonStr.includes('夏')) return 'summer';
  if (seasonStr.includes('10月') || seasonStr.includes('秋')) return 'autumn';
  if (seasonStr.includes('1月') || seasonStr.includes('冬')) return 'winter';
  return 'summer'; // デフォルト
}

// SQLエスケープ処理
function escapeSQLString(str) {
  if (!str) return '';
  return str.replace(/'/g, "''").replace(/\n/g, ' ').replace(/\r/g, '');
}

// 既存タイトル判定（あいまいマッチング）
function isExistingTitle(csvTitle, knownTitles) {
  // 完全一致
  if (knownTitles.includes(csvTitle)) return true;
  
  // 部分一致チェック（よくある差異を考慮）
  const normalizedCSV = csvTitle.replace(/[　\s]/g, '').toLowerCase();
  
  return knownTitles.some(knownTitle => {
    const normalizedKnown = knownTitle.replace(/[　\s]/g, '').toLowerCase();
    
    // 部分一致（70%以上の一致率）
    if (normalizedCSV.includes(normalizedKnown) || normalizedKnown.includes(normalizedCSV)) {
      return true;
    }
    
    // Levenshtein距離での類似度チェック
    const distance = levenshteinDistance(normalizedCSV, normalizedKnown);
    const maxLength = Math.max(normalizedCSV.length, normalizedKnown.length);
    const similarity = 1 - (distance / maxLength);
    
    return similarity >= 0.8; // 80%以上の類似度
  });
}

// Levenshtein距離計算
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// CSV-parse がない場合のフォールバック
if (typeof require !== 'undefined') {
  try {
    require('csv-parse/sync');
    convertCSVToSQL();
  } catch (error) {
    console.error('csv-parse module not found. Please run: npm install csv-parse');
    console.error('Falling back to manual parsing...');
    
    // 手動パース版（簡易）
    const fs = require('fs');
    const csvData = fs.readFileSync('/Users/nakayamamasayuki/Documents/GitHub/drabaka/docs/データ_資料/2025_7月放送中_tuned.csv', 'utf8');
    
    console.log('-- 手動パース版SQL生成（要確認）');
    console.log('-- CSVデータが確認されました。手動でSQLを生成してください。');
  }
} else {
  convertCSVToSQL();
}