/**
 * Comprehensive Condition Vocabulary
 * Detailed luxury bag condition terms with repair/care tips
 * Each condition includes: definition, identification tips, severity grading, and care instructions
 */

export const CONDITION_VOCABULARY = [
  {
    id: 'white-rot',
    term: {
      en: 'White Rot',
      jp: 'ホワイトロット'
    },
    category: 'canvas-damage',
    severity: 'critical',
    description: {
      en: 'Canvas deterioration where the coating breaks down, revealing white chalky powder underneath. Common in Chanel bags due to canvas delamination.',
      jp: 'コーティングが分解し、下の白い粉状のものが現れるキャンバスの劣化。シャネルバッグでキャンバスの剥離により一般的。'
    },
    howToIdentify: {
      en: [
        'White chalky powder or residue on black canvas',
        'Rough texture where coating has worn away',
        'Most common on bag corners and edges',
        'Cannot be wiped away (unlike dust)',
        'Often appears as white streaks or patches'
      ],
      jp: [
        '黒いキャンバスに白い粉状の残留物',
        'コーティングが剥がれた部分の粗い質感',
        'バッグの角と縁に最も一般的',
        '拭いても取れない（ホコリとは異なる）',
        '白い筋や斑点として現れることが多い'
      ]
    },
    commonBrands: ['Chanel', 'Dior'],
    repairTips: {
      en: [
        '❌ CANNOT BE FULLY REPAIRED - this is permanent damage',
        'Professional restoration can re-coat the canvas (expensive)',
        'DIY: Use black leather paint to cover small areas temporarily',
        'Leather conditioner will NOT fix this - it\'s canvas damage',
        'Prevention: Store bags in dust bag, avoid humidity'
      ],
      jp: [
        '❌ 完全には修復不可能 - これは永久的な損傷',
        'プロの修復でキャンバスを再コーティング可能（高額）',
        'DIY: 小範囲なら黒いレザーペイントで一時的にカバー',
        'レザーコンディショナーでは直らない - これはキャンバス損傷',
        '予防: ダストバッグに保管、湿気を避ける'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show close-up of affected area, demonstrate it cannot be wiped away, compare to unaffected area. Say: "This bag has white rot on the corners - you can see the white chalky residue where the coating has worn away. This is permanent canvas damage common in vintage Chanel."',
      jp: '影響を受けた部分のクローズアップを見せ、拭いても取れないことを実演し、影響を受けていない部分と比較。言う：「このバッグの角にホワイトロットがあります - コーティングが剥がれた部分に白い粉状の残留物が見えます。これはヴィンテージシャネルに一般的な永久的なキャンバス損傷です。」'
    },
    images: 3 // Number of example images to generate
  },
  {
    id: 'patina-light',
    term: {
      en: 'Light Patina',
      jp: 'ライトパティーナ'
    },
    category: 'vachetta-aging',
    severity: 'minimal',
    description: {
      en: 'Natural darkening of untreated vachetta leather, developing a honey color. This is DESIRABLE and shows authenticity.',
      jp: '未処理のヴァシェッタレザーの自然な色の変化で、ハニーカラーに。これは望ましく、本物の証。'
    },
    howToIdentify: {
      en: [
        'Light honey to tan color on vachetta (vs original cream)',
        'Even color development across handles/trim',
        'Smooth texture, not sticky or damaged',
        'Most visible on Louis Vuitton handles and trim',
        'Develops over 6-12 months of use'
      ],
      jp: [
        'ヴァシェッタが元のクリーム色からライトハニー～タン色に',
        'ハンドル/トリム全体に均一な色の変化',
        '滑らかな質感、べたつきや損傷なし',
        'ルイ・ヴィトンのハンドルとトリムで最も目立つ',
        '使用6-12ヶ月で発生'
      ]
    },
    commonBrands: ['Louis Vuitton', 'Goyard'],
    repairTips: {
      en: [
        '✅ NO REPAIR NEEDED - this is natural and desirable!',
        'Frame it positively: "beautiful honey patina"',
        'Even out patina: expose bag to indirect sunlight evenly',
        'Clean with leather cleaner if dirty, but patina will remain',
        'Prevention: Use bag less frequently for lighter patina'
      ],
      jp: [
        '✅ 修復不要 - これは自然で望ましい！',
        'ポジティブに表現：「美しいハニーパティーナ」',
        'パティーナを均一に: バッグを間接光に均等に露出',
        '汚れている場合はレザークリーナーで清掃、ただしパティーナは残る',
        '予防: より軽いパティーナにはバッグの使用頻度を減らす'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show handles from multiple angles. Say: "The vachetta handles have developed a beautiful light honey patina, which is natural aging for Louis Vuitton. This shows the bag is authentic and well-loved. The patina is even and adds character."',
      jp: 'ハンドルを複数の角度から見せる。言う：「ヴァシェッタハンドルに美しいライトハニーパティーナが発生しています。これはルイ・ヴィトンの自然な経年変化です。バッグが本物で愛用されている証拠です。パティーナは均一でキャラクターを加えています。」'
    },
    images: 4
  },
  {
    id: 'patina-dark',
    term: {
      en: 'Dark Patina',
      jp: 'ダークパティーナ'
    },
    category: 'vachetta-aging',
    severity: 'moderate',
    description: {
      en: 'Heavy darkening of vachetta to deep brown/caramel. Natural aging from extended use and oil exposure.',
      jp: 'ヴァシェッタが濃い茶色/キャラメル色に大きく変色。長期使用と油分への曝露による自然な経年変化。'
    },
    howToIdentify: {
      en: [
        'Deep brown to dark caramel color',
        'Developed over years of use',
        'May have uneven spots from hand oils',
        'Leather should still be supple, not cracked',
        'Common on well-loved vintage pieces'
      ],
      jp: [
        '深い茶色から濃いキャラメル色',
        '何年もの使用で発生',
        '手の油分で不均一なスポットがある場合も',
        'レザーはまだしなやか、ひび割れなし',
        '愛用されたヴィンテージ品に一般的'
      ]
    },
    commonBrands: ['Louis Vuitton', 'Goyard'],
    repairTips: {
      en: [
        '✅ NATURAL AGING - frame positively!',
        'Cannot lighten patina (it\'s permanent)',
        'Clean with saddle soap if dirty',
        'Apply leather conditioner to keep supple',
        'If cracking occurs, use leather cream to prevent further damage'
      ],
      jp: [
        '✅ 自然な経年変化 - ポジティブに表現！',
        'パティーナを明るくすることはできない（永久的）',
        '汚れている場合はサドルソープで清掃',
        'しなやかさを保つためレザーコンディショナーを使用',
        'ひび割れが発生した場合、レザークリームで更なる損傷を防ぐ'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show entire bag, then close-up of handles. Say: "This vintage Louis Vuitton has developed a rich, dark patina over years of use. The vachetta has aged to a beautiful caramel brown. This is highly desirable in the vintage market and shows authentic aging."',
      jp: 'バッグ全体を見せてからハンドルのクローズアップ。言う：「このヴィンテージルイ・ヴィトンは何年もの使用で豊かで濃いパティーナが発生しています。ヴァシェッタが美しいキャラメルブラウンに経年変化しました。これはヴィンテージ市場で非常に望ましく、本物の経年変化を示しています。」'
    },
    images: 4
  },
  {
    id: 'corner-wear',
    term: {
      en: 'Corner Wear',
      jp: 'コーナー摩耗'
    },
    category: 'structural-wear',
    severity: 'moderate',
    description: {
      en: 'Scuffing, discoloration, or leather damage on bag corners from setting bag down repeatedly.',
      jp: 'バッグを繰り返し置くことによる角のスレ、変色、またはレザー損傷。'
    },
    howToIdentify: {
      en: [
        'Visible scuffing on bottom four corners',
        'Lighter color where leather has worn',
        'May expose canvas/lining underneath',
        'Texture change - rougher than surrounding area',
        'Most common wear point on any bag'
      ],
      jp: [
        '底の4つの角に目に見えるスレ',
        'レザーが摩耗した部分の色が薄い',
        '下のキャンバス/裏地が露出する場合も',
        '質感の変化 - 周囲より粗い',
        'あらゆるバッグで最も一般的な摩耗箇所'
      ]
    },
    commonBrands: ['All brands'],
    repairTips: {
      en: [
        '✅ CAN BE REPAIRED professionally',
        'Cobbler can re-dye and refinish corners ($50-150)',
        'DIY: Use matching leather paint for minor scuffs',
        'Edge kote can restore smooth finish on edges',
        'Prevention: Use bag base shaper, don\'t set on rough surfaces'
      ],
      jp: [
        '✅ プロによる修復可能',
        '靴修理店で角を再染色・再仕上げ可能（$50-150）',
        'DIY: 軽いスレには同色のレザーペイントを使用',
        'エッジコートで縁の滑らかな仕上げを復元',
        '予防: バッグベースシェイパーを使用、粗い表面に置かない'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Flip bag upside down, show all four corners close-up. Say: "There is moderate corner wear on all four corners - you can see the scuffing and lightening where the bag has been set down. This is typical wear for a pre-owned bag and can be refinished if desired."',
      jp: 'バッグを逆さまにして、4つの角すべてをクローズアップで見せる。言う：「4つの角すべてに中程度のコーナー摩耗があります - バッグを置いた部分のスレと色の薄化が見えます。これは中古バッグの典型的な摩耗で、希望すれば再仕上げ可能です。」'
    },
    images: 5
  },
  {
    id: 'hardware-tarnish',
    term: {
      en: 'Hardware Tarnish',
      jp: '金具変色'
    },
    category: 'hardware-condition',
    severity: 'minimal',
    description: {
      en: 'Oxidation and discoloration of brass/metal hardware, especially on older bags. Natural aging of metal.',
      jp: '真鍮/金属金具の酸化と変色、特に古いバッグで発生。金属の自然な経年変化。'
    },
    howToIdentify: {
      en: [
        'Greenish or brownish discoloration on brass',
        'Dull finish instead of shiny',
        'Most visible on zipper pulls, chains, locks',
        'Does not affect functionality',
        'Natural oxidation over time'
      ],
      jp: [
        '真鍮に緑がかった、または茶色がかった変色',
        '光沢のある仕上げではなく鈍い仕上げ',
        'ジッパープル、チェーン、ロックで最も目立つ',
        '機能性には影響なし',
        '時間経過による自然な酸化'
      ]
    },
    commonBrands: ['All brands with brass hardware'],
    repairTips: {
      en: [
        '✅ EASILY FIXABLE at home!',
        'Brass cleaner (Brasso, Wright\'s) removes tarnish in minutes',
        'Lemon juice + salt paste works for light tarnish',
        'Polish with soft cloth to restore shine',
        'Prevention: Store with anti-tarnish strips, keep dry'
      ],
      jp: [
        '✅ 自宅で簡単に修復可能！',
        '真鍮クリーナー（Brasso、Wright\'s）で数分で変色除去',
        'レモン汁＋塩ペーストで軽い変色に効果',
        '柔らかい布で磨いて光沢を復元',
        '予防: 防錆ストリップと一緒に保管、乾燥を保つ'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Close-up of hardware (zipper, chain, turnlock). Say: "The brass hardware shows some tarnishing, which is normal for brass over time. You can see slight discoloration here. This can be easily polished with brass cleaner if desired. The hardware is fully functional."',
      jp: '金具（ジッパー、チェーン、ターンロック）のクローズアップ。言う：「真鍮金具に変色が見られますが、これは時間経過で真鍮に起こる正常な現象です。ここに軽い変色が見えます。希望すれば真鍮クリーナーで簡単に磨けます。金具は完全に機能します。」'
    },
    images: 4
  },
  {
    id: 'hardware-scratches',
    term: {
      en: 'Hardware Scratches',
      jp: '金具キズ'
    },
    category: 'hardware-condition',
    severity: 'moderate',
    description: {
      en: 'Surface scratches on metal hardware from daily use and contact with other objects.',
      jp: '日常使用や他の物との接触による金属金具の表面キズ。'
    },
    howToIdentify: {
      en: [
        'Fine lines on hardware surface',
        'More visible on gold-tone than silver',
        'Common on zipper pulls, logo plates, chain',
        'Superficial - does not affect function',
        'Catch light when bag is moved'
      ],
      jp: [
        '金具表面の細い線',
        'シルバーよりゴールドトーンで目立つ',
        'ジッパープル、ロゴプレート、チェーンに一般的',
        '表面的 - 機能に影響なし',
        'バッグを動かすと光を反射'
      ]
    },
    commonBrands: ['All brands'],
    repairTips: {
      en: [
        '⚠️ DIFFICULT TO REPAIR completely',
        'Light scratches can be buffed with metal polish',
        'Deep scratches may need professional re-plating (expensive)',
        'Jeweler\'s rouge can minimize appearance',
        'Prevention: Store chain in dust bag, handle hardware gently'
      ],
      jp: [
        '⚠️ 完全な修復は困難',
        '軽いキズは金属磨きで磨ける',
        '深いキズはプロによる再メッキが必要な場合も（高額）',
        '宝石研磨剤で見た目を最小化可能',
        '予防: チェーンをダストバッグに保管、金具を優しく扱う'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Angle hardware to catch light, show scratches clearly. Say: "The hardware shows light surface scratches from normal use. These are superficial and don\'t affect functionality. Very common on pre-owned bags. The zippers work perfectly."',
      jp: '金具を光に角度をつけ、キズをはっきり見せる。言う：「金具には通常使用による軽い表面キズが見られます。これらは表面的で機能性に影響しません。中古バッグでは非常に一般的です。ジッパーは完璧に機能します。」'
    },
    images: 4
  },
  {
    id: 'sticky-lining',
    term: {
      en: 'Sticky Lining',
      jp: '粘着性ライニング'
    },
    category: 'interior-damage',
    severity: 'critical',
    description: {
      en: 'Interior lining deterioration causing sticky, tacky surface. Common in vintage designer bags due to coating breakdown.',
      jp: 'コーティングの分解による粘着性、べたつき表面を引き起こす内装ライニングの劣化。ヴィンテージデザイナーバッグに一般的。'
    },
    howToIdentify: {
      en: [
        'Lining feels tacky/sticky to touch',
        'May transfer onto items inside bag',
        'Often accompanied by peeling or flaking',
        'Most common in bags 15+ years old',
        'Cannot be cleaned away - it\'s chemical breakdown'
      ],
      jp: [
        'ライニングが触るとべたつく',
        'バッグ内のアイテムに転写する場合も',
        '剥離やひび割れを伴うことが多い',
        '15年以上のバッグで最も一般的',
        '清掃では取れない - 化学的分解'
      ]
    },
    commonBrands: ['Fendi', 'Prada', 'Chanel (vintage)'],
    repairTips: {
      en: [
        '⚠️ REQUIRES PROFESSIONAL REPAIR',
        'Only fix: Complete lining replacement ($200-500)',
        'Cannot be cleaned or restored',
        'Some owners use fabric liner insert as temporary solution',
        'Prevention: Store in cool, dry place; avoid heat/humidity'
      ],
      jp: [
        '⚠️ プロによる修復が必要',
        '唯一の修復法: ライニングの完全交換（$200-500）',
        '清掃や復元はできない',
        '一部の所有者は一時的解決策として布製ライナーインサートを使用',
        '予防: 涼しく乾燥した場所に保管; 熱/湿気を避ける'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Open bag wide, touch lining with finger to show stickiness. Say: "The interior lining has become sticky due to coating deterioration - this is common in vintage bags. The lining would need professional replacement. This does not affect the exterior or structure of the bag."',
      jp: 'バッグを大きく開け、指でライニングに触れてべたつきを見せる。言う：「コーティングの劣化により内装ライニングがべたついています - これはヴィンテージバッグでは一般的です。ライニングはプロによる交換が必要です。これはバッグの外装や構造には影響しません。」'
    },
    images: 3
  },
  {
    id: 'color-transfer',
    term: {
      en: 'Color Transfer',
      jp: 'カラートランスファー'
    },
    category: 'surface-damage',
    severity: 'moderate',
    description: {
      en: 'Dye from clothing (especially denim) transferring onto light-colored leather, creating permanent stains.',
      jp: '衣類（特にデニム）の染料が明るい色のレザーに転写され、永久的な染みを作る。'
    },
    howToIdentify: {
      en: [
        'Blue or dark marks on light leather (often vachetta)',
        'Most common on bag back/sides that touch clothing',
        'Appears as subtle discoloration or dark streaks',
        'Cannot be wiped away with cloth',
        'Very common with new denim + light bags'
      ],
      jp: [
        '明るいレザー（多くの場合ヴァシェッタ）に青または濃い跡',
        '衣類に触れるバッグの背面/側面で最も一般的',
        '微妙な変色または濃い筋として現れる',
        '布で拭いても取れない',
        '新しいデニム＋明るいバッグで非常に一般的'
      ]
    },
    commonBrands: ['Louis Vuitton', 'Any light-colored leather'],
    repairTips: {
      en: [
        '⚠️ DIFFICULT TO REMOVE',
        'Leather cleaner may lighten (try on hidden area first)',
        'Professional leather spa can sometimes remove (expensive)',
        'DIY: Rubbing alcohol on cotton swab (test first!)',
        'Prevention: Avoid wearing new/dark denim with light bags'
      ],
      jp: [
        '⚠️ 除去困難',
        'レザークリーナーで薄くなる場合も（まず隠れた部分で試す）',
        'プロのレザースパで除去できる場合も（高額）',
        'DIY: 綿棒にアルコール（まずテスト！）',
        '予防: 明るいバッグで新しい/濃いデニムを避ける'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show back of bag where color transfer is visible. Say: "There is denim color transfer on the back panel - you can see the blue discoloration here from contact with jeans. This is permanent and common on vachetta leather. It doesn\'t affect the bag\'s function."',
      jp: 'カラートランスファーが見える バッグの背面を見せる。言う：「背面パネルにデニムのカラートランスファーがあります - ジーンズとの接触による青い変色がここに見えます。これは永久的でヴァシェッタレザーでは一般的です。バッグの機能には影響しません。」'
    },
    images: 4
  },
  {
    id: 'water-stain',
    term: {
      en: 'Water Stain',
      jp: '水染み'
    },
    category: 'surface-damage',
    severity: 'moderate',
    description: {
      en: 'Dark spots or rings on leather from water exposure, especially visible on untreated vachetta leather.',
      jp: '水への曝露によるレザーの濃いスポットまたはリング、特に未処理のヴァシェッタレザーで目立つ。'
    },
    howToIdentify: {
      en: [
        'Dark spots or rings on leather surface',
        'Most visible on vachetta (Louis Vuitton)',
        'Irregular shaped marks',
        'Darker than surrounding leather',
        'Permanent once dried'
      ],
      jp: [
        'レザー表面の濃いスポットまたはリング',
        'ヴァシェッタ（ルイ・ヴィトン）で最も目立つ',
        '不規則な形の跡',
        '周囲のレザーより濃い',
        '乾燥すると永久的'
      ]
    },
    commonBrands: ['Louis Vuitton', 'Any untreated leather'],
    repairTips: {
      en: [
        '⚠️ DIFFICULT TO REMOVE once set',
        'Fresh stains: Blot immediately, let dry evenly',
        'Old stains: May fade with patina over time',
        'Professional cleaning may lighten but rarely removes completely',
        'Prevention: Apply water protector spray, avoid rain'
      ],
      jp: [
        '⚠️ 定着すると除去困難',
        '新しい染み: すぐに吸い取り、均一に乾燥',
        '古い染み: 時間経過でパティーナと共に薄くなる場合も',
        'プロのクリーニングで薄くなる場合もあるが完全除去は稀',
        '予防: 防水スプレーを塗布、雨を避ける'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show water-stained area clearly. Say: "There are water stains visible on the vachetta - these dark spots are from water exposure. This is permanent on untreated leather. The marks may fade slightly as the bag develops patina, but will remain visible."',
      jp: '水染みの部分をはっきり見せる。言う：「ヴァシェッタに水染みが見えます - これらの濃いスポットは水への曝露によるものです。これは未処理レザーでは永久的です。バッグがパティーナを発展させるにつれて跡は少し薄くなる場合もありますが、見えたままです。」'
    },
    images: 3
  },
  {
    id: 'pen-mark',
    term: {
      en: 'Pen Mark / Ink Stain',
      jp: 'ペン跡/インク染み'
    },
    category: 'interior-damage',
    severity: 'moderate',
    description: {
      en: 'Ink marks on interior lining from pens leaking inside the bag. Very common interior issue.',
      jp: 'バッグ内でペンが漏れて内装ライニングにできるインクの跡。非常に一般的な内装問題。'
    },
    howToIdentify: {
      en: [
        'Blue or black marks on light-colored lining',
        'Often near bottom or side pockets',
        'Can be small dots or large smears',
        'Most common in canvas-lined bags',
        'Easily visible when bag is opened'
      ],
      jp: [
        '明るい色のライニングに青または黒の跡',
        '底や側面ポケット近くに多い',
        '小さな点や大きな汚れの場合も',
        'キャンバス裏地のバッグで最も一般的',
        'バッグを開けると簡単に見える'
      ]
    },
    commonBrands: ['All brands'],
    repairTips: {
      en: [
        '⚠️ VERY DIFFICULT TO REMOVE',
        'Rubbing alcohol may lighten fresh ink (test first)',
        'Hairspray can sometimes lift ink (old trick)',
        'Professional cleaning rarely removes completely',
        'Prevention: Keep pens in zippered pouches'
      ],
      jp: [
        '⚠️ 除去が非常に困難',
        '新しいインクにはアルコールで薄くなる場合も（まずテスト）',
        'ヘアスプレーでインクが取れる場合も（古い技）',
        'プロのクリーニングでも完全除去は稀',
        '予防: ペンをジッパー付きポーチに入れる'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Open bag wide, point to pen marks. Say: "There are pen marks visible on the interior lining - you can see the blue ink here. This is a common issue from pens in the bag. It\'s purely cosmetic and doesn\'t affect the bag\'s use or exterior."',
      jp: 'バッグを大きく開け、ペン跡を指す。言う：「内装ライニングにペン跡が見えます - ここに青いインクが見えます。これはバッグ内のペンによる一般的な問題です。純粋に外観的な問題でバッグの使用や外装には影響しません。」'
    },
    images: 3
  },
  {
    id: 'leather-cracking',
    term: {
      en: 'Leather Cracking',
      jp: 'レザーひび割れ'
    },
    category: 'structural-damage',
    severity: 'critical',
    description: {
      en: 'Cracks in leather surface from drying out, age, or poor storage. Indicates leather has lost elasticity.',
      jp: '乾燥、経年、または不適切な保管によるレザー表面のひび割れ。レザーが弾力性を失った証拠。'
    },
    howToIdentify: {
      en: [
        'Visible cracks or splits in leather surface',
        'Most common on handles, straps, piping',
        'Cracks may be shallow or deep',
        'Leather feels stiff, not supple',
        'Often accompanies severe dryness'
      ],
      jp: [
        'レザー表面の目に見えるひび割れや裂け目',
        'ハンドル、ストラップ、パイピングで最も一般的',
        'ひび割れは浅い場合も深い場合も',
        'レザーが硬く、しなやかでない',
        '多くの場合、ひどい乾燥を伴う'
      ]
    },
    commonBrands: ['All brands'],
    repairTips: {
      en: [
        '❌ CANNOT BE FULLY REPAIRED (permanent damage)',
        'Leather cream can prevent further cracking',
        'Deep cracks may require strap/handle replacement',
        'Color matching cream can hide shallow cracks cosmetically',
        'Prevention: Regular conditioning, avoid dry storage'
      ],
      jp: [
        '❌ 完全には修復不可能（永久的損傷）',
        'レザークリームで更なるひび割れを防げる',
        '深いひび割れはストラップ/ハンドル交換が必要な場合も',
        '色を合わせたクリームで浅いひび割れを外観的に隠せる',
        '予防: 定期的なコンディショニング、乾燥した保管を避ける'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Zoom in on cracked area, bend leather slightly to show depth. Say: "The leather has developed cracking here - you can see the splits in the surface. This indicates the leather has dried out and lost flexibility. This is permanent damage and the area would need conditioning to prevent further cracking."',
      jp: 'ひび割れた部分をズームし、レザーを軽く曲げて深さを見せる。言う：「レザーにここでひび割れが発生しています - 表面の裂け目が見えます。これはレザーが乾燥して柔軟性を失った証拠です。これは永久的な損傷で、更なるひび割れを防ぐためにコンディショニングが必要です。」'
    },
    images: 4
  },
  {
    id: 'piping-wear',
    term: {
      en: 'Piping Wear',
      jp: 'パイピング摩耗'
    },
    category: 'structural-wear',
    severity: 'moderate',
    description: {
      en: 'Wear on leather piping (trim around bag edges), often exposing cord underneath. Common stress point.',
      jp: 'レザーパイピング（バッグ縁周りのトリム）の摩耗、多くの場合下のコードが露出。一般的なストレスポイント。'
    },
    howToIdentify: {
      en: [
        'Worn leather on bag edge trim',
        'Piping may appear flattened or frayed',
        'Exposed white cord visible through worn leather',
        'Most common on bag top edges',
        'Color may be lighter where worn'
      ],
      jp: [
        'バッグ縁トリムのレザー摩耗',
        'パイピングが平らになったりほつれて見える場合も',
        '摩耗したレザーから見える露出した白いコード',
        'バッグ上端で最も一般的',
        '摩耗した部分で色が薄い場合も'
      ]
    },
    commonBrands: ['Louis Vuitton', 'Chanel', 'All brands with piping'],
    repairTips: {
      en: [
        '✅ CAN BE REPAIRED by professionals',
        'Piping replacement: $100-300 (full bag re-piping)',
        'Color restoration can hide minor wear temporarily',
        'Edge paint can restore appearance of exposed areas',
        'Prevention: Handle bag by body, not edges'
      ],
      jp: [
        '✅ プロによる修復可能',
        'パイピング交換: $100-300（バッグ全体の再パイピング）',
        '色の復元で軽い摩耗を一時的に隠せる',
        'エッジペイントで露出部分の見た目を復元',
        '予防: 縁ではなく本体でバッグを持つ'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Run finger along piping to show wear. Say: "The piping shows wear along the edges - you can see where the leather has worn thin and the cord is slightly visible. This is a common wear point on bags. It can be re-piped professionally if desired."',
      jp: 'パイピングに沿って指を走らせて摩耗を見せる。言う：「パイピングに縁に沿った摩耗が見えます - レザーが薄くなりコードが少し見える部分が分かります。これはバッグの一般的な摩耗ポイントです。希望すればプロによる再パイピング可能です。」'
    },
    images: 4
  },
  {
    id: 'handle-darkening',
    term: {
      en: 'Handle Darkening',
      jp: 'ハンドル変色'
    },
    category: 'vachetta-aging',
    severity: 'minimal',
    description: {
      en: 'Dark discoloration on handles from hand oils and repeated contact. More pronounced than natural patina.',
      jp: '手の油分と繰り返しの接触によるハンドルの濃い変色。自然なパティーナより顕著。'
    },
    howToIdentify: {
      en: [
        'Handles darker than rest of vachetta trim',
        'May have uneven dark spots',
        'Concentrated where hands grip most',
        'Darker than natural honey patina',
        'Common on well-used bags'
      ],
      jp: [
        '他のヴァシェッタトリムよりハンドルが濃い',
        '不均一な濃いスポットがある場合も',
        '手が最も握る部分に集中',
        '自然なハニーパティーナより濃い',
        'よく使われたバッグに一般的'
      ]
    },
    commonBrands: ['Louis Vuitton', 'Goyard'],
    repairTips: {
      en: [
        '⚠️ CANNOT BE LIGHTENED (it\'s in the leather)',
        'Frame positively: "developed rich patina from use"',
        'Clean with saddle soap to remove dirt (not darkness)',
        'Condition to keep leather supple',
        'Prevention: Wash hands before handling, rotate bag use'
      ],
      jp: [
        '⚠️ 明るくできない（レザーに染み込んでいる）',
        'ポジティブに表現：「使用により豊かなパティーナが発生」',
        '汚れ除去にサドルソープで清掃（濃さは取れない）',
        'レザーをしなやかに保つためコンディショニング',
        '予防: 扱う前に手を洗う、バッグの使用をローテーション'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show handles, then compare to lighter vachetta trim. Say: "The handles have darkened more than the rest of the vachetta due to hand oils and frequent use. This is natural and shows the bag has been well-loved. The darkening is permanent but the leather remains in good condition."',
      jp: 'ハンドルを見せ、次に明るいヴァシェッタトリムと比較。言う：「手の油分と頻繁な使用により、ハンドルが他のヴァシェッタより濃くなっています。これは自然でバッグが愛用された証拠です。濃さは永久的ですがレザーは良い状態を保っています。」'
    },
    images: 3
  },
  {
    id: 'zipper-issue',
    term: {
      en: 'Zipper Issue',
      jp: 'ジッパー問題'
    },
    category: 'functional-damage',
    severity: 'critical',
    description: {
      en: 'Zipper does not close smoothly, catches, or separates. Can range from minor snagging to complete failure.',
      jp: 'ジッパーがスムーズに閉まらない、引っかかる、または分離。軽い引っかかりから完全な故障まで。'
    },
    howToIdentify: {
      en: [
        'Zipper catches or sticks while zipping',
        'Zipper separates behind slider',
        'Slider loose or falls off',
        'Teeth missing or bent',
        'Must be tested - zip fully open/closed'
      ],
      jp: [
        'ジッパーを閉める際に引っかかるまたは固まる',
        'スライダーの後ろでジッパーが分離',
        'スライダーが緩いまたは外れる',
        '歯が欠けているまたは曲がっている',
        'テスト必須 - 完全に開閉'
      ]
    },
    commonBrands: ['All brands'],
    repairTips: {
      en: [
        '✅ OFTEN FIXABLE',
        'Sticky zipper: Rub graphite pencil or wax on teeth',
        'Loose slider: Tailor/cobbler can tighten with pliers ($10-30)',
        'Separated zipper: May need slider replacement',
        'Broken teeth: Requires full zipper replacement ($50-150)'
      ],
      jp: [
        '✅ 多くの場合修復可能',
        '固いジッパー: 歯に鉛筆の芯またはワックスを擦る',
        '緩いスライダー: 仕立て屋/靴修理店でペンチで締められる（$10-30）',
        '分離したジッパー: スライダー交換が必要な場合も',
        '壊れた歯: ジッパー全体の交換が必要（$50-150）'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Demonstrate zipper slowly, show where it catches. Say: "The zipper catches slightly here when closing - you can see it doesn\'t glide smoothly. It still closes fully but needs some effort. This can likely be fixed by a cobbler tightening the slider."',
      jp: 'ジッパーをゆっくり実演し、引っかかる部分を見せる。言う：「閉める際にジッパーがここで少し引っかかります - スムーズに滑らないのが分かります。まだ完全に閉まりますが少し力が必要です。これは靴修理店でスライダーを締めることで直る可能性があります。」'
    },
    images: 3
  },
  {
    id: 'strap-wear',
    term: {
      en: 'Strap Wear',
      jp: 'ストラップ摩耗'
    },
    category: 'structural-wear',
    severity: 'moderate',
    description: {
      en: 'Wear on shoulder straps from repeated use, including cracking, darkening, or thinning of leather.',
      jp: '繰り返しの使用によるショルダーストラップの摩耗、レザーのひび割れ、変色、または薄化を含む。'
    },
    howToIdentify: {
      en: [
        'Strap leather appears worn vs bag body',
        'May have cracks or creasing',
        'Darkening where strap contacts shoulder',
        'Strap feels thinner or softer than new',
        'Most wear at adjustment holes'
      ],
      jp: [
        'ストラップのレザーがバッグ本体より摩耗して見える',
        'ひび割れやしわがある場合も',
        'ストラップが肩に接触する部分の変色',
        'ストラップが新品より薄いまたは柔らかく感じる',
        '調整穴で最も摩耗'
      ]
    },
    commonBrands: ['All brands with leather straps'],
    repairTips: {
      en: [
        '✅ CAN BE REPLACED',
        'Strap replacement: $50-200 depending on brand',
        'Many brands sell replacement straps directly',
        'Condition heavily to extend life',
        'Prevention: Rotate which shoulder you use, condition regularly'
      ],
      jp: [
        '✅ 交換可能',
        'ストラップ交換: ブランドにより$50-200',
        '多くのブランドが交換ストラップを直接販売',
        '寿命を延ばすために大量にコンディショニング',
        '予防: 使う肩をローテーション、定期的にコンディショニング'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show full strap length, focus on worn areas. Say: "The shoulder strap shows wear from regular use - you can see darkening and some creasing here. The strap is still strong and functional. It can be replaced if desired, or conditioned to extend its life."',
      jp: 'ストラップの全長を見せ、摩耗した部分に焦点。言う：「ショルダーストラップに通常使用による摩耗が見えます - ここに変色といくらかのしわが見えます。ストラップはまだ強く機能的です。希望すれば交換可能、または寿命を延ばすためにコンディショニング可能です。」'
    },
    images: 3
  },
  {
    id: 'odor',
    term: {
      en: 'Odor / Musty Smell',
      jp: '臭い/カビ臭'
    },
    category: 'storage-issue',
    severity: 'moderate',
    description: {
      en: 'Unpleasant smell from bag, often musty odor from poor storage or vintage age. Can indicate mold.',
      jp: 'バッグからの不快な臭い、多くの場合不適切な保管やヴィンテージの経年によるカビ臭。カビを示す場合も。'
    },
    howToIdentify: {
      en: [
        'Musty, moldy, or stale smell when opened',
        'Smell concentrated in interior',
        'May be accompanied by visible mold spots',
        'Common in bags stored in basements/attics',
        'Vintage bags more prone to odor'
      ],
      jp: [
        '開けると カビ臭い、カビの、またはこもった臭い',
        '内装に臭いが集中',
        '目に見えるカビの斑点を伴う場合も',
        '地下室/屋根裏に保管されたバッグに一般的',
        'ヴィンテージバッグは臭いが発生しやすい'
      ]
    },
    commonBrands: ['All brands, especially vintage'],
    repairTips: {
      en: [
        '✅ CAN BE IMPROVED',
        'Air out bag for 48+ hours in fresh air',
        'Baking soda inside bag for 24 hours absorbs odor',
        'Activated charcoal bags work well',
        'Leather cleaner on interior if no visible mold',
        'If mold present: Professional cleaning required'
      ],
      jp: [
        '✅ 改善可能',
        '新鮮な空気で48時間以上バッグを干す',
        'バッグ内に24時間重曹で臭いを吸収',
        '活性炭バッグが効果的',
        '目に見えるカビがなければ内装にレザークリーナー',
        'カビがある場合: プロのクリーニングが必要'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Cannot show smell on camera - be honest in description. Say: "This bag has a musty odor from storage. I\'ve aired it out but some smell remains. This is common in vintage bags and can be improved with baking soda or professional cleaning. There is no visible mold."',
      jp: 'カメラで臭いは見せられない - 説明で正直に。言う：「このバッグには保管によるカビ臭があります。干しましたが多少臭いが残っています。これはヴィンテージバッグでは一般的で重曹やプロのクリーニングで改善できます。目に見えるカビはありません。」'
    },
    images: 2
  },
  {
    id: 'leather-scuff',
    term: {
      en: 'Leather Scuff',
      jp: 'レザースレ'
    },
    category: 'surface-damage',
    severity: 'minimal',
    description: {
      en: 'Light surface abrasion on leather that changes texture/color but doesn\'t break the leather.',
      jp: '質感/色を変えるがレザーを破らない軽い表面の擦り傷。'
    },
    howToIdentify: {
      en: [
        'Lighter or darker patch on leather surface',
        'Texture feels slightly rough',
        'No actual tear or crack',
        'Can be felt when running finger over it',
        'Very common on corners and bottom'
      ],
      jp: [
        'レザー表面の明るいまたは濃いパッチ',
        '質感が少し粗く感じる',
        '実際の破れやひび割れはなし',
        '指で撫でると感じられる',
        '角と底で非常に一般的'
      ]
    },
    commonBrands: ['All brands'],
    repairTips: {
      en: [
        '✅ EASILY TREATED',
        'Leather conditioner often reduces appearance',
        'Colored leather cream can hide scuffs',
        'Some scuffs buff out with soft cloth',
        'Prevention: Handle carefully, use corner protectors'
      ],
      jp: [
        '✅ 簡単に処理可能',
        'レザーコンディショナーで見た目が減る場合が多い',
        '色付きレザークリームでスレを隠せる',
        '一部のスレは柔らかい布で磨ける',
        '予防: 慎重に扱う、コーナープロテクターを使用'
      ]
    },
    howToDescribeOnCamera: {
      en: 'Show scuff clearly, run finger over it. Say: "There is light scuffing here on the leather - you can see the slight texture change. This is superficial and can be minimized with leather conditioner. No actual damage to the leather structure."',
      jp: 'スレをはっきり見せ、指で撫でる。言う：「ここのレザーに軽いスレがあります - わずかな質感の変化が見えます。これは表面的でレザーコンディショナーで最小化できます。レザー構造への実際の損傷はありません。」'
    },
    images: 4
  }
];

/**
 * Get conditions by category
 */
export function getConditionsByCategory(category) {
  return CONDITION_VOCABULARY.filter(c => c.category === category);
}

/**
 * Get conditions by severity
 */
export function getConditionsBySeverity(severity) {
  return CONDITION_VOCABULARY.filter(c => c.severity === severity);
}

/**
 * Get all categories
 */
export function getAllCategories() {
  const categories = [...new Set(CONDITION_VOCABULARY.map(c => c.category))];
  return categories.map(cat => ({
    id: cat,
    label: {
      en: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      jp: getCategoryLabelJP(cat)
    }
  }));
}

function getCategoryLabelJP(category) {
  const labels = {
    'canvas-damage': 'キャンバス損傷',
    'vachetta-aging': 'ヴァシェッタ経年変化',
    'structural-wear': '構造的摩耗',
    'hardware-condition': '金具状態',
    'interior-damage': '内装損傷',
    'surface-damage': '表面損傷',
    'functional-damage': '機能的損傷',
    'storage-issue': '保管問題'
  };
  return labels[category] || category;
}
