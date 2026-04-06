import { useState } from "react";

/* ═══ LIVE STREAMING KNOWLEDGE (from TikTok Creator Hub) ═══ */
const LIVE_KB = {
  framework: {
    en: [
      { step:"1. Exposure", icon:"📡", color:"#E8A87C", sub:"Get discovered",
        sections:[
          { t:"Streaming Frequency", items:[
            "Week 3x minimum → ideal 5x",
            "Mere exposure effect: repeated contact = fans",
            "Monthly 1x = viewers can't become regulars",
            "Top creators: 5+ days/week, 35+ hours total",
          ]},
          { t:"Streaming Duration", items:[
            "2 hours minimum for meaningful growth",
            "Longer streams = more chances for new viewers to find you",
            "Top creators have high diamonds AND high stream time",
            "45-min rule: high-energy 45 min > low-energy 2 hours",
          ]},
          { t:"Time & Routine", items:[
            "Fix your schedule like a TV show",
            "Viewers form habits around your time",
            "Example: Sakurakawa Shu — same time daily → regulars in 2 weeks",
            "Stream at YOUR peak energy time",
          ]},
          { t:"Promotion", items:[
            "Post teasers 24h and 1h before going live",
            "Use LIVE Events for advance scheduling",
            "Reminder stickers on short videos",
            "Cross-promote on Twitter/X, Instagram, YouTube",
            "Example: SATOYU (3M followers) posts on X before every stream",
          ]},
        ]},
      { step:"2. First Impression", icon:"👁️", color:"#5D8AE8", sub:"Get them to stay",
        sections:[
          { t:"Profile Setup", items:[
            "Icon: high quality, clear face, simple background",
            "Account name: simple, searchable, memorable",
            "Don't change icon/name frequently — consistency = recognition",
            "Profile bio: who you are + what you stream + when",
          ]},
          { t:"Stream Title & Cover", items:[
            "Title + cover = first thing viewers see → huge impact on entry rate",
            "Include trending topics or clear description",
            "Set the right Topic category for algorithm matching",
          ]},
          { t:"Background & Appearance", items:[
            "Clean, simple background (wall or curtain)",
            "Avoid messy/cluttered backgrounds",
            "Add info to background (event info, messages)",
            "Dress to match your character/brand — no pajamas!",
            "Good lighting: ring light recommended",
            "Camera at eye level or slightly above",
          ]},
          { t:"First 3 Minutes", items:[
            "CRITICAL: Algorithm judges your stream early",
            "Start high-energy — don't ease in slowly",
            "Warm up with casual chat before selling/performing",
            "Greet early viewers by name immediately",
          ]},
        ]},
      { step:"3. Retention", icon:"⏱️", color:"#5DAE5D", sub:"Keep them watching",
        sections:[
          { t:"Call Viewers by Name", items:[
            "People stay longer when they feel recognized",
            "Even those NOT called will stay hoping to be called next",
            "Read username → find the name part → greet naturally",
            "Example: 'Hey [name], welcome! Love your icon!'",
          ]},
          { t:"Content Structure", items:[
            "Structure like a TV show: intro → main → interaction → close",
            "5-10 minutes per product/topic — don't linger",
            "Alternate: face → close-up → details → interior",
            "Mix formats: talk → performance → Q&A → talk",
            "Example: Doll creator — 1hr performance + 30min story + 30-60min chat",
          ]},
          { t:"Energy Management", items:[
            "Cover the viewer count — focus on connection",
            "Energy dip? Switch camera angle, do a poll, tease next item",
            "End strong — don't fade out",
            "Your tiredness is visible to viewers — it kills the mood",
            "Prepare 20% more content than planned",
          ]},
          { t:"Treasure Box Strategy", items:[
            "Set coins that viewers can split — creates 'when will it come?' anticipation",
            "Irregular timing = longer viewer retention",
            "Example: Eri (@eriawa) uses treasure boxes for retention",
          ]},
        ]},
      { step:"4. Engagement", icon:"💬", color:"#C4A7D7", sub:"Make them participate",
        sections:[
          { t:"Comment Strategy", items:[
            "Target: 300 commenters/week = stable income",
            "600/week = standard goal",
            "1000/week = top creator level",
            "Comments should NEVER stop flowing",
            "More comments = more visibility = more viewers",
          ]},
          { t:"Driving Comments", items:[
            "Ask open questions: 'What do you think?'",
            "Ask choice questions: 'Shibuya or Harajuku?'",
            "Poll format: 'Type 1 if you agree!'",
            "Respond with names: '[Name]-san, I think so too!'",
            "Use trending topics — check news before streaming",
            "End with: 'Tell me what you want next time!'",
          ]},
          { t:"Like & Share", items:[
            "Likes = lowest barrier action for viewers",
            "More likes = more chance to appear in recommendations",
            "Actively ask: 'Hit that like button!'",
            "Shares: give viewers a REASON to share",
            "Example: 'Bring your friends for this!'",
          ]},
          { t:"Moderators", items:[
            "Have 2-3 moderators who actively comment",
            "Their energy keeps others commenting",
            "Example: Tsumu has 3 mods — comments never stop",
            "Mods can also help manage trolls and spam",
          ]},
        ]},
      { step:"5. Retention / Return", icon:"🔄", color:"#D7C46F", sub:"Bring them back",
        sections:[
          { t:"Follower Strategy", items:[
            "Benefits: push notifications, share potential, gift increase",
            "Regularly ask for follows (but NEVER offer rewards for following)",
            "Mutual follow with key viewers: mods, gifters, core fans",
            "Connect SNS accounts in profile",
          ]},
          { t:"Notifications", items:[
            "Remind viewers to turn on LIVE notifications",
            "Both app AND phone push notifications may be off by default",
            "Use LIVE Events for advance scheduling",
            "Post short videos with countdown stickers",
          ]},
          { t:"Self-Introduction", items:[
            "Do it every 30 minutes — proven to increase revenue",
            "New viewers join constantly — they need to know who you are",
            "Template: Name + What you do + When you stream + Event info",
            "Advanced: unique intro using your talent (singing, humor)",
          ]},
          { t:"Collaboration", items:[
            "Collab streams = share each other's followers",
            "Cross-cultural collabs open new audiences",
            "Global awareness: greet in multiple languages",
            "Example: Setsuna (450K) greets in 4 languages → international growth",
          ]},
        ]},
      { step:"6. Monetization", icon:"💰", color:"#D76FA0", sub:"Turn fans into revenue",
        sections:[
          { t:"Gift Strategy", items:[
            "Priority communication: Gifters → New viewers → Others",
            "React to EVERY gift — show genuine excitement",
            "Longer watch time = deeper emotional connection = more gifts",
            "Core fans who watch long are most likely to gift",
          ]},
          { t:"Subscriptions", items:[
            "Key: attractive exclusive perks",
            "Ideas: priority replies, exclusive chat, limited LIVE, group invite",
            "Discord integration for automatic subscriber management",
            "Match perks to your content type",
          ]},
          { t:"Events", items:[
            "Events = KPI improvement opportunities",
            "Share your event goals with viewers — they want to help",
            "Choose events that match your level",
            "Post-event: thank participants, share results",
          ]},
          { t:"Content Repurposing", items:[
            "Clip best moments → TikTok, Reels, Shorts",
            "Short videos bring new viewers to your next LIVE",
            "Plan short video content deliberately — not random",
            "Set a character/concept and be consistent",
          ]},
        ]},
    ],
    jp: [
      { step:"1. 露出", icon:"📡", color:"#E8A87C", sub:"見つけてもらう",
        sections:[
          { t:"配信頻度", items:[
            "最低週3回 → 理想は週5回",
            "単純接触効果：繰り返し接触 = ファン化",
            "月1回では視聴者が常連になれない",
            "トップクリエイター：週5日以上、合計35時間以上",
          ]},
          { t:"配信時間", items:[
            "成長には最低2時間が必要",
            "配信が長いほど新しい視聴者が見つけるチャンスが増える",
            "トップクリエイターはダイヤモンド数だけでなく配信時間も長い",
            "45分ルール：ハイエネルギー45分 > ダラダラ2時間",
          ]},
          { t:"時間固定＆ルーティン", items:[
            "テレビ番組のようにスケジュールを固定する",
            "視聴者があなたの時間に合わせて習慣化する",
            "実例：桜川シュウ — 毎日同じ時間 → 2週間で常連がつく",
            "自分のエネルギーのピーク時間に配信する",
          ]},
          { t:"事前告知", items:[
            "24時間前と1時間前にティーザー投稿",
            "LIVE Events機能で事前スケジュール",
            "ショート動画にリマインダーステッカー",
            "Twitter/X、Instagram、YouTubeでクロス告知",
            "実例：SATOYU（300万フォロワー）は毎回Xで予告",
          ]},
        ]},
      { step:"2. 第一印象", icon:"👁️", color:"#5D8AE8", sub:"入室してもらう",
        sections:[
          { t:"プロフィール設定", items:[
            "アイコン：高画質、顔がわかる、シンプルな背景",
            "アカウント名：シンプル、検索しやすい、覚えやすい",
            "頻繁に変更しない — 一貫性 = 認知",
            "プロフィール文：自分 + 配信内容 + 配信時間",
          ]},
          { t:"タイトル＆カバー", items:[
            "タイトル + カバー = 視聴者が最初に見るもの → 入室率に大きく影響",
            "トレンドのトピックや明確な説明を含める",
            "適切なトピックカテゴリでアルゴリズムのマッチングを最適化",
          ]},
          { t:"背景＆身だしなみ", items:[
            "きれいでシンプルな背景（壁やカーテン）",
            "散らかった背景は避ける",
            "背景に情報を入れる（イベント情報、メッセージ）",
            "キャラに合った服装 — パジャマはNG！",
            "良い照明：リングライト推奨",
            "カメラは目線かやや上",
          ]},
          { t:"最初の3分が勝負", items:[
            "重要：アルゴリズムは配信の序盤で判断する",
            "ハイエネルギーで開始 — ゆっくり入らない",
            "売る前に雑談でウォームアップ",
            "早い段階で視聴者を名前で挨拶する",
          ]},
        ]},
      { step:"3. 滞在時間", icon:"⏱️", color:"#5DAE5D", sub:"見続けてもらう",
        sections:[
          { t:"名前を呼ぶ", items:[
            "認識されると人は長く留まる",
            "呼ばれていない人も「次は呼ばれるかも」と期待して残る",
            "ユーザー名 → 名前部分を見つける → 自然に挨拶",
            "例：「○○さん、こんにちは！アイコン可愛い！」",
          ]},
          { t:"コンテンツ構成", items:[
            "テレビ番組のように構成：イントロ → メイン → 交流 → クロージング",
            "1トピック5-10分 — 長居しない",
            "カメラアングル変更：顔 → 商品アップ → 裏側 → 内部",
            "形式を混ぜる：トーク → パフォーマンス → Q&A → トーク",
            "実例：ドールクリエイター — 1時間パフォーマンス + 30分お話 + 30-60分コメント返し",
          ]},
          { t:"エネルギー管理", items:[
            "視聴者数を隠す — 繋がりに集中",
            "エネルギー低下時はカメラ変更、ポール、次のアイテム予告",
            "強いクロージングで終わる — フェードアウトしない",
            "疲れは視聴者に見える — ムードが下がる",
            "予定の20%多くコンテンツを準備する",
          ]},
          { t:"宝箱戦略", items:[
            "コインを設定して視聴者に山分け → 「いつ来る？」の期待",
            "不定期なタイミング = 長時間滞在",
            "実例：えりさん(@eriawa) は宝箱で滞在時間を延長",
          ]},
        ]},
      { step:"4. エンゲージメント", icon:"💬", color:"#C4A7D7", sub:"参加してもらう",
        sections:[
          { t:"コメント戦略", items:[
            "目標：週300人コメント = 安定収益",
            "600人/週 = 標準目標",
            "1000人/週 = トップクリエイターレベル",
            "コメントが途切れないことが重要",
            "コメント増 = 露出増 = 視聴者増",
          ]},
          { t:"コメントを引き出す", items:[
            "オープン質問：「どう思う？」",
            "選択質問：「渋谷と原宿どっち？」",
            "投票形式：「賛成の人は1ってコメント！」",
            "名前で返す：「○○さん、私もそう思います！」",
            "トレンド話題を使う — 配信前にニュースチェック",
            "終わりに：「次回やってほしいこと教えて！」",
          ]},
          { t:"いいね＆シェア", items:[
            "いいね = 視聴者にとって最もハードル低い",
            "いいね増 = おすすめに載りやすい",
            "積極的に促す：「いいねで応援してね！」",
            "シェア：理由を提示する",
            "例：「友達も呼んで一緒に見よう！」",
          ]},
          { t:"モデレーター", items:[
            "2-3人のモデレーターが積極的にコメント",
            "彼らのエネルギーが他の視聴者のコメントを促す",
            "実例：つむさん — 3人のモデレーターでコメント途切れない",
            "荒らしやスパム管理もモデレーターに依頼",
          ]},
        ]},
      { step:"5. リテンション", icon:"🔄", color:"#D7C46F", sub:"また来てもらう",
        sections:[
          { t:"フォロワー戦略", items:[
            "メリット：通知、シェア、ギフト増加",
            "定期的にフォローを促す（ただし見返りを約束するのはNG）",
            "重要視聴者と相互フォロー：モデレーター、ギフター、コアファン",
            "SNSアカウントをプロフィールに連携",
          ]},
          { t:"通知設定", items:[
            "視聴者にLIVE通知をオンにするよう促す",
            "アプリとスマホのプッシュ通知の両方がデフォルトでオフの場合あり",
            "LIVE Events機能で事前スケジュール",
            "ショート動画にカウントダウンステッカー",
          ]},
          { t:"自己紹介", items:[
            "30分に1回実施 — 収益向上が実証済み",
            "新規視聴者は常に入ってくる — 自分を知ってもらう必要",
            "テンプレ：名前 + 活動内容 + 配信時間 + イベント情報",
            "上級：特技を活かしたユニークな自己紹介（弾き語り、ユーモア）",
          ]},
          { t:"コラボ", items:[
            "コラボ配信 = お互いのフォロワーを共有",
            "異文化コラボで新しい視聴者層を開拓",
            "多言語で挨拶するだけでも効果あり",
            "実例：せつなさん（45万） — 4言語で挨拶 → 海外フォロワー急増",
          ]},
        ]},
      { step:"6. マネタイズ", icon:"💰", color:"#D76FA0", sub:"収益化する",
        sections:[
          { t:"ギフト戦略", items:[
            "優先順位：ギフター → 新規 → その他",
            "全てのギフトにリアクション — 本物の喜びを見せる",
            "長い視聴時間 = 深い感情的つながり = より多くのギフト",
            "コアファンが最もギフトを送りやすい",
          ]},
          { t:"サブスクリプション", items:[
            "ポイント：魅力的な限定特典",
            "例：優先返信、限定チャット、限定LIVE、グループ招待",
            "Discord連携で自動管理",
            "配信ジャンルに合わせた特典設計",
          ]},
          { t:"イベント", items:[
            "イベント = KPI改善のチャンス",
            "目標を視聴者と共有 — 彼らは応援したい",
            "自分のレベルに合ったイベントを選ぶ",
            "終了後：参加者に感謝、結果を共有",
          ]},
          { t:"コンテンツ再利用", items:[
            "ベストモーメントをクリップ → TikTok、Reels、Shorts",
            "ショート動画が次のLIVEへの新規流入を作る",
            "計画的にショート動画を作る — ランダムではなく",
            "キャラクター設定を決めて一貫性を持つ",
          ]},
        ]},
    ],
  },
  // Platform comparison
  platforms: {
    en: [
      { name:"eBay Live", emoji:"🏷️", points:["$1 auction format","Authenticity Guarantee for luxury","Professional reseller buyers","Bidding UI — explain it to viewers","Fashion/collectibles focused"] },
      { name:"TikTok Shop", emoji:"🎵", points:["Younger audience, fast-paced","Need 1K followers to go live","Algorithm-driven discovery","Pin products on screen","High engagement = more distribution"] },
      { name:"YouTube Live", emoji:"📺", points:["Longer format OK","Good for detailed demos","Searchable after stream ends","Existing subscriber base helps","Good for educational content"] },
      { name:"Instagram Live", emoji:"📸", points:["Best for existing followers","Fashion/beauty strong","DM-based purchasing","Story promotion effective","Collab feature built-in"] },
    ],
    jp: [
      { name:"eBay Live", emoji:"🏷️", points:["$1オークション形式","高級品は認証保証","プロのリセラーが多い","入札UIの説明が必要","ファッション/コレクティブル中心"] },
      { name:"TikTok Shop", emoji:"🎵", points:["若い視聴者、テンポ速い","1Kフォロワーで配信可能","アルゴリズム主導の発見","商品をPinで固定表示","高エンゲージメント = より多くの配信露出"] },
      { name:"YouTube Live", emoji:"📺", points:["長時間フォーマットOK","詳細デモ向き","配信後も検索される","既存登録者が強み","教育コンテンツに最適"] },
      { name:"Instagram Live", emoji:"📸", points:["既存フォロワー向け","ファッション/ビューティーに強い","DM購入方式","ストーリー告知が効果的","コラボ機能あり"] },
    ],
  },
  // Content types
  contentTypes: {
    en: [
      { type:"Chat Stream", icon:"💬", desc:"Main content = responding to comments. Most communication-heavy.", best:"People who love talking", tip:"Differentiation is key — many creators do this" },
      { type:"Performance", icon:"🎭", desc:"Singing, dancing, magic, art. THE core of TikTok LIVE.", best:"Creators with a skill to show", tip:"Never just perform — mix in conversation" },
      { type:"While-Doing", icon:"🍳", desc:"Cooking, drawing, skincare while chatting.", best:"Relaxed personalities, busy people", tip:"Think of yourself as a small bar owner chatting with guests" },
      { type:"Outdoor", icon:"🌳", desc:"Streaming from outside — scenery, locations.", best:"Travel/lifestyle creators", tip:"Be mindful of other people's privacy" },
      { type:"Education", icon:"📚", desc:"Teaching, seminars, knowledge sharing.", best:"Subject matter experts", tip:"High prep cost but strong business potential" },
    ],
    jp: [
      { type:"おしゃべり配信", icon:"💬", desc:"コメント返しがメイン。最もコミュニケーション重視。", best:"おしゃべり好きな方", tip:"差別化が鍵 — 多くのクリエイターがやっている" },
      { type:"パフォーマンス配信", icon:"🎭", desc:"歌、ダンス、マジック、アート。TikTok LIVEの核。", best:"特技がある方", tip:"パフォーマンスだけはNG — 会話を混ぜる" },
      { type:"ながら配信", icon:"🍳", desc:"料理、お絵描き、スキンケアをしながらトーク。", best:"リラックスして話したい方", tip:"小さな居酒屋のオーナーのイメージで" },
      { type:"外配信", icon:"🌳", desc:"外から配信。風景や場所がメイン。", best:"旅行/ライフスタイル系", tip:"他人のプライバシーに配慮する" },
      { type:"教育・知識系", icon:"📚", desc:"教える、セミナー、知識共有。", best:"専門知識がある方", tip:"準備コスト高いがビジネスに繋がる" },
    ],
  },
};

/* ═══ SIMPLE BRAND DATA ═══ */
const BRANDS = [
  { brand:"Louis Vuitton", yr:1854, c:"🇫🇷", models:["Speedy","Neverfull","Alma","Keepall","Pochette","Papillon"],
    rare:"Multicolor (Murakami) discontinued. LV NEVER goes on sale. Vernis rare colors.",
    rareJp:"マルチカラー（村上隆コラボ）廃番。LVは絶対にセールしない。ヴェルニの希少色。",
    auth:"Date codes (pre-2021) → microchip (2021+). Canvas never peels on authentic.",
    authJp:"デートコード（2021年以前）→マイクロチップ。本物のキャンバスは剥がれない。" },
  { brand:"Chanel", yr:1910, c:"🇫🇷", models:["Classic Flap","Boy","2.55 Reissue","WOC","GST","Gabrielle"],
    rare:"Price increases 2-3x/year. Classic Flap: $2,800 (2010) → $10,000+ now.",
    rareJp:"年2-3回値上げ。Classic Flap: $2,800(2010)→$10,000+(現在)。",
    auth:"Serial sticker + auth card (pre-2021) → microchip. Quilting aligns at seams.",
    authJp:"シリアルステッカー+認証カード→マイクロチップ。キルティングは縫い目で合う。" },
  { brand:"Hermès", yr:1837, c:"🇫🇷", models:["Birkin","Kelly","Constance","Evelyne","Garden Party","Picotin"],
    rare:"Birkins NOT sold online. Need SA purchase history. Exotic leathers.",
    rareJp:"バーキンはオンライン不可。SA（販売員）との購入歴が必要。エキゾチックレザー。",
    auth:"Craftsman stamp, year letter. Hand-stitched saddle stitch (angled).",
    authJp:"職人スタンプ、年号レター。手縫いサドルステッチ（斜め）。" },
  { brand:"Gucci", yr:1921, c:"🇮🇹", models:["Marmont","Dionysus","Jackie","Bamboo","Ophidia","Horsebit"],
    rare:"Tom Ford era (1994-2004). Vintage bamboo. Alessandro Michele era ended.",
    rareJp:"トム・フォード時代。ヴィンテージバンブー。ミケーレ時代終了。",
    auth:"Serial tag (2 rows of numbers). Controllato card. Even stitching.",
    authJp:"シリアルタグ（2行の数字）。コントロラートカード。均一なステッチ。" },
  { brand:"Prada", yr:1913, c:"🇮🇹", models:["Re-Nylon","Galleria","Cleo","Cahier","Re-Edition","Triangle"],
    rare:"90s nylon pieces. Re-Nylon = recycled ocean plastic.",
    rareJp:"90年代ナイロン。Re-Nylon = 海洋プラスチック再生素材。",
    auth:"White auth card. 'PRADA' on hardware must be crisp.",
    authJp:"白い認証カード。金具の'PRADA'はクリアで鮮明。" },
  { brand:"Dior", yr:1946, c:"🇫🇷", models:["Lady Dior","Saddle","Book Tote","30 Montaigne","Bobby"],
    rare:"Lady Dior created for Princess Diana (1995). Galliano-era Saddles.",
    rareJp:"レディディオールはダイアナ妃のために1995年作成。ガリアーノ時代のサドル。",
    auth:"'Made in Italy' stamp. Date code. 'CD' charms heavy and precise.",
    authJp:"'Made in Italy'スタンプ。デートコード。'CD'チャームは重く精巧。" },
];

/* ═══ KEY ENGLISH VOCAB ═══ */
const VOCAB_CATS = [
  { cat:"Condition ★★", items:[{e:"Brand new / NWT",j:"新品・タグ付き"},{e:"Like new",j:"ほぼ新品"},{e:"Excellent / Very good",j:"非常に良い"},{e:"Good / Fair",j:"良い・使用感あり"},{e:"Scratches / Scuffs",j:"傷・スレ"},{e:"Corner wear",j:"角スレ"},{e:"Stains / Discoloration",j:"シミ・変色"},{e:"Peeling / Cracking",j:"剥がれ・ひび"},{e:"Piping / Glazing",j:"パイピング・コバ塗り"},{e:"Patina",j:"経年変化"},{e:"Odor",j:"匂い"}]},
  { cat:"Auction ★★", items:[{e:"5 seconds on the clock!",j:"残り5秒！"},{e:"Going once, going twice, SOLD!",j:"1回、2回、落札！"},{e:"Starting at $1!",j:"1ドルスタート！"},{e:"Steal of a lifetime!",j:"一生に一度のお買い得！"},{e:"No way, WAY too low!",j:"安すぎる！"},{e:"Can I get [amount]?",j:"[金額]ある？"},{e:"Bidding war!",j:"競り合い！"},{e:"Put in your max bid!",j:"最高額を入れて！"}]},
  { cat:"Buyer Q&A", items:[{e:"Is it authentic? → 100% authentic.",j:"本物？→はい"},{e:"Any flaws? → Minor scratches, very good overall.",j:"ダメージ？→軽い傷、全体的に良い"},{e:"Can you do $X? → That's the best I can do.",j:"値下げ？→これが精一杯"},{e:"What size? → PM, about 9 inches.",j:"サイズ？→PM、約9インチ"},{e:"Can I see closer? → Sure!",j:"もっと見せて？→もちろん"}]},
  { cat:"eBay UI", items:[{e:"Tap screen to hide chat",j:"タップでチャット非表示"},{e:"Item pinned at bottom",j:"下部にアイテム固定"},{e:"Set your max bid",j:"最高額を設定"},{e:"Swipe up for all items",j:"上スワイプで全品"}]},
  { cat:"Styling", items:[{e:"Perfect for a night out",j:"夜のお出かけに"},{e:"Great for everyday carry",j:"毎日使いに"},{e:"Dress it up or down",j:"フォーマルにもカジュアルにも"},{e:"Statement piece / Timeless",j:"主役アイテム・定番"},{e:"Goes with everything",j:"何にでも合う"}]},
];

/* ═══ APP ═══ */
export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState(0);
  const tabs = lang==="en" ? ["Fashion","Live Tips","English","Practice"] : ["ファッション","ライブ配信","英語","練習"];
  const icons = ["👜","🎥","🔤","🎯"];

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", fontFamily:"'Noto Sans JP','Helvetica Neue',sans-serif", color:"#F0EBE3", maxWidth:"100%", margin:"0 auto", padding:"0 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet"/>
      <style>{`@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::-webkit-scrollbar{display:none}`}</style>

      {/* Top Bar */}
      <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #222" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700 }}>
          {lang==="en"?"Live Selling Academy":"ライブセリング アカデミー"}
        </div>

        {/* Language Toggle Switch */}
        <div onClick={()=>setLang(lang==="en"?"jp":"en")} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", userSelect:"none" }}>
          <span style={{ fontSize:11, color:lang==="en"?"#E8A87C":"#666", fontWeight:lang==="en"?600:400 }}>EN</span>
          <div style={{ width:40, height:20, borderRadius:20, background:lang==="jp"?"#E8A87C":"#333", position:"relative", transition:"all 0.3s" }}>
            <div style={{ width:16, height:16, borderRadius:"50%", background:"#FFF", position:"absolute", top:2, left:lang==="jp"?22:2, transition:"all 0.3s" }}></div>
          </div>
          <span style={{ fontSize:11, color:lang==="jp"?"#E8A87C":"#666", fontWeight:lang==="jp"?600:400 }}>JP</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display:"flex", gap:8, padding:"12px 16px", background:"#0A0A0A", position:"sticky", top:0, zIndex:100, borderBottom:"1px solid #1E1E1E" }}>
        {tabs.map((tab,i) => (
          <button key={i} onClick={()=>setPage(i)} style={{ flex:1, padding:"10px", borderRadius:10, background:page===i?"#E8A87C22":"#141210", border:`1px solid ${page===i?"#E8A87C44":"#1E1E1E"}`, color:page===i?"#E8A87C":"#666", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:page===i?600:400, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <span style={{ fontSize:16 }}>{icons[i]}</span>
            <span>{tab}</span>
          </button>
        ))}
      </div>

      <div style={{ padding:"20px 16px" }} key={`${page}-${lang}`}>
        {page===0 && <FashionP lang={lang} />}
        {page===1 && <LiveP lang={lang} />}
        {page===2 && <EnglishP lang={lang} />}
        {page===3 && <PracticeP lang={lang} />}
      </div>
    </div>
  );
}

/* ═══ FASHION ═══ */
function FashionP({ lang }) {
  const [sel, setSel] = useState(null);
  if (sel!==null) {
    const b = BRANDS[sel];
    return (
      <div style={{ animation:"fu 0.3s ease" }}>
        <button onClick={()=>setSel(null)} style={bk}>{lang==="en"?"← Back":"← 戻る"}</button>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700 }}>{b.brand}</div>
        <div style={{ fontSize:12, color:"#888" }}>{b.c} Est. {b.yr}</div>
        <Sec t={lang==="en"?"Classics":"定番"} c="#D7C46F">
          <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
            {b.models.map((m,i)=><span key={i} style={{ fontSize:11, padding:"3px 8px", borderRadius:8, background:"#D7C46F15", color:"#D7C46F", border:"1px solid #D7C46F33" }}>{m}</span>)}
          </div>
        </Sec>
        <Sec t={lang==="en"?"Rare/Discontinued":"レア・廃番"} c="#E85D5D"><p style={p14}>{lang==="en"?b.rare:b.rareJp}</p></Sec>
        <Sec t={lang==="en"?"Authentication":"真贋"} c="#5DAE5D"><p style={p14}>{lang==="en"?b.auth:b.authJp}</p></Sec>
      </div>
    );
  }
  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <h2 style={h2}>{lang==="en"?"Fashion & Brand Knowledge":"ファッション＆ブランド知識"}</h2>
      {BRANDS.map((b,i)=>(
        <div key={i} onClick={()=>setSel(i)} style={row}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:600 }}>{b.brand}</div>
            <div style={{ fontSize:11, color:"#666" }}>{b.c} {b.yr} — {b.models.slice(0,3).join(", ")}</div>
          </div>
          <span style={{ color:"#333" }}>→</span>
        </div>
      ))}
    </div>
  );
}

/* ═══ LIVE TIPS (MAIN CONTENT) ═══ */
function LiveP({ lang }) {
  const [view, setView] = useState("framework"); // framework, platforms, content
  const [openStep, setOpenStep] = useState(0);
  const [openSec, setOpenSec] = useState(null);
  const data = LIVE_KB.framework[lang];

  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <h2 style={h2}>{lang==="en"?"Live Streaming Knowledge":"ライブ配信の知識"}</h2>
      <p style={{ fontSize:11, color:"#666", marginBottom:10 }}>
        {lang==="en"?"Based on TikTok Creator Hub + live commerce best practices":"TikTok Creator Hub + ライブコマースのベストプラクティス"}
      </p>

      {/* Sub-nav */}
      <div style={{ display:"flex", gap:5, marginBottom:14 }}>
        {[["framework",lang==="en"?"6-Step Framework":"6ステップ"],["platforms",lang==="en"?"Platforms":"プラットフォーム"],["content",lang==="en"?"Content Types":"配信ジャンル"]].map(([k,l])=>(
          <button key={k} onClick={()=>setView(k)} style={{ flex:1, padding:"6px", borderRadius:10, background:view===k?"#E8A87C18":"#141210", color:view===k?"#E8A87C":"#555", border:`1px solid ${view===k?"#E8A87C33":"#1E1E1E"}`, cursor:"pointer", fontFamily:"inherit", fontSize:11 }}>{l}</button>
        ))}
      </div>

      {/* FRAMEWORK */}
      {view==="framework" && data.map((step, si) => (
        <div key={si} style={{ marginBottom:8 }}>
          <div onClick={()=>setOpenStep(openStep===si?null:si)} style={{ display:"flex", alignItems:"center", gap:10, background:openStep===si?`${step.color}0A`:"#141210", border:`1px solid ${openStep===si?`${step.color}44`:"#1E1E1E"}`, borderRadius:12, padding:"12px 14px", cursor:"pointer" }}>
            <span style={{ fontSize:20 }}>{step.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:step.color }}>{step.step}</div>
              <div style={{ fontSize:11, color:"#666" }}>{step.sub}</div>
            </div>
            <span style={{ fontSize:11, color:"#444" }}>{openStep===si?"▾":"▸"}</span>
          </div>
          {openStep===si && (
            <div style={{ padding:"4px 0 0 16px", borderLeft:`2px solid ${step.color}33`, marginLeft:20, animation:"fu 0.3s ease" }}>
              {step.sections.map((sec, sci) => (
                <div key={sci} style={{ marginBottom:4 }}>
                  <div onClick={()=>setOpenSec(openSec===`${si}-${sci}`?null:`${si}-${sci}`)} style={{ padding:"8px 12px", background:"#0D0D0D", borderRadius:8, cursor:"pointer", display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:13, fontWeight:600, color:openSec===`${si}-${sci}`?step.color:"#D4C9BE" }}>{sec.t}</span>
                    <span style={{ fontSize:10, color:"#444" }}>{sec.items.length}</span>
                  </div>
                  {openSec===`${si}-${sci}` && (
                    <div style={{ padding:"6px 12px" }}>
                      {sec.items.map((item, ii) => (
                        <div key={ii} style={{ fontSize:12, color:"#999", lineHeight:1.7, paddingLeft:8, borderLeft:`2px solid ${step.color}22`, marginBottom:3 }}>{item}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* PLATFORMS */}
      {view==="platforms" && LIVE_KB.platforms[lang].map((p,i) => (
        <div key={i} style={{ background:"#141210", borderRadius:12, padding:"12px 14px", marginBottom:6, border:"1px solid #1E1E1E" }}>
          <div style={{ fontSize:15, fontWeight:700 }}>{p.emoji} {p.name}</div>
          <div style={{ marginTop:6 }}>
            {p.points.map((pt,j)=><div key={j} style={{ fontSize:12, color:"#999", lineHeight:1.7, paddingLeft:8, borderLeft:"2px solid #333", marginBottom:2 }}>{pt}</div>)}
          </div>
        </div>
      ))}

      {/* CONTENT TYPES */}
      {view==="content" && LIVE_KB.contentTypes[lang].map((ct,i) => (
        <div key={i} style={{ background:"#141210", borderRadius:12, padding:"12px 14px", marginBottom:6, border:"1px solid #1E1E1E" }}>
          <div style={{ fontSize:15, fontWeight:700 }}>{ct.icon} {ct.type}</div>
          <div style={{ fontSize:12, color:"#999", marginTop:4, lineHeight:1.6 }}>{ct.desc}</div>
          <div style={{ fontSize:11, color:"#5DAE5D", marginTop:4 }}>✓ {lang==="en"?"Best for":"向いてる人"}: {ct.best}</div>
          <div style={{ fontSize:11, color:"#E8A87C", marginTop:2 }}>💡 {ct.tip}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══ ENGLISH ═══ */
function EnglishP({ lang }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <h2 style={h2}>{lang==="en"?"English Vocabulary":"英語ボキャブラリー"}</h2>
      {VOCAB_CATS.map((cat,ci)=>(
        <div key={ci} style={{ marginBottom:6 }}>
          <div onClick={()=>setOpen(open===ci?null:ci)} style={{ ...row, borderColor:open===ci?"#5DAE5D44":"#1E1E1E" }}>
            <span style={{ fontSize:13, fontWeight:600, color:open===ci?"#5DAE5D":"#D4C9BE" }}>{cat.cat}</span>
            <span style={{ fontSize:11, color:"#555" }}>{cat.items.length} {open===ci?"▾":"▸"}</span>
          </div>
          {open===ci && cat.items.map((x,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 14px", background:"#0D0D0D", borderRadius:8, marginTop:3 }}>
              <span style={{ fontSize:13, color:"#D4C9BE", flex:1 }}>{x.e}</span>
              <span style={{ fontSize:12, color:"#888", textAlign:"right", maxWidth:"45%" }}>{x.j}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ═══ PRACTICE ═══ */
function PracticeP({ lang }) {
  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <h2 style={h2}>{lang==="en"?"Practice & Drills":"練習＆ドリル"}</h2>
      <p style={{ fontSize:12, color:"#888", marginTop:4, lineHeight:1.7 }}>
        {lang==="en"
          ? "Practice modules are available in the separate training apps. Use the Color Selling Guide for color phrases, and the main Stage Presence trainer for name drills, condition practice, and Q&A simulation."
          : "練習モジュールは別のトレーニングアプリで利用できます。色のフレーズはColor Selling Guide、名前読み・コンディション練習・Q&Aシミュレーションはメインの Stage Presenceトレーナーをご利用ください。"}
      </p>
      <div style={{ marginTop:14 }}>
        {[
          { icon:"🎙️", t:lang==="en"?"Name Reading":"名前読み", d:lang==="en"?"Read buyer IDs fast":"バイヤー名速読", c:"#E85D5D" },
          { icon:"🔍", t:lang==="en"?"Condition Description":"コンディション説明", d:lang==="en"?"Prevent INAD returns":"INAD防止", c:"#E8A87C" },
          { icon:"🎨", t:lang==="en"?"Color Phrases":"色の説明フレーズ", d:lang==="en"?"Compliment colors naturally":"自然に色を褒める", c:"#C4A7D7" },
          { icon:"💬", t:lang==="en"?"Buyer Q&A":"バイヤーQ&A", d:lang==="en"?"Answer common questions":"よくある質問に答える", c:"#5D8AE8" },
          { icon:"📐", t:lang==="en"?"Size Converter":"サイズ変換", d:lang==="en"?"inch↔cm, lb↔kg, 5'2\"=157cm":"インチ↔cm、ポンド↔kg", c:"#D7C46F" },
        ].map((m,i)=>(
          <div key={i} style={{ ...row, borderColor:`${m.c}33` }}>
            <span style={{ fontSize:20, marginRight:8 }}>{m.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:m.c }}>{m.t}</div>
              <div style={{ fontSize:11, color:"#666" }}>{m.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:14, padding:"10px 14px", background:"#141210", borderRadius:10, fontSize:12, color:"#777", lineHeight:1.7 }}>
        {lang==="en"
          ? "💡 These practice modules are in the other artifacts we built together. This app focuses on the knowledge base — brands, live streaming strategy, and vocabulary reference."
          : "💡 練習モジュールは一緒に作った別のアプリにあります。このアプリはナレッジベースに集中 — ブランド知識、ライブ配信戦略、ボキャブラリーリファレンス。"}
      </div>
    </div>
  );
}

/* ═══ SHARED ═══ */
function Sec({ t, c, children }) {
  return <div style={{ marginTop:12 }}><div style={{ fontSize:10, color:c, textTransform:"uppercase", letterSpacing:1, marginBottom:5, fontWeight:600 }}>{t}</div>{children}</div>;
}
const h2 = { fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, margin:0 };
const bk = { background:"none", border:"none", fontSize:13, color:"#666", cursor:"pointer", padding:0, fontFamily:"inherit", marginBottom:12 };
const row = { display:"flex", alignItems:"center", gap:10, background:"#141210", borderRadius:10, padding:"11px 14px", marginBottom:5, cursor:"pointer", border:"1px solid #1E1E1E" };
const p14 = { fontSize:13, color:"#D4C9BE", lineHeight:1.7, margin:0 };
