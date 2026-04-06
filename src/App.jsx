import { useState, useEffect } from "react";

/* ═══ LIVE STREAMING KNOWLEDGE (eBay Live Best Practices) ═══ */
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
      { step:"6. Sales Conversion", icon:"💰", color:"#D76FA0", sub:"Drive auction results",
        sections:[
          { t:"Bidder Engagement", items:[
            "Acknowledge every bid immediately by buyer name",
            "Create urgency: 'Only 10 seconds left!'",
            "Highlight value: 'This retails for $3,000, currently at $800'",
            "Encourage competition: 'Two bidders fighting for this!'",
          ]},
          { t:"Product Presentation", items:[
            "Show item from multiple angles during bidding",
            "Emphasize unique selling points and rarity",
            "Address condition honestly to prevent INAD",
            "Compare to retail or market prices",
          ]},
          { t:"Closing Techniques", items:[
            "Build excitement in final seconds",
            "Congratulate winner by name",
            "Tease next item to keep viewers engaged",
            "Thank all participants, not just winner",
          ]},
          { t:"Post-Stream Follow-up", items:[
            "Announce stream schedule for next time",
            "Encourage following for notifications",
            "Share highlights on social media",
            "Review performance: conversion rate, average sale price",
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
      { step:"6. 販売成約", icon:"💰", color:"#D76FA0", sub:"オークション成果を上げる",
        sections:[
          { t:"入札者エンゲージメント", items:[
            "すべての入札を即座に名前で認識",
            "緊迫感を作る：「残り10秒！」",
            "価値を強調：「定価$3,000、現在$800」",
            "競争を促す：「2人のバイヤーが競り合い中！」",
          ]},
          { t:"商品プレゼンテーション", items:[
            "入札中は複数角度から商品を見せる",
            "ユニークなセールスポイントと希少性を強調",
            "INAD防止のため状態を正直に説明",
            "定価や市場価格と比較",
          ]},
          { t:"クロージングテクニック", items:[
            "最後の数秒で盛り上げる",
            "落札者を名前で祝福",
            "次のアイテムを予告して視聴者を維持",
            "落札者だけでなく全参加者に感謝",
          ]},
          { t:"配信後フォローアップ", items:[
            "次回の配信スケジュールを告知",
            "通知のためのフォローを促す",
            "ソーシャルメディアでハイライトをシェア",
            "パフォーマンスレビュー：成約率、平均販売価格",
          ]},
        ]},
    ],
  },
  // eBay Live Policy & Compliance
  policy: {
    en: [
      { name:"🚫 Prohibited Content", emoji:"🚫", points:["No profanity, nudity, or offensive language","No alcohol/drug use or smoking on camera","No hate speech or threatening behavior","No off-platform sales (sharing email, phone, external sites)","No misleading claims about authenticity or rarity"] },
      { name:"📸 Camera Requirements", emoji:"📸", points:["Keep products in frame at all times","Show all angles and close-ups clearly","Display condition and features before moving item","Match what's in listing - no substitutions","Host must be visible and actively speaking"] },
      { name:"⚖️ Sales Compliance", emoji:"⚖️", points:["No shill bidding (related parties can't bid)","Accurately describe condition and authenticity","Follow manufacturer street dates","No simulcasting on other live-commerce platforms","Buyers' bids are binding - auto-charged at auction end"] },
      { name:"🎵 Content Rights", emoji:"🎵", points:["Only use music/sounds you own rights to","Get written consent for third-party content","No counterfeit products or IP infringement","Unauthorized content = stream/listing removal","eBay may contact emergency services for threats"] },
    ],
    jp: [
      { name:"🚫 禁止事項", emoji:"🚫", points:["卑猥、ヌード、攻撃的言語禁止","アルコール/薬物使用、喫煙禁止","ヘイトスピーチや脅迫行為禁止","プラットフォーム外販売禁止（メール、電話、外部サイト共有）","真贋や希少性の虚偽表示禁止"] },
      { name:"📸 カメラ要件", emoji:"📸", points:["商品を常にフレーム内に","全角度とクローズアップを明確に表示","アイテム移動前に状態と特徴を表示","リスティングと一致 - 代替品禁止","ホストは常に見え、積極的に話す"] },
      { name:"⚖️ 販売コンプライアンス", emoji:"⚖️", points:["サクラ入札禁止（関係者の入札不可）","状態と真贋を正確に説明","メーカーのストリートデートに従う","他のライブコマースプラットフォームでの同時配信禁止","バイヤーの入札は拘束力あり - オークション終了時に自動請求"] },
      { name:"🎵 コンテンツ権利", emoji:"🎵", points:["権利を所有する音楽/サウンドのみ使用","第三者コンテンツは書面同意が必要","偽造品やIP侵害禁止","無許可コンテンツ = 配信/リスティング削除","eBayは脅迫時に緊急サービスに連絡可能"] },
    ],
  },
  // eBay Live Stream Formats
  contentTypes: {
    en: [
      { type:"Auction Stream", icon:"🔨", desc:"Fast-paced $1 auction format. Show item, describe quickly, let bidding drive energy.", best:"High-volume sellers", tip:"Keep products in frame, explain bidding UI to new viewers" },
      { type:"Showcase Stream", icon:"👜", desc:"Premium items with detailed presentation. Luxury bags, authenticated collectibles.", best:"Luxury/designer sellers", tip:"Show serial numbers, authenticity cards, all angles clearly" },
      { type:"Unboxing Stream", icon:"📦", desc:"Open cases, boxes, mystery lots live. Build excitement around reveals.", best:"Collectibles, trading cards", tip:"Keep item in frame during entire opening process per policy" },
      { type:"Q&A Stream", icon:"💬", desc:"Answer buyer questions live. Build trust through transparency.", best:"Sellers building reputation", tip:"Address authenticity concerns confidently with proof" },
      { type:"Education Stream", icon:"📚", desc:"Teach authentication, condition grading, market trends.", best:"Subject matter experts", tip:"High value for building authority and repeat customers" },
    ],
    jp: [
      { type:"オークション配信", icon:"🔨", desc:"テンポの速い$1オークション形式。商品を見せ、素早く説明、入札がエネルギーを生む。", best:"大量出品セラー", tip:"商品をフレーム内に、新規視聴者に入札UIを説明" },
      { type:"ショーケース配信", icon:"👜", desc:"プレミアム商品の詳細プレゼン。高級バッグ、認証済みコレクティブル。", best:"高級/デザイナー品セラー", tip:"シリアル番号、認証カード、全角度を明確に表示" },
      { type:"開封配信", icon:"📦", desc:"ケース、ボックス、ミステリーロットをライブで開封。リビールで興奮を構築。", best:"コレクティブル、トレカ", tip:"ポリシー遵守のため開封中アイテムをフレーム内に" },
      { type:"Q&A配信", icon:"💬", desc:"バイヤーの質問にライブで回答。透明性で信頼を構築。", best:"評判構築中のセラー", tip:"証拠と共に真贋懸念に自信を持って対処" },
      { type:"教育配信", icon:"📚", desc:"真贋鑑定、コンディショングレード、市場トレンドを教える。", best:"専門知識を持つ方", tip:"権威構築とリピーター獲得に高い価値" },
    ],
  },
};

/* ═══ BRAND DATA (eBay Authenticity Guarantee Brands) ═══ */
const BRANDS = [
  { brand:"Louis Vuitton", yr:1854, c:"🇫🇷", models:["Speedy","Neverfull","Alma","Keepall","Pochette","Papillon","Noé","Onthego"],
    value:"Monogram canvas NEVER goes on sale. Vernis limited colors command premium. Collaborations (Takashi Murakami, Supreme, Yayoi Kusama) 2-3x retail.",
    valueJp:"モノグラムキャンバスは絶対にセールしない。ヴェルニ限定色はプレミアム。コラボ（村上隆、Supreme、草間彌生）は定価の2-3倍。",
    rare:"Multicolor discontinued 2015. Vernis Pomme d'Amour, Rose Indien rare. Limited edition trunks can reach $50K+.",
    rareJp:"マルチカラー2015年廃番。ヴェルニのポムダムール、ローズアンディアンは希少。限定トランクは$50K+も。",
    condition:"Canvas should NEVER crack or peel (if it does = fake). Vachetta leather darkens (patina) over time. Hardware should be heavy, branded.",
    conditionJp:"キャンバスは絶対にひび割れ・剥離しない（すれば偽物）。ヴァシェットレザーは経年で濃くなる（パティーナ）。金具は重く刻印あり。" },
  { brand:"Chanel", yr:1910, c:"🇫🇷", models:["Classic Flap","Boy","2.55 Reissue","WOC","19","Gabrielle","Coco Handle"],
    value:"Price increases 2-3x/year. Classic Flap Medium: $2,800(2010)→$10,200(2024). Caviar leather holds value better than lambskin.",
    valueJp:"年2-3回値上げ。クラシックフラップM: $2,800(2010)→$10,200(2024)。キャビアレザーはラムスキンより価値維持。",
    rare:"Vintage pieces from Karl Lagerfeld's first years. Seasonal limited editions (cruise, métiers d'art). Chanel 19 in iridescent calfskin.",
    rareJp:"カール・ラガーフェルド初期のヴィンテージ。シーズン限定（クルーズ、メティエダール）。シャネル19のイリデセントカーフスキン。",
    condition:"Quilting MUST align at seams. Chain weight = authenticity indicator. Lambskin scratches easily (mention in LIVE). Caviar = durable.",
    conditionJp:"キルティングは縫い目で合う必須。チェーンの重さ=真贋指標。ラムスキンは傷つきやすい（配信で言及）。キャビア=耐久性。" },
  { brand:"Hermès", yr:1837, c:"🇫🇷", models:["Birkin","Kelly","Constance","Evelyne","Garden Party","Picotin","Lindy"],
    value:"Birkin 25/30 most sought after. Exotic skins (crocodile, alligator, ostrich) start at $30K. Color affects value: neutral > bright. Condition is EVERYTHING.",
    valueJp:"バーキン25/30が最人気。エキゾチックスキン（クロコダイル、アリゲーター、オーストリッチ）は$30K~。色で価値変動：ニュートラル>明るい色。状態が全て。",
    rare:"Himalaya Birkin (white to grey gradient) = $100K-$500K. Kelly Cut, Roulis rare. Limited edition colors from each season.",
    rareJp:"ヒマラヤバーキン（白からグレーのグラデーション）= $100K-$500K。ケリーカット、ルリは希少。シーズン限定色。",
    condition:"Craftsman stamp + year letter inside. Saddle stitch (angled, hand-sewn). Hardware should never tarnish. Scratches lower value significantly on exotics.",
    conditionJp:"職人スタンプ+年号レター内側。サドルステッチ（斜め、手縫い）。金具は変色しない。エキゾチックレザーは傷で大幅価値減。" },
  { brand:"Gucci", yr:1921, c:"🇮🇹", models:["Marmont","Dionysus","Jackie 1961","Bamboo 1947","Ophidia","Horsebit 1955","Soho"],
    value:"Tom Ford era (1994-2004) vintage pieces command premium. Bamboo handles original 1940s design. Alessandro Michele era (2015-2022) maximalist styles.",
    valueJp:"トム・フォード時代(1994-2004)ヴィンテージはプレミアム。バンブーハンドルは1940年代オリジナルデザイン。ミケーレ時代(2015-2022)マキシマリストスタイル。",
    rare:"Vintage bamboo top-handle bags. GG Supreme canvas with rare embroidery. Limited edition Dionysus with hand-painted details.",
    rareJp:"ヴィンテージバンブートップハンドルバッグ。GGスプリームキャンバスの希少刺繍。手描きディテールの限定ディオニュソス。",
    condition:"Serial number inside (2 rows, 10-13 digits). 'Controllato' card. Hardware should be heavy. Canvas edges should be clean, not fraying.",
    conditionJp:"内側シリアル番号（2行、10-13桁）。コントロラートカード。金具は重い。キャンバスの縁はきれい、ほつれなし。" },
  { brand:"Prada", yr:1913, c:"🇮🇹", models:["Galleria","Re-Edition 2005","Cleo","Cahier","Re-Nylon","Sidonie","Hobo"],
    value:"90s nylon pieces highly collectible. Re-Edition 2005: Y2K revival drove prices up. Saffiano leather = signature, holds value well.",
    valueJp:"90年代ナイロンは高コレクタブル。Re-Edition 2005: Y2K復興で価格上昇。サフィアーノレザー=シグネチャー、価値維持良好。",
    rare:"Vintage nylon mini backpacks. Re-Nylon line (recycled ocean plastic = eco appeal). Limited runway pieces with unique hardware.",
    rareJp:"ヴィンテージナイロンミニバックパック。Re-Nylonライン（海洋プラスチック再生=エコ訴求）。ユニーク金具の限定ランウェイピース。",
    condition:"Authenticity card (white with Prada logo). Triangle logo must be crisp, centered. Saffiano leather = crosshatch pattern should be consistent.",
    conditionJp:"認証カード（白、Pradaロゴ）。三角ロゴはクリア、中央配置。サフィアーノレザー=クロスハッチパターンは均一。" },
  { brand:"Dior", yr:1946, c:"🇫🇷", models:["Lady Dior","Saddle","Book Tote","30 Montaigne","Bobby","Diorama","Diorissimo"],
    value:"Lady Dior: Princess Diana effect = iconic status. Book Tote trendy for personalization. 30 Montaigne = minimalist, investment piece.",
    valueJp:"レディディオール：ダイアナ妃効果=アイコニックステータス。ブックトートはパーソナライズでトレンド。30モンテーニュ=ミニマリスト、投資品。",
    rare:"Lady Dior from 1995 launch. John Galliano-era Saddle bags (late 90s-early 2000s). Limited edition cannage patterns.",
    rareJp:"1995年発売のレディディオール。ジョン・ガリアーノ時代のサドルバッグ（90年代後半~2000年代初頭）。限定カナージュパターン。",
    condition:"'Made in Italy' stamp. Date code format varies by year. 'DIOR' charms should be heavy, perfectly aligned. Cannage stitching must be precise.",
    conditionJp:"'Made in Italy'スタンプ。デートコードは年で形式異なる。'DIOR'チャームは重く、完璧整列。カナージュステッチは精密。" },
  { brand:"Fendi", yr:1925, c:"🇮🇹", models:["Baguette","Peekaboo","By The Way","Kan I","Mon Tresor","First"],
    value:"Baguette = Carrie Bradshaw effect (Sex and the City). Peekaboo versatile, professional. Limited embroidered/beaded Baguettes = collector items.",
    valueJp:"バゲット=キャリー・ブラッドショー効果（セックス・アンド・ザ・シティ）。ピーカブーは多用途、プロフェッショナル。限定刺繍/ビーズバゲット=コレクターアイテム。",
    rare:"Vintage Baguette from 1997 launch. Karl Lagerfeld-era pieces. FF logo Zucca canvas (discontinued then revived).",
    rareJp:"1997年発売のヴィンテージバゲット。カール・ラガーフェルド時代。FFロゴズッカキャンバス（廃番後復活）。",
    condition:"Hologram tag inside. Serial number format: year + sequential. Hardware 'FENDI' engraving should be deep, clear. Leather should smell natural.",
    conditionJp:"内側ホログラムタグ。シリアル番号形式：年+連番。金具'FENDI'刻印は深く鮮明。レザーは自然な匂い。" },
  { brand:"Bottega Veneta", yr:1966, c:"🇮🇹", models:["Cassette","Jodie","Arco","Pouch","Knot","Intrecciato Tote"],
    value:"'Intrecciato' weave = signature (takes 8+ hours to make one bag). Daniel Lee era (2018-2021) revived brand, prices surged.",
    valueJp:"'イントレチャート'織り=シグネチャー（1バッグ制作に8時間以上）。ダニエル・リー時代(2018-2021)でブランド復興、価格急上昇。",
    rare:"Vintage woven clutches. Neon colors from Daniel Lee era. The Pouch in rare leathers (crocodile, python).",
    rareJp:"ヴィンテージ織りクラッチ。ダニエル・リー時代のネオンカラー。希少レザーのポーチ（クロコダイル、パイソン）。",
    condition:"No visible logo (stealth wealth). Quality of intrecciato weave = authenticity key. Leather should be butter-soft. Interior 'Bottega Veneta' stamp.",
    conditionJp:"ロゴなし（ステルス・ウェルス）。イントレチャート織りの品質=真贋の鍵。レザーはバター状に柔らかい。内側'Bottega Veneta'スタンプ。" }
];

/* ═══ PROFESSIONAL VOCABULARY ═══ */
const VOCAB_CATS = [
  { cat:"Condition Grading", items:[
    {e:"Brand new / NWT",j:"新品・タグ付き",def:"Unworn item with original tags still attached",defJp:"未使用でオリジナルタグが付いた状態"},
    {e:"Like new",j:"ほぼ新品",def:"Minimal to no signs of wear, appears unused",defJp:"使用感がほとんどなく、未使用に見える状態"},
    {e:"Excellent",j:"極美品",def:"Very light use, no significant flaws visible",defJp:"使用感が非常に軽く、目立つダメージなし"},
    {e:"Very good",j:"美品",def:"Light wear, minor imperfections may exist",defJp:"軽い使用感、軽微なダメージがある可能性"},
    {e:"Good",j:"良品",def:"Moderate wear, still fully functional and attractive",defJp:"中程度の使用感、機能的で魅力的"},
    {e:"Fair",j:"使用感あり",def:"Obvious wear and use, but no major damage",defJp:"明らかな使用感があるが、大きなダメージなし"}
  ]},
  { cat:"Handbag Structure & Wear", items:[
    {e:"Corner wear",j:"角スレ",def:"Damage to bag corners from setting down or use",defJp:"置いたり使用したりすることによる角の損傷"},
    {e:"Piping",j:"パイピング",def:"Leather trim along bag edges",defJp:"バッグの縁に沿ったレザートリム"},
    {e:"Patina",j:"経年変化",def:"Natural darkening of leather over time, adds character",defJp:"時間経過による革の自然な色の変化、味が出る"},
    {e:"Hardware tarnish",j:"金具の変色",def:"Metal parts showing oxidation or discoloration",defJp:"金属部分の酸化や変色"},
    {e:"Interior staining",j:"内側の汚れ",def:"Marks or discoloration inside the bag",defJp:"バッグ内側の跡や変色"},
    {e:"Scratches / Scuffs",j:"傷・スレ",def:"Surface marks from normal use or contact",defJp:"通常使用や接触による表面の跡"},
    {e:"Stitching",j:"ステッチ",def:"Thread work holding bag together",defJp:"バッグを保持する糸の仕事"},
    {e:"Lining",j:"内装",def:"Interior fabric or leather",defJp:"内側の生地またはレザー"}
  ]},
  { cat:"Auction Language", items:[
    {e:"Starting at $1!",j:"1ドルスタート！",def:"Opening bid is one dollar to create excitement",defJp:"盛り上げるため1ドルから入札開始"},
    {e:"5 seconds left!",j:"残り5秒！",def:"Urgency call when auction is about to close",defJp:"オークション終了間近の緊急コール"},
    {e:"Going once, going twice, SOLD!",j:"1回、2回、落札！",def:"Traditional auction closing phrase",defJp:"伝統的なオークション終了フレーズ"},
    {e:"Bidding war!",j:"競り合い！",def:"Multiple buyers competing, driving price up",defJp:"複数バイヤーが競い合い価格上昇中"},
    {e:"Put in your max bid!",j:"最高額を入れて！",def:"Encourage buyers to enter their highest amount",defJp:"バイヤーに最高額の入力を促す"},
    {e:"This won't last!",j:"すぐ終わります！",def:"Create urgency by implying item will sell quickly",defJp:"すぐ売れることを示唆し緊迫感を作る"},
    {e:"No reserve!",j:"最低落札価格なし！",def:"Item will sell regardless of final bid amount",defJp:"最終入札額に関わらず販売"},
    {e:"Steal of a lifetime!",j:"一生に一度のお買い得！",def:"Emphasize exceptional value",defJp:"格別な価値を強調"}
  ]},
  { cat:"Luxury Fashion Terms", items:[
    {e:"Investment piece",j:"投資アイテム",def:"High-quality item that retains or increases in value",defJp:"価値を保持または上昇する高品質アイテム"},
    {e:"Limited edition",j:"限定版",def:"Produced in small quantities, not widely available",defJp:"少量生産で広く入手不可"},
    {e:"Runway piece",j:"ランウェイピース",def:"Item featured in designer's fashion show",defJp:"デザイナーのファッションショーで紹介されたアイテム"},
    {e:"Archive collection",j:"アーカイブコレクション",def:"Historical pieces from past seasons, highly collectible",defJp:"過去シーズンの歴史的ピース、高コレクタブル"},
    {e:"Grail",j:"聖杯",def:"Extremely rare, highly sought-after item",defJp:"極めて希少で非常に求められているアイテム"},
    {e:"Deadstock",j:"デッドストック",def:"Never-sold vintage inventory, still new condition",defJp:"未販売のヴィンテージ在庫、新品状態"},
    {e:"Made to order",j:"受注生産",def:"Custom-made upon request, not mass-produced",defJp:"リクエストに応じてカスタムメイド、大量生産なし"},
    {e:"Signature piece",j:"シグネチャーピース",def:"Iconic design that defines the brand",defJp:"ブランドを定義する象徴的デザイン"}
  ]},
  { cat:"Showroom Language", items:[
    {e:"Craftsmanship",j:"職人技",def:"Skill and quality in making luxury goods",defJp:"高級品製造における技術と品質"},
    {e:"Heritage",j:"伝統",def:"Brand's history and legacy",defJp:"ブランドの歴史と遺産"},
    {e:"Provenance",j:"来歴",def:"Item's ownership history and authenticity documentation",defJp:"アイテムの所有履歴と真贋証明"},
    {e:"Exquisite details",j:"精巧なディテール",def:"Fine, carefully crafted elements",defJp:"繊細で丁寧に作られた要素"},
    {e:"Timeless design",j:"タイムレスデザイン",def:"Classic style that never goes out of fashion",defJp:"流行に左右されないクラシックスタイル"},
    {e:"Coveted",j:"垂涎の",def:"Highly desired and sought after",defJp:"非常に望まれ求められている"},
    {e:"Impeccable condition",j:"完璧な状態",def:"Flawless, perfect state",defJp:"欠陥のない完璧な状態"},
    {e:"Curated selection",j:"厳選セレクション",def:"Carefully chosen collection",defJp:"慎重に選ばれたコレクション"}
  ]},
  { cat:"Buyer Communication", items:[
    {e:"Is it authentic?",j:"本物ですか？",def:"Question about item's genuineness",defJp:"アイテムの真正性についての質問"},
    {e:"100% authentic, guaranteed",j:"100%本物、保証付き",def:"Assurance of authenticity with backing",defJp:"裏付けのある真贋保証"},
    {e:"Any flaws?",j:"ダメージは？",def:"Inquiry about condition issues",defJp:"状態問題についての問い合わせ"},
    {e:"What's included?",j:"付属品は？",def:"Question about accessories and extras",defJp:"アクセサリーと追加品についての質問"},
    {e:"Can you show closer?",j:"もっと近くで見せて",def:"Request for detailed view",defJp:"詳細表示のリクエスト"},
    {e:"Comes with box, dust bag, card",j:"箱・保存袋・カード付き",def:"Complete set of original accessories",defJp:"オリジナル付属品の完全セット"},
    {e:"Final sale, no returns",j:"最終販売、返品不可",def:"Transaction is binding, cannot be reversed",defJp:"取引は拘束力あり、取り消し不可"},
    {e:"Ships next business day",j:"翌営業日発送",def:"Item will be sent the following workday",defJp:"翌営業日にアイテム発送"}
  ]},
  { cat:"Luxury Fashion Color Names", items:[
    {e:"Black",j:"ブラック",def:"Basic black, Noir (French)",defJp:"ベーシックブラック、ノワール（フランス語）"},
    {e:"Rouge / Red",j:"ルージュ/レッド",def:"Classic red - Rouge Hermès, Chanel Red",defJp:"クラシックレッド - ルージュ・エルメス、シャネルレッド"},
    {e:"Etoupe",j:"エトゥープ",def:"Hermès signature taupe-grey, versatile neutral",defJp:"エルメスのシグネチャー トープグレー、万能ニュートラル"},
    {e:"Gold",j:"ゴールド",def:"Tan/camel leather, not metallic - warm brown tone",defJp:"タン/キャメルレザー、メタリックではなく温かいブラウントーン"},
    {e:"Bleu / Blue",j:"ブルー",def:"Blue family - Navy, Royal Blue, Bleu de France",defJp:"ブルーファミリー - ネイビー、ロイヤルブルー、ブルー・ド・フランス"},
    {e:"Rose",j:"ローズ",def:"Pink tones - Rose Sakura, Rose Confetti, Rose Dragée",defJp:"ピンクトーン - ローズサクラ、ローズコンフェッティ、ローズドラジェ"},
    {e:"Vert / Green",j:"ヴェール/グリーン",def:"Green - Vert Olive, Vert Anglais, Bamboo Green",defJp:"グリーン - ヴェール・オリーブ、ヴェール・アングレ、バンブーグリーン"},
    {e:"Gris / Grey",j:"グリ/グレー",def:"Grey family - Gris Perle (pearl grey), Gris Tourterelle (dove grey)",defJp:"グレーファミリー - グリ・ペール（パールグレー）、グリ・トゥルトレル（鳩グレー）"},
    {e:"Blanc / White",j:"ブラン/ホワイト",def:"White/Cream - Craie (chalk), Blanc Naturel",defJp:"ホワイト/クリーム - クレ（チョーク）、ブラン・ナチュレル"},
    {e:"Vermillion",j:"ヴァーミリオン",def:"Bright red-orange, highly sought Hermès color",defJp:"明るい赤オレンジ、エルメスの人気カラー"},
    {e:"Fuchsia / Fuschia",j:"フューシャ",def:"Bright magenta-pink, bold statement color",defJp:"明るいマゼンタピンク、大胆なステートメントカラー"},
    {e:"Bordeaux / Burgundy",j:"ボルドー/バーガンディ",def:"Deep wine red, rich and elegant",defJp:"深いワインレッド、豊かでエレガント"}
  ]},
  { cat:"Fashion Compliment Phrases", items:[
    {e:"This shade is stunning on you",j:"この色はあなたにぴったり",def:"Compliment color choice",defJp:"カラー選択を褒める"},
    {e:"Such a rich, luxurious color",j:"豊かで贅沢な色",def:"Emphasize quality of color",defJp:"色の品質を強調"},
    {e:"This color never goes out of style",j:"この色は流行に左右されない",def:"Highlight timeless appeal",defJp:"時代を超えた魅力を強調"},
    {e:"Perfectly versatile shade",j:"完璧に万能な色",def:"Point out wearability",defJp:"着こなしやすさを指摘"},
    {e:"Rare, hard-to-find color",j:"レアで入手困難な色",def:"Create urgency with scarcity",defJp:"希少性で緊急性を作る"},
    {e:"This color photographs beautifully",j:"この色は写真映えする",def:"Appeal to visual buyers",defJp:"視覚的なバイヤーにアピール"},
    {e:"So flattering, works with everything",j:"とても似合う、何にでも合う",def:"Emphasize styling flexibility",defJp:"スタイリングの柔軟性を強調"},
    {e:"A collector's favorite shade",j:"コレクターに人気の色",def:"Position as desirable",defJp:"望ましいものとして位置付ける"}
  ]}
];

/* ═══ APP ═══ */
export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash ? parseInt(hash) : 0;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [playerData, setPlayerData] = useState(() => {
    const saved = localStorage.getItem('ebay-live-player');
    return saved ? JSON.parse(saved) : { xp: 0, level: 1, streak: 0, lastVisit: new Date().toDateString(), modulesCompleted: { brands: 0, live: 0, vocab: 0, practice: 0 } };
  });
  const tabs = lang==="en" ? ["Home","Brands","Framework","Policy","Content Types","Vocab","Practice"] : ["ホーム","ブランド","フレームワーク","ポリシー","コンテンツ","用語集","練習"];
  const icons = ["🏠","👜","📡","🌐","🎬","💬","🎯"];

  // Update streak on visit
  // XP earning handler
  const handleXpEarned = (amount) => {
    const newXp = playerData.xp + amount;
    const newLevel = Math.floor(newXp / 100) + 1;
    const updated = { ...playerData, xp: newXp, level: newLevel };
    setPlayerData(updated);
    localStorage.setItem('ebay-live-player', JSON.stringify(updated));
  };

  // Update streak on visit
  useEffect(() => {
    const today = new Date().toDateString();
    if (playerData.lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = playerData.lastVisit === yesterday ? playerData.streak + 1 : 1;
      const updated = { ...playerData, streak: newStreak, lastVisit: today };
      setPlayerData(updated);
      localStorage.setItem('ebay-live-player', JSON.stringify(updated));
    }
  }, []);

  useEffect(() => {
    window.location.hash = page;
  }, [page]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) setPage(parseInt(hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#F7F7F7", fontFamily:"'Inter','Noto Sans JP',sans-serif", color:"#191919", display:"flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:8px}
        ::-webkit-scrollbar-track{background:#f1f1f1}
        ::-webkit-scrollbar-thumb{background:#888;border-radius:4px}
        ::-webkit-scrollbar-thumb:hover{background:#555}

        /* eBay Responsive Grid System */
        .ebay-content {
          /* Small screens: 16px margins */
          padding: 40px 16px;
        }

        @media (min-width: 512px) {
          /* Medium screens: 32px margins */
          .ebay-content {
            padding: 40px 32px;
          }
        }

        @media (min-width: 1280px) {
          /* Large screens: 48px margins */
          .ebay-content {
            padding: 40px 48px;
          }
        }

        @media (min-width: 1680px) {
          /* X-large screens: centered with max width 1584px */
          .ebay-content {
            max-width: 1584px;
            margin: 0 auto;
            padding: 40px 0;
          }
        }
      `}</style>

      {/* Overlay when sidebar open */}
      {sidebarOpen && (
        <div onClick={()=>setSidebarOpen(false)} style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.3)", zIndex:40 }} />
      )}

      {/* Sidebar Navigation */}
      {sidebarOpen && (
        <div style={{ width:280, background:"#FFFFFF", boxShadow:"2px 0 8px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, height:"100vh", zIndex:50 }}>
          {/* Logo */}
          <div style={{ padding:"24px 20px", borderBottom:"1px solid #F7F7F7", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div onClick={()=>setPage(0)} style={{ cursor:"pointer" }}>
              <div style={{ fontSize:20, fontWeight:700, color:"#0968F6", marginBottom:2, fontFamily:"'Market Sans','Noto Sans JP',sans-serif" }}>
                {lang==="en"?"eBay Live":"eBay Live"}
              </div>
              <div style={{ fontSize:14, color:"#191919", fontWeight:400 }}>
                {lang==="en"?"Academy":"アカデミー"}
              </div>
            </div>
            <button onClick={()=>setSidebarOpen(false)} style={{ background:"#F7F7F7", border:"none", fontSize:16, cursor:"pointer", color:"#191919", padding:"8px 12px", borderRadius:6, fontWeight:600 }}>
              ◀ {lang==="en"?"Close":"閉じる"}
            </button>
          </div>

        {/* Nav Items */}
        <div style={{ flex:1, padding:"12px", overflowY:"auto" }}>
          {tabs.map((tab,i) => (
            <button key={i} onClick={()=>setPage(i)} style={{ width:"100%", minHeight:48, padding:"14px 16px", marginBottom:6, borderRadius:10, background:page===i?"#3665F3":"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:15, fontWeight:page===i?600:500, display:"flex", alignItems:"center", gap:12, color:page===i?"#FFFFFF":"#191919", transition:"all 0.2s", textAlign:"left" }}>
              <span style={{ fontSize:22 }}>{icons[i]}</span>
              <span>{tab}</span>
            </button>
          ))}
        </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex:1, background:"#F7F7F7", overflowY:"auto" }}>
        {/* Sticky Header */}
        <div style={{ position:"sticky", top:0, zIndex:30, background:"#FFFFFF", borderBottom:"1px solid #E5E7EB", boxShadow:"0 2px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ padding:"16px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              {!sidebarOpen && (
                <button onClick={()=>setSidebarOpen(true)} style={{ background:"#3665F3", color:"#FFFFFF", border:"none", padding:"10px 16px", borderRadius:8, cursor:"pointer", fontSize:15, fontWeight:600, display:"flex", alignItems:"center", gap:8, minHeight:44 }}>
                  ☰ <span>{lang==="en"?"Menu":"メニュー"}</span>
                </button>
              )}
              <div style={{ fontSize:18, fontWeight:700, color:"#3665F3" }}>
                {lang==="en"?"eBay Live Academy":"eBay Liveアカデミー"}
              </div>
            </div>
            <div onClick={()=>setLang(lang==="en"?"jp":"en")} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", userSelect:"none", padding:"8px 14px", background:"#F7F7F7", borderRadius:8, minHeight:44 }}>
              <span style={{ fontSize:14, color:lang==="en"?"#3665F3":"#191919", fontWeight:lang==="en"?700:500 }}>EN</span>
              <div style={{ width:42, height:22, borderRadius:20, background:lang==="jp"?"#3665F3":"#D1D5DB", position:"relative", transition:"all 0.2s" }}>
                <div style={{ width:16, height:16, borderRadius:"50%", background:"#FFF", position:"absolute", top:3, left:lang==="jp"?23:3, transition:"all 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}></div>
              </div>
              <span style={{ fontSize:14, color:lang==="jp"?"#3665F3":"#191919", fontWeight:lang==="jp"?700:500 }}>JP</span>
            </div>
          </div>
        </div>

        <div className="ebay-content" key={`${page}-${lang}`}>
          {page===0 && <HomeP lang={lang} setPage={setPage} playerData={playerData} />}
          {page===1 && <FashionP lang={lang} />}
          {page===2 && <LiveFrameworkP lang={lang} />}
          {page===3 && <LivePolicyP lang={lang} />}
          {page===4 && <LiveContentTypesP lang={lang} />}
          {page===5 && <EnglishP lang={lang} />}
          {page===6 && <PracticeP lang={lang} onXpEarned={handleXpEarned} />}
        </div>
      </div>
    </div>
  );
}

/* ═══ HOME ═══ */
function HomeP({ lang, setPage, playerData }) {
  const xpToNextLevel = 100;
  const xpProgress = (playerData.xp % xpToNextLevel) / xpToNextLevel * 100;
  const totalModules = 4;
  const completedCount = Object.values(playerData.modulesCompleted).filter(v => v >= 100).length;

  const dailyChallenges = [
    { en: "Practice 5 condition descriptions in under 30 seconds", jp: "30秒以内に5つのコンディション説明を練習" },
    { en: "Read 10 buyer names without hesitation", jp: "10人のバイヤー名を迷わず読む" },
    { en: "Master 5 new vocabulary terms", jp: "5つの新しい用語をマスター" },
    { en: "Complete a mock live simulation", jp: "模擬ライブシミュレーションを完了" }
  ];
  const todayChallenge = dailyChallenges[new Date().getDay() % dailyChallenges.length];

  const readyChecklist = [
    { en: "Describe 5 conditions fluently", jp: "5つのコンディションを流暢に説明", done: playerData.modulesCompleted.vocab >= 20 },
    { en: "Greet buyers within 3 seconds", jp: "3秒以内にバイヤーに挨拶", done: playerData.modulesCompleted.practice >= 10 },
    { en: "Answer 10 common questions", jp: "10の一般的な質問に回答", done: playerData.modulesCompleted.vocab >= 50 },
    { en: "Know 3+ luxury brands", jp: "3つ以上の高級ブランドを知る", done: playerData.modulesCompleted.brands >= 30 }
  ];

  return (
    <div style={{ animation:"fu 0.4s ease", maxWidth:900, margin:"0 auto" }}>
      {/* Player Stats Bar */}
      <div style={{ background:"linear-gradient(135deg, #3665F3 0%, #E53238 100%)", borderRadius:12, padding:"20px 24px", marginBottom:24, color:"#FFFFFF" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ fontSize:14, opacity:0.9, marginBottom:4 }}>{lang==="en"?"Level":"レベル"}</div>
            <div style={{ fontSize:28, fontWeight:700 }}>{playerData.level}</div>
          </div>
          <div style={{ flex:1, minWidth:200 }}>
            <div style={{ fontSize:14, opacity:0.9, marginBottom:6 }}>{playerData.xp % xpToNextLevel} / {xpToNextLevel} XP</div>
            <div style={{ background:"rgba(255,255,255,0.3)", borderRadius:20, height:12, overflow:"hidden" }}>
              <div style={{ background:"#F5AF02", height:"100%", width:`${xpProgress}%`, transition:"width 0.5s" }}></div>
            </div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:14, opacity:0.9, marginBottom:4 }}>{lang==="en"?"Streak":"連続"}</div>
            <div style={{ fontSize:24, fontWeight:700 }}>🔥 {playerData.streak}</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:14, opacity:0.9, marginBottom:4 }}>{lang==="en"?"Completed":"完了"}</div>
            <div style={{ fontSize:24, fontWeight:700 }}>{completedCount}/{totalModules}</div>
          </div>
        </div>
      </div>

      {/* Today's Challenge */}
      <div style={{ background:"#FFFFFF", border:"2px solid #3665F3", borderRadius:12, padding:"24px", marginBottom:24 }}>
        <div style={{ fontSize:14, color:"#3665F3", fontWeight:600, marginBottom:8, textTransform:"uppercase" }}>
          {lang==="en"?"🎯 Today's Challenge":"🎯 今日のチャレンジ"}
        </div>
        <div style={{ fontSize:18, fontWeight:600, color:"#191919", marginBottom:16 }}>
          {lang==="en"?todayChallenge.en:todayChallenge.jp}
        </div>
        <button onClick={()=>setPage(4)} style={{ background:"#3665F3", color:"#FFFFFF", border:"none", padding:"12px 28px", borderRadius:8, fontSize:16, fontWeight:600, cursor:"pointer", minHeight:48, fontFamily:"inherit" }}>
          {lang==="en"?"Start Challenge":"チャレンジ開始"}
        </button>
      </div>

      {/* Module Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:16, marginBottom:24 }}>
        {[
          { icon:"👜", name:lang==="en"?"Brand Knowledge":"ブランド知識", desc:lang==="en"?"Learn luxury brand value points":"高級ブランドの価値を学ぶ", page:1, progress:playerData.modulesCompleted.brands || 0 },
          { icon:"📺", name:lang==="en"?"Live Streaming":"ライブ配信", desc:lang==="en"?"Master engagement strategies":"エンゲージメント戦略をマスター", page:2, progress:playerData.modulesCompleted.live || 0 },
          { icon:"💬", name:lang==="en"?"Vocabulary":"用語集", desc:lang==="en"?"Professional terms & phrases":"専門用語とフレーズ", page:3, progress:playerData.modulesCompleted.vocab || 0 },
          { icon:"🎯", name:lang==="en"?"Practice":"練習", desc:lang==="en"?"Interactive drills":"インタラクティブドリル", page:4, progress:playerData.modulesCompleted.practice || 0 }
        ].map((mod,i)=>(
          <div key={i} onClick={()=>setPage(mod.page)} style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, padding:"20px", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => {e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="#3665F3"; e.currentTarget.style.boxShadow="0 8px 16px rgba(54,101,243,0.15)"}}
            onMouseLeave={e => {e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#E5E7EB"; e.currentTarget.style.boxShadow="none"}}>
            <div style={{ fontSize:40, marginBottom:12 }}>{mod.icon}</div>
            <div style={{ fontSize:18, fontWeight:600, color:"#191919", marginBottom:6 }}>{mod.name}</div>
            <div style={{ fontSize:14, color:"#6B7280", marginBottom:12 }}>{mod.desc}</div>
            <div style={{ background:"#F3F4F6", borderRadius:20, height:8, overflow:"hidden", marginBottom:6 }}>
              <div style={{ background:"#86B817", height:"100%", width:`${mod.progress}%`, transition:"width 0.5s" }}></div>
            </div>
            <div style={{ fontSize:13, color:"#6B7280", fontWeight:500 }}>{mod.progress}% {lang==="en"?"complete":"完了"}</div>
          </div>
        ))}
      </div>

      {/* Ready to Go Live Checklist */}
      <div style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, padding:"24px" }}>
        <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:16 }}>
          🚀 {lang==="en"?"Ready to Go Live?":"ライブ配信の準備はOK？"}
        </div>
        {readyChecklist.map((item,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:i<readyChecklist.length-1?"1px solid #F3F4F6":"none" }}>
            <div style={{ fontSize:24 }}>{item.done?"✅":"⬜"}</div>
            <div style={{ fontSize:16, color:item.done?"#86B817":"#6B7280", fontWeight:item.done?600:400 }}>
              {lang==="en"?item.en:item.jp}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:48 }}>
        <div style={{ background:"#FFFFFF", border:"2px solid #F7F7F7", borderRadius:12, padding:"32px 28px" }}>
          <div style={{ fontSize:40, marginBottom:16 }}>👥</div>
          <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:12 }}>
            {lang==="en"?"Who This Is For":"対象者"}
          </div>
          <div style={{ fontSize:15, color:"#191919", lineHeight:1.8, fontWeight:400 }}>
            {lang==="en"
              ?"eBay Live sellers targeting professional resellers who buy luxury fashion items in Japan to resell in the US market. Focus on B2B communication and product expertise."
              :"日本で高級ファッションアイテムを購入し米国市場で転売するプロのリセラーを対象としたeBay Liveセラー。B2Bコミュニケーションと商品知識に焦点。"}
          </div>
        </div>

        <div style={{ background:"#FFFFFF", border:"2px solid #F7F7F7", borderRadius:12, padding:"32px 28px" }}>
          <div style={{ fontSize:40, marginBottom:16 }}>📚</div>
          <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:12 }}>
            {lang==="en"?"What You'll Learn":"学べること"}
          </div>
          <div style={{ fontSize:15, color:"#191919", lineHeight:1.8, fontWeight:400 }}>
            {lang==="en"
              ?"Brand value points, rarity factors, condition assessment for eBay Authenticity Guarantee items. Live streaming engagement strategies, auction vocabulary, and showroom language."
              :"eBay認証保証アイテムのブランド価値、希少性要因、状態評価。ライブ配信エンゲージメント戦略、オークション用語、ショールーム言語。"}
          </div>
        </div>
      </div>

      <div style={{ background:"#3B1FC6", borderRadius:12, padding:"32px 36px", color:"#FFFFFF", marginBottom:32 }}>
        <div style={{ fontSize:20, fontWeight:700, marginBottom:12 }}>
          💡 {lang==="en"?"How to Navigate":"ナビゲーション方法"}
        </div>
        <div style={{ fontSize:16, lineHeight:1.8, fontWeight:400 }}>
          {lang==="en"
            ?"Use the sidebar on the left to explore different modules. Start with Luxury Brands to learn product knowledge, then move to Live Streaming for engagement techniques. The Vocabulary section provides essential terminology for professional communication."
            :"左のサイドバーで各モジュールを探索。まず高級ブランドで商品知識を学び、次にライブ配信でエンゲージメントテクニックへ。用語集セクションはプロフェッショナルなコミュニケーションに必須の用語を提供。"}
        </div>
      </div>

      <div style={{ background:"#F7F7F7", borderRadius:12, padding:"24px 28px", border:"1px solid #E0E0E0" }}>
        <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:8 }}>
          🚀 {lang==="en"?"Ready to Start?":"始める準備はできましたか？"}
        </div>
        <div style={{ fontSize:15, color:"#191919", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Select a module from the sidebar to begin your training journey."
            :"サイドバーからモジュールを選択してトレーニングを開始しましょう。"}
        </div>
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
        <button onClick={()=>setSel(null)} style={{background:"#f3f4f6",border:"none",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:600,color:"#4b5563",marginBottom:24}}>
          ← {lang==="en"?"Back":"戻る"}
        </button>
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:36, fontWeight:800, color:"#1a1a2e", marginBottom:4 }}>{b.brand}</div>
          <div style={{ fontSize:16, color:"#6b7280" }}>{b.c} Est. {b.yr}</div>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#667eea", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
            {lang==="en"?"ICONIC MODELS":"定番モデル"}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {b.models.map((m,i)=><span key={i} style={{ fontSize:14, padding:"8px 16px", borderRadius:10, background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color:"#fff", fontWeight:500 }}>{m}</span>)}
          </div>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#f093fb", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
            {lang==="en"?"VALUE & INVESTMENT":"価値と投資"}
          </div>
          <p style={{ fontSize:16, color:"#1a1a2e", lineHeight:1.8, background:"#fef3f2", padding:"16px 20px", borderRadius:12, borderLeft:"4px solid #f093fb" }}>
            {lang==="en"?b.value:b.valueJp}
          </p>
        </div>

        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#fa709a", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
            {lang==="en"?"RARITY & COLLECTIBILITY":"希少性とコレクタビリティ"}
          </div>
          <p style={{ fontSize:16, color:"#1a1a2e", lineHeight:1.8, background:"#fff7ed", padding:"16px 20px", borderRadius:12, borderLeft:"4px solid #fa709a" }}>
            {lang==="en"?b.rare:b.rareJp}
          </p>
        </div>

        <div>
          <div style={{ fontSize:14, fontWeight:700, color:"#43e97b", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
            {lang==="en"?"CONDITION ASSESSMENT":"状態評価"}
          </div>
          <p style={{ fontSize:16, color:"#1a1a2e", lineHeight:1.8, background:"#f0fdf4", padding:"16px 20px", borderRadius:12, borderLeft:"4px solid #43e97b" }}>
            {lang==="en"?b.condition:b.conditionJp}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:800, color:"#1a1a2e", marginBottom:8 }}>
          {lang==="en"?"Luxury Brand Knowledge":"高級ブランド知識"}
        </h1>
        <p style={{ fontSize:16, color:"#6b7280", lineHeight:1.6 }}>
          {lang==="en"
            ?"eBay Authenticity Guarantee brands. Learn value points, rarity factors, and condition assessment for B2B reseller buyers."
            :"eBay認証保証ブランド。B2Bリセラーバイヤー向けの価値ポイント、希少性要因、状態評価を学習。"}
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:20 }}>
        {BRANDS.map((b,i)=>(
          <div key={i} onClick={()=>setSel(i)} style={{ background:"#FFFFFF", border:"2px solid #F7F7F7", borderRadius:12, padding:"24px", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 2px 4px rgba(0,0,0,0.05)" }}
            onMouseEnter={e => {e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="#3B1FC6"; e.currentTarget.style.boxShadow="0 8px 16px rgba(59,31,198,0.15)"}}
            onMouseLeave={e => {e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#F7F7F7"; e.currentTarget.style.boxShadow="0 2px 4px rgba(0,0,0,0.05)"}}>
            <div style={{ fontSize:24, fontWeight:700, color:"#191919", marginBottom:6 }}>{b.brand}</div>
            <div style={{ fontSize:14, color:"#191919", marginBottom:16, fontWeight:400 }}>{b.c} Est. {b.yr}</div>
            <div style={{ fontSize:14, color:"#191919", marginBottom:12, fontWeight:400 }}>
              <strong style={{ fontWeight:700 }}>{lang==="en"?"Models":"モデル"}:</strong> {b.models.slice(0,3).join(", ")}...
            </div>
            <div style={{ fontSize:14, color:"#3B1FC6", fontWeight:700 }}>
              {lang==="en"?"View Details →":"詳細を見る →"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ LIVE TIPS (MAIN CONTENT) ═══ */
function LiveP({ lang, initialView = "framework" }) {
  const [view, setView] = useState(initialView); // framework, platforms, content
  const [openStep, setOpenStep] = useState(0);
  const [openSec, setOpenSec] = useState(null);
  const data = LIVE_KB.framework[lang];

  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang==="en"?"Live Selling Strategies":"ライブ販売戦略"}
        </h1>
        <p style={{ fontSize:16, color:"#191919", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Master eBay Live streaming techniques to engage buyers and drive sales. Build confidence with buyer interactions, product presentation, and compliance with eBay Live policies."
            :"eBayライブ配信テクニックをマスターしてバイヤーを惹きつけ売上を上げる。バイヤー対応、商品プレゼンテーション、eBay Liveポリシー遵守で自信を構築。"}
        </p>
      </div>

      {/* Sub-nav */}
      <div style={{ display:"flex", gap:12, marginBottom:24, borderBottom:"2px solid #F7F7F7", paddingBottom:4 }}>
        {[["framework",lang==="en"?"6-Step Framework":"6ステップ"],["platforms",lang==="en"?"eBay Live Policy":"eBay Liveポリシー"],["content",lang==="en"?"Stream Formats":"配信形式"]].map(([k,l])=>(
          <button key={k} onClick={()=>setView(k)} style={{ padding:"10px 20px", borderRadius:0, background:"none", color:view===k?"#3B1FC6":"#191919", borderBottom:view===k?"3px solid #3B1FC6":"3px solid transparent", cursor:"pointer", fontFamily:"inherit", fontSize:15, fontWeight:view===k?700:400, border:"none", transition:"all 0.2s" }}>{l}</button>
        ))}
      </div>

      {/* FRAMEWORK */}
      {view==="framework" && data.map((step, si) => (
        <div key={si} style={{ marginBottom:12 }}>
          <div onClick={()=>setOpenStep(openStep===si?null:si)} style={{ display:"flex", alignItems:"center", gap:12, background:"#FFFFFF", border:`2px solid ${openStep===si?step.color:"#F7F7F7"}`, borderRadius:12, padding:"16px 20px", cursor:"pointer", transition:"all 0.2s" }}>
            <span style={{ fontSize:32 }}>{step.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:17, fontWeight:700, color:"#191919" }}>{step.step}</div>
              <div style={{ fontSize:14, color:"#191919", fontWeight:400 }}>{step.sub}</div>
            </div>
            <span style={{ fontSize:18, color:"#191919" }}>{openStep===si?"▼":"▶"}</span>
          </div>
          {openStep===si && (
            <div style={{ padding:"12px 0 0 20px", borderLeft:`3px solid ${step.color}`, marginLeft:20, marginTop:12, animation:"fu 0.3s ease" }}>
              {step.sections.map((sec, sci) => (
                <div key={sci} style={{ marginBottom:8 }}>
                  <div onClick={()=>setOpenSec(openSec===`${si}-${sci}`?null:`${si}-${sci}`)} style={{ padding:"12px 16px", background:"#F7F7F7", borderRadius:8, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:15, fontWeight:700, color:"#191919" }}>{sec.t}</span>
                    <span style={{ fontSize:13, color:"#191919", background:step.color, padding:"4px 10px", borderRadius:6, fontWeight:700 }}>{sec.items.length}</span>
                  </div>
                  {openSec===`${si}-${sci}` && (
                    <div style={{ padding:"8px 16px" }}>
                      {sec.items.map((item, ii) => (
                        <div key={ii} style={{ fontSize:14, color:"#191919", lineHeight:1.8, paddingLeft:12, borderLeft:`3px solid ${step.color}44`, marginBottom:6, fontWeight:400 }}>{item}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* POLICY & COMPLIANCE */}
      {view==="platforms" && LIVE_KB.policy[lang].map((p,i) => (
        <div key={i} style={{ background:"#FFFFFF", borderRadius:12, padding:"20px 24px", marginBottom:12, border:"2px solid #F7F7F7" }}>
          <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:12 }}>{p.emoji} {p.name}</div>
          <div style={{ display:"grid", gap:8 }}>
            {p.points.map((pt,j)=><div key={j} style={{ fontSize:15, color:"#191919", lineHeight:1.7, paddingLeft:16, borderLeft:"3px solid #E53238", fontWeight:400 }}>{pt}</div>)}
          </div>
        </div>
      ))}

      {/* CONTENT TYPES */}
      {view==="content" && LIVE_KB.contentTypes[lang].map((ct,i) => (
        <div key={i} style={{ background:"#FFFFFF", borderRadius:12, padding:"20px 24px", marginBottom:12, border:"2px solid #F7F7F7" }}>
          <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:8 }}>{ct.icon} {ct.type}</div>
          <div style={{ fontSize:15, color:"#191919", marginTop:8, lineHeight:1.7, fontWeight:400 }}>{ct.desc}</div>
          <div style={{ fontSize:14, color:"#191919", marginTop:12, background:"#F7F7F7", padding:"8px 12px", borderRadius:6, fontWeight:400 }}>✓ {lang==="en"?"Best for":"向いてる人"}: <strong style={{ fontWeight:700 }}>{ct.best}</strong></div>
          <div style={{ fontSize:14, color:"#191919", marginTop:8, fontWeight:400 }}>💡 {ct.tip}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══ LIVE FRAMEWORK WRAPPER ═══ */
function LiveFrameworkP({ lang }) {
  return <LiveP lang={lang} initialView="framework" />;
}

/* ═══ LIVE POLICY WRAPPER ═══ */
function LivePolicyP({ lang }) {
  return <LiveP lang={lang} initialView="platforms" />;
}

/* ═══ LIVE CONTENT TYPES WRAPPER ═══ */
function LiveContentTypesP({ lang }) {
  return <LiveP lang={lang} initialView="content" />;
}

/* ═══ ENGLISH ═══ */
function EnglishP({ lang }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang==="en"?"Professional Vocabulary":"プロフェッショナル用語集"}
        </h1>
        <p style={{ fontSize:16, color:"#191919", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Master the language of luxury fashion live selling. Essential terms for describing conditions, running auctions, and communicating with B2B buyers."
            :"高級ファッションライブ販売の言語をマスター。状態説明、オークション運営、B2Bバイヤーとのコミュニケーションに必須の用語。"}
        </p>
      </div>

      <div style={{ display:"grid", gap:12 }}>
        {VOCAB_CATS.map((cat,ci)=>(
          <div key={ci} style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, overflow:"hidden", transition:"all 0.2s" }}>
            <div onClick={()=>setOpen(open===ci?null:ci)} style={{ padding:"18px 24px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", background:open===ci?"#EFF6FF":"#FFFFFF", transition:"all 0.2s", minHeight:60 }}>
              <span style={{ fontSize:18, fontWeight:600, color:"#191919" }}>{cat.cat}</span>
              <span style={{ fontSize:24, color:"#3665F3", fontWeight:300 }}>{open===ci?"−":"+"}</span>
            </div>
            {open===ci && (
              <div style={{ padding:"8px 0", animation:"fu 0.2s ease" }}>
                {cat.items.map((x,i)=>(
                  <div key={i} style={{ padding:"16px 24px", borderTop:"1px solid #F7F7F7", background:"#FFFFFF" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:8 }}>
                      <span style={{ fontSize:17, color:"#191919", fontWeight:600 }}>{x.e}</span>
                      <span style={{ fontSize:15, color:"#FFFFFF", fontWeight:500, background:"#86B817", padding:"6px 14px", borderRadius:8 }}>{x.j}</span>
                    </div>
                    <div style={{ fontSize:15, color:"#4B5563", lineHeight:1.7, fontWeight:400, paddingLeft:12, borderLeft:"3px solid #3665F3" }}>
                      {lang==="en"?x.def:x.defJp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ BUYER NAMES FOR NAME BLAST ═══ */
const BUYER_NAMES = [
  "vintage_hunter_23", "chanel_collector_NYC", "luxury_resale_pro", "bagaholic_LA",
  "designer_vault", "preloved_curator", "fashion_archive_jp", "hermes_hunter",
  "lvoe_since_99", "gucci_gang_buyer", "prada_princess", "dior_addict",
  "saint_laurent_sam", "balenciaga_bae", "fendi_fanatic", "bottega_lover",
  "cartier_collector", "rolex_reseller", "vintage_vuitton", "chanel_classic",
  "birkin_hunter", "kelly_collector", "speedy_squad", "neverfull_nation",
  "luxury_lifestyle", "boutique_buyer", "fashion_forward", "style_curator",
  "handbag_heaven", "designer_dreams", "luxury_legacy", "timeless_treasures",
  "authenticate_first", "condition_matters", "investment_pieces", "collector_grade",
];

/* ═══ CONDITION ASSESSMENT ITEMS ═══ */
const CONDITION_ITEMS = {
  en: [
    {
      item: "Louis Vuitton Speedy 30",
      image: "👜",
      issues: ["Corner wear on all four corners", "Light patina on handles", "Interior clean, no stains", "Hardware shows minor tarnish"],
      correctCondition: "Very Good",
      description: "Corner wear on all four corners, light patina on vachetta handles, interior clean with no stains, hardware shows minor tarnish. Fully functional with no structural issues.",
      feedback: {
        excellent: "Perfect description! You mentioned all key points: corner wear, patina, interior condition, and hardware. This prevents INAD returns.",
        good: "Good start! Make sure to mention ALL visible wear - corner wear, patina level, interior condition, and hardware state.",
        needsWork: "Remember to be specific! Describe: corners, handle patina, interior condition, and hardware. Vague descriptions lead to returns."
      }
    },
    {
      item: "Chanel Classic Flap",
      image: "👛",
      issues: ["Quilting intact, no sagging", "Chain shows light scratches", "Turnlock slightly loose", "Minor scuffing on back"],
      correctCondition: "Good",
      description: "Quilting intact with no sagging, chain shows light surface scratches, turnlock functions but slightly loose, minor scuffing visible on back panel. No interior stains.",
      feedback: {
        excellent: "Excellent! You covered structure, hardware functionality, and cosmetic issues. Buyers know exactly what they're getting.",
        good: "Nice work! Don't forget to mention if hardware is fully functional - loose turnlocks are important to note.",
        needsWork: "Be more thorough! Mention quilting condition, chain state, turnlock function, and any scuffing. Details matter in luxury resale."
      }
    },
    {
      item: "Hermès Birkin 35",
      image: "💼",
      issues: ["Pristine clemence leather", "Hardware unscratched", "Sangles (straps) never used", "Comes with clochette, lock, keys"],
      correctCondition: "Excellent",
      description: "Pristine clemence leather with no scratches or wear, hardware completely unscratched, sangles appear never used, includes clochette with lock and keys. Exceptional condition.",
      feedback: {
        excellent: "Flawless description! For high-value items like Birkin, noting accessories (clochette, lock, keys) and strap condition is crucial.",
        good: "Great detail! For Birkin specifically, always mention if sangles are unused and all accessories are included.",
        needsWork: "High-end items need detailed descriptions. Mention leather condition, hardware, strap usage, and all included accessories."
      }
    },
    {
      item: "Gucci Dionysus",
      image: "👝",
      issues: ["Tiger head closure functional", "Suede lining shows wear", "Chain strap has kinks", "GG Supreme canvas clean"],
      correctCondition: "Good",
      description: "Tiger head closure fully functional, suede lining shows moderate wear from use, chain strap has some kinks but usable, GG Supreme canvas clean with no stains or tears.",
      feedback: {
        excellent: "Perfect! You addressed functionality, lining condition, strap state, and exterior. Complete and honest.",
        good: "Good description! Always note if signature hardware (like the tiger head) works properly - it's a selling point.",
        needsWork: "Don't skip the details! Mention closure function, lining wear, strap condition, and canvas state. Each affects value."
      }
    },
    {
      item: "Prada Galleria",
      image: "💼",
      issues: ["Saffiano leather pristine", "Interior pen mark on pocket", "Corners sharp, no rounding", "All zippers smooth"],
      correctCondition: "Very Good",
      description: "Saffiano leather pristine with signature crosshatch intact, small pen mark visible inside zip pocket, corners remain sharp with no rounding, all zippers function smoothly.",
      feedback: {
        excellent: "Excellent honesty! You disclosed the pen mark while highlighting the pristine exterior. Builds trust with buyers.",
        good: "Nice work! Always disclose interior flaws even if exterior is perfect - it prevents disputes.",
        needsWork: "Never hide interior issues! Mention the pen mark, leather condition, corner shape, and zipper function. Honesty = fewer returns."
      }
    }
  ],
  jp: [
    {
      item: "ルイ・ヴィトン スピーディ30",
      image: "👜",
      issues: ["4つ角すべてにスレあり", "ハンドルに軽いパティーナ", "内側きれい、シミなし", "金具に軽い変色"],
      correctCondition: "Very Good",
      description: "4つ角すべてにスレあり、ヌメ革ハンドルに軽いパティーナ、内側はきれいでシミなし、金具に軽い変色あり。機能的に問題なし。",
      feedback: {
        excellent: "完璧な説明！角スレ、パティーナ、内側状態、金具について言及。INAD返品を防ぎます。",
        good: "いいスタート！すべての使用感を記載 - 角スレ、パティーナレベル、内側状態、金具の状態。",
        needsWork: "具体的に！角、ハンドルのパティーナ、内側状態、金具を説明。曖昧な説明は返品につながります。"
      }
    },
    {
      item: "シャネル クラシックフラップ",
      image: "👛",
      issues: ["キルティング形状保持", "チェーンに軽い傷", "ターンロック少し緩い", "背面に軽いスレ"],
      correctCondition: "Good",
      description: "キルティングは形状保持、チェーンに軽い表面傷、ターンロックは機能するが少し緩い、背面パネルに軽いスレあり。内側シミなし。",
      feedback: {
        excellent: "素晴らしい！構造、金具の機能性、外観の問題をカバー。バイヤーは正確に理解できます。",
        good: "良い説明！金具が完全に機能するか必ず記載 - ターンロックの緩みは重要。",
        needsWork: "もっと詳しく！キルティング状態、チェーン状態、ターンロック機能、スレを言及。高級品転売では詳細が重要。"
      }
    },
    {
      item: "エルメス バーキン35",
      image: "💼",
      issues: ["クレマンスレザー完璧", "金具に傷なし", "サングル（ストラップ）未使用", "クロシェット、鍵、錠前付き"],
      correctCondition: "Excellent",
      description: "クレマンスレザー完璧で傷や使用感なし、金具は完全に無傷、サングルは未使用状態、クロシェット・錠前・鍵付き。極上コンディション。",
      feedback: {
        excellent: "完璧な説明！バーキンのような高額品では付属品（クロシェット、錠前、鍵）とストラップ状態が重要。",
        good: "素晴らしいディテール！バーキンは必ずサングル未使用かと全付属品を記載。",
        needsWork: "高級品には詳細説明が必要。レザー状態、金具、ストラップ使用、全付属品を言及。"
      }
    },
    {
      item: "グッチ ディオニュソス",
      image: "👝",
      issues: ["タイガーヘッド開閉正常", "スエード内装に使用感", "チェーンストラップに折れ癖", "GGスプリームキャンバスきれい"],
      correctCondition: "Good",
      description: "タイガーヘッド開閉完全に機能、スエード内装に中程度の使用感、チェーンストラップに折れ癖あるが使用可能、GGスプリームキャンバスはきれいでシミや破れなし。",
      feedback: {
        excellent: "完璧！機能性、内装状態、ストラップ状態、外装に対処。完全で正直。",
        good: "良い説明！シグネチャー金具（タイガーヘッド）が正常動作するか必ず記載 - セールスポイント。",
        needsWork: "詳細を飛ばさない！開閉機能、内装の傷み、ストラップ状態、キャンバス状態を言及。それぞれが価値に影響。"
      }
    },
    {
      item: "プラダ ガレリア",
      image: "💼",
      issues: ["サフィアーノレザー完璧", "内側ポケットにペン跡", "角がシャープ、丸みなし", "全ジッパースムーズ"],
      correctCondition: "Very Good",
      description: "サフィアーノレザー完璧でクロスハッチ保持、内側ジップポケットに小さなペン跡あり、角はシャープで丸みなし、全ジッパースムーズに機能。",
      feedback: {
        excellent: "素晴らしい正直さ！外装の完璧さを強調しつつペン跡を開示。バイヤーとの信頼構築。",
        good: "良い仕事！外装が完璧でも内側の欠陥は必ず開示 - 紛争を防ぎます。",
        needsWork: "内側の問題を隠さない！ペン跡、レザー状態、角の形、ジッパー機能を言及。正直さ=返品減少。"
      }
    }
  ]
};

/* ═══ BUYER SCENARIOS ═══ */
const BUYER_SCENARIOS = {
  en: [
    {
      situation: "Buyer: 'The bag in your photo looks darker than the one on the official website. Is this authentic?'",
      options: [
        { text: "I'm so sorry! I'll give you 20% off!", feedback: "Too apologetic - sounds like you're admitting it might be fake. Stay confident!", type: "bad" },
        { text: "Yes, 100% authentic. Lighting affects color. I can show the serial number and card.", feedback: "Perfect! Acknowledged concern, explained reason, offered proof. Confident and pro!", type: "good" },
        { text: "Of course it's real. Why question that?", feedback: "Too defensive - makes buyers uncomfortable. Stay friendly even with tough questions.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'I see a small scratch on the corner. Can you knock $50 off the price?'",
      options: [
        { text: "Price is firm. Take it or leave it.", feedback: "Too aggressive - you might lose the sale. Find middle ground professionally.", type: "bad" },
        { text: "I mentioned corner wear in description and priced accordingly. How about free express shipping?", feedback: "Excellent! Stood firm but offered alternative. Values business while maintaining margin.", type: "good" },
        { text: "Sure, I'll drop it to $50 off!", feedback: "Too eager - buyers will keep negotiating. Show value first, then smaller concessions.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'My friend bought the same bag for $200 less last week. Why is yours so expensive?'",
      options: [
        { text: "Your friend probably got a fake.", feedback: "Never insult sellers or imply they sell fakes. Focus on YOUR value instead.", type: "bad" },
        { text: "Mine has box, dust bag, card, and receipt - complete set. Rare 2019 color, excellent condition.", feedback: "Perfect! Explained value difference without putting down competitors. Facts speak!", type: "good" },
        { text: "I'll match that price right now!", feedback: "Don't race to bottom. Your items have unique value - highlight what's special.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'How do I know this isn't a replica from China?'",
      options: [
        { text: "That's kind of rude to ask...", feedback: "Don't take it personally - B2B buyers must verify. Answer professionally.", type: "bad" },
        { text: "Great question! Serial matches this year's format, perfect leather and stitching, original card, plus money-back if authenticated.", feedback: "Excellent! Welcomed concern, provided proof points, showed confidence with guarantee. Builds trust.", type: "good" },
        { text: "Trust me, I've been selling for years.", feedback: "Vague and defensive. Buyers need concrete proof, not just your word. Show details!", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'The leather looks dry in your photo. Has this been sitting in storage for years?'",
      options: [
        { text: "It's vintage! Supposed to look like that.", feedback: "Half-truth - vintage items can be reconditioned. Acknowledge and offer solution.", type: "bad" },
        { text: "Good eye! Natural aging. Easily conditioned with leather cream. Collectors prefer this - fakes don't age naturally.", feedback: "Great! Validated observation, explained it's fixable, reframed aging as authentication proof.", type: "good" },
        { text: "That's just lighting. Perfect in person.", feedback: "Don't dismiss what they see. If dryness is visible, address honestly with solution.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'I'm interested but I need to think about it. Can you hold it for me for a week?'",
      options: [
        { text: "Sure! I'll hold it as long as needed.", feedback: "Too accommodating - might lose other buyers while they 'think'. Create gentle urgency.", type: "bad" },
        { text: "I can hold 24 hours, but getting lots of interest. Secure with a deposit?", feedback: "Perfect! Valued their interest, created urgency, offered commitment path (deposit).", type: "good" },
        { text: "No holds. Buy now or someone else will.", feedback: "Too harsh - you'll lose potential buyers. Be firm but friendly.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'Can you ship this internationally to Australia?'",
      options: [
        { text: "No, sorry. Domestic only.", feedback: "Missed opportunity! International shipping opens huge markets. Offer solutions.", type: "bad" },
        { text: "Yes! I use FedEx for reliable tracking. Takes 5-7 days. Happy to include insurance.", feedback: "Great! Showed capability, gave timeline, offered security. Expands your market!", type: "good" },
        { text: "I can try but can't guarantee anything.", feedback: "Too uncertain - buyers want confidence. Research shipping options and give clear answers.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'Do you accept returns if I don't like it?'",
      options: [
        { text: "All sales final. No returns.", feedback: "Too rigid - buyers want security. Offer reasonable return policy to build trust.", type: "bad" },
        { text: "Yes, 7-day return policy if unworn with tags. Buyer covers return shipping.", feedback: "Perfect! Clear policy that protects both parties. Builds buyer confidence!", type: "good" },
        { text: "Sure, you can return anytime for any reason!", feedback: "Too lenient - could be exploited. Set clear timeframes and conditions.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'The stitching looks uneven in photo 3. Is there a defect?'",
      options: [
        { text: "I don't see anything wrong with it.", feedback: "Dismissive! If they see it, address it. Examine closely and respond honestly.", type: "bad" },
        { text: "Let me check... That's actually the authentic hand-stitching pattern for this model. Machine fakes have perfectly even stitching.", feedback: "Excellent! Investigated, explained it's an authenticity feature. Turned concern into proof!", type: "good" },
        { text: "Oh yeah, small defect. Want 10% off?", feedback: "Don't rush to discount. Determine if it's truly a defect or a feature first.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'I saw someone wearing a fake of this exact bag. How can I be sure yours is real?'",
      options: [
        { text: "Because I'm a trusted seller.", feedback: "Not enough evidence. Provide concrete authentication points they can verify.", type: "bad" },
        { text: "I understand the concern! Check these: weight (fakes are lighter), zipper quality, date code format, and I'll include authentication receipt.", feedback: "Perfect! Gave specific verification points and backed with documentation. Very reassuring!", type: "good" },
        { text: "If you don't trust me, shop elsewhere.", feedback: "Hostile! Their concern is valid. Answer professionally and build confidence.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'Your price is $100 higher than another seller. Can you match theirs?'",
      options: [
        { text: "Fine, I'll match it.", feedback: "Gave up too easily! Explain your value difference before considering price changes.", type: "bad" },
        { text: "Mine includes the full original packaging, card, and receipt. Also recently authenticated. What's included with theirs?", feedback: "Smart! Highlighted extras and asked about competitor. Shows value difference professionally.", type: "good" },
        { text: "That seller is probably scamming you.", feedback: "Never attack competitors! Focus on your own value proposition instead.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'Can I see more close-up photos of the hardware?'",
      options: [
        { text: "The photos I posted are enough.", feedback: "Unhelpful! More photos = more confidence = more sales. Always accommodate.", type: "bad" },
        { text: "Absolutely! I'll take close-ups of all hardware and DM them to you in 10 minutes.", feedback: "Excellent! Quick, helpful, specific timeline. Shows you're serious and accommodating!", type: "good" },
        { text: "I can later, maybe tomorrow.", feedback: "Too vague. Buyers shop fast - competitors will respond quicker. Act now!", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'I'm a reseller. Do you offer bulk discounts if I buy 5 bags?'",
      options: [
        { text: "No discounts, same price for everyone.", feedback: "Missed B2B opportunity! Bulk buyers are valuable. Consider volume pricing.", type: "bad" },
        { text: "Yes! For 5+ items I can offer 15% off and free shipping. Let's discuss which pieces interest you.", feedback: "Perfect! Welcomed bulk business, gave clear discount, invited conversation. Great B2B approach!", type: "good" },
        { text: "Maybe, what's your budget?", feedback: "Too vague. State clear bulk terms to sound professional and prepared.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'I found the same bag on another site for half your price. Why should I buy from you?'",
      options: [
        { text: "That site is definitely selling fakes.", feedback: "Don't attack without proof! Focus on why YOUR item is authentic and valuable.", type: "bad" },
        { text: "If it's half price, verify authenticity carefully. Mine has serial, card, receipt, original packaging. I stake my reputation on it.", feedback: "Great! Warned them professionally, listed your authentication proof, showed confidence.", type: "good" },
        { text: "Okay, I'll cut my price in half too!", feedback: "Never! If genuine bags go for X, don't undercut yourself. Trust your value.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'What payment methods do you accept?'",
      options: [
        { text: "Cash only when we meet up.", feedback: "Limited and unsafe! Use secure platforms with buyer/seller protection.", type: "bad" },
        { text: "I accept PayPal, credit cards, and bank transfer through Stripe for security.", feedback: "Perfect! Multiple secure options with protection for both parties. Very professional!", type: "good" },
        { text: "Whatever works for you!", feedback: "Too vague. State clear, secure payment methods to seem legitimate and organized.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'The bag has a musty smell in your description. Can that be removed?'",
      options: [
        { text: "It's vintage, it's supposed to smell old.", feedback: "Dismissive! Address the concern and offer solution - this is fixable!", type: "bad" },
        { text: "Yes, easily! Air it out for 2 days or use leather cleaner. Many buyers prefer I don't clean so they can do it their way.", feedback: "Excellent! Gave solution, explained why you didn't do it. Turned negative into positive!", type: "good" },
        { text: "I didn't notice any smell.", feedback: "If you mentioned it in description, don't contradict yourself. Be honest and helpful.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'I'm worried about buying online. What if it's not as described?'",
      options: [
        { text: "Well, that's the risk of online shopping.", feedback: "Not reassuring! Offer guarantees and protections to reduce their perceived risk.", type: "bad" },
        { text: "Totally understand! I offer: detailed photos, video walkthrough, 7-day returns, and PayPal protection. You're covered.", feedback: "Perfect! Acknowledged fear, then listed multiple safety nets. Very confidence-building!", type: "good" },
        { text: "Don't worry, I'm trustworthy!", feedback: "Actions speak louder than words. Provide concrete protections, not just assurances.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'Can you send me a video of the bag before I commit to buying?'",
      options: [
        { text: "No, too much work. Buy or don't.", feedback: "Lost sale! Quick video = more trust = higher conversion. Worth 5 minutes!", type: "bad" },
        { text: "Happy to! I'll record a 360° walkthrough showing all angles and hardware. Send in 30 min.", feedback: "Excellent! Quick, thorough, specific timing. Shows you're professional and confident!", type: "good" },
        { text: "I can send tomorrow maybe.", feedback: "Too slow! Buyers shop multiple sellers. Competitors responding faster will win.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'Do you have the original receipt to prove authenticity?'",
      options: [
        { text: "No, I lost it years ago.", feedback: "Weakens your case! If true, offer other authentication proof instead.", type: "bad" },
        { text: "Yes! I have the original receipt from 2018. I'll include it with the bag and can send a photo now.", feedback: "Perfect! Strong authentication proof, you'll include it, offering to share immediately. Builds trust!", type: "good" },
        { text: "Why does that even matter?", feedback: "Receipts are major authentication proof! Never dismiss legitimate verification requests.", type: "bad" }
      ]
    },
    {
      situation: "Buyer: 'I live nearby. Can I come see it in person before buying?'",
      options: [
        { text: "No, online sales only for safety.", feedback: "Reasonable boundary! If you prefer no meetups, suggest video call as alternative.", type: "bad" },
        { text: "Sure! I can meet at a public place like a coffee shop. When works for you?", feedback: "Great! Public meeting is safe, and in-person viewing often closes the deal!", type: "good" },
        { text: "Come to my house anytime!", feedback: "Safety risk! Always meet in public places when doing in-person transactions.", type: "bad" }
      ]
    }
  ],
  jp: [
    {
      situation: "バイヤー: 「写真のバッグは公式サイトより暗く見えます。本物ですか？」",
      options: [
        { text: "申し訳ございません！20%オフにします！", feedback: "謝りすぎ - 偽物かもと認めているように聞こえます。自信を持ちましょう！", type: "bad" },
        { text: "はい、100%本物です。照明で色が変わります。シリアル番号とカード見せます。", feedback: "完璧！懸念を認め、理由説明、証明提供。自信があってプロ！", type: "good" },
        { text: "もちろん本物です。なぜ質問するの？", feedback: "防御的すぎ - バイヤーが不快に。厳しい質問でも親切で理解ある対応を。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「角に小さな傷が見えます。50ドル値引きできますか？」",
      options: [
        { text: "価格は固定です。買うか買わないか。", feedback: "攻撃的すぎ - 販売機会を失うかも。プロフェッショナルに中間点を探しましょう。", type: "bad" },
        { text: "角のスレは説明済みで価格反映済み。代わりに送料無料の特急配送は？", feedback: "素晴らしい！価格は守りつつ代替案。マージン維持しつつビジネス大切に。", type: "good" },
        { text: "もちろん！50ドル引きにします！", feedback: "すぐに譲りすぎ - さらに交渉続きます。まず価値を示してから小さな譲歩を。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「友人が先週同じバッグを200ドル安く買いました。なぜそんなに高いの？」",
      options: [
        { text: "友人は偽物を買ったんでしょうね。", feedback: "セラーを侮辱したり偽物売ってると示唆しない。自分の価値に焦点を。", type: "bad" },
        { text: "私のは元箱、保存袋、カード、レシート完全セット。希少2019年カラー、状態も素晴らしい。", feedback: "完璧！競合を貶めず価値の違いを説明。事実に語らせる。", type: "good" },
        { text: "わかりました、その価格に合わせます！", feedback: "価格競争に走らない。あなたのアイテムには独自価値 - 特別な点を強調。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「これが中国からのレプリカじゃないってどうやってわかる？」",
      options: [
        { text: "それは失礼な質問では...", feedback: "個人的に受け取らない - B2Bバイヤーは真贋確認が必須。プロに答える。", type: "bad" },
        { text: "良い質問です！シリアルが年式と一致、完璧なレザーとステッチ、カード付き、返金保証あり。", feedback: "素晴らしい！懸念を歓迎、証拠提供、保証で自信を示した。信頼を構築。", type: "good" },
        { text: "信じてください、何年も販売しています。", feedback: "曖昧で防御的。具体的な証拠が必要、あなたの言葉だけでなく。詳細を見せる！", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「写真ではレザーが乾燥して見えます。何年も保管されていたの？」",
      options: [
        { text: "ヴィンテージです！こういう見た目が正しい。", feedback: "半分本当 - ヴィンテージは手入れできます。懸念を認め解決策を提示。", type: "bad" },
        { text: "よくお気づき！自然な経年変化。レザークリームで簡単に回復。コレクターはこれを好む - 偽物は自然に経年しないので。", feedback: "素晴らしい！観察を認め、修復可能と説明、経年を真贋確認のポジティブポイントに。", type: "good" },
        { text: "それは照明のせい。実物は完璧です。", feedback: "見えるものを否定しない。乾燥が見えるなら正直に対処し解決策を説明。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「興味ありますが考えさせてください。1週間取り置きできますか？」",
      options: [
        { text: "もちろん！必要なだけお取り置きします。", feedback: "譲りすぎ - 考えている間に他のバイヤーを失うかも。優しく緊迫感を作る。", type: "bad" },
        { text: "24時間はお取り置き可。でも多くの関心あり。本気ならデポジットで確保を。", feedback: "完璧！関心を大切にしつつ緊迫感を作り、コミットメントの道筋（デポジット）を提示。", type: "good" },
        { text: "取り置きなし。今買うか他の人が買うか。", feedback: "厳しすぎ - 潜在バイヤーを失います。断固としつつも親切に。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「オーストラリアへの国際配送は可能ですか？」",
      options: [
        { text: "いいえ、国内のみです。", feedback: "機会損失！国際配送は巨大市場を開く。解決策を提供しましょう。", type: "bad" },
        { text: "はい！FedEx使用で追跡可能。5-7日で到着。保険付けます。", feedback: "素晴らしい！能力を示し、タイムライン提供、安全性も。市場拡大！", type: "good" },
        { text: "試せますが保証はできません。", feedback: "不確実すぎ - バイヤーは自信を求める。配送オプション調べて明確に答える。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「気に入らなかったら返品できますか？」",
      options: [
        { text: "すべて最終売り切り。返品なし。", feedback: "硬直的すぎ - バイヤーは安心を求める。妥当な返品ポリシーで信頼を構築。", type: "bad" },
        { text: "はい、タグ付き未使用なら7日間返品可。返送料はバイヤー負担。", feedback: "完璧！両者を保護する明確なポリシー。バイヤーの自信を構築！", type: "good" },
        { text: "もちろん、いつでも理由問わず返品可！", feedback: "寛大すぎ - 悪用される可能性。明確な期限と条件を設定。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「写真3のステッチが不均一に見えます。欠陥ですか？」",
      options: [
        { text: "何も問題は見当たりません。", feedback: "無視しすぎ！彼らが見えるなら対処を。よく調べて正直に答える。", type: "bad" },
        { text: "確認します...実はこのモデルの本物のハンドステッチパターンです。機械の偽物は完全に均一です。", feedback: "素晴らしい！調査し、真贋の特徴と説明。懸念を証明に変えた！", type: "good" },
        { text: "ああ、小さな欠陥ですね。10%オフは？", feedback: "値引きを急がない。本当の欠陥か特徴かを先に判断。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「誰かが同じバッグの偽物を持っているのを見ました。本物って確信できる？」",
      options: [
        { text: "私は信頼できるセラーだからです。", feedback: "証拠不足。彼らが確認できる具体的な真贋ポイントを提供。", type: "bad" },
        { text: "懸念理解します！確認点：重さ（偽物は軽い）、ジッパー品質、日付コード形式、真贋鑑定書付き。", feedback: "完璧！具体的な確認ポイントを提供し文書で裏付け。非常に安心！", type: "good" },
        { text: "信用しないなら他で買って。", feedback: "敵対的！彼らの懸念は正当。プロフェッショナルに答えて自信を構築。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「あなたの価格は他のセラーより100ドル高い。合わせられますか？」",
      options: [
        { text: "わかりました、合わせます。", feedback: "簡単に諦めすぎ！価格変更前に価値の違いを説明。", type: "bad" },
        { text: "私のは完全なオリジナル梱包、カード、レシート付き。最近真贋鑑定済み。そちらは何が含まれる？", feedback: "賢い！付加価値を強調し競合について質問。価値の違いをプロフェッショナルに示す。", type: "good" },
        { text: "そのセラーは詐欺かも。", feedback: "競合を攻撃しない！自分の価値提案に集中。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「金具のクローズアップ写真をもっと見せてもらえますか？」",
      options: [
        { text: "投稿した写真で十分です。", feedback: "役に立たない！多くの写真 = より多くの自信 = より多くの売上。常に対応。", type: "bad" },
        { text: "もちろん！全金具のクローズアップを撮影し10分でDMします。", feedback: "素晴らしい！迅速、親切、具体的なタイムライン。真剣で柔軟な姿勢を示す！", type: "good" },
        { text: "後でできます、たぶん明日。", feedback: "曖昧すぎ。バイヤーは素早く買い物 - 競合がより早く反応。今行動！", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「私は再販業者です。5個買ったらバルク割引は？」",
      options: [
        { text: "割引なし、全員同じ価格。", feedback: "B2B機会損失！バルクバイヤーは貴重。ボリューム価格を検討。", type: "bad" },
        { text: "はい！5個以上で15%オフと送料無料。どれに興味があるか話しましょう。", feedback: "完璧！バルクビジネスを歓迎、明確な割引提示、会話を招待。素晴らしいB2Bアプローチ！", type: "good" },
        { text: "多分、予算は？", feedback: "曖昧すぎ。明確なバルク条件を述べてプロで準備万端に見せる。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「他サイトで同じバッグが半額でした。なぜあなたから買うべき？」",
      options: [
        { text: "そのサイトは絶対偽物売ってる。", feedback: "証拠なしに攻撃しない！なぜあなたの商品が本物で価値あるかに焦点を。", type: "bad" },
        { text: "半額なら真贋を注意深く確認を。私のはシリアル、カード、レシート、オリジナル梱包付き。評判をかけます。", feedback: "素晴らしい！プロフェッショナルに警告、真贋証明をリスト、自信を示した。", type: "good" },
        { text: "わかりました、私も半額にします！", feedback: "絶対にダメ！本物のバッグがXなら、自分を過小評価しない。価値を信じる。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「どの支払い方法を受け付けていますか？」",
      options: [
        { text: "会ったときに現金のみ。", feedback: "限定的で危険！バイヤー/セラー保護付きの安全なプラットフォームを使用。", type: "bad" },
        { text: "PayPal、クレジットカード、Stripe経由の銀行振込を受け付けます。", feedback: "完璧！両者保護付きの複数の安全なオプション。非常にプロフェッショナル！", type: "good" },
        { text: "何でもいいです！", feedback: "曖昧すぎ。正当で組織的に見えるよう明確で安全な支払い方法を述べる。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「説明文にカビ臭いとあります。取り除けますか？」",
      options: [
        { text: "ヴィンテージだから、古い匂いが普通。", feedback: "無視しすぎ！懸念に対処し解決策を提供 - これは修復可能！", type: "bad" },
        { text: "はい、簡単に！2日間風通し良くするかレザークリーナー使用。多くのバイヤーは自分のやり方でやりたいので私はクリーニングしません。", feedback: "素晴らしい！解決策を提供、なぜやらなかったかを説明。ネガティブをポジティブに！", type: "good" },
        { text: "匂いには気づきませんでした。", feedback: "説明文に書いたなら自己矛盾しない。正直で親切に。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「オンライン購入が心配です。説明と違ったら？」",
      options: [
        { text: "それがオンラインショッピングのリスクです。", feedback: "安心しない！保証と保護を提供して認識リスクを減らす。", type: "bad" },
        { text: "完全に理解します！提供：詳細写真、動画ウォークスルー、7日間返品、PayPal保護。カバーされてます。", feedback: "完璧！恐怖を認め、複数のセーフティネットをリスト。非常に自信構築！", type: "good" },
        { text: "心配しないで、信頼できるから！", feedback: "行動は言葉より雄弁。ただの保証でなく具体的な保護を提供。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「購入決定前にバッグの動画を送ってもらえますか？」",
      options: [
        { text: "いいえ、大変すぎます。買うか買わないか。", feedback: "販売損失！簡単な動画 = より多くの信頼 = より高い転換率。5分の価値あり！", type: "bad" },
        { text: "喜んで！全角度と金具を見せる360°ウォークスルーを録画。30分で送ります。", feedback: "素晴らしい！迅速、徹底的、具体的なタイミング。プロフェッショナルで自信を示す！", type: "good" },
        { text: "明日送れるかも。", feedback: "遅すぎ！バイヤーは複数セラーを見る。早く反応する競合が勝つ。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「真贋を証明するオリジナルレシートはありますか？」",
      options: [
        { text: "いいえ、何年も前になくしました。", feedback: "あなたの主張を弱める！本当なら、代わりに他の真贋証明を提供。", type: "bad" },
        { text: "はい！2018年のオリジナルレシートあり。バッグに同梱し、今すぐ写真送れます。", feedback: "完璧！強力な真贋証明、含めます、すぐに共有できる。信頼を構築！", type: "good" },
        { text: "なぜそれが重要なの？", feedback: "レシートは主要な真贋証明！正当な確認リクエストを無視しない。", type: "bad" }
      ]
    },
    {
      situation: "バイヤー: 「近くに住んでいます。購入前に実物を見れますか？」",
      options: [
        { text: "いいえ、安全のためオンラインのみ。", feedback: "妥当な境界！対面不可なら、代替としてビデオ通話を提案。", type: "bad" },
        { text: "もちろん！カフェなど公共の場で会えます。いつがいいですか？", feedback: "素晴らしい！公共での会合は安全、対面で見ると成約しやすい！", type: "good" },
        { text: "いつでも家に来て！", feedback: "安全リスク！対面取引は常に公共の場で。", type: "bad" }
      ]
    }
  ]
};

/* ═══ DAILY WARM-UP ═══ */
function DailyWarmUp({ lang, onComplete }) {
  const [phase, setPhase] = useState("ready"); // ready, name, condition, question, complete
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [currentName, setCurrentName] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [completedTasks, setCompletedTasks] = useState({ name: false, condition: false, question: false });

  useEffect(() => {
    if (phase !== "ready" && phase !== "complete" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && phase !== "complete") {
      setPhase("complete");
      if (onComplete) onComplete(Object.values(completedTasks).filter(v => v).length);
    }
  }, [timeLeft, phase, completedTasks, onComplete]);

  const startWarmUp = () => {
    const randomName = BUYER_NAMES[Math.floor(Math.random() * BUYER_NAMES.length)];
    const randomConditionItem = CONDITION_ITEMS[lang][Math.floor(Math.random() * CONDITION_ITEMS[lang].length)];
    const randomScenario = BUYER_SCENARIOS[lang][Math.floor(Math.random() * BUYER_SCENARIOS[lang].length)];

    setCurrentName(randomName);
    setCurrentCondition(randomConditionItem.item + " - " + randomConditionItem.issues[0]);
    setCurrentQuestion(randomScenario.situation);
    setPhase("name");
    setTimeLeft(180);
  };

  const completeTask = (task) => {
    setCompletedTasks({ ...completedTasks, [task]: true });
    if (task === "name") setPhase("condition");
    else if (task === "condition") setPhase("question");
    else if (task === "question") setPhase("complete");
  };

  if (phase === "ready") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>⚡</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "Daily 3-Minute Warm-Up" : "デイリー3分ウォームアップ"}
        </h2>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, marginBottom:24, maxWidth:400, margin:"0 auto 24px" }}>
          {lang === "en"
            ? "A quick pre-stream ritual to calm nerves and build confidence. Practice one name, one condition, and one buyer question."
            : "配信前の緊張をほぐし自信を築くクイックルーティン。1つの名前、1つのコンディション、1つのバイヤー質問を練習。"}
        </p>
        <button
          onClick={startWarmUp}
          style={{
            background:"#86B817",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 32px",
            fontSize:18,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
        >
          {lang === "en" ? "Start Warm-Up" : "ウォームアップ開始"}
        </button>
      </div>
    );
  }

  if (phase === "complete") {
    const tasksCompleted = Object.values(completedTasks).filter(v => v).length;
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🎯</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "You're Ready!" : "準備完了！"}
        </h2>
        <div style={{ fontSize:48, fontWeight:700, color:"#86B817", marginBottom:8 }}>
          {tasksCompleted} / 3
        </div>
        <p style={{ fontSize:18, color:"#4B5563", marginBottom:24 }}>
          {lang === "en" ? "skills warmed up" : "スキルをウォームアップ"}
        </p>

        <div style={{
          background: tasksCompleted === 3 ? "#ECFDF5" : "#FEF3C7",
          padding:"20px 24px",
          borderRadius:12,
          marginBottom:24,
          border:`2px solid ${tasksCompleted === 3 ? "#86B817" : "#F5AF02"}`
        }}>
          <p style={{ fontSize:16, color:"#191919", fontWeight:600, margin:0, lineHeight:1.6 }}>
            {tasksCompleted === 3
              ? (lang === "en"
                ? "💪 Perfect warm-up! Your voice is ready, your mind is sharp. Go live with confidence!"
                : "💪 完璧なウォームアップ！声は準備OK、頭は冴えてます。自信を持って配信しよう！")
              : (lang === "en"
                ? "👍 Good effort! Try to complete all three tasks next time for maximum confidence boost."
                : "👍 よく頑張りました！次回は3つすべて完了して最大の自信アップを。")}
          </p>
        </div>

        <button
          onClick={() => { setPhase("ready"); setCompletedTasks({ name: false, condition: false, question: false }); }}
          style={{
            background:"#86B817",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 32px",
            fontSize:18,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
        >
          {lang === "en" ? "🔄 Warm Up Again" : "🔄 再度ウォームアップ"}
        </button>
      </div>
    );
  }

  // Active phases
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
      {/* Timer */}
      <div style={{ marginBottom:24, textAlign:"center" }}>
        <div style={{
          fontSize:48,
          fontWeight:700,
          color: timeLeft <= 30 ? "#E53238" : "#86B817",
          marginBottom:8
        }}>
          {formatTime(timeLeft)}
        </div>
        <div style={{ fontSize:14, color:"#9CA3AF" }}>
          {lang === "en" ? "Time Remaining" : "残り時間"}
        </div>
      </div>

      {/* Progress Checklist */}
      <div style={{ marginBottom:24, background:"#F7F7F7", padding:"16px 20px", borderRadius:8 }}>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:20 }}>{completedTasks.name ? "✅" : "⬜"}</span>
            <span style={{ fontSize:14, color: completedTasks.name ? "#86B817" : "#9CA3AF", fontWeight:600 }}>
              {lang === "en" ? "Name" : "名前"}
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:20 }}>{completedTasks.condition ? "✅" : "⬜"}</span>
            <span style={{ fontSize:14, color: completedTasks.condition ? "#86B817" : "#9CA3AF", fontWeight:600 }}>
              {lang === "en" ? "Condition" : "コンディション"}
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:20 }}>{completedTasks.question ? "✅" : "⬜"}</span>
            <span style={{ fontSize:14, color: completedTasks.question ? "#86B817" : "#9CA3AF", fontWeight:600 }}>
              {lang === "en" ? "Question" : "質問"}
            </span>
          </div>
        </div>
      </div>

      {/* Current Task */}
      {phase === "name" && (
        <div style={{ animation:"fu 0.3s ease" }}>
          <div style={{ fontSize:14, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, fontWeight:600, textAlign:"center" }}>
            {lang === "en" ? "Task 1: Read This Name Aloud" : "タスク1：この名前を声に出して読む"}
          </div>
          <div style={{
            background:"linear-gradient(135deg, #E53238 0%, #F5AF02 100%)",
            borderRadius:12,
            padding:"40px 24px",
            textAlign:"center",
            color:"#FFFFFF",
            marginBottom:24
          }}>
            <div style={{ fontSize:28, fontWeight:700, fontFamily:"'Courier New', monospace", wordBreak:"break-all", lineHeight:1.4 }}>
              {currentName}
            </div>
          </div>
          <button
            onClick={() => completeTask("name")}
            style={{
              width:"100%",
              background:"#86B817",
              color:"#FFFFFF",
              border:"none",
              borderRadius:12,
              padding:"16px",
              fontSize:18,
              fontWeight:700,
              cursor:"pointer"
            }}
          >
            {lang === "en" ? "✓ Done, Next Task" : "✓ 完了、次へ"}
          </button>
        </div>
      )}

      {phase === "condition" && (
        <div style={{ animation:"fu 0.3s ease" }}>
          <div style={{ fontSize:14, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, fontWeight:600, textAlign:"center" }}>
            {lang === "en" ? "Task 2: Describe This Condition Aloud" : "タスク2：この状態を声に出して説明"}
          </div>
          <div style={{
            background:"linear-gradient(135deg, #F5AF02 0%, #E8A87C 100%)",
            borderRadius:12,
            padding:"32px 24px",
            textAlign:"center",
            color:"#FFFFFF",
            marginBottom:24
          }}>
            <div style={{ fontSize:20, fontWeight:700, marginBottom:16 }}>{currentCondition}</div>
            <div style={{ fontSize:14, opacity:0.9 }}>
              {lang === "en" ? "Speak as if you're live: 'This item has...'" : "ライブ配信のように：「このアイテムは...」"}
            </div>
          </div>
          <button
            onClick={() => completeTask("condition")}
            style={{
              width:"100%",
              background:"#86B817",
              color:"#FFFFFF",
              border:"none",
              borderRadius:12,
              padding:"16px",
              fontSize:18,
              fontWeight:700,
              cursor:"pointer"
            }}
          >
            {lang === "en" ? "✓ Done, Next Task" : "✓ 完了、次へ"}
          </button>
        </div>
      )}

      {phase === "question" && (
        <div style={{ animation:"fu 0.3s ease" }}>
          <div style={{ fontSize:14, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, fontWeight:600, textAlign:"center" }}>
            {lang === "en" ? "Task 3: Answer This Question Aloud" : "タスク3：この質問に声で答える"}
          </div>
          <div style={{
            background:"linear-gradient(135deg, #3665F3 0%, #5D8AE8 100%)",
            borderRadius:12,
            padding:"32px 24px",
            color:"#FFFFFF",
            marginBottom:24
          }}>
            <div style={{ fontSize:16, lineHeight:1.6 }}>{currentQuestion}</div>
          </div>
          <button
            onClick={() => completeTask("question")}
            style={{
              width:"100%",
              background:"#86B817",
              color:"#FFFFFF",
              border:"none",
              borderRadius:12,
              padding:"16px",
              fontSize:18,
              fontWeight:700,
              cursor:"pointer"
            }}
          >
            {lang === "en" ? "✓ Complete Warm-Up" : "✓ ウォームアップ完了"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══ CONDITION DESCRIPTION CHALLENGE ═══ */
function ConditionChallenge({ lang, onComplete }) {
  const [currentItem, setCurrentItem] = useState(0);
  const [userDescription, setUserDescription] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const items = CONDITION_ITEMS[lang];
  const item = items[currentItem];

  const conditionOptions = ["Excellent", "Very Good", "Good", "Fair"];

  const handleSubmit = () => {
    setShowFeedback(true);
    const wordCount = userDescription.trim().split(/\s+/).length;
    const mentionedIssues = item.issues.filter(issue =>
      userDescription.toLowerCase().includes(issue.toLowerCase().split(' ')[0])
    ).length;

    const isGoodDescription = wordCount >= 15 && mentionedIssues >= 2 && selectedCondition === item.correctCondition;
    if (isGoodDescription) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem(currentItem + 1);
      setUserDescription("");
      setSelectedCondition("");
      setShowFeedback(false);
    } else {
      setCompleted(true);
      if (onComplete) onComplete(score);
    }
  };

  const getFeedbackLevel = () => {
    const wordCount = userDescription.trim().split(/\s+/).length;
    const mentionedIssues = item.issues.filter(issue =>
      userDescription.toLowerCase().includes(issue.toLowerCase().split(' ')[0])
    ).length;

    if (wordCount >= 15 && mentionedIssues >= 3 && selectedCondition === item.correctCondition) {
      return "excellent";
    } else if (wordCount >= 10 && mentionedIssues >= 2) {
      return "good";
    }
    return "needsWork";
  };

  if (completed) {
    const percentage = Math.round((score / items.length) * 100);

    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>
          {percentage >= 80 ? "🌟" : percentage >= 60 ? "💪" : "👍"}
        </div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "Challenge Complete!" : "チャレンジ完了！"}
        </h2>
        <div style={{ fontSize:48, fontWeight:700, color:"#F5AF02", marginBottom:8 }}>
          {score} / {items.length}
        </div>
        <p style={{ fontSize:18, color:"#4B5563", marginBottom:24 }}>
          {lang === "en" ? "accurate descriptions" : "正確な説明"}
        </p>

        <div style={{
          background: percentage >= 80 ? "#ECFDF5" : percentage >= 60 ? "#EFF6FF" : "#FEF3C7",
          padding:"20px 24px",
          borderRadius:12,
          marginBottom:24,
          border:`2px solid ${percentage >= 80 ? "#86B817" : percentage >= 60 ? "#3665F3" : "#F5AF02"}`
        }}>
          <p style={{ fontSize:16, color:"#191919", fontWeight:600, margin:0, lineHeight:1.6 }}>
            {percentage >= 80
              ? (lang === "en"
                ? "🌟 Outstanding! Your descriptions are detailed and honest. This prevents INAD returns and builds buyer trust!"
                : "🌟 素晴らしい！説明が詳細で正直です。INAD返品を防ぎバイヤーの信頼を築きます！")
              : percentage >= 60
              ? (lang === "en"
                ? "💪 Good progress! Remember: mention ALL visible issues, be specific about condition, and assess accurately."
                : "💪 良い進歩！覚えて：すべての見える問題を言及、状態を具体的に、正確に評価。")
              : (lang === "en"
                ? "👍 Keep practicing! The more details you include, the fewer returns you'll get. Be thorough and honest!"
                : "👍 練習を続けて！詳細を含むほど返品が減ります。徹底的に正直に！")}
          </p>
        </div>

        <button
          onClick={() => { setCurrentItem(0); setScore(0); setCompleted(false); setUserDescription(""); setSelectedCondition(""); setShowFeedback(false); }}
          style={{
            background:"#F5AF02",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 32px",
            fontSize:18,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
        >
          {lang === "en" ? "🔄 Try Again" : "🔄 もう一度"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
      {/* Progress */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ fontSize:14, color:"#9CA3AF", fontWeight:600 }}>
            {lang === "en" ? "Item" : "アイテム"} {currentItem + 1} / {items.length}
          </span>
          <span style={{ fontSize:14, color:"#F5AF02", fontWeight:700 }}>
            {lang === "en" ? "Score:" : "スコア:"} {score}
          </span>
        </div>
        <div style={{ background:"#E5E7EB", height:8, borderRadius:8, overflow:"hidden" }}>
          <div style={{
            background:"linear-gradient(90deg, #F5AF02, #E53238)",
            height:"100%",
            width:`${((currentItem + 1) / items.length) * 100}%`,
            transition:"width 0.3s ease"
          }}></div>
        </div>
      </div>

      {/* Item Card */}
      <div style={{
        background:"linear-gradient(135deg, #F5AF02 0%, #E8A87C 100%)",
        borderRadius:12,
        padding:"32px",
        marginBottom:24,
        textAlign:"center",
        color:"#FFFFFF"
      }}>
        <div style={{ fontSize:72, marginBottom:12 }}>{item.image}</div>
        <div style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>{item.item}</div>
        <div style={{ fontSize:14, opacity:0.95, textTransform:"uppercase", letterSpacing:1 }}>
          {lang === "en" ? "Describe this item's condition" : "このアイテムの状態を説明"}
        </div>
      </div>

      {/* Visible Issues */}
      <div style={{ marginBottom:24, background:"#F7F7F7", padding:"16px 20px", borderRadius:8 }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang === "en" ? "👀 What you can see:" : "👀 見える状態："}
        </div>
        <div style={{ display:"grid", gap:6 }}>
          {item.issues.map((issue, i) => (
            <div key={i} style={{ fontSize:14, color:"#4B5563", paddingLeft:12, borderLeft:"3px solid #F5AF02" }}>
              • {issue}
            </div>
          ))}
        </div>
      </div>

      {/* Condition Assessment */}
      <div style={{ marginBottom:20 }}>
        <label style={{ fontSize:15, fontWeight:700, color:"#191919", display:"block", marginBottom:12 }}>
          {lang === "en" ? "Overall Condition:" : "総合コンディション："}
        </label>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}>
          {conditionOptions.map(cond => (
            <button
              key={cond}
              onClick={() => !showFeedback && setSelectedCondition(cond)}
              disabled={showFeedback}
              style={{
                padding:"12px 16px",
                borderRadius:8,
                border:`2px solid ${selectedCondition === cond ? "#F5AF02" : "#E5E7EB"}`,
                background: selectedCondition === cond ? "#FEF3C7" : "#FFFFFF",
                color:"#191919",
                fontSize:14,
                fontWeight:600,
                cursor: showFeedback ? "default" : "pointer",
                transition:"all 0.2s"
              }}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Description Input */}
      <div style={{ marginBottom:20 }}>
        <label style={{ fontSize:15, fontWeight:700, color:"#191919", display:"block", marginBottom:12 }}>
          {lang === "en" ? "Your Description (be specific!):" : "あなたの説明（具体的に！）："}
        </label>
        <textarea
          value={userDescription}
          onChange={(e) => !showFeedback && setUserDescription(e.target.value)}
          disabled={showFeedback}
          placeholder={lang === "en"
            ? "Example: Corner wear on all four corners, light patina on vachetta handles..."
            : "例：4つ角すべてにスレあり、ヌメ革ハンドルに軽いパティーナ..."}
          style={{
            width:"100%",
            minHeight:120,
            padding:"12px 16px",
            borderRadius:8,
            border:"2px solid #E5E7EB",
            fontSize:14,
            fontFamily:"inherit",
            resize:"vertical",
            lineHeight:1.6
          }}
        />
        <div style={{ fontSize:12, color:"#9CA3AF", marginTop:6 }}>
          {userDescription.trim().split(/\s+/).filter(w => w).length} {lang === "en" ? "words" : "単語"}
          {" • "}
          {lang === "en" ? "Aim for 15+ words" : "15単語以上を目指して"}
        </div>
      </div>

      {/* Submit/Next Button */}
      {!showFeedback ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedCondition || userDescription.trim().length < 10}
          style={{
            width:"100%",
            background: (!selectedCondition || userDescription.trim().length < 10) ? "#E5E7EB" : "#F5AF02",
            color: (!selectedCondition || userDescription.trim().length < 10) ? "#9CA3AF" : "#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px",
            fontSize:18,
            fontWeight:700,
            cursor: (!selectedCondition || userDescription.trim().length < 10) ? "not-allowed" : "pointer",
            transition:"all 0.2s"
          }}
        >
          {lang === "en" ? "Submit Description" : "説明を提出"}
        </button>
      ) : (
        <div style={{ animation:"fu 0.3s ease" }}>
          {/* Feedback */}
          <div style={{
            background: getFeedbackLevel() === "excellent" ? "#ECFDF5" : getFeedbackLevel() === "good" ? "#EFF6FF" : "#FEF3C7",
            padding:"20px 24px",
            borderRadius:12,
            marginBottom:16,
            borderLeft:`4px solid ${getFeedbackLevel() === "excellent" ? "#86B817" : getFeedbackLevel() === "good" ? "#3665F3" : "#F5AF02"}`
          }}>
            <div style={{ fontSize:15, color:"#191919", fontWeight:600, marginBottom:12 }}>
              {getFeedbackLevel() === "excellent" ? "✨ " : getFeedbackLevel() === "good" ? "💪 " : "💡 "}
              {item.feedback[getFeedbackLevel()]}
            </div>
            <div style={{ fontSize:14, color:"#4B5563", lineHeight:1.7, paddingTop:12, borderTop:"1px solid #E5E7EB" }}>
              <strong>{lang === "en" ? "Model description:" : "モデル説明："}</strong><br/>
              {item.description}
            </div>
          </div>

          <button
            onClick={handleNext}
            style={{
              width:"100%",
              background:"#F5AF02",
              color:"#FFFFFF",
              border:"none",
              borderRadius:12,
              padding:"16px",
              fontSize:18,
              fontWeight:700,
              cursor:"pointer",
              transition:"all 0.2s"
            }}
            onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            {currentItem < items.length - 1
              ? (lang === "en" ? "Next Item →" : "次のアイテム →")
              : (lang === "en" ? "See Results →" : "結果を見る →")}
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══ SCENARIO TRAINER ═══ */
function ScenarioTrainer({ lang, onComplete }) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const scenarios = BUYER_SCENARIOS[lang];

  // Shuffle options when scenario changes
  useEffect(() => {
    const scenario = scenarios[currentScenario];
    const optionsWithIndex = scenario.options.map((opt, i) => ({ ...opt, originalIndex: i }));
    const shuffled = [...optionsWithIndex].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, [currentScenario, scenarios]);

  const handleSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    // Use the original index to check if it's the correct answer
    const selectedOriginalIndex = shuffledOptions[optionIndex].originalIndex;
    if (scenarios[currentScenario].options[selectedOriginalIndex].type === "good") {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
      if (onComplete) onComplete(score + (scenarios[currentScenario].options[selectedOption]?.type === "good" ? 1 : 0));
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setCompleted(false);
  };

  if (completed) {
    const finalScore = score;
    const total = scenarios.length;
    const percentage = Math.round((finalScore / total) * 100);

    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>
          {percentage >= 80 ? "🌟" : percentage >= 60 ? "💪" : "👍"}
        </div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "Scenarios Complete!" : "シナリオ完了！"}
        </h2>
        <div style={{ fontSize:48, fontWeight:700, color:"#3665F3", marginBottom:8 }}>
          {finalScore} / {total}
        </div>
        <p style={{ fontSize:18, color:"#4B5563", marginBottom:24 }}>
          {lang === "en" ? "professional responses" : "プロフェッショナルな対応"}
        </p>

        {/* Encouraging Feedback */}
        <div style={{
          background: percentage >= 80 ? "#ECFDF5" : percentage >= 60 ? "#EFF6FF" : "#FEF3C7",
          padding:"20px 24px",
          borderRadius:12,
          marginBottom:24,
          border:`2px solid ${percentage >= 80 ? "#86B817" : percentage >= 60 ? "#3665F3" : "#F5AF02"}`
        }}>
          <p style={{ fontSize:16, color:"#191919", fontWeight:600, margin:0, lineHeight:1.6 }}>
            {percentage >= 80
              ? (lang === "en"
                ? "🌟 Outstanding! You handled these buyer situations like a pro. Your confidence will shine on live streams!"
                : "🌟 素晴らしい！プロのようにバイヤーシチュエーションを処理しました。ライブ配信で自信が輝くでしょう！")
              : percentage >= 60
              ? (lang === "en"
                ? "💪 Great progress! You're building the right instincts. Practice these scenarios a few more times to lock them in."
                : "💪 素晴らしい進歩！正しい直感を築いています。もう数回練習してマスターしましょう。")
              : (lang === "en"
                ? "👍 Good start! Remember: stay confident, acknowledge concerns, and show value. Try again to see how different approaches feel!"
                : "👍 いいスタート！覚えておいて：自信を持ち、懸念を認め、価値を示す。もう一度試して違うアプローチを体感しよう！")}
          </p>
        </div>

        {/* Key Lessons */}
        <div style={{ textAlign:"left", background:"#F7F7F7", padding:"20px 24px", borderRadius:12, marginBottom:24 }}>
          <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:12 }}>
            {lang === "en" ? "🎯 Key Lessons:" : "🎯 重要なレッスン："}
          </div>
          <div style={{ fontSize:14, color:"#4B5563", lineHeight:1.8 }}>
            {lang === "en" ? (
              <>
                • Never apologize for item authenticity - show confidence<br/>
                • Address concerns with facts and proof, not emotion<br/>
                • Create value before making price concessions<br/>
                • Turn objections into opportunities to showcase expertise
              </>
            ) : (
              <>
                • 商品の真贋性について謝らない - 自信を示す<br/>
                • 感情でなく事実と証拠で懸念に対処<br/>
                • 価格譲歩の前に価値を作る<br/>
                • 反対意見を専門知識を示す機会に変える
              </>
            )}
          </div>
        </div>

        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button
            onClick={handleRestart}
            style={{
              background:"#3665F3",
              color:"#FFFFFF",
              border:"none",
              borderRadius:12,
              padding:"16px 32px",
              fontSize:18,
              fontWeight:700,
              cursor:"pointer",
              transition:"all 0.2s"
            }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            {lang === "en" ? "🔄 Try Again" : "🔄 もう一度"}
          </button>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentScenario];

  return (
    <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
      {/* Progress Bar */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ fontSize:14, color:"#9CA3AF", fontWeight:600 }}>
            {lang === "en" ? "Scenario" : "シナリオ"} {currentScenario + 1} / {scenarios.length}
          </span>
          <span style={{ fontSize:14, color:"#86B817", fontWeight:700 }}>
            {lang === "en" ? "Score:" : "スコア:"} {score}
          </span>
        </div>
        <div style={{ background:"#E5E7EB", height:8, borderRadius:8, overflow:"hidden" }}>
          <div style={{
            background:"linear-gradient(90deg, #3665F3, #86B817)",
            height:"100%",
            width:`${((currentScenario + 1) / scenarios.length) * 100}%`,
            transition:"width 0.3s ease"
          }}></div>
        </div>
      </div>

      {/* Scenario */}
      <div style={{
        background:"#F7F7F7",
        borderLeft:"4px solid #E53238",
        padding:"20px 24px",
        borderRadius:8,
        marginBottom:24
      }}>
        <div style={{ fontSize:14, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:8, fontWeight:600 }}>
          {lang === "en" ? "Live Stream Situation" : "ライブ配信シチュエーション"}
        </div>
        <div style={{ fontSize:16, color:"#191919", lineHeight:1.7, fontWeight:500 }}>
          {scenario.situation}
        </div>
      </div>

      {/* Options */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:16 }}>
          {lang === "en" ? "How would you respond?" : "どう対応しますか？"}
        </div>
        <div style={{ display:"grid", gap:12 }}>
          {shuffledOptions.map((option, i) => {
            const isSelected = selectedOption === i;
            const showResult = showFeedback && isSelected;
            const isGood = option.type === "good";

            return (
              <div key={i}>
                <button
                  onClick={() => !showFeedback && handleSelect(i)}
                  disabled={showFeedback}
                  style={{
                    width:"100%",
                    background: showResult
                      ? (isGood ? "#ECFDF5" : "#FEF2F2")
                      : (isSelected ? "#EFF6FF" : "#FFFFFF"),
                    border: showResult
                      ? `2px solid ${isGood ? "#86B817" : "#F5AF02"}`
                      : `2px solid ${isSelected ? "#3665F3" : "#E5E7EB"}`,
                    borderRadius:12,
                    padding:"16px 20px",
                    textAlign:"left",
                    cursor: showFeedback ? "default" : "pointer",
                    transition:"all 0.2s",
                    opacity: (showFeedback && !isSelected) ? 0.5 : 1
                  }}
                  onMouseEnter={e => !showFeedback && (e.target.style.borderColor = "#3665F3")}
                  onMouseLeave={e => !showFeedback && !isSelected && (e.target.style.borderColor = "#E5E7EB")}
                >
                  <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                    <div style={{
                      minWidth:28,
                      height:28,
                      borderRadius:"50%",
                      background: showResult
                        ? (isGood ? "#86B817" : "#F5AF02")
                        : (isSelected ? "#3665F3" : "#E5E7EB"),
                      color:"#FFFFFF",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      fontWeight:700,
                      fontSize:14,
                      flexShrink:0
                    }}>
                      {showResult ? (isGood ? "✓" : "!") : String.fromCharCode(65 + i)}
                    </div>
                    <div style={{ flex:1, fontSize:15, color:"#191919", lineHeight:1.6 }}>
                      {option.text}
                    </div>
                  </div>
                </button>

                {/* Feedback */}
                {showResult && (
                  <div style={{
                    marginTop:12,
                    padding:"16px 20px",
                    background: isGood ? "#ECFDF5" : "#FFFBEB",
                    borderRadius:8,
                    borderLeft:`4px solid ${isGood ? "#86B817" : "#F5AF02"}`,
                    animation:"fu 0.3s ease"
                  }}>
                    <div style={{ fontSize:14, color:"#191919", lineHeight:1.7, fontWeight:500 }}>
                      {isGood ? "✨ " : "💡 "}{option.feedback}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      {showFeedback && (
        <button
          onClick={handleNext}
          style={{
            width:"100%",
            background:"#3665F3",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px",
            fontSize:18,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s",
            animation:"fu 0.3s ease"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          {currentScenario < scenarios.length - 1
            ? (lang === "en" ? "Next Scenario →" : "次のシナリオ →")
            : (lang === "en" ? "See Results →" : "結果を見る →")}
        </button>
      )}
    </div>
  );
}

/* ═══ NAME BLAST GAME ═══ */
function NameBlastGame({ lang, onComplete }) {
  const [gameState, setGameState] = useState("ready"); // ready, playing, finished
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shuffledNames, setShuffledNames] = useState([]);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("finished");
      if (onComplete) onComplete(score);
    }
  }, [timeLeft, gameState, score, onComplete]);

  const startGame = () => {
    const shuffled = [...BUYER_NAMES].sort(() => Math.random() - 0.5);
    setShuffledNames(shuffled);
    setCurrentNameIndex(0);
    setScore(0);
    setTimeLeft(60);
    setGameState("playing");
  };

  const handleNext = () => {
    if (currentNameIndex < shuffledNames.length - 1) {
      setCurrentNameIndex(currentNameIndex + 1);
      setScore(score + 1);
    }
  };

  const handleRestart = () => {
    startGame();
  };

  if (gameState === "ready") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🎙️</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "Name Blast" : "名前読みブラスト"}
        </h2>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, marginBottom:24, maxWidth:400, margin:"0 auto 24px" }}>
          {lang === "en"
            ? "Buyer usernames will flash on screen. Read each one out loud, then tap Next. How many can you read in 60 seconds?"
            : "バイヤーのユーザーネームが画面に表示されます。声に出して読んだら「次へ」をタップ。60秒で何個読めるかな？"}
        </p>
        <button
          onClick={startGame}
          style={{
            background:"#3665F3",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 32px",
            fontSize:18,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
        >
          {lang === "en" ? "Start Game" : "ゲームスタート"}
        </button>
      </div>
    );
  }

  if (gameState === "playing") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB" }}>
        {/* Timer and Score Bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32, padding:"16px 24px", background:"#F7F7F7", borderRadius:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:24 }}>⏱️</span>
            <span style={{ fontSize:32, fontWeight:700, color:timeLeft <= 10 ? "#E53238" : "#191919" }}>
              {timeLeft}s
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:24 }}>🎯</span>
            <span style={{ fontSize:32, fontWeight:700, color:"#86B817" }}>{score}</span>
          </div>
        </div>

        {/* Current Name Display */}
        <div style={{
          background:"linear-gradient(135deg, #3665F3 0%, #5D8AE8 100%)",
          borderRadius:16,
          padding:"48px 32px",
          textAlign:"center",
          marginBottom:24,
          minHeight:200,
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"
        }}>
          <div style={{ fontSize:14, color:"#FFFFFF", opacity:0.9, marginBottom:12, textTransform:"uppercase", letterSpacing:2 }}>
            {lang === "en" ? "Read this name aloud" : "声に出して読んでください"}
          </div>
          <div style={{
            fontSize:36,
            fontWeight:700,
            color:"#FFFFFF",
            fontFamily:"'Courier New', monospace",
            wordBreak:"break-all",
            lineHeight:1.4
          }}>
            {shuffledNames[currentNameIndex]}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            width:"100%",
            background:"#86B817",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"20px",
            fontSize:20,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          {lang === "en" ? "✓ Next Name" : "✓ 次へ"}
        </button>

        <div style={{ textAlign:"center", marginTop:16, fontSize:14, color:"#9CA3AF" }}>
          {currentNameIndex + 1} / {shuffledNames.length} names
        </div>
      </div>
    );
  }

  // Finished state
  return (
    <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB" }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
      <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
        {lang === "en" ? "Great job!" : "お疲れさまでした！"}
      </h2>
      <div style={{ fontSize:48, fontWeight:700, color:"#3665F3", marginBottom:8 }}>{score}</div>
      <p style={{ fontSize:18, color:"#4B5563", marginBottom:24 }}>
        {lang === "en" ? "names read in 60 seconds" : "個の名前を60秒で読みました"}
      </p>

      {/* Encouraging Feedback */}
      <div style={{
        background:score >= 30 ? "#ECFDF5" : score >= 20 ? "#EFF6FF" : "#FEF3C7",
        padding:"16px 24px",
        borderRadius:12,
        marginBottom:24,
        border:`2px solid ${score >= 30 ? "#86B817" : score >= 20 ? "#3665F3" : "#F5AF02"}`
      }}>
        <p style={{ fontSize:16, color:"#191919", fontWeight:600, margin:0 }}>
          {score >= 30
            ? (lang === "en" ? "🌟 Excellent! You're reading at pro speed!" : "🌟 素晴らしい！プロレベルの速度です！")
            : score >= 20
            ? (lang === "en" ? "💪 Nice work! Keep practicing to get even faster!" : "💪 いい感じ！練習を続けてさらに速く！")
            : (lang === "en" ? "👍 Good start! The more you practice, the easier it gets!" : "👍 いいスタート！練習するほど簡単になります！")}
        </p>
      </div>

      <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
        <button
          onClick={handleRestart}
          style={{
            background:"#3665F3",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 32px",
            fontSize:18,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
        >
          {lang === "en" ? "🔄 Play Again" : "🔄 もう一度"}
        </button>
        <button
          onClick={() => setGameState("ready")}
          style={{
            background:"#F7F7F7",
            color:"#191919",
            border:"2px solid #E5E7EB",
            borderRadius:12,
            padding:"16px 32px",
            fontSize:18,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.background = "#E5E7EB"}
          onMouseLeave={e => e.target.style.background = "#F7F7F7"}
        >
          {lang === "en" ? "← Back" : "← 戻る"}
        </button>
      </div>
    </div>
  );
}

/* ═══ PRACTICE ═══ */
function PracticeP({ lang, onXpEarned }) {
  const [activeGame, setActiveGame] = useState(null);

  const handleGameComplete = (score, gameType) => {
    let xpEarned = 0;
    if (gameType === "nameBlast") {
      xpEarned = Math.floor(score / 2); // 1 XP per 2 names read
    } else if (gameType === "scenarios") {
      xpEarned = score * 10; // 10 XP per correct scenario
    } else if (gameType === "condition") {
      xpEarned = score * 15; // 15 XP per accurate condition description
    } else if (gameType === "warmup") {
      xpEarned = score * 20; // 20 XP per completed warm-up task
    }
    if (onXpEarned) onXpEarned(xpEarned);
  };

  if (activeGame === "nameBlast") {
    return (
      <div style={{ animation:"fu 0.4s ease" }}>
        <button
          onClick={() => setActiveGame(null)}
          style={{
            background:"none",
            border:"none",
            color:"#3665F3",
            fontSize:16,
            fontWeight:600,
            cursor:"pointer",
            marginBottom:16,
            display:"flex",
            alignItems:"center",
            gap:8
          }}
        >
          ← {lang === "en" ? "Back to Practice" : "練習に戻る"}
        </button>
        <NameBlastGame lang={lang} onComplete={(score) => handleGameComplete(score, "nameBlast")} />
      </div>
    );
  }

  if (activeGame === "scenarios") {
    return (
      <div style={{ animation:"fu 0.4s ease" }}>
        <button
          onClick={() => setActiveGame(null)}
          style={{
            background:"none",
            border:"none",
            color:"#3665F3",
            fontSize:16,
            fontWeight:600,
            cursor:"pointer",
            marginBottom:16,
            display:"flex",
            alignItems:"center",
            gap:8
          }}
        >
          ← {lang === "en" ? "Back to Practice" : "練習に戻る"}
        </button>
        <ScenarioTrainer lang={lang} onComplete={(score) => handleGameComplete(score, "scenarios")} />
      </div>
    );
  }

  if (activeGame === "condition") {
    return (
      <div style={{ animation:"fu 0.4s ease" }}>
        <button
          onClick={() => setActiveGame(null)}
          style={{
            background:"none",
            border:"none",
            color:"#3665F3",
            fontSize:16,
            fontWeight:600,
            cursor:"pointer",
            marginBottom:16,
            display:"flex",
            alignItems:"center",
            gap:8
          }}
        >
          ← {lang === "en" ? "Back to Practice" : "練習に戻る"}
        </button>
        <ConditionChallenge lang={lang} onComplete={(score) => handleGameComplete(score, "condition")} />
      </div>
    );
  }

  if (activeGame === "warmup") {
    return (
      <div style={{ animation:"fu 0.4s ease" }}>
        <button
          onClick={() => setActiveGame(null)}
          style={{
            background:"none",
            border:"none",
            color:"#3665F3",
            fontSize:16,
            fontWeight:600,
            cursor:"pointer",
            marginBottom:16,
            display:"flex",
            alignItems:"center",
            gap:8
          }}
        >
          ← {lang === "en" ? "Back to Practice" : "練習に戻る"}
        </button>
        <DailyWarmUp lang={lang} onComplete={(score) => handleGameComplete(score, "warmup")} />
      </div>
    );
  }

  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang==="en"?"Practice & Drills":"練習＆ドリル"}
        </h1>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Build confidence through interactive practice. Each drill focuses on a specific skill you'll use in live streams."
            :"インタラクティブな練習で自信を築きましょう。各ドリルはライブ配信で使う特定のスキルに焦点を当てています。"}
        </p>
      </div>

      <div style={{ display:"grid", gap:12 }}>
        {[
          {
            icon:"🎙️",
            t:lang==="en"?"Name Blast":"名前読みブラスト",
            d:lang==="en"?"Read buyer names as fast as you can - 60 second challenge":"バイヤー名を速読 - 60秒チャレンジ",
            c:"#E53238",
            game:"nameBlast",
            available:true
          },
          {
            icon:"🔍",
            t:lang==="en"?"Condition Description":"コンディション説明",
            d:lang==="en"?"Describe luxury item conditions accurately":"高級品の状態を正確に説明",
            c:"#F5AF02",
            game:"condition",
            available:true
          },
          {
            icon:"💬",
            t:lang==="en"?"What Would You Say?":"どう答える？",
            d:lang==="en"?"Practice responding to buyer scenarios":"バイヤーシナリオへの対応を練習",
            c:"#3665F3",
            game:"scenarios",
            available:true
          },
          {
            icon:"⚡",
            t:lang==="en"?"Daily Warm-Up":"デイリーウォームアップ",
            d:lang==="en"?"3-minute pre-stream confidence booster":"配信前3分間の自信ブースター",
            c:"#86B817",
            game:"warmup",
            available:true
          },
        ].map((m,i)=>(
          <div
            key={i}
            onClick={() => m.available && setActiveGame(m.game)}
            style={{
              background:"#FFFFFF",
              border:`2px solid ${m.available ? m.c + "33" : "#E5E7EB"}`,
              borderRadius:12,
              padding:"20px 24px",
              cursor:m.available ? "pointer" : "not-allowed",
              transition:"all 0.2s",
              opacity:m.available ? 1 : 0.6,
              display:"flex",
              alignItems:"center",
              gap:16
            }}
            onMouseEnter={e => m.available && (e.target.style.transform = "translateY(-2px)", e.target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)")}
            onMouseLeave={e => m.available && (e.target.style.transform = "translateY(0)", e.target.style.boxShadow = "none")}
          >
            <span style={{ fontSize:40 }}>{m.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:4 }}>{m.t}</div>
              <div style={{ fontSize:14, color:"#4B5563", lineHeight:1.5 }}>{m.d}</div>
            </div>
            {m.available ? (
              <div style={{
                background:m.c,
                color:"#FFFFFF",
                padding:"8px 16px",
                borderRadius:8,
                fontSize:14,
                fontWeight:700
              }}>
                {lang === "en" ? "Play" : "プレイ"}
              </div>
            ) : (
              <div style={{
                background:"#F7F7F7",
                color:"#9CA3AF",
                padding:"8px 16px",
                borderRadius:8,
                fontSize:14,
                fontWeight:700
              }}>
                {lang === "en" ? "Soon" : "近日公開"}
              </div>
            )}
          </div>
        ))}
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
