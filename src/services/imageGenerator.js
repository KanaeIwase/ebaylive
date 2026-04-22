/**
 * Multi-source Image Generator
 * Combines Unsplash (real photos), Gemini (AI-generated), and SVG (diagrams)
 * Falls back gracefully when APIs are not available
 */

import { searchPexelsImages, getConditionImages } from './pexels.js';
import { searchImages, getRandomImage, BRAND_IMAGE_QUERIES } from './unsplash.js';
import { BAG_SHAPES, CONDITION_INDICATORS, WEAR_PATTERNS } from '../utils/bagShapeSVG.js';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Get the best available image for a luxury brand/model
 * Priority: Pexels (FREE!) → Unsplash → Gemini → SVG placeholder
 */
export async function getBrandImage(brandKey, modelName = null, variation = 0) {
  // Try Pexels first (100% FREE, no API key needed!)
  try {
    const query = modelName
      ? `luxury ${modelName} handbag`
      : `luxury ${brandKey} handbag`;

    const results = await searchPexelsImages(query, 1);
    if (results && results.length > 0) {
      return {
        src: results[0].url,
        thumb: results[0].thumb,
        source: 'pexels',
        attribution: `Photo by ${results[0].photographer} (Pexels - Free)`,
        attributionUrl: results[0].photographerUrl
      };
    }
  } catch (error) {
    console.log('Pexels not available, trying Unsplash...');
  }

  // Try Unsplash as fallback
  try {
    const query = modelName
      ? `${BRAND_IMAGE_QUERIES[brandKey]} ${modelName}`
      : BRAND_IMAGE_QUERIES[brandKey];

    const results = await searchImages(query, 1);
    if (results && results.length > 0 && !results[0].isPlaceholder) {
      return {
        src: results[0].url,
        thumb: results[0].thumb,
        source: 'unsplash',
        attribution: `Photo by ${results[0].photographer}`,
        attributionUrl: results[0].photographerUrl
      };
    }
  } catch (error) {
    console.log('Unsplash not available, trying Gemini...');
  }

  // Try Gemini if configured
  if (GEMINI_API_KEY) {
    try {
      const geminiImage = await generateGeminiImage(brandKey, modelName, variation);
      if (geminiImage) {
        return {
          src: geminiImage,
          thumb: geminiImage,
          source: 'gemini',
          attribution: 'AI Generated',
          attributionUrl: null
        };
      }
    } catch (error) {
      console.log('Gemini not available, using placeholder...', error);
    }
  }

  // Fallback to SVG placeholder
  return {
    src: createBrandPlaceholder(brandKey, modelName),
    thumb: createBrandPlaceholder(brandKey, modelName),
    source: 'placeholder',
    attribution: 'Placeholder - Add API keys for images',
    attributionUrl: null
  };
}

/**
 * Generate image using Gemini API
 */
async function generateGeminiImage(brandKey, modelName, variation = 0) {
  if (!GEMINI_API_KEY) return null;

  const angles = ['front view', 'side view', 'back view', 'detail closeup', 'overhead view', 'three-quarter view'];
  const angle = angles[variation % angles.length];

  const prompts = {
    'lv': `Louis Vuitton ${modelName || 'handbag'}, ${angle}, luxury product photography`,
    'chanel': `Chanel ${modelName || 'handbag'}, ${angle}, luxury product photography`,
    'hermes': `Hermès ${modelName || 'Birkin bag'}, ${angle}, luxury product photography`,
    'gucci': `Gucci ${modelName || 'handbag'}, ${angle}, luxury product photography`,
    'prada': `Prada ${modelName || 'handbag'}, ${angle}, luxury product photography`,
    'dior': `Dior ${modelName || 'handbag'}, ${angle}, luxury product photography`,
    'cartier': `Cartier ${modelName || 'jewelry'}, ${angle}, luxury product photography`,
    'bulgari': `Bulgari ${modelName || 'jewelry'}, ${angle}, luxury product photography`
  };

  const prompt = prompts[brandKey] || `Luxury ${modelName || 'product'}, ${angle}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${prompt}, professional product photography, white background, studio lighting, high detail, luxury catalog style` }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', response.status, errorData);
      return null;
    }

    const data = await response.json();
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
  } catch (error) {
    console.error('Gemini image generation error:', error);
  }

  return null;
}

/**
 * Get condition example image
 */
export async function getConditionImage(conditionType) {
  // Check if we have SVG first
  if (CONDITION_INDICATORS[conditionType]) {
    return {
      src: `data:image/svg+xml;base64,${btoa(CONDITION_INDICATORS[conditionType])}`,
      thumb: `data:image/svg+xml;base64,${btoa(CONDITION_INDICATORS[conditionType])}`,
      source: 'svg',
      attribution: 'Built-in diagram',
      attributionUrl: null
    };
  }

  // Try Gemini for condition examples
  if (GEMINI_API_KEY) {
    const prompt = getConditionPrompt(conditionType);
    const geminiImage = await generateConditionImageGemini(prompt);
    if (geminiImage) {
      return {
        src: geminiImage,
        thumb: geminiImage,
        source: 'gemini',
        attribution: 'AI Generated',
        attributionUrl: null
      };
    }
  }

  // Fallback
  return {
    src: createConditionPlaceholder(conditionType),
    thumb: createConditionPlaceholder(conditionType),
    source: 'placeholder',
    attribution: 'Placeholder',
    attributionUrl: null
  };
}

/**
 * Generate condition image with Gemini
 */
async function generateConditionImageGemini(prompt) {
  if (!GEMINI_API_KEY) return null;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${prompt}, closeup detail photography, educational reference` }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
        })
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }
  } catch (error) {
    console.error('Gemini condition image error:', error);
  }

  return null;
}

/**
 * Get prompts for condition examples
 */
function getConditionPrompt(conditionType) {
  const prompts = {
    'corner-wear': 'leather handbag corner with scuffing and wear marks',
    'patina': 'vachetta leather with honey patina, natural aging',
    'scratches': 'luxury handbag hardware with surface scratches',
    'stain': 'handbag interior with small stain',
    'excellent': 'pristine luxury handbag, perfect condition',
    'good': 'gently used luxury handbag',
    'hardware': 'gold-tone handbag zipper and clasp',
    'stitching': 'leather handbag stitching detail'
  };

  return prompts[conditionType] || `luxury handbag ${conditionType}`;
}

/**
 * Create SVG placeholder for brand
 */
function createBrandPlaceholder(brandKey, modelName) {
  const brandColors = {
    'lv': '#8B4513',
    'chanel': '#000000',
    'hermes': '#FF6B35',
    'gucci': '#006341',
    'prada': '#000000',
    'dior': '#C9A959',
    'cartier': '#DC143C',
    'bulgari': '#8B0000'
  };

  const color = brandColors[brandKey] || '#666666';
  const text = modelName || brandKey.toUpperCase();

  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text
        x="50%"
        y="45%"
        font-family="Arial, sans-serif"
        font-size="32"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${text}
      </text>
      <text
        x="50%"
        y="55%"
        font-family="Arial, sans-serif"
        font-size="14"
        fill="rgba(255,255,255,0.8)"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        Reference Image
      </text>
      <text
        x="50%"
        y="70%"
        font-family="Arial, sans-serif"
        font-size="11"
        fill="rgba(255,255,255,0.6)"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        Add API keys for real images
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Create SVG placeholder for condition
 */
function createConditionPlaceholder(conditionType) {
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="16"
        fill="#666"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${conditionType}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Get bag shape diagram (always from SVG)
 */
export function getBagShapeImage(shapeName) {
  const svg = BAG_SHAPES[shapeName] || BAG_SHAPES.tote;
  return {
    src: `data:image/svg+xml;base64,${btoa(svg)}`,
    thumb: `data:image/svg+xml;base64,${btoa(svg)}`,
    source: 'svg',
    attribution: 'Built-in diagram',
    attributionUrl: null
  };
}

/**
 * Check which image sources are available
 */
export function getAvailableSources() {
  return {
    unsplash: Boolean(import.meta.env.VITE_UNSPLASH_ACCESS_KEY),
    gemini: Boolean(GEMINI_API_KEY),
    svg: true // Always available
  };
}
