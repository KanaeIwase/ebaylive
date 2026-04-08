/**
 * Unsplash API Service
 * Free tier: 50 requests/hour
 * Get API key: https://unsplash.com/developers
 */

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'demo';
const UNSPLASH_API = 'https://api.unsplash.com';

/**
 * Search for images on Unsplash
 * @param {string} query - Search term (e.g., "Louis Vuitton bag")
 * @param {number} perPage - Number of results (max 30)
 * @returns {Promise<Array>} Array of image objects
 */
export async function searchImages(query, perPage = 10) {
  if (UNSPLASH_ACCESS_KEY === 'demo') {
    console.warn('Using demo mode - add VITE_UNSPLASH_ACCESS_KEY to .env for real images');
    return getDemoImages(query);
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description || query,
      photographer: img.user.name,
      photographerUrl: img.user.links.html,
      downloadUrl: img.links.download_location
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return getDemoImages(query);
  }
}

/**
 * Get a random image for a query
 */
export async function getRandomImage(query) {
  if (UNSPLASH_ACCESS_KEY === 'demo') {
    return getDemoImages(query)[0];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API}/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const img = await response.json();
    return {
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description || query,
      photographer: img.user.name,
      photographerUrl: img.user.links.html
    };
  } catch (error) {
    console.error('Error fetching random image:', error);
    return getDemoImages(query)[0];
  }
}

/**
 * Demo/fallback images when API key not configured
 */
function getDemoImages(query) {
  const lowerQuery = query.toLowerCase();

  // Brand-specific placeholder colors
  const brandColors = {
    'louis vuitton': '#8B4513',
    'chanel': '#000000',
    'hermes': '#FF6B35',
    'gucci': '#006341',
    'prada': '#000000',
    'dior': '#C9A959',
    'cartier': '#DC143C',
    'bulgari': '#8B0000'
  };

  const brand = Object.keys(brandColors).find(b => lowerQuery.includes(b));
  const color = brand ? brandColors[brand] : '#666666';

  return [{
    id: 'demo-' + Math.random(),
    url: createPlaceholderSVG(query, color, 800, 600),
    thumb: createPlaceholderSVG(query, color, 200, 150),
    alt: query,
    photographer: 'Demo Mode',
    photographerUrl: '#',
    isPlaceholder: true
  }];
}

/**
 * Create SVG placeholder image
 */
function createPlaceholderSVG(text, bgColor, width, height) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="24"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${text}
      </text>
      <text
        x="50%"
        y="60%"
        font-family="Arial, sans-serif"
        font-size="14"
        fill="rgba(255,255,255,0.7)"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        Add VITE_UNSPLASH_ACCESS_KEY for real images
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Predefined searches for luxury brands
 */
export const BRAND_IMAGE_QUERIES = {
  'louis-vuitton': 'Louis Vuitton handbag luxury',
  'chanel': 'Chanel classic flap bag',
  'hermes': 'Hermès Birkin bag',
  'gucci': 'Gucci handbag luxury',
  'prada': 'Prada nylon bag',
  'dior': 'Dior saddle bag',
  'cartier': 'Cartier Love bracelet jewelry',
  'bulgari': 'Bulgari Serpenti jewelry'
};

/**
 * Condition example queries
 */
export const CONDITION_IMAGE_QUERIES = {
  'excellent': 'pristine luxury handbag',
  'very-good': 'gently used handbag',
  'good': 'vintage handbag patina',
  'acceptable': 'worn leather bag',
  'hardware': 'handbag zipper hardware closeup',
  'patina': 'vachetta leather patina',
  'corner-wear': 'handbag corner wear',
  'interior': 'handbag interior lining'
};
