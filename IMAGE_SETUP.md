# Image Setup Guide

The eBay Live Academy uses multiple image sources to provide rich visual learning content:

1. **SVG Diagrams** (Built-in) - Bag shapes, condition indicators, wear patterns
2. **Unsplash API** (Optional) - Real photos of luxury products
3. **Gemini AI** (Optional) - AI-generated reference images

## 🎨 Image Sources

### 1. SVG Diagrams ✅ (No setup needed)

Built-in SVG diagrams are always available:
- Bag shapes (tote, satchel, hobo, crossbody, clutch, bucket, saddle, baguette)
- Condition indicators (excellent, very good, good, acceptable, poor)
- Wear patterns (corner wear, patina, scratches, stains)
- Bag anatomy (handle, hardware, zipper, corners)

These are lightweight, scalable, and work offline.

### 2. Unsplash API (Real Photos)

**Free tier**: 50 requests/hour

**Setup:**

1. Go to https://unsplash.com/developers
2. Register as a developer
3. Create a new application
4. Copy your Access Key
5. Add to `.env`:
   ```
   VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

**Benefits:**
- High-quality professional photos
- Searchable by brand and product
- Legal to use with attribution
- Updates automatically

**Limitations:**
- 50 requests/hour on free tier
- Not all specific models may have photos
- Requires internet connection

### 3. Gemini API (AI-Generated Images)

**Pricing**: Pay per generation (check Google AI pricing)

**Setup:**

1. Go to https://ai.google.dev/
2. Get an API key
3. Add to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

**Benefits:**
- Generate specific reference images on demand
- Perfect for condition examples
- Can create educational diagrams
- Custom prompts for any scenario

**Limitations:**
- Costs money per generation
- Requires internet connection
- Generated images are not real products

## 🚀 Quick Start

### Minimum Setup (Free)

Just use the built-in SVG diagrams - no API keys needed!

The app will work perfectly with educational diagrams showing bag shapes and condition grades.

### Recommended Setup

Add **Unsplash** for real product photos:

```bash
# .env file
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key
```

This gives you real luxury bag photos while staying within the free tier.

### Premium Setup

Add both **Unsplash** AND **Gemini** for maximum visual content:

```bash
# .env file
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key
VITE_GEMINI_API_KEY=your_gemini_key
```

**Fallback chain:**
1. Try Unsplash (real photos)
2. If not found → Try Gemini (AI-generated)
3. If not available → Use SVG (built-in diagrams)

## 📝 Usage in Code

```javascript
import { getBrandImage, getConditionImage, getBagShapeImage } from './services/imageGenerator';

// Get brand image (tries Unsplash → Gemini → SVG)
const lvImage = await getBrandImage('lv', 'Speedy');

// Get condition example (tries SVG → Gemini → placeholder)
const wearImage = await getConditionImage('corner-wear');

// Get bag shape (always SVG)
const shapeImage = getBagShapeImage('tote');
```

## 🎯 Image Strategy by Content Type

| Content | Best Source | Why |
|---------|------------|-----|
| Bag Shapes | SVG | Clean diagrams, always work offline |
| Condition Grades | SVG → Gemini | Educational clarity |
| Brand Products | Unsplash → Gemini | Real photos > AI > placeholders |
| Wear Examples | Gemini → Unsplash | Specific conditions hard to find in stock photos |
| Anatomy Diagrams | SVG | Technical accuracy |

## 💰 Cost Estimate

### Free Tier (Unsplash only)
- **Cost**: $0/month
- **Limits**: 50 requests/hour
- **Good for**: Individual learners, testing

### Premium (Unsplash + Gemini)
- **Unsplash**: $0/month (stay under 50/hr)
- **Gemini**: ~$0.02-0.05 per image
- **Estimated**: $10-30/month for 500-1000 generations
- **Good for**: Production deployment, rich content

## 🔧 Troubleshooting

### "Images not loading"

1. Check if API key is in `.env`:
   ```bash
   cat .env | grep VITE_UNSPLASH
   ```

2. Restart dev server after adding keys:
   ```bash
   npm run dev
   ```

3. Check browser console for API errors

### "Unsplash rate limit exceeded"

- Free tier: 50 requests/hour
- Wait 1 hour or upgrade plan
- App will fallback to Gemini or SVG

### "Gemini images not generating"

1. Verify API key is correct
2. Check you have credits/billing enabled
3. Review Google AI quotas
4. App will fallback to SVG placeholders

## 📊 Monitoring Usage

### Unsplash Dashboard
https://unsplash.com/developers → Your Apps → Usage

### Gemini Usage
https://console.cloud.google.com/apis/dashboard

## 🎨 Customization

### Adding New Bag Shapes

Edit `src/utils/bagShapeSVG.js`:

```javascript
export const BAG_SHAPES = {
  // ... existing shapes
  myNewShape: `<svg>...</svg>`
};
```

### Adding New Brand Image Queries

Edit `src/services/unsplash.js`:

```javascript
export const BRAND_IMAGE_QUERIES = {
  // ... existing queries
  'my-brand': 'My Brand luxury handbag'
};
```

### Custom Gemini Prompts

Edit `src/services/imageGenerator.js` to customize AI generation prompts.

## 🌐 Deployment Notes

### Vercel Deployment

Add environment variables in Vercel Dashboard:

```bash
vercel env add VITE_UNSPLASH_ACCESS_KEY
vercel env add VITE_GEMINI_API_KEY
```

Then redeploy:

```bash
vercel --prod
```

### Netlify Deployment

Add in Site Settings → Build & Deploy → Environment:

```
VITE_UNSPLASH_ACCESS_KEY=your_key
VITE_GEMINI_API_KEY=your_key
```

## 📚 References

- Unsplash API Docs: https://unsplash.com/documentation
- Gemini API Docs: https://ai.google.dev/docs
- SVG Reference: https://developer.mozilla.org/en-US/docs/Web/SVG

---

**Pro Tip**: Start with just SVG diagrams (free, always works). Add Unsplash when you need real photos. Add Gemini only if you need AI-generated custom scenarios.
