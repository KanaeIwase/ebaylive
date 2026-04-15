import { useState, useEffect, useRef } from "react";
import { simulateLiveStreamBuyer, isAPIConfigured, evaluateConditionDescription, chatAsBuyer, rephraseJapaneseToEnglish } from "./services/anthropic";
import { playSuccess, playLevelUp, playWarning, playBadgeUnlock, playClick } from "./utils/sounds";
import { Product360Viewer, ConditionComparisonGrid, WearExampleGallery, PracticeScenarioViewer } from "./components/ConditionTrainingViewer";
import { BrandImageGallery, ConditionExamplesGallery } from "./components/BrandImageGallery";
import { ConditionVocabularyViewer } from "./components/ConditionVocabularyViewer";
import { AILiveStreamSimulator, AIConditionEvaluator, AIConversationPartner, AIPhraseTranslator } from "./components/AIPracticeTools";

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
    categories:["handbags", "jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Louis_Vuitton_logo_and_wordmark.svg/512px-Louis_Vuitton_logo_and_wordmark.svg.png",
    auth:"Date codes (pre-2021) → heat stamps with microchip (2021+). Canvas should NEVER peel. Stitching always even.",
    authJp:"デートコード（2021年以前）→ ヒートスタンプ+マイクロチップ（2021年以降）。キャンバスは剥離しない。ステッチは均一。",
    rare:"Multicolor line (Murakami collab) discontinued. Vernis in certain rare colors. Older date code pieces. LV NEVER goes on sale at retail.",
    rareJp:"マルチカラーライン（村上コラボ）廃番。特定のヴェルニ色。古いデートコード品。LVは定価でセールしない。",
    tip:"LV never goes on sale. So any pre-loved LV at this price is already a steal.",
    tipJp:"LVはセールしない。だから中古でこの価格は既にお買い得。",
    colors:[
      {name:"Sweet Orange", hex:"#E8833A", nameJp:"スウィートオレンジ", desc:"Beautiful warm orange — very signature Louis Vuitton.", descJp:"美しい温かいオレンジ — とてもLVらしい色。"},
      {name:"Rose Ballerine", hex:"#F4C2C2", nameJp:"ローズバレリーヌ", desc:"The prettiest soft pink. So feminine.", descJp:"最も可愛い柔らかいピンク。とてもフェミニン。"},
      {name:"Monogram Brown", hex:"#6B4226", nameJp:"モノグラムブラウン", desc:"The classic. You know it, you love it.", descJp:"クラシック。誰もが知ってる、愛してる。"},
      {name:"Damier Ebene", hex:"#3B2F2F", nameJp:"ダミエ エベヌ", desc:"Beautiful dark brown. Very classic, very subtle.", descJp:"美しいダークブラウン。クラシックで控えめ。"},
      {name:"Damier Azur", hex:"#D6CFC7", nameJp:"ダミエ アズール", desc:"Light and fresh. Perfect for summer.", descJp:"明るくて爽やか。夏にぴったり。"},
      {name:"Fuchsia", hex:"#C4346C", nameJp:"フューシャ", desc:"Bold, beautiful hot pink. It pops.", descJp:"大胆で美しいホットピンク。目立つ。"},
      {name:"Pivoine", hex:"#D4577B", nameJp:"ピヴォワンヌ", desc:"Gorgeous rosy pink. Very flattering.", descJp:"美しいローズピンク。とても似合う。"},
      {name:"Cherry Berry", hex:"#8B0A1A", nameJp:"チェリーベリー", desc:"Deep, rich berry red. Very luxurious.", descJp:"深く豊かなベリーレッド。とても高級。"},
      {name:"Marine Rouge", hex:"#1C2951", nameJp:"マリンルージュ", desc:"Beautiful deep navy. Very refined.", descJp:"美しい深いネイビー。とても洗練。"},
      {name:"Noir", hex:"#1A1A1A", nameJp:"ノワール", desc:"Classic black. Can't go wrong.", descJp:"クラシックブラック。間違いなし。"}
    ],
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
    categories:["handbags", "jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chanel_logo_interlocking_cs.svg/512px-Chanel_logo_interlocking_cs.svg.png",
    auth:"Serial sticker + card (pre-2021). Microchip (post-2021). Quilting must align at seams.",
    authJp:"シリアルステッカー+カード（2021年以前）。マイクロチップ（2021年以降）。キルティングは縫い目で合う必須。",
    rare:"Prices increase 2-3x per year. Classic Flap was ~$2,800 in 2010, now over $10,000. GST and PST discontinued.",
    rareJp:"年2-3回値上げ。クラシックフラップは2010年~$2,800、今は$10,000以上。GSTとPST廃番。",
    tip:"Chanel increases prices every year. Whatever you pay today, it'll be worth more tomorrow.",
    tipJp:"シャネルは毎年値上げ。今日払う価格、明日にはもっと価値がある。",
    colors:[
      {name:"Caviar Black", hex:"#000000", nameJp:"キャビアブラック", desc:"Nothing more classic than black Chanel.", descJp:"ブラックシャネルほどクラシックなものはない。"},
      {name:"Beige Clair", hex:"#E8D5B7", nameJp:"ベージュクレール", desc:"Chanel's signature neutral. Very chic.", descJp:"シャネルのシグネチャーニュートラル。とてもシック。"},
      {name:"Navy", hex:"#1B2A4A", nameJp:"ネイビー", desc:"Deep, elegant navy. Very Parisian.", descJp:"深くエレガントなネイビー。とてもパリジャン。"},
      {name:"Burgundy", hex:"#6B1C23", nameJp:"バーガンディ", desc:"One of the best Chanel colors, honestly.", descJp:"正直、最高のシャネルカラーの一つ。"},
      {name:"Red", hex:"#CC0000", nameJp:"レッド", desc:"Chanel red is just perfect.", descJp:"シャネルレッドは完璧。"},
      {name:"Light Pink", hex:"#F8C8DC", nameJp:"ライトピンク", desc:"Very feminine and lovely.", descJp:"とてもフェミニンで素敵。"}
    ],
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
    categories:["handbags", "jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Herm%C3%A8s_Logo.svg/512px-Herm%C3%A8s_Logo.svg.png",
    auth:"Craftsman stamp with ID, year letter, blind stamp. Hand-stitched saddle stitch (angled, not straight).",
    authJp:"職人スタンプ+ID、年号レター、ブラインドスタンプ。手縫いサドルステッチ（斜め、直線ではない）。",
    rare:"Exotic leathers (croc, ostrich). Special orders (HSS). Limited colorways each season. Birkins NOT sold online — need SA relationship.",
    rareJp:"エキゾチックレザー（クロコ、オーストリッチ）。スペシャルオーダー（HSS）。シーズン限定カラー。バーキンはオンライン販売なし — SA関係必要。",
    colors:[
      {name:"Etoupe", hex:"#8B7D6B", nameJp:"エトゥープ", desc:"Hermès signature taupe-grey. Such a versatile color.", descJp:"エルメスのシグネチャー トープグレー。とても万能。"},
      {name:"Gold", hex:"#C19A6B", nameJp:"ゴールド", desc:"Tan/camel leather (NOT metallic). This brown just looks expensive.", descJp:"タン/キャメルレザー（メタリックではない）。この茶色は高そうに見える。"},
      {name:"Orange", hex:"#FF6600", nameJp:"オレンジ", desc:"THE Hermès color. Instantly recognizable.", descJp:"エルメスカラー。すぐわかる。"},
      {name:"Rouge H", hex:"#8B0000", nameJp:"ルージュ H", desc:"Beautiful deep red. So rich.", descJp:"美しい深紅。とても豊か。"},
      {name:"Bleu de France", hex:"#318CE7", nameJp:"ブルー・ド・フランス", desc:"Gorgeous bright blue. Very eye-catching.", descJp:"美しい明るいブルー。とても目を引く。"},
      {name:"Rose Sakura", hex:"#F8C8DC", nameJp:"ローズサクラ", desc:"Soft cherry blossom pink. So pretty.", descJp:"柔らかい桜ピンク。とても綺麗。"},
      {name:"Vert Olive", hex:"#556B2F", nameJp:"ヴェール・オリーブ", desc:"Love olive. It goes with so much.", descJp:"オリーブ大好き。何にでも合う。"}
    ],
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
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Gucci_Logo.svg/512px-Gucci_Logo.svg.png",
    auth:"Serial number tag inside (2 rows, 10-13 digits). Controllato card. Clean hardware.",
    authJp:"内側シリアル番号タグ（2行、10-13桁）。コントロラートカード。きれいな金具。",
    rare:"Tom Ford era (1994-2004) vintage premium. Vintage bamboo handles. Alessandro Michele era (2015-2022).",
    rareJp:"トム・フォード時代（1994-2004）ヴィンテージプレミアム。ヴィンテージバンブーハンドル。ミケーレ時代（2015-2022）。",
    tip:"Gucci goes through creative eras. Tom Ford pieces from the 90s? Highly collectible.",
    tipJp:"グッチはクリエイティブ時代を経る。90年代のトム・フォード作品？高コレクティブル。",
    colors:[
      {name:"GG Supreme Beige", hex:"#C9A882", nameJp:"GGスプリーム ベージュ", desc:"The iconic GG canvas. Classic Gucci.", descJp:"象徴的なGGキャンバス。クラシックなグッチ。"},
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Timeless black. Always in style.", descJp:"タイムレスなブラック。常にスタイリッシュ。"},
      {name:"Red", hex:"#C8102E", nameJp:"レッド", desc:"Bold Gucci red. Statement color.", descJp:"大胆なグッチレッド。ステートメントカラー。"},
      {name:"Pink", hex:"#FFB6C1", nameJp:"ピンク", desc:"Soft pink. Very feminine.", descJp:"柔らかいピンク。とてもフェミニン。"}
    ],
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
  },
  prada: {
    name:"Prada", year:1913, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Prada_logo.svg/512px-Prada_logo.svg.png",
    auth:"Authenticity card with serial number. Saffiano leather texture. Triangle logo plaque (metal, not plastic).",
    authJp:"シリアル番号付き真贋カード。サフィアーノレザーの質感。三角ロゴプレート（プラスチックではなく金属）。",
    rare:"Vintage nylon bags from 1980s-90s highly collectible. Limited edition Saffiano colors.",
    rareJp:"1980-90年代のヴィンテージナイロンバッグは高コレクタブル。限定版サフィアーノカラー。",
    tip:"Prada invented luxury nylon. Those vintage pieces? Worth more than when they were new.",
    tipJp:"プラダは高級ナイロンを発明。そのヴィンテージ作品？新品時より価値がある。",
    colors:[
      {name:"Saffiano Black", hex:"#000000", nameJp:"サフィアーノブラック", desc:"Classic Prada. Scratch-resistant.", descJp:"クラシックなプラダ。耐傷性。"},
      {name:"Saffiano Pink", hex:"#F4C2C2", nameJp:"サフィアーノピンク", desc:"Beautiful blush pink. Very elegant.", descJp:"美しいブラッシュピンク。とてもエレガント。"},
      {name:"Saffiano Red", hex:"#C41E3A", nameJp:"サフィアーノレッド", desc:"Gorgeous red. Very striking.", descJp:"美しいレッド。とても印象的。"},
      {name:"Navy", hex:"#000080", nameJp:"ネイビー", desc:"Deep navy. Professional and chic.", descJp:"深いネイビー。プロフェッショナルでシック。"}
    ],
    models:[
      { name:"Galleria", brief:"Structured tote - professional", briefJp:"構造的トート - プロフェッショナル",
        desc:"Prada's iconic tote in Saffiano leather. The ultimate work bag.",
        descJp:"サフィアーノレザーのプラダの象徴的なトート。究極の仕事バッグ。",
        shape:"Rectangular structured tote with double handles. Detachable shoulder strap.",
        shapeJp:"ダブルハンドル付き長方形の構造的トート。取り外し可能なショルダーストラップ。",
        sizes:[
          {name:"Small", dim:"10.2\"W × 7.5\"H × 5.5\"D"},
          {name:"Medium", dim:"13\"W × 9.8\"H × 6.3\"D - MOST POPULAR"},
          {name:"Large", dim:"15\"W × 11\"H × 7\"D"}
        ],
        rare:"Limited edition colors. Two-tone versions. Crocodile leather (extremely rare).",
        rareJp:"限定版カラー。ツートーンバージョン。クロコダイルレザー（極めて希少）。",
        tip:"The Galleria is THE executive bag. Holds everything, looks sharp, lasts forever.",
        tipJp:"ガレリアはTHEエグゼクティブバッグ。全部入る、シャープに見える、永遠に持つ。"
      }
    ]
  },
  dior: {
    name:"Dior", year:1946, country:"France",
    categories:["handbags", "jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Dior_Logo.svg/512px-Dior_Logo.svg.png",
    auth:"'CHRISTIAN DIOR PARIS' stamp inside. Serial number tag. Cannage quilting must be perfectly symmetrical.",
    authJp:"内側に「CHRISTIAN DIOR PARIS」刻印。シリアル番号タグ。カナージュキルティングは完全に対称である必要。",
    rare:"Vintage Lady Dior (Princess Diana's favorite). Saddle Bag revival. Limited edition embroideries.",
    rareJp:"ヴィンテージレディディオール（ダイアナ妃のお気に入り）。サドルバッグ復活。限定版刺繍。",
    tip:"The Lady Dior was Princess Diana's signature bag. That's royalty in your hands.",
    tipJp:"レディディオールはダイアナ妃のシグネチャーバッグ。あなたの手の中の王室。",
    colors:[
      {name:"Black Cannage", hex:"#000000", nameJp:"ブラック カナージュ", desc:"The classic. Pure elegance.", descJp:"クラシック。純粋なエレガンス。"},
      {name:"Light Pink", hex:"#FFB6C1", nameJp:"ライトピンク", desc:"So feminine and romantic.", descJp:"とてもフェミニンでロマンティック。"},
      {name:"Navy", hex:"#000080", nameJp:"ネイビー", desc:"Sophisticated navy. Very Parisian.", descJp:"洗練されたネイビー。とてもパリジャン。"},
      {name:"Red", hex:"#DC143C", nameJp:"レッド", desc:"Classic Dior red. Stunning.", descJp:"クラシックなディオールレッド。素晴らしい。"}
    ],
    models:[
      { name:"Lady Dior", brief:"Cannage quilted - iconic elegance", briefJp:"カナージュキルト - 象徴的なエレガンス",
        desc:"The most iconic Dior bag. Cannage quilting with DIOR charms.",
        descJp:"最も象徴的なディオールバッグ。DIORチャーム付きカナージュキルティング。",
        shape:"Structured bag with signature Cannage quilting. Top handles with detachable shoulder strap.",
        shapeJp:"シグネチャー カナージュキルティングの構造的バッグ。取り外し可能なショルダーストラップ付きトップハンドル。",
        sizes:[
          {name:"Mini", dim:"6.7\"W × 5.5\"H × 3.9\"D"},
          {name:"Small", dim:"7.9\"W × 6.3\"H × 4.3\"D"},
          {name:"Medium", dim:"9.4\"W × 7.9\"H × 5.1\"D - MOST POPULAR"},
          {name:"Large", dim:"12.2\"W × 10.2\"H × 5.9\"D"}
        ],
        rare:"Princess Diana's personal collection pieces. Limited edition embellishments. Two-tone versions.",
        rareJp:"ダイアナ妃の個人コレクション作品。限定版装飾。ツートーンバージョン。",
        tip:"Princess Diana made this bag famous. It was literally named after her. Icon status.",
        tipJp:"ダイアナ妃がこのバッグを有名にした。文字通り彼女にちなんで命名。アイコンステータス。"
      }
    ]
  },
  cartier: {
    name:"Cartier", year:1847, country:"France",
    categories:["jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Cartier_logo.svg/512px-Cartier_logo.svg.png",
    auth:"Serial number engraved. Hallmark stamps (750 for 18k gold, 950 for platinum). Screw system on Love bracelet must be smooth.",
    authJp:"シリアル番号刻印。ホールマークスタンプ（18金は750、プラチナは950）。ラブブレスレットのネジシステムは滑らかである必要。",
    rare:"Vintage pieces from 1970s-80s. Limited edition colors. Yellow gold (less common than white/rose).",
    rareJp:"1970-80年代のヴィンテージ作品。限定版カラー。イエローゴールド（ホワイト/ローズより希少）。",
    tip:"The Love bracelet? You need a screwdriver to take it off. That's commitment. That's Cartier.",
    tipJp:"ラブブレスレット？外すにはドライバーが必要。それがコミットメント。それがカルティエ。",
    colors:[
      {name:"18k Yellow Gold", hex:"#FFD700", nameJp:"18金イエローゴールド", desc:"Classic gold. Timeless.", descJp:"クラシックゴールド。タイムレス。"},
      {name:"18k White Gold", hex:"#E5E4E2", nameJp:"18金ホワイトゴールド", desc:"Modern and sleek.", descJp:"モダンでスリーク。"},
      {name:"18k Rose Gold", hex:"#B76E79", nameJp:"18金ローズゴールド", desc:"So flattering on every skin tone.", descJp:"どんな肌色にも似合う。"},
      {name:"Platinum", hex:"#E5E4E2", nameJp:"プラチナ", desc:"The ultimate luxury metal.", descJp:"究極の高級金属。"}
    ],
    models:[
      { name:"Love Bracelet", brief:"Iconic screw bracelet - symbol of love", briefJp:"象徴的なネジブレスレット - 愛のシンボル",
        desc:"The most iconic Cartier piece. Oval bracelet with screw motifs. Needs screwdriver to put on/take off.",
        descJp:"最も象徴的なカルティエ作品。ネジモチーフ付きオーバルブレスレット。着脱にドライバーが必要。",
        shape:"Oval bangle with screw details. Flat profile sits close to wrist.",
        shapeJp:"ネジディテール付きオーバルバングル。フラットプロファイルで手首に密着。",
        sizes:[
          {name:"Size 15", dim:"6.2cm diameter - Small wrist"},
          {name:"Size 16", dim:"6.4cm diameter - MOST POPULAR"},
          {name:"Size 17", dim:"6.6cm diameter - Medium wrist"},
          {name:"Size 18", dim:"6.8cm diameter - Large wrist"},
          {name:"Size 19", dim:"7.0cm diameter - XL wrist"}
        ],
        rare:"Vintage from 1970s (first release). Full diamond pave. Limited edition colored stones (sapphires, emeralds).",
        rareJp:"1970年代のヴィンテージ（初回リリース）。フルダイヤモンドパヴェ。限定版カラーストーン（サファイア、エメラルド）。",
        tip:"People wear this 24/7. They sleep in it, shower in it. That's how iconic it is.",
        tipJp:"人々は24時間これを着ける。寝る時も、シャワーの時も。それがどれだけ象徴的か。"
      },
      { name:"Juste un Clou", brief:"Nail bracelet - bold statement", briefJp:"釘ブレスレット - 大胆なステートメント",
        desc:"Bracelet shaped like a bent nail. Bold, modern design launched in 1970s New York.",
        descJp:"曲がった釘の形のブレスレット。1970年代ニューヨークで発売された大胆でモダンなデザイン。",
        shape:"Curved nail design that wraps around wrist. Sharp, geometric ends.",
        shapeJp:"手首を巻く曲がった釘デザイン。鋭い幾何学的な端。",
        sizes:[
          {name:"Size 15", dim:"6.2cm diameter"},
          {name:"Size 16", dim:"6.4cm diameter - MOST POPULAR"},
          {name:"Size 17", dim:"6.6cm diameter"},
          {name:"Size 18", dim:"6.8cm diameter"}
        ],
        rare:"Full diamond version. Vintage 1970s original. Yellow gold (rarer than white/rose).",
        rareJp:"フルダイヤモンドバージョン。1970年代のヴィンテージオリジナル。イエローゴールド（ホワイト/ローズより希少）。",
        tip:"It's a NAIL. Cartier made a nail into jewelry. And it costs thousands. That's fashion.",
        tipJp:"それは釘。カルティエは釘をジュエリーにした。そして何千ドルもする。それがファッション。"
      },
      { name:"Trinity Ring", brief:"Three-band ring - eternal symbol", briefJp:"3バンドリング - 永遠のシンボル",
        desc:"Three interlocking bands in three golds: white, yellow, rose. Represents love, fidelity, friendship.",
        descJp:"3色のゴールドの3つの連結バンド：ホワイト、イエロー、ローズ。愛、忠誠、友情を表す。",
        shape:"Three rolling bands interlocked. Each band is a different gold color.",
        shapeJp:"3つのローリングバンドが連結。各バンドは異なるゴールドカラー。",
        sizes:[
          {name:"Size 47", dim:"Ring size 4 US"},
          {name:"Size 49", dim:"Ring size 5 US"},
          {name:"Size 52", dim:"Ring size 6 US - MOST POPULAR"},
          {name:"Size 54", dim:"Ring size 7 US"},
          {name:"Size 57", dim:"Ring size 8 US"}
        ],
        rare:"Full diamond pave versions. Wide band versions. Vintage from 1920s-30s.",
        rareJp:"フルダイヤモンドパヴェバージョン。ワイドバンドバージョン。1920-30年代のヴィンテージ。",
        tip:"Three bands, three golds, three meanings. Jean Cocteau wore one. Poetry in jewelry form.",
        tipJp:"3バンド、3ゴールド、3つの意味。ジャン・コクトーが着用。ジュエリー形式の詩。"
      }
    ]
  },
  bulgari: {
    name:"Bulgari", year:1884, country:"Italy",
    categories:["jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Bulgari_logo.svg/512px-Bulgari_logo.svg.png",
    auth:"BVLGARI stamp (uses V instead of U, Roman style). Serial number. Logo must be crisp, not blurry.",
    authJp:"BVLGARI刻印（ローマ式でUではなくVを使用）。シリアル番号。ロゴは鮮明で、ぼやけていない必要。",
    rare:"Vintage Serpenti watches. Monete (ancient coin) jewelry. Elizabeth Taylor's personal collection pieces.",
    rareJp:"ヴィンテージ セルペンティウォッチ。モネーテ（古代コイン）ジュエリー。エリザベス・テイラーの個人コレクション作品。",
    tip:"Elizabeth Taylor had the world's greatest Bulgari collection. This is Hollywood royalty jewelry.",
    tipJp:"エリザベス・テイラーは世界最高のブルガリコレクションを持っていた。これはハリウッド王室のジュエリー。",
    colors:[
      {name:"18k Yellow Gold", hex:"#FFD700", nameJp:"18金イエローゴールド", desc:"Classic Bulgari gold. Very Italian.", descJp:"クラシックなブルガリゴールド。とてもイタリアン。"},
      {name:"18k White Gold", hex:"#E5E4E2", nameJp:"18金ホワイトゴールド", desc:"Modern elegance.", descJp:"モダンなエレガンス。"},
      {name:"18k Rose Gold", hex:"#B76E79", nameJp:"18金ローズゴールド", desc:"Warm and luxurious.", descJp:"温かく豪華。"},
      {name:"Onyx Black", hex:"#000000", nameJp:"オニキスブラック", desc:"Dramatic black stone inlays.", descJp:"ドラマティックなブラックストーンインレイ。"}
    ],
    models:[
      { name:"Serpenti", brief:"Snake bracelet watch - iconic flexibility", briefJp:"蛇ブレスレットウォッチ - 象徴的な柔軟性",
        desc:"Iconic snake-shaped watch bracelet. Flexible scale design wraps around wrist.",
        descJp:"象徴的な蛇形ウォッチブレスレット。柔軟なスケールデザインが手首を巻く。",
        shape:"Coiled snake bracelet with watch face. Articulated scales allow flexibility.",
        shapeJp:"時計文字盤付きコイル状の蛇ブレスレット。関節スケールで柔軟性を実現。",
        sizes:[
          {name:"One Size", dim:"Flexible - fits most wrists"}
        ],
        rare:"Vintage 1960s-70s Serpenti. Full diamond versions. Enamel scale details.",
        rareJp:"1960-70年代のヴィンテージ セルペンティ。フルダイヤモンドバージョン。エナメルスケールディテール。",
        tip:"It's a SNAKE watch. The scales move. Elizabeth Taylor wore one. Need I say more?",
        tipJp:"それは蛇時計。スケールが動く。エリザベス・テイラーが着用。これ以上何を言う必要がある？"
      },
      { name:"B.zero1", brief:"Spiral ring - modern icon", briefJp:"スパイラルリング - モダンアイコン",
        desc:"Bold spiral band ring inspired by Roman Colosseum architecture.",
        descJp:"ローマのコロッセオ建築にインスパイアされた大胆なスパイラルバンドリング。",
        shape:"Wide band with raised spiral edges. Central engraved BVLGARI BVLGARI logo.",
        shapeJp:"盛り上がったスパイラルエッジのワイドバンド。中央にBVLGARI BVLGARI刻印ロゴ。",
        sizes:[
          {name:"Size 50", dim:"Ring size 5 US"},
          {name:"Size 52", dim:"Ring size 6 US - MOST POPULAR"},
          {name:"Size 54", dim:"Ring size 7 US"},
          {name:"Size 56", dim:"Ring size 8 US"}
        ],
        rare:"Full diamond pave. Ceramic inlay versions. Limited edition colors.",
        rareJp:"フルダイヤモンドパヴェ。セラミックインレイバージョン。限定版カラー。",
        tip:"Inspired by the Colosseum. You're wearing 2,000 years of Roman history on your finger.",
        tipJp:"コロッセオにインスパイア。あなたは指に2000年のローマの歴史を着けている。"
      }
    ]
  },
  tiffany: {
    name:"Tiffany & Co.", year:1837, country:"USA",
    categories:["jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Tiffany_%26_Co._logo.svg/512px-Tiffany_%26_Co._logo.svg.png",
    auth:"'Tiffany & Co.' stamp. Sterling silver marked '925'. Comes in iconic blue box with white ribbon.",
    authJp:"「Tiffany & Co.」刻印。スターリングシルバーには「925」マーク。象徴的なブルーボックスとホワイトリボン付き。",
    rare:"Elsa Peretti vintage designs. Paloma Picasso collection. Schlumberger pieces (very rare).",
    rareJp:"エルサ・ペレッティのヴィンテージデザイン。パロマ・ピカソコレクション。シュランバーガー作品（非常に希少）。",
    tip:"The blue box alone is worth something. Everyone knows that Tiffany blue. Instant recognition.",
    tipJp:"ブルーボックスだけでも価値がある。誰もがあのティファニーブルーを知っている。即座に認識。",
    colors:[
      {name:"Sterling Silver", hex:"#C0C0C0", nameJp:"スターリングシルバー", desc:"Classic Tiffany silver. Never goes out of style.", descJp:"クラシックなティファニーシルバー。流行に左右されない。"},
      {name:"18k Yellow Gold", hex:"#FFD700", nameJp:"18金イエローゴールド", desc:"Warm gold. Very elegant.", descJp:"温かいゴールド。とてもエレガント。"},
      {name:"18k Rose Gold", hex:"#B76E79", nameJp:"18金ローズゴールド", desc:"Modern and romantic.", descJp:"モダンでロマンティック。"},
      {name:"Tiffany Blue", hex:"#81D8D0", nameJp:"ティファニーブルー", desc:"THE color. Instantly recognizable.", descJp:"THEカラー。即座に認識可能。"}
    ],
    models:[
      { name:"Return to Tiffany", brief:"Heart tag - iconic design", briefJp:"ハートタグ - 象徴的デザイン",
        desc:"Heart-shaped tag engraved 'Please Return to Tiffany & Co. New York'. Classic gift piece.",
        descJp:"「Please Return to Tiffany & Co. New York」刻印のハート型タグ。クラシックなギフトピース。",
        shape:"Heart-shaped pendant or charm on chain/bracelet. Engraved text on front.",
        shapeJp:"チェーンまたはブレスレットのハート型ペンダントまたはチャーム。前面に刻印テキスト。",
        sizes:[
          {name:"Small Heart", dim:"0.6\"W pendant"},
          {name:"Medium Heart", dim:"0.8\"W pendant - MOST POPULAR"},
          {name:"Large Heart", dim:"1\"W pendant"}
        ],
        rare:"Vintage 1970s-80s originals. Enamel heart versions (blue). Limited edition colors.",
        rareJp:"1970-80年代のヴィンテージオリジナル。エナメルハートバージョン（ブルー）。限定版カラー。",
        tip:"The message says return it to Tiffany if found. Because it's that valuable. Sweet, right?",
        tipJp:"メッセージは見つけたらティファニーに返すと言っている。それだけ価値があるから。素敵でしょ？"
      },
      { name:"T Collection", brief:"Bold T motif - modern luxury", briefJp:"大胆なTモチーフ - モダンラグジュアリー",
        desc:"Bold, graphic T design in bracelets, rings, necklaces. Modern Tiffany aesthetic.",
        descJp:"ブレスレット、リング、ネックレスの大胆でグラフィカルなTデザイン。モダンなティファニー美学。",
        shape:"Geometric T shape in various forms - wire, solid, pave.",
        shapeJp:"ワイヤー、ソリッド、パヴェなど様々な形の幾何学的T形状。",
        sizes:[
          {name:"Small", dim:"Varies by piece"},
          {name:"Medium", dim:"Varies by piece - MOST POPULAR"},
          {name:"Large", dim:"Varies by piece"}
        ],
        rare:"Full diamond pave. Two-tone gold. Limited edition stones.",
        rareJp:"フルダイヤモンドパヴェ。ツートーンゴールド。限定版ストーン。",
        tip:"The T is for Tiffany. Big, bold, modern. This is NOT your grandmother's Tiffany.",
        tipJp:"TはティファニーのT。大きく、大胆、モダン。これはあなたのおばあちゃんのティファニーではない。"
      }
    ]
  },
  vca: {
    name:"Van Cleef & Arpels", year:1906, country:"France",
    categories:["jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Van_Cleef_%26_Arpels_logo.svg/512px-Van_Cleef_%26_Arpels_logo.svg.png",
    auth:"VCA hallmark stamp. Serial number. Mother-of-pearl pieces have natural variation. Alhambra clover must have 4 leaves.",
    authJp:"VCAホールマークスタンプ。シリアル番号。マザーオブパールピースは自然なバリエーション。アルハンブラクローバーは4葉である必要。",
    rare:"Vintage Alhambra from 1960s-70s. Limited edition stone colors (carnelian, tiger's eye). Mystery Set technique pieces.",
    rareJp:"1960-70年代のヴィンテージ アルハンブラ。限定版ストーンカラー（カーネリアン、タイガーアイ）。ミステリーセット技術作品。",
    tip:"The Alhambra is lucky. Four-leaf clover. Grace Kelly wore it. Royalty and luck combined.",
    tipJp:"アルハンブラは幸運。四つ葉のクローバー。グレース・ケリーが着用。王室と幸運の組み合わせ。",
    colors:[
      {name:"18k Yellow Gold", hex:"#FFD700", nameJp:"18金イエローゴールド", desc:"Classic VCA gold. Timeless.", descJp:"クラシックなVCAゴールド。タイムレス。"},
      {name:"18k White Gold", hex:"#E5E4E2", nameJp:"18金ホワイトゴールド", desc:"Elegant and modern.", descJp:"エレガントでモダン。"},
      {name:"18k Rose Gold", hex:"#B76E79", nameJp:"18金ローズゴールド", desc:"Warm and feminine.", descJp:"温かくフェミニン。"},
      {name:"Mother of Pearl White", hex:"#F8F8FF", nameJp:"マザーオブパール ホワイト", desc:"Iridescent white. So beautiful.", descJp:"虹色のホワイト。とても美しい。"},
      {name:"Onyx Black", hex:"#000000", nameJp:"オニキス ブラック", desc:"Deep black stone. Very chic.", descJp:"深いブラックストーン。とてもシック。"},
      {name:"Carnelian", hex:"#B7410E", nameJp:"カーネリアン", desc:"Gorgeous orange-red stone.", descJp:"美しいオレンジレッドストーン。"}
    ],
    models:[
      { name:"Alhambra", brief:"Four-leaf clover - lucky charm", briefJp:"四つ葉のクローバー - 幸運のお守り",
        desc:"Iconic four-leaf clover motif. Available in various stones and sizes. The signature VCA design.",
        descJp:"象徴的な四つ葉のクローバーモチーフ。様々なストーンとサイズで利用可能。VCAのシグネチャーデザイン。",
        shape:"Quatrefoil (4-leaf clover) shape. Beaded gold border around stone inlay.",
        shapeJp:"クアトレフォイル（4葉クローバー）形状。ストーンインレイの周りにビーズゴールドボーダー。",
        sizes:[
          {name:"Sweet (Extra Small)", dim:"0.4\" clover"},
          {name:"Vintage (Small)", dim:"0.6\" clover - MOST POPULAR"},
          {name:"Magic (Medium)", dim:"0.8\" clover"},
          {name:"Alhambra (Large)", dim:"1\" clover"}
        ],
        rare:"Vintage from 1960s-70s. Rare stones (tiger's eye, turquoise, lapis). Limited edition colors.",
        rareJp:"1960-70年代のヴィンテージ。希少ストーン（タイガーアイ、ターコイズ、ラピス）。限定版カラー。",
        tip:"Four-leaf clover for luck. Grace Kelly, Princess of Monaco, wore these. Luck AND royalty.",
        tipJp:"幸運のための四つ葉のクローバー。モナコ公妃グレース・ケリーが着用。幸運と王室。"
      },
      { name:"Perlée", brief:"Gold bead bracelet - delicate luxury", briefJp:"ゴールドビーズブレスレット - 繊細な高級",
        desc:"Delicate gold beaded bracelet. Signature VCA beading technique.",
        descJp:"繊細なゴールドビーズブレスレット。VCAのシグネチャービーディング技術。",
        shape:"Thin bangle with tiny gold beads along edges. Smooth, tactile finish.",
        shapeJp:"エッジに沿った小さなゴールドビーズの細いバングル。滑らかで触覚的な仕上げ。",
        sizes:[
          {name:"Small", dim:"6.3cm diameter"},
          {name:"Medium", dim:"6.5cm diameter - MOST POPULAR"},
          {name:"Large", dim:"6.7cm diameter"}
        ],
        rare:"Full diamond pave. Multi-strand versions. Limited edition stones.",
        rareJp:"フルダイヤモンドパヴェ。マルチストランドバージョン。限定版ストーン。",
        tip:"Subtle luxury. Just gold beads, but you KNOW it's VCA. That's understated elegance.",
        tipJp:"控えめな高級。ただのゴールドビーズだけど、VCAだとわかる。それが控えめなエレガンス。"
      }
    ]
  },
  bottegaveneta: {
    name:"Bottega Veneta", year:1966, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bottega_Veneta_logo.svg/512px-Bottega_Veneta_logo.svg.png",
    auth:"No logo on exterior. Intrecciato weave must be perfect and even. Interior stamp: 'BOTTEGA VENETA' + 'MADE IN ITALY' + serial number.",
    authJp:"外側にロゴなし。イントレチャート編みは完璧で均一である必要。内側刻印：「BOTTEGA VENETA」+「MADE IN ITALY」+シリアル番号。",
    rare:"Tomas Maier era (2001-2018) pieces highly collectible. The Pouch, The Chain Cassette. Vintage woven bags.",
    rareJp:"トーマス・マイヤー時代（2001-2018）作品は高コレクティブル。ザ・ポーチ、ザ・チェーンカセット。ヴィンテージ編みバッグ。",
    tip:"No logo = quiet luxury. The weave IS the logo. Buyers who know, know.",
    tipJp:"ロゴなし = 静かなラグジュアリー。編みがロゴ。知ってる人は知ってる。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Classic BV. Timeless and versatile.", descJp:"クラシックBV。タイムレスで万能。"},
      {name:"Fondente (Dark Brown)", hex:"#3E2723", nameJp:"フォンデンテ（ダークブラウン）", desc:"Rich chocolate brown. Very popular.", descJp:"リッチなチョコレートブラウン。とても人気。"},
      {name:"Parakeet (Green)", hex:"#7CB342", nameJp:"パラキート（グリーン）", desc:"Bold, unexpected. Statement color.", descJp:"大胆、予想外。ステートメントカラー。"},
      {name:"Cream/Chalk", hex:"#F5F5DC", nameJp:"クリーム/チョーク", desc:"Soft neutral. Shows the weave beautifully.", descJp:"ソフトなニュートラル。編みを美しく見せる。"}
    ],
    models:[
      { name:"The Pouch", brief:"Oversized clutch - iconic pillow shape", briefJp:"特大クラッチ - 象徴的なピロー形状",
        desc:"Bottega's most iconic modern bag. Soft, gathered leather clutch that looks like a cloud. No structure, pure luxury.",
        descJp:"ボッテガの最も象徴的なモダンバッグ。雲のような柔らかいギャザーレザークラッチ。構造なし、純粋なラグジュアリー。",
        shape:"Soft gathered pouch with magnetic closure. No structure - collapses when not full. Signature gathered leather.",
        shapeJp:"マグネットクロージャーのソフトギャザーポーチ。構造なし - 空の時は潰れる。シグネチャーのギャザーレザー。",
        sizes:[
          {name:"Mini", dim:"7.9\"W × 4.7\"H"},
          {name:"Small", dim:"11.8\"W × 7.1\"H"},
          {name:"Large", dim:"15.7\"W × 9.8\"H - MOST POPULAR"},
          {name:"Maxi", dim:"19.7\"W × 12.6\"H"}
        ],
        rare:"Tomas Maier era (2019). Limited edition colors like Parakeet green. Exotic leather versions.",
        rareJp:"トーマス・マイヤー時代（2019）。パラキートグリーンなど限定版カラー。エキゾチックレザーバージョン。",
        tip:"Hold it like a clutch or tuck under arm. The gathered leather is BUTTER soft. No logos - pure quiet luxury.",
        tipJp:"クラッチのように持つか、脇に挟む。ギャザーレザーはバターのように柔らか。ロゴなし - 純粋な静かなラグジュアリー。"
      },
      { name:"Cassette", brief:"Padded woven crossbody - puffy signature", briefJp:"パッド入り編みクロスボディ - ぷっくりシグネチャー",
        desc:"Puffy, padded Intrecciato weave. Became hugely popular 2019+. Soft, pillow-like quilted squares.",
        descJp:"ぷっくりとパッド入りイントレチャート編み。2019年以降大人気。柔らかい、枕のようなキルトスクエア。",
        shape:"Rectangular with rounded corners. Padded woven squares. Chain strap. Flap closure.",
        shapeJp:"丸みのある角の長方形。パッド入り編みスクエア。チェーンストラップ。フラップクロージャー。",
        sizes:[
          {name:"Mini", dim:"5.5\"W × 4.3\"H × 2.4\"D"},
          {name:"Small", dim:"7.1\"W × 5.5\"H × 3.1\"D - MOST POPULAR"},
          {name:"Medium", dim:"11\"W × 7.9\"H × 3.9\"D"}
        ],
        rare:"Chain Cassette (woven chain strap). Jodie (hobo version). Limited colors.",
        rareJp:"チェーンカセット（編みチェーンストラップ）。ジョディ（ホーボーバージョン）。限定カラー。",
        tip:"The padding makes it SO luxe. Feels like a cloud. The weave is tight and perfect - check for loose threads.",
        tipJp:"パッドがとても豪華に見せる。雲のよう。編みがタイトで完璧 - 緩んだ糸をチェック。"
      },
      { name:"Jodie", brief:"Gathered hobo - slouchy everyday", briefJp:"ギャザーホーボー - たるんだ日常用",
        desc:"Slouchy hobo style with gathered Intrecciato weave. Knotted strap detail. Casual luxury.",
        descJp:"ギャザーイントレチャート編みのたるんだホーボースタイル。結び目ストラップディテール。カジュアルラグジュアリー。",
        shape:"Slouchy half-moon hobo. Gathered woven leather. Single knotted shoulder strap.",
        shapeJp:"たるんだ半月ホーボー。ギャザー編みレザー。シングル結び目ショルダーストラップ。",
        sizes:[
          {name:"Mini", dim:"7.5\"W × 5.9\"H × 2.8\"D"},
          {name:"Small", dim:"10.2\"W × 7.9\"H × 3.5\"D - MOST POPULAR"},
          {name:"Medium", dim:"13\"W × 10.2\"H × 4.3\"D"}
        ],
        rare:"First season (2020). Unique colorways. Tomas Maier's last designs.",
        rareJp:"初シーズン（2020）。ユニークなカラーウェイ。トーマス・マイヤーの最後のデザイン。",
        tip:"Perfect everyday bag. Slouchy but polished. The knotted strap is signature BV - mention it!",
        tipJp:"完璧な日常バッグ。たるんでいるが洗練。結び目ストラップはシグネチャーBV - 言及して！"
      }
    ]
  },
  fendi: {
    name:"Fendi", year:1925, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Fendi_Logo.svg/512px-Fendi_Logo.svg.png",
    auth:"Double F logo (Zucca pattern). Serial number + 'FENDI' stamp inside. Hardware engraved with FENDI.",
    authJp:"ダブルFロゴ（ズッカパターン）。内側にシリアル番号+「FENDI」刻印。金具にFENDI刻印。",
    rare:"Baguette bag (90s icon). Karl Lagerfeld collaborations. Peekaboo in exotic leathers.",
    rareJp:"バゲットバッグ（90年代アイコン）。カール・ラガーフェルドコラボ。エキゾチックレザーのピーカブー。",
    tip:"The Baguette is THE 90s It bag. Sex and the City made it famous. Vintage is hot right now.",
    tipJp:"バゲットはTHE 90年代Itバッグ。セックス・アンド・ザ・シティで有名に。ヴィンテージが今熱い。",
    colors:[
      {name:"Zucca Brown", hex:"#8B4513", nameJp:"ズッカブラウン", desc:"Classic FF monogram. Instantly recognizable.", descJp:"クラシックFFモノグラム。即座に認識可能。"},
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Sleek and timeless. Hides wear well.", descJp:"スリークでタイムレス。摩耗を隠す。"},
      {name:"Tobacco/Cognac", hex:"#A0522D", nameJp:"タバコ/コニャック", desc:"Warm brown leather. Very luxurious.", descJp:"温かいブラウンレザー。とても豪華。"},
      {name:"Pink/Blush", hex:"#FFB6C1", nameJp:"ピンク/ブラッシュ", desc:"Feminine and playful. Limited editions.", descJp:"女性的で遊び心。限定版。"}
    ],
    models:[
      { name:"Baguette", brief:"Compact underarm clutch - 90s icon", briefJp:"コンパクト脇下クラッチ - 90年代アイコン",
        desc:"THE It bag of the late 90s. Compact, fits under your arm like a French baguette. Sex and the City made it famous.",
        descJp:"90年代後半のTHE Itバッグ。コンパクト、フランスのバゲットのように脇の下に収まる。セックス・アンド・ザ・シティで有名に。",
        shape:"Small rectangular bag. Flap closure. Short shoulder strap. Fits snugly under arm.",
        shapeJp:"小さな長方形バッグ。フラップクロージャー。短いショルダーストラップ。脇の下にぴったり収まる。",
        sizes:[
          {name:"Mini", dim:"6.7\"W × 4.3\"H × 1.6\"D"},
          {name:"Regular", dim:"10\"W × 6\"H × 2\"D - MOST POPULAR"},
          {name:"Large", dim:"12\"W × 7\"H × 3\"D"}
        ],
        rare:"Vintage 1997-2000 (original release). Embroidered/beaded versions. Karl Lagerfeld collaborations. Sequin Baguettes.",
        rareJp:"1997-2000年のヴィンテージ（オリジナルリリース）。刺繍/ビーズバージョン。カール・ラガーフェルドコラボ。スパンコールバゲット。",
        tip:"Carrie Bradshaw carried THIS bag. Tell that story! Vintage Baguettes from the 90s are collector's items now.",
        tipJp:"キャリー・ブラッドショーがこのバッグを持った。その話をして！90年代のヴィンテージバゲットは今コレクターアイテム。"
      },
      { name:"Peekaboo", brief:"Structured tote - iconic twist lock", briefJp:"構造的トート - 象徴的なツイストロック",
        desc:"Fendi's modern icon. Structured frame bag with distinctive twist-lock closure. Professional yet stylish.",
        descJp:"フェンディのモダンアイコン。特徴的なツイストロッククロージャー付き構造フレームバッグ。プロフェッショナルでスタイリッシュ。",
        shape:"Structured rectangular frame bag. Double top handles. Twist-lock closure. Interior divided into compartments.",
        shapeJp:"構造的長方形フレームバッグ。ダブルトップハンドル。ツイストロッククロージャー。コンパートメントに分かれた内部。",
        sizes:[
          {name:"Mini", dim:"7.9\"W × 6.3\"H × 4.3\"D"},
          {name:"Regular", dim:"12.6\"W × 9.8\"H × 6.3\"D - MOST POPULAR"},
          {name:"Large", dim:"15\"W × 11\"H × 7\"D"}
        ],
        rare:"Selleria (hand-stitched). Exotic leathers (python, crocodile). Two-tone color combinations.",
        rareJp:"セレリア（手縫い）。エキゾチックレザー（パイソン、クロコダイル）。ツートーンカラーコンビネーション。",
        tip:"The twist-lock is signature. Show how it opens - buyers love that detail. It's a work bag that's also chic.",
        tipJp:"ツイストロックはシグネチャー。開き方を見せて - バイヤーはその詳細が好き。シックな仕事バッグ。"
      },
      { name:"By The Way", brief:"Crossbody satchel - everyday luxury", briefJp:"クロスボディサッチェル - 日常ラグジュアリー",
        desc:"Modern crossbody satchel. Structured but lightweight. Perfect everyday bag with shoulder strap.",
        descJp:"モダンクロスボディサッチェル。構造的だが軽量。ショルダーストラップ付き完璧な日常バッグ。",
        shape:"Small structured satchel. Top handle + detachable shoulder strap. Zip closure. Compact but roomy.",
        shapeJp:"小さな構造サッチェル。トップハンドル+取り外し可能ショルダーストラップ。ジップクロージャー。コンパクトだが広々。",
        sizes:[
          {name:"Mini", dim:"7.5\"W × 6.3\"H × 3.5\"D - MOST POPULAR"},
          {name:"Small", dim:"9.8\"W × 7.9\"H × 4.7\"D"},
          {name:"Medium", dim:"12.2\"W × 9\"H × 5.5\"D"}
        ],
        rare:"Two-tone leather. Studded versions. Limited edition prints.",
        rareJp:"ツートーンレザー。スタッズバージョン。限定版プリント。",
        tip:"Practical AND luxurious. Fits phone, wallet, keys. The shoulder strap is adjustable - show that!",
        tipJp:"実用的で豪華。電話、財布、鍵が入る。ショルダーストラップは調整可能 - それを見せて！"
      }
    ]
  },
  celine: {
    name:"Celine", year:1945, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Celine_logo.svg/512px-Celine_logo.svg.png",
    auth:"'CÉLINE PARIS' stamp (note the accent). Made in Italy stamp. Serial number embossed on leather tab.",
    authJp:"「CÉLINE PARIS」刻印（アクセント注意）。Made in Italyスタンプ。レザータブにシリアル番号エンボス。",
    rare:"Phoebe Philo era (2008-2017) extremely sought after. Phantom, Trapeze, Classic Box. Minimalist aesthetic.",
    rareJp:"フィービー・ファイロ時代（2008-2017）極めて人気。ファントム、トラペーズ、クラシックボックス。ミニマリスト美学。",
    tip:"Phoebe Philo Celine is THE collector's grail. Minimalist, no logos. If you know, you know.",
    tipJp:"フィービー・ファイロ セリーヌはTHEコレクター聖杯。ミニマリスト、ロゴなし。知ってる人は知ってる。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Ultimate minimalism. Never goes out of style.", descJp:"究極のミニマリズム。流行に左右されない。"},
      {name:"Taupe/Dune", hex:"#C9B29C", nameJp:"トープ/デューン", desc:"Warm neutral. Phoebe Philo signature.", descJp:"温かいニュートラル。フィービー・ファイロシグネチャー。"},
      {name:"Navy", hex:"#000080", nameJp:"ネイビー", desc:"Sophisticated alternative to black.", descJp:"ブラックの洗練された代替。"},
      {name:"Burgundy/Oxblood", hex:"#800020", nameJp:"バーガンディ/オックスブラッド", desc:"Rich, luxurious. Fall favorite.", descJp:"リッチ、豪華。秋のお気に入り。"}
    ],
    models:[
      { name:"Belt Bag", brief:"Structured tote with belt detail - icon", briefJp:"ベルトディテール付き構造トート - アイコン",
        desc:"Celine's modern icon. Structured tote with signature belt wings on sides. Clean, architectural lines.",
        descJp:"セリーヌのモダンアイコン。サイドにシグネチャーベルトウィング付き構造トート。クリーンで建築的なライン。",
        shape:"Trapeze/triangular tote. Belt detail creates wings on sides. Top zip closure. Clean minimal aesthetic.",
        shapeJp:"台形/三角トート。ベルトディテールがサイドにウィングを作る。トップジップクロージャー。クリーンなミニマル美学。",
        sizes:[
          {name:"Micro", dim:"7.9\"W × 7.1\"H × 3.9\"D"},
          {name:"Nano", dim:"9.8\"W × 7.5\"H × 5.1\"D - MOST POPULAR"},
          {name:"Mini", dim:"10.2\"W × 9.8\"H × 5.5\"D"}
        ],
        rare:"Phoebe Philo era (2010-2017). Exotic leathers. Tricolor versions (three leather panels).",
        rareJp:"フィービー・ファイロ時代（2010-2017）。エキゾチックレザー。トリカラーバージョン（3つのレザーパネル）。",
        tip:"The belt detail is what makes it Celine. Point out those wings! Phoebe Philo designs are GOLD.",
        tipJp:"ベルトディテールがセリーヌらしさ。そのウィングを指摘！フィービー・ファイロデザインはゴールド。"
      },
      { name:"Luggage Tote", brief:"Winged tote - architectural statement", briefJp:"ウィング付きトート - 建築的ステートメント",
        desc:"THE Celine bag. Architectural tote with distinctive wing flaps. Instantly recognizable silhouette.",
        descJp:"THEセリーヌバッグ。特徴的なウィングフラップ付き建築的トート。即座に認識できるシルエット。",
        shape:"Structured tote with wing-like side panels. Front zipper detail. Top handles. Architectural and bold.",
        shapeJp:"翼のようなサイドパネル付き構造トート。フロントジッパーディテール。トップハンドル。建築的で大胆。",
        sizes:[
          {name:"Nano", dim:"7.9\"W × 7.9\"H × 3.9\"D - MOST POPULAR"},
          {name:"Micro", dim:"10.2\"W × 9.8\"H × 5.1\"D"},
          {name:"Mini", dim:"12\"W × 11\"H × 5.9\"D"},
          {name:"Medium", dim:"13\"W × 13\"H × 7\"D"}
        ],
        rare:"Phantom (no zipper, more slouchy). Tricolor leather. Drummed calfskin. Phoebe Philo era pieces.",
        rareJp:"ファントム（ジッパーなし、よりたるんだ）。トリカラーレザー。ドラムカーフスキン。フィービー・ファイロ時代作品。",
        tip:"This is THE bag fashionistas know. The wings make it stand out. Mention Phoebe Philo!",
        tipJp:"これはファッショニスタが知るTHEバッグ。ウィングが目立つ。フィービー・ファイロに言及！"
      },
      { name:"Trio", brief:"Triple pouch crossbody - minimalist essential", briefJp:"トリプルポーチクロスボディ - ミニマリスト必需品",
        desc:"Three zip pouches attached together. Ultimate minimalist crossbody. Simple, functional, chic.",
        descJp:"3つのジップポーチが一緒に取り付けられている。究極のミニマリストクロスボディ。シンプル、機能的、シック。",
        shape:"Three separate zip pouches on one strap. Can detach and use individually. Clean minimal design.",
        shapeJp:"1つのストラップに3つの独立したジップポーチ。個別に取り外して使用可能。クリーンなミニマルデザイン。",
        sizes:[
          {name:"Small", dim:"Each pouch: 5\"W × 3.5\"H - MOST POPULAR"},
          {name:"Large", dim:"Each pouch: 6.5\"W × 5\"H"}
        ],
        rare:"Phoebe Philo era (discontin ued 2018). Limited colors. Original versions with CÉLINE accent.",
        rareJp:"フィービー・ファイロ時代（2018年に廃止）。限定カラー。CÉLINEアクセント付きオリジナルバージョン。",
        tip:"Three bags in one! You can detach them. Perfect for travel. Minimalist but SO functional.",
        tipJp:"3つのバッグが1つに！取り外し可能。旅行に完璧。ミニマリストだが超機能的。"
      }
    ]
  },
  loewe: {
    name:"Loewe", year:1846, country:"Spain",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Loewe_logo.svg/512px-Loewe_logo.svg.png",
    auth:"'LOEWE' stamp on leather. 'Made in Spain' (some Italy). Anagram logo embossed. Serial number format changed over time.",
    authJp:"レザーに「LOEWE」刻印。「Made in Spain」（一部イタリア）。アナグラムロゴエンボス。シリアル番号形式は時代で変化。",
    rare:"Puzzle bag. Hammock bag. Vintage from 1970s-80s. Jonathan Anderson era (2013+) collectible.",
    rareJp:"パズルバッグ。ハンモックバッグ。1970-80年代ヴィンテージ。ジョナサン・アンダーソン時代（2013+）コレクティブル。",
    tip:"Spanish leather craftsmanship since 1846. The Puzzle bag is architectural genius.",
    tipJp:"1846年以来のスペインレザー職人技。パズルバッグは建築的天才。",
    colors:[
      {name:"Tan/Camel", hex:"#C19A6B", nameJp:"タン/キャメル", desc:"Classic Loewe. Showcases leather quality.", descJp:"クラシックロエベ。レザー品質を見せる。"},
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Timeless and versatile.", descJp:"タイムレスで万能。"},
      {name:"Rust/Cognac", hex:"#B7410E", nameJp:"ラスト/コニャック", desc:"Rich warm brown. Very luxurious.", descJp:"リッチな温かいブラウン。とても豪華。"},
      {name:"Soft White/Chalk", hex:"#F5F5DC", nameJp:"ソフトホワイト/チョーク", desc:"Modern minimalist. Shows craftsmanship.", descJp:"モダンミニマリスト。職人技を見せる。"}
    ],
    models:[
      { name:"Puzzle", brief:"Geometric folded bag - architectural icon", briefJp:"幾何学折りバッグ - 建築的アイコン",
        desc:"Loewe's modern masterpiece. Geometric bag made from 40+ leather pieces. Folds flat or pops into 3D shape. Architectural genius.",
        descJp:"ロエベのモダン傑作。40以上のレザーピースで作られた幾何学バッグ。平らに折りたたむか、3D形状にポップ。建築的天才。",
        shape:"Geometric puzzle of leather panels. Can be worn/carried multiple ways. Folds completely flat or expands into structured shape.",
        shapeJp:"レザーパネルの幾何学パズル。複数の方法で着用/運搬可能。完全に平らに折りたたむか、構造形状に拡張。",
        sizes:[
          {name:"Nano", dim:"5.9\"W × 4.3\"H × 2.8\"D"},
          {name:"Small", dim:"9.4\"W × 5.9\"H × 3.9\"D - MOST POPULAR"},
          {name:"Medium", dim:"14.2\"W × 7.9\"H × 4.7\"D"},
          {name:"Large", dim:"17.7\"W × 12.6\"H × 5.9\"D"}
        ],
        rare:"First season (2014). Limited colors. Exotic leather versions. Two-tone color blocking.",
        rareJp:"初シーズン（2014）。限定カラー。エキゾチックレザーバージョン。ツートーンカラーブロッキング。",
        tip:"Show how it folds! That's the selling point. Made from 40 pieces of leather - mention that craftsmanship!",
        tipJp:"折り方を見せて！それがセリングポイント。40ピースのレザーで作られている - その職人技に言及！"
      },
      { name:"Hammock", brief:"Slouchy hobo - versatile everyday", briefJp:"たるんだホーボー - 多用途日常",
        desc:"Soft, slouchy hobo bag. Can be worn as shoulder bag, crossbody, or backpack. Ultra-versatile.",
        descJp:"柔らかくたるんだホーボーバッグ。ショルダーバッグ、クロスボディ、またはバックパックとして着用可能。超多用途。",
        shape:"Drawstring bucket with adjustable straps. Soft unstructured leather. Multiple carrying options.",
        shapeJp:"調整可能ストラップ付き巾着バケット。柔らかい非構造レザー。複数の運搬オプション。",
        sizes:[
          {name:"Small", dim:"11.8\"W × 10.6\"H × 6.3\"D - MOST POPULAR"},
          {name:"Medium", dim:"14.2\"W × 12.2\"H × 7.5\"D"}
        ],
        rare:"Jonathan Anderson first designs (2014). Limited edition colors. Shearling-lined versions.",
        rareJp:"ジョナサン・アンダーソンの最初のデザイン（2014）。限定版カラー。シアリング裏地バージョン。",
        tip:"Three bags in one! Shoulder, cross body, OR backpack. Show all three ways to carry it!",
        tipJp:"3つのバッグが1つに！ショルダー、クロスボディ、またはバックパック。3つの運搬方法すべてを見せて！"
      },
      { name:"Gate", brief:"Structured bag with knot closure - elegant", briefJp:"結び目クロージャー付き構造バッグ - エレガント",
        desc:"Structured bag with signature knot closure. Elegant, sophisticated. Modern classic.",
        descJp:"シグネチャー結び目クロージャー付き構造バッグ。エレガント、洗練。モダンクラシック。",
        shape:"Structured rectangular bag. Leather knot closure. Top handle + shoulder strap. Clean lines.",
        shapeJp:"構造的長方形バッグ。レザー結び目クロージャー。トップハンドル+ショルダーストラップ。クリーンライン。",
        sizes:[
          {name:"Mini", dim:"6.7\"W × 4.7\"H × 3.1\"D"},
          {name:"Small", dim:"8.7\"W × 6.3\"H × 4.3\"D - MOST POPULAR"},
          {name:"Medium", dim:"11.8\"W × 9.1\"H × 5.9\"D"}
        ],
        rare:"First season colors. Two-tone leather. Exotic skins.",
        rareJp:"初シーズンカラー。ツートーンレザー。エキゾチックスキン。",
        tip:"That knot closure is signature Loewe. It's simple but SO elegant. Spanish leather quality is unmatched.",
        tipJp:"その結び目クロージャーはシグネチャーロエベ。シンプルだが超エレガント。スペインレザー品質は比類なし。"
      }
    ]
  },
  balenciaga: {
    name:"Balenciaga", year:1919, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Balenciaga_logo.svg/512px-Balenciaga_logo.svg.png",
    auth:"'BALENCIAGA PARIS' embossed. Serial number on white leather tag. Bale logo on hardware. Italy made.",
    authJp:"「BALENCIAGA PARIS」エンボス。白レザータグにシリアル番号。金具にBaleロゴ。イタリア製。",
    rare:"City bag (2000s icon). Giant hardware versions. Motorcycle/Moto bag. Nicolas Ghesquière era (1997-2012).",
    rareJp:"シティバッグ（2000年代アイコン）。ジャイアント金具バージョン。モーターサイクル/モトバッグ。ニコラ・ジェスキエール時代（1997-2012）。",
    tip:"The City bag with giant studs was THE 2000s It bag. Kate Moss carried it.",
    tipJp:"ジャイアントスタッズ付きシティバッグはTHE 2000年代Itバッグ。ケイト・モスが持った。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Edgy and timeless. Classic moto vibe.", descJp:"エッジーでタイムレス。クラシックモトバイブ。"},
      {name:"Rose Gold/Blush", hex:"#E0AFA0", nameJp:"ローズゴールド/ブラッシュ", desc:"Feminine but edgy. Very popular.", descJp:"女性的だがエッジー。とても人気。"},
      {name:"Gris/Anthracite", hex:"#4A4A4A", nameJp:"グリ/アンスラサイト", desc:"Dark grey. Sophisticated neutral.", descJp:"ダークグレー。洗練されたニュートラル。"},
      {name:"Rouge/Red", hex:"#C41E3A", nameJp:"ルージュ/レッド", desc:"Bold statement color. Eye-catching.", descJp:"大胆なステートメントカラー。目を引く。"}
    ],
    models:[
      { name:"City Bag", brief:"Motorcycle bag with studs - 2000s icon", briefJp:"スタッズ付きモーターサイクルバッグ - 2000年代アイコン",
        desc:"THE It bag of the 2000s. Distressed leather, studs, tassels. Inspired by motorcycle gear. Kate Moss, Nicole Richie, Mary-Kate Olsen all carried it.",
        descJp:"2000年代のTHE Itバッグ。ディストレスレザー、スタッズ、タッセル。モーターサイクルギアにインスパイア。ケイト・モス、ニコール・リッチー、メアリー・ケイト・オルセンが持った。",
        shape:"Soft slouchy shoulder bag. Stud details and tassels. Long shoulder strap. Unstructured and effortlessly cool.",
        shapeJp:"柔らかいたるんだショルダーバッグ。スタッズディテールとタッセル。長いショルダーストラップ。非構造で楽にクール。",
        sizes:[
          {name:"First/Mini", dim:"9.8\"W × 7.1\"H × 3.9\"D"},
          {name:"City/Classic", dim:"15\"W × 9.5\"H × 6\"D - MOST POPULAR"},
          {name:"Work", dim:"15\"W × 12\"H × 6\"D"},
          {name:"Part Time", dim:"12.6\"W × 8.3\"H × 4.7\"D"}
        ],
        rare:"Nicolas Ghesquière era (2001-2012). Giant hardware versions (oversized studs). First season colors (2001-2003).",
        rareJp:"ニコラ・ジェスキエール時代（2001-2012）。ジャイアント金具バージョン（特大スタッズ）。初シーズンカラー（2001-2003）。",
        tip:"The studs and tassels are EVERYTHING. This was THE bag every celebrity had in 2005. Nicolas Ghesquière pieces are collectible!",
        tipJp:"スタッズとタッセルがすべて。これは2005年にすべてのセレブが持っていたTHEバッグ。ニコラ・ジェスキエール作品はコレクティブル！"
      },
      { name:"Classic Hip", brief:"Belt bag - hands-free essential", briefJp:"ベルトバッグ - ハンズフリー必需品",
        desc:"Balenciaga's modern belt bag. Adjustable strap, logo hardware. Wear on waist or crossbody.",
        descJp:"バレンシアガのモダンベルトバッグ。調整可能ストラップ、ロゴ金具。ウエストまたはクロスボディで着用。",
        shape:"Compact zip pouch with adjustable belt strap. Logo hardware. Simple and functional.",
        shapeJp:"調整可能ベルトストラップ付きコンパクトジップポーチ。ロゴ金具。シンプルで機能的。",
        sizes:[
          {name:"Small", dim:"7.5\"W × 5.1\"H × 2\"D - MOST POPULAR"},
          {name:"Large", dim:"10.2\"W × 6.3\"H × 2.4\"D"}
        ],
        rare:"Limited edition colors. Velvet versions. Logo variations.",
        rareJp:"限定版カラー。ベルベットバージョン。ロゴバリエーション。",
        tip:"The logo hardware is key - show that Balenciaga plate! Perfect for festivals, travel, hands-free shopping.",
        tipJp:"ロゴ金具が重要 - そのバレンシアガプレートを見せて！フェスティバル、旅行、ハンズフリーショッピングに完璧。"
      },
      { name:"Le Cagole", brief:"Studded mini bag - Y2K revival", briefJp:"スタッズミニバッグ - Y2K復活",
        desc:"City bag's little sister. Mini version covered in studs and buckles. Y2K aesthetic revived for 2020s.",
        descJp:"シティバッグの妹。スタッズとバックルで覆われたミニバージョン。2020年代のためにY2K美学復活。",
        shape:"Small shoulder bag covered in studs. Multiple buckle straps. Edgy and bold.",
        shapeJp:"スタッズで覆われた小さなショルダーバッグ。複数のバックルストラップ。エッジーで大胆。",
        sizes:[
          {name:"XS", dim:"7.1\"W × 4.3\"H × 2.8\"D - MOST POPULAR"},
          {name:"Small", dim:"9.1\"W × 5.9\"H × 3.5\"D"}
        ],
        rare:"First release (2021). Limited colors. Demna Gvasalia era collectibles.",
        rareJp:"初リリース（2021）。限定カラー。デムナ・ヴァザリア時代コレクティブル。",
        tip:"This is Y2K nostalgia! The studs, the buckles - it's Paris Hilton energy. Gen Z LOVES this aesthetic.",
        tipJp:"これはY2Kノスタルジア！スタッズ、バックル - パリス・ヒルトンエネルギー。Z世代がこの美学を大好き。"
      }
    ]
  },
  saintlaurent: {
    name:"Saint Laurent", year:1961, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Saint_Laurent_logo.svg/512px-Saint_Laurent_logo.svg.png",
    auth:"YSL logo (interlocking Y and SL). 'SAINT LAURENT' or 'YVES SAINT LAURENT' inside. Serial number. Made in Italy.",
    authJp:"YSLロゴ（YとSLの組み合わせ）。内側に「SAINT LAURENT」または「YVES SAINT LAURENT」。シリアル番号。イタリア製。",
    rare:"Muse bag. Sac de Jour. Vintage Yves Saint Laurent (with 'Yves' is pre-2012). Hedi Slimane era.",
    rareJp:"ミューズバッグ。サック・ド・ジュール。ヴィンテージ イヴ・サンローラン（「Yves」付きは2012年以前）。エディ・スリマン時代。",
    tip:"YSL vs Saint Laurent = pre-2012 vs post-2012. Collectors know the difference.",
    tipJp:"YSL vs サンローラン = 2012年以前 vs 2012年以降。コレクターは違いを知ってる。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Rock and roll elegance. Timeless.", descJp:"ロックンロールエレガンス。タイムレス。"},
      {name:"Nude/Beige", hex:"#D2B48C", nameJp:"ヌード/ベージュ", desc:"Sophisticated neutral. Very Parisian.", descJp:"洗練されたニュートラル。とてもパリジャン。"},
      {name:"Burgundy/Bordeaux", hex:"#800020", nameJp:"バーガンディ/ボルドー", desc:"Rich wine color. Luxurious.", descJp:"リッチなワインカラー。豪華。"},
      {name:"Navy", hex:"#000080", nameJp:"ネイビー", desc:"Deep blue. Classic alternative to black.", descJp:"深いブルー。ブラックのクラシック代替。"}
    ],
    models:[
      { name:"Sac de Jour", brief:"Structured tote - modern classic", briefJp:"構造トート - モダンクラシック",
        desc:"Saint Laurent's iconic structured tote. Clean lines, top handles, optional shoulder strap. The ultimate work-to-weekend bag.",
        descJp:"サンローランの象徴的な構造トート。クリーンライン、トップハンドル、オプションのショルダーストラップ。究極の仕事から週末バッグ。",
        shape:"Structured rectangular tote. Double top handles. Detachable shoulder strap. Clean minimal design with YSL logo.",
        shapeJp:"構造的長方形トート。ダブルトップハンドル。取り外し可能ショルダーストラップ。YSLロゴ付きクリーンなミニマルデザイン。",
        sizes:[
          {name:"Nano", dim:"8.3\"W × 6.3\"H × 3.9\"D"},
          {name:"Baby", dim:"10.6\"W × 8.3\"H × 5.1\"D - MOST POPULAR"},
          {name:"Small", dim:"13\"W × 9.8\"H × 5.9\"D"},
          {name:"Large", dim:"15\"W × 12.2\"H × 7.1\"D"}
        ],
        rare:"Crocodile embossed. Souple (soft leather version). Two-tone color blocking. Hedi Slimane era (2012-2016).",
        rareJp:"クロコダイルエンボス。スープル（ソフトレザーバージョン）。ツートーンカラーブロッキング。エディ・スリマン時代（2012-2016）。",
        tip:"This is THE work bag. Professional but chic. The YSL logo is subtle - point it out! Structured means it stands up on its own.",
        tipJp:"これはTHE仕事バッグ。プロフェッショナルだがシック。YSLロゴは控えめ - 指摘して！構造的だから自立する。"
      },
      { name:"Kate", brief:"Tassel chain bag - evening icon", briefJp:"タッセルチェーンバッグ - イブニングアイコン",
        desc:"Saint Laurent's sultry chain bag. YSL logo, tassel detail, chain strap. Named after Kate Moss. Evening bag perfection.",
        descJp:"サンローランの魅惑的チェーンバッグ。YSLロゴ、タッセルディテール、チェーンストラップ。ケイト・モスにちなんで命名。イブニングバッグの完璧。",
        shape:"Small shoulder bag with chain strap. YSL logo on flap. Tassel on chain. Sleek and sexy.",
        shapeJp:"チェーンストラップ付き小さなショルダーバッグ。フラップにYSLロゴ。チェーンにタッセル。スリークでセクシー。",
        sizes:[
          {name:"Small", dim:"9.8\"W × 5.9\"H × 2\"D - MOST POPULAR"},
          {name:"Medium", dim:"12.2\"W × 7.5\"H × 2.4\"D"}
        ],
        rare:"Vintage YSL (pre-2012 with 'Yves'). Exotic leathers. Metallic finishes. Limited colors.",
        rareJp:"ヴィンテージYSL（2012年以前で「Yves」付き）。エキゾチックレザー。メタリック仕上げ。限定カラー。",
        tip:"Named after Kate Moss! The tassel is iconic - show it swing! Perfect evening bag or date night.",
        tipJp:"ケイト・モスにちなんで命名！タッセルは象徴的 - 揺れを見せて！完璧なイブニングバッグまたはデートナイト。"
      },
      { name:"Niki", brief:"Quilted shoulder bag - casual chic", briefJp:"キルトショルダーバッグ - カジュアルシック",
        desc:"Chevron quilted bag with chain strap. Slouchy, casual, cool. The everyday YSL bag.",
        descJp:"チェーンストラップ付きシェブロンキルトバッグ。たるんだ、カジュアル、クール。日常YSLバッグ。",
        shape:"Chevron quilted leather. Chain strap. Slouchy unstructured body. YSL logo on flap.",
        shapeJp:"シェブロンキルトレザー。チェーンストラップ。たるんだ非構造ボディ。フラップにYSLロゴ。",
        sizes:[
          {name:"Baby", dim:"10.2\"W × 7.1\"H × 3.5\"D - MOST POPULAR"},
          {name:"Medium", dim:"13\"W × 9.8\"H × 4.7\"D"},
          {name:"Large", dim:"16.5\"W × 11.8\"H × 5.9\"D"}
        ],
        rare:"Vintage leather (distressed finish). Two-tone chevron. Limited colors.",
        rareJp:"ヴィンテージレザー（ディストレス仕上げ）。ツートーンシェブロン。限定カラー。",
        tip:"The quilting is V-shaped - that's the chevron pattern. Slouchy means it's relaxed, not stiff. Perfect everyday bag!",
        tipJp:"キルティングはV字 - それがシェブロンパターン。たるんだとは、リラックス、硬くない。完璧な日常バッグ！"
      }
    ]
  },
  givenchy: {
    name:"Givenchy", year:1952, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Givenchy_logo.svg/512px-Givenchy_logo.svg.png",
    auth:"'GIVENCHY PARIS' stamp. Serial number. 4G logo on hardware. Made in Italy.",
    authJp:"「GIVENCHY PARIS」刻印。シリアル番号。金具に4Gロゴ。イタリア製。",
    rare:"Antigona bag. Nightingale bag. Pandora box. Riccardo Tisci era (2005-2017) collectible.",
    rareJp:"アンティゴナバッグ。ナイチンゲールバッグ。パンドラボックス。リカルド・ティッシ時代（2005-2017）コレクティブル。",
    tip:"The Antigona is the structured work bag. Sharp, geometric, professional.",
    tipJp:"アンティゴナは構造的仕事バッグ。シャープ、幾何学的、プロフェッショナル。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Sleek Parisian elegance. Timeless.", descJp:"スリークなパリジャンエレガンス。タイムレス。"},
      {name:"Sugar Pink/Blush", hex:"#FFB6C1", nameJp:"シュガーピンク/ブラッシュ", desc:"Feminine and chic. Very popular.", descJp:"女性的でシック。とても人気。"},
      {name:"Grey/Storm", hex:"#808080", nameJp:"グレー/ストーム", desc:"Sophisticated neutral. Modern.", descJp:"洗練されたニュートラル。モダン。"},
      {name:"Red/Rouge", hex:"#C41E3A", nameJp:"レッド/ルージュ", desc:"Bold power color. Statement piece.", descJp:"大胆なパワーカラー。ステートメントピース。"}
    ],
    models:[
      { name:"Antigona", brief:"Structured tote - sharp and professional", briefJp:"構造トート - シャープでプロフェッショナル",
        desc:"Givenchy's iconic structured bag. Sharp triangular shape, top handles, detachable strap. The ultimate work bag.",
        descJp:"ジバンシィの象徴的構造バッグ。シャープな三角形、トップハンドル、取り外し可能ストラップ。究極の仕事バッグ。",
        shape:"Triangular structured tote. Sharp geometric lines. Top handles + shoulder strap. Clean architectural design.",
        shapeJp:"三角構造トート。シャープな幾何学ライン。トップハンドル+ショルダーストラップ。クリーンな建築デザイン。",
        sizes:[
          {name:"Micro", dim:"8.3\"W × 6.7\"H × 4.3\"D"},
          {name:"Small", dim:"11.4\"W × 9.4\"H × 5.5\"D - MOST POPULAR"},
          {name:"Medium", dim:"13\"W × 10.2\"H × 6.3\"D"},
          {name:"Large", dim:"15.4\"W × 11.8\"H × 7.1\"D"}
        ],
        rare:"Riccardo Tisci era (2005-2017). Studded versions. Nightingale (different model, very rare). Two-tone leather.",
        rareJp:"リカルド・ティッシ時代（2005-2017）。スタッズバージョン。ナイチンゲール（別モデル、非常に希少）。ツートーンレザー。",
        tip:"The sharp edges make it architectural. It STANDS UP on its own - show that! Perfect work bag, fits laptop.",
        tipJp:"シャープなエッジが建築的。自立する - それを見せて！完璧な仕事バッグ、ラップトップが入る。"
      },
      { name:"Pandora", brief:"Slouchy crossbody - casual elegance", briefJp:"たるんだクロスボディ - カジュアルエレガンス",
        desc:"Soft slouchy bag with unique wrinkled leather. Zip top, adjustable strap. Effortlessly cool.",
        descJp:"ユニークなしわレザーのソフトたるんだバッグ。ジップトップ、調整可能ストラップ。楽にクール。",
        shape:"Soft slouchy pouch. Wrinkled/creased leather is intentional. Zip top. Long shoulder strap.",
        shapeJp:"ソフトたるんだポーチ。しわ/折り目レザーは意図的。ジップトップ。長いショルダーストラップ。",
        sizes:[
          {name:"Mini", dim:"7.5\"W × 5.5\"H × 3.5\"D - MOST POPULAR"},
          {name:"Small", dim:"9.8\"W × 7.1\"H × 4.7\"D"},
          {name:"Medium", dim:"12.6\"W × 8.7\"H × 5.9\"D"}
        ],
        rare:"First season (2009). Nightingale leather (pepe). Metallic finishes.",
        rareJp:"初シーズン（2009）。ナイチンゲールレザー（ペペ）。メタリック仕上げ。",
        tip:"The wrinkled leather is SUPPOSED to look like that! It's called 'pepe' leather. It gets softer with age.",
        tipJp:"しわレザーはそう見えるべき！「ペペ」レザーと呼ばれる。年齢とともに柔らかくなる。"
      },
      { name:"GV3", brief:"Quilted crossbody - modern classic", briefJp:"キルトクロスボディ - モダンクラシック",
        desc:"Diamond quilted bag with signature GV3 hardware. Chain strap. Modern Givenchy icon.",
        descJp:"シグネチャーGV3金具付きダイヤモンドキルトバッグ。チェーンストラップ。モダンジバンシィアイコン。",
        shape:"Diamond quilted leather. GV3 logo hardware closure. Chain strap. Small structured crossbody.",
        shapeJp:"ダイヤモンドキルトレザー。GV3ロゴ金具クロージャー。チェーンストラップ。小さな構造クロスボディ。",
        sizes:[
          {name:"Nano", dim:"6.3\"W × 4.3\"H × 2.4\"D"},
          {name:"Small", dim:"9.1\"W × 5.9\"H × 3.1\"D - MOST POPULAR"},
          {name:"Medium", dim:"11\"W × 7.5\"H × 3.9\"D"}
        ],
        rare:"Limited colors. Exotic leathers. Two-tone versions.",
        rareJp:"限定カラー。エキゾチックレザー。ツートーンバージョン。",
        tip:"The GV3 logo hardware is signature. The quilting is diamond-shaped, not chevron. Perfect size for everyday!",
        tipJp:"GV3ロゴ金具はシグネチャー。キルティングはダイヤモンド型、シェブロンではない。日常に完璧なサイズ！"
      }
    ]
  },
  valentino: {
    name:"Valentino", year:1960, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Valentino_logo.svg/512px-Valentino_logo.svg.png",
    auth:"'VALENTINO' or 'VALENTINO GARAVANI' stamp. Serial number. V logo or Rockstud hardware. Made in Italy.",
    authJp:"「VALENTINO」または「VALENTINO GARAVANI」刻印。シリアル番号。Vロゴまたはロックスタッズ金具。イタリア製。",
    rare:"Rockstud collection (iconic studs). Vintage Valentino Garavani. Red Valentino (diffusion line).",
    rareJp:"ロックスタッズコレクション（象徴的スタッズ）。ヴィンテージ ヴァレンティノ・ガラヴァーニ。レッド ヴァレンティノ（ディフュージョンライン）。",
    tip:"The Rockstuds are instantly recognizable. Edgy luxury. Very on-brand for Valentino.",
    tipJp:"ロックスタッズは即座に認識可能。エッジーなラグジュアリー。ヴァレンティノらしい。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Edgy elegance. The studs pop against black.", descJp:"エッジーなエレガンス。スタッズがブラックに映える。"},
      {name:"Nude/Poudre", hex:"#F5DEB3", nameJp:"ヌード/プードル", desc:"Feminine and versatile. Very popular.", descJp:"女性的で万能。とても人気。"},
      {name:"Valentino Red", hex:"#C41E3A", nameJp:"ヴァレンティノレッド", desc:"Signature red. Bold and romantic.", descJp:"シグネチャーレッド。大胆でロマンチック。"},
      {name:"Pastel Pink", hex:"#FFB6C1", nameJp:"パステルピンク", desc:"Soft romantic. Studs add edge.", descJp:"ソフトロマンチック。スタッズがエッジを追加。"}
    ],
    models:[
      { name:"Rockstud", brief:"Studded crossbody - iconic pyramid studs", briefJp:"スタッズクロスボディ - 象徴的ピラミッドスタッズ",
        desc:"THE Valentino bag. Covered in signature pyramid studs. Chain strap, sleek silhouette. Edgy romance.",
        descJp:"THEヴァレンティノバッグ。シグネチャーピラミッドスタッズで覆われている。チェーンストラップ、スリークシルエット。エッジーロマンス。",
        shape:"Rectangular flap bag. Pyramid studs on leather trim. Chain strap. Clean lines with edgy detail.",
        shapeJp:"長方形フラップバッグ。レザートリムにピラミッドスタッズ。チェーンストラップ。エッジーディテール付きクリーンライン。",
        sizes:[
          {name:"Micro", dim:"6.7\"W × 4.3\"H × 2.4\"D"},
          {name:"Small", dim:"9.4\"W × 5.5\"H × 2.8\"D - MOST POPULAR"},
          {name:"Medium", dim:"11.4\"W × 7.1\"H × 3.5\"D"}
        ],
        rare:"First season (2010). Two-tone leather. Metallic studs. Exotic leathers with studs.",
        rareJp:"初シーズン（2010）。ツートーンレザー。メタリックスタッズ。スタッズ付きエキゾチックレザー。",
        tip:"Count the studs on camera! They're pyramid-shaped, not round. This is edgy romance - feminine but fierce.",
        tipJp:"カメラでスタッズを数えて！ピラミッド型、丸くない。これはエッジーロマンス - 女性的だが激しい。"
      },
      { name:"Roman Stud", brief:"Chain shoulder bag - bold hardware", briefJp:"チェーンショルダーバッグ - 大胆な金具",
        desc:"Larger geometric studs. Chain strap. More structured than Rockstud. Bold statement bag.",
        descJp:"より大きな幾何学スタッズ。チェーンストラップ。ロックスタッズより構造的。大胆なステートメントバッグ。",
        shape:"Structured shoulder bag. Large square studs. Chain strap. Geometric and architectural.",
        shapeJp:"構造ショルダーバッグ。大きな四角スタッズ。チェーンストラップ。幾何学的で建築的。",
        sizes:[
          {name:"Small", dim:"8.7\"W × 6.3\"H × 3.5\"D - MOST POPULAR"},
          {name:"Medium", dim:"11\"W × 7.9\"H × 4.3\"D"}
        ],
        rare:"Limited colors. Rare finishes. First season pieces.",
        rareJp:"限定カラー。希少仕上げ。初シーズン作品。",
        tip:"Roman studs are SQUARE, not pyramid. Bigger and bolder than Rockstud. More architectural.",
        tipJp:"ローマンスタッズは四角、ピラミッドではない。ロックスタッズより大きく大胆。より建築的。"
      },
      { name:"VLogo Signature", brief:"Chain bag with V logo - modern icon", briefJp:"Vロゴ付きチェーンバッグ - モダンアイコン",
        desc:"Quilted leather with oversized V logo hardware. Chain strap. Modern Valentino signature.",
        descJp:"特大Vロゴ金具付きキルトレザー。チェーンストラップ。モダンヴァレンティノシグネチャー。",
        shape:"Quilted leather. Large V logo closure. Chain strap. Structured small bag.",
        shapeJp:"キルトレザー。大きなVロゴクロージャー。チェーンストラップ。構造的小バッグ。",
        sizes:[
          {name:"Small", dim:"7.9\"W × 5.5\"H × 2.8\"D - MOST POPULAR"},
          {name:"Medium", dim:"10.2\"W × 7.1\"H × 3.5\"D"}
        ],
        rare:"Limited colors. Metallic finishes. Chain variations.",
        rareJp:"限定カラー。メタリック仕上げ。チェーンバリエーション。",
        tip:"That V logo is HUGE - it's the statement. The quilting is subtle, the V is bold. Modern Valentino!",
        tipJp:"そのVロゴは巨大 - それがステートメント。キルティングは控えめ、Vは大胆。モダンヴァレンティノ！"
      }
    ]
  },
  burberry: {
    name:"Burberry", year:1856, country:"UK",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Burberry_logo.svg/512px-Burberry_logo.svg.png",
    auth:"Burberry check pattern (tan, black, white, red). 'BURBERRY' stamp. Serial number. Made in Italy or UK.",
    authJp:"バーバリーチェックパターン（タン、ブラック、ホワイト、レッド）。「BURBERRY」刻印。シリアル番号。イタリアまたは英国製。",
    rare:"Vintage Nova check. Prorsum line (premium). Thomas Burberry Archive collection.",
    rareJp:"ヴィンテージ ノバチェック。プローサムライン（プレミアム）。トーマス・バーバリー アーカイブコレクション。",
    tip:"The check is iconic. British heritage since 1856. If it's check, it's Burberry.",
    tipJp:"チェックは象徴的。1856年以来の英国伝統。チェックならバーバリー。",
    colors:[
      {name:"Archive Beige", hex:"#D4BC8E", nameJp:"アーカイブベージュ", desc:"The classic Burberry tan. Instantly recognizable.", descJp:"クラシックなバーバリータン。即座に認識できる。"},
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Timeless black. Very British.", descJp:"タイムレスなブラック。とても英国的。"},
      {name:"Honey", hex:"#C9A86A", nameJp:"ハニー", desc:"Warm honey brown. Heritage color.", descJp:"温かいハニーブラウン。伝統カラー。"},
      {name:"Stone", hex:"#A89F91", nameJp:"ストーン", desc:"Neutral grey-taupe. Very versatile.", descJp:"ニュートラルなグレー・トープ。とても万能。"}
    ],
    models:[
      { name:"TB Bag", brief:"Monogram canvas tote - modern icon", briefJp:"モノグラムキャンバストート - モダンアイコン",
        desc:"Large tote with TB (Thomas Burberry) monogram. Modern take on heritage.",
        descJp:"TB（トーマス・バーバリー）モノグラム付き大型トート。伝統のモダンな解釈。",
        shape:"Rectangular tote with top handles. TB monogram canvas. Leather trim.",
        shapeJp:"トップハンドル付き長方形トート。TBモノグラムキャンバス。レザートリム。",
        sizes:[
          {name:"Small", dim:"11\"W × 9\"H × 5\"D"},
          {name:"Medium", dim:"13\"W × 11\"H × 6\"D - MOST POPULAR"},
          {name:"Large", dim:"15\"W × 13\"H × 7\"D"}
        ],
        rare:"Limited edition check patterns. Collaborations. Vintage Prorsum line.",
        rareJp:"限定版チェックパターン。コラボレーション。ヴィンテージ プローサムライン。",
        tip:"TB stands for Thomas Burberry. The founder. That's 167 years of British heritage right there.",
        tipJp:"TBはトーマス・バーバリーの略。創設者。167年の英国伝統がここに。"
      },
      { name:"Lola Bag", brief:"Quilted shoulder bag - casual chic", briefJp:"キルティングショルダーバッグ - カジュアルシック",
        desc:"Quilted lambskin with chain strap. Burberry's answer to Chanel.",
        descJp:"チェーンストラップ付きキルティングラムスキン。バーバリーのシャネルへの回答。",
        shape:"Rounded quilted bag with chain-leather strap. TB logo hardware.",
        shapeJp:"チェーン・レザーストラップ付き丸みのあるキルティングバッグ。TBロゴ金具。",
        sizes:[
          {name:"Small", dim:"7.5\"W × 5\"H × 3\"D"},
          {name:"Medium", dim:"9\"W × 6\"H × 3.5\"D - MOST POPULAR"},
          {name:"Large", dim:"11\"W × 7.5\"H × 4\"D"}
        ],
        rare:"Archive check interior. Limited edition colors. Contrast quilting.",
        rareJp:"アーカイブチェック内装。限定版カラー。コントラストキルティング。",
        tip:"Quilted like Chanel, but Burberry. For buyers who want that vibe with British heritage.",
        tipJp:"シャネルのようなキルティング、でもバーバリー。その雰囲気と英国伝統を求めるバイヤー向け。"
      },
      { name:"Knight Bag", brief:"Crossbody with check - everyday essential", briefJp:"チェック付きクロスボディ - 日常必需品",
        desc:"Small crossbody featuring signature check canvas. Practical and iconic.",
        descJp:"シグネチャーチェックキャンバスの小型クロスボディ。実用的で象徴的。",
        shape:"Compact crossbody with flap closure. Check canvas with leather trim.",
        shapeJp:"フラップ閉鎖のコンパクトクロスボディ。チェックキャンバスとレザートリム。",
        sizes:[
          {name:"Small", dim:"8\"W × 6\"H × 2.5\"D - MOST POPULAR"}
        ],
        rare:"Vintage Nova check (discontinued). Archive beige check. Special edition colors.",
        rareJp:"ヴィンテージ ノバチェック（廃番）。アーカイブベージュチェック。スペシャルエディションカラー。",
        tip:"The check pattern = instant Burberry recognition. Kate Moss carried this style.",
        tipJp:"チェックパターン = 即座にバーバリー認識。ケイト・モスがこのスタイルを持った。"
      }
    ]
  },
  mcm: {
    name:"MCM", year:1976, country:"Germany",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/MCM_logo.svg/512px-MCM_logo.svg.png",
    auth:"Visetos monogram (MCM logo + laurel leaves). Serial number on leather patch. Made in Germany or Korea.",
    authJp:"ヴィセトスモノグラム（MCMロゴ+月桂樹の葉）。レザーパッチにシリアル番号。ドイツまたは韓国製。",
    rare:"Vintage 1980s-90s bags (original German production). Stark backpack. Limited edition collabs.",
    rareJp:"1980-90年代ヴィンテージバッグ（オリジナルドイツ製）。スタークバックパック。限定版コラボ。",
    tip:"MCM backpacks are everywhere now. Vintage German-made ones are the real deal.",
    tipJp:"MCMバックパックは今どこにでもある。ヴィンテージドイツ製が本物。",
    colors:[
      {name:"Cognac Visetos", hex:"#8B4513", nameJp:"コニャック ヴィセトス", desc:"Classic brown monogram. The OG MCM color.", descJp:"クラシックブラウンモノグラム。元祖MCMカラー。"},
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Sleek black. Very modern.", descJp:"スリークなブラック。とてもモダン。"},
      {name:"White", hex:"#FFFFFF", nameJp:"ホワイト", desc:"Crisp white monogram. Super clean.", descJp:"クリスプなホワイトモノグラム。超クリーン。"},
      {name:"Pink", hex:"#FFB6C1", nameJp:"ピンク", desc:"Soft pink. Popular in Asia.", descJp:"柔らかいピンク。アジアで人気。"}
    ],
    models:[
      { name:"Stark Backpack", brief:"Monogram backpack - street style icon", briefJp:"モノグラムバックパック - ストリートスタイルアイコン",
        desc:"THE MCM backpack. Visetos monogram with studded sides. Urban luxury.",
        descJp:"MCMバックパック。スタッズサイド付きヴィセトスモノグラム。アーバンラグジュアリー。",
        shape:"Medium-size backpack with top handle and adjustable straps. Side studs for structure.",
        shapeJp:"トップハンドルと調節可能なストラップ付きミディアムサイズバックパック。構造のためのサイドスタッズ。",
        sizes:[
          {name:"Mini", dim:"9\"W × 10\"H × 4\"D"},
          {name:"Small", dim:"11\"W × 13\"H × 5\"D"},
          {name:"Medium", dim:"13\"W × 16\"H × 6\"D - MOST POPULAR"},
          {name:"Large", dim:"15\"W × 18\"H × 7\"D"}
        ],
        rare:"Vintage 1980s original German-made. Limited edition collabs (Puma, Bape). White monogram.",
        rareJp:"1980年代オリジナルドイツ製ヴィンテージ。限定版コラボ（プーマ、ベイプ）。ホワイトモノグラム。",
        tip:"This backpack is HUGE in Asia. Vintage German-made ones from the 80s? Collector's items.",
        tipJp:"このバックパックはアジアで巨大。80年代のヴィンテージドイツ製？コレクターアイテム。"
      },
      { name:"Patricia Crossbody", brief:"Shoulder bag - structured classic", briefJp:"ショルダーバッグ - 構造的クラシック",
        desc:"Structured shoulder bag with fold-over flap. Clean lines, logo clasp.",
        descJp:"折りたたみフラップ付き構造的ショルダーバッグ。クリーンライン、ロゴクラスプ。",
        shape:"Rectangular shoulder bag with flap and metal logo closure. Chain-leather strap.",
        shapeJp:"フラップとメタルロゴ閉鎖付き長方形ショルダーバッグ。チェーン・レザーストラップ。",
        sizes:[
          {name:"Small", dim:"7\"W × 5\"H × 2.5\"D"},
          {name:"Medium", dim:"9\"W × 6.5\"H × 3\"D - MOST POPULAR"},
          {name:"Large", dim:"11\"W × 8\"H × 4\"D"}
        ],
        rare:"Limited edition colors. Two-tone versions. Vintage Visetos from 1990s.",
        rareJp:"限定版カラー。ツートーンバージョン。1990年代のヴィンテージ ヴィセトス。",
        tip:"More grown-up than the backpack. This is MCM for the office, not the street.",
        tipJp:"バックパックより大人。これは路上ではなくオフィス用のMCM。"
      },
      { name:"Toni Shopper", brief:"Tote bag - daily essential", briefJp:"トートバッグ - デイリー必需品",
        desc:"Spacious tote with Visetos monogram. Reversible in some versions.",
        descJp:"ヴィセトスモノグラム付き広々トート。一部バージョンはリバーシブル。",
        shape:"Open-top tote with double handles. Large capacity for everyday use.",
        shapeJp:"ダブルハンドル付きオープントップトート。日常使用のための大容量。",
        sizes:[
          {name:"Medium", dim:"13\"W × 11\"H × 6\"D - MOST POPULAR"},
          {name:"Large", dim:"15\"W × 13\"H × 7\"D"}
        ],
        rare:"Reversible versions (plain leather inside). Limited edition prints.",
        rareJp:"リバーシブルバージョン（内側はプレーンレザー）。限定版プリント。",
        tip:"Reversible! One side monogram, flip it inside-out for plain leather. Two bags in one.",
        tipJp:"リバーシブル！片面モノグラム、裏返してプレーンレザー。2つのバッグが1つに。"
      }
    ]
  },
  alexandermcqueen: {
    name:"Alexander McQueen", year:1992, country:"UK",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Alexander_McQueen_logo.svg/512px-Alexander_McQueen_logo.svg.png",
    auth:"'ALEXANDER McQUEEN' stamp. Made in Italy. Skull hardware (signature motif). Serial number inside.",
    authJp:"「ALEXANDER McQUEEN」刻印。イタリア製。スカル金具（シグネチャーモチーフ）。内側にシリアル番号。",
    rare:"Skull clutch (iconic). Heroine bag. Vintage pieces from Lee McQueen era (pre-2010).",
    rareJp:"スカルクラッチ（象徴的）。ヒロインバッグ。リー・マックイーン時代（2010年以前）のヴィンテージ作品。",
    tip:"The skull clutch is ICONIC. Dark, edgy luxury. Lee McQueen was a genius.",
    tipJp:"スカルクラッチは象徴的。ダーク、エッジーなラグジュアリー。リー・マックイーンは天才だった。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Gothic black. Very McQueen.", descJp:"ゴシックブラック。とてもマックイーン。"},
      {name:"Oxblood Red", hex:"#4A0404", nameJp:"オックスブラッドレッド", desc:"Deep blood red. Dark romance.", descJp:"深い血の赤。ダークロマンス。"},
      {name:"Ivory", hex:"#FFFFF0", nameJp:"アイボリー", desc:"Bone white. Macabre elegance.", descJp:"骨白。不気味なエレガンス。"},
      {name:"Silver", hex:"#C0C0C0", nameJp:"シルバー", desc:"Metallic silver hardware. Edgy.", descJp:"メタリックシルバー金具。エッジー。"}
    ],
    models:[
      { name:"Skull Clutch", brief:"Iconic knuckle box clutch - gothic glamour", briefJp:"象徴的ナックルボックスクラッチ - ゴシックグラマー",
        desc:"THE Alexander McQueen piece. Hard-shell clutch shaped like knuckles with skull rings.",
        descJp:"Alexander McQueen作品。スカルリング付きナックル型ハードシェルクラッチ。",
        shape:"Rigid box clutch shaped like four-finger knuckles. Skull rings on each knuckle.",
        shapeJp:"4本指ナックル型の硬質ボックスクラッチ。各ナックルにスカルリング。",
        sizes:[
          {name:"Classic", dim:"8\"W × 4\"H × 2\"D - MOST POPULAR"}
        ],
        rare:"Limited edition crystal skulls. Vintage Lee McQueen era (2000s). Colored versions (rare).",
        rareJp:"限定版クリスタルスカル。ヴィンテージ リー・マックイーン時代（2000年代）。カラーバージョン（希少）。",
        tip:"It's KNUCKLES. With SKULLS. Sarah Jessica Parker carried it on the red carpet. Dark, edgy, ICONIC.",
        tipJp:"それはナックル。スカル付き。サラ・ジェシカ・パーカーがレッドカーペットで持った。ダーク、エッジー、象徴的。"
      },
      { name:"Jewelled Satchel", brief:"Embellished crossbody - punk luxury", briefJp:"装飾クロスボディ - パンクラグジュアリー",
        desc:"Leather satchel with jeweled skull embellishments. Punk meets luxury.",
        descJp:"宝石スカル装飾付きレザーサッチェル。パンクとラグジュアリーの融合。",
        shape:"Structured satchel with flap closure. Metal skull with crystal embellishments.",
        shapeJp:"フラップクロージャー付き構造的サッチェル。クリスタル装飾付きメタルスカル。",
        sizes:[
          {name:"Small", dim:"9\"W × 7\"H × 3\"D"},
          {name:"Medium", dim:"11\"W × 8.5\"H × 4\"D - MOST POPULAR"}
        ],
        rare:"Full crystal skull versions. Colored leather (red, blue). Vintage hardware.",
        rareJp:"フルクリスタルスカルバージョン。カラーレザー（赤、青）。ヴィンテージ金具。",
        tip:"Count the crystals on the skull! It's McQueen - dark, romantic, rebellious. Punk princess energy.",
        tipJp:"スカルのクリスタルを数えて！マックイーン - ダーク、ロマンティック、反逆的。パンクプリンセスエネルギー。"
      },
      { name:"Curve Bag", brief:"Structured shoulder bag - architectural edge", briefJp:"構造的ショルダーバッグ - 建築的エッジ",
        desc:"Sculptural bag with curved lines and signature McQueen hardware.",
        descJp:"曲線とシグネチャー マックイーン金具の彫刻的バッグ。",
        shape:"Structured bag with curved silhouette. Metal knuckle ring detail on strap.",
        shapeJp:"曲線シルエットの構造的バッグ。ストラップにメタルナックルリングディテール。",
        sizes:[
          {name:"Small", dim:"8.5\"W × 6.5\"H × 3.5\"D - MOST POPULAR"},
          {name:"Medium", dim:"10\"W × 8\"H × 4.5\"D"}
        ],
        rare:"Limited edition finishes. Gradient leather. Vintage runway pieces.",
        rareJp:"限定版仕上げ。グラデーションレザー。ヴィンテージランウェイ作品。",
        tip:"Architectural curves. This isn't soft and slouchy - it's STRUCTURED. McQueen does power, not pretty.",
        tipJp:"建築的曲線。これは柔らかくスラウチーではない - 構造的。マックイーンはパワーを行う、可愛くない。"
      }
    ]
  },
  miumiu: {
    name:"Miu Miu", year:1993, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Miu_Miu_logo.svg/512px-Miu_Miu_logo.svg.png",
    auth:"'MIU MIU' logo plate or embossed. Made in Italy. Part of Prada Group - similar quality standards.",
    authJp:"「MIU MIU」ロゴプレートまたはエンボス。イタリア製。プラダグループの一部 - 同様の品質基準。",
    rare:"Matelassé (quilted) leather bags. Coffer bag. Crystal embellishments. Vintage 90s-2000s pieces.",
    rareJp:"マトラッセ（キルティング）レザーバッグ。コファーバッグ。クリスタル装飾。90年代〜2000年代ヴィンテージ作品。",
    tip:"Miu Miu is Prada's little sister. Younger, edgier, more playful. Same quality, different vibe.",
    tipJp:"ミュウミュウはプラダの妹。より若く、エッジーで、遊び心。同じ品質、異なる雰囲気。",
    colors:[
      {name:"Matelassé Black", hex:"#000000", nameJp:"マトラッセブラック", desc:"Quilted black leather. Edgy elegance.", descJp:"キルティングブラックレザー。エッジーなエレガンス。"},
      {name:"Matelassé Pink", hex:"#F8C8DC", nameJp:"マトラッセピンク", desc:"Soft quilted pink. Very Miu Miu.", descJp:"柔らかいキルティングピンク。とてもミュウミュウ。"},
      {name:"Crystal Cipria", hex:"#E8D5C4", nameJp:"クリスタル チプリア", desc:"Pale nude beige. Sophisticated.", descJp:"淡いヌードベージュ。洗練。"},
      {name:"Cameo Beige", hex:"#D4C4B0", nameJp:"カメオベージュ", desc:"Warm neutral. Very versatile.", descJp:"温かいニュートラル。とても万能。"}
    ],
    models:[
      { name:"Matelassé Bag", brief:"Quilted shoulder bag - playful luxury", briefJp:"キルティングショルダーバッグ - 遊び心のあるラグジュアリー",
        desc:"Nappa leather with quilted matelassé pattern. Younger sister to Prada.",
        descJp:"キルティングマトラッセパターンのナッパレザー。プラダの妹。",
        shape:"Soft quilted bag with chain strap. Curved shape, relaxed structure.",
        shapeJp:"チェーンストラップ付き柔らかいキルティングバッグ。曲線形状、リラックスした構造。",
        sizes:[
          {name:"Small", dim:"8\"W × 6\"H × 3\"D"},
          {name:"Medium", dim:"10\"W × 7.5\"H × 4\"D - MOST POPULAR"},
          {name:"Large", dim:"12\"W × 9\"H × 5\"D"}
        ],
        rare:"Crystal embellished versions. Limited edition colors. Vintage 1990s original matelassé.",
        rareJp:"クリスタル装飾バージョン。限定版カラー。1990年代オリジナルマトラッセのヴィンテージ。",
        tip:"It's like Prada, but younger and cooler. Same quality, but fun. For the girl who's over 'serious' bags.",
        tipJp:"プラダのようだが、より若くクール。同じ品質、でも楽しい。「真面目な」バッグに飽きた女の子向け。"
      },
      { name:"Wander Hobo", brief:"Slouchy hobo - effortless style", briefJp:"スラウチーホーボー - 楽なスタイル",
        desc:"Soft hobo bag with gathered detail. Relaxed, bohemian vibe.",
        descJp:"ギャザーディテール付き柔らかいホーボーバッグ。リラックス、ボヘミアン雰囲気。",
        shape:"Crescent hobo shape. Single shoulder strap. Slouchy, unstructured.",
        shapeJp:"クレセントホーボー形状。シングルショルダーストラップ。スラウチー、非構造的。",
        sizes:[
          {name:"Small", dim:"10\"W × 7\"H × 4\"D"},
          {name:"Medium", dim:"13\"W × 9\"H × 5\"D - MOST POPULAR"}
        ],
        rare:"Distressed leather versions. Vintage hardware. Limited edition textures.",
        rareJp:"ディストレストレザーバージョン。ヴィンテージ金具。限定版テクスチャ。",
        tip:"Hobo bags are BACK. This is that effortless cool-girl aesthetic. Off-duty model vibes.",
        tipJp:"ホーボーバッグが帰ってきた。これが楽なクールガール美学。オフデューティモデル雰囲気。"
      },
      { name:"Coffer Bag", brief:"Box bag - structured statement", briefJp:"ボックスバッグ - 構造的ステートメント",
        desc:"Rigid box-shaped bag with top handle. Vintage-inspired, very structured.",
        descJp:"トップハンドル付き硬質ボックス型バッグ。ヴィンテージ風、とても構造的。",
        shape:"Rectangular box with curved corners. Top handle and detachable strap.",
        shapeJp:"曲線コーナー付き長方形ボックス。トップハンドルと取り外し可能ストラップ。",
        sizes:[
          {name:"Small", dim:"8\"W × 6\"H × 4\"D - MOST POPULAR"},
          {name:"Medium", dim:"10\"W × 7.5\"H × 5\"D"}
        ],
        rare:"Crystal-embellished closure. Vintage-style metal clasps. Limited edition prints.",
        rareJp:"クリスタル装飾クロージャー。ヴィンテージスタイルメタルクラスプ。限定版プリント。",
        tip:"It's a BOX. Very literal. Very Miu Miu. Quirky, fun, but still luxury. Count the crystals!",
        tipJp:"それは箱。とても文字通り。とてもミュウミュウ。風変わり、楽しい、でも依然ラグジュアリー。クリスタルを数えて！"
      }
    ]
  },
  chloe: {
    name:"Chloé", year:1952, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chloe_logo.svg/512px-Chloe_logo.svg.png",
    auth:"'CHLOÉ' stamp (note accent mark). Made in Italy. Serial number embossed. Padlock on some styles.",
    authJp:"「CHLOÉ」刻印（アクセント注意）。イタリア製。シリアル番号エンボス。一部スタイルに南京錠。",
    rare:"Paddington bag (2000s icon with padlock). Drew bag. Faye bag. Vintage Phoebe Philo era (2001-2006).",
    rareJp:"パディントンバッグ（2000年代アイコン、南京錠付き）。ドリューバッグ。フェイバッグ。ヴィンテージ フィービー・ファイロ時代（2001-2006）。",
    tip:"Feminine, romantic, soft. The Paddington with the big padlock was EVERYWHERE in 2005.",
    tipJp:"女性的、ロマンチック、ソフト。大きな南京錠付きパディントンは2005年にどこにでもあった。",
    models:[]
  },
  tomford: {
    name:"Tom Ford", year:2005, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tom_Ford_logo.svg/512px-Tom_Ford_logo.svg.png",
    auth:"'TOM FORD' logo plate or stamp. Made in Italy. Metal TF logo on hardware. Premium materials.",
    authJp:"「TOM FORD」ロゴプレートまたは刻印。イタリア製。金具にTFメタルロゴ。プレミアム素材。",
    rare:"Jennifer bag (crossbody with chain). Natalia bag. Limited edition exotic leathers.",
    rareJp:"ジェニファーバッグ（チェーン付きクロスボディ）。ナタリアバッグ。限定版エキゾチックレザー。",
    tip:"Tom Ford = modern luxury. Sexy, sophisticated, expensive. This is grown-up glamour.",
    tipJp:"トム・フォード = モダンラグジュアリー。セクシー、洗練、高価。これは大人のグラマー。",
    models:[]
  },
  dolcegabbana: {
    name:"Dolce & Gabbana", year:1985, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dolce_%26_Gabbana_logo.svg/512px-Dolce_%26_Gabbana_logo.svg.png",
    auth:"'DOLCE&GABBANA' logo plate. Made in Italy. DG logo on hardware. Bold, ornate designs.",
    authJp:"「DOLCE&GABBANA」ロゴプレート。イタリア製。金具にDGロゴ。大胆で華やかなデザイン。",
    rare:"Sicily bag (iconic). Miss Sicily. Devotion bag with heart. Baroque print bags.",
    rareJp:"シチリアバッグ（象徴的）。ミス シチリア。ハート付きディヴォーションバッグ。バロックプリントバッグ。",
    tip:"Very Italian. Bold prints, gold hardware, baroque vibes. NOT minimalist. Maximalist luxury.",
    tipJp:"非常にイタリアン。大胆なプリント、ゴールド金具、バロック雰囲気。ミニマリストではない。マキシマリストラグジュアリー。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Classic Italian black. Very chic.", descJp:"クラシックなイタリアンブラック。とてもシック。"},
      {name:"Red", hex:"#DC143C", nameJp:"レッド", desc:"Passionate Italian red. Bold statement.", descJp:"情熱的なイタリアンレッド。大胆なステートメント。"},
      {name:"Leopard Print", hex:"#C19A6B", nameJp:"レオパードプリント", desc:"Animal print. So D&G.", descJp:"アニマルプリント。とてもD&G。"},
      {name:"Gold", hex:"#FFD700", nameJp:"ゴールド", desc:"Baroque gold hardware. Maximum luxury.", descJp:"バロックゴールド金具。最大ラグジュアリー。"}
    ],
    models:[
      { name:"Sicily Bag", brief:"Structured tote - Sicilian heritage", briefJp:"構造的トート - シチリア遺産",
        desc:"THE Dolce & Gabbana bag. Inspired by vintage doctor's bag. Structured, elegant.",
        descJp:"Dolce & Gabbanaバッグ。ヴィンテージドクターバッグからインスピレーション。構造的、エレガント。",
        shape:"Trapezoid tote with top handles. Structured with metal feet. DG logo plate.",
        shapeJp:"トップハンドル付き台形トート。メタルフィート付き構造的。DGロゴプレート。",
        sizes:[
          {name:"Mini", dim:"7\"W × 6\"H × 4\"D"},
          {name:"Small", dim:"10\"W × 8\"H × 5\"D"},
          {name:"Medium", dim:"13\"W × 10\"H × 6\"D - MOST POPULAR"},
          {name:"Large", dim:"15\"W × 12\"H × 7\"D"}
        ],
        rare:"Baroque print versions. Lace overlays. Crystal embellishments. Limited edition Sicilian motifs.",
        rareJp:"バロックプリントバージョン。レースオーバーレイ。クリスタル装飾。限定版シチリアモチーフ。",
        tip:"Named after Sicily. This is Italian DRAMA. Baroque prints, lace, crystals. Go big or go home!",
        tipJp:"シチリアにちなんで命名。これはイタリアンドラマ。バロックプリント、レース、クリスタル。大きく行くか帰るか！"
      },
      { name:"Devotion Bag", brief:"Heart logo bag - romantic statement", briefJp:"ハートロゴバッグ - ロマンティックステートメント",
        desc:"Shoulder bag with large Sacred Heart logo. Ornate, romantic, very D&G.",
        descJp:"大きな聖心ロゴ付きショルダーバッグ。華やか、ロマンティック、とてもD&G。",
        shape:"Camera bag style with Sacred Heart closure. Quilted in some versions.",
        shapeJp:"聖心クロージャー付きカメラバッグスタイル。一部バージョンはキルティング。",
        sizes:[
          {name:"Small", dim:"8\"W × 6\"H × 3\"D"},
          {name:"Medium", dim:"10\"W × 7.5\"H × 4\"D - MOST POPULAR"}
        ],
        rare:"Full crystal Sacred Heart. Limited edition baroque prints. Velvet versions.",
        rareJp:"フルクリスタル聖心。限定版バロックプリント。ベルベットバージョン。",
        tip:"That HUGE heart logo? It's a Sacred Heart. Very Italian, very Catholic, very romantic. It's LOUD.",
        tipJp:"あの巨大ハートロゴ？聖心。とてもイタリアン、とてもカトリック、とてもロマンティック。うるさい。"
      },
      { name:"DG Girls Bag", brief:"Crossbody - playful femininity", briefJp:"クロスボディ - 遊び心のある女性らしさ",
        desc:"Small crossbody with DG logo hardware. Fun, flirty, young.",
        descJp:"DGロゴ金具付き小型クロスボディ。楽しい、いちゃつく、若い。",
        shape:"Compact rectangular crossbody with chain strap. DG logo closure.",
        shapeJp:"チェーンストラップ付きコンパクト長方形クロスボディ。DGロゴクロージャー。",
        sizes:[
          {name:"Small", dim:"7.5\"W × 5\"H × 2.5\"D - MOST POPULAR"}
        ],
        rare:"Leopard print. Floral embroidery. Limited edition patches and pins.",
        rareJp:"レオパードプリント。フローラル刺繍。限定版パッチとピン。",
        tip:"This is young D&G. Leopard prints, florals, patches. Like their runway shows - sexy, fun, Italian.",
        tipJp:"これは若いD&G。レオパードプリント、フローラル、パッチ。ランウェイショーのように - セクシー、楽しい、イタリアン。"
      }
    ]
  },
  versace: {
    name:"Versace", year:1978, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Versace_logo.svg/512px-Versace_logo.svg.png",
    auth:"Medusa head logo. 'VERSACE' stamp. Made in Italy. Greek key (meander) pattern. Bold, flashy hardware.",
    authJp:"メデューサヘッドロゴ。「VERSACE」刻印。イタリア製。グリークキー（メアンダー）パターン。大胆で派手な金具。",
    rare:"Medusa shoulder bag. Vintage Gianni Versace pieces (pre-1997). Safety pin dresses/bags (iconic).",
    rareJp:"メデューサショルダーバッグ。ヴィンテージ ジャンニ・ヴェルサーチ作品（1997年以前）。安全ピンドレス/バッグ（象徴的）。",
    tip:"BOLD. Gold Medusa, Greek keys, baroque prints. Versace doesn't do subtle. It screams luxury.",
    tipJp:"大胆。ゴールドメデューサ、グリークキー、バロックプリント。ヴェルサーチは控えめをしない。ラグジュアリーを叫ぶ。",
    colors:[
      {name:"Black with Gold", hex:"#000000", nameJp:"ブラック+ゴールド", desc:"Black leather with gold Medusa. Classic Versace.", descJp:"ゴールドメデューサ付きブラックレザー。クラシックなヴェルサーチ。"},
      {name:"Barocco Print", hex:"#FFD700", nameJp:"バロッコプリント", desc:"Gold baroque print. Maximum Versace.", descJp:"ゴールドバロックプリント。最大ヴェルサーチ。"},
      {name:"Medusa Gold", hex:"#B8860B", nameJp:"メデューサゴールド", desc:"Rich gold hardware. Very opulent.", descJp:"豊かなゴールド金具。とても豪華。"},
      {name:"Red", hex:"#C41E3A", nameJp:"レッド", desc:"Bold Italian red. Statement color.", descJp:"大胆なイタリアンレッド。ステートメントカラー。"}
    ],
    models:[
      { name:"Virtus Bag", brief:"Medusa logo bag - bold statement", briefJp:"メデューサロゴバッグ - 大胆なステートメント",
        desc:"Shoulder bag featuring large Medusa logo. Quilted leather with chain strap.",
        descJp:"大きなメデューサロゴ付きショルダーバッグ。チェーンストラップ付きキルティングレザー。",
        shape:"Quilted camera bag style with large Medusa head closure. Chunky chain strap.",
        shapeJp:"大きなメデューサヘッドクロージャー付きキルティングカメラバッグスタイル。太いチェーンストラップ。",
        sizes:[
          {name:"Small", dim:"8\"W × 6\"H × 3\"D"},
          {name:"Medium", dim:"10\"W × 7.5\"H × 4\"D - MOST POPULAR"}
        ],
        rare:"Barocco print versions. Limited edition colors. Full gold hardware.",
        rareJp:"バロッコプリントバージョン。限定版カラー。フルゴールド金具。",
        tip:"That HUGE Medusa head? It's not subtle. It's Versace. You wear this when you want EVERYONE to notice.",
        tipJp:"あの巨大メデューサヘッド？控えめではない。ヴェルサーチ。全員に気づいてほしい時にこれを着ける。"
      },
      { name:"La Medusa Tote", brief:"Structured tote - power luxury", briefJp:"構造的トート - パワーラグジュアリー",
        desc:"Large structured tote with Medusa hardware. Professional but flashy.",
        descJp:"メデューサ金具付き大型構造的トート。プロフェッショナルだが派手。",
        shape:"Rectangular structured tote with top handles. Large Medusa medallion.",
        shapeJp:"トップハンドル付き長方形構造的トート。大きなメデューサメダリオン。",
        sizes:[
          {name:"Medium", dim:"13\"W × 10\"H × 6\"D - MOST POPULAR"},
          {name:"Large", dim:"15\"W × 12\"H × 7\"D"}
        ],
        rare:"Barocco quilted versions. Gold-tone hardware. Vintage Gianni Versace era.",
        rareJp:"バロッコキルティングバージョン。ゴールドトーン金具。ヴィンテージ ジャンニ・ヴェルサーチ時代。",
        tip:"This is the power tote. Gold Medusa on the front. Greek key lining. Walk into that boardroom BOLD.",
        tipJp:"これがパワートート。前面にゴールドメデューサ。グリークキー裏地。大胆にその役員室に入る。"
      },
      { name:"Greca Goddess Bag", brief:"Greek key shoulder bag - heritage motif", briefJp:"グリークキーショルダーバッグ - 伝統モチーフ",
        desc:"Crossbody with signature Greek key (Greca) pattern. Heritage Versace motif.",
        descJp:"シグネチャー グリークキー（グレカ）パターンのクロスボディ。ヴェルサーチ伝統モチーフ。",
        shape:"Flap crossbody with Greek key embossing. Chain strap with leather weave.",
        shapeJp:"グリークキーエンボス付きフラップクロスボディ。レザーウィーブ付きチェーンストラップ。",
        sizes:[
          {name:"Small", dim:"7.5\"W × 5.5\"H × 2.5\"D - MOST POPULAR"},
          {name:"Medium", dim:"9\"W × 7\"H × 3\"D"}
        ],
        rare:"Vintage Gianni era Greek key. Limited edition barocco print. Crystal embellishments.",
        rareJp:"ヴィンテージ ジャンニ時代グリークキー。限定版バロッコプリント。クリスタル装飾。",
        tip:"That Greek key pattern? Versace's SIGNATURE since day one. Gianni Versace was obsessed with Greek mythology.",
        tipJp:"あのグリークキーパターン？初日からヴェルサーチのシグネチャー。ジャンニ・ヴェルサーチはギリシャ神話に夢中だった。"
      }
    ]
  },
  jimmychoo: {
    name:"Jimmy Choo", year:1996, country:"UK",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Jimmy_Choo_logo.svg/512px-Jimmy_Choo_logo.svg.png",
    auth:"'JIMMY CHOO' logo embossed or on plate. Made in Italy. Star studs (signature motif). Serial number inside.",
    authJp:"「JIMMY CHOO」エンボスまたはプレート。イタリア製。スタースタッズ（シグネチャーモチーフ）。内側にシリアル番号。",
    rare:"Choo 24:7 bag. Bon Bon bucket bag. Star-studded bags. Collaborations (H&M was huge).",
    rareJp:"Choo 24:7バッグ。ボンボンバケットバッグ。スタースタッズバッグ。コラボレーション（H&Mは巨大だった）。",
    tip:"Known for SHOES, but bags are solid. Star studs = Jimmy Choo. Red carpet glamour.",
    tipJp:"シューズで有名だが、バッグも堅実。スタースタッズ = ジミー・チュウ。レッドカーペットグラマー。",
    models:[]
  },
  christianlouboutin: {
    name:"Christian Louboutin", year:1991, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Christian_Louboutin_logo.svg/512px-Christian_Louboutin_logo.svg.png",
    auth:"'CHRISTIAN LOUBOUTIN' stamp. Made in Italy. Red sole on some bag designs (like shoes). Spike studs.",
    authJp:"「CHRISTIAN LOUBOUTIN」刻印。イタリア製。一部バッグデザインに赤底（靴のように）。スパイクスタッズ。",
    rare:"Paloma clutch (spiked). Sweet Charity shoulder bag. Panettone wallet. Red-soled bags.",
    rareJp:"パロマクラッチ（スパイク付き）。スイートチャリティショルダーバッグ。パネットーネウォレット。レッドソールバッグ。",
    tip:"Red soles on SHOES made him famous. Bags have same edgy luxury. Spikes, studs, glamour.",
    tipJp:"シューズの赤底で有名に。バッグも同じエッジーラグジュアリー。スパイク、スタッズ、グラマー。",
    models:[]
  },
  offwhite: {
    name:"Off-White", year:2013, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Off-White_logo.svg/512px-Off-White_logo.svg.png",
    auth:"'OFF-WHITE' logo. Industrial belt strap. Diagonal arrows. Quote marks. Made in Italy.",
    authJp:"「OFF-WHITE」ロゴ。インダストリアルベルトストラップ。斜め矢印。引用符。イタリア製。",
    rare:"Binder Clip bag (iconic). Jitney bag. Virgil Abloh era pieces (2013-2021). Nike collabs.",
    rareJp:"バインダークリップバッグ（象徴的）。ジットニーバッグ。ヴァージル・アブロー時代作品（2013-2021）。ナイキコラボ。",
    tip:"Virgil Abloh's streetwear meets luxury. The yellow industrial belt = instant recognition.",
    tipJp:"ヴァージル・アブローのストリートウェアとラグジュアリーの融合。黄色のインダストリアルベルト = 即座に認識。",
    models:[]
  },
  marni: {
    name:"Marni", year:1994, country:"Italy",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Marni_logo.svg/512px-Marni_logo.svg.png",
    auth:"'MARNI' logo. Made in Italy. Known for unusual shapes, bold colors. Minimalist hardware.",
    authJp:"「MARNI」ロゴ。イタリア製。珍しい形、大胆な色で知られる。ミニマリスト金具。",
    rare:"Trunk bag. Museo bag (soft tote). Color-block designs. Vintage 2000s pieces.",
    rareJp:"トランクバッグ。ムセオバッグ（ソフトトート）。カラーブロックデザイン。2000年代ヴィンテージ作品。",
    tip:"Quirky, artistic, bold colors. Marni is NOT boring. It's for people who take fashion risks.",
    tipJp:"風変わり、芸術的、大胆な色。マルニは退屈ではない。ファッションリスクを取る人向け。",
    models:[]
  },
  therow: {
    name:"The Row", year:2006, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/The_Row_logo.svg/512px-The_Row_logo.svg.png",
    auth:"'THE ROW' discreet label. Made in Italy or USA. No logos, minimalist. Premium materials (cashmere-lined).",
    authJp:"「THE ROW」控えめラベル。イタリアまたは米国製。ロゴなし、ミニマリスト。プレミアム素材（カシミア裏地）。",
    rare:"Margaux tote. Half Moon bag. Sofia bag. Ashley and Mary-Kate Olsen designed - ultra-luxury.",
    rareJp:"マルゴートート。ハーフムーンバッグ。ソフィアバッグ。アシュリーとメアリー・ケイト・オルセンデザイン - 超ラグジュアリー。",
    tip:"QUIET luxury. No logos. Insane quality. If you know The Row, you're in the know.",
    tipJp:"静かなラグジュアリー。ロゴなし。驚異的品質。The Rowを知ってるなら、あなたは通。",
    models:[]
  },
  stellamccartney: {
    name:"Stella McCartney", year:2001, country:"UK",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Stella_McCartney_logo.svg/512px-Stella_McCartney_logo.svg.png",
    auth:"'STELLA McCARTNEY' logo. Made in Italy. Vegan - NO LEATHER. Uses sustainable materials.",
    authJp:"「STELLA McCARTNEY」ロゴ。イタリア製。ヴィーガン - レザーなし。持続可能な素材使用。",
    rare:"Falabella bag (chain trim). Vegan leather innovator. Beatles legacy (Paul McCartney's daughter).",
    rareJp:"ファラベラバッグ（チェーントリム）。ヴィーガンレザー革新者。ビートルズ遺産（ポール・マッカートニーの娘）。",
    tip:"NO LEATHER, NO FUR, NO SKIN. All vegan luxury. Stella changed the game for sustainable fashion.",
    tipJp:"レザーなし、ファーなし、スキンなし。すべてヴィーガンラグジュアリー。ステラはサステナブルファッションのゲームを変えた。",
    models:[]
  },
  proenzaschouler: {
    name:"Proenza Schouler", year:2002, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Proenza_Schouler_logo.svg/512px-Proenza_Schouler_logo.svg.png",
    auth:"'PROENZA SCHOULER' label. Made in Italy or China. PS logo hardware. Contemporary luxury.",
    authJp:"「PROENZA SCHOULER」ラベル。イタリアまたは中国製。PS金具ロゴ。コンテンポラリーラグジュアリー。",
    rare:"PS1 bag (satchel with buckles). PS11 (box bag). PS Courier bag. Early 2000s pieces.",
    rareJp:"PS1バッグ（バックル付きサッチェル）。PS11（ボックスバッグ）。PSクーリエバッグ。2000年代初期作品。",
    tip:"The PS1 was THE It bag of the 2010s. Modern, structured, downtown NYC cool.",
    tipJp:"PS1は2010年代のTHE Itバッグだった。モダン、構造的、ダウンタウンNYCクール。",
    models:[]
  },
  balmain: {
    name:"Balmain", year:1945, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Balmain_logo.svg/512px-Balmain_logo.svg.png",
    auth:"'BALMAIN PARIS' logo. Made in Italy. Military-inspired hardware (buttons, chains). Bold embellishments.",
    authJp:"「BALMAIN PARIS」ロゴ。イタリア製。ミリタリー風金具（ボタン、チェーン）。大胆な装飾。",
    rare:"B-Buzz bag. BBag. Olivier Rousteing era (2011+) collectible. Vintage Pierre Balmain pieces.",
    rareJp:"B-バズバッグ。Bバッグ。オリヴィエ・ルスタン時代（2011+）コレクティブル。ヴィンテージ ピエール・バルマン作品。",
    tip:"Military jackets made Balmain famous. Bags have same vibe - structured, bold, fierce.",
    tipJp:"ミリタリージャケットでバルマンは有名に。バッグも同じ雰囲気 - 構造的、大胆、激しい。",
    models:[]
  },
  alexanderwang: {
    name:"Alexander Wang", year:2005, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Alexander_Wang_logo.svg/512px-Alexander_Wang_logo.svg.png",
    auth:"'ALEXANDER WANG' logo or AW tag. Made in China or Italy. Edgy hardware (studs, chains).",
    authJp:"「ALEXANDER WANG」ロゴまたはAWタグ。中国またはイタリア製。エッジーな金具（スタッズ、チェーン）。",
    rare:"Rocco bag (studs and zippers). Lia bag. Marti backpack. Early 2010s NYC cool.",
    rareJp:"ロッコバッグ（スタッズとジッパー）。リアバッグ。マルティバックパック。2010年代初期NYCクール。",
    tip:"Downtown NYC aesthetic. Black, studs, zippers, edge. Model-off-duty style.",
    tipJp:"ダウンタウンNYC美学。ブラック、スタッズ、ジッパー、エッジ。オフデューティモデルスタイル。",
    models:[]
  },
  lanvin: {
    name:"Lanvin", year:1889, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Lanvin_logo.svg/512px-Lanvin_logo.svg.png",
    auth:"'LANVIN PARIS' logo. Made in Italy. Oldest French fashion house still operating.",
    authJp:"「LANVIN PARIS」ロゴ。イタリア製。現在も営業中の最古のフランスファッションハウス。",
    rare:"Happy bag (woven chain handle). Cabas tote. Alber Elbaz era (2001-2015) highly collectible.",
    rareJp:"ハッピーバッグ（編みチェーンハンドル）。カバトート。アルベール・エルバズ時代（2001-2015）高コレクティブル。",
    tip:"Oldest French couture house (1889). Alber Elbaz made it cool again in 2000s. Feminine, elegant.",
    tipJp:"最古のフランスクチュールハウス（1889）。アルベール・エルバズが2000年代に再びクールに。女性的、エレガント。",
    models:[]
  },
  jilsander: {
    name:"Jil Sander", year:1968, country:"Germany",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Jil_Sander_logo.svg/512px-Jil_Sander_logo.svg.png",
    auth:"'JIL SANDER' discreet label. Made in Italy. Minimalist - clean lines, no logos. Premium materials.",
    authJp:"「JIL SANDER」控えめラベル。イタリア製。ミニマリスト - クリーンライン、ロゴなし。プレミアム素材。",
    rare:"Tangle bag (knotted handle). Cannolo bag. Vintage 90s pieces. Phoebe Philo collaborations.",
    rareJp:"タングルバッグ（結び目ハンドル）。カンノーロバッグ。90年代ヴィンテージ作品。フィービー・ファイロコラボ。",
    tip:"QUEEN of minimalism. Clean, architectural, no logos. Jil Sander = less is more.",
    tipJp:"ミニマリズムの女王。クリーン、建築的、ロゴなし。ジル・サンダー = 少ない方が多い。",
    models:[]
  },
  goyard: {
    name:"Goyard", year:1853, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Goyard_logo.svg/512px-Goyard_logo.svg.png",
    auth:"Hand-painted Y pattern (Goyardine canvas). No serial numbers. Heat stamp with owner initials. Made in France.",
    authJp:"手描きYパターン（ゴヤールディーヌキャンバス）。シリアル番号なし。所有者イニシャルの刻印。フランス製。",
    rare:"St. Louis tote. Saigon tote. Bellechasse bag. Special colors (rare - most are standard).",
    rareJp:"サンルイトート。サイゴントート。ベルシャスバッグ。スペシャルカラー（希少 - ほとんどは標準）。",
    tip:"NO ONLINE SALES. Only in Goyard boutiques. Hand-painted monogram. Ultimate exclusivity.",
    tipJp:"オンライン販売なし。ゴヤールブティックのみ。手描きモノグラム。究極の独占性。",
    colors:[
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Classic black Goyardine. Timeless.", descJp:"クラシックブラック ゴヤールディーヌ。タイムレス。"},
      {name:"Goyard Green", hex:"#2C5F2D", nameJp:"ゴヤールグリーン", desc:"Signature deep green. Very Goyard.", descJp:"シグネチャー深緑。とてもゴヤール。"},
      {name:"Navy", hex:"#1C2951", nameJp:"ネイビー", desc:"Deep navy Goyardine. Classic.", descJp:"深いネイビー ゴヤールディーヌ。クラシック。"},
      {name:"Grey", hex:"#808080", nameJp:"グレー", desc:"Neutral grey. Versatile.", descJp:"ニュートラルグレー。万能。"}
    ],
    models:[
      { name:"St. Louis Tote", brief:"Open tote - iconic reversible", briefJp:"オープントート - 象徴的リバーシブル",
        desc:"THE Goyard tote. Reversible - Goyardine outside, leather inside. No zipper.",
        descJp:"Goyardトート。リバーシブル - 外側ゴヤールディーヌ、内側レザー。ジッパーなし。",
        shape:"Open-top tote with leather handles. Reversible construction.",
        shapeJp:"レザーハンドル付きオープントップトート。リバーシブル構造。",
        sizes:[
          {name:"PM", dim:"11\"W × 8\"H × 6\"D"},
          {name:"GM", dim:"13\"W × 11\"H × 7\"D - MOST POPULAR"},
          {name:"MM", dim:"15\"W × 13\"H × 8\"D"}
        ],
        rare:"Special colors (limited release). Personalized monogramming. Vintage with leather bottom.",
        rareJp:"スペシャルカラー（限定リリース）。パーソナライズドモノグラム。レザーボトム付きヴィンテージ。",
        tip:"It's REVERSIBLE! Flip it inside out. Hand-painted Y pattern. NO online sales - boutique only. EXCLUSIVE.",
        tipJp:"リバーシブル！裏返す。手描きYパターン。オンライン販売なし - ブティックのみ。独占的。"
      },
      { name:"Anjou Tote", brief:"Structured tote - professional elegance", briefJp:"構造的トート - プロフェッショナルエレガンス",
        desc:"More structured than St. Louis. Zip-top closure for security.",
        descJp:"サンルイより構造的。セキュリティのためのジップトップクロージャー。",
        shape:"Structured tote with zip closure. Goyardine canvas with leather trim.",
        shapeJp:"ジップクロージャー付き構造的トート。レザートリム付きゴヤールディーヌキャンバス。",
        sizes:[
          {name:"PM", dim:"12\"W × 9\"H × 6\"D"},
          {name:"GM", dim:"14\"W × 11\"H × 7\"D - MOST POPULAR"}
        ],
        rare:"Special color combos. Personalized heat stamp. Limited edition releases.",
        rareJp:"スペシャルカラーコンボ。パーソナライズドヒートスタンプ。限定版リリース。",
        tip:"Zip-top = more secure than St. Louis. Still hand-painted. Still boutique-only. Still GOYARD.",
        tipJp:"ジップトップ = サンルイより安全。依然手描き。依然ブティックのみ。依然ゴヤール。"
      },
      { name:"Bellechasse Bag", brief:"Shoulder bag - everyday luxury", briefJp:"ショルダーバッグ - 日常ラグジュアリー",
        desc:"Crossbody with adjustable strap. Zip closure. Daily luxury.",
        descJp:"調節可能ストラップ付きクロスボディ。ジップクロージャー。デイリーラグジュアリー。",
        shape:"Structured crossbody with front flap. Goyardine with leather accents.",
        shapeJp:"フロントフラップ付き構造的クロスボディ。レザーアクセント付きゴヤールディーヌ。",
        sizes:[
          {name:"PM", dim:"9\"W × 7\"H × 3\"D - MOST POPULAR"},
          {name:"GM", dim:"11\"W × 9\"H × 4\"D"}
        ],
        rare:"Special colors. Personalized monogram. Vintage pieces with brass hardware.",
        rareJp:"スペシャルカラー。パーソナライズドモノグラム。真鍮金具付きヴィンテージ作品。",
        tip:"Crossbody = hands-free. Goyard quality but practical. Still hand-painted. Still exclusive.",
        tipJp:"クロスボディ = ハンズフリー。ゴヤール品質だが実用的。依然手描き。依然独占的。"
      }
    ]
  },
  delvaux: {
    name:"Delvaux", year:1829, country:"Belgium",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Delvaux_logo.svg/512px-Delvaux_logo.svg.png",
    auth:"'DELVAUX BRUXELLES' stamp. Made in Belgium or France. D logo clasp. Oldest fine leather goods house.",
    authJp:"「DELVAUX BRUXELLES」刻印。ベルギーまたはフランス製。Dロゴクラスプ。最古の高級レザーグッズハウス。",
    rare:"Brillant bag (structured). Tempête bag. Pin bag. Royal warrant holder (Belgian royalty).",
    rareJp:"ブリヤンバッグ（構造的）。タンペットバッグ。ピンバッグ。王室御用達（ベルギー王室）。",
    tip:"Older than Louis Vuitton (1829!). Belgian craftsmanship. The Brillant is architectural perfection.",
    tipJp:"ルイ・ヴィトンより古い（1829！）。ベルギー職人技。ブリヤンは建築的完璧。",
    models:[]
  },
  judithlieber: {
    name:"Judith Leiber", year:1963, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Judith_Leiber_logo.svg/512px-Judith_Leiber_logo.svg.png",
    auth:"'JUDITH LEIBER' signature. Made in USA or Italy. Crystal minaudières (evening bags). Serial number.",
    authJp:"「JUDITH LEIBER」署名。米国またはイタリア製。クリスタルミノディエール（イブニングバッグ）。シリアル番号。",
    rare:"Crystal animal clutches (collectible). Vintage 1960s-80s. Custom pieces. Red carpet bags.",
    rareJp:"クリスタル動物クラッチ（コレクティブル）。1960-80年代ヴィンテージ。カスタム作品。レッドカーペットバッグ。",
    tip:"Crystal minaudières shaped like animals, fruits, objects. Red carpet staple. Whimsical luxury.",
    tipJp:"動物、果物、オブジェクトの形のクリスタルミノディエール。レッドカーペット定番。気まぐれなラグジュアリー。",
    models:[]
  },
  markcross: {
    name:"Mark Cross", year:1845, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Mark_Cross_logo.svg/512px-Mark_Cross_logo.svg.png",
    auth:"'MARK CROSS' logo. Made in Italy. Grace Kelly carried one. Structured, classic American luxury.",
    authJp:"「MARK CROSS」ロゴ。イタリア製。グレース・ケリーが持った。構造的、クラシックアメリカンラグジュアリー。",
    rare:"Grace Box bag (named after Grace Kelly). Vintage 1950s-60s pieces. Saffiano leather.",
    rareJp:"グレースボックスバッグ（グレース・ケリーにちなんで命名）。1950-60年代ヴィンテージ作品。サフィアーノレザー。",
    tip:"Grace Kelly carried Mark Cross. That's all you need to know. Royalty approved.",
    tipJp:"グレース・ケリーがマーク・クロスを持った。それだけで十分。王室承認。",
    models:[]
  },
  mulberry: {
    name:"Mulberry", year:1971, country:"UK",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Mulberry_logo.svg/512px-Mulberry_logo.svg.png",
    auth:"'MULBERRY' stamp. Made in UK (premium) or China. Postman's lock (signature). Tree logo.",
    authJp:"「MULBERRY」刻印。英国製（プレミアム）または中国製。郵便屋ロック（シグネチャー）。木のロゴ。",
    rare:"Bayswater bag (iconic). Alexa bag (named after Alexa Chung). Vintage UK-made pieces.",
    rareJp:"ベイズウォーターバッグ（象徴的）。アレクサバッグ（アレクサ・チャンにちなんで命名）。ヴィンテージ英国製作品。",
    tip:"British leather craftsmanship. The Bayswater is THE classic. Alexa Chung made the Alexa bag huge.",
    tipJp:"英国レザー職人技。ベイズウォーターはTHEクラシック。アレクサ・チャンがアレクサバッグを巨大にした。",
    colors:[
      {name:"Oak", hex:"#8B6F47", nameJp:"オーク", desc:"Classic tan leather. Signature Mulberry.", descJp:"クラシックタンレザー。シグネチャー マルベリー。"},
      {name:"Black", hex:"#000000", nameJp:"ブラック", desc:"Timeless black. Always chic.", descJp:"タイムレスブラック。常にシック。"},
      {name:"Oxblood", hex:"#4A0404", nameJp:"オックスブラッド", desc:"Deep burgundy. Very British.", descJp:"深いバーガンディ。とても英国的。"},
      {name:"Navy", hex:"#000080", nameJp:"ネイビー", desc:"Classic navy. Professional.", descJp:"クラシックネイビー。プロフェッショナル。"}
    ],
    models:[
      { name:"Bayswater", brief:"Structured tote - British icon", briefJp:"構造的トート - 英国アイコン",
        desc:"THE Mulberry bag. Structured tote with postman's lock closure.",
        descJp:"Mulberryバッグ。郵便屋ロッククロージャー付き構造的トート。",
        shape:"Rectangular structured bag with flap and postman's lock. Top handles.",
        shapeJp:"フラップと郵便屋ロック付き長方形構造的バッグ。トップハンドル。",
        sizes:[
          {name:"Small", dim:"11\"W × 9\"H × 5\"D"},
          {name:"Regular", dim:"14\"W × 11\"H × 6\"D - MOST POPULAR"},
          {name:"Large", dim:"16\"W × 13\"H × 7\"D"}
        ],
        rare:"Vintage UK-made (pre-2000s). Limited edition colors. Darwin leather (ages beautifully).",
        rareJp:"ヴィンテージ英国製（2000年代以前）。限定版カラー。ダーウィンレザー（美しく経年変化）。",
        tip:"That postman's lock? Mulberry's SIGNATURE. British craftsmanship. Oak leather ages like fine wine.",
        tipJp:"あの郵便屋ロック？Mulberryのシグネチャー。英国職人技。オークレザーは上質ワインのように経年変化。"
      },
      { name:"Alexa", brief:"Satchel - cool girl classic", briefJp:"サッチェル - クールガールクラシック",
        desc:"Named after Alexa Chung. Vintage-inspired satchel with hardware details.",
        descJp:"アレクサ・チャンにちなんで命名。金具ディテール付きヴィンテージ風サッチェル。",
        shape:"Slouchy satchel with flap and hardware. Detachable shoulder strap.",
        shapeJp:"フラップと金具付きスラウチーサッチェル。取り外し可能ショルダーストラップ。",
        sizes:[
          {name:"Regular", dim:"12\"W × 8\"H × 4\"D - MOST POPULAR"},
          {name:"Mini", dim:"8\"W × 6\"H × 3\"D"}
        ],
        rare:"Limited edition colors. Elaphe (python) versions. Original 2009-2012 releases.",
        rareJp:"限定版カラー。エラフェ（パイソン）バージョン。2009-2012年オリジナルリリース。",
        tip:"Alexa Chung carried it. IT bag of 2010. Vintage-cool meets British heritage. Style icon approved!",
        tipJp:"アレクサ・チャンが持った。2010年のITバッグ。ヴィンテージクールと英国伝統の融合。スタイルアイコン承認！"
      },
      { name:"Lily", brief:"Shoulder bag - everyday elegance", briefJp:"ショルダーバッグ - 日常エレガンス",
        desc:"Compact shoulder bag with signature twist-lock. Practical luxury.",
        descJp:"シグネチャー ツイストロック付きコンパクトショルダーバッグ。実用的ラグジュアリー。",
        shape:"Structured shoulder bag with twist-lock closure. Adjustable strap.",
        shapeJp:"ツイストロッククロージャー付き構造的ショルダーバッグ。調節可能ストラップ。",
        sizes:[
          {name:"Small", dim:"9\"W × 6\"H × 3\"D - MOST POPULAR"},
          {name:"Medium", dim:"11\"W × 7\"H × 4\"D"}
        ],
        rare:"Vintage UK-made. Exotic leathers. Limited edition hardware finishes.",
        rareJp:"ヴィンテージ英国製。エキゾチックレザー。限定版金具仕上げ。",
        tip:"That twist-lock = classic Mulberry hardware. British quality at accessible prices. Everyday luxury.",
        tipJp:"あのツイストロック = クラシック Mulberry金具。アクセシブルな価格の英国品質。日常ラグジュアリー。"
      }
    ]
  },
  coach: {
    name:"Coach", year:1941, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Coach_logo.svg/512px-Coach_logo.svg.png",
    auth:"'COACH' logo. Made in USA (vintage) or China/Vietnam (modern). Creed patch inside with serial.",
    authJp:"「COACH」ロゴ。米国製（ヴィンテージ）または中国/ベトナム製（モダン）。内側にシリアル付きクリードパッチ。",
    rare:"Vintage USA-made bags (1960s-90s). Bonnie Cashin era. Willis bag. Legacy collection.",
    rareJp:"ヴィンテージ米国製バッグ（1960-90年代）。ボニー・カシン時代。ウィリスバッグ。レガシーコレクション。",
    tip:"Vintage Coach (USA-made) is GOLD. Modern Coach is accessible luxury. Know the difference.",
    tipJp:"ヴィンテージコーチ（米国製）はゴールド。モダンコーチはアクセシブルラグジュアリー。違いを知る。",
    models:[]
  },
  jacquemus: {
    name:"Jacquemus", year:2009, country:"France",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Jacquemus_logo.svg/512px-Jacquemus_logo.svg.png",
    auth:"'JACQUEMUS' logo. Made in Portugal or Italy. Known for TINY micro bags and oversized XL bags.",
    authJp:"「JACQUEMUS」ロゴ。ポルトガルまたはイタリア製。超小型マイクロバッグと特大XLバッグで知られる。",
    rare:"Le Chiquito (TINY bag - phone won't fit). Le Grand Bambino. Bright colors, playful shapes.",
    rareJp:"ル・シキート（超小型バッグ - 電話が入らない）。ル・グラン・バンビーノ。明るい色、遊び心のある形。",
    tip:"Instagram famous for TINY bags. Le Chiquito is comically small. It's art, not utility.",
    tipJp:"超小型バッグでInstagram有名。ル・シキートは滑稽なほど小さい。実用性ではなくアート。",
    models:[]
  },
  chromHearts: {
    name:"Chrome Hearts", year:1988, country:"USA",
    categories:["handbags"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Chrome_Hearts_logo.svg/512px-Chrome_Hearts_logo.svg.png",
    auth:"Cross logo. 'CHROME HEARTS' stamp. Made in USA. Sterling silver hardware. Gothic aesthetic.",
    authJp:"クロスロゴ。「CHROME HEARTS」刻印。米国製。スターリングシルバー金具。ゴシック美学。",
    rare:"Leather bags with silver hardware. Custom pieces. Collaborations (Off-White, Rick Owens).",
    rareJp:"シルバー金具付きレザーバッグ。カスタム作品。コラボレーション（オフホワイト、リック・オウエンス）。",
    tip:"Biker luxury. Gothic crosses, sterling silver, rock 'n' roll. Chrome Hearts is CULT status.",
    tipJp:"バイカーラグジュアリー。ゴシッククロス、スターリングシルバー、ロックンロール。クロムハーツはカルトステータス。",
    models:[]
  },
  chopard: {
    name:"Chopard", year:1860, country:"Switzerland",
    categories:["jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chopard_logo.svg/512px-Chopard_logo.svg.png",
    auth:"'CHOPARD' stamp. Swiss hallmarks. Serial number. High jewelry and watches.",
    authJp:"「CHOPARD」刻印。スイスホールマーク。シリアル番号。ハイジュエリーと時計。",
    rare:"Happy Diamonds (moving diamonds). Ice Cube collection. Red carpet jewelry (Cannes).",
    rareJp:"ハッピーダイヤモンド（動くダイヤモンド）。アイスキューブコレクション。レッドカーペットジュエリー（カンヌ）。",
    tip:"Swiss luxury jewelry and watches. Happy Diamonds MOVE inside the watch. Playful high jewelry.",
    tipJp:"スイスラグジュアリージュエリーと時計。ハッピーダイヤモンドは時計内で動く。遊び心のあるハイジュエリー。",
    colors:[
      {name:"18k White Gold", hex:"#E5E4E2", nameJp:"18金ホワイトゴールド", desc:"Classic white gold. Swiss precision.", descJp:"クラシックホワイトゴールド。スイス精密。"},
      {name:"18k Yellow Gold", hex:"#FFD700", nameJp:"18金イエローゴールド", desc:"Warm gold. Timeless elegance.", descJp:"温かいゴールド。タイムレスなエレガンス。"},
      {name:"18k Rose Gold", hex:"#B76E79", nameJp:"18金ローズゴールド", desc:"Romantic rose gold. Very flattering.", descJp:"ロマンティックローズゴールド。とても似合う。"},
      {name:"Diamond", hex:"#FFFFFF", nameJp:"ダイヤモンド", desc:"Moving Happy Diamonds. Playful luxury.", descJp:"動くハッピーダイヤモンド。遊び心のあるラグジュアリー。"}
    ],
    models:[
      { name:"Happy Diamonds", brief:"Moving diamonds - playful innovation", briefJp:"動くダイヤモンド - 遊び心のある革新",
        desc:"THE Chopard signature. Loose diamonds that move freely between two sapphire crystals.",
        descJp:"Chopardシグネチャー。2つのサファイアクリスタル間を自由に動く緩いダイヤモンド。",
        shape:"Various shapes - pendant, earrings, watch. Diamonds move inside sealed compartment.",
        shapeJp:"様々な形状 - ペンダント、イヤリング、時計。密閉区画内でダイヤモンドが動く。",
        sizes:[
          {name:"Watch", dim:"36mm - 40mm diameter"},
          {name:"Pendant", dim:"Small to Large - various sizes"},
          {name:"Earrings", dim:"Stud to Drop styles"}
        ],
        rare:"Vintage 1976 original Happy Diamonds. Limited edition colored gemstones. Full pavé versions.",
        rareJp:"1976年オリジナル ハッピーダイヤモンドのヴィンテージ。限定版カラー宝石。フルパヴェバージョン。",
        tip:"The diamonds MOVE! Shake it on camera. They dance around. Innovation from 1976. Still iconic today.",
        tipJp:"ダイヤモンドが動く！カメラで振る。踊り回る。1976年からの革新。今でも象徴的。"
      },
      { name:"Ice Cube", brief:"Geometric cube design - modern minimalism", briefJp:"幾何学的キューブデザイン - モダンミニマリズム",
        desc:"Modern collection with cube-shaped links. Minimalist Swiss design.",
        descJp:"キューブ型リンクのモダンコレクション。ミニマリストスイスデザイン。",
        shape:"Square cube links connected together. Clean geometric lines.",
        shapeJp:"つながった正方形キューブリンク。クリーンな幾何学的ライン。",
        sizes:[
          {name:"Pendant", dim:"Small to Large cubes"},
          {name:"Bracelet", dim:"Flexible cube links"},
          {name:"Ring", dim:"Single or stacked cubes"}
        ],
        rare:"Full diamond pavé cubes. Limited edition colors. Oversized cube versions.",
        rareJp:"フルダイヤモンドパヴェキューブ。限定版カラー。特大キューブバージョン。",
        tip:"It's CUBES. Modern, geometric, Swiss precision. Stack them, layer them. This is contemporary Chopard.",
        tipJp:"それはキューブ。モダン、幾何学的、スイス精密。スタックする、レイヤーする。これが現代的Chopard。"
      },
      { name:"Mille Miglia", brief:"Racing-inspired watches - motorsport heritage", briefJp:"レーシング風時計 - モータースポーツ伝統",
        desc:"Watch collection inspired by legendary Italian race. Racing chronographs.",
        descJp:"伝説のイタリアンレースからインスピレーション。レーシングクロノグラフ。",
        shape:"Chronograph watches with racing details. Sporty but luxury.",
        shapeJp:"レーシングディテール付きクロノグラフ時計。スポーティーだが高級。",
        sizes:[
          {name:"40mm", dim:"Classic racing size"},
          {name:"42mm", dim:"Sport chronograph - MOST POPULAR"},
          {name:"44mm", dim:"Large racing dial"}
        ],
        rare:"Limited edition race commemoratives. Vintage 1988 originals. Special dials.",
        rareJp:"限定版レース記念版。1988年オリジナルのヴィンテージ。スペシャルダイヤル。",
        tip:"Named after the Mille Miglia race. 1,000 miles across Italy. This is luxury meets motorsport.",
        tipJp:"ミッレミリアレースにちなんで命名。イタリア横断1000マイル。これはラグジュアリーとモータースポーツの融合。"
      }
    ]
  },
  pomellato: {
    name:"Pomellato", year:1967, country:"Italy",
    categories:["jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Pomellato_logo.svg/512px-Pomellato_logo.svg.png",
    auth:"'POMELLATO' stamp. Made in Italy. Known for colorful gemstones. Cabochon cuts.",
    authJp:"「POMELLATO」刻印。イタリア製。カラフルな宝石で知られる。カボションカット。",
    rare:"Nudo collection (large gemstone rings). Iconica collection. Vintage 1960s-70s pieces.",
    rareJp:"ヌードコレクション（大きな宝石リング）。アイコニカコレクション。1960-70年代ヴィンテージ作品。",
    tip:"Italian. Colorful. Cabochon gemstones. Pomellato is BOLD jewelry for confident women.",
    tipJp:"イタリアン。カラフル。カボション宝石。ポメラートは自信のある女性のための大胆なジュエリー。",
    colors:[
      {name:"18k Rose Gold", hex:"#B76E79", nameJp:"18金ローズゴールド", desc:"Signature Pomellato rose gold. Very Italian.", descJp:"シグネチャー ポメラート ローズゴールド。とてもイタリアン。"},
      {name:"Blue Topaz", hex:"#4682B4", nameJp:"ブルートパーズ", desc:"Vibrant blue cabochon. Bold color.", descJp:"鮮やかなブルーカボション。大胆な色。"},
      {name:"Amethyst", hex:"#9966CC", nameJp:"アメジスト", desc:"Rich purple. Very dramatic.", descJp:"豊かな紫。とてもドラマティック。"},
      {name:"Smoky Quartz", hex:"#6E4B3A", nameJp:"スモーキークオーツ", desc:"Deep brown gemstone. Sophisticated.", descJp:"深いブラウン宝石。洗練。"}
    ],
    models:[
      { name:"Nudo", brief:"Large cabochon ring - bold color statement", briefJp:"大きなカボションリング - 大胆なカラーステートメント",
        desc:"THE Pomellato ring. Oversized cabochon gemstone on rose gold band.",
        descJp:"Pomellatoリング。ローズゴールドバンド上の特大カボション宝石。",
        shape:"Large oval or cushion-cut cabochon stone. Minimal prong setting shows maximum stone.",
        shapeJp:"大きなオーバルまたはクッションカットカボションストーン。最小プロングセッティングで最大ストーンを見せる。",
        sizes:[
          {name:"Classic", dim:"12mm gemstone - MOST POPULAR"},
          {name:"Maxi", dim:"15mm gemstone - statement size"},
          {name:"Mini", dim:"8mm gemstone"}
        ],
        rare:"Rare gemstone colors (Mandarin garnet, tanzanite). Vintage 1990s original Nudo. Full diamond pavé band.",
        rareJp:"希少宝石色（マンダリンガーネット、タンザナイト）。1990年代オリジナル ヌードのヴィンテージ。フルダイヤモンドパヴェバンド。",
        tip:"That HUGE stone? It's a cabochon - smooth, no facets. Italian jewelry is about COLOR and SIZE. Go bold!",
        tipJp:"あの巨大ストーン？カボション - 滑らか、ファセットなし。イタリアンジュエリーは色とサイズについて。大胆に！"
      },
      { name:"Iconica", brief:"Chain bracelet - Italian craftsmanship", briefJp:"チェーンブレスレット - イタリア職人技",
        desc:"Chunky chain bracelet in rose gold. Simple but impactful.",
        descJp:"ローズゴールドの太いチェーンブレスレット。シンプルだが印象的。",
        shape:"Heavy oval chain links. Substantial weight, luxury feel.",
        shapeJp:"重いオーバルチェーンリンク。実質的重量、ラグジュアリー感触。",
        sizes:[
          {name:"Bracelet", dim:"18cm standard - MOST POPULAR"},
          {name:"Necklace", dim:"40cm - 45cm chain"}
        ],
        rare:"Full diamond pavé versions. Limited edition finishes. Vintage 1967 original chains.",
        rareJp:"フルダイヤモンドパヴェバージョン。限定版仕上げ。1967年オリジナルチェーンのヴィンテージ。",
        tip:"Feel the WEIGHT! This is solid rose gold. Italian craftsmanship. Heavy = luxury. Stack them!",
        tipJp:"重さを感じて！これは固体ローズゴールド。イタリア職人技。重い = ラグジュアリー。スタックして！"
      },
      { name:"Bahia", brief:"Tourmaline rings - rainbow collection", briefJp:"トルマリンリング - レインボーコレクション",
        desc:"Colorful tourmaline gemstone rings. Every color of the rainbow.",
        descJp:"カラフルなトルマリン宝石リング。虹のすべての色。",
        shape:"Oval cabochon tourmalines in various colors. Stackable rings.",
        shapeJp:"様々な色のオーバルカボション トルマリン。スタッカブルリング。",
        sizes:[
          {name:"Single Ring", dim:"8mm-10mm stone"},
          {name:"Stacked Set", dim:"Multiple rings worn together - POPULAR"}
        ],
        rare:"Rare tourmaline colors (Paraiba blue, watermelon). Vintage collections. Full rainbow sets.",
        rareJp:"希少トルマリン色（パライバブルー、スイカ）。ヴィンテージコレクション。フルレインボーセット。",
        tip:"Tourmaline comes in EVERY color. Pink, green, blue, multicolor. Mix and match. Build your rainbow!",
        tipJp:"トルマリンはすべての色で来る。ピンク、グリーン、ブルー、マルチカラー。ミックスアンドマッチ。レインボーを作る！"
      }
    ]
  },
  mikimoto: {
    name:"Mikimoto", year:1893, country:"Japan",
    categories:["jewelry"],
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mikimoto_logo.svg/512px-Mikimoto_logo.svg.png",
    auth:"'MIKIMOTO' stamp. Akoya pearls (signature). Serial number on clasp. Japanese cultured pearls.",
    authJp:"「MIKIMOTO」刻印。アコヤ真珠（シグネチャー）。クラスプにシリアル番号。日本養殖真珠。",
    rare:"Vintage Akoya pearl strands. Special clasp designs. High-grade AAA+ pearls.",
    rareJp:"ヴィンテージアコヤ真珠ストランド。スペシャルクラスプデザイン。高級AAA+真珠。",
    tip:"Kokichi Mikimoto invented cultured pearls in 1893. Mikimoto = THE pearl authority.",
    tipJp:"御木本幸吉が1893年に養殖真珠を発明。ミキモト = THE真珠権威。",
    colors:[
      {name:"White Akoya", hex:"#FFFAF0", nameJp:"ホワイトアコヤ", desc:"Classic white pearls with pink overtone. Signature Mikimoto.", descJp:"ピンクオーバートーンのクラシックホワイト真珠。シグネチャー ミキモト。"},
      {name:"Silver Blue Akoya", hex:"#C0D8E8", nameJp:"シルバーブルーアコヤ", desc:"Rare blue-silver luster. Very valuable.", descJp:"希少ブルーシルバー光沢。とても貴重。"},
      {name:"Golden South Sea", hex:"#FFD700", nameJp:"ゴールデン南洋", desc:"Large golden pearls. Luxurious.", descJp:"大きなゴールデン真珠。豪華。"},
      {name:"Black Tahitian", hex:"#2F4F4F", nameJp:"ブラックタヒチアン", desc:"Dark peacock pearls. Dramatic.", descJp:"ダークピーコック真珠。ドラマティック。"}
    ],
    models:[
      { name:"Akoya Pearl Strand", brief:"Classic pearl necklace - timeless elegance", briefJp:"クラシック真珠ネックレス - タイムレスエレガンス",
        desc:"THE Mikimoto piece. Strand of perfectly matched Akoya pearls.",
        descJp:"Mikimoto作品。完璧にマッチしたアコヤ真珠のストランド。",
        shape:"Graduated or uniform pearl strand. Classic white with pink overtone.",
        shapeJp:"グラデーションまたは均一真珠ストランド。ピンクオーバートーンのクラシックホワイト。",
        sizes:[
          {name:"Choker", dim:"14-16 inches - 6-7mm pearls"},
          {name:"Princess", dim:"17-19 inches - 7-8mm pearls - MOST POPULAR"},
          {name:"Matinee", dim:"20-24 inches - 8-9mm pearls"},
          {name:"Opera", dim:"28-34 inches - 9-10mm pearls"}
        ],
        rare:"AAA+ grade matching. Blue-silver overtone (rare). Vintage art deco clasps. Large 10mm+ pearls.",
        rareJp:"AAA+グレードマッチング。ブルーシルバーオーバートーン（希少）。ヴィンテージ アールデコクラスプ。大きな10mm+真珠。",
        tip:"Mikimoto INVENTED cultured pearls. Check the luster - should glow like moonlight. Count the size in mm!",
        tipJp:"ミキモトが養殖真珠を発明。光沢をチェック - 月光のように輝く必要。mmでサイズを数える！"
      },
      { name:"Akoya Pearl Studs", brief:"Classic earrings - everyday elegance", briefJp:"クラシックイヤリング - 日常エレガンス",
        desc:"Simple pearl stud earrings. The ultimate classic.",
        descJp:"シンプルな真珠スタッドイヤリング。究極のクラシック。",
        shape:"Round Akoya pearls on white or yellow gold posts.",
        shapeJp:"ホワイトまたはイエローゴールドポスト上の丸いアコヤ真珠。",
        sizes:[
          {name:"5mm", dim:"Delicate everyday"},
          {name:"7mm", dim:"Classic size - MOST POPULAR"},
          {name:"8mm", dim:"Statement studs"},
          {name:"9-10mm", dim:"Bold, luxurious"}
        ],
        rare:"Perfectly matched pairs AAA+. Blue-silver overtone. Vintage gold settings.",
        rareJp:"完璧にマッチしたペアAAA+。ブルーシルバーオーバートーン。ヴィンテージゴールドセッティング。",
        tip:"Pearl studs = instant class. Audrey Hepburn wore them. Jackie Kennedy wore them. Timeless.",
        tipJp:"真珠スタッド = 即座にクラス。オードリー・ヘップバーンが着用。ジャッキー・ケネディが着用。タイムレス。"
      },
      { name:"Black South Sea Pearls", brief:"Tahitian pearls - exotic luxury", briefJp:"タヒチアン真珠 - エキゾチックラグジュアリー",
        desc:"Dark peacock pearls from Tahiti. Rare and dramatic.",
        descJp:"タヒチからのダークピーコック真珠。希少でドラマティック。",
        shape:"Large round or baroque Tahitian pearls. Dark grey to black with color overtones.",
        shapeJp:"大きな丸またはバロック タヒチアン真珠。カラーオーバートーン付きダークグレーからブラック。",
        sizes:[
          {name:"Pendant", dim:"11-13mm - MOST POPULAR"},
          {name:"Studs", dim:"9-11mm matched pair"},
          {name:"Strand", dim:"18 inches - 10-12mm pearls"}
        ],
        rare:"Peacock green overtone. Perfect round (rare in Tahitians). Large 15mm+ pearls.",
        rareJp:"ピーコックグリーンオーバートーン。完全丸形（タヒチアンでは希少）。大きな15mm+真珠。",
        tip:"Black pearls are RARE. Tahitian = exotic. Look for peacock green or purple overtones. Very valuable!",
        tipJp:"ブラック真珠は希少。タヒチアン = エキゾチック。ピーコックグリーンまたは紫オーバートーンを探す。とても貴重！"
      }
    ]
  }
};

/* ═══ PROFESSIONAL VOCABULARY ===
const VOCAB_CATS = [
  { cat:"Condition Grading (Essential Terms)", items:[
    {e:"Mint",j:"ミント",def:"Perfect, flawless condition - appears never used or touched",defJp:"完璧、傷なし状態 - 未使用または未触に見える",category:"ecommerce",emoji:"💎"},
    {e:"Brand new / NWT",j:"新品・タグ付き",def:"Unworn item with original tags still attached",defJp:"未使用でオリジナルタグが付いた状態",category:"ecommerce",emoji:"🏷️"},
    {e:"Like new / NWOT",j:"ほぼ新品",def:"Minimal to no signs of wear, appears unused, tags may be removed",defJp:"使用感がほとんどなく、未使用に見える、タグ外れの可能性",category:"ecommerce",emoji:"✨"},
    {e:"Excellent / EUC",j:"極美品",def:"Very light use, no significant flaws visible",defJp:"使用感が非常に軽く、目立つダメージなし",category:"ecommerce",emoji:"⭐"},
    {e:"Very good / VGUC",j:"美品",def:"Light wear, minor imperfections may exist",defJp:"軽い使用感、軽微なダメージがある可能性",category:"ecommerce",emoji:"👍"},
    {e:"Good / GUC",j:"良品",def:"Moderate wear, still fully functional and attractive",defJp:"中程度の使用感、機能的で魅力的",category:"ecommerce",emoji:"👌"},
    {e:"Fair",j:"使用感あり",def:"Obvious wear and use, but no major damage",defJp:"明らかな使用感があるが、大きなダメージなし",category:"ecommerce",emoji:"📋"},
    {e:"Poor / For parts",j:"ジャンク品",def:"Heavy damage, may not be functional, sold as-is",defJp:"重度のダメージ、機能しない可能性、現状渡し",category:"ecommerce",emoji:"🔧"},
    {e:"Preloved",j:"愛用品",def:"Gently used, previously owned with care",defJp:"大切に使用された中古品",category:"ecommerce",emoji:"💝"},
    {e:"Vintage",j:"ヴィンテージ",def:"20+ years old, classic/collectible due to age",defJp:"20年以上前、年代物のクラシック/コレクティブル",category:"ecommerce",emoji:"🕰️"}
  ]},
  { cat:"Handbag Structure & Wear", items:[
    {e:"Corner wear",j:"角スレ",def:"Damage to bag corners from setting down or use",defJp:"置いたり使用したりすることによる角の損傷",category:"ecommerce",emoji:"👜"},
    {e:"Piping",j:"パイピング",def:"Leather trim along bag edges",defJp:"バッグの縁に沿ったレザートリム",category:"ecommerce",emoji:"✂️"},
    {e:"Patina",j:"経年変化",def:"Natural darkening of leather over time, adds character",defJp:"時間経過による革の自然な色の変化、味が出る",category:"ecommerce",emoji:"🎨"},
    {e:"Hardware tarnish",j:"金具の変色",def:"Metal parts showing oxidation or discoloration",defJp:"金属部分の酸化や変色",category:"ecommerce",emoji:"🔩"},
    {e:"Interior staining",j:"内側の汚れ",def:"Marks or discoloration inside the bag",defJp:"バッグ内側の跡や変色",category:"ecommerce",emoji:"🧽"},
    {e:"Scratches / Scuffs",j:"傷・スレ",def:"Surface marks from normal use or contact",defJp:"通常使用や接触による表面の跡",category:"ecommerce",emoji:"📏"},
    {e:"Stitching",j:"ステッチ",def:"Thread work holding bag together",defJp:"バッグを保持する糸の仕事",category:"ecommerce",emoji:"🧵"},
    {e:"Lining",j:"内装",def:"Interior fabric or leather",defJp:"内側の生地またはレザー",category:"ecommerce",emoji:"👜"}
  ]},
  { cat:"Auction Language", items:[
    {e:"Starting at $1!",j:"1ドルスタート！",def:"Opening bid is one dollar to create excitement",defJp:"盛り上げるため1ドルから入札開始",category:"live",emoji:"🔨"},
    {e:"5 seconds left!",j:"残り5秒！",def:"Urgency call when auction is about to close",defJp:"オークション終了間近の緊急コール",category:"live",emoji:"⏱️"},
    {e:"Going once, going twice, SOLD!",j:"1回、2回、落札！",def:"Traditional auction closing phrase",defJp:"伝統的なオークション終了フレーズ",category:"live",emoji:"🔨"},
    {e:"Bidding war!",j:"競り合い！",def:"Multiple buyers competing, driving price up",defJp:"複数バイヤーが競い合い価格上昇中",category:"live",emoji:"⚔️"},
    {e:"Put in your max bid!",j:"最高額を入れて！",def:"Encourage buyers to enter their highest amount",defJp:"バイヤーに最高額の入力を促す",category:"live",emoji:"💰"},
    {e:"This won't last!",j:"すぐ終わります！",def:"Create urgency by implying item will sell quickly",defJp:"すぐ売れることを示唆し緊迫感を作る",category:"live",emoji:"⚡"},
    {e:"No reserve!",j:"最低落札価格なし！",def:"Item will sell regardless of final bid amount",defJp:"最終入札額に関わらず販売",category:"live",emoji:"🎯"},
    {e:"Steal of a lifetime!",j:"一生に一度のお買い得！",def:"Emphasize exceptional value",defJp:"格別な価値を強調",category:"live",emoji:"💎"}
  ]},
  { cat:"Luxury Fashion Terms", items:[
    {e:"Investment piece",j:"投資アイテム",def:"High-quality item that retains or increases in value",defJp:"価値を保持または上昇する高品質アイテム",category:"ecommerce",emoji:"💎"},
    {e:"Limited edition",j:"限定版",def:"Produced in small quantities, not widely available",defJp:"少量生産で広く入手不可",category:"ecommerce",emoji:"✨"},
    {e:"Runway piece",j:"ランウェイピース",def:"Item featured in designer's fashion show",defJp:"デザイナーのファッションショーで紹介されたアイテム",category:"ecommerce",emoji:"👗"},
    {e:"Archive collection",j:"アーカイブコレクション",def:"Historical pieces from past seasons, highly collectible",defJp:"過去シーズンの歴史的ピース、高コレクタブル",category:"ecommerce",emoji:"📚"},
    {e:"Grail",j:"聖杯",def:"Extremely rare, highly sought-after item",defJp:"極めて希少で非常に求められているアイテム",category:"ecommerce",emoji:"🏆"},
    {e:"Deadstock",j:"デッドストック",def:"Never-sold vintage inventory, still new condition",defJp:"未販売のヴィンテージ在庫、新品状態",category:"ecommerce",emoji:"📦"},
    {e:"Made to order",j:"受注生産",def:"Custom-made upon request, not mass-produced",defJp:"リクエストに応じてカスタムメイド、大量生産なし",category:"ecommerce",emoji:"✂️"},
    {e:"Signature piece",j:"シグネチャーピース",def:"Iconic design that defines the brand",defJp:"ブランドを定義する象徴的デザイン",category:"ecommerce",emoji:"⭐"}
  ]},
  { cat:"Styling & Presentation Language", items:[
    {e:"Craftsmanship",j:"職人技",def:"Skill and quality in making luxury goods",defJp:"高級品製造における技術と品質",category:"ecommerce",emoji:"🔨"},
    {e:"Heritage",j:"伝統",def:"Brand's history and legacy",defJp:"ブランドの歴史と遺産",category:"ecommerce",emoji:"🏛️"},
    {e:"Provenance",j:"来歴",def:"Item's ownership history and authenticity documentation",defJp:"アイテムの所有履歴と真贋証明",category:"ecommerce",emoji:"📜"},
    {e:"Exquisite details",j:"精巧なディテール",def:"Fine, carefully crafted elements",defJp:"繊細で丁寧に作られた要素",category:"ecommerce",emoji:"✨"},
    {e:"Timeless design",j:"タイムレスデザイン",def:"Classic style that never goes out of fashion",defJp:"流行に左右されないクラシックスタイル",category:"ecommerce",emoji:"⏳"},
    {e:"Coveted",j:"垂涎の",def:"Highly desired and sought after",defJp:"非常に望まれ求められている",category:"ecommerce",emoji:"😍"},
    {e:"Impeccable condition",j:"完璧な状態",def:"Flawless, perfect state",defJp:"欠陥のない完璧な状態",category:"ecommerce",emoji:"💯"},
    {e:"Curated selection",j:"厳選セレクション",def:"Carefully chosen collection",defJp:"慎重に選ばれたコレクション",category:"ecommerce",emoji:"🎯"}
  ]},
  { cat:"Buyer Communication", items:[
    {e:"Is it authentic?",j:"本物ですか？",def:"Question about item's genuineness",defJp:"アイテムの真正性についての質問",category:"ecommerce",emoji:"❓"},
    {e:"100% authentic, guaranteed",j:"100%本物、保証付き",def:"Assurance of authenticity with backing",defJp:"裏付けのある真贋保証",category:"ecommerce",emoji:"✅"},
    {e:"Any flaws?",j:"ダメージは？",def:"Inquiry about condition issues",defJp:"状態問題についての問い合わせ",category:"ecommerce",emoji:"🔍"},
    {e:"What's included?",j:"付属品は？",def:"Question about accessories and extras",defJp:"アクセサリーと追加品についての質問",category:"ecommerce",emoji:"📦"},
    {e:"Can you show closer?",j:"もっと近くで見せて",def:"Request for detailed view",defJp:"詳細表示のリクエスト",category:"live",emoji:"🔎"},
    {e:"Comes with box, dust bag, card",j:"箱・保存袋・カード付き",def:"Complete set of original accessories",defJp:"オリジナル付属品の完全セット",category:"ecommerce",emoji:"🎁"},
    {e:"Final sale, no returns",j:"最終販売、返品不可",def:"Transaction is binding, cannot be reversed",defJp:"取引は拘束力あり、取り消し不可",category:"ecommerce",emoji:"🚫"},
    {e:"Ships next business day",j:"翌営業日発送",def:"Item will be sent the following workday",defJp:"翌営業日にアイテム発送",category:"ecommerce",emoji:"📮"}
  ]},
  { cat:"Selling Color & Style on Live Stream", items:[
    {e:"This shade flatters every skin tone",j:"この色はどんな肌色にも似合います",def:"Universal appeal - works for all buyers",defJp:"万人向け - すべてのバイヤーに合う",category:"live",emoji:"🎨"},
    {e:"Such a rich, luxurious color",j:"豊かで贅沢な色",def:"Emphasize quality of color",defJp:"色の品質を強調",category:"live",emoji:"✨"},
    {e:"This color never goes out of style",j:"この色は流行に左右されない",def:"Highlight timeless appeal",defJp:"時代を超えた魅力を強調",category:"live",emoji:"⏳"},
    {e:"Perfectly versatile - pairs with anything",j:"完璧に万能 - 何にでも合う",def:"Easy styling for buyers to imagine",defJp:"バイヤーが想像しやすいスタイリング",category:"live",emoji:"👗"},
    {e:"Rare, hard-to-find color",j:"レアで入手困難な色",def:"Create urgency with scarcity",defJp:"希少性で緊急性を作る",category:"live",emoji:"💎"},
    {e:"This shade photographs beautifully",j:"この色は写真映えする",def:"Appeal to visual/Instagram-conscious buyers",defJp:"視覚的/Instagram意識の高いバイヤーにアピール",category:"live",emoji:"📸"},
    {e:"You can dress it up or down",j:"フォーマルにもカジュアルにも",def:"Versatility for multiple occasions",defJp:"複数の場面での汎用性",category:"live",emoji:"👔"},
    {e:"A collector's favorite shade",j:"コレクターに人気の色",def:"Position as desirable, sought-after",defJp:"望ましい、人気のあるものとして位置付ける",category:"live",emoji:"🏆"},
    {e:"Perfect for any season",j:"オールシーズン使える",def:"Year-round wearability",defJp:"一年中使える",category:"live",emoji:"🌸"},
    {e:"This will elevate any outfit",j:"どんなコーデも格上げ",def:"Positioning as outfit enhancer",defJp:"コーディネートを向上させるアイテムとして",category:"live",emoji:"⬆️"},
    {e:"The leather feels incredible",j:"レザーの質感が素晴らしい",def:"Describe tactile quality viewers can't feel",defJp:"視聴者が触れない触感の品質を説明",category:"live",emoji:"🤲"},
    {e:"Look at how it catches the light!",j:"光の当たり方を見て！",def:"Visual selling - show on camera",defJp:"視覚的販売 - カメラで見せる",category:"live",emoji:"💡"},
    {e:"Imagine this with your favorite jeans",j:"お気に入りのジーンズと合わせたら",def:"Help buyers visualize styling",defJp:"バイヤーがスタイリングを想像するのを助ける",category:"live",emoji:"👖"},
    {e:"This adds instant luxury to your closet",j:"クローゼットに即ラグジュアリーを追加",def:"Aspirational positioning",defJp:"憧れのポジショニング",category:"live",emoji:"💼"},
    {e:"Every fashionista needs this shade",j:"すべてのおしゃれさんに必要な色",def:"Create desire through social proof",defJp:"社会的証明で欲求を作る",category:"live",emoji:"👑"}
  ]},
  { cat:"Live Commerce Abbreviations", catJp:"ライブコマース略語", icon:"📝", items:[
    {e:"NWT",j:"NWT",def:"New With Tags - Brand new, unworn, original tags still attached",defJp:"新品タグ付き - 未使用、オリジナルタグが付いた状態",category:"ecommerce",emoji:"🏷️"},
    {e:"NWOT",j:"NWOT",def:"New Without Tags - Brand new but tags removed or missing",defJp:"新品タグなし - 未使用だがタグが外されているか欠品",category:"ecommerce",emoji:"📦"},
    {e:"BNIB",j:"BNIB",def:"Brand New In Box - Unopened or mint condition with original box",defJp:"箱入り新品 - 未開封またはオリジナル箱付きミント状態",category:"ecommerce",emoji:"📦"},
    {e:"EUC",j:"EUC",def:"Excellent Used Condition - Minimal wear, looks almost new",defJp:"極美品中古 - 最小限の使用感、ほぼ新品に見える",category:"ecommerce",emoji:"⭐"},
    {e:"VGUC",j:"VGUC",def:"Very Good Used Condition - Light wear, still great shape",defJp:"美品中古 - 軽い使用感、まだ素晴らしい状態",category:"ecommerce",emoji:"✨"},
    {e:"GUC",j:"GUC",def:"Good Used Condition - Normal wear, fully functional",defJp:"良品中古 - 通常の使用感、完全に機能",category:"ecommerce",emoji:"👍"},
    {e:"INAD",j:"INAD",def:"Item Not As Described - eBay case when item doesn't match listing",defJp:"説明と異なる - リスティングと一致しない場合のeBayケース",category:"ebay",emoji:"⚠️"},
    {e:"NIB",j:"NIB",def:"New In Box - Unused item with original packaging",defJp:"箱入り新品 - オリジナル梱包付き未使用品",category:"ecommerce",emoji:"📦"},
    {e:"NOS",j:"NOS",def:"New Old Stock - Vintage item that was never sold, still new",defJp:"新古品 - 未販売のヴィンテージ品、まだ新品",category:"ecommerce",emoji:"🕰️"},
    {e:"ISO",j:"ISO",def:"In Search Of - Buyer looking for specific item",defJp:"探しています - 特定アイテムを探しているバイヤー",category:"ecommerce",emoji:"🔍"},
    {e:"OBO",j:"OBO",def:"Or Best Offer - Open to negotiate price",defJp:"価格交渉可 - 価格交渉に応じる",category:"ebay",emoji:"💰"},
    {e:"BIN",j:"BIN",def:"Buy It Now - Fixed price, purchase immediately",defJp:"即決価格 - 固定価格、即購入",category:"ebay",emoji:"🛒"},
    {e:"FS/FT",j:"FS/FT",def:"For Sale / For Trade - Available to sell or trade",defJp:"販売/交換可 - 販売または交換可能",category:"ecommerce",emoji:"🔄"},
    {e:"HTF",j:"HTF",def:"Hard To Find - Rare, difficult to locate item",defJp:"入手困難 - 希少で見つけにくいアイテム",category:"ecommerce",emoji:"💎"},
    {e:"VHTF",j:"VHTF",def:"Very Hard To Find - Extremely rare item",defJp:"非常に入手困難 - 極めて希少なアイテム",category:"ecommerce",emoji:"💎"},
    {e:"RARE",j:"RARE",def:"Scarce item, not commonly available",defJp:"希少 - 一般的に入手不可",category:"ecommerce",emoji:"⭐"},
    {e:"DS",j:"DS",def:"Deadstock - Never worn/used, original packaging, no flaws",defJp:"デッドストック - 未使用、オリジナル梱包、傷なし",category:"ecommerce",emoji:"📦"},
    {e:"POSH",j:"POSH",def:"Selling on Poshmark platform (cross-platform reference)",defJp:"Poshmark販売 - Poshmarkプラットフォームでの販売",category:"ecommerce",emoji:"🏪"},
    {e:"PM",j:"PM",def:"Private Message / Direct Message for inquiries",defJp:"プライベートメッセージ - 問い合わせ用のDM",category:"ecommerce",emoji:"💬"}
  ]},
  { cat:"Authentication & Verification Terms", items:[
    {e:"Date code",j:"デートコード",def:"Manufacturer's code indicating production date/location",defJp:"製造日/場所を示すメーカーコード",category:"ecommerce",emoji:"📅"},
    {e:"Serial number",j:"シリアルナンバー",def:"Unique number assigned to each item for tracking",defJp:"追跡用に各アイテムに割り当てられた固有番号",category:"ecommerce",emoji:"🔢"},
    {e:"Authenticity card",j:"真贋カード",def:"Certificate from brand confirming item is genuine",defJp:"アイテムが本物であることを確認するブランドの証明書",category:"ecommerce",emoji:"💳"},
    {e:"Heat stamp / Blind stamp",j:"刻印",def:"Brand logo or date pressed into leather without ink",defJp:"インクなしでレザーに押された ブランドロゴまたは日付",category:"ecommerce",emoji:"🔖"},
    {e:"Hologram",j:"ホログラム",def:"3D security sticker used by some brands (Prada, Gucci)",defJp:"一部ブランド（プラダ、グッチ）が使用する3Dセキュリティステッカー",category:"ecommerce",emoji:"✨"},
    {e:"Controllato card",j:"コントロラートカード",def:"Gucci's quality control card with serial number",defJp:"シリアル番号付きグッチの品質管理カード",category:"ecommerce",emoji:"📇"},
    {e:"Made in France / Italy / Spain",j:"フランス/イタリア/スペイン製",def:"Country of manufacture - important for authentication",defJp:"製造国 - 真贋確認に重要",category:"ecommerce",emoji:"🌍"},
    {e:"Microchip",j:"マイクロチップ",def:"Embedded electronic tag (used by Louis Vuitton since 2021)",defJp:"埋め込まれた電子タグ（ルイ・ヴィトンが2021年から使用）",category:"ecommerce",emoji:"💾"},
    {e:"Clochette",j:"クロシェット",def:"Leather key holder for Hermès lock and keys",defJp:"エルメスの鍵とロック用レザーキーホルダー",category:"ecommerce",emoji:"🔑"},
    {e:"Dust bag / Pouch",j:"保存袋",def:"Protective fabric bag item comes in",defJp:"アイテムが入っている保護布バッグ",category:"ecommerce",emoji:"👝"},
    {e:"Original receipt",j:"オリジナルレシート",def:"Purchase proof from authorized retailer",defJp:"正規小売店からの購入証明",category:"ecommerce",emoji:"🧾"},
    {e:"Certificate of Authenticity (COA)",j:"真贋証明書",def:"Third-party authentication documentation",defJp:"第三者認証文書",category:"ecommerce",emoji:"📜"},
    {e:"Entrupy",j:"Entrupy",def:"AI-powered authentication service for luxury goods",defJp:"高級品のAI認証サービス",category:"ecommerce",emoji:"🤖"},
    {e:"Authenticate First / Real Authentication",j:"Authenticate First",def:"Professional authentication services",defJp:"プロフェッショナル認証サービス",category:"ecommerce",emoji:"✅"}
  ]},
  { cat:"Luxury Leather Types", items:[
    {e:"Caviar leather",j:"キャビアレザー",def:"Chanel's textured, pebbled leather - durable, scratch-resistant",defJp:"シャネルの質感のあるペブルレザー - 耐久性、耐傷性",category:"ecommerce",emoji:"🖤"},
    {e:"Lambskin",j:"ラムスキン",def:"Soft, buttery leather - luxurious but delicate",defJp:"柔らかいバターのようなレザー - 豪華だが繊細",category:"ecommerce",emoji:"🐑"},
    {e:"Calfskin",j:"カーフスキン",def:"Smooth leather from young cow - refined finish",defJp:"若い牛からの滑らかなレザー - 洗練された仕上げ",category:"ecommerce",emoji:"🐄"},
    {e:"Vachetta leather",j:"ヌメ革",def:"Untreated leather that darkens (patina) over time - Louis Vuitton",defJp:"未処理のレザーで時間とともに暗くなる（経年変化） - ルイ・ヴィトン",category:"ecommerce",emoji:"🍂"},
    {e:"Epi leather",j:"エピレザー",def:"Louis Vuitton's textured leather with linear grain pattern",defJp:"線状の粒模様を持つルイ・ヴィトンの質感レザー",category:"ecommerce",emoji:"📏"},
    {e:"Clemence",j:"クレマンス",def:"Hermès soft, slouchy leather with visible grain",defJp:"エルメスの柔らかくたるみのある粒の見えるレザー",category:"ecommerce",emoji:"✨"},
    {e:"Togo",j:"トゴ",def:"Hermès grainy leather, more structured than Clemence",defJp:"エルメスの粒状レザー、クレマンスよりも構造的",category:"ecommerce",emoji:"💪"},
    {e:"Epsom",j:"エプソン",def:"Hermès embossed leather - stiff, holds shape well",defJp:"エルメスの型押しレザー - 硬く、形状をよく保持",category:"ecommerce",emoji:"📐"},
    {e:"Swift",j:"スウィフト",def:"Hermès smooth, soft leather with slight sheen",defJp:"エルメスの滑らかで柔らかい微光沢のあるレザー",category:"ecommerce",emoji:"💫"},
    {e:"Box calf",j:"ボックスカーフ",def:"Hermès shiny, formal leather - shows scratches easily",defJp:"エルメスの光沢のあるフォーマルレザー - 傷が付きやすい",category:"ecommerce",emoji:"✨"},
    {e:"Saffiano",j:"サフィアーノ",def:"Prada's crosshatch-textured calfskin - scratch-resistant",defJp:"プラダのクロスハッチ質感のカーフスキン - 耐傷性",category:"ecommerce",emoji:"#️⃣"},
    {e:"Guccissima",j:"グッチシマ",def:"Gucci's embossed GG pattern leather",defJp:"グッチの型押しGGパターンレザー",category:"ecommerce",emoji:"🔷"},
    {e:"Nappa leather",j:"ナッパレザー",def:"Soft, supple full-grain leather",defJp:"柔らかくしなやかなフルグレインレザー",category:"ecommerce",emoji:"🧈"},
    {e:"Patent leather",j:"エナメルレザー",def:"Glossy, high-shine coated leather",defJp:"光沢のある高輝度コーティングレザー",category:"ecommerce",emoji:"✨"},
    {e:"Suede",j:"スエード",def:"Soft, napped leather finish - delicate, stains easily",defJp:"柔らかい起毛レザー仕上げ - 繊細、汚れやすい",category:"ecommerce",emoji:"🧥"},
    {e:"Exotic skins",j:"エキゾチックスキン",def:"Alligator, crocodile, python, ostrich - rare, expensive",defJp:"アリゲーター、クロコダイル、パイソン、オーストリッチ - 希少、高価",category:"ecommerce",emoji:"🐊"}
  ]},
  { cat:"Bag Anatomy & Parts", items:[
    {e:"Flap",j:"フラップ",def:"Fold-over cover on front of bag",defJp:"バッグ前面の折り返しカバー",category:"ecommerce",emoji:"📋"},
    {e:"Turnlock / Twist lock",j:"ターンロック",def:"Rotating clasp closure (iconic on Chanel Classic Flap)",defJp:"回転式留め金（シャネル クラシックフラップの象徴）",category:"ecommerce",emoji:"🔐"},
    {e:"Magnetic snap",j:"マグネットスナップ",def:"Magnetic closure mechanism",defJp:"マグネット式留め具",category:"ecommerce",emoji:"🧲"},
    {e:"Zipper pull / Zip tab",j:"ジッパープル",def:"Tag attached to zipper for easy opening",defJp:"簡単に開けるためのジッパーに付いたタグ",category:"ecommerce",emoji:"🏷️"},
    {e:"Hardware",j:"金具",def:"Metal components - zippers, locks, chains, studs",defJp:"金属部品 - ジッパー、ロック、チェーン、スタッド",category:"ecommerce",emoji:"🔩"},
    {e:"Gold-tone / Silver-tone hardware",j:"ゴールド/シルバー金具",def:"Brass metal plated to look like gold or silver",defJp:"金または銀に見えるようにメッキされた真鍮金属",category:"ecommerce",emoji:"✨"},
    {e:"Chain strap",j:"チェーンストラップ",def:"Metal chain shoulder strap (Chanel signature)",defJp:"金属チェーンショルダーストラップ（シャネルのシグネチャー）",category:"ecommerce",emoji:"⛓️"},
    {e:"Adjustable strap",j:"調節可能ストラップ",def:"Strap with holes or slider to change length",defJp:"長さを変えるための穴またはスライダー付きストラップ",category:"ecommerce",emoji:"📏"},
    {e:"Detachable strap",j:"取り外し可能ストラップ",def:"Strap that can be removed for different styling",defJp:"異なるスタイリングのために取り外し可能なストラップ",category:"ecommerce",emoji:"🔀"},
    {e:"Sangles",j:"サングル",def:"Hermès Birkin/Kelly shoulder strap (often unused)",defJp:"エルメス バーキン/ケリーのショルダーストラップ（未使用が多い）",category:"ecommerce",emoji:"🎀"},
    {e:"Base / Bottom",j:"底/ベース",def:"Bottom of bag - check for dirt, wear, sagging",defJp:"バッグの底 - 汚れ、摩耗、たるみを確認",category:"ecommerce",emoji:"⬇️"},
    {e:"Feet / Studs",j:"スタッズ/足",def:"Metal protectors on bottom corners to prevent wear",defJp:"摩耗を防ぐための底角の金属保護具",category:"ecommerce",emoji:"⚙️"},
    {e:"Gusset",j:"マチ",def:"Side panels that give bag depth/width",defJp:"バッグに深さ/幅を与える側面パネル",category:"ecommerce",emoji:"📦"},
    {e:"Top handle",j:"トップハンドル",def:"Handle on top of bag for hand-carrying",defJp:"手持ち用のバッグ上部のハンドル",category:"ecommerce",emoji:"🎒"},
    {e:"Shoulder strap",j:"ショルダーストラップ",def:"Long strap for wearing bag on shoulder",defJp:"バッグを肩に掛けるための長いストラップ",category:"ecommerce",emoji:"👜"},
    {e:"Interior pockets",j:"内ポケット",def:"Storage compartments inside bag",defJp:"バッグ内の収納コンパートメント",category:"ecommerce",emoji:"📁"},
    {e:"Zip pocket",j:"ジップポケット",def:"Zippered compartment for secure storage",defJp:"安全収納用のジッパー付きコンパートメント",category:"ecommerce",emoji:"🤐"},
    {e:"Slip pocket",j:"スリップポケット",def:"Open pocket without closure",defJp:"留め具のないオープンポケット",category:"ecommerce",emoji:"📄"}
  ]},
  { cat:"Live Streaming Energy Phrases", items:[
    {e:"Who's ready for this?!",j:"準備はいいですか？！",def:"Hype opener to engage audience",defJp:"視聴者を引き込む盛り上げオープナー",category:"live",emoji:"🎬"},
    {e:"This is FLYING off the shelves!",j:"飛ぶように売れてます！",def:"Create urgency about item popularity",defJp:"アイテムの人気で緊急性を作る",category:"live",emoji:"🚀"},
    {e:"You don't want to miss this!",j:"これは見逃せない！",def:"Hook viewers to keep watching",defJp:"視聴者を引き留めるフック",category:"live",emoji:"⚠️"},
    {e:"Drop a heart if you want this!",j:"欲しい人はハートを！",def:"Call to action for engagement",defJp:"エンゲージメントのためのコールトゥアクション",category:"live",emoji:"❤️"},
    {e:"Comment 'MINE' to claim!",j:"「欲しい」とコメント！",def:"Interactive claim mechanic",defJp:"インタラクティブなクレームメカニック",category:"live",emoji:"💬"},
    {e:"Let me show you the details!",j:"詳細を見せます！",def:"Transition to close-up examination",defJp:"クローズアップ検査への移行",category:"live",emoji:"🔍"},
    {e:"Look at this GLOW!",j:"この輝きを見て！",def:"Draw attention to visual appeal",defJp:"視覚的魅力に注目を集める",category:"live",emoji:"✨"},
    {e:"Luxury you can FEEL!",j:"感じる高級感！",def:"Emphasize tactile quality",defJp:"触覚的品質を強調",category:"live",emoji:"🤲"},
    {e:"Investment piece, not just a purchase!",j:"購入ではなく投資！",def:"Position as valuable long-term buy",defJp:"長期的価値のある購入として位置付け",category:"live",emoji:"💰"},
    {e:"Grab it before someone else does!",j:"他の人が取る前に！",def:"FOMO (fear of missing out) urgency",defJp:"FOMO（見逃すことへの恐怖）緊急性",category:"live",emoji:"⏰"},
    {e:"This is a STEAL at this price!",j:"この価格は破格！",def:"Highlight value/deal",defJp:"価値/取引を強調",category:"live",emoji:"💸"},
    {e:"Sold out everywhere else!",j:"他では完売！",def:"Create scarcity perception",defJp:"希少性の認識を作る",category:"live",emoji:"🚫"},
    {e:"Only ONE available!",j:"1点のみ！",def:"Extreme urgency - single item",defJp:"極端な緊急性 - 1点のみ",category:"live",emoji:"1️⃣"},
    {e:"Fresh from the boutique!",j:"ブティックから直送！",def:"Emphasize newness and authenticity",defJp:"新しさと本物であることを強調",category:"live",emoji:"🎁"},
    {e:"Let's start the bidding at $1!",j:"1ドルから始めましょう！",def:"Low starting price hook",defJp:"低開始価格フック",category:"live",emoji:"🔨"},
    {e:"Who's going to win this beauty?",j:"誰がこの美品を手に入れる？",def:"Competitive framing",defJp:"競争的なフレーミング",category:"live",emoji:"🏆"},
    {e:"Auction ending in 30 seconds!",j:"30秒で終了！",def:"Final urgency push",defJp:"最終緊急プッシュ",category:"live",emoji:"⏱️"}
  ]},
  { cat:"Damage & Flaw Descriptions (Honest Selling)", items:[
    {e:"Corner wear",j:"角スレ",def:"Rubbing/damage on bag corners from use",defJp:"使用による角の擦れ/ダメージ",category:"ecommerce",emoji:"📐"},
    {e:"Edge wear",j:"縁スレ",def:"Worn edges along trim or piping",defJp:"トリムやパイピングに沿った摩耗した縁",category:"ecommerce",emoji:"✂️"},
    {e:"Scuffs / Scratches",j:"擦り傷",def:"Surface marks from contact or friction",defJp:"接触または摩擦による表面の跡",category:"ecommerce",emoji:"⚠️"},
    {e:"Creasing",j:"しわ",def:"Folds or wrinkles in leather from use",defJp:"使用によるレザーの折り目やしわ",category:"ecommerce",emoji:"〰️"},
    {e:"Sagging",j:"たるみ",def:"Loss of shape/structure from heavy use",defJp:"重い使用による形状/構造の喪失",category:"ecommerce",emoji:"📉"},
    {e:"Color transfer",j:"色移り",def:"Dye from clothing transferred onto bag (especially light bags)",defJp:"衣類からバッグへの染料移り（特に明るいバッグ）",category:"ecommerce",emoji:"🎨"},
    {e:"Tarnish / Oxidation",j:"変色/酸化",def:"Metal hardware darkening or discoloration",defJp:"金属金具の暗色化または変色",category:"ecommerce",emoji:"🌫️"},
    {e:"Sticky residue",j:"べたつき",def:"Adhesive or coating breakdown (common in vintage)",defJp:"接着剤またはコーティングの劣化（ヴィンテージによくある）",category:"ecommerce",emoji:"💧"},
    {e:"Cracking",j:"ひび割れ",def:"Splits in leather from dryness or age",defJp:"乾燥または経年によるレザーの亀裂",category:"ecommerce",emoji:"⚡"},
    {e:"Peeling",j:"剥がれ",def:"Surface coating coming off (patent leather, canvas)",defJp:"表面コーティングが剥がれる（エナメルレザー、キャンバス）",category:"ecommerce",emoji:"🍂"},
    {e:"Staining",j:"シミ",def:"Discoloration from spills, water, oil",defJp:"こぼれ、水、油による変色",category:"ecommerce",emoji:"💦"},
    {e:"Pen marks",j:"ペン跡",def:"Ink marks inside bag (very common)",defJp:"バッグ内部のインク跡（非常に一般的）",category:"ecommerce",emoji:"🖊️"},
    {e:"Odor / Musty smell",j:"臭い/カビ臭",def:"Unpleasant smell from storage or use",defJp:"保管または使用による不快な臭い",category:"ecommerce",emoji:"👃"},
    {e:"Missing hardware",j:"金具欠品",def:"Lock, key, or chain missing",defJp:"ロック、鍵、またはチェーンの欠品",category:"ecommerce",emoji:"❌"},
    {e:"Loose stitching",j:"縫い目のほつれ",def:"Thread coming undone at seams",defJp:"縫い目での糸のほつれ",category:"ecommerce",emoji:"🧵"},
    {e:"Zipper issues",j:"ジッパー不具合",def:"Stuck, broken, or missing teeth",defJp:"詰まり、破損、または歯の欠け",category:"ecommerce",emoji:"🔒"}
  ]},
  { cat:"Pricing & Negotiation Terms", items:[
    {e:"Retail price",j:"定価",def:"Original price at brand boutique",defJp:"ブランドブティックでのオリジナル価格",category:"ecommerce",emoji:"🏷️"},
    {e:"Resale value",j:"再販価格",def:"Current secondary market price",defJp:"現在の二次市場価格",category:"ecommerce",emoji:"💵"},
    {e:"Below retail",j:"定価以下",def:"Selling for less than original price",defJp:"オリジナル価格より安く販売",category:"ecommerce",emoji:"📉"},
    {e:"Above retail / Premium",j:"定価以上/プレミアム",def:"Rare items selling for more than retail (limited editions, sold-out)",defJp:"小売以上で売れる希少品（限定版、完売品）",category:"ecommerce",emoji:"📈"},
    {e:"Firm price",j:"価格固定",def:"Not open to negotiation",defJp:"交渉不可",category:"ebay",emoji:"🚫"},
    {e:"Best offer",j:"最良オファー",def:"Open to reasonable price negotiations",defJp:"妥当な価格交渉に応じる",category:"ebay",emoji:"🤝"},
    {e:"Starting bid",j:"開始価格",def:"Minimum price to begin auction",defJp:"オークション開始の最低価格",category:"ebay",emoji:"🔨"},
    {e:"Reserve price",j:"最低落札価格",def:"Hidden minimum price seller will accept",defJp:"売主が受け入れる隠れた最低価格",category:"ebay",emoji:"🔐"},
    {e:"Buy It Now (BIN)",j:"即決価格",def:"Fixed price to purchase immediately without bidding",defJp:"入札せずに即購入する固定価格",category:"ebay",emoji:"⚡"},
    {e:"Final price / All-in price",j:"最終価格",def:"Price including shipping and fees",defJp:"送料と手数料を含む価格",category:"ecommerce",emoji:"💰"},
    {e:"Bundle deal",j:"バンドル価格",def:"Discount for buying multiple items together",defJp:"複数アイテムをまとめて購入する割引",category:"ecommerce",emoji:"📦"},
    {e:"Flash sale",j:"フラッシュセール",def:"Limited-time discount offer",defJp:"期間限定の割引オファー",category:"live",emoji:"⚡"}
  ]},
  { cat:"Bag Shapes & Patterns", items:[
    {e:"Monogram canvas",j:"モノグラムキャンバス",def:"LV's iconic brown canvas with LV logo pattern - 'The classic. You know it, you love it.'",defJp:"LVの象徴的な茶色のキャンバスとLVロゴパターン - クラシック",category:"ecommerce",emoji:"👜"},
    {e:"Damier Ebene",j:"ダミエ エベヌ",def:"LV's brown checkered pattern - 'Great if you want LV without the big logos.'",defJp:"LVの茶色のチェッカー柄 - 大きなロゴなしでLVが欲しい人向け",category:"ecommerce",emoji:"🟫"},
    {e:"Damier Azur",j:"ダミエ アズール",def:"LV's light cream/blue checkered pattern - 'Light and fresh. Perfect for summer.'",defJp:"LVの明るいクリーム/ブルーのチェッカー柄 - 夏に完璧",category:"ecommerce",emoji:"🔵"},
    {e:"GG Supreme canvas",j:"GGスプリームキャンバス",def:"Gucci's beige/brown canvas with double G pattern",defJp:"グッチのベージュ/茶色のキャンバスとダブルGパターン",category:"ecommerce",emoji:"🅶"},
    {e:"Oblique canvas",j:"オブリークキャンバス",def:"Diagonal pattern (Dior, Goyard) - slanted logo design",defJp:"斜めパターン（ディオール、ゴヤール） - 斜めロゴデザイン",category:"ecommerce",emoji:"📐"},
    {e:"Epi leather",j:"エピレザー",def:"LV's textured leather with linear grain pattern - modern, subtle",defJp:"LVの線状粒模様の質感レザー - モダンで控えめ",category:"ecommerce",emoji:"📏"},
    {e:"Quilted / Matelassé",j:"キルティング",def:"Padded diamond or chevron stitching (Chanel signature)",defJp:"パッド入りダイヤモンドまたはシェブロンステッチ（シャネルのシグネチャー）",category:"ecommerce",emoji:"💎"},
    {e:"Chevron pattern",j:"シェブロン柄",def:"V-shaped zigzag quilting (Chanel Boy Bag)",defJp:"V字型ジグザグキルティング（シャネル ボーイバッグ）",category:"ecommerce",emoji:"⚡"},
    {e:"Tote shape",j:"トートバッグ型",def:"Open-top bag with parallel handles (LV Neverfull, Goyard St. Louis)",defJp:"平行ハンドルのオープントップバッグ（LV ネヴァーフル、ゴヤール サンルイ）",category:"ecommerce",emoji:"🛍️"},
    {e:"Satchel",j:"サッチェル",def:"Structured bag with top handle + shoulder strap (LV Alma, Prada Galleria)",defJp:"トップハンドル+ショルダーストラップの構造的バッグ（LV アルマ、プラダ ガレリア）",category:"ecommerce",emoji:"💼"},
    {e:"Hobo bag",j:"ホーボーバッグ",def:"Slouchy crescent-shaped bag (Gucci Jackie)",defJp:"たるんだ三日月型バッグ（グッチ ジャッキー）",category:"ecommerce",emoji:"🌙"},
    {e:"Bucket bag",j:"バケツ型バッグ",def:"Cylindrical drawstring bag (LV Noé, Mansur Gavriel Bucket)",defJp:"円筒形の巾着バッグ（LV ノエ、マンサー ガブリエル バケット）",category:"ecommerce",emoji:"🪣"},
    {e:"Saddle bag",j:"サドルバッグ",def:"Curved, saddle-shaped (Dior Saddle)",defJp:"曲がったサドル型（ディオール サドル）",category:"ecommerce",emoji:"🏇"},
    {e:"Baguette",j:"バゲット型",def:"Compact underarm bag (Fendi Baguette)",defJp:"コンパクトな脇下バッグ（フェンディ バゲット）",category:"ecommerce",emoji:"🥖"},
    {e:"Crossbody / Messenger",j:"クロスボディ",def:"Long strap worn across body",defJp:"体を横切って着用する長いストラップ",category:"ecommerce",emoji:"➡️"},
    {e:"Clutch",j:"クラッチ",def:"No strap, handheld evening bag",defJp:"ストラップなし、手持ちイブニングバッグ",category:"ecommerce",emoji:"👛"}
  ]},
  { cat:"Maintenance & Repair Advice (Pro Tips)", items:[
    {e:"Minor hardware scratches",j:"金具の小傷",def:"Can be buffed with a microfiber cloth. For deeper scratches, jeweler's polishing cloth works.",defJp:"マイクロファイバークロスで磨けます。深い傷には宝石用研磨布が効果的。",category:"ecommerce",emoji:"✨"},
    {e:"Vachetta patina",j:"ヌメ革の経年変化",def:"Normal and many consider it desirable. Can be lightened with saddle soap but not fully reversed.",defJp:"正常で多くの人が望ましいと考える。サドルソープで薄くできるが完全には戻らない。",category:"ecommerce",emoji:"🍂"},
    {e:"Water stains on vachetta",j:"ヌメ革の水シミ",def:"Can be minimized with leather conditioner. Apply evenly to blend the stain.",defJp:"レザーコンディショナーで最小化できる。均一に塗ってシミを馴染ませる。",category:"ecommerce",emoji:"💧"},
    {e:"Corner wear",j:"角スレ",def:"Cosmetic only - doesn't affect structure. Professional leather service can re-color and seal.",defJp:"見た目だけ - 構造に影響なし。プロのレザーサービスで再着色と保護できる。",category:"ecommerce",emoji:"🔧"},
    {e:"Pen marks inside",j:"内側のペン跡",def:"Sometimes respond to leather erasers (Mr. Clean Magic Eraser). Test in hidden area first.",defJp:"レザー消しゴム（メラミンスポンジ）で対応できることも。まず隠れた部分でテスト。",category:"ecommerce",emoji:"🖊️"},
    {e:"Sticky interior pockets",j:"内ポケットのべたつき",def:"Common in vintage bags. Professional cleaning recommended - home fixes can make it worse.",defJp:"ヴィンテージバッグでよくある。プロのクリーニング推奨 - 自己対処で悪化する可能性。",category:"ecommerce",emoji:"🧴"},
    {e:"Loose stitching",j:"縫い目のほつれ",def:"Minor loose threads can be carefully trimmed. Structural issues need professional repair.",defJp:"軽い糸のほつれは慎重にカット可能。構造的問題はプロの修理が必要。",category:"ecommerce",emoji:"🪡"},
    {e:"Tarnished hardware",j:"変色した金具",def:"Brass polish (like Brasso) works for severe tarnish. Available at Home Depot/hardware stores.",defJp:"ひどい変色には真鍮磨き（Brasso）が効果的。ホームデポ/金物店で入手可。",category:"ecommerce",emoji:"🌟"},
    {e:"Dry leather",j:"乾燥したレザー",def:"Apply leather conditioner (Leather Honey, Cadillac). Restores moisture and flexibility.",defJp:"レザーコンディショナー（Leather Honey、Cadillac）を塗る。水分と柔軟性を回復。",category:"ecommerce",emoji:"💦"},
    {e:"Musty odor",j:"カビ臭",def:"Air out for 48 hours. Place baking soda sachet inside. Activated charcoal also works.",defJp:"48時間風通し。中に重曹袋を入れる。活性炭も効果的。",category:"ecommerce",emoji:"👃"},
    {e:"Color transfer",j:"色移り",def:"Leather cleaner + gentle rubbing. Light colors are more prone - recommend protective sprays.",defJp:"レザークリーナー+優しく擦る。明るい色は移りやすい - 保護スプレー推奨。",category:"ecommerce",emoji:"🎨"},
    {e:"Zipper issues",j:"ジッパー不具合",def:"Graphite pencil on teeth helps stuck zippers. Broken pull tab? Replacement available online.",defJp:"詰まったジッパーには歯に鉛筆の芯を塗る。引き手が壊れた？オンラインで交換部品入手可。",category:"ecommerce",emoji:"🔐"},
    {e:"Canvas peeling",j:"キャンバスの剥がれ",def:"SHOULD NOT happen on authentic LV - canvas is coated fabric, not glued. If peeling, authentication concern.",defJp:"本物のLVでは起きない - キャンバスはコーティング布、接着ではない。剥がれたら真贋に懸念。",category:"ecommerce",emoji:"⚠️"},
    {e:"Storage tips",j:"保管のコツ",def:"Stuff with tissue, store in dust bag, cool dry place, away from sunlight. Prevents sagging.",defJp:"ティッシュで詰め、保存袋に入れ、涼しく乾燥した場所、日光を避ける。たるみ防止。",category:"ecommerce",emoji:"📦"},
    {e:"Hardware protective film",j:"金具の保護フィルム",def:"NWT bags often have this. 'You can remove it or keep it - some buyers prefer it pristine.'",defJp:"新品タグ付きによくある。「取るも残すも自由 - 未使用を好むバイヤーもいる」",category:"ecommerce",emoji:"🎁"},
    {e:"Professional leather spa",j:"プロのレザースパ",def:"Services like Leather Spa, Rago Brothers, or local cobblers. For major restoration.",defJp:"Leather Spa、Rago Brothers、地元の靴修理店など。大規模修復用。",category:"ecommerce",emoji:"💼"}
  ]}
];

/* ═══ APP ═══ */
export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    // If hash is invalid, clear it and return 0
    if (!hash || hash === "" || hash === "NaN" || hash === "null" || hash === "undefined") {
      window.location.hash = "";
      return 0;
    }
    // Try to parse as number for old numeric routes
    const num = parseInt(hash, 10);
    if (isNaN(num)) {
      // It's a string page ID like "brand-lv"
      return hash;
    }
    return num;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({ knowledge: true, practice: false, ai: false, progress: false });
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

  // 3-Layer Navigation Structure
  const NAV_STRUCTURE = {
    en: [
      {
        id: "home",
        icon: "🏠",
        label: "Home",
        page: 0
      },
      {
        id: "knowledge",
        icon: "📚",
        label: "Knowledge Base",
        children: [
          {
            id: "brands",
            icon: "👜",
            label: "Brand Knowledge",
            children: [
              { label: "🔍 Browse All Brands", page: "brands" },
              { label: "Louis Vuitton 👜💎", page: "brand-lv" },
              { label: "Chanel 👜💎", page: "brand-chanel" },
              { label: "Hermès 👜💎", page: "brand-hermes" },
              { label: "Gucci 👜", page: "brand-gucci" },
              { label: "Prada 👜", page: "brand-prada" },
              { label: "Dior 👜💎", page: "brand-dior" },
              { label: "Cartier 💎", page: "brand-cartier" },
              { label: "Bulgari 💎", page: "brand-bulgari" },
              { label: "Tiffany & Co. 💎", page: "brand-tiffany" },
              { label: "Van Cleef & Arpels 💎", page: "brand-vca" },
              { label: "Bottega Veneta 👜", page: "brand-bottegaveneta" },
              { label: "Fendi 👜", page: "brand-fendi" },
              { label: "Celine 👜", page: "brand-celine" },
              { label: "Loewe 👜", page: "brand-loewe" },
              { label: "Balenciaga 👜", page: "brand-balenciaga" },
              { label: "Saint Laurent 👜", page: "brand-saintlaurent" },
              { label: "Givenchy 👜", page: "brand-givenchy" },
              { label: "Valentino 👜", page: "brand-valentino" },
              { label: "Burberry 👜", page: "brand-burberry" },
              { label: "MCM 👜", page: "brand-mcm" },
              { label: "Alexander McQueen 👜", page: "brand-alexandermcqueen" },
              { label: "Miu Miu 👜", page: "brand-miumiu" },
              { label: "Chloé 👜", page: "brand-chloe" },
              { label: "Tom Ford 👜", page: "brand-tomford" },
              { label: "Dolce & Gabbana 👜", page: "brand-dolcegabbana" },
              { label: "Versace 👜", page: "brand-versace" },
              { label: "Jimmy Choo 👜", page: "brand-jimmychoo" },
              { label: "Christian Louboutin 👜", page: "brand-christianlouboutin" },
              { label: "Off-White 👜", page: "brand-offwhite" },
              { label: "Marni 👜", page: "brand-marni" },
              { label: "The Row 👜", page: "brand-therow" },
              { label: "Stella McCartney 👜", page: "brand-stellamccartney" },
              { label: "Proenza Schouler 👜", page: "brand-proenzaschouler" },
              { label: "Balmain 👜", page: "brand-balmain" },
              { label: "Alexander Wang 👜", page: "brand-alexanderwang" },
              { label: "Lanvin 👜", page: "brand-lanvin" },
              { label: "Jil Sander 👜", page: "brand-jilsander" },
              { label: "Goyard 👜", page: "brand-goyard" },
              { label: "Delvaux 👜", page: "brand-delvaux" },
              { label: "Judith Leiber 👜", page: "brand-judithlieber" },
              { label: "Mark Cross 👜", page: "brand-markcross" },
              { label: "Mulberry 👜", page: "brand-mulberry" },
              { label: "Coach 👜", page: "brand-coach" },
              { label: "Jacquemus 👜", page: "brand-jacquemus" },
              { label: "Chrome Hearts 👜", page: "brand-chromhearts" },
              { label: "Chopard 💎", page: "brand-chopard" },
              { label: "Pomellato 💎", page: "brand-pomellato" },
              { label: "Mikimoto 💎", page: "brand-mikimoto" }
            ]
          },
          {
            id: "live",
            icon: "🎬",
            label: "Live Selling",
            children: [
              { label: "Step 1: Exposure", page: "live-step1" },
              { label: "Step 2: First Impression", page: "live-step2" },
              { label: "Step 3: Retention", page: "live-step3" },
              { label: "Step 4: Engagement", page: "live-step4" },
              { label: "Step 5: Conversion", page: "live-step5" },
              { label: "Step 6: Follow-Up", page: "live-step6" }
            ]
          },
          {
            id: "policy",
            icon: "📋",
            label: "eBay Policy",
            page: "policy"
          },
          {
            id: "vocab",
            icon: "📖",
            label: "Vocabulary",
            page: 5
          }
        ]
      },
      {
        id: "practice",
        icon: "🎮",
        label: "Practice Games",
        children: [
          { label: "Name Blast", page: "game-nameblast" },
          { label: "Speed Auction", page: "game-speedauction" },
          { label: "Condition Description", page: "game-condition" },
          { label: "Scenario Response", page: "game-scenario" },
          { label: "Flashcard Mode", page: "game-flashcard" },
          { label: "Matching Game", page: "game-matching" },
          { label: "Daily Warm-Up", page: "game-warmup" }
        ]
      },
      {
        id: "ai",
        icon: "🤖",
        label: "AI Practice",
        children: [
          { label: "Live Stream Simulator", page: "ai-simulator" },
          { label: "Condition Evaluator", page: "ai-condition" },
          { label: "Conversation Partner", page: "ai-conversation" },
          { label: "Phrase Translator", page: "ai-translator" }
        ]
      },
      {
        id: "progress",
        icon: "📊",
        label: "Progress",
        children: [
          { label: "Your Stats", page: "progress-stats" },
          { label: "Achievements", page: "progress-achievements" },
          { label: "Confidence Tracker", page: "progress-confidence" }
        ]
      }
    ],
    jp: [
      {
        id: "home",
        icon: "🏠",
        label: "ホーム",
        page: 0
      },
      {
        id: "knowledge",
        icon: "📚",
        label: "知識ベース",
        children: [
          {
            id: "brands",
            icon: "👜",
            label: "ブランド知識",
            children: [
              { label: "🔍 全ブランドを見る", page: "brands" },
              { label: "ルイ・ヴィトン 👜💎", page: "brand-lv" },
              { label: "シャネル 👜💎", page: "brand-chanel" },
              { label: "エルメス 👜💎", page: "brand-hermes" },
              { label: "グッチ 👜", page: "brand-gucci" },
              { label: "プラダ 👜", page: "brand-prada" },
              { label: "ディオール 👜💎", page: "brand-dior" },
              { label: "カルティエ 💎", page: "brand-cartier" },
              { label: "ブルガリ 💎", page: "brand-bulgari" },
              { label: "ティファニー 💎", page: "brand-tiffany" },
              { label: "ヴァンクリーフ＆アーペル 💎", page: "brand-vca" },
              { label: "ボッテガ・ヴェネタ 👜", page: "brand-bottegaveneta" },
              { label: "フェンディ 👜", page: "brand-fendi" },
              { label: "セリーヌ 👜", page: "brand-celine" },
              { label: "ロエベ 👜", page: "brand-loewe" },
              { label: "バレンシアガ 👜", page: "brand-balenciaga" },
              { label: "サンローラン 👜", page: "brand-saintlaurent" },
              { label: "ジバンシィ 👜", page: "brand-givenchy" },
              { label: "ヴァレンティノ 👜", page: "brand-valentino" },
              { label: "バーバリー 👜", page: "brand-burberry" },
              { label: "MCM 👜", page: "brand-mcm" },
              { label: "アレキサンダー・マックイーン 👜", page: "brand-alexandermcqueen" },
              { label: "ミュウミュウ 👜", page: "brand-miumiu" },
              { label: "クロエ 👜", page: "brand-chloe" },
              { label: "トム・フォード 👜", page: "brand-tomford" },
              { label: "ドルチェ＆ガッバーナ 👜", page: "brand-dolcegabbana" },
              { label: "ヴェルサーチ 👜", page: "brand-versace" },
              { label: "ジミー・チュウ 👜", page: "brand-jimmychoo" },
              { label: "クリスチャン・ルブタン 👜", page: "brand-christianlouboutin" },
              { label: "オフ・ホワイト 👜", page: "brand-offwhite" },
              { label: "マルニ 👜", page: "brand-marni" },
              { label: "ザ・ロウ 👜", page: "brand-therow" },
              { label: "ステラ・マッカートニー 👜", page: "brand-stellamccartney" },
              { label: "プロエンザ・スクーラー 👜", page: "brand-proenzaschouler" },
              { label: "バルマン 👜", page: "brand-balmain" },
              { label: "アレキサンダー・ワン 👜", page: "brand-alexanderwang" },
              { label: "ランバン 👜", page: "brand-lanvin" },
              { label: "ジル・サンダー 👜", page: "brand-jilsander" },
              { label: "ゴヤール 👜", page: "brand-goyard" },
              { label: "デルヴォー 👜", page: "brand-delvaux" },
              { label: "ジュディス・リーバー 👜", page: "brand-judithlieber" },
              { label: "マーク・クロス 👜", page: "brand-markcross" },
              { label: "マルベリー 👜", page: "brand-mulberry" },
              { label: "コーチ 👜", page: "brand-coach" },
              { label: "ジャックムス 👜", page: "brand-jacquemus" },
              { label: "クロムハーツ 👜", page: "brand-chromhearts" },
              { label: "ショパール 💎", page: "brand-chopard" },
              { label: "ポメラート 💎", page: "brand-pomellato" },
              { label: "ミキモト 💎", page: "brand-mikimoto" }
            ]
          },
          {
            id: "live",
            icon: "🎬",
            label: "ライブ販売",
            children: [
              { label: "ステップ1: 露出", page: "live-step1" },
              { label: "ステップ2: 第一印象", page: "live-step2" },
              { label: "ステップ3: 定着", page: "live-step3" },
              { label: "ステップ4: エンゲージメント", page: "live-step4" },
              { label: "ステップ5: コンバージョン", page: "live-step5" },
              { label: "ステップ6: フォローアップ", page: "live-step6" }
            ]
          },
          {
            id: "policy",
            icon: "📋",
            label: "eBayポリシー",
            page: "policy"
          },
          {
            id: "vocab",
            icon: "📖",
            label: "用語集",
            page: 5
          }
        ]
      },
      {
        id: "practice",
        icon: "🎮",
        label: "練習ゲーム",
        children: [
          { label: "名前ブラスト", page: "game-nameblast" },
          { label: "スピードオークション", page: "game-speedauction" },
          { label: "状態説明", page: "game-condition" },
          { label: "シナリオ対応", page: "game-scenario" },
          { label: "フラッシュカード", page: "game-flashcard" },
          { label: "マッチングゲーム", page: "game-matching" },
          { label: "デイリーウォームアップ", page: "game-warmup" }
        ]
      },
      {
        id: "ai",
        icon: "🤖",
        label: "AI練習",
        children: [
          { label: "ライブ配信シミュレーター", page: "ai-simulator" },
          { label: "状態評価者", page: "ai-condition" },
          { label: "会話パートナー", page: "ai-conversation" },
          { label: "フレーズ翻訳", page: "ai-translator" }
        ]
      },
      {
        id: "progress",
        icon: "📊",
        label: "進捗",
        children: [
          { label: "統計", page: "progress-stats" },
          { label: "実績", page: "progress-achievements" },
          { label: "自信トラッカー", page: "progress-confidence" }
        ]
      }
    ]
  };

  const tabs = lang==="en" ? ["Home","Brands","6-Step Framework","Stream Formats","eBay Policy","Vocab","Practice"] : ["ホーム","ブランド","6ステップ","配信形式","ポリシー","用語集","練習"];
  const icons = ["🏠","👜","📡","🎬","📋","💬","🎯"];

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

  // Update URL hash when page changes
  useEffect(() => {
    // Only update hash if page is valid
    if (page === null || page === undefined) {
      window.location.hash = "0";
      return;
    }
    if (typeof page === 'number' && isNaN(page)) {
      window.location.hash = "0";
      return;
    }
    // Valid page - update hash
    const hashValue = page === 0 ? "" : String(page);
    if (window.location.hash.slice(1) !== hashValue) {
      window.location.hash = hashValue;
    }
  }, [page]);

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
      if (!hash || hash === "" || hash === "NaN" || hash === "null") {
        setPage(0);
        return;
      }
      // Try to parse as number, otherwise use as string
      const num = parseInt(hash, 10);
      setPage(isNaN(num) ? hash : num);
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

        {/* Nav Items - 3 Layer Collapsible */}
        <div style={{ flex:1, padding:"12px", overflowY:"auto" }}>
          {NAV_STRUCTURE[lang].map((section) => (
            <div key={section.id} style={{ marginBottom:8 }}>
              {/* Level 1: Main Section */}
              {section.page !== undefined ? (
                // Simple link (like Home)
                <button
                  onClick={() => setPage(section.page)}
                  style={{
                    width:"100%",
                    minHeight:48,
                    padding:"14px 16px",
                    borderRadius:10,
                    background: page===section.page ? "#3665F3" : "transparent",
                    border:"none",
                    cursor:"pointer",
                    fontFamily:"inherit",
                    fontSize:15,
                    fontWeight: page===section.page ? 600 : 500,
                    display:"flex",
                    alignItems:"center",
                    gap:12,
                    color: page===section.page ? "#FFFFFF" : "#191919",
                    transition:"all 0.2s",
                    textAlign:"left"
                  }}
                >
                  <span style={{ fontSize:22 }}>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ) : (
                // Collapsible section
                <>
                  <button
                    onClick={() => setExpandedSections({...expandedSections, [section.id]: !expandedSections[section.id]})}
                    onMouseEnter={e => e.currentTarget.style.background = "#F7F7F7"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    style={{
                      width:"100%",
                      minHeight:44,
                      padding:"12px 14px",
                      borderRadius:8,
                      background:"transparent",
                      border:"none",
                      cursor:"pointer",
                      fontFamily:"inherit",
                      fontSize:14,
                      fontWeight:500,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"space-between",
                      color:"#191919",
                      transition:"all 0.2s",
                      textAlign:"left"
                    }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:20 }}>{section.icon}</span>
                      <span>{section.label}</span>
                    </div>
                    <span style={{ fontSize:16, color:"#6B7280", fontWeight:700, transition:"transform 0.2s", transform: expandedSections[section.id] ? "rotate(90deg)" : "rotate(0deg)" }}>
                      ›
                    </span>
                  </button>

                  {/* Level 2: Sub-sections */}
                  {expandedSections[section.id] && section.children && (
                    <div style={{ paddingLeft:20, marginTop:6 }}>
                      {section.children.map((sub) => (
                        <div key={sub.id || sub.label} style={{ marginBottom:4 }}>
                          {sub.page !== undefined ? (
                            // Simple sub-link
                            <button
                              onClick={() => {
                                console.log("Clicked:", sub.label, "Setting page to:", sub.page);
                                setPage(sub.page);
                              }}
                              onMouseEnter={e => {if(page!==sub.page) e.currentTarget.style.background = "#F7F7F7"}}
                              onMouseLeave={e => {if(page!==sub.page) e.currentTarget.style.background = "transparent"}}
                              style={{
                                width:"100%",
                                minHeight:38,
                                padding:"10px 12px",
                                borderRadius:6,
                                background: page===sub.page ? "#191919" : "transparent",
                                border:"none",
                                cursor:"pointer",
                                fontFamily:"inherit",
                                fontSize:14,
                                fontWeight:500,
                                display:"flex",
                                alignItems:"center",
                                gap:8,
                                color: page===sub.page ? "#FFFFFF" : "#191919",
                                transition:"all 0.2s",
                                textAlign:"left",
                                marginBottom:4
                              }}
                            >
                              {sub.icon && <span style={{ fontSize:18 }}>{sub.icon}</span>}
                              <span>{sub.label}</span>
                            </button>
                          ) : (
                            // Collapsible sub-section (Level 3)
                            <>
                              <button
                                onClick={() => setExpandedSections({...expandedSections, [sub.id]: !expandedSections[sub.id]})}
                                onMouseEnter={e => e.currentTarget.style.background = "#F7F7F7"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                style={{
                                  width:"100%",
                                  minHeight:38,
                                  padding:"10px 12px",
                                  borderRadius:6,
                                  background:"transparent",
                                  border:"none",
                                  cursor:"pointer",
                                  fontFamily:"inherit",
                                  fontSize:14,
                                  fontWeight:500,
                                  display:"flex",
                                  alignItems:"center",
                                  justifyContent:"space-between",
                                  color:"#191919",
                                  transition:"all 0.2s",
                                  textAlign:"left",
                                  marginBottom:4
                                }}
                              >
                                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                  {sub.icon && <span style={{ fontSize:18 }}>{sub.icon}</span>}
                                  <span>{sub.label}</span>
                                </div>
                                <span style={{ fontSize:16, color:"#6B7280", fontWeight:700, transition:"transform 0.2s", transform: expandedSections[sub.id] ? "rotate(90deg)" : "rotate(0deg)" }}>
                                  ›
                                </span>
                              </button>

                              {/* Level 3: Items */}
                              {expandedSections[sub.id] && sub.children && (
                                <div style={{ paddingLeft:20, marginTop:6 }}>
                                  {sub.children.map((item, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        console.log("Clicked:", item.label, "Setting page to:", item.page);
                                        setPage(item.page);
                                      }}
                                      onMouseEnter={e => {if(page!==item.page) e.currentTarget.style.background = "#F7F7F7"}}
                                      onMouseLeave={e => {if(page!==item.page) e.currentTarget.style.background = "transparent"}}
                                      style={{
                                        width:"100%",
                                        minHeight:36,
                                        padding:"9px 12px",
                                        marginBottom:3,
                                        borderRadius:6,
                                        background: page===item.page ? "#191919" : "transparent",
                                        border:"none",
                                        cursor:"pointer",
                                        fontFamily:"inherit",
                                        fontSize:14,
                                        fontWeight:500,
                                        display:"flex",
                                        alignItems:"center",
                                        color: page===item.page ? "#FFFFFF" : "#191919",
                                        transition:"all 0.2s",
                                        textAlign:"left"
                                      }}
                                    >
                                      {item.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex:1, background:"#F7F7F7", overflowY:"auto" }}>
        {/* Sticky Header */}
        <div style={{ position:"sticky", top:0, zIndex:999, background:"#FFFFFF", borderBottom:"1px solid #E5E7EB", boxShadow:"0 2px 4px rgba(0,0,0,0.08)" }}>
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
          {/* Render based on page value */}
          {(() => {
            console.log("Current page:", page, "Type:", typeof page);

            // Handle null/undefined/NaN - default to home
            if (page === null || page === undefined || (typeof page === 'number' && isNaN(page))) {
              console.log("Rendering Home (null/undefined/NaN)");
              return <HomeP lang={lang} setPage={setPage} playerData={playerData} />;
            }

            const pageStr = String(page);

            // Home
            if (page === 0 || page === "0") return <HomeP lang={lang} setPage={setPage} playerData={playerData} />;

            // Brand Knowledge
            if (page === 1 || page === "brands" || pageStr.startsWith("brand-")) return <FashionP lang={lang} initialBrand={pageStr} />;

            // Live Selling - 6 Steps
            if (page === 2 || pageStr.startsWith("live-step")) return <LiveP lang={lang} />;

            // eBay Policy
            if (page === 4 || page === "policy") return <PolicyP lang={lang} />;

            // Vocabulary
            if (page === 5 || pageStr.startsWith("vocab-")) return <EnglishP lang={lang} />;

            // Practice Games
            if (page === 6 || pageStr.startsWith("game-")) return <PracticeP lang={lang} onXpEarned={handleXpEarned} />;

            // AI Practice
            if (pageStr === "ai-simulator") return <AILiveStreamSimulator lang={lang} />;
            if (pageStr === "ai-condition") return <AIConditionEvaluator lang={lang} />;
            if (pageStr === "ai-conversation") return <AIConversationPartner lang={lang} />;
            if (pageStr === "ai-translator") return <AIPhraseTranslator lang={lang} />;

            // Progress
            if (pageStr.startsWith("progress-")) return <div style={{padding:40,textAlign:"center",color:"#6B7280"}}>Progress pages coming soon...</div>;

            // Fallback - show page value for debugging
            return <div style={{padding:40,textAlign:"center",color:"#E53238"}}>Page not found: {JSON.stringify(page)}</div>;
          })()}
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
  const [showProgressDetails, setShowProgressDetails] = useState(false);
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
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))", gap:12, marginBottom: showProgressDetails ? 16 : 0 }}>
            {[
              { icon: "🎮", label: lang==="en"?"Games Played":"ゲームプレイ", value: playerData.stats.gamesPlayed || 0, clickable: true },
              { icon: "🎙️", label: lang==="en"?"Names Read":"名前読み", value: playerData.stats.namesRead || 0 },
              { icon: "🔍", label: lang==="en"?"Items Described":"説明済み", value: playerData.stats.conditionsDescribed || 0 },
              { icon: "💬", label: lang==="en"?"Conversations":"会話回数", value: playerData.stats.conversationsCompleted || 0 },
              { icon: "💼", label: lang==="en"?"Items Sold":"販売済み", value: playerData.stats.itemsSold || 0 },
              { icon: "⏱️", label: lang==="en"?"Minutes":"分", value: playerData.stats.practiceMinutes || 0 },
            ].map((stat, i) => (
              <div
                key={i}
                onClick={stat.clickable ? () => setShowProgressDetails(!showProgressDetails) : undefined}
                style={{
                  background: stat.clickable ? "#EFF6FF" : "#F7F7F7",
                  borderRadius:8,
                  padding:"12px",
                  textAlign:"center",
                  cursor: stat.clickable ? "pointer" : "default",
                  border: stat.clickable ? "2px solid #3665F3" : "none",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => stat.clickable && (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => stat.clickable && (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ fontSize:24, marginBottom:4 }}>{stat.icon}</div>
                <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:2 }}>{stat.value}</div>
                <div style={{ fontSize:12, color: stat.clickable ? "#3665F3" : "#6B7280", fontWeight: stat.clickable ? 600 : 400 }}>
                  {stat.label} {stat.clickable && "▼"}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Details Dropdown */}
          {showProgressDetails && (
            <div style={{
              background:"#F7F7F7",
              borderRadius:8,
              padding:"16px 20px",
              animation:"fu 0.3s ease"
            }}>
              <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:12 }}>
                {lang==="en"?"Practice Games Completed":"完了した練習ゲーム"}
              </div>
              <div style={{ display:"grid", gap:8 }}>
                {[
                  { name: lang==="en"?"Name Blast":"名前ブラスト", completed: (playerData.stats.namesRead || 0) > 0 },
                  { name: lang==="en"?"Speed Auction":"スピードオークション", completed: (playerData.stats.itemsSold || 0) > 0 },
                  { name: lang==="en"?"Condition Description":"状態説明", completed: (playerData.stats.conditionsDescribed || 0) > 0 },
                  { name: lang==="en"?"Scenario Response":"シナリオ対応", completed: (playerData.stats.scenariosCompleted || 0) > 0 },
                  { name: lang==="en"?"Flashcard Mode":"フラッシュカード", completed: (playerData.stats.flashcardsReviewed || 0) > 0 },
                  { name: lang==="en"?"Matching Game":"マッチングゲーム", completed: (playerData.stats.matchingCompleted || 0) > 0 },
                  { name: lang==="en"?"Daily Warm-Up":"デイリーウォームアップ", completed: (playerData.stats.warmUpsCompleted || 0) > 0 },
                ].map((game, idx) => (
                  <div
                    key={idx}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"space-between",
                      padding:"10px 12px",
                      background:"#FFFFFF",
                      borderRadius:6,
                      border: game.completed ? "1px solid #86B817" : "1px solid #E5E7EB"
                    }}
                  >
                    <span style={{ fontSize:14, color:"#191919", fontWeight:game.completed ? 600 : 400 }}>
                      {game.name}
                    </span>
                    <span style={{ fontSize:16 }}>
                      {game.completed ? "✅" : "⭕"}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:13, color:"#6B7280", marginTop:12, fontStyle:"italic" }}>
                {lang==="en"
                  ? "Complete all 7 games to become a Live Selling Pro!"
                  : "全7ゲームを完了してライブセリングプロになろう！"}
              </div>
            </div>
          )}
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

/* ═══ BRAND KNOWLEDGE LANDING PAGE ═══ */
function BrandKnowledgeLandingPage({ lang, onBrandSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); // all, handbags, jewelry

  // Build searchable data: brands + their models
  const searchableData = [];
  Object.keys(BRAND_DATA).forEach(brandKey => {
    const brand = BRAND_DATA[brandKey];

    // Add brand itself
    searchableData.push({
      type: "brand",
      brandKey,
      brandName: brand.name,
      categories: brand.categories,
      year: brand.year,
      country: brand.country,
      imageUrl: brand.imageUrl
    });

    // Add each model
    if (brand.models && brand.models.length > 0) {
      brand.models.forEach(model => {
        searchableData.push({
          type: "model",
          brandKey,
          brandName: brand.name,
          modelName: model.name,
          categories: brand.categories,
          brief: lang === "en" ? model.brief : model.briefJp
        });
      });
    }
  });

  // Filter by search query and category
  const filteredResults = searchableData.filter(item => {
    // Category filter
    if (categoryFilter !== "all") {
      if (!item.categories.includes(categoryFilter === "handbags" ? "handbags" : "jewelry")) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const brandMatch = item.brandName.toLowerCase().includes(query);
      const modelMatch = item.modelName ? item.modelName.toLowerCase().includes(query) : false;
      return brandMatch || modelMatch;
    }

    return true;
  });

  // Separate brands and models
  const brandResults = filteredResults.filter(r => r.type === "brand");
  const modelResults = filteredResults.filter(r => r.type === "model");

  // Category counts
  const totalBrands = Object.keys(BRAND_DATA).length;
  const handbagBrands = Object.values(BRAND_DATA).filter(b => b.categories.includes("handbags")).length;
  const jewelryBrands = Object.values(BRAND_DATA).filter(b => b.categories.includes("jewelry")).length;

  return (
    <div style={{ animation: "fu 0.4s ease" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: "#191919", marginBottom: 8 }}>
          {lang === "en" ? "Brand Knowledge" : "ブランド知識"}
        </h1>
        <p style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.6, marginBottom: 24 }}>
          {lang === "en"
            ? "Complete training on all eBay Authenticity Guarantee eligible brands. Search by brand or model name."
            : "eBay Authenticity Guarantee対象の全ブランドの完全トレーニング。ブランド名またはモデル名で検索。"}
        </p>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          <div style={{ background: "linear-gradient(135deg, #3665F3 0%, #667eea 100%)", borderRadius: 12, padding: "20px 24px", color: "#FFF" }}>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>
              {lang === "en" ? "Total Brands" : "総ブランド数"}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{totalBrands}</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #F5AF02 0%, #f59e0b 100%)", borderRadius: 12, padding: "20px 24px", color: "#FFF" }}>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>
              👜 {lang === "en" ? "Handbags" : "ハンドバッグ"}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{handbagBrands}</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #86B817 0%, #84cc16 100%)", borderRadius: 12, padding: "20px 24px", color: "#FFF" }}>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>
              💎 {lang === "en" ? "Jewelry" : "ジュエリー"}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{jewelryBrands}</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div style={{ marginBottom: 32 }}>
        {/* Search Box */}
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder={lang === "en" ? "Search brands or models..." : "ブランドまたはモデルを検索..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 20px",
              fontSize: 16,
              border: "2px solid #E5E7EB",
              borderRadius: 12,
              fontFamily: "inherit",
              outline: "none",
              transition: "all 0.2s"
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "#3665F3"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#E5E7EB"}
          />
        </div>

        {/* Category Filter Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { id: "all", label: lang === "en" ? "All Brands" : "全てのブランド", icon: "🏪" },
            { id: "handbags", label: lang === "en" ? "Handbags Only" : "ハンドバッグのみ", icon: "👜" },
            { id: "jewelry", label: lang === "en" ? "Jewelry Only" : "ジュエリーのみ", icon: "💎" }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              style={{
                background: categoryFilter === cat.id ? "#3665F3" : "#FFFFFF",
                color: categoryFilter === cat.id ? "#FFFFFF" : "#191919",
                border: `2px solid ${categoryFilter === cat.id ? "#3665F3" : "#E5E7EB"}`,
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit"
              }}
              onMouseEnter={(e) => {
                if (categoryFilter !== cat.id) {
                  e.currentTarget.style.borderColor = "#3665F3";
                  e.currentTarget.style.background = "#EFF6FF";
                }
              }}
              onMouseLeave={(e) => {
                if (categoryFilter !== cat.id) {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.background = "#FFFFFF";
                }
              }}
            >
              <span style={{ marginRight: 8 }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Only show results when there's a search query or filter */}
      {(searchQuery.trim() || categoryFilter !== "all") && (
        <>
          {/* Results Count */}
          <div style={{ marginBottom: 16, color: "#6B7280", fontSize: 14 }}>
            {lang === "en" ? "Found" : "検索結果"}: {brandResults.length} {lang === "en" ? "brands" : "ブランド"}
            {modelResults.length > 0 && (
              <>, {modelResults.length} {lang === "en" ? "models" : "モデル"}</>
            )}
          </div>

          {/* Brands Grid */}
          {brandResults.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#191919", marginBottom: 16 }}>
            {lang === "en" ? "Brands" : "ブランド"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {brandResults.map((result, idx) => {
              const brand = BRAND_DATA[result.brandKey];
              return (
                <button
                  key={idx}
                  onClick={() => onBrandSelect(result.brandKey)}
                  style={{
                    background: "#FFFFFF",
                    border: "2px solid #E5E7EB",
                    borderRadius: 12,
                    padding: "20px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    fontFamily: "inherit"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3665F3";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(54, 101, 243, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Brand Logo - Fallback to colored initial */}
                  <div style={{ height: 40, marginBottom: 16, display: "flex", alignItems: "center" }}>
                    {brand.imageUrl ? (
                      <img
                        src={brand.imageUrl}
                        alt={brand.name}
                        style={{ maxHeight: 40, maxWidth: "100%", objectFit: "contain" }}
                        onError={(e) => {
                          // Fallback to colored circle with initial
                          const initial = brand.name.charAt(0).toUpperCase();
                          const colors = ["#3665F3", "#F5AF02", "#86B817", "#E53238", "#667eea"];
                          const colorIndex = brand.name.charCodeAt(0) % colors.length;
                          e.target.style.display = "none";
                          const fallback = document.createElement("div");
                          fallback.style.width = "40px";
                          fallback.style.height = "40px";
                          fallback.style.borderRadius = "50%";
                          fallback.style.background = colors[colorIndex];
                          fallback.style.color = "#FFF";
                          fallback.style.display = "flex";
                          fallback.style.alignItems = "center";
                          fallback.style.justifyContent = "center";
                          fallback.style.fontSize = "18px";
                          fallback.style.fontWeight = "700";
                          fallback.textContent = initial;
                          e.target.parentNode.appendChild(fallback);
                        }}
                      />
                    ) : (
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: ["#3665F3", "#F5AF02", "#86B817", "#E53238", "#667eea"][brand.name.charCodeAt(0) % 5],
                        color: "#FFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        fontWeight: 700
                      }}>
                        {brand.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Brand Name with Icons */}
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#191919", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    {brand.name}
                    <span style={{ fontSize: 16 }}>
                      {brand.categories.includes("handbags") && "👜"}
                      {brand.categories.includes("jewelry") && "💎"}
                    </span>
                  </div>

                  {/* Brand Info */}
                  <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>
                    {brand.year} • {brand.country}
                  </div>

                  {/* Categories */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {brand.categories.map((cat, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 12,
                          background: cat === "handbags" ? "#FEF3C7" : "#ECFDF5",
                          color: cat === "handbags" ? "#92400E" : "#065F46",
                          padding: "4px 10px",
                          borderRadius: 6,
                          fontWeight: 600
                        }}
                      >
                        {cat === "handbags" ? (lang === "en" ? "Handbags" : "ハンドバッグ") : (lang === "en" ? "Jewelry" : "ジュエリー")}
                      </span>
                    ))}
                    {brand.models && brand.models.length > 0 && (
                      <span style={{
                        fontSize: 12,
                        background: "#EFF6FF",
                        color: "#1E40AF",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontWeight: 600
                      }}>
                        {brand.models.length} {lang === "en" ? "models" : "モデル"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Models List */}
      {modelResults.length > 0 && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#191919", marginBottom: 16 }}>
            {lang === "en" ? "Models" : "モデル"}
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {modelResults.map((result, idx) => (
              <button
                key={idx}
                onClick={() => onBrandSelect(result.brandKey)}
                style={{
                  background: "#FFFFFF",
                  border: "2px solid #E5E7EB",
                  borderRadius: 12,
                  padding: "16px 20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 16
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3665F3";
                  e.currentTarget.style.background = "#EFF6FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.background = "#FFFFFF";
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>
                    {result.brandName}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#191919", marginBottom: 4 }}>
                    {result.modelName}
                  </div>
                  <div style={{ fontSize: 14, color: "#4B5563" }}>
                    {result.brief}
                  </div>
                </div>
                <div style={{ fontSize: 24 }}>→</div>
              </button>
            ))}
          </div>
        </div>
      )}

          {/* No Results */}
          {brandResults.length === 0 && modelResults.length === 0 && searchQuery && (
            <div style={{ textAlign: "center", padding: 60, color: "#6B7280" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                {lang === "en" ? "No results found" : "結果が見つかりません"}
              </div>
              <div style={{ fontSize: 14 }}>
                {lang === "en"
                  ? "Try a different search term or browse all brands above"
                  : "別の検索キーワードを試すか、上記の全ブランドを閲覧してください"}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ═══ FASHION ═══ */
function FashionP({ lang, initialBrand }) {
  // Map page IDs to brand keys
  const brandMap = {
    "brand-lv": "lv",
    "brand-chanel": "chanel",
    "brand-hermes": "hermes",
    "brand-gucci": "gucci",
    "brand-prada": "prada",
    "brand-dior": "dior",
    "brand-cartier": "cartier",
    "brand-bulgari": "bulgari",
    "brand-tiffany": "tiffany",
    "brand-vca": "vca",
    "brand-bottegaveneta": "bottegaveneta",
    "brand-fendi": "fendi",
    "brand-celine": "celine",
    "brand-loewe": "loewe",
    "brand-balenciaga": "balenciaga",
    "brand-saintlaurent": "saintlaurent",
    "brand-givenchy": "givenchy",
    "brand-valentino": "valentino",
    "brand-burberry": "burberry",
    "brand-mcm": "mcm",
    "brand-alexandermcqueen": "alexandermcqueen",
    "brand-miumiu": "miumiu",
    "brand-chloe": "chloe",
    "brand-tomford": "tomford",
    "brand-dolcegabbana": "dolcegabbana",
    "brand-versace": "versace",
    "brand-jimmychoo": "jimmychoo",
    "brand-christianlouboutin": "christianlouboutin",
    "brand-offwhite": "offwhite",
    "brand-marni": "marni",
    "brand-therow": "therow",
    "brand-stellamccartney": "stellamccartney",
    "brand-proenzaschouler": "proenzaschouler",
    "brand-balmain": "balmain",
    "brand-alexanderwang": "alexanderwang",
    "brand-lanvin": "lanvin",
    "brand-jilsander": "jilsander",
    "brand-goyard": "goyard",
    "brand-delvaux": "delvaux",
    "brand-judithlieber": "judithlieber",
    "brand-markcross": "markcross",
    "brand-mulberry": "mulberry",
    "brand-coach": "coach",
    "brand-jacquemus": "jacquemus",
    "brand-chromhearts": "chromhearts",
    "brand-chopard": "chopard",
    "brand-pomellato": "pomellato",
    "brand-mikimoto": "mikimoto"
  };

  const [selectedBrand, setSelectedBrand] = useState(initialBrand && brandMap[initialBrand] ? brandMap[initialBrand] : null);
  const [selectedSubTab, setSelectedSubTab] = useState("models");
  const [selModel, setSelModel] = useState(null);

  const brandKeys = Object.keys(BRAND_DATA);
  const brand = selectedBrand ? BRAND_DATA[selectedBrand] : null;

  // Show landing page if no brand is selected
  if (!selectedBrand) {
    return <BrandKnowledgeLandingPage lang={lang} onBrandSelect={(brandKey) => setSelectedBrand(brandKey)} />;
  }

  // Sub-tabs for each brand
  const subTabs = [
    { id: "models", icon: "👜", label: lang==="en"?"Models":"モデル" },
    { id: "auth", icon: "✓", label: lang==="en"?"Authentication":"真贋確認" },
    { id: "colors", icon: "🎨", label: lang==="en"?"Colors":"カラー" },
    { id: "tips", icon: "💡", label: lang==="en"?"Tips":"販売テクニック" }
  ];

  // Model detail view
  if (selModel !== null) {
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

        {/* Key Visual Points for Live Streaming */}
        <div style={{ marginTop: 32, background: "#EFF6FF", padding: 24, borderRadius: 12, border: "2px solid #3665F3" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#3665F3", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            📸 {lang === "en" ? "What to Show on Camera" : "カメラで見せるポイント"}
          </h3>
          <div style={{ fontSize: 15, color: "#191919", lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 12px 0" }}>
              <strong>{lang === "en" ? "Essential shots for this model:" : "このモデルの必須ショット："}</strong>
            </p>
            <ul style={{ margin: "0 0 16px 0", paddingLeft: 24 }}>
              <li>{lang === "en" ? "Show the overall shape and silhouette from multiple angles" : "複数の角度から全体の形とシルエットを見せる"}</li>
              <li>{lang === "en" ? "Close-up of brand logos, stamps, and authentication markers" : "ブランドロゴ、刻印、真贋マーカーのクローズアップ"}</li>
              <li>{lang === "en" ? "Hardware details (zippers, clasps, chains) - zoom in!" : "金具ディテール（ジッパー、クラスプ、チェーン）- ズームイン！"}</li>
              <li>{lang === "en" ? "Interior lining and pockets - buyers want to see inside" : "内装と内ポケット - バイヤーは内側を見たい"}</li>
              <li>{lang === "en" ? "Any defects or wear - be honest and show clearly" : "欠陥や使用感 - 正直に明確に見せる"}</li>
              <li>{lang === "en" ? "Size reference - hold it up, show how it looks when worn/carried" : "サイズ感 - 持ち上げる、着用/携帯時の見え方を見せる"}</li>
            </ul>
            {model.shape && (
              <p style={{ margin: "16px 0 0 0", padding: 16, background: "#FFFFFF", borderRadius: 8, borderLeft: "4px solid #F5AF02" }}>
                <strong style={{ color: "#F5AF02" }}>💡 {lang === "en" ? "Shape Guide:" : "形状ガイド："}</strong><br/>
                {lang === "en" ? model.shape : model.shapeJp}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Brand navigation helpers
  const currentBrandIndex = brandKeys.indexOf(selectedBrand);
  const prevBrand = currentBrandIndex > 0 ? brandKeys[currentBrandIndex - 1] : null;
  const nextBrand = currentBrandIndex < brandKeys.length - 1 ? brandKeys[currentBrandIndex + 1] : null;

  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      {/* Brand Navigation Header */}
      <div style={{ marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
        <button
          onClick={() => prevBrand && setSelectedBrand(prevBrand)}
          disabled={!prevBrand}
          style={{
            background: prevBrand ? "#FFFFFF" : "#F3F4F6",
            border: "2px solid #E5E7EB",
            borderRadius:10,
            padding:"10px 16px",
            cursor: prevBrand ? "pointer" : "not-allowed",
            fontSize:14,
            fontWeight:600,
            color: prevBrand ? "#191919" : "#9CA3AF",
            transition:"all 0.2s",
            fontFamily:"inherit",
            opacity: prevBrand ? 1 : 0.5
          }}
          onMouseEnter={e => prevBrand && (e.currentTarget.style.borderColor="#3665F3")}
          onMouseLeave={e => prevBrand && (e.currentTarget.style.borderColor="#E5E7EB")}
        >
          ← {lang==="en"?"Previous":"前へ"}
        </button>

        <div style={{ flex:1, display:"flex", alignItems:"center", gap:16 }}>
          {brand.imageUrl ? (
            <img
              src={brand.imageUrl}
              alt={brand.name}
              style={{ height:50, objectFit:"contain", maxWidth: 200 }}
              onError={(e) => {
                // Hide broken image
                e.target.style.display = "none";
              }}
            />
          ) : null}
          <div>
            <div style={{ fontSize:24, fontWeight:800, color:"#1a1a2e", display:"flex", alignItems:"center", gap:8 }}>
              {brand.name}
              <span style={{ fontSize:20 }}>
                {brand.categories.includes("handbags") && "👜"}
                {brand.categories.includes("jewelry") && "💎"}
              </span>
            </div>
            <div style={{ fontSize:13, color:"#6b7280" }}>
              Founded {brand.year}, {brand.country}
              {" • "}
              {brand.categories.map(cat => cat === "handbags" ? (lang==="en"?"Handbags":"ハンドバッグ") : (lang==="en"?"Jewelry":"ジュエリー")).join(" & ")}
            </div>
          </div>
        </div>

        <button
          onClick={() => nextBrand && setSelectedBrand(nextBrand)}
          disabled={!nextBrand}
          style={{
            background: nextBrand ? "#FFFFFF" : "#F3F4F6",
            border: "2px solid #E5E7EB",
            borderRadius:10,
            padding:"10px 16px",
            cursor: nextBrand ? "pointer" : "not-allowed",
            fontSize:14,
            fontWeight:600,
            color: nextBrand ? "#191919" : "#9CA3AF",
            transition:"all 0.2s",
            fontFamily:"inherit",
            opacity: nextBrand ? 1 : 0.5
          }}
          onMouseEnter={e => nextBrand && (e.currentTarget.style.borderColor="#3665F3")}
          onMouseLeave={e => nextBrand && (e.currentTarget.style.borderColor="#E5E7EB")}
        >
          {lang==="en"?"Next":"次へ"} →
        </button>
      </div>

      {/* Sub-Tabs */}
      <div style={{
        display:"flex",
        gap:8,
        marginBottom:24,
        borderBottom:"2px solid #E5E7EB",
        paddingBottom:8
      }}>
        {subTabs.map((tab) => {
          const isActive = selectedSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setSelectedSubTab(tab.id); setSelModel(null); }}
              style={{
                background: isActive ? "#EFF6FF" : "transparent",
                color: isActive ? "#3665F3" : "#6B7280",
                border: "none",
                borderBottom: isActive ? "3px solid #3665F3" : "3px solid transparent",
                padding:"12px 20px",
                cursor:"pointer",
                fontSize:15,
                fontWeight: isActive ? 700 : 600,
                transition:"all 0.2s",
                fontFamily:"inherit"
              }}
            >
              <span style={{ marginRight:6 }}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div>
        {/* Models Tab */}
        {selectedSubTab === "models" && (
          <div style={{ animation:"fu 0.3s ease" }}>
            <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:16 }}>
              {lang==="en"?"Classic Models":"クラシックモデル"}
            </div>
            <div style={{ display:"grid", gap:12 }}>
              {brand.models.map((m,i)=>(
                <button key={i} onClick={()=>setSelModel(i)} style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, padding:"16px 20px", cursor:"pointer", textAlign:"left", transition:"all 0.2s", fontFamily:"inherit" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#3665F3"; e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#E5E7EB"; e.currentTarget.style.transform="translateY(0)";}}>
                  <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:4 }}>{m.name}</div>
                  <div style={{ fontSize:14, color:"#4B5563" }}>{lang==="en"?m.brief:m.briefJp}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Authentication Tab */}
        {selectedSubTab === "auth" && (
          <div style={{ animation:"fu 0.3s ease" }}>
            <div style={{ marginBottom:32, background:"#ECFDF5", padding:"24px", borderRadius:12, borderLeft:"4px solid #86B817" }}>
              <div style={{ fontSize:18, fontWeight:700, color:"#86B817", marginBottom:12 }}>
                ✓ {lang==="en"?"AUTHENTICATION MARKERS":"真贋確認ポイント"}
              </div>
              <p style={{ fontSize:16, color:"#191919", lineHeight:1.8, margin:0 }}>
                {lang==="en"?brand.auth:brand.authJp}
              </p>
            </div>

            <div style={{ background:"#FEF3C7", padding:"24px", borderRadius:12, borderLeft:"4px solid #F5AF02" }}>
              <div style={{ fontSize:18, fontWeight:700, color:"#F5AF02", marginBottom:12 }}>
                ⭐ {lang==="en"?"RARE & DISCONTINUED":"レア・廃盤情報"}
              </div>
              <p style={{ fontSize:16, color:"#191919", lineHeight:1.8, margin:0 }}>
                {lang==="en"?brand.rare:brand.rareJp}
              </p>
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {selectedSubTab === "colors" && brand.colors && brand.colors.length > 0 && (
          <div style={{ animation:"fu 0.3s ease" }}>
            <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:16 }}>
              🎨 {lang==="en"?"Signature Colors":"シグネチャーカラー"}
            </div>
            <div style={{ display:"grid", gap:16 }}>
              {brand.colors.map((color,i)=>(
                <div key={i} style={{ background:"#FFFFFF", border:"2px solid #E5E7EB", borderRadius:12, padding:"20px 24px", display:"flex", alignItems:"center", gap:20 }}>
                  <div style={{
                    width:64,
                    height:64,
                    borderRadius:12,
                    background:color.hex,
                    border:"3px solid #FFFFFF",
                    boxShadow:"0 4px 12px rgba(0,0,0,0.15)",
                    flexShrink:0
                  }} title={color.hex}></div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:18, fontWeight:700, color:"#191919", marginBottom:6 }}>
                      {color.name}
                    </div>
                    <div style={{ fontSize:14, color:"#6B7280", marginBottom:4 }}>
                      {lang==="jp" && color.nameJp}
                    </div>
                    <div style={{ fontSize:15, color:"#191919", lineHeight:1.6, fontStyle:"italic" }}>
                      "{lang==="en"?color.desc:color.descJp}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {selectedSubTab === "tips" && (
          <div style={{ animation:"fu 0.3s ease" }}>
            <div style={{ background:"#EFF6FF", padding:"24px", borderRadius:12, borderLeft:"4px solid #3665F3", marginBottom:24 }}>
              <div style={{ fontSize:18, fontWeight:700, color:"#3665F3", marginBottom:12 }}>
                💡 {lang==="en"?"PRO SELLING TIP":"プロの販売テクニック"}
              </div>
              <p style={{ fontSize:16, color:"#191919", lineHeight:1.8, margin:0, fontStyle:"italic" }}>
                "{lang==="en"?brand.tip:brand.tipJp}"
              </p>
            </div>

            <div style={{ background:"#FEF3C7", padding:"24px", borderRadius:12, borderLeft:"4px solid #F5AF02" }}>
              <div style={{ fontSize:18, fontWeight:700, color:"#F5AF02", marginBottom:12 }}>
                ⭐ {lang==="en"?"WHAT TO HIGHLIGHT":"強調すべきポイント"}
              </div>
              <p style={{ fontSize:16, color:"#191919", lineHeight:1.8, margin:0 }}>
                {lang==="en"?brand.rare:brand.rareJp}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ LIVE FRAMEWORK WRAPPER ═══ */
function LiveFrameworkP({ lang }) {
  return <LiveP lang={lang} />;
}

/* ═══ 6-STEP FRAMEWORK ═══ */
function LiveP({ lang }) {
  const [openStep, setOpenStep] = useState(0);
  const [openSec, setOpenSec] = useState(null);
  const data = LIVE_KB.framework[lang];

  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang==="en"?"6-Step Framework":"6ステップフレームワーク"}
        </h1>
        <p style={{ fontSize:16, color:"#191919", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Master eBay Live streaming with this proven 6-step framework. Each step builds on the last to maximize viewer engagement and drive sales."
            :"この実証済み6ステップフレームワークでeBayライブ配信をマスター。各ステップが次のステップの土台となり視聴者エンゲージメントを最大化し売上を促進。"}
        </p>
      </div>

      {data.map((step, si) => (
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
    </div>
  );
}

/* ═══ POLICY PAGE ═══ */
function PolicyP({ lang }) {
  return <LivePolicyP lang={lang} />;
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
  const [openType, setOpenType] = useState(null);
  const data = LIVE_KB.contentTypes[lang];

  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang==="en"?"Stream Formats":"配信形式"}
        </h1>
        <p style={{ fontSize:16, color:"#191919", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Choose the right streaming format for your audience and products. Each format serves different selling scenarios and buyer engagement strategies."
            :"視聴者と商品に最適な配信形式を選択。各形式は異なる販売シナリオとバイヤーエンゲージメント戦略に対応。"}
        </p>
      </div>

      {data.map((item, ti) => (
        <div key={ti} style={{ marginBottom:16 }}>
          <div
            onClick={()=>setOpenType(openType===ti?null:ti)}
            style={{
              background:"#FFFFFF",
              border:"2px solid #E5E7EB",
              borderRadius:12,
              padding:"20px 24px",
              cursor:"pointer",
              transition:"all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#3665F3"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <span style={{ fontSize:40, lineHeight:1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:4 }}>{item.type}</div>
                  <div style={{ fontSize:14, color:"#6B7280" }}>{item.desc}</div>
                </div>
              </div>
              <span style={{ fontSize:28, color:"#3665F3", fontWeight:300 }}>{openType===ti?"−":"+"}</span>
            </div>

            {openType===ti && (
              <div style={{ marginTop:20, paddingTop:20, borderTop:"2px solid #F7F7F7" }}>
                <div style={{ background:"#EFF6FF", padding:"16px 20px", borderRadius:8, borderLeft:"4px solid #3665F3", marginBottom:12 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"#3665F3", marginBottom:8 }}>
                    💡 {lang==="en"?"Best for":"最適な用途"}
                  </div>
                  <div style={{ fontSize:14, color:"#191919", lineHeight:1.7 }}>
                    {item.best}
                  </div>
                </div>
                <div style={{ background:"#FEF3C7", padding:"16px 20px", borderRadius:8, borderLeft:"4px solid #F5AF02" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:"#F5AF02", marginBottom:8 }}>
                    ⭐ {lang==="en"?"Pro Tip":"プロのヒント"}
                  </div>
                  <div style={{ fontSize:14, color:"#191919", lineHeight:1.7 }}>
                    {item.tip}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══ SPEECH UTILITY FUNCTIONS ═══ */
function speakWord(word, speed = 1.0) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    window.speechSynthesis.speak(utterance);
  }
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/* ═══ ENGLISH / VOCABULARY & PRONUNCIATION ═══ */
function EnglishP({ lang }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      {/* Header */}
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:36, fontWeight:700, color:"#191919", marginBottom:8 }}>
          {lang==="en"?"Professional Vocabulary":"プロフェッショナル用語集"}
        </h1>
        <p style={{ fontSize:16, color:"#191919", lineHeight:1.6, fontWeight:400 }}>
          {lang==="en"
            ?"Essential English terms for eBay Live selling. Click the speaker icon to hear pronunciation."
            :"eBayライブ販売に必須の英語用語。スピーカーアイコンをクリックして発音を聞く。"}
        </p>
      </div>

      {/* Category Accordion */}
      {VOCAB_CATS.map((cat, catIdx) => (
        <div key={catIdx} style={{ marginBottom:16 }}>
          <div
            onClick={() => setOpen(open === catIdx ? null : catIdx)}
            style={{
              background:"#FFFFFF",
              border:`2px solid ${open === catIdx ? "#3665F3" : "#E5E7EB"}`,
              borderRadius:12,
              padding:"16px 20px",
              cursor:"pointer",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              transition:"all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {cat.icon && <span style={{ fontSize:28 }}>{cat.icon}</span>}
              <div>
                <div style={{ fontSize:18, fontWeight:700, color:"#191919" }}>
                  {cat.cat}
                </div>
                <div style={{ fontSize:13, color:"#6B7280", marginTop:2 }}>
                  {cat.items.length} {lang==="en"?"terms":"用語"}
                </div>
              </div>
            </div>
            <span style={{ fontSize:20, color:"#3665F3", fontWeight:700 }}>
              {open === catIdx ? "▼" : "▶"}
            </span>
          </div>

          {/* Expanded vocabulary list */}
          {open === catIdx && (
            <div style={{
              background:"#F7F7F7",
              border:"2px solid #E5E7EB",
              borderTop:"none",
              borderRadius:"0 0 12px 12px",
              padding:"16px 20px",
              marginTop:-8,
              animation:"fu 0.3s ease"
            }}>
              {cat.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  style={{
                    background:"#FFFFFF",
                    borderRadius:8,
                    padding:"12px 16px",
                    marginBottom:8,
                    border:"1px solid #E5E7EB",
                    display:"flex",
                    alignItems:"flex-start",
                    justifyContent:"space-between",
                    gap:12
                  }}
                >
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:16, fontWeight:700, color:"#191919", marginBottom:4 }}>
                      {item.e}
                    </div>
                    <div style={{ fontSize:14, color:"#FFFFFF", fontWeight:600, background:"#86B817", padding:"4px 10px", borderRadius:6, display:"inline-block", marginBottom:8 }}>
                      {item.j}
                    </div>
                    <div style={{ fontSize:14, color:"#4B5563", lineHeight:1.6 }}>
                      {lang==="en" ? item.def : item.defJp}
                    </div>
                  </div>
                  <button
                    onClick={() => speakWord(item.e, 1.0)}
                    style={{
                      background:"#3665F3",
                      border:"none",
                      borderRadius:999,
                      width:40,
                      height:40,
                      cursor:"pointer",
                      fontSize:20,
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      flexShrink:0,
                      transition:"all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Comprehensive Condition Vocabulary */}
      <div style={{ marginTop:48 }}>
        <ConditionVocabularyViewer lang={lang} />
      </div>

      {/* Condition Training Section */}
      <div style={{ marginTop:48 }}>
        <h2 style={{ fontSize:28, fontWeight:700, color:"#1a1a2e", marginBottom:16 }}>
          🎓 {lang==="en"?"Condition Assessment Training":"コンディション評価トレーニング"}
        </h2>
        <p style={{ fontSize:15, color:"#6b7280", marginBottom:24 }}>
          {lang==="en"
            ?"Practice identifying and describing product conditions with visual examples. Essential for INAD prevention."
            :"視覚的な例で商品のコンディションを識別し説明する練習。INAD防止に必須。"}
        </p>

        {/* Condition Examples Gallery */}
        <ConditionExamplesGallery lang={lang} />

        {/* Wear Pattern Examples */}
        <WearExampleGallery lang={lang} />

        {/* Practice Scenarios */}
        <div style={{ marginTop:32 }}>
          <h3 style={{ fontSize:22, fontWeight:700, color:"#1a1a2e", marginBottom:16 }}>
            💬 {lang==="en"?"Practice Scenarios":"練習シナリオ"}
          </h3>
          <PracticeScenarioViewer scenarioType="minor-wear" lang={lang} />
          <PracticeScenarioViewer scenarioType="patina-disclosure" lang={lang} />
          <PracticeScenarioViewer scenarioType="hardware-tarnish" lang={lang} />
        </div>
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
        <AIConditionEvaluator lang={lang} onComplete={(score) => handleGameComplete(score, "aiCondition")} />
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
        <AIPhraseTranslator lang={lang} onComplete={(score) => handleGameComplete(score, "aiRephrase")} />
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
