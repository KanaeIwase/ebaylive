import { useState, useEffect, useRef } from "react";
import { simulateLiveStreamBuyer, isAPIConfigured, evaluateConditionDescription, chatAsBuyer, rephraseJapaneseToEnglish } from "./services/anthropic";
import { playSuccess, playLevelUp, playWarning, playBadgeUnlock, playClick } from "./utils/sounds";

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
/* ═══ BRAND KNOWLEDGE DATA (with model details) ═══ */
const BRAND_DATA = {
  lv: {
    name:"Louis Vuitton", year:1854, country:"France",
    auth:"Date codes (pre-2021) → heat stamps with microchip (2021+). Canvas should NEVER peel. Stitching always even.",
    authJp:"デートコード（2021年以前）→ ヒートスタンプ+マイクロチップ（2021年以降）。キャンバスは剥離しない。ステッチは均一。",
    rare:"Multicolor line (Murakami collab) discontinued. Vernis in certain rare colors. Older date code pieces. LV NEVER goes on sale at retail.",
    rareJp:"マルチカラーライン（村上コラボ）廃番。特定のヴェルニ色。古いデートコード品。LVは定価でセールしない。",
    tip:"LV never goes on sale. So any pre-loved LV at this price is already a steal.",
    tipJp:"LVはセールしない。だから中古でこの価格は既にお買い得。",
    models:[
      { name:"Speedy", brief:"Iconic barrel bag - compact, everyday", briefJp:"象徴的なバレル型 - コンパクト、毎日使い",
        desc:"The most iconic LV bag since 1930. Soft, slouchy barrel shape with rolled leather handles.",
        descJp:"1930年以来の最も象徴的なLVバッグ。柔らかくたるむバレル型、ロール レザーハンドル付き。",
        shape:"Barrel/cylindrical with zip-top closure. Slouches when not stuffed.",
        shapeJp:"バレル/円筒形でジップトップ閉鎖。詰めないとたるむ。",
        sizes:[
          {name:"Nano (16cm)", dim:"6.3\"W × 4.3\"H × 3.5\"D"},
          {name:"BB (20cm)", dim:"7.9\"W × 5.9\"H × 4.7\"D"},
          {name:"25", dim:"9.8\"W × 7.5\"H × 5.9\"D"},
          {name:"30", dim:"11.8\"W × 8.3\"H × 6.7\"D - MOST POPULAR"},
          {name:"35", dim:"13.8\"W × 9.1\"H × 7.1\"D"},
          {name:"40", dim:"15.7\"W × 9.8\"H × 7.5\"D"}
        ],
        rare:"Multicolor (Murakami), Cerises (cherry print), Graffiti, Stephen Sprouse collab. Vernis in rare colors like Pomme d'Amour.",
        rareJp:"マルチカラー（村上）、チェリーズ、グラフィティ、スティーブン・スプラウスコラボ。ポムダムールなど希少ヴェルニ色。",
        tip:"The 30 is the original Audrey Hepburn size. That's history in your hands.",
        tipJp:"30サイズはオードリー・ヘップバーンのオリジナルサイズ。あなたの手の中の歴史。"
      },
      { name:"Neverfull", brief:"Tote bag - spacious, open-top", briefJp:"トートバッグ - 広々、オープントップ",
        desc:"Open-top tote with side laces for adjustable width. The ultimate everyday bag.",
        descJp:"調節可能な幅のサイドレース付きオープントップトート。究極のデイリーバッグ。",
        shape:"Rectangular tote, open-top, side laces cinch/expand width.",
        shapeJp:"長方形トート、オープントップ、サイドレースで幅調節。",
        sizes:[
          {name:"PM", dim:"11.4\"W × 8.7\"H × 5.1\"D"},
          {name:"MM", dim:"12.6\"W × 11.4\"H × 6.7\"D - MOST POPULAR"},
          {name:"GM", dim:"15.7\"W × 13\"H × 7.9\"D"}
        ],
        rare:"Limited edition interior prints (Damier Azur Tahitienne). Discontinued colors.",
        rareJp:"限定版内側プリント（ダミエ アズール タヒチエンヌ）。廃番カラー。",
        tip:"This is THE work bag. Fits a laptop, documents, everything. Buyers know this.",
        tipJp:"これがTHE仕事バッグ。ノートPC、書類、全部入る。バイヤーは知ってる。"
      },
      { name:"Keepall", brief:"Weekender duffel - travel essential", briefJp:"週末ダッフル - 旅行必需品",
        desc:"Soft-sided duffel, the quintessential travel bag since 1930. Folds flat when empty.",
        descJp:"1930年以来の典型的な旅行バッグ。空の時は平らに折りたためるソフトサイドダッフル。",
        shape:"Cylindrical duffel with rounded ends, double zip closure.",
        shapeJp:"丸い端の円筒形ダッフル、ダブルジップ閉鎖。",
        sizes:[
          {name:"45", dim:"17.7\"W × 10.6\"H × 7.9\"D - Carry-on size"},
          {name:"50", dim:"19.7\"W × 11.4\"H × 8.7\"D"},
          {name:"55", dim:"21.7\"W × 12.2\"H × 9.4\"D - MOST POPULAR"},
          {name:"60", dim:"23.6\"W × 13\"H × 10.2\"D - Check-in size"}
        ],
        rare:"Keepall Bandoulière (with strap) more valuable. Epi leather, Damier Graphite rare. Collaborations.",
        rareJp:"バンドリエール（ストラップ付き）がより価値。エピレザー、ダミエ グラフィット希少。コラボ。",
        tip:"The Keepall is your perfect weekend bag. Fits overhead. Folds flat. Iconic.",
        tipJp:"Keepallは完璧な週末バッグ。機内持込可。平らに折りたためる。象徴的。"
      }
    ]
  },
  chanel: {
    name:"Chanel", year:1910, country:"France",
    auth:"Serial sticker + card (pre-2021). Microchip (post-2021). Quilting must align at seams.",
    authJp:"シリアルステッカー+カード（2021年以前）。マイクロチップ（2021年以降）。キルティングは縫い目で合う必須。",
    rare:"Prices increase 2-3x per year. Classic Flap was ~$2,800 in 2010, now over $10,000. GST and PST discontinued.",
    rareJp:"年2-3回値上げ。クラシックフラップは2010年~$2,800、今は$10,000以上。GSTとPST廃番。",
    tip:"Chanel increases prices every year. Whatever you pay today, it'll be worth more tomorrow.",
    tipJp:"シャネルは毎年値上げ。今日払う価格、明日にはもっと価値がある。",
    models:[
      { name:"Classic Flap", brief:"Iconic quilted bag - investment piece", briefJp:"象徴的なキルティングバッグ - 投資品",
        desc:"The most iconic Chanel bag. Diamond quilted pattern with chain-leather strap and CC turnlock.",
        descJp:"最も象徴的なシャネルバッグ。ダイヤモンドキルティングパターン、チェーンレザーストラップ、CCターンロック付き。",
        shape:"Rectangular flap bag with signature diamond quilting (matelassé). Chain strap interwoven with leather.",
        shapeJp:"シグネチャーダイヤモンドキルティング（マトラッセ）の長方形フラップバッグ。レザーと組み合わせたチェーンストラップ。",
        sizes:[
          {name:"Mini (17cm)", dim:"6.7\"W × 5.1\"H × 3.1\"D"},
          {name:"Small (23cm)", dim:"9\"W × 5.5\"H × 2.8\"D"},
          {name:"Medium (25.5cm)", dim:"10\"W × 6.3\"H × 2.8\"D - MOST POPULAR"},
          {name:"Jumbo (30cm)", dim:"12\"W × 7.9\"H × 3.5\"D"},
          {name:"Maxi (33cm)", dim:"13\"W × 9\"H × 4\"D"}
        ],
        rare:"Seasonal limited editions (cruise, métiers d'art). Iridescent calfskin. Vintage from Karl's early years.",
        rareJp:"シーズン限定版（クルーズ、メティエダール）。イリデセントカーフスキン。カール初期のヴィンテージ。",
        tip:"Classic Flap Medium was $2,800 in 2010. Now over $10,000. That's why pre-loved is smart.",
        tipJp:"クラシックフラップMは2010年$2,800。今は$10,000以上。だから中古が賢い。"
      },
      { name:"Boy Bag", brief:"Modern, edgy - structured shape", briefJp:"モダンでエッジー - 構造的形状",
        desc:"Masculine-inspired bag with bold hardware. More structured than Classic Flap.",
        descJp:"大胆な金具のマスキュリンなインスピレーションバッグ。クラシックフラップより構造的。",
        shape:"Rectangular with chevron or diamond quilting. Chunky chain strap. Push-lock closure.",
        shapeJp:"シェブロンまたはダイヤモンドキルティングの長方形。太いチェーンストラップ。プッシュロック閉鎖。",
        sizes:[
          {name:"Small", dim:"8\"W × 5\"H × 3\"D"},
          {name:"Medium", dim:"10\"W × 6\"H × 3.5\"D - MOST POPULAR"},
          {name:"Large", dim:"12\"W × 7.5\"H × 4\"D"}
        ],
        rare:"Chevron quilting more sought after than diamond. Limited edition leathers and colors.",
        rareJp:"シェブロンキルティングはダイヤモンドより人気。限定版レザーと色。",
        tip:"Boy Bag is for buyers who want Chanel but something edgier. It's bolder.",
        tipJp:"ボーイバッグはシャネルが欲しいけどエッジーなものを求めるバイヤー向け。より大胆。"
      }
    ]
  },
  hermes: {
    name:"Hermès", year:1837, country:"France",
    auth:"Craftsman stamp with ID, year letter, blind stamp. Hand-stitched saddle stitch (angled, not straight).",
    authJp:"職人スタンプ+ID、年号レター、ブラインドスタンプ。手縫いサドルステッチ（斜め、直線ではない）。",
    rare:"Exotic leathers (croc, ostrich). Special orders (HSS). Limited colorways each season. Birkins NOT sold online — need SA relationship.",
    rareJp:"エキゾチックレザー（クロコ、オーストリッチ）。スペシャルオーダー（HSS）。シーズン限定カラー。バーキンはオンライン販売なし — SA関係必要。",
    tip:"You can't just walk in and buy a Birkin. The fact that we have one here tonight is special.",
    tipJp:"バーキンは歩いて入って買えない。今夜ここにあるのは特別。",
    models:[
      { name:"Birkin", brief:"Holy grail - most coveted bag", briefJp:"聖杯 - 最も切望されるバッグ",
        desc:"The most sought-after handbag in the world. Named after Jane Birkin. Not available online.",
        descJp:"世界で最も求められているハンドバッグ。ジェーン・バーキンにちなんで命名。オンライン販売なし。",
        shape:"Rectangular tote with flap, two handles, turnlock closure. Structured with feet.",
        shapeJp:"フラップ付き長方形トート、2つのハンドル、ターンロック閉鎖。足付きで構造的。",
        sizes:[
          {name:"Birkin 25", dim:"9.8\"W × 7.9\"H × 5.1\"D - MOST SOUGHT AFTER"},
          {name:"Birkin 30", dim:"11.8\"W × 8.7\"H × 6.3\"D - MOST POPULAR"},
          {name:"Birkin 35", dim:"13.8\"W × 10.6\"H × 7.1\"D"},
          {name:"Birkin 40", dim:"15.7\"W × 11.8\"H × 8.7\"D - Travel size"}
        ],
        rare:"Himalaya Birkin ($100K-$500K). Exotic leathers. Limited seasonal colors. HSS (Special Order).",
        rareJp:"ヒマラヤバーキン（$100K-$500K）。エキゾチックレザー。シーズン限定色。HSS（スペシャルオーダー）。",
        tip:"Birkin 25 and 30 are the most sought after. You need purchase history to even buy one retail.",
        tipJp:"バーキン25と30が最も求められている。定価で買うにも購入履歴が必要。"
      }
    ]
  },
  gucci: {
    name:"Gucci", year:1921, country:"Italy",
    auth:"Serial number tag inside (2 rows, 10-13 digits). Controllato card. Clean hardware.",
    authJp:"内側シリアル番号タグ（2行、10-13桁）。コントロラートカード。きれいな金具。",
    rare:"Tom Ford era (1994-2004) vintage premium. Vintage bamboo handles. Alessandro Michele era (2015-2022).",
    rareJp:"トム・フォード時代（1994-2004）ヴィンテージプレミアム。ヴィンテージバンブーハンドル。ミケーレ時代（2015-2022）。",
    tip:"Gucci goes through creative eras. Tom Ford pieces from the 90s? Highly collectible.",
    tipJp:"グッチはクリエイティブ時代を経る。90年代のトム・フォード作品？高コレクティブル。",
    models:[
      { name:"GG Marmont", brief:"Quilted chevron - modern classic", briefJp:"キルティングシェブロン - モダンクラシック",
        desc:"Matelassé chevron leather with signature GG logo. Launched 2016, instantly iconic.",
        descJp:"シグネチャーGGロゴ付きマトラッセシェブロンレザー。2016年発売、即座に象徴的に。",
        shape:"Soft quilted bag with chevron pattern. Double G hardware. Chain strap.",
        shapeJp:"シェブロンパターンの柔らかいキルティングバッグ。ダブルG金具。チェーンストラップ。",
        sizes:[
          {name:"Super Mini", dim:"7.1\"W × 4.3\"H × 2\"D"},
          {name:"Mini", dim:"8.5\"W × 5\"H × 2.5\"D"},
          {name:"Small", dim:"9.5\"W × 5.7\"H × 3\"D - MOST POPULAR"},
          {name:"Medium", dim:"12\"W × 7\"H × 3.5\"D"}
        ],
        rare:"Limited edition colors and embellishments. Velvet versions.",
        rareJp:"限定版カラーと装飾。ベルベットバージョン。",
        tip:"Marmont is Gucci's answer to Chanel. Buyers know this style. Very popular.",
        tipJp:"マーモントはグッチのシャネルへの回答。バイヤーはこのスタイルを知ってる。とても人気。"
      }
    ]
  }
};

/* ═══ PROFESSIONAL VOCABULARY ═══ */
const VOCAB_CATS = [
  { cat:"Live Commerce Abbreviations (MUST KNOW!)", items:[
    {e:"NWT",j:"NWT",def:"New With Tags - Brand new, unworn, original tags still attached",defJp:"新品タグ付き - 未使用、オリジナルタグが付いた状態"},
    {e:"NWOT",j:"NWOT",def:"New Without Tags - Brand new but tags removed or missing",defJp:"新品タグなし - 未使用だがタグが外されているか欠品"},
    {e:"BNIB",j:"BNIB",def:"Brand New In Box - Unopened or mint condition with original box",defJp:"箱入り新品 - 未開封またはオリジナル箱付きミント状態"},
    {e:"EUC",j:"EUC",def:"Excellent Used Condition - Minimal wear, looks almost new",defJp:"極美品中古 - 最小限の使用感、ほぼ新品に見える"},
    {e:"VGUC",j:"VGUC",def:"Very Good Used Condition - Light wear, still great shape",defJp:"美品中古 - 軽い使用感、まだ素晴らしい状態"},
    {e:"GUC",j:"GUC",def:"Good Used Condition - Normal wear, fully functional",defJp:"良品中古 - 通常の使用感、完全に機能"},
    {e:"INAD",j:"INAD",def:"Item Not As Described - eBay case when item doesn't match listing",defJp:"説明と異なる - リスティングと一致しない場合のeBayケース"},
    {e:"NIB",j:"NIB",def:"New In Box - Unused item with original packaging",defJp:"箱入り新品 - オリジナル梱包付き未使用品"},
    {e:"NOS",j:"NOS",def:"New Old Stock - Vintage item that was never sold, still new",defJp:"新古品 - 未販売のヴィンテージ品、まだ新品"},
    {e:"ISO",j:"ISO",def:"In Search Of - Buyer looking for specific item",defJp:"探しています - 特定アイテムを探しているバイヤー"},
    {e:"OBO",j:"OBO",def:"Or Best Offer - Open to negotiate price",defJp:"価格交渉可 - 価格交渉に応じる"},
    {e:"BIN",j:"BIN",def:"Buy It Now - Fixed price, purchase immediately",defJp:"即決価格 - 固定価格、即購入"},
    {e:"FS/FT",j:"FS/FT",def:"For Sale / For Trade - Available to sell or trade",defJp:"販売/交換可 - 販売または交換可能"},
    {e:"HTF",j:"HTF",def:"Hard To Find - Rare, difficult to locate item",defJp:"入手困難 - 希少で見つけにくいアイテム"},
    {e:"VHTF",j:"VHTF",def:"Very Hard To Find - Extremely rare item",defJp:"非常に入手困難 - 極めて希少なアイテム"},
    {e:"RARE",j:"RARE",def:"Scarce item, not commonly available",defJp:"希少 - 一般的に入手不可"},
    {e:"DS",j:"DS",def:"Deadstock - Never worn/used, original packaging, no flaws",defJp:"デッドストック - 未使用、オリジナル梱包、傷なし"},
    {e:"POSH",j:"POSH",def:"Selling on Poshmark platform (cross-platform reference)",defJp:"Poshmark販売 - Poshmarkプラットフォームでの販売"},
    {e:"PM",j:"PM",def:"Private Message / Direct Message for inquiries",defJp:"プライベートメッセージ - 問い合わせ用のDM"}
  ]},
  { cat:"Condition Grading (Essential Terms)", items:[
    {e:"Mint",j:"ミント",def:"Perfect, flawless condition - appears never used or touched",defJp:"完璧、傷なし状態 - 未使用または未触に見える"},
    {e:"Brand new / NWT",j:"新品・タグ付き",def:"Unworn item with original tags still attached",defJp:"未使用でオリジナルタグが付いた状態"},
    {e:"Like new / NWOT",j:"ほぼ新品",def:"Minimal to no signs of wear, appears unused, tags may be removed",defJp:"使用感がほとんどなく、未使用に見える、タグ外れの可能性"},
    {e:"Excellent / EUC",j:"極美品",def:"Very light use, no significant flaws visible",defJp:"使用感が非常に軽く、目立つダメージなし"},
    {e:"Very good / VGUC",j:"美品",def:"Light wear, minor imperfections may exist",defJp:"軽い使用感、軽微なダメージがある可能性"},
    {e:"Good / GUC",j:"良品",def:"Moderate wear, still fully functional and attractive",defJp:"中程度の使用感、機能的で魅力的"},
    {e:"Fair",j:"使用感あり",def:"Obvious wear and use, but no major damage",defJp:"明らかな使用感があるが、大きなダメージなし"},
    {e:"Poor / For parts",j:"ジャンク品",def:"Heavy damage, may not be functional, sold as-is",defJp:"重度のダメージ、機能しない可能性、現状渡し"},
    {e:"Preloved",j:"愛用品",def:"Gently used, previously owned with care",defJp:"大切に使用された中古品"},
    {e:"Vintage",j:"ヴィンテージ",def:"20+ years old, classic/collectible due to age",defJp:"20年以上前、年代物のクラシック/コレクティブル"}
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
  { cat:"🎨 Louis Vuitton Signature Colors", items:[
    {e:"Sweet Orange (#E8833A)",j:"スウィートオレンジ",def:"Beautiful warm orange — very signature Louis Vuitton.",defJp:"美しい温かいオレンジ — とてもLVらしい色。"},
    {e:"Rose Ballerine (#F4C2C2)",j:"ローズバレリーヌ",def:"The prettiest soft pink. So feminine.",defJp:"最も可愛い柔らかいピンク。とてもフェミニン。"},
    {e:"Monogram Brown (#6B4226)",j:"モノグラムブラウン",def:"The classic. You know it, you love it.",defJp:"クラシック。誰もが知ってる、愛してる。"},
    {e:"Damier Ebene (#3B2F2F)",j:"ダミエ エベヌ",def:"Beautiful dark brown. Very classic, very subtle.",defJp:"美しいダークブラウン。クラシックで控えめ。"},
    {e:"Damier Azur (#D6CFC7)",j:"ダミエ アズール",def:"Light and fresh. Perfect for summer.",defJp:"明るくて爽やか。夏にぴったり。"},
    {e:"Fuchsia (#C4346C)",j:"フューシャ",def:"Bold, beautiful hot pink. It pops.",defJp:"大胆で美しいホットピンク。目立つ。"},
    {e:"Pivoine (#D4577B)",j:"ピヴォワンヌ",def:"Gorgeous rosy pink. Very flattering.",defJp:"美しいローズピンク。とても似合う。"},
    {e:"Cherry Berry (#8B0A1A)",j:"チェリーベリー",def:"Deep, rich berry red. Very luxurious.",defJp:"深く豊かなベリーレッド。とても高級。"},
    {e:"Marine Rouge (#1C2951)",j:"マリンルージュ",def:"Beautiful deep navy. Very refined.",defJp:"美しい深いネイビー。とても洗練。"},
    {e:"Noir (#1A1A1A)",j:"ノワール",def:"Classic black. Can't go wrong.",defJp:"クラシックブラック。間違いなし。"}
  ]},
  { cat:"🎨 Chanel Signature Colors", items:[
    {e:"Caviar Black (#000000)",j:"キャビアブラック",def:"Nothing more classic than black Chanel.",defJp:"ブラックシャネルほどクラシックなものはない。"},
    {e:"Beige Clair (#E8D5B7)",j:"ベージュクレール",def:"Chanel's signature neutral. Very chic.",defJp:"シャネルのシグネチャーニュートラル。とてもシック。"},
    {e:"Navy (#1B2A4A)",j:"ネイビー",def:"Deep, elegant navy. Very Parisian.",defJp:"深くエレガントなネイビー。とてもパリジャン。"},
    {e:"Burgundy (#6B1C23)",j:"バーガンディ",def:"One of the best Chanel colors, honestly.",defJp:"正直、最高のシャネルカラーの一つ。"},
    {e:"Red (#CC0000)",j:"レッド",def:"Chanel red is just perfect.",defJp:"シャネルレッドは完璧。"},
    {e:"Light Pink (#F8C8DC)",j:"ライトピンク",def:"Very feminine and lovely.",defJp:"とてもフェミニンで素敵。"}
  ]},
  { cat:"🎨 Hermès Iconic Colors", items:[
    {e:"Etoupe (#8B7D6B)",j:"エトゥープ",def:"Hermès signature taupe-grey. Such a versatile color.",defJp:"エルメスのシグネチャー トープグレー。とても万能。"},
    {e:"Gold (#C19A6B)",j:"ゴールド",def:"Tan/camel leather (NOT metallic). This brown just looks expensive.",defJp:"タン/キャメルレザー（メタリックではない）。この茶色は高そうに見える。"},
    {e:"Orange (#FF6600)",j:"オレンジ",def:"THE Hermès color. Instantly recognizable.",defJp:"エルメスカラー。すぐわかる。"},
    {e:"Rouge H (#8B0000)",j:"ルージュ H",def:"Beautiful deep red. So rich.",defJp:"美しい深紅。とても豊か。"},
    {e:"Bleu de France (#318CE7)",j:"ブルー・ド・フランス",def:"Gorgeous bright blue. Very eye-catching.",defJp:"美しい明るいブルー。とても目を引く。"},
    {e:"Rose Sakura (#F8C8DC)",j:"ローズサクラ",def:"Soft cherry blossom pink. So pretty.",defJp:"柔らかい桜ピンク。とても綺麗。"},
    {e:"Vert Olive (#556B2F)",j:"ヴェール・オリーブ",def:"Love olive. It goes with so much.",defJp:"オリーブ大好き。何にでも合う。"}
  ]},
  { cat:"🎨 Universal Luxury Colors", items:[
    {e:"Cognac (#9A4E1C)",j:"コニャック",def:"Rich, warm brown. This brown just looks expensive.",defJp:"豊かで温かいブラウン。この茶色は高そうに見える。"},
    {e:"Tan (#D2B48C)",j:"タン",def:"Clean, natural tone. Goes with everything.",defJp:"清潔で自然なトーン。何にでも合う。"},
    {e:"Camel (#C19A6B)",j:"キャメル",def:"Very 'quiet luxury.' Great taste.",defJp:"とても'静かな贅沢'。良いセンス。"},
    {e:"Taupe (#8B7D6B)",j:"トープ",def:"Taupe is so underrated. Love it.",defJp:"トープは過小評価されてる。大好き。"},
    {e:"Ivory (#FFFFF0)",j:"アイボリー",def:"Softer than white. So pretty.",defJp:"白より柔らかい。とても綺麗。"},
    {e:"Blush (#DE5D83)",j:"ブラッシュ",def:"Gorgeous rosy pink. So flattering.",defJp:"美しいローズピンク。とても似合う。"},
    {e:"Coral (#FF7F50)",j:"コーラル",def:"Such a cheerful color. Very fresh.",defJp:"とても明るい色。とても爽やか。"},
    {e:"Teal (#008080)",j:"ティール",def:"Love teal. It's bold but still classy.",defJp:"ティール大好き。大胆だけど上品。"},
    {e:"Olive (#556B2F)",j:"オリーブ",def:"Nice earthy green. Very trendy right now.",defJp:"いい感じのアースグリーン。今とてもトレンド。"},
    {e:"Oxblood (#4A0000)",j:"オックスブラッド",def:"Gorgeous oxblood. So rich.",defJp:"美しいオックスブラッド。とても豊か。"},
    {e:"Mauve (#E0B0FF)",j:"モーヴ",def:"Soft, dusty purple. Very romantic.",defJp:"柔らかいダスティパープル。とてもロマンティック。"},
    {e:"Nude (#E3BC9A)",j:"ヌード",def:"So versatile. You'll use this every day.",defJp:"とても万能。毎日使う。"},
    {e:"Slate (#708090)",j:"スレート",def:"Love this gray. It's more interesting than plain gray.",defJp:"このグレー大好き。普通のグレーより面白い。"},
    {e:"Chartreuse (#7FFF00)",j:"シャルトルーズ",def:"Not for everyone, but if you like bold — this is it.",defJp:"万人向けじゃないけど、大胆好きなら — これ。"}
  ]},
  { cat:"🎨 Hardware Colors (金具の色)", items:[
    {e:"Gold Hardware (GHW)",j:"ゴールド金具",def:"Warm, classic. Most popular with caviar and lambskin.",defJp:"温かくクラシック。キャビアとラムスキンで最も人気。"},
    {e:"Silver Hardware (SHW)",j:"シルバー金具",def:"Cool, modern. Great with black and navy.",defJp:"クールでモダン。ブラックとネイビーに最適。"},
    {e:"Ruthenium Hardware (RHW)",j:"ルテニウム金具",def:"Dark gunmetal. Very edgy and cool.",defJp:"ダークガンメタル。とてもエッジーでクール。"},
    {e:"Champagne Gold Hardware",j:"シャンパンゴールド金具",def:"Lighter, softer gold. Very elegant.",defJp:"明るく柔らかいゴールド。とてもエレガント。"},
    {e:"Rose Gold Hardware",j:"ローズゴールド金具",def:"Pink-toned gold. Very feminine, very trendy.",defJp:"ピンクトーンのゴールド。とてもフェミニン、トレンド。"}
  ]},
  { cat:"Selling Color & Style on Live Stream", items:[
    {e:"This shade flatters every skin tone",j:"この色はどんな肌色にも似合います",def:"Universal appeal - works for all buyers",defJp:"万人向け - すべてのバイヤーに合う"},
    {e:"Such a rich, luxurious color",j:"豊かで贅沢な色",def:"Emphasize quality of color",defJp:"色の品質を強調"},
    {e:"This color never goes out of style",j:"この色は流行に左右されない",def:"Highlight timeless appeal",defJp:"時代を超えた魅力を強調"},
    {e:"Perfectly versatile - pairs with anything",j:"完璧に万能 - 何にでも合う",def:"Easy styling for buyers to imagine",defJp:"バイヤーが想像しやすいスタイリング"},
    {e:"Rare, hard-to-find color",j:"レアで入手困難な色",def:"Create urgency with scarcity",defJp:"希少性で緊急性を作る"},
    {e:"This shade photographs beautifully",j:"この色は写真映えする",def:"Appeal to visual/Instagram-conscious buyers",defJp:"視覚的/Instagram意識の高いバイヤーにアピール"},
    {e:"You can dress it up or down",j:"フォーマルにもカジュアルにも",def:"Versatility for multiple occasions",defJp:"複数の場面での汎用性"},
    {e:"A collector's favorite shade",j:"コレクターに人気の色",def:"Position as desirable, sought-after",defJp:"望ましい、人気のあるものとして位置付ける"},
    {e:"Perfect for any season",j:"オールシーズン使える",def:"Year-round wearability",defJp:"一年中使える"},
    {e:"This will elevate any outfit",j:"どんなコーデも格上げ",def:"Positioning as outfit enhancer",defJp:"コーディネートを向上させるアイテムとして"},
    {e:"The leather feels incredible",j:"レザーの質感が素晴らしい",def:"Describe tactile quality viewers can't feel",defJp:"視聴者が触れない触感の品質を説明"},
    {e:"Look at how it catches the light!",j:"光の当たり方を見て！",def:"Visual selling - show on camera",defJp:"視覚的販売 - カメラで見せる"},
    {e:"Imagine this with your favorite jeans",j:"お気に入りのジーンズと合わせたら",def:"Help buyers visualize styling",defJp:"バイヤーがスタイリングを想像するのを助ける"},
    {e:"This adds instant luxury to your closet",j:"クローゼットに即ラグジュアリーを追加",def:"Aspirational positioning",defJp:"憧れのポジショニング"},
    {e:"Every fashionista needs this shade",j:"すべてのおしゃれさんに必要な色",def:"Create desire through social proof",defJp:"社会的証明で欲求を作る"}
  ]},
  { cat:"Authentication & Verification Terms", items:[
    {e:"Date code",j:"デートコード",def:"Manufacturer's code indicating production date/location",defJp:"製造日/場所を示すメーカーコード"},
    {e:"Serial number",j:"シリアルナンバー",def:"Unique number assigned to each item for tracking",defJp:"追跡用に各アイテムに割り当てられた固有番号"},
    {e:"Authenticity card",j:"真贋カード",def:"Certificate from brand confirming item is genuine",defJp:"アイテムが本物であることを確認するブランドの証明書"},
    {e:"Heat stamp / Blind stamp",j:"刻印",def:"Brand logo or date pressed into leather without ink",defJp:"インクなしでレザーに押された ブランドロゴまたは日付"},
    {e:"Hologram",j:"ホログラム",def:"3D security sticker used by some brands (Prada, Gucci)",defJp:"一部ブランド（プラダ、グッチ）が使用する3Dセキュリティステッカー"},
    {e:"Controllato card",j:"コントロラートカード",def:"Gucci's quality control card with serial number",defJp:"シリアル番号付きグッチの品質管理カード"},
    {e:"Made in France / Italy / Spain",j:"フランス/イタリア/スペイン製",def:"Country of manufacture - important for authentication",defJp:"製造国 - 真贋確認に重要"},
    {e:"Microchip",j:"マイクロチップ",def:"Embedded electronic tag (used by Louis Vuitton since 2021)",defJp:"埋め込まれた電子タグ（ルイ・ヴィトンが2021年から使用）"},
    {e:"Clochette",j:"クロシェット",def:"Leather key holder for Hermès lock and keys",defJp:"エルメスの鍵とロック用レザーキーホルダー"},
    {e:"Dust bag / Pouch",j:"保存袋",def:"Protective fabric bag item comes in",defJp:"アイテムが入っている保護布バッグ"},
    {e:"Original receipt",j:"オリジナルレシート",def:"Purchase proof from authorized retailer",defJp:"正規小売店からの購入証明"},
    {e:"Certificate of Authenticity (COA)",j:"真贋証明書",def:"Third-party authentication documentation",defJp:"第三者認証文書"},
    {e:"Entrupy",j:"Entrupy",def:"AI-powered authentication service for luxury goods",defJp:"高級品のAI認証サービス"},
    {e:"Authenticate First / Real Authentication",j:"Authenticate First",def:"Professional authentication services",defJp:"プロフェッショナル認証サービス"}
  ]},
  { cat:"Luxury Leather Types", items:[
    {e:"Caviar leather",j:"キャビアレザー",def:"Chanel's textured, pebbled leather - durable, scratch-resistant",defJp:"シャネルの質感のあるペブルレザー - 耐久性、耐傷性"},
    {e:"Lambskin",j:"ラムスキン",def:"Soft, buttery leather - luxurious but delicate",defJp:"柔らかいバターのようなレザー - 豪華だが繊細"},
    {e:"Calfskin",j:"カーフスキン",def:"Smooth leather from young cow - refined finish",defJp:"若い牛からの滑らかなレザー - 洗練された仕上げ"},
    {e:"Vachetta leather",j:"ヌメ革",def:"Untreated leather that darkens (patina) over time - Louis Vuitton",defJp:"未処理のレザーで時間とともに暗くなる（経年変化） - ルイ・ヴィトン"},
    {e:"Epi leather",j:"エピレザー",def:"Louis Vuitton's textured leather with linear grain pattern",defJp:"線状の粒模様を持つルイ・ヴィトンの質感レザー"},
    {e:"Clemence",j:"クレマンス",def:"Hermès soft, slouchy leather with visible grain",defJp:"エルメスの柔らかくたるみのある粒の見えるレザー"},
    {e:"Togo",j:"トゴ",def:"Hermès grainy leather, more structured than Clemence",defJp:"エルメスの粒状レザー、クレマンスよりも構造的"},
    {e:"Epsom",j:"エプソン",def:"Hermès embossed leather - stiff, holds shape well",defJp:"エルメスの型押しレザー - 硬く、形状をよく保持"},
    {e:"Swift",j:"スウィフト",def:"Hermès smooth, soft leather with slight sheen",defJp:"エルメスの滑らかで柔らかい微光沢のあるレザー"},
    {e:"Box calf",j:"ボックスカーフ",def:"Hermès shiny, formal leather - shows scratches easily",defJp:"エルメスの光沢のあるフォーマルレザー - 傷が付きやすい"},
    {e:"Saffiano",j:"サフィアーノ",def:"Prada's crosshatch-textured calfskin - scratch-resistant",defJp:"プラダのクロスハッチ質感のカーフスキン - 耐傷性"},
    {e:"Guccissima",j:"グッチシマ",def:"Gucci's embossed GG pattern leather",defJp:"グッチの型押しGGパターンレザー"},
    {e:"Nappa leather",j:"ナッパレザー",def:"Soft, supple full-grain leather",defJp:"柔らかくしなやかなフルグレインレザー"},
    {e:"Patent leather",j:"エナメルレザー",def:"Glossy, high-shine coated leather",defJp:"光沢のある高輝度コーティングレザー"},
    {e:"Suede",j:"スエード",def:"Soft, napped leather finish - delicate, stains easily",defJp:"柔らかい起毛レザー仕上げ - 繊細、汚れやすい"},
    {e:"Exotic skins",j:"エキゾチックスキン",def:"Alligator, crocodile, python, ostrich - rare, expensive",defJp:"アリゲーター、クロコダイル、パイソン、オーストリッチ - 希少、高価"}
  ]},
  { cat:"Bag Anatomy & Parts", items:[
    {e:"Flap",j:"フラップ",def:"Fold-over cover on front of bag",defJp:"バッグ前面の折り返しカバー"},
    {e:"Turnlock / Twist lock",j:"ターンロック",def:"Rotating clasp closure (iconic on Chanel Classic Flap)",defJp:"回転式留め金（シャネル クラシックフラップの象徴）"},
    {e:"Magnetic snap",j:"マグネットスナップ",def:"Magnetic closure mechanism",defJp:"マグネット式留め具"},
    {e:"Zipper pull / Zip tab",j:"ジッパープル",def:"Tag attached to zipper for easy opening",defJp:"簡単に開けるためのジッパーに付いたタグ"},
    {e:"Hardware",j:"金具",def:"Metal components - zippers, locks, chains, studs",defJp:"金属部品 - ジッパー、ロック、チェーン、スタッド"},
    {e:"Gold-tone / Silver-tone hardware",j:"ゴールド/シルバー金具",def:"Brass metal plated to look like gold or silver",defJp:"金または銀に見えるようにメッキされた真鍮金属"},
    {e:"Chain strap",j:"チェーンストラップ",def:"Metal chain shoulder strap (Chanel signature)",defJp:"金属チェーンショルダーストラップ（シャネルのシグネチャー）"},
    {e:"Adjustable strap",j:"調節可能ストラップ",def:"Strap with holes or slider to change length",defJp:"長さを変えるための穴またはスライダー付きストラップ"},
    {e:"Detachable strap",j:"取り外し可能ストラップ",def:"Strap that can be removed for different styling",defJp:"異なるスタイリングのために取り外し可能なストラップ"},
    {e:"Sangles",j:"サングル",def:"Hermès Birkin/Kelly shoulder strap (often unused)",defJp:"エルメス バーキン/ケリーのショルダーストラップ（未使用が多い）"},
    {e:"Base / Bottom",j:"底/ベース",def:"Bottom of bag - check for dirt, wear, sagging",defJp:"バッグの底 - 汚れ、摩耗、たるみを確認"},
    {e:"Feet / Studs",j:"スタッズ/足",def:"Metal protectors on bottom corners to prevent wear",defJp:"摩耗を防ぐための底角の金属保護具"},
    {e:"Gusset",j:"マチ",def:"Side panels that give bag depth/width",defJp:"バッグに深さ/幅を与える側面パネル"},
    {e:"Top handle",j:"トップハンドル",def:"Handle on top of bag for hand-carrying",defJp:"手持ち用のバッグ上部のハンドル"},
    {e:"Shoulder strap",j:"ショルダーストラップ",def:"Long strap for wearing bag on shoulder",defJp:"バッグを肩に掛けるための長いストラップ"},
    {e:"Interior pockets",j:"内ポケット",def:"Storage compartments inside bag",defJp:"バッグ内の収納コンパートメント"},
    {e:"Zip pocket",j:"ジップポケット",def:"Zippered compartment for secure storage",defJp:"安全収納用のジッパー付きコンパートメント"},
    {e:"Slip pocket",j:"スリップポケット",def:"Open pocket without closure",defJp:"留め具のないオープンポケット"}
  ]},
  { cat:"Live Streaming Energy Phrases", items:[
    {e:"Who's ready for this?!",j:"準備はいいですか？！",def:"Hype opener to engage audience",defJp:"視聴者を引き込む盛り上げオープナー"},
    {e:"This is FLYING off the shelves!",j:"飛ぶように売れてます！",def:"Create urgency about item popularity",defJp:"アイテムの人気で緊急性を作る"},
    {e:"You don't want to miss this!",j:"これは見逃せない！",def:"Hook viewers to keep watching",defJp:"視聴者を引き留めるフック"},
    {e:"Drop a heart if you want this!",j:"欲しい人はハートを！",def:"Call to action for engagement",defJp:"エンゲージメントのためのコールトゥアクション"},
    {e:"Comment 'MINE' to claim!",j:"「欲しい」とコメント！",def:"Interactive claim mechanic",defJp:"インタラクティブなクレームメカニック"},
    {e:"Let me show you the details!",j:"詳細を見せます！",def:"Transition to close-up examination",defJp:"クローズアップ検査への移行"},
    {e:"Look at this GLOW!",j:"この輝きを見て！",def:"Draw attention to visual appeal",defJp:"視覚的魅力に注目を集める"},
    {e:"Luxury you can FEEL!",j:"感じる高級感！",def:"Emphasize tactile quality",defJp:"触覚的品質を強調"},
    {e:"Investment piece, not just a purchase!",j:"購入ではなく投資！",def:"Position as valuable long-term buy",defJp:"長期的価値のある購入として位置付け"},
    {e:"Grab it before someone else does!",j:"他の人が取る前に！",def:"FOMO (fear of missing out) urgency",defJp:"FOMO（見逃すことへの恐怖）緊急性"},
    {e:"This is a STEAL at this price!",j:"この価格は破格！",def:"Highlight value/deal",defJp:"価値/取引を強調"},
    {e:"Sold out everywhere else!",j:"他では完売！",def:"Create scarcity perception",defJp:"希少性の認識を作る"},
    {e:"Only ONE available!",j:"1点のみ！",def:"Extreme urgency - single item",defJp:"極端な緊急性 - 1点のみ"},
    {e:"Fresh from the boutique!",j:"ブティックから直送！",def:"Emphasize newness and authenticity",defJp:"新しさと本物であることを強調"},
    {e:"Let's start the bidding at $1!",j:"1ドルから始めましょう！",def:"Low starting price hook",defJp:"低開始価格フック"},
    {e:"Who's going to win this beauty?",j:"誰がこの美品を手に入れる？",def:"Competitive framing",defJp:"競争的なフレーミング"},
    {e:"Auction ending in 30 seconds!",j:"30秒で終了！",def:"Final urgency push",defJp:"最終緊急プッシュ"}
  ]},
  { cat:"Damage & Flaw Descriptions (Honest Selling)", items:[
    {e:"Corner wear",j:"角スレ",def:"Rubbing/damage on bag corners from use",defJp:"使用による角の擦れ/ダメージ"},
    {e:"Edge wear",j:"縁スレ",def:"Worn edges along trim or piping",defJp:"トリムやパイピングに沿った摩耗した縁"},
    {e:"Scuffs / Scratches",j:"擦り傷",def:"Surface marks from contact or friction",defJp:"接触または摩擦による表面の跡"},
    {e:"Creasing",j:"しわ",def:"Folds or wrinkles in leather from use",defJp:"使用によるレザーの折り目やしわ"},
    {e:"Sagging",j:"たるみ",def:"Loss of shape/structure from heavy use",defJp:"重い使用による形状/構造の喪失"},
    {e:"Color transfer",j:"色移り",def:"Dye from clothing transferred onto bag (especially light bags)",defJp:"衣類からバッグへの染料移り（特に明るいバッグ）"},
    {e:"Tarnish / Oxidation",j:"変色/酸化",def:"Metal hardware darkening or discoloration",defJp:"金属金具の暗色化または変色"},
    {e:"Sticky residue",j:"べたつき",def:"Adhesive or coating breakdown (common in vintage)",defJp:"接着剤またはコーティングの劣化（ヴィンテージによくある）"},
    {e:"Cracking",j:"ひび割れ",def:"Splits in leather from dryness or age",defJp:"乾燥または経年によるレザーの亀裂"},
    {e:"Peeling",j:"剥がれ",def:"Surface coating coming off (patent leather, canvas)",defJp:"表面コーティングが剥がれる（エナメルレザー、キャンバス）"},
    {e:"Staining",j:"シミ",def:"Discoloration from spills, water, oil",defJp:"こぼれ、水、油による変色"},
    {e:"Pen marks",j:"ペン跡",def:"Ink marks inside bag (very common)",defJp:"バッグ内部のインク跡（非常に一般的）"},
    {e:"Odor / Musty smell",j:"臭い/カビ臭",def:"Unpleasant smell from storage or use",defJp:"保管または使用による不快な臭い"},
    {e:"Missing hardware",j:"金具欠品",def:"Lock, key, or chain missing",defJp:"ロック、鍵、またはチェーンの欠品"},
    {e:"Loose stitching",j:"縫い目のほつれ",def:"Thread coming undone at seams",defJp:"縫い目での糸のほつれ"},
    {e:"Zipper issues",j:"ジッパー不具合",def:"Stuck, broken, or missing teeth",defJp:"詰まり、破損、または歯の欠け"}
  ]},
  { cat:"Pricing & Negotiation Terms", items:[
    {e:"Retail price",j:"定価",def:"Original price at brand boutique",defJp:"ブランドブティックでのオリジナル価格"},
    {e:"Resale value",j:"再販価格",def:"Current secondary market price",defJp:"現在の二次市場価格"},
    {e:"Below retail",j:"定価以下",def:"Selling for less than original price",defJp:"オリジナル価格より安く販売"},
    {e:"Above retail / Premium",j:"定価以上/プレミアム",def:"Rare items selling for more than retail (limited editions, sold-out)",defJp:"小売以上で売れる希少品（限定版、完売品）"},
    {e:"Firm price",j:"価格固定",def:"Not open to negotiation",defJp:"交渉不可"},
    {e:"Best offer",j:"最良オファー",def:"Open to reasonable price negotiations",defJp:"妥当な価格交渉に応じる"},
    {e:"Starting bid",j:"開始価格",def:"Minimum price to begin auction",defJp:"オークション開始の最低価格"},
    {e:"Reserve price",j:"最低落札価格",def:"Hidden minimum price seller will accept",defJp:"売主が受け入れる隠れた最低価格"},
    {e:"Buy It Now (BIN)",j:"即決価格",def:"Fixed price to purchase immediately without bidding",defJp:"入札せずに即購入する固定価格"},
    {e:"Final price / All-in price",j:"最終価格",def:"Price including shipping and fees",defJp:"送料と手数料を含む価格"},
    {e:"Bundle deal",j:"バンドル価格",def:"Discount for buying multiple items together",defJp:"複数アイテムをまとめて購入する割引"},
    {e:"Flash sale",j:"フラッシュセール",def:"Limited-time discount offer",defJp:"期間限定の割引オファー"}
  ]},
  { cat:"Bag Shapes & Patterns", items:[
    {e:"Monogram canvas",j:"モノグラムキャンバス",def:"LV's iconic brown canvas with LV logo pattern - 'The classic. You know it, you love it.'",defJp:"LVの象徴的な茶色のキャンバスとLVロゴパターン - クラシック"},
    {e:"Damier Ebene",j:"ダミエ エベヌ",def:"LV's brown checkered pattern - 'Great if you want LV without the big logos.'",defJp:"LVの茶色のチェッカー柄 - 大きなロゴなしでLVが欲しい人向け"},
    {e:"Damier Azur",j:"ダミエ アズール",def:"LV's light cream/blue checkered pattern - 'Light and fresh. Perfect for summer.'",defJp:"LVの明るいクリーム/ブルーのチェッカー柄 - 夏に完璧"},
    {e:"GG Supreme canvas",j:"GGスプリームキャンバス",def:"Gucci's beige/brown canvas with double G pattern",defJp:"グッチのベージュ/茶色のキャンバスとダブルGパターン"},
    {e:"Oblique canvas",j:"オブリークキャンバス",def:"Diagonal pattern (Dior, Goyard) - slanted logo design",defJp:"斜めパターン（ディオール、ゴヤール） - 斜めロゴデザイン"},
    {e:"Epi leather",j:"エピレザー",def:"LV's textured leather with linear grain pattern - modern, subtle",defJp:"LVの線状粒模様の質感レザー - モダンで控えめ"},
    {e:"Quilted / Matelassé",j:"キルティング",def:"Padded diamond or chevron stitching (Chanel signature)",defJp:"パッド入りダイヤモンドまたはシェブロンステッチ（シャネルのシグネチャー）"},
    {e:"Chevron pattern",j:"シェブロン柄",def:"V-shaped zigzag quilting (Chanel Boy Bag)",defJp:"V字型ジグザグキルティング（シャネル ボーイバッグ）"},
    {e:"Tote shape",j:"トートバッグ型",def:"Open-top bag with parallel handles (LV Neverfull, Goyard St. Louis)",defJp:"平行ハンドルのオープントップバッグ（LV ネヴァーフル、ゴヤール サンルイ）"},
    {e:"Satchel",j:"サッチェル",def:"Structured bag with top handle + shoulder strap (LV Alma, Prada Galleria)",defJp:"トップハンドル+ショルダーストラップの構造的バッグ（LV アルマ、プラダ ガレリア）"},
    {e:"Hobo bag",j:"ホーボーバッグ",def:"Slouchy crescent-shaped bag (Gucci Jackie)",defJp:"たるんだ三日月型バッグ（グッチ ジャッキー）"},
    {e:"Bucket bag",j:"バケツ型バッグ",def:"Cylindrical drawstring bag (LV Noé, Mansur Gavriel Bucket)",defJp:"円筒形の巾着バッグ（LV ノエ、マンサー ガブリエル バケット）"},
    {e:"Saddle bag",j:"サドルバッグ",def:"Curved, saddle-shaped (Dior Saddle)",defJp:"曲がったサドル型（ディオール サドル）"},
    {e:"Baguette",j:"バゲット型",def:"Compact underarm bag (Fendi Baguette)",defJp:"コンパクトな脇下バッグ（フェンディ バゲット）"},
    {e:"Crossbody / Messenger",j:"クロスボディ",def:"Long strap worn across body",defJp:"体を横切って着用する長いストラップ"},
    {e:"Clutch",j:"クラッチ",def:"No strap, handheld evening bag",defJp:"ストラップなし、手持ちイブニングバッグ"}
  ]},
  { cat:"Maintenance & Repair Advice (Pro Tips)", items:[
    {e:"Minor hardware scratches",j:"金具の小傷",def:"Can be buffed with a microfiber cloth. For deeper scratches, jeweler's polishing cloth works.",defJp:"マイクロファイバークロスで磨けます。深い傷には宝石用研磨布が効果的。"},
    {e:"Vachetta patina",j:"ヌメ革の経年変化",def:"Normal and many consider it desirable. Can be lightened with saddle soap but not fully reversed.",defJp:"正常で多くの人が望ましいと考える。サドルソープで薄くできるが完全には戻らない。"},
    {e:"Water stains on vachetta",j:"ヌメ革の水シミ",def:"Can be minimized with leather conditioner. Apply evenly to blend the stain.",defJp:"レザーコンディショナーで最小化できる。均一に塗ってシミを馴染ませる。"},
    {e:"Corner wear",j:"角スレ",def:"Cosmetic only - doesn't affect structure. Professional leather service can re-color and seal.",defJp:"見た目だけ - 構造に影響なし。プロのレザーサービスで再着色と保護できる。"},
    {e:"Pen marks inside",j:"内側のペン跡",def:"Sometimes respond to leather erasers (Mr. Clean Magic Eraser). Test in hidden area first.",defJp:"レザー消しゴム（メラミンスポンジ）で対応できることも。まず隠れた部分でテスト。"},
    {e:"Sticky interior pockets",j:"内ポケットのべたつき",def:"Common in vintage bags. Professional cleaning recommended - home fixes can make it worse.",defJp:"ヴィンテージバッグでよくある。プロのクリーニング推奨 - 自己対処で悪化する可能性。"},
    {e:"Loose stitching",j:"縫い目のほつれ",def:"Minor loose threads can be carefully trimmed. Structural issues need professional repair.",defJp:"軽い糸のほつれは慎重にカット可能。構造的問題はプロの修理が必要。"},
    {e:"Tarnished hardware",j:"変色した金具",def:"Brass polish (like Brasso) works for severe tarnish. Available at Home Depot/hardware stores.",defJp:"ひどい変色には真鍮磨き（Brasso）が効果的。ホームデポ/金物店で入手可。"},
    {e:"Dry leather",j:"乾燥したレザー",def:"Apply leather conditioner (Leather Honey, Cadillac). Restores moisture and flexibility.",defJp:"レザーコンディショナー（Leather Honey、Cadillac）を塗る。水分と柔軟性を回復。"},
    {e:"Musty odor",j:"カビ臭",def:"Air out for 48 hours. Place baking soda sachet inside. Activated charcoal also works.",defJp:"48時間風通し。中に重曹袋を入れる。活性炭も効果的。"},
    {e:"Color transfer",j:"色移り",def:"Leather cleaner + gentle rubbing. Light colors are more prone - recommend protective sprays.",defJp:"レザークリーナー+優しく擦る。明るい色は移りやすい - 保護スプレー推奨。"},
    {e:"Zipper issues",j:"ジッパー不具合",def:"Graphite pencil on teeth helps stuck zippers. Broken pull tab? Replacement available online.",defJp:"詰まったジッパーには歯に鉛筆の芯を塗る。引き手が壊れた？オンラインで交換部品入手可。"},
    {e:"Canvas peeling",j:"キャンバスの剥がれ",def:"SHOULD NOT happen on authentic LV - canvas is coated fabric, not glued. If peeling, authentication concern.",defJp:"本物のLVでは起きない - キャンバスはコーティング布、接着ではない。剥がれたら真贋に懸念。"},
    {e:"Storage tips",j:"保管のコツ",def:"Stuff with tissue, store in dust bag, cool dry place, away from sunlight. Prevents sagging.",defJp:"ティッシュで詰め、保存袋に入れ、涼しく乾燥した場所、日光を避ける。たるみ防止。"},
    {e:"Hardware protective film",j:"金具の保護フィルム",def:"NWT bags often have this. 'You can remove it or keep it - some buyers prefer it pristine.'",defJp:"新品タグ付きによくある。「取るも残すも自由 - 未使用を好むバイヤーもいる」"},
    {e:"Professional leather spa",j:"プロのレザースパ",def:"Services like Leather Spa, Rago Brothers, or local cobblers. For major restoration.",defJp:"Leather Spa、Rago Brothers、地元の靴修理店など。大規模修復用。"}
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
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      streak: 0,
      lastVisit: new Date().toDateString(),
      modulesCompleted: { brands: 0, live: 0, vocab: 0, practice: 0 },
      badges: [],
      stats: {
        namesRead: 0,
        conditionsDescribed: 0,
        conversationsCompleted: 0,
        itemsSold: 0,
        practiceMinutes: 0,
        gamesPlayed: 0
      },
      confidenceRatings: [],
      achievements: []
    };
  });

  // Badge definitions
  const BADGES = {
    en: [
      { id: "first_practice", icon: "🎯", name: "First Steps", desc: "Complete your first practice game", check: (p) => p.stats.gamesPlayed >= 1 },
      { id: "name_master", icon: "🎙️", name: "Name Master", desc: "Read 100 buyer names", check: (p) => p.stats.namesRead >= 100 },
      { id: "speed_demon", icon: "⚡", name: "Speed Demon", desc: "Score 400+ in Speed Auction", check: (p) => p.achievements.includes("speed_400") },
      { id: "condition_pro", icon: "🔍", name: "Condition Pro", desc: "Describe 30 items accurately", check: (p) => p.stats.conditionsDescribed >= 30 },
      { id: "ai_graduate", icon: "🤖", name: "AI Graduate", desc: "Complete all 4 AI training modes", check: (p) => p.achievements.includes("ai_all_complete") },
      { id: "week_warrior", icon: "🔥", name: "Week Warrior", desc: "Maintain 7-day streak", check: (p) => p.streak >= 7 },
      { id: "seller_pro", icon: "💼", name: "Seller Pro", desc: "Sell 20+ items in simulations", check: (p) => p.stats.itemsSold >= 20 },
      { id: "level_10", icon: "⭐", name: "Rising Star", desc: "Reach Level 10", check: (p) => p.level >= 10 },
      { id: "conversation_ace", icon: "💬", name: "Conversation Ace", desc: "Complete 10 AI conversations", check: (p) => p.stats.conversationsCompleted >= 10 },
      { id: "dedication", icon: "🏆", name: "Dedicated Learner", desc: "Practice for 60+ minutes total", check: (p) => p.stats.practiceMinutes >= 60 },
    ],
    jp: [
      { id: "first_practice", icon: "🎯", name: "最初の一歩", desc: "最初の練習ゲームを完了", check: (p) => p.stats.gamesPlayed >= 1 },
      { id: "name_master", icon: "🎙️", name: "名前マスター", desc: "100個のバイヤー名を読む", check: (p) => p.stats.namesRead >= 100 },
      { id: "speed_demon", icon: "⚡", name: "スピードデーモン", desc: "スピードオークションで400+スコア", check: (p) => p.achievements.includes("speed_400") },
      { id: "condition_pro", icon: "🔍", name: "コンディションプロ", desc: "30個のアイテムを正確に説明", check: (p) => p.stats.conditionsDescribed >= 30 },
      { id: "ai_graduate", icon: "🤖", name: "AI卒業生", desc: "4つのAIトレーニングモードすべて完了", check: (p) => p.achievements.includes("ai_all_complete") },
      { id: "week_warrior", icon: "🔥", name: "週間ウォリアー", desc: "7日間ストリーク維持", check: (p) => p.streak >= 7 },
      { id: "seller_pro", icon: "💼", name: "セラープロ", desc: "シミュレーションで20+アイテム販売", check: (p) => p.stats.itemsSold >= 20 },
      { id: "level_10", icon: "⭐", name: "ライジングスター", desc: "レベル10到達", check: (p) => p.level >= 10 },
      { id: "conversation_ace", icon: "💬", name: "会話エース", desc: "AI会話を10回完了", check: (p) => p.stats.conversationsCompleted >= 10 },
      { id: "dedication", icon: "🏆", name: "献身的な学習者", desc: "合計60分以上練習", check: (p) => p.stats.practiceMinutes >= 60 },
    ]
  };

  const tabs = lang==="en" ? ["Home","Brands","6-Step Framework","Stream Formats","Vocab","Practice"] : ["ホーム","ブランド","6ステップ","配信形式","用語集","練習"];
  const icons = ["🏠","👜","📡","🎬","💬","🎯"];

  // Check for newly earned badges
  const checkBadges = (updatedPlayerData) => {
    const badges = BADGES[lang];
    const earnedBadges = badges.filter(b => b.check(updatedPlayerData) && !updatedPlayerData.badges.includes(b.id));

    if (earnedBadges.length > 0) {
      const newBadgeIds = earnedBadges.map(b => b.id);
      const updated = {
        ...updatedPlayerData,
        badges: [...updatedPlayerData.badges, ...newBadgeIds]
      };
      setPlayerData(updated);
      localStorage.setItem('ebay-live-player', JSON.stringify(updated));

      // Play badge unlock sound
      playBadgeUnlock();

      // Show badge notification
      earnedBadges.forEach(badge => {
        setTimeout(() => {
          alert(`🎉 ${lang === "en" ? "Badge Earned!" : "バッジ獲得！"}\n\n${badge.icon} ${badge.name}\n${badge.desc}`);
        }, 500);
      });

      return updated;
    }
    return updatedPlayerData;
  };

  // Update streak on visit
  // XP earning handler
  const handleXpEarned = (amount, statUpdates = {}) => {
    const oldLevel = playerData.level;
    const newXp = playerData.xp + amount;
    const newLevel = Math.floor(newXp / 100) + 1;
    const newStats = { ...playerData.stats };

    // Update stats if provided
    Object.keys(statUpdates).forEach(key => {
      if (newStats[key] !== undefined) {
        newStats[key] += statUpdates[key];
      }
    });

    // Always increment games played
    newStats.gamesPlayed += 1;

    let updated = {
      ...playerData,
      xp: newXp,
      level: newLevel,
      stats: newStats
    };

    // Play level up sound if leveled up
    if (newLevel > oldLevel) {
      playLevelUp();
    } else {
      playSuccess();
    }

    // Check for newly earned badges
    updated = checkBadges(updated);

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
        @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}
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

          /* Mobile Responsive Adjustments */
          @media (max-width: 768px) {
            .ebay-content {
              padding: 20px 16px !important;
            }
          }

          /* Touch-friendly button sizes */
          @media (max-width: 768px) {
            button {
              min-height: 44px !important;
            }
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
              <div onClick={()=>setPage(0)} style={{ fontSize:18, fontWeight:700, color:"#3665F3", cursor:"pointer" }}>
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
          {page===3 && <LiveContentTypesP lang={lang} />}
          {page===4 && <EnglishP lang={lang} />}
          {page===5 && <PracticeP lang={lang} onXpEarned={handleXpEarned} />}
        </div>
      </div>
    </div>
  );
}

/* ═══ IMPROVEMENT ANALYTICS DASHBOARD ═══ */
function ImprovementAnalytics({ lang, playerData }) {
  // Calculate improvements based on historical data
  const stats = playerData.stats || {};
  const ratings = playerData.confidenceRatings || [];

  const improvements = [];

  // Confidence improvement
  if (ratings.length >= 2) {
    const first = ratings[0].rating;
    const latest = ratings[ratings.length - 1].rating;
    const change = latest - first;
    if (change > 0) {
      improvements.push({
        icon: "📈",
        title: lang === "en" ? "Confidence Growing" : "自信が成長",
        before: lang === "en" ? `Started at ${first}/5` : `開始時${first}/5`,
        after: lang === "en" ? `Now ${latest}/5` : `現在${latest}/5`,
        change: `+${change}`,
        positive: true
      });
    }
  }

  // Level progression
  if (playerData.level >= 5) {
    improvements.push({
      icon: "⭐",
      title: lang === "en" ? "Level Progress" : "レベル進行",
      before: lang === "en" ? "Started at Level 1" : "レベル1から開始",
      after: lang === "en" ? `Now Level ${playerData.level}` : `現在レベル${playerData.level}`,
      change: `+${playerData.level - 1}`,
      positive: true
    });
  }

  // Practice consistency (streak)
  if (playerData.streak >= 3) {
    improvements.push({
      icon: "🔥",
      title: lang === "en" ? "Building Consistency" : "一貫性構築",
      before: lang === "en" ? "Practicing occasionally" : "たまに練習",
      after: lang === "en" ? `${playerData.streak}-day streak` : `${playerData.streak}日連続`,
      change: lang === "en" ? "Daily habit!" : "毎日の習慣！",
      positive: true
    });
  }

  // Skills mastery
  const totalSkills = (stats.namesRead || 0) + (stats.conditionsDescribed || 0) + (stats.conversationsCompleted || 0);
  if (totalSkills >= 50) {
    improvements.push({
      icon: "🎯",
      title: lang === "en" ? "Skills Mastery" : "スキル習得",
      before: lang === "en" ? "Beginner" : "初心者",
      after: lang === "en" ? `${totalSkills} skills practiced` : `${totalSkills}スキル練習`,
      change: lang === "en" ? "Advancing!" : "上達中！",
      positive: true
    });
  }

  // No improvements yet
  if (improvements.length === 0) {
    return null;
  }

  return (
    <div style={{
      background:"#FFFFFF",
      border:"2px solid #E5E7EB",
      borderRadius:12,
      padding:"24px",
      marginBottom:24
    }}>
      <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:16 }}>
        💪 {lang === "en" ? "Your Improvement Journey" : "あなたの改善の旅"}
      </div>
      <div style={{ display:"grid", gap:16 }}>
        {improvements.map((item, i) => (
          <div
            key={i}
            style={{
              background:"linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)",
              border:"2px solid #3665F3",
              borderRadius:12,
              padding:"16px",
              display:"flex",
              alignItems:"center",
              gap:16
            }}
          >
            <div style={{ fontSize:40 }}>{item.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:6 }}>
                {item.title}
              </div>
              <div style={{ fontSize:14, color:"#6B7280", marginBottom:4 }}>
                {item.before} → {item.after}
              </div>
              <div style={{
                fontSize:14,
                fontWeight:700,
                color: item.positive ? "#86B817" : "#E53238"
              }}>
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Encouragement */}
      <div style={{
        marginTop:16,
        padding:16,
        background:"#F7F7F7",
        borderRadius:8,
        textAlign:"center"
      }}>
        <p style={{ fontSize:15, color:"#191919", margin:0, lineHeight:1.6 }}>
          {lang === "en"
            ? "🌟 You're making real progress! Keep practicing to unlock more achievements."
            : "🌟 本当に進歩しています！練習を続けてもっと達成を解除しましょう。"}
        </p>
      </div>
    </div>
  );
}

/* ═══ CONFIDENCE TRACKER COMPONENT ═══ */
function ConfidenceTracker({ lang, playerData, onRatingSubmit }) {
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const ratings = playerData.confidenceRatings || [];
  const lastRating = ratings.length > 0 ? ratings[ratings.length - 1] : null;
  const daysSinceLastRating = lastRating ? Math.floor((Date.now() - new Date(lastRating.date).getTime()) / (1000 * 60 * 60 * 24)) : 999;
  const shouldShowPrompt = daysSinceLastRating >= 7; // Weekly check-in

  const handleSubmit = () => {
    if (selectedRating) {
      onRatingSubmit(selectedRating);
      setShowRating(false);
      setSelectedRating(null);
    }
  };

  if (showRating) {
    return (
      <div style={{
        background:"linear-gradient(135deg, #3665F3 0%, #E53238 100%)",
        borderRadius:12,
        padding:24,
        marginBottom:24,
        color:"#FFFFFF"
      }}>
        <h3 style={{ fontSize:20, fontWeight:700, marginBottom:12 }}>
          💭 {lang === "en" ? "How confident do you feel about going live?" : "ライブ配信にどれくらい自信がありますか？"}
        </h3>
        <p style={{ fontSize:14, opacity:0.9, marginBottom:20 }}>
          {lang === "en"
            ? "Rate your confidence from 1 (nervous) to 5 (ready!). We'll track your growth over time."
            : "1（緊張）から5（準備万端！）で自信度を評価してください。時間経過とともに成長を追跡します。"}
        </p>

        <div style={{ display:"flex", gap:12, marginBottom:20, justifyContent:"center" }}>
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              style={{
                width:60,
                height:60,
                borderRadius:12,
                border: selectedRating === rating ? "3px solid #F5AF02" : "2px solid rgba(255,255,255,0.3)",
                background: selectedRating === rating ? "#F5AF02" : "rgba(255,255,255,0.1)",
                color:"#FFFFFF",
                fontSize:24,
                fontWeight:700,
                cursor:"pointer",
                transition:"all 0.2s"
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              {rating}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", gap:12 }}>
          <button
            onClick={handleSubmit}
            disabled={!selectedRating}
            style={{
              flex:1,
              background: selectedRating ? "#F5AF02" : "rgba(255,255,255,0.2)",
              color:"#FFFFFF",
              border:"none",
              borderRadius:8,
              padding:"12px",
              fontSize:16,
              fontWeight:700,
              cursor: selectedRating ? "pointer" : "not-allowed"
            }}
          >
            {lang === "en" ? "Submit Rating" : "評価を送信"}
          </button>
          <button
            onClick={() => setShowRating(false)}
            style={{
              background:"rgba(255,255,255,0.1)",
              color:"#FFFFFF",
              border:"1px solid rgba(255,255,255,0.3)",
              borderRadius:8,
              padding:"12px 24px",
              fontSize:16,
              fontWeight:700,
              cursor:"pointer"
            }}
          >
            {lang === "en" ? "Skip" : "スキップ"}
          </button>
        </div>
      </div>
    );
  }

  if (shouldShowPrompt && !showRating) {
    return (
      <div style={{
        background:"#EFF6FF",
        border:"2px solid #3665F3",
        borderRadius:12,
        padding:20,
        marginBottom:24,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:16
      }}>
        <div>
          <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:4 }}>
            💭 {lang === "en" ? "Weekly Confidence Check" : "週間自信度チェック"}
          </div>
          <div style={{ fontSize:14, color:"#4B5563" }}>
            {lang === "en"
              ? "How are you feeling this week? Rate your confidence!"
              : "今週の気分はどうですか？自信度を評価しましょう！"}
          </div>
        </div>
        <button
          onClick={() => setShowRating(true)}
          style={{
            background:"#3665F3",
            color:"#FFFFFF",
            border:"none",
            borderRadius:8,
            padding:"12px 24px",
            fontSize:15,
            fontWeight:700,
            cursor:"pointer",
            whiteSpace:"nowrap"
          }}
        >
          {lang === "en" ? "Rate Now" : "今すぐ評価"}
        </button>
      </div>
    );
  }

  // Show confidence trend if we have ratings
  if (ratings.length > 0) {
    const avgConfidence = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    const trend = ratings.length >= 2
      ? ratings[ratings.length - 1].rating - ratings[ratings.length - 2].rating
      : 0;

    return (
      <div style={{
        background:"#FFFFFF",
        border:"2px solid #E5E7EB",
        borderRadius:12,
        padding:20,
        marginBottom:24
      }}>
        <h3 style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:16 }}>
          💭 {lang === "en" ? "Your Confidence Journey" : "あなたの自信の旅"}
        </h3>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(120px, 1fr))", gap:12, marginBottom:16 }}>
          <div style={{ textAlign:"center", background:"#F7F7F7", borderRadius:8, padding:12 }}>
            <div style={{ fontSize:24, fontWeight:700, color:"#3665F3" }}>
              {lastRating.rating}/5
            </div>
            <div style={{ fontSize:12, color:"#6B7280" }}>
              {lang === "en" ? "Latest" : "最新"}
            </div>
          </div>
          <div style={{ textAlign:"center", background:"#F7F7F7", borderRadius:8, padding:12 }}>
            <div style={{ fontSize:24, fontWeight:700, color:"#86B817" }}>
              {avgConfidence.toFixed(1)}
            </div>
            <div style={{ fontSize:12, color:"#6B7280" }}>
              {lang === "en" ? "Average" : "平均"}
            </div>
          </div>
          <div style={{ textAlign:"center", background:"#F7F7F7", borderRadius:8, padding:12 }}>
            <div style={{ fontSize:24, fontWeight:700, color: trend > 0 ? "#86B817" : trend < 0 ? "#E53238" : "#9CA3AF" }}>
              {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"} {Math.abs(trend)}
            </div>
            <div style={{ fontSize:12, color:"#6B7280" }}>
              {lang === "en" ? "Trend" : "傾向"}
            </div>
          </div>
        </div>

        {trend > 0 && (
          <div style={{ background:"#ECFDF5", border:"1px solid #86B817", borderRadius:8, padding:12, fontSize:14, color:"#191919" }}>
            🎉 {lang === "en"
              ? "Great progress! Your confidence is growing!"
              : "素晴らしい進歩！自信が育っています！"}
          </div>
        )}
      </div>
    );
  }

  return null;
}

/* ═══ HOME ═══ */
function HomeP({ lang, setPage, playerData }) {
  const xpToNextLevel = 100;
  const xpProgress = (playerData.xp % xpToNextLevel) / xpToNextLevel * 100;
  const totalModules = 4;
  const completedCount = Object.values(playerData.modulesCompleted).filter(v => v >= 100).length;

  const handleConfidenceRating = (rating) => {
    const newRating = {
      rating,
      date: new Date().toISOString(),
      level: playerData.level,
      xp: playerData.xp
    };
    const updated = {
      ...playerData,
      confidenceRatings: [...(playerData.confidenceRatings || []), newRating]
    };
    localStorage.setItem('ebay-live-player', JSON.stringify(updated));
    window.location.reload(); // Refresh to show new rating
  };

  // Get badge data
  const BADGES = {
    en: [
      { id: "first_practice", icon: "🎯", name: "First Steps", desc: "Complete your first practice game" },
      { id: "name_master", icon: "🎙️", name: "Name Master", desc: "Read 100 buyer names" },
      { id: "speed_demon", icon: "⚡", name: "Speed Demon", desc: "Score 400+ in Speed Auction" },
      { id: "condition_pro", icon: "🔍", name: "Condition Pro", desc: "Describe 30 items accurately" },
      { id: "ai_graduate", icon: "🤖", name: "AI Graduate", desc: "Complete all 4 AI modes" },
      { id: "week_warrior", icon: "🔥", name: "Week Warrior", desc: "7-day streak" },
      { id: "seller_pro", icon: "💼", name: "Seller Pro", desc: "Sell 20+ items" },
      { id: "level_10", icon: "⭐", name: "Rising Star", desc: "Reach Level 10" },
      { id: "conversation_ace", icon: "💬", name: "Conversation Ace", desc: "10 AI conversations" },
      { id: "dedication", icon: "🏆", name: "Dedicated", desc: "60+ min practice" },
    ],
    jp: [
      { id: "first_practice", icon: "🎯", name: "最初の一歩", desc: "最初の練習完了" },
      { id: "name_master", icon: "🎙️", name: "名前マスター", desc: "100個の名前を読む" },
      { id: "speed_demon", icon: "⚡", name: "スピードデーモン", desc: "400+スコア" },
      { id: "condition_pro", icon: "🔍", name: "コンディションプロ", desc: "30個正確説明" },
      { id: "ai_graduate", icon: "🤖", name: "AI卒業生", desc: "AI4モード完了" },
      { id: "week_warrior", icon: "🔥", name: "週間ウォリアー", desc: "7日連続" },
      { id: "seller_pro", icon: "💼", name: "セラープロ", desc: "20+販売" },
      { id: "level_10", icon: "⭐", name: "ライジングスター", desc: "レベル10" },
      { id: "conversation_ace", icon: "💬", name: "会話エース", desc: "10回会話" },
      { id: "dedication", icon: "🏆", name: "献身的", desc: "60分以上" },
    ]
  };

  const earnedBadges = BADGES[lang].filter(b => (playerData.badges || []).includes(b.id));
  const availableBadges = BADGES[lang].filter(b => !(playerData.badges || []).includes(b.id));

  const dailyChallenges = [
    { en: "Practice 5 condition descriptions in under 30 seconds", jp: "30秒以内に5つのコンディション説明を練習" },
    { en: "Read 10 buyer names without hesitation", jp: "10人のバイヤー名を迷わず読む" },
    { en: "Master 5 new vocabulary terms", jp: "5つの新しい用語をマスター" },
    { en: "Complete a mock live simulation", jp: "模擬ライブシミュレーションを完了" }
  ];
  const todayChallenge = dailyChallenges[new Date().getDay() % dailyChallenges.length];

  const stats = playerData.stats || {};
  const readyChecklist = [
    { en: "✓ Greeted 50+ buyers confidently", jp: "✓ 50人以上のバイヤーに自信を持って挨拶", done: (stats.namesRead || 0) >= 50 },
    { en: "✓ Described 30+ conditions accurately", jp: "✓ 30個以上のコンディションを正確に説明", done: (stats.conditionsDescribed || 0) >= 30 },
    { en: "✓ Answered 20+ tough questions", jp: "✓ 20個以上の難しい質問に回答", done: (stats.conversationsCompleted || 0) >= 5 },
    { en: "✓ Completed 3-day practice streak", jp: "✓ 3日間の練習ストリーク達成", done: playerData.streak >= 3 },
    { en: "✓ Reached Level 5", jp: "✓ レベル5到達", done: playerData.level >= 5 },
    { en: "✓ Practiced with AI buyers", jp: "✓ AIバイヤーと練習", done: (stats.conversationsCompleted || 0) >= 1 }
  ];

  const checklistComplete = readyChecklist.filter(item => item.done).length;
  const readinessPercent = Math.round((checklistComplete / readyChecklist.length) * 100);

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

      {/* Badges Section */}
      {earnedBadges.length > 0 && (
        <div style={{ background:"#FFFFFF", border:"2px solid #86B817", borderRadius:12, padding:"24px", marginBottom:24 }}>
          <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:16 }}>
            🏆 {lang==="en"?"Your Badges":"あなたのバッジ"} ({earnedBadges.length}/{BADGES[lang].length})
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {earnedBadges.map((badge, i) => (
              <div
                key={i}
                title={badge.desc}
                style={{
                  background:"linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
                  border:"2px solid #86B817",
                  borderRadius:12,
                  padding:"12px 16px",
                  display:"flex",
                  alignItems:"center",
                  gap:8,
                  cursor:"help"
                }}
              >
                <span style={{ fontSize:24 }}>{badge.icon}</span>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#191919" }}>{badge.name}</div>
                  <div style={{ fontSize:12, color:"#6B7280" }}>{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Overview */}
      {playerData.stats && (
        <div style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, padding:"24px", marginBottom:24 }}>
          <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:16 }}>
            📊 {lang==="en"?"Your Progress":"あなたの進捗"}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))", gap:12 }}>
            {[
              { icon: "🎮", label: lang==="en"?"Games Played":"ゲームプレイ", value: playerData.stats.gamesPlayed || 0 },
              { icon: "🎙️", label: lang==="en"?"Names Read":"名前読み", value: playerData.stats.namesRead || 0 },
              { icon: "🔍", label: lang==="en"?"Items Described":"説明済み", value: playerData.stats.conditionsDescribed || 0 },
              { icon: "💬", label: lang==="en"?"Conversations":"会話回数", value: playerData.stats.conversationsCompleted || 0 },
              { icon: "💼", label: lang==="en"?"Items Sold":"販売済み", value: playerData.stats.itemsSold || 0 },
              { icon: "⏱️", label: lang==="en"?"Minutes":"分", value: playerData.stats.practiceMinutes || 0 },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background:"#F7F7F7",
                  borderRadius:8,
                  padding:"12px",
                  textAlign:"center"
                }}
              >
                <div style={{ fontSize:24, marginBottom:4 }}>{stat.icon}</div>
                <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:2 }}>{stat.value}</div>
                <div style={{ fontSize:12, color:"#6B7280" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confidence Tracker */}
      <ConfidenceTracker lang={lang} playerData={playerData} onRatingSubmit={handleConfidenceRating} />

      {/* Improvement Analytics */}
      <ImprovementAnalytics lang={lang} playerData={playerData} />

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
          { icon:"📡", name:lang==="en"?"Live Strategies":"ライブ戦略", desc:lang==="en"?"6-step framework & formats":"6ステップ＆配信形式", page:2, progress:playerData.modulesCompleted.live || 0 },
          { icon:"💬", name:lang==="en"?"Vocabulary":"用語集", desc:lang==="en"?"Professional terms & phrases":"専門用語とフレーズ", page:4, progress:playerData.modulesCompleted.vocab || 0 },
          { icon:"🎯", name:lang==="en"?"Practice":"練習", desc:lang==="en"?"Interactive drills":"インタラクティブドリル", page:5, progress:playerData.modulesCompleted.practice || 0 }
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
      <div style={{
        background: readinessPercent === 100 ? "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)" : "#FFFFFF",
        border: `2px solid ${readinessPercent === 100 ? "#86B817" : "#E5E7EB"}`,
        borderRadius:12,
        padding:"24px",
        marginBottom:24
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontSize:20, fontWeight:700, color:"#191919" }}>
            🚀 {lang==="en"?"Ready to Go Live?":"ライブ配信の準備はOK？"}
          </div>
          <div style={{
            background: readinessPercent === 100 ? "#86B817" : readinessPercent >= 50 ? "#F5AF02" : "#E5E7EB",
            color:"#FFFFFF",
            padding:"6px 16px",
            borderRadius:20,
            fontSize:14,
            fontWeight:700
          }}>
            {readinessPercent}% {lang==="en"?"Ready":"準備完了"}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ background:"#E5E7EB", height:8, borderRadius:8, marginBottom:20, overflow:"hidden" }}>
          <div style={{
            background: readinessPercent === 100 ? "#86B817" : "linear-gradient(90deg, #3665F3, #F5AF02)",
            height:"100%",
            width:`${readinessPercent}%`,
            transition:"width 0.5s"
          }}></div>
        </div>

        {/* Checklist Items */}
        {readyChecklist.map((item,i)=>(
          <div key={i} style={{
            display:"flex",
            alignItems:"center",
            gap:12,
            padding:"12px 0",
            borderBottom:i<readyChecklist.length-1?"1px solid #F3F4F6":"none"
          }}>
            <div style={{ fontSize:24 }}>{item.done?"✅":"⬜"}</div>
            <div style={{
              fontSize:16,
              color:item.done?"#86B817":"#6B7280",
              fontWeight:item.done?600:400,
              textDecoration:item.done?"line-through":"none"
            }}>
              {lang==="en"?item.en:item.jp}
            </div>
          </div>
        ))}

        {/* Celebration Message */}
        {readinessPercent === 100 && (
          <div style={{
            marginTop:20,
            padding:16,
            background:"#86B817",
            borderRadius:8,
            textAlign:"center",
            color:"#FFFFFF",
            animation:"fu 0.5s ease"
          }}>
            <div style={{ fontSize:32, marginBottom:8 }}>🎉</div>
            <div style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>
              {lang==="en"?"You're Ready to Go Live!":"ライブ配信の準備完了！"}
            </div>
            <div style={{ fontSize:14 }}>
              {lang==="en"
                ?"You've mastered all the essentials. Time to shine on eBay Live!"
                :"すべての基本をマスターしました。eBay Liveで輝く時です！"}
            </div>
          </div>
        )}
      </div>

      {/* Data Export/Import */}
      <div style={{
        background:"#FFFFFF",
        border:"2px solid #E5E7EB",
        borderRadius:12,
        padding:"24px",
        marginBottom:24
      }}>
        <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:12 }}>
          💾 {lang==="en"?"Backup & Restore":"バックアップ＆復元"}
        </div>
        <p style={{ fontSize:14, color:"#6B7280", marginBottom:16, lineHeight:1.6 }}>
          {lang==="en"
            ?"Save your progress data to a file or restore from a previous backup. Your XP, badges, stats, and confidence ratings will be preserved."
            :"進捗データをファイルに保存したり、以前のバックアップから復元できます。XP、バッジ、統計、自信評価が保持されます。"}
        </p>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(playerData, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `ebay-live-backup-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            style={{
              background:"#3665F3",
              color:"#FFFFFF",
              border:"none",
              borderRadius:8,
              padding:"12px 20px",
              fontSize:15,
              fontWeight:600,
              cursor:"pointer",
              display:"flex",
              alignItems:"center",
              gap:8
            }}
          >
            📥 {lang==="en"?"Export Data":"データをエクスポート"}
          </button>
          <label style={{
            background:"#F7F7F7",
            color:"#191919",
            border:"2px solid #E5E7EB",
            borderRadius:8,
            padding:"12px 20px",
            fontSize:15,
            fontWeight:600,
            cursor:"pointer",
            display:"flex",
            alignItems:"center",
            gap:8
          }}>
            📤 {lang==="en"?"Import Data":"データをインポート"}
            <input
              type="file"
              accept=".json"
              style={{ display:"none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const importedData = JSON.parse(event.target.result);
                      // Validate data structure
                      if (importedData && typeof importedData.xp === 'number') {
                        localStorage.setItem('ebay-live-player', JSON.stringify(importedData));
                        window.location.reload();
                      } else {
                        alert(lang==="en"?"Invalid backup file":"無効なバックアップファイル");
                      }
                    } catch (err) {
                      alert(lang==="en"?"Error reading file":"ファイル読み込みエラー");
                    }
                  };
                  reader.readAsText(file);
                }
              }}
            />
          </label>
          <button
            onClick={() => {
              if (confirm(lang==="en"
                ?"Are you sure you want to reset all progress? This cannot be undone."
                :"すべての進捗をリセットしてもよろしいですか？この操作は元に戻せません。")) {
                localStorage.removeItem('ebay-live-player');
                window.location.reload();
              }
            }}
            style={{
              background:"#FEF3C7",
              color:"#D97706",
              border:"2px solid #F59E0B",
              borderRadius:8,
              padding:"12px 20px",
              fontSize:15,
              fontWeight:600,
              cursor:"pointer",
              display:"flex",
              alignItems:"center",
              gap:8
            }}
          >
            🔄 {lang==="en"?"Reset Progress":"進捗をリセット"}
          </button>
        </div>
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
  const [selBrand, setSelBrand] = useState(null);
  const [selModel, setSelModel] = useState(null);

  // Model detail view
  if (selBrand !== null && selModel !== null) {
    const brand = BRAND_DATA[selBrand];
    const model = brand.models[selModel];
    return (
      <div style={{ animation:"fu 0.3s ease" }}>
        <button onClick={()=>setSelModel(null)} style={{background:"#f3f4f6",border:"none",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:600,color:"#4b5563",marginBottom:24}}>
          ← {lang==="en"?"Back to Models":"モデル一覧に戻る"}
        </button>

        {/* Model Header */}
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:14, color:"#6b7280", marginBottom:4 }}>{brand.name}</div>
          <div style={{ fontSize:36, fontWeight:800, color:"#1a1a2e", marginBottom:12 }}>{model.name}</div>
          <div style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, marginBottom:16 }}>
            {lang==="en"?model.desc:model.descJp}
          </div>
        </div>

        {/* Shape */}
        <div style={{ marginBottom:24, background:"#F7F7F7", padding:"20px", borderRadius:12 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#3665F3", marginBottom:8, textTransform:"uppercase" }}>
            {lang==="en"?"SHAPE & STYLE":"形状とスタイル"}
          </div>
          <div style={{ fontSize:15, color:"#191919" }}>
            {lang==="en"?model.shape:model.shapeJp}
          </div>
        </div>

        {/* Sizes */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#86B817", marginBottom:12, textTransform:"uppercase" }}>
            {lang==="en"?"SIZES":"サイズ"}
          </div>
          <div style={{ display:"grid", gap:8 }}>
            {model.sizes.map((s,i)=>(
              <div key={i} style={{ background:"#ECFDF5", padding:"12px 16px", borderRadius:8, borderLeft:"3px solid #86B817" }}>
                <div style={{ fontSize:15, fontWeight:600, color:"#191919", marginBottom:4 }}>{s.name}</div>
                <div style={{ fontSize:14, color:"#4B5563" }}>{s.dim}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rare/Collectible */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#F5AF02", marginBottom:12, textTransform:"uppercase" }}>
            {lang==="en"?"RARE & COLLECTIBLE":"レア・コレクティブル"}
          </div>
          <p style={{ fontSize:15, color:"#191919", lineHeight:1.8, background:"#FFFBEB", padding:"16px 20px", borderRadius:12, borderLeft:"4px solid #F5AF02" }}>
            {lang==="en"?model.rare:model.rareJp}
          </p>
        </div>

        {/* Selling Tip */}
        <div style={{ background:"#EFF6FF", padding:"20px", borderRadius:12, borderLeft:"4px solid #3665F3" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#3665F3", marginBottom:8 }}>
            💡 {lang==="en"?"PRO SELLING TIP":"プロの販売テクニック"}
          </div>
          <p style={{ fontSize:15, color:"#191919", lineHeight:1.7, margin:0, fontStyle:"italic" }}>
            "{lang==="en"?model.tip:model.tipJp}"
          </p>
        </div>
      </div>
    );
  }

  // Brand model list view
  if (selBrand !== null) {
    const brand = BRAND_DATA[selBrand];
    return (
      <div style={{ animation:"fu 0.3s ease" }}>
        <button onClick={()=>setSelBrand(null)} style={{background:"#f3f4f6",border:"none",padding:"10px 20px",borderRadius:10,cursor:"pointer",fontSize:15,fontWeight:600,color:"#4b5563",marginBottom:24}}>
          ← {lang==="en"?"Back to Brands":"ブランド一覧に戻る"}
        </button>

        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:36, fontWeight:800, color:"#1a1a2e", marginBottom:4 }}>{brand.name}</div>
          <div style={{ fontSize:16, color:"#6b7280" }}>Founded {brand.year}, {brand.country}</div>
        </div>

        {/* Auth Info */}
        <div style={{ marginBottom:32, background:"#ECFDF5", padding:"20px", borderRadius:12, borderLeft:"4px solid #86B817" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#86B817", marginBottom:8 }}>
            ✓ {lang==="en"?"AUTHENTICATION":"真贋確認"}
          </div>
          <p style={{ fontSize:15, color:"#191919", lineHeight:1.7, margin:0 }}>
            {lang==="en"?brand.auth:brand.authJp}
          </p>
        </div>

        {/* Models */}
        <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:16 }}>
          {lang==="en"?"Classic Models":"クラシックモデル"}
        </div>
        <div style={{ display:"grid", gap:12 }}>
          {brand.models.map((m,i)=>(
            <button key={i} onClick={()=>setSelModel(i)} style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, padding:"16px 20px", cursor:"pointer", textAlign:"left", transition:"all 0.2s", fontFamily:"inherit" }}
              onMouseEnter={e=>e.target.style.borderColor="#3665F3"}
              onMouseLeave={e=>e.target.style.borderColor="#E5E7EB"}>
              <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:4 }}>{m.name}</div>
              <div style={{ fontSize:14, color:"#4B5563" }}>{lang==="en"?m.brief:m.briefJp}</div>
            </button>
          ))}
        </div>

        {/* Rare Items */}
        <div style={{ marginTop:32, background:"#FEF3C7", padding:"20px", borderRadius:12, borderLeft:"4px solid #F5AF02" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#F5AF02", marginBottom:8 }}>
            ⭐ {lang==="en"?"RARE & DISCONTINUED":"レア・廃盤"}
          </div>
          <p style={{ fontSize:15, color:"#191919", lineHeight:1.7, margin:0 }}>
            {lang==="en"?brand.rare:brand.rareJp}
          </p>
        </div>

        {/* Selling Tip */}
        <div style={{ marginTop:24, background:"#EFF6FF", padding:"20px", borderRadius:12, borderLeft:"4px solid #3665F3" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#3665F3", marginBottom:8 }}>
            💡 {lang==="en"?"PRO SELLING TIP":"プロの販売テクニック"}
          </div>
          <p style={{ fontSize:15, color:"#191919", lineHeight:1.7, margin:0, fontStyle:"italic" }}>
            "{lang==="en"?brand.tip:brand.tipJp}"
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
        {Object.keys(BRAND_DATA).map((key)=>{
          const b = BRAND_DATA[key];
          return (
            <button key={key} onClick={()=>setSelBrand(key)} style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, padding:"24px", cursor:"pointer", transition:"all 0.2s", textAlign:"left", fontFamily:"inherit", width:"100%" }}
              onMouseEnter={e => {e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="#3665F3"; e.currentTarget.style.boxShadow="0 8px 16px rgba(54,101,243,0.15)"}}
              onMouseLeave={e => {e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#E5E7EB"; e.currentTarget.style.boxShadow="none"}}>
              <div style={{ fontSize:24, fontWeight:700, color:"#191919", marginBottom:6 }}>{b.name}</div>
              <div style={{ fontSize:14, color:"#6b7280", marginBottom:16, fontWeight:400 }}>Founded {b.year}, {b.country}</div>
              <div style={{ fontSize:14, color:"#4B5563", marginBottom:12, fontWeight:400 }}>
                <strong style={{ fontWeight:700 }}>{lang==="en"?"Models":"モデル"}:</strong> {b.models.length} {lang==="en"?"classic models":"クラシックモデル"}
              </div>
              <div style={{ fontSize:14, color:"#3665F3", fontWeight:700 }}>
                {lang==="en"?"Explore Models →":"モデルを見る →"}
              </div>
            </button>
          );
        })}
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
        {[["framework",lang==="en"?"6-Step Framework":"6ステップフレームワーク"],["content",lang==="en"?"Stream Formats":"配信形式"]].map(([k,l])=>(
          <button key={k} onClick={()=>setView(k)} style={{ padding:"10px 20px", borderRadius:0, background:"none", color:view===k?"#3B1FC6":"#191919", borderBottom:view===k?"3px solid #3B1FC6":"3px solid transparent", cursor:"pointer", fontFamily:"inherit", fontSize:15, fontWeight:view===k?700:400, border:"none", transition:"all 0.2s" }}>{l}</button>
        ))}
      </div>

      {/* FRAMEWORK */}
      {view==="framework" && data.map((step, si) => (
        <div key={si} style={{ marginBottom:16 }}>
          <div
            onClick={()=>setOpenStep(openStep===si?null:si)}
            style={{
              display:"flex",
              alignItems:"flex-start",
              gap:16,
              background:"#FFFFFF",
              border:`2px solid ${openStep===si?step.color:"#E5E7EB"}`,
              borderRadius:12,
              padding:"20px 24px",
              cursor:"pointer",
              transition:"all 0.2s",
              boxShadow: openStep===si ? `0 4px 12px ${step.color}33` : "none"
            }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
          >
            <span style={{ fontSize:40, lineHeight:1 }}>{step.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:19, fontWeight:700, color:"#191919", marginBottom:6 }}>{step.step}</div>
              <div style={{ fontSize:15, color:"#6B7280", marginBottom:12, lineHeight:1.5 }}>{step.sub}</div>

              {/* Show section preview */}
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                {step.sections.map((sec, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize:13,
                      color:step.color,
                      background:`${step.color}15`,
                      padding:"4px 10px",
                      borderRadius:6,
                      fontWeight:600
                    }}
                  >
                    {sec.t}
                  </span>
                ))}
              </div>

              <div style={{ fontSize:13, color:step.color, fontWeight:700, marginTop:4 }}>
                {openStep===si
                  ? (lang==="en"?"▼ Hide Details":"▼ 詳細を隠す")
                  : (lang==="en"?"▶ Explore Framework":"▶ フレームワークを見る")}
              </div>
            </div>
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

/* ═══ LIVE POLICY (STANDALONE) ═══ */
function LivePolicyP({ lang }) {
  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang==="en"?"eBay Live Policy & Compliance":"eBay Liveポリシー＆コンプライアンス"}
        </h1>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Essential rules and guidelines for eBay Live streaming. Follow these policies to maintain your selling privileges and build trust with buyers."
            :"eBayライブ配信の必須ルールとガイドライン。販売特権を維持しバイヤーとの信頼を構築するためにこれらのポリシーに従ってください。"}
        </p>
      </div>

      {/* Policy Sections */}
      {LIVE_KB.policy[lang].map((p,i) => (
        <div key={i} style={{
          background:"#FFFFFF",
          borderRadius:12,
          padding:"24px 28px",
          marginBottom:16,
          border:"2px solid #E5E7EB",
          transition:"all 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#E53238"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
          <div style={{ fontSize:22, fontWeight:700, color:"#191919", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:32 }}>{p.emoji}</span>
            <span>{p.name}</span>
          </div>
          <div style={{ display:"grid", gap:12 }}>
            {p.points.map((pt,j)=>(
              <div key={j} style={{
                fontSize:15,
                color:"#191919",
                lineHeight:1.8,
                paddingLeft:16,
                borderLeft:"4px solid #E53238",
                fontWeight:400,
                background:"#FEF2F2",
                padding:"12px 16px",
                borderRadius:8
              }}>
                {pt}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Important Notice */}
      <div style={{
        background:"linear-gradient(135deg, #E53238 0%, #F5AF02 100%)",
        borderRadius:12,
        padding:"24px 28px",
        color:"#FFFFFF",
        marginTop:24
      }}>
        <div style={{ fontSize:20, fontWeight:700, marginBottom:12 }}>
          ⚠️ {lang==="en"?"Important Reminder":"重要な注意事項"}
        </div>
        <div style={{ fontSize:15, lineHeight:1.8 }}>
          {lang==="en"
            ?"Violating eBay Live policies can result in suspension of live selling privileges or account restrictions. Always prioritize transparency, accuracy, and buyer safety. When in doubt, disclose more rather than less."
            :"eBay Liveポリシー違反はライブ販売特権の停止またはアカウント制限につながる可能性があります。常に透明性、正確性、バイヤーの安全を優先してください。疑わしい場合は、少なく開示するよりも多く開示してください。"}
        </div>
      </div>
    </div>
  );
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
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      // Play warning sound when time is running out
      if (timeLeft === 10 || timeLeft === 5) {
        playWarning();
      }
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

    // Initialize voice recognition if voice mode enabled
    if (voiceMode && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('Heard:', transcript);
        // If user speaks, automatically move to next (we can't verify accuracy, so trust them)
        if (transcript.length > 0) {
          handleNext();
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        if (gameState === "playing" && voiceMode) {
          recognition.start(); // Keep listening
        }
      };

      recognition.start();
      setIsListening(true);
      recognitionRef.current = recognition;
    }
  };

  const handleNext = () => {
    if (currentNameIndex < shuffledNames.length - 1) {
      playClick();
      setCurrentNameIndex(currentNameIndex + 1);
      setScore(score + 1);
    }
  };

  const handleRestart = () => {
    // Stop any existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    startGame();
  };

  // Cleanup voice recognition when game ends
  useEffect(() => {
    if (gameState === "finished" && recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
    }
  }, [gameState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === "playing" && !voiceMode) {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          handleNext();
        }
      } else if (gameState === "ready" && e.code === "Enter") {
        e.preventDefault();
        startGame();
      } else if (gameState === "finished" && e.code === "Enter") {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, voiceMode, currentNameIndex, shuffledNames.length, score]);

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

        {/* Voice Mode Toggle */}
        {'webkitSpeechRecognition' in window && (
          <div style={{
            background:"#F7F7F7",
            borderRadius:12,
            padding:"16px 20px",
            marginBottom:24,
            display:"inline-flex",
            alignItems:"center",
            gap:12,
            cursor:"pointer"
          }}
          onClick={() => setVoiceMode(!voiceMode)}>
            <div style={{
              width:50,
              height:28,
              borderRadius:20,
              background: voiceMode ? "#3665F3" : "#D1D5DB",
              position:"relative",
              transition:"all 0.2s"
            }}>
              <div style={{
                width:22,
                height:22,
                borderRadius:"50%",
                background:"#FFFFFF",
                position:"absolute",
                top:3,
                left: voiceMode ? 25 : 3,
                transition:"all 0.2s",
                boxShadow:"0 1px 3px rgba(0,0,0,0.2)"
              }}></div>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:"#191919", marginBottom:2 }}>
                🎤 {lang === "en" ? "Voice Mode" : "音声モード"}
              </div>
              <div style={{ fontSize:13, color:"#6B7280" }}>
                {lang === "en" ? "Auto-advance when you speak" : "音声で自動的に次へ"}
              </div>
            </div>
          </div>
        )}

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

        {/* Voice Mode Indicator */}
        {voiceMode && isListening && (
          <div style={{
            background:"#86B817",
            color:"#FFFFFF",
            padding:"12px 20px",
            borderRadius:12,
            marginBottom:16,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:8,
            fontSize:14,
            fontWeight:600
          }}>
            <span style={{ fontSize:20, animation:"pulse 1.5s infinite" }}>🎤</span>
            {lang === "en" ? "Voice Mode Active - Speak to continue" : "音声モード有効 - 話すと次へ"}
          </div>
        )}

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

        {/* Next Button - hide in voice mode */}
        {!voiceMode && (
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
        )}

        <div style={{ textAlign:"center", marginTop:16, fontSize:14, color:"#9CA3AF" }}>
          {currentNameIndex + 1} / {shuffledNames.length} names
          {!voiceMode && (
            <div style={{ marginTop:8, fontSize:12, opacity:0.7 }}>
              ⌨️ {lang==="en"?"Press Space or Enter to continue":"スペースまたはEnterで次へ"}
            </div>
          )}
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

/* ═══ SPEED AUCTION GAME ═══ */
function SpeedAuctionGame({ lang, onComplete }) {
  const [gameState, setGameState] = useState("ready"); // ready, playing, results
  const [currentItem, setCurrentItem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [itemsCompleted, setItemsCompleted] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const totalRounds = 5;

  const auctionItems = {
    en: [
      { name: "Louis Vuitton Speedy 30", color: "Monogram Brown", condition: "Very Good", issues: ["Corner wear", "Light patina"], startBid: "$400", image: "👜" },
      { name: "Chanel Classic Flap Medium", color: "Black Caviar", condition: "Excellent", issues: ["Minor hardware scratches"], startBid: "$3,500", image: "👛" },
      { name: "Hermès Birkin 35", color: "Gold Clemence", condition: "Excellent", issues: ["Pristine condition"], startBid: "$8,000", image: "💼" },
      { name: "Gucci Marmont Small", color: "Red Matelassé", condition: "Good", issues: ["Chain kinks", "Minor scuffs"], startBid: "$600", image: "👝" },
      { name: "Prada Galleria Saffiano", color: "Black", condition: "Very Good", issues: ["Interior pen mark"], startBid: "$900", image: "💼" },
      { name: "Dior Lady Dior Medium", color: "Rose Ballerine", condition: "Excellent", issues: ["Light corner wear"], startBid: "$2,800", image: "👜" },
      { name: "Bottega Veneta Intrecciato", color: "Tan", condition: "Good", issues: ["Handle creasing", "Light stains"], startBid: "$550", image: "👝" },
      { name: "Fendi Baguette", color: "Zucca Canvas", condition: "Fair", issues: ["Visible wear", "Lining tears"], startBid: "$350", image: "👛" },
    ],
    jp: [
      { name: "ルイ・ヴィトン スピーディ30", color: "モノグラムブラウン", condition: "Very Good", issues: ["角スレ", "軽いパティーナ"], startBid: "$400", image: "👜" },
      { name: "シャネル クラシックフラップ M", color: "ブラックキャビア", condition: "Excellent", issues: ["金具に軽い傷"], startBid: "$3,500", image: "👛" },
      { name: "エルメス バーキン35", color: "ゴールドクレマンス", condition: "Excellent", issues: ["美品"], startBid: "$8,000", image: "💼" },
      { name: "グッチ マーモント スモール", color: "レッドマトラッセ", condition: "Good", issues: ["チェーンに歪み", "軽いスレ"], startBid: "$600", image: "👝" },
      { name: "プラダ ガレリア サフィアーノ", color: "ブラック", condition: "Very Good", issues: ["内側にペン跡"], startBid: "$900", image: "💼" },
      { name: "ディオール レディディオール M", color: "ローズバレリーヌ", condition: "Excellent", issues: ["軽い角スレ"], startBid: "$2,800", image: "👜" },
      { name: "ボッテガ・ヴェネタ イントレチャート", color: "タン", condition: "Good", issues: ["ハンドルにシワ", "軽いシミ"], startBid: "$550", image: "👝" },
      { name: "フェンディ バゲット", color: "ズッカキャンバス", condition: "Fair", issues: ["使用感あり", "裏地破れ"], startBid: "$350", image: "👛" },
    ]
  };

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeUp();
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    const items = auctionItems[lang];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
    setCurrentRound(0);
    setItemsCompleted(0);
    setTotalScore(0);
    setTimeLeft(30);
    setGameState("playing");
  };

  const handleTimeUp = () => {
    // Partial credit for time spent
    const timeUsed = 30 - timeLeft;
    const points = Math.max(10, 30 - timeUsed); // Less time = more points
    setTotalScore(totalScore + points);
    setItemsCompleted(itemsCompleted + 1);

    if (currentRound < totalRounds - 1) {
      // Next round
      const items = auctionItems[lang];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setCurrentItem(randomItem);
      setCurrentRound(currentRound + 1);
      setTimeLeft(30);
    } else {
      // Game over
      setGameState("results");
      if (onComplete) onComplete(itemsCompleted);
    }
  };

  const handleComplete = () => {
    const points = Math.max(50, 100 - (30 - timeLeft) * 2); // Faster = better score
    setTotalScore(totalScore + points);
    setItemsCompleted(itemsCompleted + 1);

    if (currentRound < totalRounds - 1) {
      // Next round
      const items = auctionItems[lang];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setCurrentItem(randomItem);
      setCurrentRound(currentRound + 1);
      setTimeLeft(30);
    } else {
      // Game over
      setGameState("results");
      if (onComplete) onComplete(itemsCompleted);
    }
  };

  const handleRestart = () => {
    startGame();
  };

  if (gameState === "ready") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>⚡</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "Speed Auction" : "スピードオークション"}
        </h2>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, marginBottom:24, maxWidth:500, margin:"0 auto 24px" }}>
          {lang === "en"
            ? "A luxury item appears with details. You have 30 seconds to announce the starting bid, describe the condition, and highlight key features OUT LOUD. Tap 'Done' when finished. Fast + complete = high score!"
            : "高級品が詳細と共に表示されます。30秒以内に開始価格を発表し、状態を説明し、重要な特徴を声に出して言いましょう。完了したら「完了」をタップ。速く完全に = 高得点！"}
        </p>
        <div style={{
          background:"#F7F7F7",
          borderRadius:12,
          padding:20,
          marginBottom:24,
          maxWidth:450,
          margin:"0 auto 24px"
        }}>
          <div style={{ fontSize:14, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, fontWeight:600 }}>
            {lang === "en" ? "What To Say:" : "何を言うか："}
          </div>
          <div style={{ fontSize:14, color:"#191919", lineHeight:1.8, textAlign:"left" }}>
            1. {lang === "en" ? "Starting bid amount" : "開始価格"}<br />
            2. {lang === "en" ? "Item name & brand" : "アイテム名とブランド"}<br />
            3. {lang === "en" ? "Color & material" : "色と素材"}<br />
            4. {lang === "en" ? "Condition level" : "コンディションレベル"}<br />
            5. {lang === "en" ? "ALL visible issues" : "すべての見える問題"}<br />
            6. {lang === "en" ? "Closing phrase (\"Going once, going twice...\")" : "締めのフレーズ"}
          </div>
        </div>
        <button
          onClick={startGame}
          style={{
            background:"#F5AF02",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 48px",
            fontSize:20,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          {lang === "en" ? "🎯 Start Auction" : "🎯 オークション開始"}
        </button>
      </div>
    );
  }

  if (gameState === "playing" && currentItem) {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div style={{ fontSize:16, color:"#9CA3AF", fontWeight:600 }}>
            {lang === "en" ? "Round" : "ラウンド"} {currentRound + 1} / {totalRounds}
          </div>
          <div style={{
            background: timeLeft <= 10 ? "#FEF2F2" : "#EFF6FF",
            border: `2px solid ${timeLeft <= 10 ? "#E53238" : "#3665F3"}`,
            borderRadius:12,
            padding:"8px 20px",
            fontSize:24,
            fontWeight:700,
            color: timeLeft <= 10 ? "#E53238" : "#3665F3",
            minWidth:80,
            textAlign:"center",
            animation: timeLeft <= 5 ? "pulse 0.5s infinite" : "none"
          }}>
            {timeLeft}s
          </div>
        </div>

        {/* Item Card */}
        <div style={{
          background:"#F7F7F7",
          borderRadius:12,
          padding:24,
          marginBottom:24,
          border:"2px solid #E5E7EB"
        }}>
          <div style={{ fontSize:64, textAlign:"center", marginBottom:16 }}>{currentItem.image}</div>
          <h3 style={{ fontSize:24, fontWeight:700, color:"#191919", marginBottom:16, textAlign:"center" }}>
            {currentItem.name}
          </h3>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div>
              <div style={{ fontSize:12, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>
                {lang === "en" ? "Color" : "色"}
              </div>
              <div style={{ fontSize:16, fontWeight:600, color:"#191919" }}>{currentItem.color}</div>
            </div>
            <div>
              <div style={{ fontSize:12, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>
                {lang === "en" ? "Condition" : "状態"}
              </div>
              <div style={{ fontSize:16, fontWeight:600, color:"#191919" }}>{currentItem.condition}</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize:12, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>
              {lang === "en" ? "Issues to Mention" : "言及すべき問題"}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {currentItem.issues.map((issue, i) => (
                <span key={i} style={{
                  background:"#FFFFFF",
                  border:"1px solid #E5E7EB",
                  borderRadius:8,
                  padding:"6px 12px",
                  fontSize:14,
                  color:"#191919"
                }}>
                  {issue}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            marginTop:16,
            padding:16,
            background:"#ECFDF5",
            borderRadius:8,
            border:"2px solid #86B817"
          }}>
            <div style={{ fontSize:12, color:"#86B817", fontWeight:700, marginBottom:4 }}>
              {lang === "en" ? "STARTING BID" : "開始価格"}
            </div>
            <div style={{ fontSize:28, fontWeight:700, color:"#191919" }}>{currentItem.startBid}</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleComplete}
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
          {lang === "en" ? "✓ I Described Everything!" : "✓ すべて説明しました！"}
        </button>

        <div style={{ textAlign:"center", marginTop:16, fontSize:14, color:"#9CA3AF" }}>
          {lang === "en"
            ? "Say it all out loud, then tap the button!"
            : "声に出して言ったら、ボタンをタップ！"}
        </div>
      </div>
    );
  }

  if (gameState === "results") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
        <h2 style={{ fontSize:32, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang === "en" ? "Auction Complete!" : "オークション完了！"}
        </h2>

        <div style={{
          background:"linear-gradient(135deg, #F5AF02 0%, #E53238 100%)",
          borderRadius:12,
          padding:24,
          marginBottom:24,
          color:"#FFFFFF"
        }}>
          <div style={{ fontSize:16, marginBottom:8, opacity:0.9 }}>
            {lang === "en" ? "Total Score" : "合計スコア"}
          </div>
          <div style={{ fontSize:48, fontWeight:700 }}>{totalScore}</div>
          <div style={{ fontSize:14, marginTop:8, opacity:0.8 }}>
            {itemsCompleted} {lang === "en" ? "items sold" : "アイテム販売"}
          </div>
        </div>

        <div style={{
          background: totalScore >= 400 ? "#ECFDF5" : totalScore >= 300 ? "#EFF6FF" : "#FEF3C7",
          padding:"16px 24px",
          borderRadius:12,
          marginBottom:24,
          border:`2px solid ${totalScore >= 400 ? "#86B817" : totalScore >= 300 ? "#3665F3" : "#F5AF02"}`
        }}>
          <p style={{ fontSize:16, color:"#191919", fontWeight:600, margin:0 }}>
            {totalScore >= 400
              ? (lang === "en" ? "🌟 Pro Auctioneer! Fast and thorough!" : "🌟 プロオークショニア！速くて丁寧！")
              : totalScore >= 300
              ? (lang === "en" ? "💪 Great pace! Keep practicing completeness!" : "💪 いいペース！完全性を練習し続けて！")
              : (lang === "en" ? "👍 Good start! Focus on speed + mentioning all issues!" : "👍 いいスタート！速度と全問題への言及に集中！")}
          </p>
        </div>

        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button
            onClick={handleRestart}
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
            {lang === "en" ? "🔄 Sell More" : "🔄 もっと販売"}
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
}

/* ═══ FLASHCARD MODE ═══ */
function FlashcardMode({ lang, onComplete }) {
  const [gameState, setGameState] = useState("ready");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState([]);
  const [unknownCards, setUnknownCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [deckType, setDeckType] = useState(null);

  const flashcardDecks = {
    en: {
      conditions: [
        { q: "Brand new", a: "新品", type: "condition" },
        { q: "NWT - New With Tags", a: "タグ付き新品", type: "condition" },
        { q: "Unused", a: "未使用", type: "condition" },
        { q: "Like new", a: "ほぼ新品", type: "condition" },
        { q: "Excellent condition", a: "非常に良い", type: "condition" },
        { q: "Very good condition", a: "とても良い", type: "condition" },
        { q: "Good condition", a: "良い", type: "condition" },
        { q: "Fair condition", a: "使用感あり", type: "condition" },
        { q: "Pre-loved", a: "プリラブド", type: "condition" },
        { q: "Minor scratches", a: "軽い傷", type: "damage" },
        { q: "Scuffs", a: "スレ傷", type: "damage" },
        { q: "Corner wear", a: "角スレ", type: "damage" },
        { q: "Stains", a: "シミ", type: "damage" },
        { q: "Fading", a: "色あせ", type: "damage" },
        { q: "Peeling", a: "剥がれ", type: "damage" },
        { q: "Cracks/Cracking", a: "ひび", type: "damage" },
        { q: "Odor", a: "匂い", type: "damage" },
        { q: "Patina", a: "経年変化（ヌメ革）", type: "damage" },
        { q: "Tarnishing", a: "金具のくすみ", type: "damage" },
        { q: "Loose stitching", a: "ほつれ", type: "damage" },
      ],
      brands: [
        { q: "Louis Vuitton", a: "ルイ・ヴィトン", type: "brand" },
        { q: "Chanel", a: "シャネル", type: "brand" },
        { q: "Hermès", a: "エルメス", type: "brand" },
        { q: "Gucci", a: "グッチ", type: "brand" },
        { q: "Prada", a: "プラダ", type: "brand" },
        { q: "Dior", a: "ディオール", type: "brand" },
        { q: "Fendi", a: "フェンディ", type: "brand" },
        { q: "Bottega Veneta", a: "ボッテガ・ヴェネタ", type: "brand" },
        { q: "Speedy", a: "スピーディ", type: "model" },
        { q: "Neverfull", a: "ネヴァーフル", type: "model" },
        { q: "Birkin", a: "バーキン", type: "model" },
        { q: "Kelly", a: "ケリー", type: "model" },
        { q: "Classic Flap", a: "クラシックフラップ", type: "model" },
        { q: "Boy Bag", a: "ボーイバッグ", type: "model" },
      ],
      materials: [
        { q: "Monogram Canvas", a: "モノグラムキャンバス", type: "material" },
        { q: "Damier Ebene", a: "ダミエ エベヌ", type: "material" },
        { q: "Damier Azur", a: "ダミエ アズール", type: "material" },
        { q: "Calfskin", a: "カーフスキン", type: "material" },
        { q: "Lambskin", a: "ラムレザー", type: "material" },
        { q: "Caviar Leather", a: "キャビアレザー", type: "material" },
        { q: "Epi Leather", a: "エピレザー", type: "material" },
        { q: "Vachetta", a: "ヌメ革", type: "material" },
        { q: "Saffiano", a: "サフィアーノ", type: "material" },
        { q: "Patent Leather", a: "エナメル", type: "material" },
      ]
    },
    jp: {
      conditions: [
        { q: "新品", a: "Brand new", type: "condition" },
        { q: "タグ付き新品", a: "NWT - New With Tags", type: "condition" },
        { q: "未使用", a: "Unused", type: "condition" },
        { q: "ほぼ新品", a: "Like new", type: "condition" },
        { q: "非常に良い", a: "Excellent condition", type: "condition" },
        { q: "とても良い", a: "Very good condition", type: "condition" },
        { q: "良い", a: "Good condition", type: "condition" },
        { q: "使用感あり", a: "Fair condition", type: "condition" },
        { q: "プリラブド", a: "Pre-loved", type: "condition" },
        { q: "軽い傷", a: "Minor scratches", type: "damage" },
        { q: "スレ傷", a: "Scuffs", type: "damage" },
        { q: "角スレ", a: "Corner wear", type: "damage" },
        { q: "シミ", a: "Stains", type: "damage" },
        { q: "色あせ", a: "Fading", type: "damage" },
        { q: "剥がれ", a: "Peeling", type: "damage" },
        { q: "ひび", a: "Cracks/Cracking", type: "damage" },
        { q: "匂い", a: "Odor", type: "damage" },
        { q: "経年変化（ヌメ革）", a: "Patina", type: "damage" },
        { q: "金具のくすみ", a: "Tarnishing", type: "damage" },
        { q: "ほつれ", a: "Loose stitching", type: "damage" },
      ],
      brands: [
        { q: "ルイ・ヴィトン", a: "Louis Vuitton", type: "brand" },
        { q: "シャネル", a: "Chanel", type: "brand" },
        { q: "エルメス", a: "Hermès", type: "brand" },
        { q: "グッチ", a: "Gucci", type: "brand" },
        { q: "プラダ", a: "Prada", type: "brand" },
        { q: "ディオール", a: "Dior", type: "brand" },
        { q: "フェンディ", a: "Fendi", type: "brand" },
        { q: "ボッテガ・ヴェネタ", a: "Bottega Veneta", type: "brand" },
        { q: "スピーディ", a: "Speedy", type: "model" },
        { q: "ネヴァーフル", a: "Neverfull", type: "model" },
        { q: "バーキン", a: "Birkin", type: "model" },
        { q: "ケリー", a: "Kelly", type: "model" },
        { q: "クラシックフラップ", a: "Classic Flap", type: "model" },
        { q: "ボーイバッグ", a: "Boy Bag", type: "model" },
      ],
      materials: [
        { q: "モノグラムキャンバス", a: "Monogram Canvas", type: "material" },
        { q: "ダミエ エベヌ", a: "Damier Ebene", type: "material" },
        { q: "ダミエ アズール", a: "Damier Azur", type: "material" },
        { q: "カーフスキン", a: "Calfskin", type: "material" },
        { q: "ラムレザー", a: "Lambskin", type: "material" },
        { q: "キャビアレザー", a: "Caviar Leather", type: "material" },
        { q: "エピレザー", a: "Epi Leather", type: "material" },
        { q: "ヌメ革", a: "Vachetta", type: "material" },
        { q: "サフィアーノ", a: "Saffiano", type: "material" },
        { q: "エナメル", a: "Patent Leather", type: "material" },
      ]
    }
  };

  const startDeck = (type) => {
    const selectedDeck = [...flashcardDecks[lang][type]].sort(() => Math.random() - 0.5);
    setDeck(selectedDeck);
    setDeckType(type);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setKnownCards([]);
    setUnknownCards([]);
    setGameState("playing");
  };

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleKnow = () => {
    setKnownCards([...knownCards, deck[currentCardIndex]]);
    nextCard();
  };

  const handleDontKnow = () => {
    setUnknownCards([...unknownCards, deck[currentCardIndex]]);
    nextCard();
  };

  const nextCard = () => {
    setShowAnswer(false);
    if (currentCardIndex < deck.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setGameState("results");
      if (onComplete) onComplete(knownCards.length);
    }
  };

  const handleRestart = () => {
    setGameState("ready");
    setDeckType(null);
  };

  if (gameState === "ready") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🎴</div>
          <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
            {lang === "en" ? "Flashcard Mode" : "フラッシュカードモード"}
          </h2>
          <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, maxWidth:500, margin:"0 auto" }}>
            {lang === "en"
              ? "Test your vocabulary! See a term, guess the meaning, flip to check. Swipe right if you know it, left if you need to practice more."
              : "語彙をテスト！用語を見て、意味を推測し、フリップして確認。知っていたら右、もっと練習が必要なら左にスワイプ。"}
          </p>
        </div>

        <div style={{ display:"grid", gap:12, maxWidth:600, margin:"0 auto" }}>
          {[
            { type: "conditions", icon: "✅", name: lang === "en" ? "Condition Terms" : "コンディション用語", count: flashcardDecks[lang].conditions.length },
            { type: "brands", icon: "👜", name: lang === "en" ? "Brands & Models" : "ブランド＆モデル", count: flashcardDecks[lang].brands.length },
            { type: "materials", icon: "🧵", name: lang === "en" ? "Materials" : "素材", count: flashcardDecks[lang].materials.length },
          ].map((deck, i) => (
            <button
              key={i}
              onClick={() => startDeck(deck.type)}
              style={{
                background:"#FFFFFF",
                border:"2px solid #E5E7EB",
                borderRadius:12,
                padding:"20px 24px",
                cursor:"pointer",
                transition:"all 0.2s",
                textAlign:"left",
                display:"flex",
                alignItems:"center",
                gap:16
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#3665F3";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#E5E7EB";
              }}
            >
              <span style={{ fontSize:32 }}>{deck.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:4 }}>
                  {deck.name}
                </div>
                <div style={{ fontSize:14, color:"#9CA3AF" }}>
                  {deck.count} {lang === "en" ? "cards" : "カード"}
                </div>
              </div>
              <div style={{
                background:"#3665F3",
                color:"#FFFFFF",
                padding:"8px 16px",
                borderRadius:8,
                fontSize:14,
                fontWeight:700
              }}>
                {lang === "en" ? "Start" : "開始"}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === "playing") {
    const currentCard = deck[currentCardIndex];
    const progress = ((currentCardIndex + 1) / deck.length) * 100;

    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        {/* Progress */}
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:14, color:"#9CA3AF", fontWeight:600 }}>
              {currentCardIndex + 1} / {deck.length}
            </span>
            <span style={{ fontSize:14, color:"#86B817", fontWeight:700 }}>
              {knownCards.length} {lang === "en" ? "known" : "既知"}
            </span>
          </div>
          <div style={{ background:"#E5E7EB", height:8, borderRadius:8, overflow:"hidden" }}>
            <div style={{
              background:"linear-gradient(90deg, #3665F3, #86B817)",
              height:"100%",
              width:`${progress}%`,
              transition:"width 0.3s ease"
            }}></div>
          </div>
        </div>

        {/* Card */}
        <div
          onClick={handleFlip}
          style={{
            background: showAnswer ? "#ECFDF5" : "#EFF6FF",
            border: `3px solid ${showAnswer ? "#86B817" : "#3665F3"}`,
            borderRadius:16,
            padding:64,
            textAlign:"center",
            cursor:"pointer",
            transition:"all 0.3s ease",
            marginBottom:24,
            minHeight:250,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          <div style={{
            fontSize:12,
            color: showAnswer ? "#86B817" : "#3665F3",
            textTransform:"uppercase",
            letterSpacing:2,
            fontWeight:700,
            marginBottom:16
          }}>
            {showAnswer ? (lang === "en" ? "Answer" : "答え") : (lang === "en" ? "Question" : "質問")}
          </div>
          <div style={{
            fontSize:36,
            fontWeight:700,
            color:"#191919",
            lineHeight:1.4
          }}>
            {showAnswer ? currentCard.a : currentCard.q}
          </div>
          {!showAnswer && (
            <div style={{
              fontSize:14,
              color:"#9CA3AF",
              marginTop:24
            }}>
              {lang === "en" ? "Tap to reveal" : "タップして表示"}
            </div>
          )}
        </div>

        {/* Actions */}
        {showAnswer ? (
          <div style={{ display:"flex", gap:12 }}>
            <button
              onClick={handleDontKnow}
              style={{
                flex:1,
                background:"#FEF2F2",
                border:"2px solid #E53238",
                borderRadius:12,
                padding:"16px",
                fontSize:18,
                fontWeight:700,
                color:"#E53238",
                cursor:"pointer",
                transition:"all 0.2s"
              }}
              onMouseEnter={e => e.target.style.background = "#FEE2E2"}
              onMouseLeave={e => e.target.style.background = "#FEF2F2"}
            >
              ← {lang === "en" ? "Need Practice" : "要練習"}
            </button>
            <button
              onClick={handleKnow}
              style={{
                flex:1,
                background:"#86B817",
                border:"2px solid #86B817",
                borderRadius:12,
                padding:"16px",
                fontSize:18,
                fontWeight:700,
                color:"#FFFFFF",
                cursor:"pointer",
                transition:"all 0.2s"
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              {lang === "en" ? "I Know It" : "知ってる"} →
            </button>
          </div>
        ) : (
          <div style={{ textAlign:"center", color:"#9CA3AF", fontSize:14 }}>
            {lang === "en" ? "Think of the answer, then tap the card" : "答えを考えたら、カードをタップ"}
          </div>
        )}
      </div>
    );
  }

  if (gameState === "results") {
    const accuracy = Math.round((knownCards.length / deck.length) * 100);

    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>
          {accuracy >= 80 ? "🎉" : accuracy >= 60 ? "💪" : "📚"}
        </div>
        <h2 style={{ fontSize:32, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang === "en" ? "Deck Complete!" : "デッキ完了！"}
        </h2>

        <div style={{
          background:"linear-gradient(135deg, #3665F3 0%, #86B817 100%)",
          borderRadius:12,
          padding:24,
          marginBottom:24,
          color:"#FFFFFF"
        }}>
          <div style={{ fontSize:16, marginBottom:8, opacity:0.9 }}>
            {lang === "en" ? "Accuracy" : "正確性"}
          </div>
          <div style={{ fontSize:48, fontWeight:700 }}>{accuracy}%</div>
          <div style={{ fontSize:14, marginTop:8, opacity:0.8 }}>
            {knownCards.length} / {deck.length} {lang === "en" ? "correct" : "正解"}
          </div>
        </div>

        {unknownCards.length > 0 && (
          <div style={{
            background:"#FFFBEB",
            border:"2px solid #F5AF02",
            borderRadius:12,
            padding:20,
            marginBottom:24,
            textAlign:"left"
          }}>
            <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:12 }}>
              {lang === "en" ? "📝 Review These:" : "📝 復習が必要："}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {unknownCards.slice(0, 5).map((card, i) => (
                <div key={i} style={{
                  background:"#FFFFFF",
                  borderRadius:8,
                  padding:"12px 16px",
                  fontSize:14,
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center"
                }}>
                  <span style={{ fontWeight:600, color:"#191919" }}>{card.q}</span>
                  <span style={{ color:"#9CA3AF" }}>→ {card.a}</span>
                </div>
              ))}
              {unknownCards.length > 5 && (
                <div style={{ fontSize:14, color:"#9CA3AF", textAlign:"center", marginTop:8 }}>
                  {lang === "en"
                    ? `+ ${unknownCards.length - 5} more to review`
                    : `+ ${unknownCards.length - 5}個の復習が必要`}
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button
            onClick={() => startDeck(deckType)}
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
          <button
            onClick={handleRestart}
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
            {lang === "en" ? "← Choose Deck" : "← デッキ選択"}
          </button>
        </div>
      </div>
    );
  }
}

/* ═══ DRAG AND DROP MATCHING ═══ */
function DragDropMatching({ lang, onComplete }) {
  const [gameState, setGameState] = useState("ready");
  const [gameType, setGameType] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [correctMatches, setCorrectMatches] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  const matchingGames = {
    en: {
      brands: {
        title: "Match Brands to Their Signature Items",
        pairs: [
          { left: "Louis Vuitton", right: "Speedy, Neverfull, Keepall", id: 1 },
          { left: "Chanel", right: "Classic Flap, Boy Bag, WOC", id: 2 },
          { left: "Hermès", right: "Birkin, Kelly, Constance", id: 3 },
          { left: "Gucci", right: "GG Marmont, Dionysus, Jackie", id: 4 },
          { left: "Prada", right: "Galleria, Re-Nylon, Cahier", id: 5 },
          { left: "Dior", right: "Lady Dior, Saddle, Book Tote", id: 6 },
        ]
      },
      conditions: {
        title: "Match Condition to Description",
        pairs: [
          { left: "Excellent", right: "Minimal wear, like new appearance", id: 1 },
          { left: "Very Good", right: "Light wear, fully functional", id: 2 },
          { left: "Good", right: "Moderate wear, some visible issues", id: 3 },
          { left: "Fair", right: "Heavy wear, needs repair consideration", id: 4 },
          { left: "Corner wear", right: "Edges show scuffing or darkening", id: 5 },
          { left: "Patina", right: "Natural aging of vachetta leather", id: 6 },
        ]
      },
      colors: {
        title: "Match Color Names to Shades",
        pairs: [
          { left: "Cognac", right: "Rich warm brown, honey tones", id: 1 },
          { left: "Taupe", right: "Gray-brown neutral, sophisticated", id: 2 },
          { left: "Oxblood", right: "Deep dark red, wine color", id: 3 },
          { left: "Teal", right: "Blue-green, bold and fresh", id: 4 },
          { left: "Blush", right: "Rosy pink, soft and feminine", id: 5 },
          { left: "Chartreuse", right: "Yellow-green, bold statement", id: 6 },
        ]
      }
    },
    jp: {
      brands: {
        title: "ブランドと代表的なアイテムをマッチ",
        pairs: [
          { left: "ルイ・ヴィトン", right: "スピーディ, ネヴァーフル, キーポル", id: 1 },
          { left: "シャネル", right: "クラシックフラップ, ボーイバッグ, WOC", id: 2 },
          { left: "エルメス", right: "バーキン, ケリー, コンスタンス", id: 3 },
          { left: "グッチ", right: "GGマーモント, ディオニュソス, ジャッキー", id: 4 },
          { left: "プラダ", right: "ガレリア, Re-ナイロン, カイエ", id: 5 },
          { left: "ディオール", right: "レディディオール, サドル, ブックトート", id: 6 },
        ]
      },
      conditions: {
        title: "コンディションと説明をマッチ",
        pairs: [
          { left: "Excellent", right: "最小限の使用感、ほぼ新品", id: 1 },
          { left: "Very Good", right: "軽い使用感、完全機能", id: 2 },
          { left: "Good", right: "中程度の使用感、目立つ問題あり", id: 3 },
          { left: "Fair", right: "大きな使用感、修理検討必要", id: 4 },
          { left: "角スレ", right: "エッジにスレや黒ずみ", id: 5 },
          { left: "パティーナ", right: "ヌメ革の自然な経年変化", id: 6 },
        ]
      },
      colors: {
        title: "カラー名と色合いをマッチ",
        pairs: [
          { left: "コニャック", right: "豊かな暖かいブラウン、ハニートーン", id: 1 },
          { left: "トープ", right: "グレーブラウンニュートラル、洗練", id: 2 },
          { left: "オックスブラッド", right: "深いダークレッド、ワイン色", id: 3 },
          { left: "ティール", right: "青緑、大胆でフレッシュ", id: 4 },
          { left: "ブラッシュ", right: "ロージーピンク、柔らかく女性的", id: 5 },
          { left: "シャルトルーズ", right: "黄緑、大胆なステートメント", id: 6 },
        ]
      }
    }
  };

  const startGame = (type) => {
    const game = matchingGames[lang][type];
    const shuffledPairs = [...game.pairs].sort(() => Math.random() - 0.5);
    const left = shuffledPairs.map(p => ({ text: p.left, id: p.id }));
    const right = [...shuffledPairs].sort(() => Math.random() - 0.5).map(p => ({ text: p.right, id: p.id }));

    setGameType(type);
    setMatches(game.pairs);
    setLeftItems(left);
    setRightItems(right);
    setCorrectMatches([]);
    setWrongAttempts(0);
    setSelectedLeft(null);
    setSelectedRight(null);
    setGameState("playing");
  };

  const handleLeftClick = (index) => {
    if (correctMatches.includes(leftItems[index].id)) return;
    setSelectedLeft(index);
    if (selectedRight !== null) {
      checkMatch(index, selectedRight);
    }
  };

  const handleRightClick = (index) => {
    if (correctMatches.includes(rightItems[index].id)) return;
    setSelectedRight(index);
    if (selectedLeft !== null) {
      checkMatch(selectedLeft, index);
    }
  };

  const checkMatch = (leftIdx, rightIdx) => {
    const leftId = leftItems[leftIdx].id;
    const rightId = rightItems[rightIdx].id;

    if (leftId === rightId) {
      // Correct match!
      setCorrectMatches([...correctMatches, leftId]);
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if game complete
      if (correctMatches.length + 1 === matches.length) {
        setTimeout(() => {
          setGameState("results");
          if (onComplete) onComplete(matches.length - wrongAttempts);
        }, 500);
      }
    } else {
      // Wrong match
      setWrongAttempts(wrongAttempts + 1);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 800);
    }
  };

  const handleRestart = () => {
    setGameState("ready");
    setGameType(null);
  };

  if (gameState === "ready") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🔗</div>
          <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
            {lang === "en" ? "Matching Game" : "マッチングゲーム"}
          </h2>
          <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, maxWidth:500, margin:"0 auto" }}>
            {lang === "en"
              ? "Test your knowledge by matching items from the left column to their correct pairs on the right. Click one from each side to make a match!"
              : "左列のアイテムを右側の正しいペアとマッチさせて知識をテスト。各側から1つクリックしてマッチを作ろう！"}
          </p>
        </div>

        <div style={{ display:"grid", gap:12, maxWidth:600, margin:"0 auto" }}>
          {[
            { type: "brands", icon: "👜", name: matchingGames[lang].brands.title },
            { type: "conditions", icon: "✅", name: matchingGames[lang].conditions.title },
            { type: "colors", icon: "🎨", name: matchingGames[lang].colors.title },
          ].map((game, i) => (
            <button
              key={i}
              onClick={() => startGame(game.type)}
              style={{
                background:"#FFFFFF",
                border:"2px solid #E5E7EB",
                borderRadius:12,
                padding:"20px 24px",
                cursor:"pointer",
                transition:"all 0.2s",
                textAlign:"left",
                display:"flex",
                alignItems:"center",
                gap:16
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#3665F3";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#E5E7EB";
              }}
            >
              <span style={{ fontSize:32 }}>{game.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:16, fontWeight:700, color:"#191919" }}>
                  {game.name}
                </div>
              </div>
              <div style={{
                background:"#3665F3",
                color:"#FFFFFF",
                padding:"8px 16px",
                borderRadius:8,
                fontSize:14,
                fontWeight:700
              }}>
                {lang === "en" ? "Play" : "プレイ"}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === "playing") {
    const progress = (correctMatches.length / matches.length) * 100;

    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        {/* Header */}
        <div style={{ marginBottom:24 }}>
          <h3 style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:16 }}>
            {matchingGames[lang][gameType].title}
          </h3>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:14, color:"#9CA3AF", fontWeight:600 }}>
              {correctMatches.length} / {matches.length} {lang === "en" ? "matched" : "マッチ"}
            </span>
            <span style={{ fontSize:14, color:"#E53238", fontWeight:600 }}>
              {wrongAttempts} {lang === "en" ? "wrong" : "間違い"}
            </span>
          </div>
          <div style={{ background:"#E5E7EB", height:8, borderRadius:8, overflow:"hidden" }}>
            <div style={{
              background:"linear-gradient(90deg, #3665F3, #86B817)",
              height:"100%",
              width:`${progress}%`,
              transition:"width 0.3s ease"
            }}></div>
          </div>
        </div>

        {/* Matching Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          {/* Left Column */}
          <div>
            <div style={{ fontSize:12, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, fontWeight:600 }}>
              {lang === "en" ? "Select Item" : "アイテム選択"}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {leftItems.map((item, i) => {
                const isMatched = correctMatches.includes(item.id);
                const isSelected = selectedLeft === i;
                const isWrong = isSelected && selectedRight !== null && leftItems[selectedLeft].id !== rightItems[selectedRight].id;

                return (
                  <button
                    key={i}
                    onClick={() => handleLeftClick(i)}
                    disabled={isMatched}
                    style={{
                      background: isMatched ? "#ECFDF5" : isWrong ? "#FEF2F2" : isSelected ? "#EFF6FF" : "#FFFFFF",
                      border: `2px solid ${isMatched ? "#86B817" : isWrong ? "#E53238" : isSelected ? "#3665F3" : "#E5E7EB"}`,
                      borderRadius:12,
                      padding:"14px 16px",
                      fontSize:14,
                      fontWeight:600,
                      color:"#191919",
                      cursor: isMatched ? "default" : "pointer",
                      transition:"all 0.2s",
                      textAlign:"left",
                      opacity: isMatched ? 0.6 : 1
                    }}
                    onMouseEnter={e => !isMatched && (e.target.style.borderColor = "#3665F3")}
                    onMouseLeave={e => !isMatched && !isSelected && (e.target.style.borderColor = "#E5E7EB")}
                  >
                    {isMatched && "✓ "}{item.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ fontSize:12, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, fontWeight:600 }}>
              {lang === "en" ? "Match With" : "マッチする"}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {rightItems.map((item, i) => {
                const isMatched = correctMatches.includes(item.id);
                const isSelected = selectedRight === i;
                const isWrong = isSelected && selectedLeft !== null && leftItems[selectedLeft].id !== rightItems[selectedRight].id;

                return (
                  <button
                    key={i}
                    onClick={() => handleRightClick(i)}
                    disabled={isMatched}
                    style={{
                      background: isMatched ? "#ECFDF5" : isWrong ? "#FEF2F2" : isSelected ? "#EFF6FF" : "#FFFFFF",
                      border: `2px solid ${isMatched ? "#86B817" : isWrong ? "#E53238" : isSelected ? "#3665F3" : "#E5E7EB"}`,
                      borderRadius:12,
                      padding:"14px 16px",
                      fontSize:14,
                      fontWeight:600,
                      color:"#191919",
                      cursor: isMatched ? "default" : "pointer",
                      transition:"all 0.2s",
                      textAlign:"left",
                      opacity: isMatched ? 0.6 : 1
                    }}
                    onMouseEnter={e => !isMatched && (e.target.style.borderColor = "#3665F3")}
                    onMouseLeave={e => !isMatched && !isSelected && (e.target.style.borderColor = "#E5E7EB")}
                  >
                    {isMatched && "✓ "}{item.text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ textAlign:"center", fontSize:14, color:"#9CA3AF" }}>
          {lang === "en"
            ? "Click one item from each column to match them"
            : "各列から1つのアイテムをクリックしてマッチさせよう"}
        </div>
      </div>
    );
  }

  if (gameState === "results") {
    const accuracy = Math.round(((matches.length) / (matches.length + wrongAttempts)) * 100);

    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>
          {wrongAttempts === 0 ? "🏆" : accuracy >= 80 ? "🎉" : "💪"}
        </div>
        <h2 style={{ fontSize:32, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang === "en" ? "All Matched!" : "全マッチ完了！"}
        </h2>

        <div style={{
          background:"linear-gradient(135deg, #3665F3 0%, #86B817 100%)",
          borderRadius:12,
          padding:24,
          marginBottom:24,
          color:"#FFFFFF"
        }}>
          <div style={{ fontSize:16, marginBottom:8, opacity:0.9 }}>
            {lang === "en" ? "Accuracy" : "正確性"}
          </div>
          <div style={{ fontSize:48, fontWeight:700 }}>{accuracy}%</div>
          <div style={{ fontSize:14, marginTop:8, opacity:0.8 }}>
            {wrongAttempts} {lang === "en" ? "wrong attempts" : "間違い"}
          </div>
        </div>

        <div style={{
          background: wrongAttempts === 0 ? "#ECFDF5" : accuracy >= 80 ? "#EFF6FF" : "#FEF3C7",
          padding:"16px 24px",
          borderRadius:12,
          marginBottom:24,
          border:`2px solid ${wrongAttempts === 0 ? "#86B817" : accuracy >= 80 ? "#3665F3" : "#F5AF02"}`
        }}>
          <p style={{ fontSize:16, color:"#191919", fontWeight:600, margin:0 }}>
            {wrongAttempts === 0
              ? (lang === "en" ? "🏆 Perfect! No mistakes!" : "🏆 完璧！ミスなし！")
              : accuracy >= 80
              ? (lang === "en" ? "🎉 Excellent work! You know your stuff!" : "🎉 素晴らしい！よく知ってる！")
              : (lang === "en" ? "💪 Good effort! Keep practicing!" : "💪 いい努力！練習を続けよう！")}
          </p>
        </div>

        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button
            onClick={() => startGame(gameType)}
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
            onClick={handleRestart}
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
            {lang === "en" ? "← Choose Game" : "← ゲーム選択"}
          </button>
        </div>
      </div>
    );
  }
}

/* ═══ AI LIVE STREAM SIMULATOR ═══ */
function AILiveStreamSimulator({ lang, onComplete }) {
  const [gameState, setGameState] = useState("setup"); // setup, streaming, results
  const [currentItem, setCurrentItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [score, setScore] = useState(0);
  const [buyerInterest, setBuyerInterest] = useState(50); // 0-100
  const messagesEndRef = useRef(null);

  const liveItems = {
    en: [
      { name: "Louis Vuitton Speedy 30", condition: "Very Good", issues: ["Corner wear", "Light patina"], price: "$400", image: "👜" },
      { name: "Chanel Classic Flap", condition: "Excellent", issues: ["Minor hardware scratches"], price: "$3,500", image: "👛" },
      { name: "Hermès Birkin 35", condition: "Excellent", issues: ["Pristine"], price: "$8,000", image: "💼" },
    ],
    jp: [
      { name: "ルイ・ヴィトン スピーディ30", condition: "Very Good", issues: ["角スレ", "軽いパティーナ"], price: "$400", image: "👜" },
      { name: "シャネル クラシックフラップ", condition: "Excellent", issues: ["金具に軽い傷"], price: "$3,500", image: "👛" },
      { name: "エルメス バーキン35", condition: "Excellent", issues: ["美品"], price: "$8,000", image: "💼" },
    ]
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startSimulation = () => {
    if (!isAPIConfigured()) {
      alert(lang === "en"
        ? "API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file."
        : "APIキーが設定されていません。.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。");
      return;
    }

    const items = liveItems[lang];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
    setMessages([
      {
        role: "system",
        content: lang === "en"
          ? `🎥 Stream started! You're selling: ${randomItem.name}. Welcome buyers and start describing the item!`
          : `🎥 配信開始！販売中: ${randomItem.name}。バイヤーを歓迎してアイテムの説明を始めましょう！`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setBuyerInterest(50);
    setScore(0);
    setGameState("streaming");

    // AI sends first buyer message after 2 seconds
    setTimeout(() => {
      sendAIBuyerMessage(randomItem, []);
    }, 2000);
  };

  const sendAIBuyerMessage = async (item, conversationHistory) => {
    setIsAITyping(true);

    const context = {
      messages: [
        {
          role: "user",
          content: `You are a buyer in an eBay Live stream. The seller is showing: ${item.name} (${item.condition} condition).

Issues visible: ${item.issues.join(", ")}
Price: ${item.price}

Conversation so far:
${conversationHistory.map(m => `${m.role}: ${m.content}`).join("\n")}

Send a SHORT buyer message (1-2 sentences). Ask about condition, price, authenticity, or show interest if seller answered well.`
        }
      ]
    };

    try {
      let aiMessage = "";
      await simulateLiveStreamBuyer(context, (chunk) => {
        aiMessage += chunk;
      });

      setIsAITyping(false);

      const newMessage = {
        role: "buyer",
        name: ["luxury_hunter", "chanel_collector", "resale_pro", "bagaholic"][Math.floor(Math.random() * 4)],
        content: aiMessage,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, newMessage]);

      // Update buyer interest based on message sentiment
      if (aiMessage.toLowerCase().includes("sold") || aiMessage.toLowerCase().includes("love")) {
        setBuyerInterest(prev => Math.min(100, prev + 15));
        setScore(prev => prev + 20);
      }

    } catch (error) {
      setIsAITyping(false);
      console.error("AI buyer error:", error);
      setMessages(prev => [...prev, {
        role: "system",
        content: "⚠️ " + (lang === "en" ? "AI buyer disconnected" : "AIバイヤー切断"),
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isAITyping) return;

    const newMessage = {
      role: "seller",
      content: inputText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");

    // Evaluate seller's message
    const lowerMessage = inputText.toLowerCase();
    if (lowerMessage.includes("corner") || lowerMessage.includes("patina") || lowerMessage.includes("scratch")) {
      setBuyerInterest(prev => Math.min(100, prev + 10));
      setScore(prev => prev + 10);
    }

    // AI responds after short delay
    setTimeout(() => {
      sendAIBuyerMessage(currentItem, [...messages, newMessage]);
    }, 1500);
  };

  const handleEndStream = () => {
    setGameState("results");
    if (onComplete) onComplete(score);
  };

  if (!isAPIConfigured() && gameState === "setup") {
    return (
      <div style={{ background:"#FEF2F2", borderRadius:16, padding:32, border:"2px solid #E53238" }}>
        <div style={{ fontSize:48, marginBottom:16, textAlign:"center" }}>⚠️</div>
        <h3 style={{ fontSize:20, fontWeight:700, color:"#E53238", marginBottom:12, textAlign:"center" }}>
          {lang === "en" ? "API Key Required" : "APIキーが必要"}
        </h3>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, textAlign:"center", marginBottom:16 }}>
          {lang === "en"
            ? "This AI feature requires an Anthropic API key. Please add VITE_ANTHROPIC_API_KEY to your .env file."
            : "このAI機能にはAnthropic APIキーが必要です。.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。"}
        </p>
        <div style={{ background:"#FFFFFF", borderRadius:8, padding:16, fontSize:14, fontFamily:"monospace", color:"#191919" }}>
          VITE_ANTHROPIC_API_KEY=sk-ant-...
        </div>
      </div>
    );
  }

  if (gameState === "setup") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🎥</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "AI Live Stream Simulator" : "AIライブ配信シミュレーター"}
        </h2>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, marginBottom:24, maxWidth:500, margin:"0 auto 24px" }}>
          {lang === "en"
            ? "Practice a REAL live stream! AI simulates actual buyers asking questions. Describe the item, answer questions, and make the sale. This is as close to the real thing as it gets!"
            : "リアルなライブ配信を練習！AIが実際のバイヤーを模擬して質問します。アイテムを説明し、質問に答え、販売しましょう。本物に最も近い体験！"}
        </p>
        <div style={{
          background:"#F7F7F7",
          borderRadius:12,
          padding:20,
          marginBottom:24,
          maxWidth:450,
          margin:"0 auto 24px"
        }}>
          <div style={{ fontSize:14, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:12, fontWeight:600 }}>
            {lang === "en" ? "You'll Practice:" : "練習内容："}
          </div>
          <div style={{ fontSize:14, color:"#191919", lineHeight:1.8, textAlign:"left" }}>
            ✓ {lang === "en" ? "Greeting buyers naturally" : "バイヤーへの自然な挨拶"}<br />
            ✓ {lang === "en" ? "Describing condition accurately" : "状態の正確な説明"}<br />
            ✓ {lang === "en" ? "Answering tough questions" : "難しい質問への回答"}<br />
            ✓ {lang === "en" ? "Building buyer confidence" : "バイヤーの信頼構築"}<br />
            ✓ {lang === "en" ? "Closing the sale" : "販売のクロージング"}
          </div>
        </div>
        <button
          onClick={startSimulation}
          style={{
            background:"#E53238",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 48px",
            fontSize:20,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          {lang === "en" ? "🔴 Go Live!" : "🔴 配信開始！"}
        </button>
      </div>
    );
  }

  if (gameState === "streaming") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:24, border:"2px solid #E5E7EB", animation:"fu 0.4s ease", maxWidth:800, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, paddingBottom:16, borderBottom:"2px solid #E5E7EB" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{
              width:12,
              height:12,
              borderRadius:"50%",
              background:"#E53238",
              animation:"pulse 1s infinite"
            }}></div>
            <span style={{ fontSize:16, fontWeight:700, color:"#191919" }}>
              {lang === "en" ? "🔴 LIVE" : "🔴 配信中"}
            </span>
          </div>
          <div style={{ display:"flex", gap:16, alignItems:"center" }}>
            <div style={{ fontSize:14, color:"#9CA3AF" }}>
              {lang === "en" ? "Interest:" : "興味度:"} <span style={{ color: buyerInterest > 70 ? "#86B817" : buyerInterest > 40 ? "#F5AF02" : "#E53238", fontWeight:700 }}>{buyerInterest}%</span>
            </div>
            <div style={{ fontSize:14, color:"#9CA3AF" }}>
              {lang === "en" ? "Score:" : "スコア:"} <span style={{ color:"#3665F3", fontWeight:700 }}>{score}</span>
            </div>
          </div>
        </div>

        {/* Item Display */}
        {currentItem && (
          <div style={{
            background:"#F7F7F7",
            borderRadius:12,
            padding:16,
            marginBottom:16,
            display:"flex",
            alignItems:"center",
            gap:16
          }}>
            <div style={{ fontSize:48 }}>{currentItem.image}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:4 }}>
                {currentItem.name}
              </div>
              <div style={{ fontSize:14, color:"#9CA3AF" }}>
                {currentItem.condition} • {currentItem.price}
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div style={{
          background:"#F7F7F7",
          borderRadius:12,
          padding:16,
          height:350,
          overflowY:"auto",
          marginBottom:16
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              marginBottom:12,
              display:"flex",
              flexDirection:"column",
              alignItems: msg.role === "seller" ? "flex-end" : "flex-start"
            }}>
              {msg.role === "system" ? (
                <div style={{
                  background:"#EFF6FF",
                  border:"1px solid #3665F3",
                  borderRadius:8,
                  padding:"8px 12px",
                  fontSize:14,
                  color:"#3665F3",
                  fontStyle:"italic",
                  maxWidth:"90%",
                  textAlign:"center",
                  margin:"0 auto"
                }}>
                  {msg.content}
                </div>
              ) : (
                <div style={{
                  maxWidth:"75%",
                  display:"flex",
                  flexDirection:"column",
                  alignItems: msg.role === "seller" ? "flex-end" : "flex-start"
                }}>
                  {msg.name && (
                    <div style={{ fontSize:12, color:"#9CA3AF", marginBottom:4, fontWeight:600 }}>
                      {msg.name}
                    </div>
                  )}
                  <div style={{
                    background: msg.role === "seller" ? "#3665F3" : "#FFFFFF",
                    color: msg.role === "seller" ? "#FFFFFF" : "#191919",
                    borderRadius:12,
                    padding:"10px 14px",
                    fontSize:15,
                    lineHeight:1.5,
                    border: msg.role === "buyer" ? "1px solid #E5E7EB" : "none"
                  }}>
                    {msg.content}
                  </div>
                  <div style={{ fontSize:11, color:"#9CA3AF", marginTop:4 }}>
                    {msg.timestamp}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isAITyping && (
            <div style={{
              background:"#FFFFFF",
              border:"1px solid #E5E7EB",
              borderRadius:12,
              padding:"10px 14px",
              fontSize:15,
              maxWidth:"75%",
              color:"#9CA3AF",
              fontStyle:"italic"
            }}>
              {lang === "en" ? "Buyer is typing..." : "バイヤーが入力中..."}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ display:"flex", gap:12, marginBottom:12 }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={lang === "en" ? "Type your message to buyers..." : "バイヤーへのメッセージを入力..."}
            disabled={isAITyping}
            style={{
              flex:1,
              padding:"12px 16px",
              borderRadius:12,
              border:"2px solid #E5E7EB",
              fontSize:15,
              outline:"none",
              fontFamily:"inherit"
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isAITyping}
            style={{
              background: !inputText.trim() || isAITyping ? "#E5E7EB" : "#3665F3",
              color:"#FFFFFF",
              border:"none",
              borderRadius:12,
              padding:"12px 24px",
              fontSize:16,
              fontWeight:700,
              cursor: !inputText.trim() || isAITyping ? "not-allowed" : "pointer",
              transition:"all 0.2s"
            }}
          >
            {lang === "en" ? "Send" : "送信"}
          </button>
        </div>

        <button
          onClick={handleEndStream}
          style={{
            width:"100%",
            background:"#F7F7F7",
            color:"#E53238",
            border:"2px solid #E53238",
            borderRadius:12,
            padding:"12px",
            fontSize:16,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.background = "#FEF2F2"}
          onMouseLeave={e => e.target.style.background = "#F7F7F7"}
        >
          {lang === "en" ? "⏹️ End Stream" : "⏹️ 配信終了"}
        </button>
      </div>
    );
  }

  if (gameState === "results") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ fontSize:64, marginBottom:16 }}>
          {buyerInterest >= 70 ? "🎉" : buyerInterest >= 40 ? "💪" : "📚"}
        </div>
        <h2 style={{ fontSize:32, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang === "en" ? "Stream Ended!" : "配信終了！"}
        </h2>

        <div style={{
          background:"linear-gradient(135deg, #E53238 0%, #F5AF02 100%)",
          borderRadius:12,
          padding:24,
          marginBottom:24,
          color:"#FFFFFF"
        }}>
          <div style={{ fontSize:16, marginBottom:8, opacity:0.9 }}>
            {lang === "en" ? "Final Score" : "最終スコア"}
          </div>
          <div style={{ fontSize:48, fontWeight:700 }}>{score}</div>
          <div style={{ fontSize:14, marginTop:8, opacity:0.8 }}>
            {lang === "en" ? "Buyer Interest:" : "バイヤー興味度:"} {buyerInterest}%
          </div>
        </div>

        <div style={{
          background: buyerInterest >= 70 ? "#ECFDF5" : buyerInterest >= 40 ? "#EFF6FF" : "#FEF3C7",
          padding:"16px 24px",
          borderRadius:12,
          marginBottom:24,
          border:`2px solid ${buyerInterest >= 70 ? "#86B817" : buyerInterest >= 40 ? "#3665F3" : "#F5AF02"}`
        }}>
          <p style={{ fontSize:16, color:"#191919", fontWeight:600, margin:0 }}>
            {buyerInterest >= 70
              ? (lang === "en" ? "🌟 Excellent! Buyers were engaged and interested!" : "🌟 素晴らしい！バイヤーは関心を持ちました！")
              : buyerInterest >= 40
              ? (lang === "en" ? "💪 Good work! Keep practicing detailed descriptions!" : "💪 よくできました！詳細な説明を練習し続けて！")
              : (lang === "en" ? "📚 Keep practicing! Focus on being specific about condition!" : "📚 練習を続けよう！状態の具体的な説明に集中！")}
          </p>
        </div>

        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <button
            onClick={startSimulation}
            style={{
              background:"#E53238",
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
            {lang === "en" ? "🔄 Stream Again" : "🔄 もう一度配信"}
          </button>
          <button
            onClick={() => setGameState("setup")}
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
}

/* ═══ AI CONDITION DESCRIBER ═══ */
function AIConditionDescriber({ lang, onComplete }) {
  const [gameState, setGameState] = useState("ready");
  const [currentItem, setCurrentItem] = useState(null);
  const [userDescription, setUserDescription] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const practiceItems = {
    en: [
      {
        item: "Louis Vuitton Speedy 30",
        image: "👜",
        issues: ["Corner wear on all four corners", "Light patina on handles", "Interior clean", "Hardware shows minor tarnish"],
        correctCondition: "Very Good"
      },
      {
        item: "Chanel Classic Flap",
        image: "👛",
        issues: ["Quilting intact", "Chain shows light scratches", "Turnlock slightly loose", "Minor scuffing on back"],
        correctCondition: "Good"
      },
      {
        item: "Hermès Birkin 35",
        image: "💼",
        issues: ["Pristine clemence leather", "Hardware unscratched", "Sangles never used", "Includes clochette, lock, keys"],
        correctCondition: "Excellent"
      }
    ],
    jp: [
      {
        item: "ルイ・ヴィトン スピーディ30",
        image: "👜",
        issues: ["4つ角すべてにスレ", "ハンドルに軽いパティーナ", "内側きれい", "金具に軽い変色"],
        correctCondition: "Very Good"
      },
      {
        item: "シャネル クラシックフラップ",
        image: "👛",
        issues: ["キルティング正常", "チェーンに軽い傷", "ターンロック少し緩い", "背面に軽いスレ"],
        correctCondition: "Good"
      },
      {
        item: "エルメス バーキン35",
        image: "💼",
        issues: ["美品クレマンスレザー", "金具無傷", "サングル未使用", "クロシェット・鍵付き"],
        correctCondition: "Excellent"
      }
    ]
  };

  const startPractice = () => {
    if (!isAPIConfigured()) {
      alert(lang === "en"
        ? "API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file."
        : "APIキーが設定されていません。.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。");
      return;
    }

    const items = practiceItems[lang];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
    setUserDescription("");
    setEvaluation(null);
    setGameState("describing");
  };

  const handleEvaluate = async () => {
    if (!userDescription.trim()) return;

    setIsEvaluating(true);

    try {
      const result = await evaluateConditionDescription(currentItem, userDescription);
      setEvaluation(result);
      setGameState("results");

      // Award XP based on score
      const xp = result.score === "Excellent" ? 50 : result.score === "Good" ? 30 : 15;
      if (onComplete) onComplete(xp);

    } catch (error) {
      console.error("Evaluation error:", error);
      alert(lang === "en"
        ? "AI evaluation failed. Please try again."
        : "AI評価に失敗しました。もう一度お試しください。");
    } finally {
      setIsEvaluating(false);
    }
  };

  if (gameState === "ready") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "AI Condition Describer" : "AIコンディション説明評価"}
        </h2>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, marginBottom:24, maxWidth:500, margin:"0 auto 24px" }}>
          {lang === "en"
            ? "You'll see a luxury item with visible issues. Describe its condition in English as if you're on a live stream. AI will evaluate if your description is detailed enough to prevent INAD returns!"
            : "目に見える問題のある高級品が表示されます。ライブ配信で話すように英語で状態を説明してください。AIがINAD返品を防ぐのに十分詳細かどうかを評価します！"}
        </p>
        <button
          onClick={startPractice}
          style={{
            background:"#F5AF02",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 48px",
            fontSize:20,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          {lang === "en" ? "📝 Start Practice" : "📝 練習開始"}
        </button>
      </div>
    );
  }

  if (gameState === "describing") {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <h3 style={{ fontSize:22, fontWeight:700, color:"#191919", marginBottom:20 }}>
          {lang === "en" ? "Describe This Item" : "このアイテムを説明"}
        </h3>

        {/* Item Card */}
        <div style={{
          background:"#F7F7F7",
          borderRadius:12,
          padding:24,
          marginBottom:24,
          border:"2px solid #E5E7EB"
        }}>
          <div style={{ fontSize:64, textAlign:"center", marginBottom:16 }}>{currentItem.image}</div>
          <h4 style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:16, textAlign:"center" }}>
            {currentItem.item}
          </h4>

          <div style={{
            background:"#FFFFFF",
            borderRadius:8,
            padding:16,
            marginBottom:12
          }}>
            <div style={{ fontSize:14, color:"#E53238", fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>
              {lang === "en" ? "Visible Issues:" : "目に見える問題："}
            </div>
            <ul style={{ margin:0, paddingLeft:20, fontSize:15, lineHeight:1.8, color:"#191919" }}>
              {currentItem.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background:"#EFF6FF",
            border:"1px solid #3665F3",
            borderRadius:8,
            padding:12,
            fontSize:14,
            color:"#3665F3"
          }}>
            <strong>{lang === "en" ? "Correct Condition:" : "正しい状態："}</strong> {currentItem.correctCondition}
          </div>
        </div>

        {/* Description Input */}
        <div style={{ marginBottom:24 }}>
          <label style={{ display:"block", fontSize:16, fontWeight:700, color:"#191919", marginBottom:8 }}>
            {lang === "en" ? "Your Description (in English):" : "あなたの説明（英語で）："}
          </label>
          <textarea
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            placeholder={lang === "en"
              ? "Example: This Louis Vuitton Speedy 30 is in very good condition. All four corners show wear from use. The vachetta handles have light patina. The interior is clean with no stains. Hardware shows minor tarnish but fully functional."
              : "例：This Louis Vuitton Speedy 30 is in very good condition. All four corners show wear from use. The vachetta handles have light patina. The interior is clean with no stains. Hardware shows minor tarnish but fully functional."}
            disabled={isEvaluating}
            style={{
              width:"100%",
              minHeight:150,
              padding:"12px 16px",
              borderRadius:12,
              border:"2px solid #E5E7EB",
              fontSize:15,
              lineHeight:1.6,
              outline:"none",
              fontFamily:"inherit",
              resize:"vertical"
            }}
          />
        </div>

        <button
          onClick={handleEvaluate}
          disabled={!userDescription.trim() || isEvaluating}
          style={{
            width:"100%",
            background: !userDescription.trim() || isEvaluating ? "#E5E7EB" : "#F5AF02",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px",
            fontSize:18,
            fontWeight:700,
            cursor: !userDescription.trim() || isEvaluating ? "not-allowed" : "pointer",
            transition:"all 0.2s"
          }}
        >
          {isEvaluating
            ? (lang === "en" ? "🤖 AI is evaluating..." : "🤖 AI評価中...")
            : (lang === "en" ? "✨ Get AI Feedback" : "✨ AIフィードバック取得")}
        </button>
      </div>
    );
  }

  if (gameState === "results" && evaluation) {
    const scoreColor = evaluation.score === "Excellent" ? "#86B817" : evaluation.score === "Good" ? "#3665F3" : "#F5AF02";
    const scoreBg = evaluation.score === "Excellent" ? "#ECFDF5" : evaluation.score === "Good" ? "#EFF6FF" : "#FEF3C7";

    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", animation:"fu 0.4s ease" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:64, marginBottom:12 }}>
            {evaluation.score === "Excellent" ? "🌟" : evaluation.score === "Good" ? "💪" : "📚"}
          </div>
          <div style={{
            background:scoreBg,
            border:`2px solid ${scoreColor}`,
            borderRadius:12,
            padding:"12px 24px",
            display:"inline-block",
            fontSize:20,
            fontWeight:700,
            color:scoreColor
          }}>
            {lang === "en" ? "Score:" : "スコア:"} {evaluation.score}
          </div>
        </div>

        {/* Feedback */}
        <div style={{
          background:"#F7F7F7",
          borderRadius:12,
          padding:20,
          marginBottom:16
        }}>
          <div style={{ fontSize:14, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:1, marginBottom:8, fontWeight:600 }}>
            {lang === "en" ? "AI Feedback:" : "AIフィードバック："}
          </div>
          <p style={{ fontSize:16, color:"#191919", lineHeight:1.7, margin:0 }}>
            {evaluation.feedback}
          </p>
        </div>

        {/* Missed Issues */}
        {evaluation.missed && evaluation.missed.length > 0 && (
          <div style={{
            background:"#FEF3C7",
            border:"2px solid #F5AF02",
            borderRadius:12,
            padding:20,
            marginBottom:16
          }}>
            <div style={{ fontSize:14, color:"#F5AF02", textTransform:"uppercase", letterSpacing:1, marginBottom:8, fontWeight:700 }}>
              ⚠️ {lang === "en" ? "You Missed:" : "見落とし："}
            </div>
            <ul style={{ margin:0, paddingLeft:20, fontSize:15, lineHeight:1.7, color:"#191919" }}>
              {evaluation.missed.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Model Answer */}
        {evaluation.modelAnswer && (
          <div style={{
            background:"#ECFDF5",
            border:"2px solid #86B817",
            borderRadius:12,
            padding:20,
            marginBottom:24
          }}>
            <div style={{ fontSize:14, color:"#86B817", textTransform:"uppercase", letterSpacing:1, marginBottom:8, fontWeight:700 }}>
              ✓ {lang === "en" ? "Model Answer:" : "模範解答："}
            </div>
            <p style={{ fontSize:15, color:"#191919", lineHeight:1.7, margin:0, fontStyle:"italic" }}>
              "{evaluation.modelAnswer}"
            </p>
          </div>
        )}

        <div style={{ display:"flex", gap:12 }}>
          <button
            onClick={startPractice}
            style={{
              flex:1,
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
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            {lang === "en" ? "🔄 Try Another" : "🔄 もう一つ"}
          </button>
          <button
            onClick={() => setGameState("ready")}
            style={{
              flex:1,
              background:"#F7F7F7",
              color:"#191919",
              border:"2px solid #E5E7EB",
              borderRadius:12,
              padding:"16px",
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
}

/* ═══ AI CONVERSATION PARTNER ═══ */
function AIConversationPartner({ lang, onComplete }) {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  const startConversation = () => {
    if (!isAPIConfigured()) {
      alert(lang === "en"
        ? "API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file."
        : "APIキーが設定されていません。.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。");
      return;
    }

    setConversationHistory([
      {
        role: "assistant",
        content: lang === "en"
          ? "Hi! I'm interested in luxury bags. Do you have anything good today?"
          : "Hi! I'm interested in luxury bags. Do you have anything good today?",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setConversationEnded(false);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isAITyping) return;

    const userMessage = {
      role: "user",
      content: inputText,
      timestamp: new Date().toLocaleTimeString()
    };

    const newHistory = [...conversationHistory, userMessage];
    setConversationHistory(newHistory);
    setInputText("");
    setIsAITyping(true);

    try {
      const messages = newHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      let aiResponse = "";
      await chatAsBuyer(messages, (chunk) => {
        aiResponse += chunk;
      });

      setIsAITyping(false);

      const aiMessage = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      };

      setConversationHistory(prev => [...prev, aiMessage]);

      // Check if conversation should end (AI gives coaching feedback)
      if (newHistory.length >= 10 || aiResponse.toLowerCase().includes("coaching") || aiResponse.toLowerCase().includes("feedback")) {
        setConversationEnded(true);
        if (onComplete) onComplete(30);
      }

    } catch (error) {
      setIsAITyping(false);
      console.error("AI chat error:", error);
      alert(lang === "en"
        ? "AI response failed. Please try again."
        : "AI応答に失敗しました。もう一度お試しください。");
    }
  };

  if (conversationHistory.length === 0) {
    return (
      <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, textAlign:"center", border:"2px solid #E5E7EB" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>💬</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "AI Conversation Partner" : "AI会話パートナー"}
        </h2>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, marginBottom:24, maxWidth:500, margin:"0 auto 24px" }}>
          {lang === "en"
            ? "Practice free-form conversations with an AI buyer! Talk about products, answer questions, handle objections. AI will give you gentle coaching feedback after the conversation."
            : "AIバイヤーと自由形式の会話を練習！商品について話し、質問に答え、異議に対処。会話後にAIが優しいコーチングフィードバックを提供します。"}
        </p>
        <button
          onClick={startConversation}
          style={{
            background:"#3665F3",
            color:"#FFFFFF",
            border:"none",
            borderRadius:12,
            padding:"16px 48px",
            fontSize:20,
            fontWeight:700,
            cursor:"pointer",
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          {lang === "en" ? "💬 Start Chat" : "💬 チャット開始"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ background:"#FFFFFF", borderRadius:16, padding:24, border:"2px solid #E5E7EB", animation:"fu 0.4s ease", maxWidth:700, margin:"0 auto" }}>
      <div style={{ marginBottom:16, paddingBottom:16, borderBottom:"2px solid #E5E7EB" }}>
        <h3 style={{ fontSize:20, fontWeight:700, color:"#191919", margin:0 }}>
          {lang === "en" ? "💬 Practice Conversation" : "💬 会話練習"}
        </h3>
      </div>

      {/* Chat Messages */}
      <div style={{
        background:"#F7F7F7",
        borderRadius:12,
        padding:16,
        height:400,
        overflowY:"auto",
        marginBottom:16
      }}>
        {conversationHistory.map((msg, i) => (
          <div key={i} style={{
            marginBottom:12,
            display:"flex",
            flexDirection:"column",
            alignItems: msg.role === "user" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              maxWidth:"75%",
              background: msg.role === "user" ? "#3665F3" : "#FFFFFF",
              color: msg.role === "user" ? "#FFFFFF" : "#191919",
              borderRadius:12,
              padding:"10px 14px",
              fontSize:15,
              lineHeight:1.5,
              border: msg.role === "assistant" ? "1px solid #E5E7EB" : "none"
            }}>
              {msg.content}
            </div>
            <div style={{ fontSize:11, color:"#9CA3AF", marginTop:4 }}>
              {msg.timestamp}
            </div>
          </div>
        ))}
        {isAITyping && (
          <div style={{
            background:"#FFFFFF",
            border:"1px solid #E5E7EB",
            borderRadius:12,
            padding:"10px 14px",
            fontSize:15,
            maxWidth:"75%",
            color:"#9CA3AF",
            fontStyle:"italic"
          }}>
            {lang === "en" ? "AI is typing..." : "AIが入力中..."}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!conversationEnded ? (
        <div style={{ display:"flex", gap:12 }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={lang === "en" ? "Type your response..." : "返信を入力..."}
            disabled={isAITyping}
            style={{
              flex:1,
              padding:"12px 16px",
              borderRadius:12,
              border:"2px solid #E5E7EB",
              fontSize:15,
              outline:"none",
              fontFamily:"inherit"
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isAITyping}
            style={{
              background: !inputText.trim() || isAITyping ? "#E5E7EB" : "#3665F3",
              color:"#FFFFFF",
              border:"none",
              borderRadius:12,
              padding:"12px 24px",
              fontSize:16,
              fontWeight:700,
              cursor: !inputText.trim() || isAITyping ? "not-allowed" : "pointer"
            }}
          >
            {lang === "en" ? "Send" : "送信"}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConversationHistory([])}
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
            transition:"all 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >
          {lang === "en" ? "🔄 Start New Conversation" : "🔄 新しい会話を開始"}
        </button>
      )}
    </div>
  );
}

/* ═══ AI PHRASE REPHRASER ═══ */
function AIPhraseRephraser({ lang, onComplete }) {
  const [japaneseInput, setJapaneseInput] = useState("");
  const [englishVersions, setEnglishVersions] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const handleRephrase = async () => {
    if (!japaneseInput.trim()) return;

    if (!isAPIConfigured()) {
      alert(lang === "en"
        ? "API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file."
        : "APIキーが設定されていません。.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。");
      return;
    }

    setIsTranslating(true);

    try {
      const versions = await rephraseJapaneseToEnglish(japaneseInput);
      setEnglishVersions(versions);
      setSelectedVersion(null);
    } catch (error) {
      console.error("Rephrase error:", error);
      alert(lang === "en"
        ? "AI translation failed. Please try again."
        : "AI翻訳に失敗しました。もう一度お試しください。");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSelectVersion = (version) => {
    setSelectedVersion(version);
    if (onComplete) onComplete(10);
  };

  return (
    <div style={{ background:"#FFFFFF", borderRadius:16, padding:32, border:"2px solid #E5E7EB", maxWidth:700, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🌐</div>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#191919", marginBottom:12 }}>
          {lang === "en" ? "AI Phrase Rephraser" : "AIフレーズ変換"}
        </h2>
        <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6 }}>
          {lang === "en"
            ? "Think in Japanese, speak in English! Type what you want to say in Japanese, and AI will give you 3 natural English versions: formal, casual, and confident."
            : "日本語で考え、英語で話す！日本語で言いたいことを入力すると、AIが3つの自然な英語バージョンを提供：フォーマル、カジュアル、自信満々。"}
        </p>
      </div>

      {/* Japanese Input */}
      <div style={{ marginBottom:24 }}>
        <label style={{ display:"block", fontSize:16, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang === "en" ? "What do you want to say? (in Japanese)" : "何を言いたいですか？（日本語で）"}
        </label>
        <textarea
          value={japaneseInput}
          onChange={(e) => setJapaneseInput(e.target.value)}
          placeholder={lang === "en"
            ? "例：このバッグは本当に状態が良いです。角にスレはありますが、全体的にとてもきれいです。"
            : "例：このバッグは本当に状態が良いです。角にスレはありますが、全体的にとてもきれいです。"}
          disabled={isTranslating}
          style={{
            width:"100%",
            minHeight:100,
            padding:"12px 16px",
            borderRadius:12,
            border:"2px solid #E5E7EB",
            fontSize:15,
            lineHeight:1.6,
            outline:"none",
            fontFamily:"inherit",
            resize:"vertical"
          }}
        />
      </div>

      <button
        onClick={handleRephrase}
        disabled={!japaneseInput.trim() || isTranslating}
        style={{
          width:"100%",
          background: !japaneseInput.trim() || isTranslating ? "#E5E7EB" : "#86B817",
          color:"#FFFFFF",
          border:"none",
          borderRadius:12,
          padding:"16px",
          fontSize:18,
          fontWeight:700,
          cursor: !japaneseInput.trim() || isTranslating ? "not-allowed" : "pointer",
          marginBottom:24,
          transition:"all 0.2s"
        }}
      >
        {isTranslating
          ? (lang === "en" ? "🤖 AI is translating..." : "🤖 AI翻訳中...")
          : (lang === "en" ? "✨ Get English Versions" : "✨ 英語バージョン取得")}
      </button>

      {/* English Versions */}
      {englishVersions && (
        <div style={{ animation:"fu 0.4s ease" }}>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:16 }}>
            {lang === "en" ? "Choose Your Style:" : "スタイルを選択："}
          </h3>

          {[
            { type: "formal", icon: "👔", label: lang === "en" ? "Formal / Professional" : "フォーマル / プロフェッショナル", color: "#3665F3" },
            { type: "casual", icon: "😊", label: lang === "en" ? "Casual / Friendly" : "カジュアル / フレンドリー", color: "#F5AF02" },
            { type: "confident", icon: "💪", label: lang === "en" ? "Confident / Salesy" : "自信満々 / セールス", color: "#86B817" }
          ].map((style) => (
            <div
              key={style.type}
              onClick={() => handleSelectVersion(style.type)}
              style={{
                background: selectedVersion === style.type ? `${style.color}15` : "#F7F7F7",
                border: `2px solid ${selectedVersion === style.type ? style.color : "#E5E7EB"}`,
                borderRadius:12,
                padding:20,
                marginBottom:12,
                cursor:"pointer",
                transition:"all 0.2s"
              }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                <span style={{ fontSize:24 }}>{style.icon}</span>
                <span style={{ fontSize:16, fontWeight:700, color:style.color }}>{style.label}</span>
                {selectedVersion === style.type && <span style={{ marginLeft:"auto", fontSize:20 }}>✓</span>}
              </div>
              <p style={{ fontSize:15, color:"#191919", lineHeight:1.6, margin:0, fontStyle:"italic" }}>
                "{englishVersions[style.type]}"
              </p>
            </div>
          ))}

          {selectedVersion && (
            <div style={{
              background:"#ECFDF5",
              border:"2px solid #86B817",
              borderRadius:12,
              padding:16,
              marginTop:16,
              textAlign:"center"
            }}>
              <p style={{ fontSize:16, color:"#86B817", fontWeight:700, margin:0 }}>
                ✓ {lang === "en"
                  ? "Great! Now practice saying it out loud 3 times!"
                  : "素晴らしい！今度は声に出して3回練習しましょう！"}
              </p>
            </div>
          )}
        </div>
      )}
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
    } else if (gameType === "speedAuction") {
      xpEarned = score * 25; // 25 XP per item sold
    } else if (gameType === "flashcard") {
      xpEarned = score * 5; // 5 XP per card known
    } else if (gameType === "matching") {
      xpEarned = score * 12; // 12 XP per correct match
    } else if (gameType === "aiLiveStream") {
      xpEarned = score; // Direct score from AI simulation
    } else if (gameType === "aiCondition") {
      xpEarned = score; // AI assigns XP based on quality
    } else if (gameType === "aiConversation") {
      xpEarned = score; // 30 XP for completing conversation
    } else if (gameType === "aiRephrase") {
      xpEarned = score; // 10 XP per phrase rephrased
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

  if (activeGame === "speedAuction") {
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
        <SpeedAuctionGame lang={lang} onComplete={(score) => handleGameComplete(score, "speedAuction")} />
      </div>
    );
  }

  if (activeGame === "flashcard") {
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
        <FlashcardMode lang={lang} onComplete={(score) => handleGameComplete(score, "flashcard")} />
      </div>
    );
  }

  if (activeGame === "matching") {
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
        <DragDropMatching lang={lang} onComplete={(score) => handleGameComplete(score, "matching")} />
      </div>
    );
  }

  if (activeGame === "aiLiveStream") {
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
        <AILiveStreamSimulator lang={lang} onComplete={(score) => handleGameComplete(score, "aiLiveStream")} />
      </div>
    );
  }

  if (activeGame === "aiCondition") {
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
        <AIConditionDescriber lang={lang} onComplete={(score) => handleGameComplete(score, "aiCondition")} />
      </div>
    );
  }

  if (activeGame === "aiConversation") {
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
        <AIConversationPartner lang={lang} onComplete={(score) => handleGameComplete(score, "aiConversation")} />
      </div>
    );
  }

  if (activeGame === "aiRephrase") {
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
        <AIPhraseRephraser lang={lang} onComplete={(score) => handleGameComplete(score, "aiRephrase")} />
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
            icon:"⚡",
            t:lang==="en"?"Speed Auction":"スピードオークション",
            d:lang==="en"?"Describe items and announce bids in 30 seconds - auction practice":"30秒でアイテム説明と価格発表 - オークション練習",
            c:"#F5AF02",
            game:"speedAuction",
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
            icon:"🎴",
            t:lang==="en"?"Flashcard Mode":"フラッシュカードモード",
            d:lang==="en"?"Test vocabulary with swipeable flashcards":"スワイプ可能なフラッシュカードで語彙テスト",
            c:"#3665F3",
            game:"flashcard",
            available:true
          },
          {
            icon:"🔗",
            t:lang==="en"?"Matching Game":"マッチングゲーム",
            d:lang==="en"?"Match brands, conditions, and colors - build connections":"ブランド、状態、色をマッチ - 繋がりを作る",
            c:"#86B817",
            game:"matching",
            available:true
          },
          {
            icon:"☀️",
            t:lang==="en"?"Daily Warm-Up":"デイリーウォームアップ",
            d:lang==="en"?"3-minute pre-stream confidence booster":"配信前3分間の自信ブースター",
            c:"#86B817",
            game:"warmup",
            available:true
          },
          {
            icon:"🤖",
            t:lang==="en"?"🎥 AI Live Stream Simulator":"🎥 AIライブ配信シミュレーター",
            d:lang==="en"?"Practice with AI buyers in REAL-TIME - the ultimate training":"AIバイヤーとリアルタイムで練習 - 究極のトレーニング",
            c:"#E53238",
            game:"aiLiveStream",
            available:true
          },
          {
            icon:"🤖",
            t:lang==="en"?"AI Condition Evaluator":"AIコンディション評価",
            d:lang==="en"?"Get AI feedback on your condition descriptions":"コンディション説明にAIフィードバック",
            c:"#F5AF02",
            game:"aiCondition",
            available:true
          },
          {
            icon:"🤖",
            t:lang==="en"?"AI Conversation Partner":"AI会話パートナー",
            d:lang==="en"?"Free-form chat practice with AI buyer":"AIバイヤーと自由形式チャット練習",
            c:"#3665F3",
            game:"aiConversation",
            available:true
          },
          {
            icon:"🤖",
            t:lang==="en"?"AI Phrase Translator":"AIフレーズ翻訳",
            d:lang==="en"?"Japanese → English with 3 style options":"日本語→英語 3スタイルオプション付き",
            c:"#86B817",
            game:"aiRephrase",
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
