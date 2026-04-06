# Live Selling Academy — Complete Project Handoff

## How to Use This Document

This is a complete project handoff for building a Live Selling Academy website. It contains ALL context, data, decisions, and content created across multiple sessions. Paste this entire document into a new Claude conversation or use it as a CLAUDE.md / project knowledge file in Claude Code.

---

## 1. About Kanae (The Person Building This)

### Background
- Works at eBay Japan (ebay.co.jp) in content creation, data analytics, and seller education
- Creates Japanese-language articles for eBay sellers shipping to the US
- Bilingual (Japanese native, speaks English but not as first language)
- Self-described introvert — does NOT have an outgoing live-streaming personality naturally
- Wants to learn to "perform" on camera, not change internally
- No coding or technical background, but is building AI fluency
- Uses Claude (claude.ai + Claude Code) and ChatGPT

### Work Preferences (CRITICAL)
- **HATES missing information** — never summarize or omit data. Include everything.
- **AI should be a thinking partner, not just an executor** — analyze first, recommend based on content, provide reasoning
- **Simplification is not always better** — don't reduce steps or remove detail without asking
- **Pushes back clearly** when suggestions miss the mark — corrections should be retained
- **Prefers free/simple solutions** when they meet the need
- Iterative, collaborative design with explicit versioning
- Prefers to strategize before executing

### Current Situation
- eBay Japan is doing eBay Live (live commerce) — $1 auctions for fashion/collectibles
- Kanae is expected to perform on live streams selling luxury bags
- The professional live streamer she works with does NOT read dots/underscores in buyer names — only reads the name part
- Buyers are mostly professional US resellers, not end consumers
- Reseller buyers ask about: authentication, condition details, maintenance/repair, shipping/tariffs (DDP vs DDU for items over $500)
- INAD (Item Not As Described) returns are a major concern — thorough condition description on camera is essential

---

## 2. Project Vision

### What We're Building
A website/game-like learning platform that teaches users how to become successful live commerce sellers, with a focus on fashion selling on eBay Live.

### Target Users
1. **Primary:** Japanese sellers entering US live commerce (Kanae's exact situation — language barrier + cultural style gap)
2. **Secondary:** New live sellers on any platform
3. **Tertiary:** Brands/agencies training live selling teams (B2B)

### Competitive Advantage
No one else is using AI to systematically analyze live selling videos and turn patterns into teachable curriculum.

### Tagline
"Learn live selling from the best. AI does the watching, you do the learning."

---

## 3. Site Architecture (4 Pages)

The site has 4 main sections with a Japanese/English language toggle:

### Page 1: Fashion & Brand Knowledge (👜)
- Brand history, classic models, rare/discontinued info, authentication tips
- Color dictionary with selling phrases
- Materials guide
- Shapes and structure vocabulary
- What fits inside common bag sizes

### Page 2: Live Streaming Knowledge (🎥)
- 6-step growth framework (from TikTok Creator Hub data, adapted for eBay Live)
- Platform comparison (eBay Live vs TikTok Shop vs YouTube vs Instagram)
- Content types for live streams
- Camera, lighting, background tips
- Energy management and engagement strategies

### Page 3: English Vocabulary (🔤)
- Condition descriptions (most critical for INAD prevention)
- Auction language
- Buyer Q&A templates
- eBay Live UI explanation phrases
- Styling/scene description vocabulary
- Color names with selling phrases
- Brand pronunciation guide
- Size/measurement conversion

### Page 4: Practice & Drills (🎯)
- Name reading drill (buyer ID speed reading)
- Condition description practice (with checklist scoring)
- Live simulation (scenario-based with mock buyer IDs)
- Buyer Q&A drill
- Interactive games (to be designed)

### Critical Feature Requirements
- **Images** — product photos, brand reference images (cannot learn without visuals)
- **Audio** — pronunciation playback (must hear to learn, not just read phonetics)
- **Video** — embedded examples of good live selling
- **API integration** — Claude API for AI feedback/coaching, text-to-speech for pronunciation
- **JP/EN toggle** — every piece of content available in both languages

---

## 4. Technical Plan

### Recommended Stack
- **Frontend:** Next.js + React
- **AI Layer:** Claude API (analysis, feedback, coaching) + Whisper (transcription)
- **Audio:** Web Speech API or ElevenLabs (pronunciation)
- **Database:** Supabase (free tier) — user progress, phrase library
- **Hosting:** Vercel (free)
- **Video Processing:** FFmpeg + yt-dlp (for future video analysis feature)

### Video Analysis Pipeline (Future Feature)
1. Video Input (URL or upload)
2. Audio Extraction (FFmpeg)
3. Transcription (Whisper — handles Japanese well with large-v3)
4. Chunking & Segmentation (Claude API — classify chunks by type)
5. Pattern Extraction (Claude API — identify selling phrases, techniques)
6. Key Moment Detection (custom scoring: phrase density × engagement words × transitions)
7. Insight Generation (structured report)
8. Curriculum Integration (auto-generate training content)

### Phased Roadmap
- **Phase 1 (Weeks 1-2):** Website with existing content, manual-curated
- **Phase 2 (Weeks 3-6):** Video processing pipeline, Claude API integration, 10+ video analysis
- **Phase 3 (Weeks 7-12):** Cross-video comparison, Japanese seller analysis, auto-content generation
- **Phase 4 (Month 4+):** User accounts, AI coaching, B2B, community

### Revenue Model
- Freemium training ($9.99-19.99/mo)
- Video analysis service ($29-49/analysis)
- Enterprise/B2B ($199-499/mo)
- Pattern library access ($4.99/mo)
- Quickest path: Package training content on Gumroad/Teachable while building the full platform

---

## 5. ALL CONTENT DATA

### 5A. Color Dictionary (36 colors with selling phrases)

Each color has: name, hex code, Japanese name, 3 camera-ready phrases (short, natural compliments — NOT poetic/jewelry-like explanations)

**IMPORTANT STYLE NOTE FROM KANAE:** Phrases should COMPLIMENT the color, not EXPLAIN it. No "think sunset, think autumn leaves" type descriptions. Keep it natural and brief like a real seller would say it. Examples of GOOD phrases:
- "Beautiful warm orange — very signature Louis Vuitton."
- "Such a gorgeous color. Very rich, very LV."
- "Love teal. It's bold but still classy."

#### LV Signature Colors
| Color | Hex | JP | Phrase 1 | Phrase 2 | Phrase 3 |
|-------|-----|----|----------|----------|----------|
| Sweet Orange | #E8833A | スウィートオレンジ | Beautiful warm orange — very signature Louis Vuitton. | Such a gorgeous color. Very rich, very LV. | Love this orange. It's warm and it just pops. |
| Rose Ballerine | #F4C2C2 | ローズバレリーヌ | The prettiest soft pink. So feminine. | Beautiful blush pink — very popular color for LV. | Such a delicate, lovely pink. |
| Monogram Brown | #6B4226 | モノグラムブラウン | The classic. You know it, you love it. | The most iconic color in fashion, honestly. | Timeless. Never goes out of style. |
| Damier Ebene | #3B2F2F | ダミエ エベヌ | Beautiful dark brown. Very classic, very subtle. | Great if you want LV without the big logos. | Such a rich, elegant brown. |
| Damier Azur | #D6CFC7 | ダミエ アズール | Light and fresh. Perfect for summer. | Beautiful cream and soft blue. So clean. | Love this lighter look. Very fresh. |
| Fuchsia | #C4346C | フューシャ | Bold, beautiful hot pink. It pops. | Such a fun, vibrant color. | This pink is a statement. Love it. |
| Pivoine | #D4577B | ピヴォワンヌ | Gorgeous rosy pink. Very flattering. | Beautiful pink — not too bright, not too soft. Just right. | Such a lovely shade. Very elegant. |
| Cherry Berry | #8B0A1A | チェリーベリー | Deep, rich berry red. Very luxurious. | Beautiful dark red. So rich. | Love this color. It looks expensive. |
| Marine Rouge | #1C2951 | マリンルージュ | Beautiful deep navy. Very refined. | Gorgeous dark blue. So versatile. | Like black but more interesting. |
| Noir | #1A1A1A | ノワール | Classic black. Can't go wrong. | Timeless. Works with everything. | The ultimate go-to color. |

#### Chanel Colors
| Color | Hex | JP | Phrase 1 | Phrase 2 | Phrase 3 |
|-------|-----|----|----------|----------|----------|
| Classic Black | #000000 | クラシックブラック | Nothing more classic than black Chanel. | Timeless. The best investment. | You can never go wrong with this. |
| Beige Clair | #E8D5B7 | ベージュクレール | Beautiful warm beige. So elegant. | Chanel's signature neutral. Very chic. | Gorgeous creamy tone. Very versatile. |
| Navy | #1B2A4A | ネイビー | Deep, elegant navy. Very Parisian. | Beautiful dark blue. So sophisticated. | Love navy with gold hardware. Stunning. |
| Burgundy | #6B1C23 | バーガンディ | Rich wine color. So luxurious. | Very sought-after. Beautiful deep red. | One of the best Chanel colors, honestly. |
| Red | #CC0000 | レッド | Bold, classic red. A real statement. | Chanel red is just perfect. | Confident and beautiful. |
| Light Pink | #F8C8DC | ライトピンク | Sweet, soft pink. So pretty. | Very feminine and lovely. | Beautiful for special occasions. |

#### General Fashion Colors
| Color | Hex | JP | Phrase 1 | Phrase 2 | Phrase 3 |
|-------|-----|----|----------|----------|----------|
| Cognac | #9A4E1C | コニャック | Rich, warm brown. Looks amazing. | Beautiful cognac tone. Very classic. | This brown just looks expensive. |
| Tan | #D2B48C | タン | Nice light brown. Very easy to wear. | Clean, natural tone. Goes with everything. | Perfect everyday neutral. |
| Camel | #C19A6B | キャメル | Beautiful camel. Very chic. | Love this golden brown. So elegant. | Very 'quiet luxury.' Great taste. |
| Taupe | #8B7D6B | トープ | Beautiful gray-brown. Very sophisticated. | Such a versatile color. Goes with everything. | Taupe is so underrated. Love it. |
| Ivory | #FFFFF0 | アイボリー | Warm, creamy white. Very elegant. | Softer than white. So pretty. | Beautiful ivory. Very luxurious. |
| Blush | #DE5D83 | ブラッシュ | Gorgeous rosy pink. So flattering. | Beautiful blush tone. Very feminine. | Love this pink. It's so pretty in person. |
| Coral | #FF7F50 | コーラル | Fun, warm pink-orange. Love it. | Such a cheerful color. Very fresh. | Beautiful coral. Great for summer. |
| Teal | #008080 | ティール | Beautiful blue-green. Very refreshing. | Such a stunning color. Really eye-catching. | Love teal. It's bold but still classy. |
| Olive | #556B2F | オリーブ | Nice earthy green. Very trendy right now. | Love olive. It goes with so much. | Such a cool, natural tone. |
| Oxblood | #4A0000 | オックスブラッド | Deep, dark red. Very luxurious. | Gorgeous oxblood. So rich. | Beautiful deep tone. Very elegant. |
| Mauve | #E0B0FF | モーヴ | Soft, dusty purple. Very romantic. | Beautiful mauve. So pretty. | Love this gentle purple tone. |
| Nude | #E3BC9A | ヌード | Perfect neutral. Goes with literally everything. | Beautiful nude tone. Very clean. | So versatile. You'll use this every day. |
| Slate | #708090 | スレート | Cool gray with a bit of blue. Very modern. | Nice slate tone. Very sleek. | Love this gray. It's more interesting than plain gray. |
| Chartreuse | #7FFF00 | シャルトルーズ | Bold yellow-green. Very fun, very trendy. | This color pops! Love it. | Not for everyone, but if you like bold — this is it. |

#### Hardware / Metal Colors
| Color | Hex | JP | Phrase 1 | Phrase 2 | Phrase 3 |
|-------|-----|----|----------|----------|----------|
| Gold-tone (GHW) | #D4A94E | ゴールド金具 | Beautiful gold hardware. Classic and warm. | Love gold on this. It just elevates the whole bag. | Gold hardware — always a great choice. |
| Silver-tone (SHW) | #C0C0C0 | シルバー金具 | Cool silver hardware. Very clean and modern. | Silver gives it a sleek, contemporary look. | If you prefer something cooler, silver is perfect. |
| Rose Gold (RGHW) | #B76E79 | ローズゴールド金具 | Beautiful rose gold. So pretty in person. | Love the warm, rosy glow on this hardware. | Rose gold is so popular right now. Very feminine. |
| Ruthenium | #3D3D3D | ルテニウム | Dark gunmetal finish. Very edgy, very cool. | Ruthenium hardware is unique. You don't see this often. | Love this dark hardware. It adds an edge. |
| Palladium | #A8A8A8 | パラジウム（Hermès） | Hermès palladium. Beautiful bright silver. | This is the Hermès signature silver. Very refined. | Gorgeous palladium hardware. So luxurious. |
| Brushed Gold | #C5A054 | ブラッシュドゴールド | Matte gold finish. Very understated. | Love brushed gold — it's elegant and doesn't show scratches. | A more modern, subtle take on gold. |

---

### 5B. Brand Knowledge (6 Brands)

#### Louis Vuitton
- Founded: 1854, France
- Classic Models: Speedy, Neverfull, Alma, Keepall, Pochette Accessoires, Papillon
- Rare/Discontinued: Multicolor line (Murakami collab) discontinued. Vernis in certain rare colors. Older date code pieces. LV NEVER goes on sale at retail — any "sale" LV is pre-loved or fake.
- Authentication: Date codes (pre-2021) → heat stamps with microchip (2021+). Canvas should NEVER peel on authentic LV. Stitching is always even.
- Selling tip: "LV never goes on sale. So any pre-loved LV at this price is already a steal."

#### Chanel
- Founded: 1910, France
- Classic Models: Classic Flap, Boy Bag, 2.55 Reissue, WOC (Wallet on Chain), Grand Shopping Tote (GST), Gabrielle
- Rare/Discontinued: Prices increase 2-3x per year. Classic Flap was ~$2,800 in 2010, now over $10,000. GST and PST discontinued.
- Authentication: Serial number sticker + authenticity card (pre-2021). Microchip replaces sticker (post-2021). Quilting should align at seams.
- Selling tip: "Chanel increases prices every year. Whatever you pay today, it'll be worth more tomorrow."

#### Hermès
- Founded: 1837, France
- Classic Models: Birkin, Kelly, Constance, Evelyne, Garden Party, Picotin
- Rare/Discontinued: Exotic leathers (croc, ostrich). Special orders (HSS). Limited colorways each season. Birkins are NOT sold online — you need a purchase history relationship with your SA (Sales Associate).
- Authentication: Craftsman stamp with ID, year letter, blind stamp. Hand-stitched saddle stitch (angled, not straight).
- Selling tip: "You can't just walk in and buy a Birkin. The fact that we have one here tonight is special."

#### Gucci
- Founded: 1921, Italy
- Classic Models: GG Marmont, Dionysus, Jackie, Bamboo, Ophidia, Horsebit 1955
- Rare/Discontinued: Tom Ford era pieces (1994-2004). Vintage bamboo handles. Alessandro Michele designs (now discontinued era — different eras = different collecting value).
- Authentication: Serial number tag inside (leather tab with two rows of numbers). Controllato card. Clean, even stitching.
- Selling tip: "Gucci goes through creative eras. Tom Ford pieces from the 90s? Highly collectible."

#### Prada
- Founded: 1913, Italy
- Classic Models: Re-Nylon, Galleria, Cleo, Cahier, Re-Edition 2005, Triangle
- Rare/Discontinued: Early nylon pieces from the 90s. Saffiano in discontinued colors. Re-Nylon uses recycled ocean plastic (sustainability talking point for live selling).
- Authentication: White authenticity card with number. Interior brand tag. 'PRADA' logo on hardware should be clean and crisp.
- Selling tip: "Prada Re-Nylon is made from recycled ocean plastic. Luxury AND sustainability."

#### Dior
- Founded: 1946, France
- Classic Models: Lady Dior, Saddle Bag, Book Tote, 30 Montaigne, Bobby, Diorama
- Rare/Discontinued: Vintage Lady Dior in exotic leather. Original John Galliano-era Saddle bags (2000s). Limited collab pieces.
- Authentication: 'Made in Italy' stamp. Date code inside. 'CD' charms on Lady Dior should be heavy and well-finished.
- Selling tip: "Lady Dior was created for Princess Diana in 1995. That's history you're holding."

---

### 5C. Shapes & Structure

#### Bag Shapes (15)
Rectangle (長方形), Square (正方形), Trapezoid (台形 — e.g., Céline Luggage), Circle/Round (円形), Half-moon/Crescent (半月形 — e.g., Gucci Half Moon), Bucket (バケツ型 — e.g., LV Noé), Baguette (バゲット型 — e.g., Fendi Baguette), Triangular (三角形 — Prada Triangle), Diagonal (斜め・対角線), Pentagon (五角形), Hexagon (六角形), Saddle (サドル型 — e.g., Dior Saddle), Envelope (封筒型), Cylindrical/Barrel (円筒 — e.g., LV Papillon), Hobo (ホーボー型 — slouchy crescent)

#### Pocket Types (7)
Slip pocket (差し込みポケット — open, no closure), Zip pocket (ファスナーポケット), Patch pocket (パッチポケット — sewn on outside), Hidden pocket (隠しポケット), Card slot (カードスロット), Flat pocket (フラットポケット — thin, on back), Compartment (仕切り・コンパートメント)

---

### 5D. Materials

#### Canvas
Monogram Canvas, Damier Ebene, Damier Azur, GG Supreme Canvas, Oblique Canvas

#### Leather
Calfskin (カーフスキン), Lambskin (ラムレザー), Caviar Leather (キャビアレザー — Chanel), Epi Leather (エピレザー), Vachetta (ヌメ革 — LV), Saffiano (サフィアーノ), Patent Leather (エナメル)

#### Exotic
Crocodile/Alligator, Ostrich, Python, Lizard

#### Other
Suede (スエード), Nylon (ナイロン), PVC (ビニール系), Tweed (ツイード), Denim (デニム)

---

### 5E. Condition Vocabulary (CRITICAL for INAD prevention)

#### Condition Levels
Brand new (新品), NWT - New With Tags (タグ付き新品), NWOT - New Without Tags (タグなし新品), Unused (未使用), Like new (ほぼ新品), Excellent condition (非常に良い), Very good condition (とても良い), Good condition (良い), Fair condition (使用感あり), Pre-loved (プリラブド)

#### Damage Words
Scratches (傷), Minor scratches (軽い傷), Scuffs (スレ傷), Corner wear (角スレ), Stains (シミ), Slight discoloration (軽い変色), Fading (色あせ), Peeling (剥がれ), Cracks/Cracking (ひび), Dent/Crease (へこみ・シワ), Odor (匂い), Color transfer (色移り), Water stain (水染み), Tarnishing - hardware (金具のくすみ), Patina (経年変化 — ヌメ革), Piping (パイピング — trim along edges, shows wear first), Glazing (コバ塗り — edge coating, can crack or peel), Loose stitching (ほつれ)

#### Interior/Function
Clean interior (内側きれい), No sticky pockets (ベタつきなし), Zipper works well (ファスナー正常), No major damage (大きなダメージなし), Pen marks (ペン跡), Lining (裏地)

#### Inclusions
Dust bag (保存袋), Box (箱), Authenticity card (ギャランティカード), Receipt (レシート), Care booklet (ケアカード), No accessories (付属品なし), Tags attached (タグ付き)

#### Hardware
Hardware (金具), Gold-tone/GHW (ゴールド), Silver-tone/SHW (シルバー), Rose Gold/RGHW (ローズゴールド), Ruthenium (ルテニウム — gunmetal), Palladium (パラジウム — Hermès), Zipper/Closure (ファスナー・開閉), Turn-lock (ターンロック), Clasp/Snap (留め具・スナップ)

---

### 5F. Bag Structure Vocabulary

#### Bag Types
Top handle (ハンドル), Crossbody (斜めがけ), Shoulder bag (肩掛け), Tote (トート), Clutch (クラッチ), Boston/Duffel (ボストン)

#### Strap
Strap (ストラップ), Adjustable strap (調整可能), Detachable strap (取り外し可能), Strap drop (ストラップの長さ)

#### Size
PM / Petit Modèle (小), MM / Moyen Modèle (中), GM / Grand Modèle (大), BB (ミニ), WOC - Wallet on Chain (チェーンウォレット), Mini/Small/Medium/Large, Oversized (大きめ), Compact (小さめ), Keepall 45/50/55/60 (数字=cm)

---

### 5G. Auction Language (13 phrases)

| English | Japanese | Tip |
|---------|----------|-----|
| Five seconds on the clock! | 残り5秒！ | Countdown — maximum urgency |
| Going once... going twice... | 1回目…2回目… | Classic cadence. Slow down. |
| SOLD! Congratulations! | 落札！おめでとう！ | Say with energy. Celebrate. |
| Starting at just one dollar! | 1ドルスタート！ | $1 auction opening |
| This is a steal of a lifetime! | 一生に一度のお買い得！ | $1 auction hype |
| No way — this is WAY too low! | 安すぎる！ | When bid is low. Playful, not angry. |
| Come on, folks! This retails for $500! | 定価は$500ですよ！ | Anchor to retail price |
| Who's going to take this home? | 誰がこれを持って帰る？ | Create ownership feeling |
| Can I get [amount]? Do I hear [amount]? | [金額]ありますか？ | Standard bid-asking |
| We've got a bidding war! | 競り合いです！ | Celebrate competition |
| Don't sleep on this one! | 見逃さないで！ | Quick urgency |
| Last chance before it's gone! | 最後のチャンスですよ！ | Final push |
| Put in your max bid now! | 最高入札額を入れて！ | Instruct buyers on UI |

---

### 5H. Live English Templates

#### Product Introduction (Basic)
"This is [Brand] [Model] in [Material]. It's in [condition] condition. There is [any flaws]. The interior is [clean/used]. It comes with [accessories / no accessories]."

Example: "This is Louis Vuitton Alma BB in Monogram canvas. It's in very good condition. There is minor corner wear. The interior is clean. It comes with a dust bag."

#### With Measurements
"This measures approximately [X] inches wide, [X] inches tall, and [X] inches deep. The strap drop is about [X] inches."

#### High-Value Item
"This is 100% authentic. I will show you all the details clearly — the date code, the stitching, the hardware. Please check the condition carefully. This item is eligible for eBay's Authenticity Guarantee."

#### Create Urgency
"This is a great deal. Don't miss this one. This is very popular. Hard to find in this condition."

#### Transition
"Let me move to the next item. You're going to love this one..."

#### Closing
"We're coming to the end of tonight's stream. Thank you all for being here! See you next time!"

#### DDP Shipping ($500+)
"For items over five hundred dollars, import duties and taxes are included in the price. So the price you see is the price you pay — no surprise fees at delivery."

#### Under $500 (DDU)
"For items under five hundred dollars, the buyer may be responsible for any import duties in their country."

#### Authentication Guarantee
"This item ships to an authentication center first. Once verified, it ships to you with an Authenticity Guarantee tag."

---

### 5I. Buyer Q&A Templates (11 scenarios)

| Question | Model Answer | Alternative | Category |
|----------|-------------|-------------|----------|
| Is it authentic? | Yes, this is 100% authentic. | Absolutely. You can see the date code right here. And this goes through eBay's Authenticity Guarantee. | trust |
| Any flaws? | There are minor scratches on the hardware, but overall very good condition. | Let me show you everything — there's slight corner wear here, and a small mark on the interior. Other than that, it's clean. | condition |
| Is it clean inside? | Yes, the interior is clean. No stains, no sticky pockets, no odor. | Let me open it up — see? Clean lining, no marks, no smell. | condition |
| What size is this? | This is the PM size — approximately 9 inches wide and 7 inches tall. | About 23 centimeters wide. In inches, roughly 9 inches. | size |
| Can you do $XXX? (Accept) | Yes, I can do that. Deal! | — | negotiate |
| Can you do $XXX? (Counter) | I can do [amount]. That's the best I can do. | — | negotiate |
| Can you do $XXX? (Decline) | Sorry, I'll stay at this price. It's already a great deal for this condition. | — | negotiate |
| What's your best price? | The current bid is the best price! Jump in before someone else does. | This is already well below retail. Trust me, this is a steal. | negotiate |
| Can I see it closer? | Sure! Let me show you closer. Here's the front... back... bottom... and interior. | Of course — let me zoom in. | engage |
| Does it come with box? | No, it doesn't come with the original box, but it does include the dust bag. | Yes, original box, dust bag, and authenticity card. | inclusions |
| Can you do Keepall? | Do you mean do I have a Keepall? Yes, it's coming up later! | The Keepall is in our lineup tonight! Stay tuned. | inventory |
| Can you remove that scratch? | Minor surface scratches on hardware can usually be buffed with a microfiber cloth. For leather, a professional cleaning service is best. | That's cosmetic — doesn't affect structure. A leather specialist could minimize it. | maintenance |
| How to maintain it? | Store stuffed with tissue in the dust bag. Away from sunlight. Leather conditioner every few months. | Store it properly — stuffed, in dust bag, cool dry place. | maintenance |

---

### 5J. eBay Live UI Explanation Phrases (7)

| English | Japanese |
|---------|----------|
| When comments get busy, tap the screen to hide the chat and see the item clearly. | コメントが多い時は画面タップでチャットが消えてアイテムがよく見えます。 |
| At the bottom of your screen, you'll see the item pinned — tap it to place your bid. | 画面下部にアイテムが固定表示。タップして入札。 |
| You can set your maximum bid — eBay will bid for you up to that amount. | 最高入札額を設定できます。eBayが自動入札。 |
| If you're new, hit that follow button so you don't miss our next stream! | 初めての方はフォローボタンを押して！ |
| You can see the current bid and time remaining right on your screen. | 現在の入札額と残り時間が画面に表示。 |
| Items that qualify ship through eBay's Authenticity Guarantee — look for the blue checkmark. | 対象アイテムはeBay認証を通じて発送。青いチェックマーク。 |
| Swipe up to see all the items in tonight's lineup. | 上にスワイプで今夜の全アイテム。 |

---

### 5K. Scene & Occasion Descriptions (9)

| Scene | JP | Example Phrase |
|-------|-----|----------------|
| Night out | 夜のお出かけ | This clutch is perfect for a night out — fits your phone, cards, and lipstick. |
| Date night | デートの夜 | Elegant enough for a date night dinner. |
| Everyday carry | 毎日使い | Great for everyday carry — fits everything you need. |
| Work / Office | 仕事・オフィス | Professional enough for the office. Fits a laptop and documents. |
| Travel | 旅行 | Perfect travel companion — fits in the overhead bin. |
| Brunch / Casual | ブランチ | Throw it on for brunch or running errands. |
| Wedding / Formal | 結婚式 | Elegant enough for a wedding or formal event. |
| Weekend getaway | 週末旅行 | The Keepall is your perfect weekend bag. |
| Shopping trip | お買い物 | Roomy enough for a shopping trip! |

### What Fits Inside (with sizes)
iPhone (~6.1"/15.5cm), Lipstick (~3"/7.5cm), Wallet (~7.5"/19cm), Sunglasses case (~6"/15cm), Keys, Water bottle (~9"/23cm tall), Paperback book (~7×5"/18×13cm — US size, different from Japanese bunkobon), iPad Mini (~7.7"/19.5cm), 13" Laptop (~12×8.5"/30×22cm), Makeup pouch (~8×5"/20×13cm), Compact umbrella (~9"/23cm)

---

### 5L. Size & Body Conversion

#### Kanae's measurements
- Height: 157cm = 5'2" (five foot two)
- Camera phrase: "I'm five foot two for reference, and this bag hits right at my hip."

#### Quick reference
- 1 inch ≈ 2.54 cm
- 1 foot = 12 inches
- 1 lb ≈ 0.45 kg

#### Common Bag Sizes
| Item | Inches (W×H×D) | Centimeters |
|------|----------------|-------------|
| Alma BB | 9.4" × 7.1" × 4.3" | 24 × 18 × 11 cm |
| Neverfull PM | 11.4" × 8.7" × 5.1" | 29 × 22 × 13 cm |
| Neverfull MM | 12.6" × 11.4" × 6.7" | 32 × 29 × 17 cm |
| Keepall 55 | 21.7" × 12.2" × 9.4" | 55 × 31 × 24 cm |
| Chanel Classic Medium | 10" × 6.3" × 2.8" | 25.5 × 16 × 7 cm |
| Gucci Marmont Mini | 8.5" × 5" × 2.5" | 22 × 13 × 6 cm |

---

### 5M. Brand Pronunciation (12 brands)

| Brand | Correct | Common Mistake |
|-------|---------|----------------|
| Louis Vuitton | loo-ee vwee-TAWN | loo-is vuh-ton |
| Hermès | air-MEZ | her-meez |
| Givenchy | zhee-von-SHEE | gih-VEN-chee |
| Balenciaga | bah-len-see-AH-gah | bal-en-SEE-gah |
| Yves Saint Laurent | eev san loh-RAHN | ives saint LAW-rent |
| Loewe | loh-EH-veh | low |
| Versace | ver-SAH-cheh | ver-SAYSS |
| Goyard | goy-ARD | go-yard |
| Moschino | mos-KEE-noh | mosh-EE-noh |
| Bottega Veneta | bo-TEH-gah veh-NEH-tah | bah-TEE-gah |
| Cartier | kar-tee-AY | KAR-tee-er |
| Bvlgari | BULL-gah-ree | bul-GAR-ee |

---

### 5N. Extra Vocabulary (from Kanae's live watching notes)

#### Live Actions
Call out (名前を呼ぶ), Pin an item (固定表示), Shout out (紹介), Drop a comment (コメントして), Smash that follow button (フォロー押して)

#### Bag Details
Piping (パイピング — trim along edges, shows wear first), Scuff (スレ傷), Glazing (コバ塗り — edge coating), Embossing (型押し), Debossed (刻印 — pressed IN), Stitching (ステッチ), Lining (裏地), Tab (タブ — e.g., zipper pull)

#### Fashion Styling Words
Pair it with (〜と合わせる), Dress it up/down (フォーマル/カジュアルに), Goes with everything (何にでも合う), Statement piece (主役アイテム), Timeless (時代を超えた定番), Iconic (アイコニック), Effortless (さりげない)

#### eBay / Listing Terms
BIN - Buy It Now (即決), Auction (オークション), Starting bid (開始価格), Listing (出品), Item specifics (スペック欄), Inventory (在庫), Marquee / Pre-listing (事前出品 — Live用語)

#### Live Specific Terms
Host (配信者), Event (ライブイベント), Pin (商品固定表示), Carousel / Item lineup (商品一覧), Purchasable (購入可能), Visible (表示状態)

#### Kanae's specific struggles noted
- "Can you do Keepall?" = "Do you have a Keepall?" or "Can you sell one?"
- "Can you do $XXX?" = price negotiation
- BB / PM = size notation that confused her
- Marquee = eBay Live pre-listing term
- "Five seconds on the clock" = didn't know this phrase, important for auctions
- "A steal of a lifetime" = $1 auction description
- Inch/pound measurements (Japan uses metric)
- Sweet Orange, Cognac, Taupe etc = color names she'd never heard before

---

### 5O. eBay Live Specific Vocabulary

#### Buyer Types
- Most buyers are professional US resellers (not end consumers)
- They ask about: authentication, maintenance, repair feasibility, shipping details
- They want to know if flaws can be fixed for resale

#### Condition Practice Scenarios (4 bags)

**Scenario 1: LV Neverfull MM**
Condition: Pre-loved, Good
Details: Canvas clean no cracks/peeling | Vachetta handles honey patina | Light water stain bottom left vachetta | Gold hardware minor scratches | Interior clean | Dust bag included, no box | Date code SD4189
Must mention: canvas, handles/patina, water stain, hardware, interior, inclusions, date code
Maintenance tips: Patina is normal/desirable | Water stains can be minimized with conditioner | Hardware scratches can be buffed
Auth note: Items over $200 go through Authenticity Guarantee

**Scenario 2: Chanel Classic Flap Medium**
Condition: Pre-loved, Excellent
Details: Caviar leather excellent no scuffs | CC turn-lock hairline scratches | Chain strap no kinks | Small pen mark inside back pocket | Minimal corner wear | Auth card + dust bag + box | Serial sticker intact
Must mention: leather, turn-lock, chain, interior stain, corners, inclusions, serial
Maintenance: Caviar is durable/scratch-resistant | Pen marks sometimes lifted with leather eraser | Store stuffed

**Scenario 3: Coach Tabby Shoulder 26**
Condition: NWT
Details: Brand new tags attached | Pebbled leather flawless | Brass hardware protective film on | Interior clean unused | Dust bag + care card + gift box | Magnetic snap, adjustable strap
Must mention: NWT status, tags, leather, hardware film, interior, inclusions

**Scenario 4: Gucci Marmont Mini**
Condition: Pre-loved, Shows Wear
Details: Quilting slightly softened | Double G hardware visible scratches + tarnishing | Small dent on back from storage | Strap darkening at fold points | Interior suede light marks + color transfer | No dust bag no box | Made in Italy stamp
Must mention: quilting, hardware, dent, strap, interior, no inclusions, made in Italy
Maintenance: Tarnishing needs pro service | Storage dents relax with stuffing/time | Suede refresh with brush

---

## 6. Live Streaming Knowledge (TikTok Creator Hub → Adapted for eBay Live)

### 6-Step Growth Framework

**These are applicable principles from TikTok's Creator Hub education program, filtered for relevance to eBay Live fashion selling.**

#### Step 1: Exposure (露出)
**Streaming Frequency**
- Minimum 3x per week, ideal 5x
- Mere exposure effect (単純接触効果): repeated contact builds familiarity → fans
- Streaming only once a month means viewers can never become regulars
- Top creators: 5+ days/week, 35+ total hours

**Streaming Duration**
- Minimum 2 hours for meaningful growth
- Longer streams = more chances for new viewers to discover you
- Data shows top creators have high engagement AND high stream time
- 45-minute rule: a tight high-energy 45 minutes beats a rambling 2-hour stream

**Time Fixation & Routine**
- Fix your streaming schedule like a TV show — viewers form habits around your time
- Real example: Creator Sakurakawa Shu streamed at the same time daily → got regular viewers within 2 weeks
- Her quote: "It's like a TV show. If the time isn't fixed, viewers don't know when to come."
- Stream at YOUR natural energy peak — if you're a morning person, don't schedule 10 PM

**Promotion / Advance Notice**
- Post teasers 24 hours and 1 hour before going live
- Use platform scheduling features (LIVE Events on TikTok, eBay event scheduling)
- Add reminder stickers on short-form video posts
- Cross-promote on Twitter/X, Instagram, YouTube
- Real example: SATOYU (3M TikTok followers) posts on X before every stream

#### Step 2: First Impression (第一印象)
**Profile Setup**
- Icon: high quality photo, clear face, simple background
- Account name: simple, searchable, memorable — don't change frequently
- Profile bio: who you are + what you stream + when you stream
- Consistency = recognition. Frequent changes confuse viewers.

**Stream Title & Cover**
- Title + cover image are the first things potential viewers see — huge impact on whether they enter
- Include trending topics or clear description of what's being sold
- Set the right content category/topic for algorithm matching

**Background & Appearance**
- Clean, simple background (wall or curtain recommended)
- Avoid messy, cluttered backgrounds showing too much personal life
- Add useful info to background (event details, messages to viewers)
- Dress to match your brand/character — no pajamas or sloppy clothes
- Good lighting is essential: ring light recommended
- Camera position: eye level or slightly above

**First 3 Minutes Are Critical**
- Algorithms evaluate your stream quality in the first few minutes
- Start with high energy — don't ease in slowly
- Warm up with casual conversation before jumping into selling/performing
- Greet early viewers by name immediately — they chose to be there early

#### Step 3: Retention / Watch Time (滞在時間)
**Call Viewers by Name**
- People stay significantly longer when they feel personally recognized
- Even viewers who are NOT called will stay hoping they'll be called next
- Read the username → find the readable name part → greet naturally
- Example: "Hey [readable name], welcome! Love your icon!" / "○○さん、こんにちは！アイコン可愛い！"
- Comment responder Mii (@mii_311_) always reads the commenter's name first before responding — builds personal connection

**Content Structure**
- Structure your stream like a TV show: intro → main content → interaction → closing
- Spend 5-10 minutes per product/topic — don't linger too long on one thing
- Alternate camera angles constantly: face → product close-up → back of item → interior
- Mix formats: talk → showing item → Q&A → talk → next item
- Real example: A doll creator structures 2-3 hour streams as: 1 hour performance + 30 min storytelling + 30-60 min comment responses

**Energy Management**
- Cover the viewer count with a sticky note — focus on connection with whoever is there
- If 5 people showed up to your physical store, you'd be thrilled — think of it that way
- Energy dip? Switch camera angles, throw in a quick poll/trivia, tease the next item
- End the stream strong — don't let it fade out. Your last impression matters.
- Your tiredness is visible to viewers and it kills the buying mood
- Prepare 20% more items/content than you plan to show — better to end with extras than run out

**Treasure Box / Surprise Strategy (adapted for eBay)**
- On TikTok, "treasure boxes" let viewers split coins — creating "when will it drop?" anticipation
- For eBay Live: surprise flash deals, unexpected bonus items, or special pricing at random times serve the same purpose
- Irregular timing creates longer viewer retention — people stay because "something might happen"

#### Step 4: Engagement (エンゲージメント)
**Comment/Interaction KPIs (TikTok benchmarks, adaptable to eBay)**
- 300 unique commenters/week = stable income level
- 600 unique commenters/week = standard goal for growth
- 1,000 unique commenters/week = top creator territory
- The key metric: comments should NEVER stop flowing during a stream
- More comments/interaction = more algorithmic visibility = more new viewers find you

**Techniques for Driving Engagement**
- Ask open questions: "What do you think about this color?"
- Ask choice/poll questions: "Would you carry this to work or save it for weekends?"
- Poll format: "Type 1 if you love this, type 2 if you'd pass!"
- Respond with viewer names: "[Name], great question! Let me show you..."
- Use trending topics or current events as conversation starters — check news before streaming
- End streams with: "Tell me what you want to see next time!" — creates a bridge to the next session

**Moderators (very applicable to eBay Live)**
- Have 2-3 moderators who actively participate in chat
- Their energy and consistent commenting keeps other viewers engaged
- Real example: Creator Tsumu has 3 moderators whose fun comments keep the chat lively — "comments never stop"
- Moderators can also manage trolls, spam, and inappropriate comments
- Consider having a moderator who understands both English and Japanese

#### Step 5: Retention / Return Visits (リテンション)
**Follower Strategy**
- Benefits of followers: push notifications when you go live, ability to share your streams, more likely to gift/buy
- Regularly remind viewers to follow — but NEVER offer rewards for following (this is against platform rules)
- Consider mutual following with key viewers: moderators, frequent buyers, core supporters
- Connect your social media accounts in your profile for cross-platform discovery

**Notification Setup**
- Actively remind viewers to turn on LIVE notifications — many have this OFF by default
- Both the app notification AND the phone's push notification settings may need to be turned on
- Use platform scheduling features to let viewers set reminders for your streams
- Post short preview videos with countdown/reminder features before going live

**Self-Introduction (Proven Revenue Driver)**
- Do a self-introduction every 30 minutes during your stream — data shows this increases revenue
- New viewers are constantly joining — they don't know who you are or what you're selling
- Template: Your name + What you sell + When you stream + Any current event/promotion
- Advanced: develop a unique signature intro that reflects your personality

**Collaboration**
- Collaborate with other streamers to share audiences/followers
- Cross-cultural collaborations can open entirely new viewer bases
- Even simple multi-language greetings create connection with international viewers
- Real example: Creator Setsuna (450K followers) learned basic greetings in 4 languages → international following grew significantly. Her insight: "Gestures help, but speaking their language is what really matters."

#### Step 6: Monetization (マネタイズ)
**Communication Priority Order**
- First priority: Gifters/Buyers → acknowledge and celebrate them
- Second: New viewers → welcome and engage
- Third: Regular viewers → maintain connection
- React to EVERY gift/purchase — show genuine excitement and gratitude
- Longer watch time = deeper emotional connection = more willingness to buy/gift
- Core fans who watch longest are most likely to become repeat buyers

**Content Repurposing**
- Clip your best stream moments → post as TikTok, Reels, YouTube Shorts
- These short clips bring new viewers to your next live stream
- Plan short video content deliberately — don't just randomly clip
- Establish a consistent character/concept and maintain it across all content

### Platform Comparison

#### eBay Live
- $1 auction format creates excitement and competitive bidding
- Authenticity Guarantee program for luxury items (auto for items over certain thresholds)
- Audience is predominantly professional US resellers — they're knowledgeable and ask detailed questions
- Bidding UI needs to be explained to new viewers
- Fashion and collectibles focus
- DDP shipping for items over $500 (duties included in price)

#### TikTok Shop
- Younger audience, very fast-paced selling style
- Need 1,000 followers to access live streaming
- Algorithm-driven discovery — good content gets pushed to new audiences
- Pin products on screen for easy purchasing
- High engagement = more distribution by algorithm

#### YouTube Live
- Longer format is acceptable and even preferred
- Excellent for detailed product demonstrations and education
- Content remains searchable after stream ends (SEO value)
- Existing subscriber base provides reliable viewership
- Good for educational content about fashion/authentication

#### Instagram Live
- Best for leveraging existing follower base
- Strong in fashion and beauty categories
- DM-based purchasing workflow
- Story promotion is very effective for driving live viewership
- Built-in collaboration features for co-streaming

### Content Types (Adapted for eBay Live)

| Type | Description | Best For | Key Tip |
|------|-------------|----------|---------|
| Product Showcase | Main selling content — showing and describing items | Core of eBay Live | Never just describe — add emotion, stories, styling tips |
| Chat / Q&A | Answering viewer questions, casual conversation | Building rapport between items | Keep it flowing, don't let silence happen |
| While-Doing | Unpacking, organizing, preparing items while chatting | Filling time naturally | Think of yourself as a small shop owner chatting with customers |
| Educational | Teaching about brands, authentication, fashion knowledge | Building authority | High prep but builds trust and expertise perception |

### Troll / Harassment Management (荒らし対策)
- **Pre-stream:** Set up keyword blocking for offensive words/phrases in platform settings
- **During stream:** Don't react emotionally to trolls — their goal is to provoke you into anger/argument
- **Have moderators** who can mute, block, or report problematic users in real-time
- **Remember:** TikTok/eBay Live has international viewers with different cultural norms — not everyone who seems rude intends to be
- **Key principle:** Keep the energy positive. Address issues calmly, then move on. Don't let one bad actor ruin the experience for everyone else.

---

## 7. Condition Description Practice (INAD Prevention)

### Why This Matters
- INAD (Item Not As Described) returns are covered by seller — seller pays return shipping
- If you don't describe every flaw on camera, buyers can claim INAD for anything you missed
- Over-disclosure PROTECTS you — describe MORE than necessary, not less
- Buyers are professional resellers who will scrutinize every detail

### Condition Description Checklist (use for every item)
1. ☐ Exterior material condition (canvas/leather — cracks, peeling, scratches)
2. ☐ Corners (wear, scuffs)
3. ☐ Handles/straps (patina, darkening, cracking, kinks)
4. ☐ Hardware (scratches, tarnishing, functionality)
5. ☐ Interior (clean? stains? pen marks? odor? sticky pockets?)
6. ☐ Stitching (loose? even?)
7. ☐ Structure (holds shape? slouching?)
8. ☐ Piping/glazing condition
9. ☐ Inclusions (dust bag, box, cards, receipt — list what IS and ISN'T included)
10. ☐ Authentication markers (date code, serial number, stamps)
11. ☐ Measurements (width × height × depth in inches)

### Common Maintenance Questions from Reseller Buyers
- "Can this scratch be removed?" → Minor hardware scratches can be buffed with microfiber cloth. Leather needs professional service.
- "How should I store it?" → Stuffed with tissue, in dust bag, cool dry place, away from sunlight.
- "Can the patina be cleaned?" → Vachetta patina is normal and many consider it desirable. It can be lightened but not fully reversed.
- "Is the interior stain removable?" → Pen marks sometimes respond to leather erasers. Professional cleaning recommended for other stains.
- "Can peeling canvas be repaired?" → On authentic LV, canvas should never peel. If peeling, it may indicate a counticity issue or extreme damage. Professional repair is very expensive.

---

## 8. Mock Buyer IDs for Practice (36 realistic eBay-style names)

sarah_luxelover, BagFlipperTX, PurseQueen_NYC, LuxResale_Amy, xXbagladyXx, thrift_king_dave, mike.deals, jenny2024bags, DesignerDave99, ChicFinds_Lisa, 2good2btrue, shopaholic.sam, CoachLover_FL, LV4Life_Cali, Reseller_Rob, sparkle_queen, deal.sniper.77, BoutiqueBliss, FancyFinds_OH, CoutureCarl, AuthentikKate, bargin_betty, PoshPicks_Sue, FlipQueen_Bri, VintageVibes_Joe, GlamGrab_Maria, TreasureHunt_Em, BrandNewBeth, HighEndHank, TheBagDoctorr, flippin.fantastic, ClosetCleanout, BagObsessed_AZ, drip.drop.deals, luxe_finds_chi, StyleHunter_K

**Reading rule:** Do NOT read dots, underscores, or numbers. Only read the name part. Example: "sarah_luxelover" → "Hey Sarah, welcome!"

---

## 9. Information Transfer Methods

### Method 1: Claude → Different Claude Account
1. Download this handoff document
2. Start a new conversation in the other Claude account
3. Upload/paste this entire document as the first message
4. Add: "This is a complete project handoff. Please read everything and confirm you understand the full context before we proceed."

### Method 2: Claude → Claude Code
1. Create a new project directory
2. Save this document as `HANDOFF.md` in the project root
3. In Claude Code, run: `cat HANDOFF.md` to load context
4. Or better: Create a `CLAUDE.md` file (Claude Code's built-in context file) with the key sections
5. Store the detailed data (colors, vocab, brands) as JSON data files that the code can import

### Recommended Claude Code Project Structure
```
live-selling-academy/
├── CLAUDE.md          ← Key project context (sections 1-4 of this doc)
├── HANDOFF.md         ← This full document
├── data/
│   ├── colors.json    ← All 36 colors with hex, JP, phrases
│   ├── brands.json    ← 6 brands with all details
│   ├── vocab.json     ← All vocabulary categories
│   ├── auction.json   ← Auction phrases
│   ├── templates.json ← English templates
│   ├── qa.json        ← Buyer Q&A scenarios
│   ├── live-tips.json ← 6-step framework content
│   └── buyers.json    ← Mock buyer IDs
├── src/
│   ├── app/           ← Next.js pages
│   ├── components/    ← React components
│   └── lib/           ← Utilities, API helpers
├── public/
│   ├── images/        ← Product/brand reference images
│   └── audio/         ← Pronunciation audio files
└── package.json
```

---

## 10. What to Build First in Claude Code

1. **Set up Next.js project** with the 4-page structure and JP/EN toggle
2. **Import all data** from JSON files (don't hardcode in components)
3. **Color Selling Guide** with actual color swatches + phrases (already validated by Kanae)
4. **Brand Knowledge pages** with image placeholders (to be filled with real photos)
5. **Vocabulary reference** with search
6. **Practice drills** (name reading, condition description)
7. **Add TTS** (text-to-speech) for pronunciation
8. **Deploy to Vercel** for testing
9. **Iterate based on Kanae's feedback**

---

END OF HANDOFF DOCUMENT
