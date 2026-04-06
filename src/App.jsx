import { useState, useEffect } from "react";

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
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash ? parseInt(hash) : 0;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const tabs = lang==="en" ? ["Home","Product Knowledge","Selling Strategies","Vocabulary Guide","Training"] : ["ホーム","商品知識","販売戦略","用語ガイド","トレーニング"];
  const icons = ["🏠","👜","📚","💬","🎯"];

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
    <div style={{ minHeight:"100vh", background:"#F7F7F7", fontFamily:"'Market Sans','Noto Sans JP',sans-serif", color:"#191919", display:"flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet"/>
      <link href="https://use.typekit.net/ivu7epf.css" rel="stylesheet"/>
      <style>{`@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:#f1f1f1}::-webkit-scrollbar-thumb{background:#888;border-radius:4px}::-webkit-scrollbar-thumb:hover{background:#555}`}</style>

      {/* Sidebar Navigation */}
      {sidebarOpen && (
        <div style={{ width:280, background:"#FFFFFF", boxShadow:"2px 0 8px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh" }}>
          {/* Logo */}
          <div style={{ padding:"32px 24px", borderBottom:"1px solid #F7F7F7", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div onClick={()=>setPage(0)} style={{ cursor:"pointer" }}>
              <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:2, fontFamily:"'Market Sans','Noto Sans JP',sans-serif" }}>
                {lang==="en"?"eBay Live":"eBay Live"}
              </div>
              <div style={{ fontSize:14, color:"#191919", fontWeight:400 }}>
                {lang==="en"?"Academy":"アカデミー"}
              </div>
            </div>
            <button onClick={()=>setSidebarOpen(false)} style={{ background:"transparent", border:"none", fontSize:20, cursor:"pointer", color:"#191919", padding:"4px" }}>
              ◀
            </button>
          </div>

        {/* Nav Items */}
        <div style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
          {tabs.map((tab,i) => (
            <button key={i} onClick={()=>setPage(i)} style={{ width:"100%", padding:"14px 16px", marginBottom:4, borderRadius:8, background:page===i?"#3B1FC6":"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:15, fontWeight:page===i?700:400, display:"flex", alignItems:"center", gap:12, color:page===i?"#FFFFFF":"#191919", transition:"all 0.2s", textAlign:"left" }}>
              <span style={{ fontSize:20 }}>{icons[i]}</span>
              <span>{tab}</span>
            </button>
          ))}
        </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex:1, background:"#ffffff", overflowY:"auto" }}>
        {/* Top Bar with Menu + Language Toggle */}
        <div style={{ padding:"20px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #F7F7F7" }}>
          {!sidebarOpen && (
            <button onClick={()=>setSidebarOpen(true)} style={{ background:"#F7F7F7", border:"none", padding:"10px 16px", borderRadius:8, cursor:"pointer", fontSize:16, color:"#191919", fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
              ☰ <span>{lang==="en"?"Menu":"メニュー"}</span>
            </button>
          )}
          {sidebarOpen && <div></div>}
          <div onClick={()=>setLang(lang==="en"?"jp":"en")} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", userSelect:"none", padding:"8px 12px", background:"#F7F7F7", borderRadius:6 }}>
            <span style={{ fontSize:14, color:lang==="en"?"#4CE160":"#191919", fontWeight:lang==="en"?700:400 }}>EN</span>
            <div style={{ width:42, height:22, borderRadius:20, background:lang==="jp"?"#4CE160":"#E0E0E0", position:"relative", transition:"all 0.3s" }}>
              <div style={{ width:16, height:16, borderRadius:"50%", background:"#FFF", position:"absolute", top:3, left:lang==="jp"?23:3, transition:"all 0.3s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}></div>
            </div>
            <span style={{ fontSize:14, color:lang==="jp"?"#4CE160":"#191919", fontWeight:lang==="jp"?700:400 }}>JP</span>
          </div>
        </div>

        <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 48px" }} key={`${page}-${lang}`}>
          {page===0 && <HomeP lang={lang} setPage={setPage} />}
          {page===1 && <FashionP lang={lang} />}
          {page===2 && <LiveP lang={lang} />}
          {page===3 && <EnglishP lang={lang} />}
          {page===4 && <PracticeP lang={lang} />}
        </div>
      </div>
    </div>
  );
}

/* ═══ HOME ═══ */
function HomeP({ lang, setPage }) {
  return (
    <div style={{ animation:"fu 0.4s ease" }}>
      <div style={{ marginBottom:48 }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🎯</div>
        <h1 style={{ fontSize:42, fontWeight:700, marginBottom:16, color:"#191919", lineHeight:1.2, fontFamily:"'Market Sans','Noto Sans JP',sans-serif" }}>
          {lang==="en"?"Welcome to eBay Live Academy":"eBay Liveアカデミーへようこそ"}
        </h1>
        <p style={{ fontSize:18, color:"#191919", lineHeight:1.7, maxWidth:800, fontWeight:400, marginBottom:24 }}>
          {lang==="en"
            ?"Your complete training platform for becoming a successful eBay Live seller. Master luxury fashion knowledge, live streaming techniques, and professional vocabulary to engage B2B reseller buyers."
            :"成功するeBay Liveセラーになるための完全なトレーニングプラットフォーム。高級ファッション知識、ライブ配信テクニック、プロフェッショナルな用語を習得し、B2Bリセラーバイヤーを惹きつけます。"}
        </p>
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
function LiveP({ lang }) {
  const [view, setView] = useState("framework"); // framework, platforms, content
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
            ?"Master live streaming techniques to engage viewers and drive sales. Based on proven frameworks from TikTok Creator Hub and live commerce best practices."
            :"視聴者を惹きつけ売上を上げるライブ配信テクニックをマスター。TikTok Creator Hubとライブコマースのベストプラクティスに基づく実証済みフレームワーク。"}
        </p>
      </div>

      {/* Sub-nav */}
      <div style={{ display:"flex", gap:12, marginBottom:24, borderBottom:"2px solid #F7F7F7", paddingBottom:4 }}>
        {[["framework",lang==="en"?"6-Step Framework":"6ステップ"],["platforms",lang==="en"?"Platform Comparison":"プラットフォーム比較"],["content",lang==="en"?"Stream Types":"配信タイプ"]].map(([k,l])=>(
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

      {/* PLATFORMS */}
      {view==="platforms" && LIVE_KB.platforms[lang].map((p,i) => (
        <div key={i} style={{ background:"#FFFFFF", borderRadius:12, padding:"20px 24px", marginBottom:12, border:"2px solid #F7F7F7" }}>
          <div style={{ fontSize:20, fontWeight:700, color:"#191919", marginBottom:12 }}>{p.emoji} {p.name}</div>
          <div style={{ display:"grid", gap:8 }}>
            {p.points.map((pt,j)=><div key={j} style={{ fontSize:15, color:"#191919", lineHeight:1.7, paddingLeft:16, borderLeft:"3px solid #4CE160", fontWeight:400 }}>{pt}</div>)}
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

      <div style={{ display:"grid", gap:16 }}>
        {VOCAB_CATS.map((cat,ci)=>(
          <div key={ci} style={{ background:"#FFFFFF", border:"1px solid #F7F7F7", borderRadius:12, overflow:"hidden" }}>
            <div onClick={()=>setOpen(open===ci?null:ci)} style={{ padding:"18px 24px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", background:open===ci?"#F7F7F7":"#FFFFFF", transition:"all 0.2s" }}>
              <span style={{ fontSize:17, fontWeight:700, color:"#191919" }}>{cat.cat}</span>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:13, color:"#191919", background:"#4CE160", padding:"4px 12px", borderRadius:6, fontWeight:700 }}>{cat.items.length}</span>
                <span style={{ fontSize:16, color:"#191919" }}>{open===ci?"▼":"▶"}</span>
              </div>
            </div>
            {open===ci && (
              <div style={{ padding:"8px 0" }}>
                {cat.items.map((x,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"14px 24px", borderTop:i===0?"1px solid #F7F7F7":"none", background:i%2===0?"#FAFAFA":"#FFFFFF" }}>
                    <span style={{ fontSize:15, color:"#191919", flex:1, fontWeight:500 }}>{x.e}</span>
                    <span style={{ fontSize:14, color:"#191919", textAlign:"right", maxWidth:"45%", fontWeight:400 }}>{x.j}</span>
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
