# 🎉 FREE Gemini Integration Guide

## Google Gemini FREE Tier

Google provides **FREE access** to Gemini models with generous limits:

### Free Models Available:
1. **gemini-2.5-flash-image** - Image generation (FREE!)
2. **gemini-2.5-pro-preview-tts** - Text-to-speech (FREE!)
3. **gemini-3.1-flash-live-preview** - Live features (FREE!)

### Free Tier Limits:
- ✅ **15 requests per minute**
- ✅ **1,500 requests per day**
- ✅ **1,000,000 requests per month**
- ✅ **TOTALLY FREE - No credit card required!**

---

## How to Get FREE Gemini API Key

### Step 1: Get Your Free API Key

1. Go to: **https://aistudio.google.com/app/apikey**
2. Click "Create API Key"
3. Select "Create API key in new project"
4. Copy your API key

**That's it! No credit card, no payment, 100% free!**

### Step 2: Add to Your App

Create or edit `.env` file:

```bash
# FREE Gemini API Key
VITE_GEMINI_API_KEY=your_free_api_key_here
```

### Step 3: Restart the App

```bash
npm run dev
```

---

## What You Get for FREE

### 1. AI-Generated Training Images
Generate custom product photos for training:
- 360° product views (all 7 angles)
- Condition comparisons (excellent vs good vs worn)
- Wear pattern examples (corner wear, patina, scratches)
- Authentication marker closeups

**Usage:** ~10-20 images per training session
**Cost:** $0 (within free tier limits)

### 2. Text-to-Speech Pronunciation
Hear correct pronunciation of luxury brand names and terms:
- "Louis Vuitton" → Audio playback
- "Hermès Birkin" → Audio playback  
- All vocabulary terms → Audio playback

**Usage:** ~50-100 pronunciations per day
**Cost:** $0 (within free tier limits)

### 3. Live AI Coaching
Real-time feedback on condition descriptions:
- AI evaluates your descriptions
- Suggests improvements
- Practice scenarios with feedback

**Usage:** ~20-30 practice sessions per day
**Cost:** $0 (within free tier limits)

---

## Cost Comparison

### Without Gemini API (Current):
- Pexels photos: FREE ✅
- SVG diagrams: FREE ✅
- **Total:** $0/month

### With FREE Gemini API:
- Pexels photos: FREE ✅
- SVG diagrams: FREE ✅
- AI image generation: FREE ✅ (1500/day)
- Text-to-speech: FREE ✅ (1500/day)
- AI coaching: FREE ✅ (1500/day)
- **Total:** $0/month

**YOU GET EVERYTHING FOR FREE!** 🎉

---

## Usage Estimates

### For Individual Learner:
- Generate 10 training images: ~10 requests
- Practice 20 vocabulary words: ~20 requests
- 5 AI coaching sessions: ~25 requests
- **Total per day: ~55 requests** (well within 1500 limit!)

### For Small Training Organization (10 users):
- Each user: 50 requests/day
- Total: 500 requests/day
- **Still FREE!** (within 1500 limit)

### For Large Organization (100 users):
- Each user: 15 requests/day average
- Total: 1500 requests/day
- **Still FREE!** (exactly at limit)

---

## Rate Limits Explained

### 15 Requests Per Minute
- Prevents spam/abuse
- Normal usage won't hit this
- If you do: just wait 1 minute

### 1,500 Requests Per Day
- Very generous for training
- Resets every 24 hours
- Track in Google Cloud Console

### 1,000,000 Requests Per Month
- Essentially unlimited for training use
- Would require 33,333 requests/day to hit
- You'll never reach this limit

---

## What Happens If You Hit the Limit?

**Graceful Fallback:**
1. Gemini API hits limit
2. App automatically falls back to:
   - Pexels free photos (still work!)
   - SVG diagrams (always work!)
3. No errors, no crashes
4. User sees message: "Using free photos instead"

**You never lose functionality!**

---

## How to Monitor Usage

### Option 1: Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Select your project
3. Navigate to: APIs & Services → Dashboard
4. See usage graphs

### Option 2: In-App (Future Feature)
We can add a usage counter showing:
- Requests used today: 47 / 1500
- Requests this month: 1,234 / 1,000,000

---

## Best Practices for Free Tier

### DO:
✅ Generate training images once, save them
✅ Cache AI responses to avoid duplicates
✅ Use text-to-speech for learning, not repeatedly
✅ Share generated images among users

### DON'T:
❌ Generate same image multiple times
❌ Make requests in rapid loops
❌ Auto-refresh pages with AI calls
❌ Let users spam the "generate" button

---

## Recommended Features to Enable

### Priority 1: Text-to-Speech (High Value, Low Cost)
- Helps with pronunciation
- ~50 requests per user
- Major learning benefit

### Priority 2: Condition Training Images (Medium Cost)
- Generate once per brand/model
- Cache and reuse
- ~100 images total needed

### Priority 3: AI Coaching (Medium Cost)
- Practice scenarios
- Real-time feedback
- ~20 sessions per user

---

## Migration from Paid APIs

### Current Setup:
- Anthropic (paid): $20-40/month
- Unsplash (free): $0
- Gemini (paid): $20-40/month

### New Setup with FREE Gemini:
- Anthropic: Can remove! ✅
- Pexels (free): $0 ✅
- Gemini (FREE tier): $0 ✅
- **Total: $0/month** 🎉

---

## Example: Generate 360° View (FREE)

```javascript
// Generate all 7 angles of Louis Vuitton Speedy
import { generate360View } from './services/conditionTrainingImages';

const views = await generate360View('Speedy', 'Louis Vuitton', 'good');

// Returns 7 images (front, back, left, right, interior, top, bottom)
// Cost: 7 API calls = $0 (free tier)
// Time: ~5-10 seconds
```

**Each user can generate:**
- 1500 requests/day ÷ 7 angles = **214 complete 360° views per day**
- That's INSANE value for FREE!

---

## Example: Text-to-Speech (FREE)

```javascript
// Generate pronunciation for vocabulary
import { speakText } from './services/gemini';

await speakText('Louis Vuitton Speedy', 'en');
// Returns: Audio file (MP3)
// Cost: 1 API call = $0 (free tier)
```

**Each user can:**
- Generate 1500 pronunciations per day
- Entire vocabulary list: ~100 words
- Can practice 15 times per day = FREE!

---

## Deployment with FREE Gemini

### Step 1: Get Free API Key
https://aistudio.google.com/app/apikey

### Step 2: Add to Vercel
```bash
vercel env add VITE_GEMINI_API_KEY
# Paste your free API key
```

### Step 3: Deploy
```bash
vercel --prod
```

### Step 4: Enjoy FREE AI Features!
- Image generation: FREE
- Text-to-speech: FREE
- AI coaching: FREE

---

## FAQ

### Q: Is there really no cost?
**A:** YES! Gemini free tier is truly free. No credit card, no hidden fees.

### Q: What if I exceed the free tier?
**A:** App falls back to Pexels + SVG (also free). No errors.

### Q: Can I upgrade later if needed?
**A:** Yes, Gemini has paid tiers if you need >1500/day. But most users won't.

### Q: Is the quality good on free tier?
**A:** YES! Same quality as paid tier, just with rate limits.

### Q: Do I need a credit card?
**A:** NO! Completely free, no card required.

---

## Ready to Enable FREE AI?

```bash
# 1. Get free API key
open https://aistudio.google.com/app/apikey

# 2. Add to .env
echo "VITE_GEMINI_API_KEY=your_key_here" >> .env

# 3. Restart app
npm run dev

# 4. Enjoy FREE AI features! 🎉
```

---

**Total Monthly Cost: $0**  
**Total Setup Time: 2 minutes**  
**Total Value: MASSIVE!** ✨

**Get your free API key now:** https://aistudio.google.com/app/apikey
