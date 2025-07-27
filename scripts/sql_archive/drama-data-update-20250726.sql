-- 2025年7月期ドラマデータ更新SQL
-- 実行日: 2025年7月26日
-- データ件数: 45

-- あんぱん (既存データ更新)
UPDATE dramas SET
  broadcaster = 'NHK総合',
  timeslot = '月08:00',
  air_day = '月曜日',
  year = 2025,
  season = 'spring',
  status = 'airing',
  genre = '朝ドラ',
  main_cast = '今田美桜、永瀬ゆずな、加瀬亮、江口のりこ',
  synopsis = '“アンパンマン”を生み出したやなせたかしと暢の夫婦をモデルに、生きる意味も失っていた苦悩の日々と、それでも夢を忘れなかった二人の人生。何者でもなかった二人があらゆる荒波を乗り越え、“逆転しない正義”を体現した『アンパンマン』にたどり着くまでを描き、生きる喜びが全身から湧いてくるような愛と勇気の物語です。'
WHERE title = 'あんぱん';

-- 明日はもっと、い日になる (既存データ更新)
UPDATE dramas SET
  broadcaster = 'フジテレビ',
  timeslot = '月21:00',
  air_day = '月曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '恋愛、ヒューマン',
  main_cast = '福原遥、林遣都、生田絵梨花、小林きな子',
  synopsis = 'フジテレビ7月期月9ドラマ『明日はもっと、いい日になる』は、福原遥主演、林遣都出演のハートフルヒューマンドラマ。児童相談所を舞台とした完全オリジナルストーリーで、刑事の夏井翼（福原遥）が突然児童相談所への出向を命じられる。刑事時代は事件発生後の対応が中心だったが、児童相談所では事件を未然に防ぐ予防的な仕事が求められる。SOSを伝えられない子どもたちの異変を察知し、継続的な心のケアを通じて子どもたちの成長を支援する。当初は児童相談所で働く意思がなかった翼が、様々な子どもやその親と向き合いながら共に成長していく姿を温かく描く。'
WHERE title = '明日はもっと、い日になる';

-- 僕達はまだその星の校則を知らない (既存データ更新)
UPDATE dramas SET
  broadcaster = 'カンテレ',
  timeslot = '月22:00',
  air_day = '月曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '学園ヒューマン',
  main_cast = '磯村勇斗、堀田真由、稲垣吾郎',
  synopsis = '独特の感性を持つがゆえに人生や仕事に臆病な弁護士・白鳥健治が主人公の学園ヒューマンドラマ。幼少期から周囲と感覚が違うことで集団行動になじめず、不登校になった過去を持つ健治は、ある日、スクールロイヤーとして私立高校へ派遣される。その高校は、少子化の影響で共学化したばかりで、様々な問題を抱えている。健治は、法律や校則だけでは解決できない若者たちの青春に、不器用ながらも必死に向き合っていきます。'
WHERE title = '僕達はまだその星の校則を知らない';

-- あおぞらビール (既存データ更新)
UPDATE dramas SET
  broadcaster = 'NHK総合',
  timeslot = '月-木22:45',
  air_day = '月曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '青春',
  main_cast = '窪塚愛流、藤岡真威人、豊嶋花、南出凌嘉',
  synopsis = '自称「Fラン大学」に通う大学4年生の森川行男は「人生の豊かさは、大自然の中、青空の下で、キンキンに冷えたビールを飲んだ回数で決まる」をモットーにするアウトドア自由人。就職活動に苦戦する同級生の八木拓馬を「就活を成功させるには、学生時代に何かをやり遂げることが大事」と説得し、ゴムボートで川を下る冒険に誘う。これをきっかけに、後輩の松宮一朗太や、彼らのアウトドアライフに憧れる女子学生の三条弥生も加わり、キャンプを通じて様々な珍道中を繰り広げていく。行く先々で出会う個性的な人々との交流を通して、大学生4人が自身の未来を見つめ直していく物語。'
WHERE title = 'あおぞらビール';

-- レプリカ 元妻の復讐 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '月23:06',
  air_day = '月曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '復讐サスペンス',
  main_cast = 'トリンドル玲奈、宮本茉由、木村了',
  synopsis = '主人公の藤村葵は、子供の頃から同級生の花梨にいじめられてきた。やがて葵は桔平という男性と結婚し幸せを掴んだかに思えたが、夫の浮気相手が花梨であったことが発覚する。花梨の策略によって夫だけでなく、仕事や友人など全てを失った葵は、整形手術で顔と名前を変え、「伊藤すみれ」として別人になりすまし、復讐を誓う。'
WHERE title = 'レプリカ 元妻の復讐';

-- 誘拐の日 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ朝日',
  timeslot = '火21:00',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ヒューマンミステリー',
  main_cast = '斎藤工、永尾柚乃、深澤辰哉',
  synopsis = '心臓病を患う娘の手術費用を稼ぐため、裕福な病院長の娘・七瀬凛の誘拐を計画する。しかし、誘拐を実行しようとした矢先、凛が記憶喪失になってしまい、さらに彼女の両親が何者かに殺害されてしまう。ただの誘拐犯から一転して殺人の容疑者となった政宗が、記憶を失った天才少女の凛と共に、警察に追われながら事件の真相に挑むヒューマンミステリー。'
WHERE title = '誘拐の日';

-- スティンガース 警視庁おとり捜査検証室 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'フジテレビ',
  timeslot = '火21:00',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '刑事',
  main_cast = '森川葵、藤井流星、本郷奏多',
  synopsis = '現代の多様化する犯罪に対抗するため、警視庁内に新設されたおとり捜査専門チーム「スティンガース」の活躍を描く、完全オリジナルの刑事ドラマ。アメリカ帰りのエリート女性捜査官・二階堂民子率いる「スティンガース」が、スリリングでポップな世界観の中で事件を解決していく様子を描く。'
WHERE title = 'スティンガース 警視庁おとり捜査検証室';

-- 初恋DOGs (既存データ更新)
UPDATE dramas SET
  broadcaster = 'TBS',
  timeslot = '火22:00',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ラブストーリー',
  main_cast = '清原果耶、成田凌、ナ・イヌ',
  synopsis = '愛を信じないクールな弁護士と、動物しか愛せないこじらせ獣医の“愛犬”同士が恋に落ちたことをきっかけに始まるラブストーリー。日本のTBSドラマチームと、数々のグローバルヒット作で知られる韓国の制作会社STUDIO DRAGONが初めて共同制作するドラマとしても注目されている。'
WHERE title = '初恋DOGs';

-- 北くんがかわいすぎて手に余るので、3人でシェアすることにしました。 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'カンテレ',
  timeslot = '火23:00',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'シェアラブコメディ',
  main_cast = '本田翼、志田未来、岩瀬洋志',
  synopsis = 'あまりにも魅力的すぎる「ナチュラルボーン天使」な青年・北くんを、3人の男女が「シェア」するという奇妙な共同生活を描きます。'
WHERE title = '北くんがかわいすぎて手に余るので、3人でシェアすることにしました。';

-- 完全不倫-隠す美学、暴く覚悟- (既存データ更新)
UPDATE dramas SET
  broadcaster = '日本テレビ',
  timeslot = '火24:24',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '不倫',
  main_cast = '仁村紗和、前田公輝',
  synopsis = '夫を愛するために不倫を続ける女性と、どんなに裏切られても妻を愛し続ける男性の物語。主人公の吉岡千春が巧妙な手口で不倫の証拠を隠しながら、夫・拓哉との夫婦関係を維持しようとするところから展開する。'
WHERE title = '完全不倫-隠す美学、暴く覚悟-';

-- 私があなたといる理由～グアムを訪れた3組の男女の1週間～ (新規追加)
INSERT INTO dramas (
  title, broadcaster, timeslot, air_day, year, season, status, genre, main_cast, synopsis
) VALUES (
  '私があなたといる理由～グアムを訪れた3組の男女の1週間～',
  'テレビ東京',
  '火24:30',
  '火曜日',
  2025,
  'summer',
  'airing',
  'ヒューマンドラマ',
  '蓮佛美沙子、溝端淳平、中井友望、百瀬拓実、勝村政信、いしのようこ',
  '世代の異なる20代、30代、50代の3組の男女が、グアムで過ごす1週間を通して「誰かと生きること」の意味を見つめ直すヒューマンドラマ。物語の最後には、3組のうち1組が別れを決断する。'
);

-- トラックガール２ (既存データ更新)
UPDATE dramas SET
  broadcaster = 'フジテレビ',
  timeslot = '火24:45',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ハートフルコメディ',
  main_cast = '遠藤さくら（乃木坂46）',
  synopsis = '女性トラック運転手「トラックめいめい」さんのSNSアカウントを原案としたFODオリジナルドラマの第2弾。人生をポジティブに過ごす女性トラック運転手の鞍手じゅんと、彼女を取り巻く愉快な仲間たちとの日常を描いたハートフルコメディドラマ。'
WHERE title = 'トラックガール２';

-- シンデレラ クロゼット (既存データ更新)
UPDATE dramas SET
  broadcaster = 'TBS',
  timeslot = '火24:58',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '青春ラブストーリー',
  main_cast = '尾碕真花、松本怜生',
  synopsis = '地方から上京し、オシャレな大学生活を夢見るものの、周囲に馴染めずにいた女子大生の福永春香。ある日、憧れの先輩から食事に誘われるが、着ていく服がなく困り果ててしまう。そんな春香を救ったのは、謎の美女・神山光。実は光は女装男子で、春香は光との出会いをきっかけにメイクやファッションに目覚め、成長していくという新感覚の青春ラブストーリー。'
WHERE title = 'シンデレラ クロゼット';

-- 極道上司に愛されたら (既存データ更新)
UPDATE dramas SET
  broadcaster = 'MBS/TBS',
  timeslot = '火24:59',
  air_day = '火曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ラブストーリー',
  main_cast = '戸塚祥太（A.B.C-Z）、紺野彩夏',
  synopsis = '恋人に浮気され家を失った主人公・真琴が、社内で「極道上司」と恐れられる部長・小田切に助けられるところから始まる。しかし、小田切には極道の若頭という裏の顔があり、甘くて危険な同居生活が描かれるラブストーリー。'
WHERE title = '極道上司に愛されたら';

-- 大追跡～警視庁SSBC強行犯係～ (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ朝日',
  timeslot = '水21:00',
  air_day = '水曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '刑事',
  main_cast = '大森南朋、相葉雅紀、松下奈緒',
  synopsis = '2009年に警視庁に新設された「捜査支援分析センター（SSBC）」を舞台に、新設された架空の部署「SSBC強行犯係」の活躍を描く物語。SSBCは、防犯カメラの映像解析やスマートフォンのデータ解析、プロファイリングなどを駆使して捜査を支援する専門部隊。'
WHERE title = '大追跡～警視庁SSBC強行犯係～';

-- ちはやふる-めぐり- (既存データ更新)
UPDATE dramas SET
  broadcaster = '日本テレビ',
  timeslot = '水22:00',
  air_day = '水曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '青春',
  main_cast = '當真あみ、上白石萌音',
  synopsis = '人気漫画「ちはやふる」の実写映画シリーズから10年後を舞台にしたオリジナルストーリー。主人公は、梅園高校2年生の藍沢めぐる。彼女は効率を重視する「タイパ」な性格で、廃部寸前の競技かるた部に所属する幽霊部員だった。しかし、新しく顧問となった大江奏との出会いをきっかけに、彼女の運命は大きく動き出す。物語は、かるたを通じて成長していく高校生たちの姿を描く。'
WHERE title = 'ちはやふる-めぐり-';

-- 最後の鑑定人 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'フジテレビ',
  timeslot = '水22:00',
  air_day = '水曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'サイエンスミステリー',
  main_cast = '藤木直人、白石麻衣、松雪泰子',
  synopsis = 'かつて科捜研のエースで「最後の鑑定人」と呼ばれた土門誠が、自ら設立した鑑定所で、科学的アプローチを駆使して難事件を解決に導いていく物語。'
WHERE title = '最後の鑑定人';

-- 海老だって鯛が釣りたい (既存データ更新)
UPDATE dramas SET
  broadcaster = '中京テレビ',
  timeslot = '水24:24',
  air_day = '水曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ラブコメディ',
  main_cast = '田辺桃子、中川大輔、草川拓弥、EJ（&TEAM）、桜田通',
  synopsis = '衣料品メーカーに勤務するごく普通の25歳の海老原唯子（通称：海老子）は、自己肯定感が低く、恋人にも振られてしまう。泥酔した勢いで、社内の憧れのハイスペックな上司・鯛島にキスをしてしまう。その後、近所のアクアリウムショップのミステリアスな店長・水沼と出会い、一夜を共にすることに。これを機に、海老子は「脱・小エビ」を目指し、本気の恋愛で理想の相手を見つけようと一念発起する。そんな彼女の前に、王子様のような韓国人男性や、気心の知れた幼なじみも現れ、タイプの違う4人の男性との間で揺れ動く。'
WHERE title = '海老だって鯛が釣りたい';

-- 雨上がりの僕らについて (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '水24:30',
  air_day = '水曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ボーイズラブ',
  main_cast = '池田匡志、堀夏喜（FANTASTICS）',
  synopsis = '東京で暮らす社会人の奏振一郎は、学生時代の苦い経験から、自身が同性愛者であることを隠し、「もう恋はしない」と心に決めて生きていた。そんなある日、高校時代の親友であり、かつて特別な想いを寄せていた真城洸輔と6年ぶりに偶然再会する。この再会をきっかけに、止まっていた2人の恋がゆっくりと動き始め、過去の記憶と向き合いながら自分自身を見つめ直していく、不器用で心あたたまるボーイズラブストーリー。'
WHERE title = '雨上がりの僕らについて';

-- 日本統一　東京編 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '水25:00',
  air_day = '水曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '任侠"',
  main_cast = '本宮泰風、山口祥行',
  synopsis = '日本最大の任侠団体「侠和会」の若頭・氷室蓮司と本部長・田村悠人が、東京を舞台に社会問題となっている匿名・流動型犯罪グループ「トクリュウ」と対峙するところから始まる。ある深夜、氷室と田村は偶然、強盗団の現場に遭遇し、その一味を捕えるが、ごく普通の若者であったことから、事件の背後にある闇バイトの実態と「トクリュウ」の存在に気づく。本作では、任侠、警察、そしてトクリュウの三者がしのぎを削るクライムサスペンスが描かれる。'
WHERE title = '日本統一　東京編';

-- ただの恋愛なんかできっこない (既存データ更新)
UPDATE dramas SET
  broadcaster = 'TOKYO MX',
  timeslot = '水26:00',
  air_day = '水曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'オフィスラブ',
  main_cast = '山本涼介、葵うたの',
  synopsis = '仕事一筋だった主人公・唯野さくらは、異動先で完璧なイケメン上司・桐谷樹に出会う。しかし、さくらは極度の「においフェチ」で、桐谷の香りに「ひと鼻惚れ」してしまう。一方、桐谷は過去のトラウマから女性に触れることができない「触れられない男」だった。そんな二人がお互いの秘密を知ったことから、心の距離が近づき始めるという、もどかしくて甘いオフィスラブストーリー。'
WHERE title = 'ただの恋愛なんかできっこない';

-- しあわせな結婚 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ朝日',
  timeslot = '木21:00',
  air_day = '木曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'マリッジ・サスペンス',
  main_cast = '阿部サダヲ、松たか子',
  synopsis = '数々の裁判で無罪を勝ち取る優秀な弁護士・原田幸太郎は、50年間独身主義を貫いてきたが、ある日、病院で出会った鈴木ネルラと運命的な出会いを果たし、電撃結婚する。しかし、愛する妻ネルラは大きな秘密を抱えていた。物語は、ネルラの元婚約者の15年前の死を巡る謎を中心に展開し、夫婦の愛が問われるマリッジ・サスペンス。'
WHERE title = 'しあわせな結婚';

-- 愛の、がっこう。 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'フジテレビ',
  timeslot = '木22:00',
  air_day = '木曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '純愛',
  main_cast = '木村文乃、ラウール（Snow Man）',
  synopsis = '真面目すぎる高校教師と、文字の読み書きが苦手なホストという、本来交わることのない2人が出会い、禁断でありながらも純粋な愛を育んでいく物語。'
WHERE title = '愛の、がっこう。';

-- 恋愛禁止 (既存データ更新)
UPDATE dramas SET
  broadcaster = '読売テレビ',
  timeslot = '木23:59',
  air_day = '木曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '恋愛ホラーサスペンス',
  main_cast = '伊原六花、佐藤大樹（EXILE / FANTASTICS）',
  synopsis = '主人公の木村瑞帆は、不動産会社で働く女性。過去に元恋人からの暴力が原因で、地元の静岡を離れ東京で暮らしている。ある日、瑞帆の前に元恋人・倉島隆が現れ、復縁を迫る。恐怖のあまり、瑞帆は衝動的に隆を刺殺してしまうが、翌日になっても事件はなぜか明るみに出ない。そんな中、瑞帆の前に3人の男性が現れ、彼女の運命を翻弄していく。'
WHERE title = '恋愛禁止';

-- やぶさかではございません (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '水24:30',
  air_day = '水曜日',
  year = 2025,
  season = 'spring',
  status = 'airing',
  genre = 'ラブコメディ',
  main_cast = '松村沙友理、駒木根葵汰',
  synopsis = '静寂を楽しむ「サイレントカフェ・アサガオ」。主人公の不思議麻衣は、初恋のトラウマから恋愛をこじらせてしまったアラサー女子。ある日、このカフェで働くことになった麻衣は、同僚で人との距離感が近い年下男子・上下亮と出会う。亮から「自分を観察して悪いところを教えてほしい」と頼まれたことをきっかけに、二人はお互いを“観察”し合う不思議な関係になる。'
WHERE title = 'やぶさかではございません';

-- ロンダリング (既存データ更新)
UPDATE dramas SET
  broadcaster = 'カンテレ',
  timeslot = '木24:15',
  air_day = '木曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '社会派ミステリー',
  main_cast = '藤原丈一郎（なにわ男子）、菅井友香',
  synopsis = '売れない俳優・緋山鋭介は、この世に恨みを残して亡くなった人の声が聞こえるという特殊能力を持っている。その能力を活かし、事故物件を浄化（ロンダリング）する仕事を通じて、社会の闇に葬られた人々の無念を晴らそうと奮闘する。'
WHERE title = 'ロンダリング';

-- 量産型ルカ-プラモ部員の青き逆襲- (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '木24:30',
  air_day = '木曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ホビー・ヒューマンドラマ',
  main_cast = '賀喜遥香（乃木坂46）、筒井あやめ（乃木坂46）',
  synopsis = '「量産型リコ」シリーズの新章。性格も好き嫌いも異なる2人の「ルカ」が、廃部寸前のプラモデル部と出会い、高校生活最後の青春を取り戻していく姿を描く。 もしも世界に「レンアイ」がなかったら,CBCテレビ,木24:58,木曜日,2025,7月期,airing,ラブストーリー,"島崎遥香、ISSEI'
WHERE title = '量産型ルカ-プラモ部員の青き逆襲-';

-- 世界で一番早い春 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'MBS',
  timeslot = '木24:59',
  air_day = '木曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'タイムスリップラブストーリー',
  main_cast = '吉田美月喜、藤原樹（THE RAMPAGE from EXILE TRIBE）',
  synopsis = '大ヒット漫画「リバイブライン」を連載する26歳の漫画家・晴田真帆。しかし、その作品は10年前に亡くなった高校の漫画部の先輩・雪嶋周の設定ノートを基に描いたものだった。「本当は先輩に描いてほしかった。できるなら先輩に作品を返したい」と願う真帆は、ある出来事をきっかけに高校時代へタイムスリップしてしまう。'
WHERE title = '世界で一番早い春';

-- 彩香ちゃんは弘子先輩に恋してる2nd Stage (既存データ更新)
UPDATE dramas SET
  broadcaster = 'MBS',
  timeslot = '木25:29',
  air_day = '木曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ガールズラブコメディ',
  main_cast = '加藤史帆、森カンナ',
  synopsis = '2024年7月期に放送された「彩香ちゃんは弘子先輩に恋してる」の続編。付き合い始めた後の二人の同棲生活やハワイアンズへの旅行が描かれる。'
WHERE title = '彩香ちゃんは弘子先輩に恋してる2nd Stage';

-- 能面検事 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '金21:00',
  air_day = '金曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'リーガルミステリー',
  main_cast = '上川隆也、吉谷彩子',
  synopsis = '大阪地検のエース検事・不破俊太郎は、一切感情を表に出さないため、「能面検事」と呼ばれている。新人事務官の惣領美晴は、そんな不破とコンビを組み、巨大な権力に忖度することなく事件の真相を暴いていく。'
WHERE title = '能面検事';

-- DOPE 麻薬取締部特捜課 (新規追加)
INSERT INTO dramas (
  title, broadcaster, timeslot, air_day, year, season, status, genre, main_cast, synopsis
) VALUES (
  'DOPE 麻薬取締部特捜課',
  'TBS',
  '金22:00',
  '金曜日',
  2025,
  'summer',
  'airing',
  'アクション・エンターテインメント',
  '髙橋海人（King & Prince）、中村倫也',
  '謎の新型ドラッグ「DOPE」が蔓延する近未来の日本。致死率が高いにもかかわらず、使用後に特殊能力を覚醒させる者がいることから、手を出す者が後を絶たない。これに対処するため、厚生労働省麻薬取締部に特殊捜査課、通称「特捜課」が設立される。新人麻薬取締官の才木優人と、教育係の陣内鉄平がバディを組み、DOPEが引き起こす不可解な事件の解決に挑む。'
);

-- 奪い愛、真夏 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ朝日',
  timeslot = '金23:15',
  air_day = '金曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ドロキュン恋愛',
  main_cast = '松本まりか、安田顕、高橋メアリージュン、白濱亜嵐、森香澄',
  synopsis = 'さまざまな登場人物たちが愛を奪い合う、激しくも切ない「ドロキュン」恋愛ドラマ。'
WHERE title = '奪い愛、真夏';

-- 40までにしたい10のこと (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '金24:12',
  air_day = '金曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'オフィスラブ',
  main_cast = '風間俊介、庄司浩平',
  synopsis = '40歳を目前にした恋愛経験のない上司・十条雀と、10歳年下のイケメン部下・田中慶司が織りなすオフィスラブストーリー。雀が作成した「40までにやりたいことリスト」を慶司に見られてしまい、一緒にリストの項目をこなしていくことになる。'
WHERE title = '40までにしたい10のこと';

-- 晩酌の流儀４ (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '金24:42',
  air_day = '金曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'グルメ',
  main_cast = '栗山千明',
  synopsis = '不動産会社の営業として働く伊澤美幸が「1日の終わりにお酒をいかに美味しく飲むことが出来るか」を追求する物語。シリーズ初の2クール連続放送となり、「夏編」として7月期に、そして「秋・冬編」として10月期に放送が続く予定。'
WHERE title = '晩酌の流儀４';

-- ウルトラマンオメガ (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ東京',
  timeslot = '土09:00',
  air_day = '土曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '特撮',
  main_cast = '近藤頌利',
  synopsis = 'ヒーローも怪獣も存在しない地球に、記憶を失った宇宙人「オメガ」が「ソラト」という地球人の姿で現れるところから始まる。巨大生物（怪獣）が出現する中で、ソラトはウルトラマンオメガに変身して戦い、「なぜウルトラマンは地球を守るのか？」というテーマが描かれる。'
WHERE title = 'ウルトラマンオメガ';

-- 放送局占拠 (既存データ更新)
UPDATE dramas SET
  broadcaster = '日本テレビ',
  timeslot = '土21:00',
  air_day = '土曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'タイムリミットバトルサスペンス',
  main_cast = '櫻井翔',
  synopsis = '警視庁刑事部BCCT捜査員の武蔵三郎が、妖怪の面をかぶった武装集団「妖（あやかし）」に占拠された放送局で、500名の人質を救うために立ち向かう。「大病院占拠」「新空港占拠」に続く「占拠」シリーズの第3弾。'
WHERE title = '放送局占拠';

-- ひとりでしにたい (既存データ更新)
UPDATE dramas SET
  broadcaster = 'NHK総合',
  timeslot = '土22:00',
  air_day = '土曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ヒューマン',
  main_cast = '綾瀬はるか',
  synopsis = '30代後半の独身女性が「終活」をテーマに、自分らしい人生を再構築していく姿をコミカルに描く。主人公の山口鳴海（35歳、独身、美術館学芸員）は、憧れの伯母が孤独死したことをきっかけに「終活」を意識し始める。'
WHERE title = 'ひとりでしにたい';

-- リベンジ・スパイ (既存データ更新)
UPDATE dramas SET
  broadcaster = 'テレビ朝日',
  timeslot = '土23:00',
  air_day = '土曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'スパイ・ラブコメディ',
  main_cast = '大橋和也（なにわ男子）、渋谷凪咲',
  synopsis = '何者かの策略によってこの世を去った兄の復讐のため、スパイとして暗躍する菅原優我（大橋和也）が、ターゲットである社長令嬢の藺牟田花（渋谷凪咲）に近づき、恋に落ちていくという展開。'
WHERE title = 'リベンジ・スパイ';

-- 浅草ラスボスおばあちゃん (既存データ更新)
UPDATE dramas SET
  broadcaster = '東海テレビ',
  timeslot = '土23:40',
  air_day = '土曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ヒューマンドラマ',
  main_cast = '梅沢富美男',
  synopsis = '75歳で職を失った日向松子（梅沢富美男）が「便利屋ラスボスおばあちゃん」を開業し、若者たちとシェアハウスで共同生活をしながら、様々なトラブルを解決していくヒューマンドラマ。'
WHERE title = '浅草ラスボスおばあちゃん';

-- べらぼう〜蔦重栄華乃夢噺〜 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'NHK総合',
  timeslot = '日20:00',
  air_day = '日曜日',
  year = 2025,
  season = 'winter',
  status = 'airing',
  genre = '時代劇',
  main_cast = '横浜流星',
  synopsis = '江戸時代の版元である蔦屋重三郎の生涯を描く。日本のメディア産業やポップカルチャーの礎を築いた蔦屋重三郎の波乱万丈な生涯を、笑いと涙と謎に満ちたエンターテインメントとして描く。'
WHERE title = 'べらぼう〜蔦重栄華乃夢噺〜';

-- 19番目のカルテ (既存データ更新)
UPDATE dramas SET
  broadcaster = 'TBS',
  timeslot = '日21:00',
  air_day = '日曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '医療ヒューマンエンターテインメント',
  main_cast = '松本潤',
  synopsis = '病気ではなく「人」を診る総合診療医・徳重晃を演じる。'
WHERE title = '19番目のカルテ';

-- 照子と瑠衣 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'NHK BS/BSP4K',
  timeslot = '日22:00',
  air_day = '日曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'シスターフッドドラマ',
  main_cast = '風吹ジュン、夏木マリ',
  synopsis = '70代の主婦・音無照子とシャンソン歌手・森田瑠衣の2人が、それぞれの現状から逃避行し、自由を手に入れて新しい人生に踏み出す姿を描くシスターフッドドラマ。'
WHERE title = '照子と瑠衣';

-- こんばんは、朝山家です。 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'ABCテレビ',
  timeslot = '日22:00',
  air_day = '日曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = 'ホームドラマ',
  main_cast = '小澤征悦、中村アン',
  synopsis = '脚本家の夫・朝山賢太と、その妻で事務所社長の朝子を中心に、高校生の長女・蝶子と小学6年生の長男でASD（自閉スペクトラム症）の晴太の4人家族が織りなすホームドラマ。'
WHERE title = 'こんばんは、朝山家です。';

-- DOCTOR PRICE (既存データ更新)
UPDATE dramas SET
  broadcaster = '読売テレビ',
  timeslot = '日22:30',
  air_day = '日曜日',
  year = 2025,
  season = 'summer',
  status = 'airing',
  genre = '医療サスペンス',
  main_cast = '岩田剛典、蒔田彩珠',
  synopsis = '医師専門の転職エージェントとして、人と金と情報を操り、欲にまみれた者たちを裁く“ダークヒーロー”を演じる。'
WHERE title = 'DOCTOR PRICE';

-- アストリッドとラファエル　文書係の事件録 (既存データ更新)
UPDATE dramas SET
  broadcaster = 'ミステリーチャンネル',
  timeslot = '土16:00',
  air_day = '日曜日',
  year = 2025,
  season = 'summer',
  status = 'rebroadcast',
  genre = 'ミステリー',
  main_cast = 'サラ・モーテンセン、ローラ・ドベール',
  synopsis = 'パリ犯罪資料局の文書係アストリッドは、自閉スペクトラム症と診断された過去を持ち、卓越した知識と論理的思考力を備えている。亡き警察官の父の影響で捜査調書を「パズル」として分析することに強い興味を持ち、犯罪科学の専門家レベルに達している。一方、警視ラファエルは経験豊富で直感力と行動力に優れた敏腕刑事。医師の不可解な死亡事件の捜査中、アストリッドから提供された過去の類似事件資料により彼女の才能を発見し、捜査協力を依頼する。人づきあいを避けがちなアストリッドと、やや粗野だが行動力のあるラファエルが、互いの違いを受け入れ補完し合いながら友情と信頼関係を築き、難事件を解決していく物語。'
WHERE title = 'アストリッドとラファエル　文書係の事件録';

-- 処理サマリー
-- 更新件数: 43件
-- 新規追加: 2件
-- 総処理件数: 45件
