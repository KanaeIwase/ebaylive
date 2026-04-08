/**
 * SVG illustrations for luxury bag shapes
 * Educational diagrams showing bag silhouettes and parts
 */

export const BAG_SHAPES = {
  // Classic handbag shapes
  tote: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="60" width="140" height="120" rx="5" fill="#8B4513" stroke="#654321" stroke-width="2"/>
    <path d="M 50 60 Q 50 30 100 30 Q 150 30 150 60" fill="none" stroke="#654321" stroke-width="3"/>
    <text x="100" y="190" font-size="12" text-anchor="middle" fill="#333">Tote</text>
  </svg>`,

  satchel: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="70" width="120" height="90" rx="10" fill="#000" stroke="#333" stroke-width="2"/>
    <rect x="60" y="60" width="80" height="15" rx="5" fill="#000" stroke="#333" stroke-width="2"/>
    <path d="M 60 75 Q 60 50 100 50 Q 140 50 140 75" fill="none" stroke="#333" stroke-width="2"/>
    <text x="100" y="190" font-size="12" text-anchor="middle" fill="#333">Satchel</text>
  </svg>`,

  hobo: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="110" rx="70" ry="50" fill="#8B4513" stroke="#654321" stroke-width="2"/>
    <path d="M 50 90 Q 50 60 100 60 Q 150 60 150 90" fill="none" stroke="#654321" stroke-width="3"/>
    <text x="100" y="190" font-size="12" text-anchor="middle" fill="#333">Hobo</text>
  </svg>`,

  crossbody: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="80" width="100" height="70" rx="8" fill="#000" stroke="#333" stroke-width="2"/>
    <rect x="70" y="75" width="60" height="10" rx="3" fill="#000" stroke="#333" stroke-width="1"/>
    <path d="M 20 40 L 70 75" stroke="#654321" stroke-width="4" fill="none"/>
    <text x="100" y="190" font-size="12" text-anchor="middle" fill="#333">Crossbody</text>
  </svg>`,

  clutch: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="90" width="120" height="50" rx="3" fill="#C9A959" stroke="#8B7355" stroke-width="2"/>
    <rect x="40" y="90" width="120" height="25" fill="#000" opacity="0.1"/>
    <circle cx="100" cy="115" r="5" fill="#FFD700"/>
    <text x="100" y="170" font-size="12" text-anchor="middle" fill="#333">Clutch</text>
  </svg>`,

  bucket: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M 60 70 L 50 140 Q 50 150 60 150 L 140 150 Q 150 150 150 140 L 140 70 Z"
          fill="#8B4513" stroke="#654321" stroke-width="2"/>
    <ellipse cx="100" cy="70" rx="40" ry="10" fill="#654321"/>
    <path d="M 70 65 Q 70 50 100 50 Q 130 50 130 65" fill="none" stroke="#654321" stroke-width="2"/>
    <text x="100" y="190" font-size="12" text-anchor="middle" fill="#333">Bucket</text>
  </svg>`,

  saddle: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 100 Q 50 70 80 70 L 120 70 Q 150 70 150 100 Q 150 130 130 140 L 70 140 Q 50 130 50 100 Z"
          fill="#8B4513" stroke="#654321" stroke-width="2"/>
    <path d="M 80 70 Q 80 50 100 50 Q 120 50 120 70" fill="none" stroke="#654321" stroke-width="3"/>
    <text x="100" y="170" font-size="12" text-anchor="middle" fill="#333">Saddle</text>
  </svg>`,

  baguette: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="85" width="100" height="60" rx="30" fill="#000" stroke="#333" stroke-width="2"/>
    <path d="M 75 85 Q 75 65 100 65 Q 125 65 125 85" fill="none" stroke="#333" stroke-width="3"/>
    <text x="100" y="175" font-size="12" text-anchor="middle" fill="#333">Baguette</text>
  </svg>`
};

/**
 * Bag parts/anatomy diagrams
 */
export const BAG_PARTS = {
  handle: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M 40 60 Q 40 20 100 20 Q 160 20 160 60"
          fill="none" stroke="#654321" stroke-width="8" stroke-linecap="round"/>
    <circle cx="40" cy="60" r="6" fill="#FFD700"/>
    <circle cx="160" cy="60" r="6" fill="#FFD700"/>
    <text x="100" y="75" font-size="10" text-anchor="middle" fill="#333">Handle</text>
  </svg>`,

  hardware: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="25" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
    <circle cx="50" cy="50" r="15" fill="none" stroke="#B8860B" stroke-width="2"/>
    <text x="50" y="95" font-size="10" text-anchor="middle" fill="#333">Hardware</text>
  </svg>`,

  zipper: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="45" width="110" height="10" fill="#C0C0C0"/>
    <path d="M 25 50 L 125 50" stroke="#808080" stroke-width="2" stroke-dasharray="3,3"/>
    <rect x="60" y="40" width="8" height="20" rx="2" fill="#FFD700"/>
    <circle cx="64" cy="35" r="4" fill="#FFD700"/>
    <text x="75" y="90" font-size="10" text-anchor="middle" fill="#333">Zipper</text>
  </svg>`,

  corners: `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="30" width="90" height="90" rx="5" fill="#8B4513" stroke="#654321" stroke-width="2"/>
    <circle cx="35" cy="35" r="8" fill="#FF6B6B" opacity="0.7"/>
    <circle cx="115" cy="35" r="8" fill="#FF6B6B" opacity="0.7"/>
    <circle cx="35" cy="115" r="8" fill="#FF6B6B" opacity="0.7"/>
    <circle cx="115" cy="115" r="8" fill="#FF6B6B" opacity="0.7"/>
    <text x="75" y="145" font-size="10" text-anchor="middle" fill="#333">Corners (wear points)</text>
  </svg>`
};

/**
 * Condition indicators
 */
export const CONDITION_INDICATORS = {
  excellent: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#4CAF50" opacity="0.2" stroke="#4CAF50" stroke-width="3"/>
    <path d="M 30 50 L 45 65 L 70 35" fill="none" stroke="#4CAF50" stroke-width="5" stroke-linecap="round"/>
    <text x="50" y="95" font-size="10" text-anchor="middle" fill="#333">Excellent</text>
  </svg>`,

  veryGood: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#8BC34A" opacity="0.2" stroke="#8BC34A" stroke-width="3"/>
    <path d="M 30 50 L 45 65 L 70 40" fill="none" stroke="#8BC34A" stroke-width="4" stroke-linecap="round"/>
    <text x="50" y="95" font-size="10" text-anchor="middle" fill="#333">Very Good</text>
  </svg>`,

  good: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#FFC107" opacity="0.2" stroke="#FFC107" stroke-width="3"/>
    <circle cx="35" cy="45" r="3" fill="#FFC107"/>
    <circle cx="65" cy="45" r="3" fill="#FFC107"/>
    <path d="M 35 60 Q 50 65 65 60" fill="none" stroke="#FFC107" stroke-width="3" stroke-linecap="round"/>
    <text x="50" y="95" font-size="10" text-anchor="middle" fill="#333">Good</text>
  </svg>`,

  acceptable: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#FF9800" opacity="0.2" stroke="#FF9800" stroke-width="3"/>
    <circle cx="35" cy="45" r="3" fill="#FF9800"/>
    <circle cx="65" cy="45" r="3" fill="#FF9800"/>
    <line x1="35" y1="62" x2="65" y2="62" stroke="#FF9800" stroke-width="3" stroke-linecap="round"/>
    <text x="50" y="95" font-size="10" text-anchor="middle" fill="#333">Acceptable</text>
  </svg>`,

  poor: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="#F44336" opacity="0.2" stroke="#F44336" stroke-width="3"/>
    <circle cx="35" cy="45" r="3" fill="#F44336"/>
    <circle cx="65" cy="45" r="3" fill="#F44336"/>
    <path d="M 35 65 Q 50 55 65 65" fill="none" stroke="#F44336" stroke-width="3" stroke-linecap="round"/>
    <text x="50" y="95" font-size="10" text-anchor="middle" fill="#333">Poor</text>
  </svg>`
};

/**
 * Wear pattern examples
 */
export const WEAR_PATTERNS = {
  cornerWear: `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wear" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#999"/>
      </pattern>
    </defs>
    <rect x="20" y="20" width="110" height="110" rx="5" fill="#8B4513" stroke="#654321" stroke-width="2"/>
    <circle cx="25" cy="25" r="15" fill="url(#wear)"/>
    <path d="M 15 15 L 35 35" stroke="#FF6B6B" stroke-width="2"/>
    <text x="75" y="145" font-size="10" text-anchor="middle" fill="#333">Corner Wear</text>
  </svg>`,

  patina: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="patinaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#F5DEB3;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#D2B48C;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8B7355;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="10" y="20" width="130" height="60" rx="3" fill="url(#patinaGrad)"/>
    <text x="75" y="95" font-size="10" text-anchor="middle" fill="#333">Vachetta Patina</text>
  </svg>`,

  scratches: `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="110" height="110" rx="5" fill="#000" stroke="#333" stroke-width="2"/>
    <line x1="40" y1="50" x2="90" y2="60" stroke="#666" stroke-width="1.5" opacity="0.5"/>
    <line x1="50" y1="70" x2="100" y2="75" stroke="#666" stroke-width="1" opacity="0.5"/>
    <line x1="45" y1="90" x2="85" y2="95" stroke="#666" stroke-width="1.5" opacity="0.5"/>
    <line x1="60" y1="100" x2="95" y2="100" stroke="#666" stroke-width="1" opacity="0.5"/>
    <text x="75" y="145" font-size="10" text-anchor="middle" fill="#333">Surface Scratches</text>
  </svg>`,

  stain: `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="110" height="110" rx="5" fill="#F5DEB3" stroke="#D2B48C" stroke-width="2"/>
    <ellipse cx="70" cy="70" rx="20" ry="15" fill="#8B7355" opacity="0.4"/>
    <ellipse cx="68" cy="68" rx="12" ry="9" fill="#8B7355" opacity="0.3"/>
    <text x="75" y="145" font-size="10" text-anchor="middle" fill="#333">Interior Stain</text>
  </svg>`
};

/**
 * Helper function to create inline SVG data URL
 */
export function svgToDataURL(svgString) {
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}

/**
 * Get bag shape SVG by name
 */
export function getBagShapeSVG(shapeName) {
  return BAG_SHAPES[shapeName] || BAG_SHAPES.tote;
}

/**
 * Get condition indicator SVG by grade
 */
export function getConditionSVG(condition) {
  return CONDITION_INDICATORS[condition] || CONDITION_INDICATORS.good;
}
