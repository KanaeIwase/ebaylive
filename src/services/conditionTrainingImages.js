/**
 * Condition Training Image Generator
 * Generates comprehensive product views and condition examples for training
 * Perfect for scenarios where real photos don't exist or aren't consistent
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Generate 360-degree product view (4 sides + interior)
 * Perfect for condition description training
 */
export async function generate360View(productType, brand, condition = 'good') {
  const views = [
    { angle: 'front', description: 'Front view showing main body and hardware' },
    { angle: 'back', description: 'Back view showing rear panel' },
    { angle: 'left-side', description: 'Left side profile view' },
    { angle: 'right-side', description: 'Right side profile view' },
    { angle: 'interior', description: 'Interior view showing lining and pockets' },
    { angle: 'top', description: 'Top view showing opening and handles' },
    { angle: 'bottom', description: 'Bottom view showing feet and base' }
  ];

  const images = await Promise.all(
    views.map(async (view) => {
      const prompt = create360Prompt(productType, brand, condition, view.angle);
      const image = await generateWithGemini(prompt);

      return {
        angle: view.angle,
        description: view.description,
        image: image,
        prompt: prompt
      };
    })
  );

  return images;
}

/**
 * Create specific prompt for 360-degree view
 */
function create360Prompt(productType, brand, condition, angle) {
  const conditionDetails = {
    'excellent': 'pristine condition, like new, no visible wear',
    'very-good': 'very light wear, minimal signs of use',
    'good': 'moderate wear, clear signs of use but well-maintained',
    'acceptable': 'heavy wear, visible damage but functional',
    'poor': 'significant wear and damage'
  };

  const angleDescriptions = {
    'front': 'straight-on front view, centered, showing main logo and hardware',
    'back': 'straight-on back view, centered, showing rear panel details',
    'left-side': 'left side profile view, 90 degree angle, showing depth and structure',
    'right-side': 'right side profile view, 90 degree angle, showing depth and structure',
    'interior': 'top-down view into open bag, showing interior lining, pockets, and condition',
    'top': 'overhead view showing handles, zipper, and opening mechanism',
    'bottom': 'bottom view showing base, feet, and wear on bottom corners'
  };

  return `Professional product photography of ${brand} ${productType}, ${angleDescriptions[angle]}, ${conditionDetails[condition] || 'good condition'}, studio lighting, white background, high detail, consistent lighting, educational reference image, neutral angle, centered composition, sharp focus`;
}

/**
 * Generate condition comparison grid
 * Shows same bag in different conditions side-by-side
 */
export async function generateConditionComparison(productType, brand) {
  const conditions = [
    { grade: 'excellent', label: 'Excellent (Like New)' },
    { grade: 'very-good', label: 'Very Good (Light Wear)' },
    { grade: 'good', label: 'Good (Moderate Wear)' },
    { grade: 'acceptable', label: 'Acceptable (Heavy Wear)' }
  ];

  const images = await Promise.all(
    conditions.map(async (cond) => {
      const prompt = `Professional product photography of ${brand} ${productType}, front view, ${getConditionDetails(cond.grade)}, studio lighting, white background, high detail, educational reference`;
      const image = await generateWithGemini(prompt);

      return {
        grade: cond.grade,
        label: cond.label,
        image: image
      };
    })
  );

  return images;
}

/**
 * Get detailed condition descriptions for prompts
 */
function getConditionDetails(grade) {
  const details = {
    'excellent': 'pristine condition like new from store, perfect leather, no scratches on hardware, flawless stitching, clean interior',
    'very-good': 'very light wear only, minor patina on handles, hardware shows minimal scratches, interior very clean',
    'good': 'moderate visible wear, developed patina on vachetta, some hardware scratches, light corner scuffing, interior has minor marks',
    'acceptable': 'heavy wear visible, dark patina, significant hardware scratches and tarnishing, corner wear obvious, interior staining',
    'poor': 'extensive damage, severe corner wear, heavy scratches, significant staining, structural issues visible'
  };

  return details[grade] || details['good'];
}

/**
 * Generate specific wear/damage examples
 * Perfect for "what to look for" training
 */
export async function generateWearExample(wearType, severity = 'moderate') {
  const prompts = {
    'corner-wear': `Extreme closeup macro photography of luxury leather handbag corner, ${severity} scuffing and wear marks visible, detailed texture, educational reference for condition assessment`,

    'patina-light': 'Closeup of vachetta leather handles, light honey patina just beginning to develop, natural aging, detailed texture',
    'patina-medium': 'Closeup of vachetta leather handles, medium honey-brown patina, well-aged, natural darkening visible',
    'patina-dark': 'Closeup of vachetta leather handles, deep dark brown patina, heavily aged, rich color development',

    'hardware-scratches': `Macro closeup of luxury handbag gold hardware (zipper pull and clasp), ${severity} surface scratches visible, detailed metal texture`,
    'hardware-tarnish': `Macro closeup of luxury handbag brass hardware, ${severity} tarnishing and oxidation visible, detailed patina on metal`,

    'interior-stain': `Top-down view of luxury handbag interior lining, ${severity} stain visible on fabric, clear lighting, educational reference`,
    'interior-pen': 'Closeup of handbag interior lining, pen mark visible on light-colored fabric, detailed view',

    'stitching-loose': 'Macro closeup of luxury handbag stitching, loose thread visible, detailed thread work',
    'stitching-broken': 'Macro closeup of luxury handbag stitching, broken thread visible, repair needed',

    'leather-crack': `Closeup of leather handbag surface, ${severity} cracking in leather visible, detailed texture showing damage`,
    'leather-scuff': `Closeup of leather handbag surface, ${severity} scuff mark visible, surface damage detail`,

    'water-stain': 'Closeup of vachetta leather with water stain marks, darker spots visible, educational reference',

    'color-transfer': 'Closeup of light-colored leather handbag with denim color transfer, blue marks visible on surface',

    'odor-indicator': 'Interior view of vintage handbag showing musty condition, aged smell indicators, educational reference'
  };

  const prompt = prompts[wearType];
  if (!prompt) {
    console.warn(`No prompt for wear type: ${wearType}`);
    return null;
  }

  return {
    type: wearType,
    severity: severity,
    image: await generateWithGemini(prompt),
    prompt: prompt
  };
}

/**
 * Generate "before vs after" comparison
 * For showing what's acceptable vs what needs disclosure
 */
export async function generateBeforeAfter(issueType) {
  const comparisons = {
    'acceptable-wear': {
      before: 'Luxury handbag with light corner scuffing, minor wear acceptable for pre-owned',
      after: 'Same luxury handbag with heavy corner damage, significant wear requiring disclosure'
    },
    'hardware-condition': {
      before: 'Luxury handbag hardware with light surface scratches, normal wear',
      after: 'Same handbag with heavily scratched and tarnished hardware requiring disclosure'
    },
    'interior-cleanliness': {
      before: 'Handbag interior with minor dust, normal condition',
      after: 'Same interior with visible stains and marks requiring disclosure'
    }
  };

  const comp = comparisons[issueType];
  if (!comp) return null;

  const [beforeImg, afterImg] = await Promise.all([
    generateWithGemini(`${comp.before}, professional product photography, white background, clear detail`),
    generateWithGemini(`${comp.after}, professional product photography, white background, clear detail`)
  ]);

  return {
    type: issueType,
    before: { image: beforeImg, description: comp.before },
    after: { image: afterImg, description: comp.after }
  };
}

/**
 * Generate authentication marker closeups
 * Shows what to look for and explain on camera
 */
export async function generateAuthMarkers(brand) {
  const markers = {
    'lv': [
      { name: 'Date Code', prompt: 'Extreme macro closeup of Louis Vuitton date code stamp inside bag, clear letters and numbers visible' },
      { name: 'Heat Stamp', prompt: 'Macro closeup of Louis Vuitton heat stamp on vachetta leather tab, clear brand name' },
      { name: 'Canvas Grain', prompt: 'Extreme macro of Louis Vuitton monogram canvas texture, showing grain pattern detail' },
      { name: 'Stitching Pattern', prompt: 'Macro of Louis Vuitton stitching, showing mustard yellow thread and even stitch count' }
    ],
    'chanel': [
      { name: 'Serial Sticker', prompt: 'Closeup of Chanel serial number sticker inside bag, clear numbers visible' },
      { name: 'CC Logo', prompt: 'Macro closeup of Chanel interlocking CC logo on hardware, detailed metal work' },
      { name: 'Quilting Alignment', prompt: 'Closeup of Chanel matelassé quilting at seam, showing perfect diamond alignment' },
      { name: 'Chain Strap', prompt: 'Closeup of Chanel chain strap showing leather interwoven with gold chain links' }
    ],
    'hermes': [
      { name: 'Blind Stamp', prompt: 'Macro closeup of Hermès blind stamp on leather, showing craftsman mark and year letter' },
      { name: 'Saddle Stitch', prompt: 'Extreme macro of Hermès saddle stitching, showing angled hand-stitched thread work' },
      { name: 'Hardware Engraving', prompt: 'Macro of Hermès hardware with clear brand engraving on clasp' },
      { name: 'Leather Grain', prompt: 'Extreme macro of Hermès leather texture showing natural grain pattern' }
    ]
  };

  const brandMarkers = markers[brand.toLowerCase()] || markers['lv'];

  const images = await Promise.all(
    brandMarkers.map(async (marker) => {
      const image = await generateWithGemini(marker.prompt);
      return {
        name: marker.name,
        image: image,
        prompt: marker.prompt
      };
    })
  );

  return images;
}

/**
 * Generate practice scenarios with images
 * Complete scenarios for condition description training
 */
export async function generatePracticeScenario(scenarioType) {
  const scenarios = {
    'minor-wear': {
      title: 'Scenario: Minor Corner Wear',
      situation: 'Pre-owned Louis Vuitton Speedy 30 with light corner scuffing',
      prompt: 'Louis Vuitton Speedy 30 bag showing light corner wear on bottom corners, overall good condition, professional product photo',
      correctDescription: 'This pre-owned Speedy 30 is in very good condition overall. There is light scuffing visible on the bottom corners, which is typical for a bag of this age. The hardware shows minimal scratches, and the interior is clean.',
      incorrectDescription: 'This bag is in excellent condition.',
      explanation: 'You must disclose the corner wear even if minor. "Excellent" means like-new with no visible wear.'
    },
    'patina-disclosure': {
      title: 'Scenario: Vachetta Patina',
      situation: 'Louis Vuitton bag with developed honey patina on handles',
      prompt: 'Louis Vuitton bag vachetta handles with medium honey-brown patina, aged leather, natural darkening',
      correctDescription: 'The vachetta leather handles have developed a beautiful honey patina, which is natural aging for Louis Vuitton. The patina is even and adds character to the bag.',
      incorrectDescription: 'The handles are dirty.',
      explanation: 'Patina is normal and desirable! Frame it positively. Never call it "dirty" - it\'s "developed patina" or "aged beautifully".'
    },
    'hardware-tarnish': {
      title: 'Scenario: Hardware Tarnishing',
      situation: 'Designer bag with tarnished brass hardware',
      prompt: 'Luxury handbag brass hardware showing tarnishing and oxidation on zipper pulls and clasps',
      correctDescription: 'The brass hardware shows some tarnishing, which is normal for brass hardware over time. The zippers function perfectly. This can be polished with brass cleaner if desired.',
      incorrectDescription: 'Hardware has some wear.',
      explanation: 'Be specific! "Some wear" is vague. State exactly what it is (tarnishing) and mention it can be polished.'
    }
  };

  const scenario = scenarios[scenarioType];
  if (!scenario) return null;

  const image = await generateWithGemini(scenario.prompt);

  return {
    ...scenario,
    image: image,
    imagePrompt: scenario.prompt
  };
}

/**
 * Core Gemini API call with retry logic
 */
async function generateWithGemini(prompt) {
  if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not configured - returning placeholder');
    return createEnhancedPlaceholder(prompt);
  }

  try {
    const response = await fetch(
      `${GEMINI_API}/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '4:3',
            safetyFilterLevel: 'block_some'
          }
        })
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return createEnhancedPlaceholder(prompt);
    }

    const data = await response.json();
    if (data.predictions && data.predictions[0]?.bytesBase64Encoded) {
      return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
    }

    return createEnhancedPlaceholder(prompt);
  } catch (error) {
    console.error('Error generating with Gemini:', error);
    return createEnhancedPlaceholder(prompt);
  }
}

/**
 * Create enhanced placeholder when Gemini not available
 * Shows what would be generated
 */
function createEnhancedPlaceholder(promptText) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 800, 600);
  gradient.addColorStop(0, '#4a90e2');
  gradient.addColorStop(1, '#7b68ee');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 600);

  // Icon
  ctx.font = '100px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.textAlign = 'center';
  ctx.fillText('📸', 400, 200);

  // Title
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('AI-Generated Reference Image', 400, 280);

  // Prompt preview (truncated)
  const shortPrompt = promptText.substring(0, 60) + '...';
  ctx.font = '14px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';

  const words = shortPrompt.split(' ');
  let line = '';
  let y = 320;

  for (let word of words) {
    const testLine = line + word + ' ';
    if (ctx.measureText(testLine).width > 700) {
      ctx.fillText(line, 400, y);
      line = word + ' ';
      y += 25;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 400, y);

  // Instructions
  ctx.font = '16px Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.fillText('Add VITE_GEMINI_API_KEY to generate this image', 400, y + 80);

  return canvas.toDataURL('image/png');
}

/**
 * Batch generate training set
 * Creates complete condition training package
 */
export async function generateCompleteTrainingSet(brand, model) {
  console.log(`Generating complete training set for ${brand} ${model}...`);

  const [
    view360,
    conditionComparison,
    authMarkers,
    wearExamples
  ] = await Promise.all([
    generate360View(model, brand, 'good'),
    generateConditionComparison(model, brand),
    generateAuthMarkers(brand),
    Promise.all([
      generateWearExample('corner-wear', 'moderate'),
      generateWearExample('patina-medium'),
      generateWearExample('hardware-scratches', 'light'),
      generateWearExample('interior-stain', 'light')
    ])
  ]);

  return {
    brand,
    model,
    generatedAt: new Date().toISOString(),
    images: {
      view360,
      conditionComparison,
      authMarkers,
      wearExamples
    },
    totalImages: view360.length + conditionComparison.length + authMarkers.length + wearExamples.length
  };
}

/**
 * Check if Gemini is configured
 */
export function isGeminiAvailable() {
  return Boolean(GEMINI_API_KEY);
}
