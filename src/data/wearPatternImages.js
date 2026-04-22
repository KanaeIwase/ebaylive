/**
 * Real example images for wear patterns
 * Generated using Gemini AI for accurate visual vocabulary examples
 */

import { generateVocabularyImages } from '../services/conditionTrainingImages.js';

// Cache for generated images
let cachedImages = null;

/**
 * Get vocabulary images (generates on first call, then caches)
 */
export async function getVocabularyImages() {
  if (!cachedImages) {
    cachedImages = await generateVocabularyImages();
  }
  return cachedImages;
}

// SVG helper — creates a labeled diagram card
function svgCard(bg, icon, title, subtitle, lineColor = '#555') {
  const svg = `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="${bg}"/>
  <rect x="20" y="20" width="560" height="310" rx="16" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <text x="300" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="80">${icon}</text>
  <rect x="0" y="330" width="600" height="70" fill="rgba(0,0,0,0.35)"/>
  <text x="300" y="358" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="bold" fill="white">${title}</text>
  <text x="300" y="385" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="rgba(255,255,255,0.85)">${subtitle}</text>
</svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

export const WEAR_PATTERN_IMAGES = {
  cornerWear: {
    url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&auto=format&fit=crop',
    description: 'Corner wear on luxury handbag',
    example: 'Noticeable wear at corners, leather slightly darker from handling'
  },
  patina: {
    url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop',
    description: 'Vachetta leather patina - natural honey-colored aging',
    example: 'Beautiful honey patina on handles and trim, even aging'
  },
  scratches: {
    url: svgCard('#8B6914', '🔩', 'Surface Scratches on Hardware', 'Light marks on clasps, zippers, or rings — very common'),
    description: 'Surface scratches on hardware',
    example: 'Light surface scratches on gold hardware, typical for used bags'
  },
  stain: {
    url: svgCard('#5C4A7A', '💧', 'Interior Stain', 'Small mark inside pocket from pen, makeup, or liquid'),
    description: 'Interior stain - small pen mark or makeup transfer',
    example: 'Small stain inside pocket, approximately 1cm, not highly visible'
  },
  hardwareWear: {
    url: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&auto=format&fit=crop',
    description: 'Hardware tarnishing - oxidation on metal',
    example: 'Slight tarnishing on hardware, can be polished'
  },
  leatherCrack: {
    url: svgCard('#7A3B3B', '⚠️', 'Leather Cracking', 'Dry leather developing fine cracks — needs conditioner'),
    description: 'Leather cracking - small cracks in dry areas',
    example: 'Minor cracking on bottom edge, needs leather conditioner'
  },
  waterStain: {
    url: svgCard('#2E5C8A', '🌧️', 'Water Stain on Leather', 'Darker ring or blotch where water absorbed into leather'),
    description: 'Water stain on leather',
    example: 'Water stain on front panel, about 2 inches, slightly darker'
  },
  colorTransfer: {
    url: svgCard('#3B6B5C', '👖', 'Color Transfer', 'Dye from clothing (esp. denim) transferred onto light leather'),
    description: 'Color transfer - denim dye on light leather',
    example: 'Blue denim transfer on back panel, light but visible'
  },
  penMark: {
    url: svgCard('#4A4A6A', '🖊️', 'Pen Mark Inside', 'Ballpoint or marker ink — common in used bags'),
    description: 'Pen mark inside - ballpoint ink mark',
    example: 'Small pen mark inside pocket, black ink, about 1/2 inch'
  },
  stitchingIssue: {
    url: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&auto=format&fit=crop',
    description: 'Loose stitching - minor thread coming loose',
    example: 'Slight loose thread on seam, cosmetic only, not structural'
  }
};

export const CONDITION_IMAGES = {
  excellent: {
    url: svgCard('#1A7A4A', '✨', 'Excellent Condition', 'Like new — no visible wear, perfect hardware, pristine interior'),
    description: 'Excellent condition - like new, pristine',
    details: 'No visible wear, perfect hardware, clean interior, like new from store'
  },
  veryGood: {
    url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop',
    description: 'Very Good - light wear only',
    details: 'Very minimal signs of use, slight patina on vachetta, hardware shiny'
  },
  good: {
    url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&auto=format&fit=crop',
    description: 'Good - moderate wear, well maintained',
    details: 'Clear signs of use, patina developed, minor corner wear, clean overall'
  },
  acceptable: {
    url: svgCard('#8A5A1A', '⚡', 'Acceptable Condition', 'Heavy wear but functional — visible scuffs, dark patina, interior marks'),
    description: 'Acceptable - heavy wear but functional',
    details: 'Significant wear, dark patina, corner scuffs, interior marks, but still usable'
  },
  poor: {
    url: svgCard('#7A1A1A', '🔧', 'Poor Condition', 'Major damage — cracking, stains, broken hardware, needs restoration'),
    description: 'Poor - major damage, for parts or repair',
    details: 'Heavy damage, cracking, stains, broken hardware, needs major restoration'
  }
};
