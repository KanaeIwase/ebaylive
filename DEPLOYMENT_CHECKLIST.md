# Deployment Checklist - eBay Live Academy

## ✅ Ready to Deploy!

All image features have been integrated and tested. Follow this checklist to deploy to Vercel.

---

## Pre-Deployment Checklist

### 1. Environment Variables Setup

Create `.env` file with your API keys (optional):

```bash
# .env file
VITE_ANTHROPIC_API_KEY=your_anthropic_key  # For AI features
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key  # For real product photos
VITE_GEMINI_API_KEY=your_gemini_key         # For AI-generated training images
```

**Note:** App works perfectly without any API keys using built-in SVG diagrams!

### 2. Local Testing

```bash
# Install dependencies
npm install

# Test development server
npm run dev

# Open browser
# Navigate to http://localhost:3000

# Test these pages:
# - Brand Knowledge → Select LV → Speedy → Visual Training section
# - Vocabulary → Scroll to Condition Assessment Training
```

### 3. Build Test

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# ✓ Should see: "built in ~300-400ms"
# ✓ Bundle size: ~400KB (133KB gzipped)
```

---

## Vercel Deployment

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Follow prompts:
# - Link to existing project? [y/N] → N (first time) or Y
# - Project name? → ebay-live-academy
# - Which directory? → ./
# - Override settings? → N

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push to GitHub:
```bash
git push origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

---

## Add Environment Variables to Vercel

### Via Dashboard

1. Go to project dashboard on Vercel
2. Settings → Environment Variables
3. Add each variable:
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: `your_api_key_here`
   - Environment: Production + Preview + Development
4. Click "Save"
5. Repeat for `VITE_UNSPLASH_ACCESS_KEY` and `VITE_GEMINI_API_KEY`
6. **Redeploy** for changes to take effect

### Via CLI

```bash
# Add environment variable
vercel env add VITE_ANTHROPIC_API_KEY

# You'll be prompted to enter the value
# Select: Production + Preview + Development

# Repeat for other keys
vercel env add VITE_UNSPLASH_ACCESS_KEY
vercel env add VITE_GEMINI_API_KEY

# Redeploy
vercel --prod
```

---

## Post-Deployment Testing

### 1. Basic Functionality

- [ ] Homepage loads correctly
- [ ] Language toggle (EN/JP) works
- [ ] Navigation between pages works
- [ ] Game modules load

### 2. Image Features (Without API Keys)

- [ ] Brand Knowledge → Model detail shows SVG placeholders
- [ ] Vocabulary → Condition training shows SVG diagrams
- [ ] Bag shapes display correctly
- [ ] Condition indicators display correctly

### 3. Image Features (With Unsplash API)

- [ ] Brand images load from Unsplash
- [ ] Image gallery shows real photos
- [ ] Attribution links work

### 4. Image Features (With Gemini API)

- [ ] Click "Generate 360° View" button
- [ ] Wait for AI image generation (~5-10 seconds)
- [ ] Images display correctly
- [ ] "Generate Comparison" works
- [ ] Practice scenarios show AI-generated images

### 5. Mobile Testing

- [ ] Open on mobile device
- [ ] Navigation works on touch
- [ ] Images load properly
- [ ] Responsive layout works
- [ ] PWA install prompt appears

---

## Performance Checklist

✅ **Bundle Size**: 400KB (133KB gzipped) - Good!
✅ **Build Time**: ~350ms - Excellent!
✅ **Lighthouse Score**: Expected 90+ (run after deployment)

### Optimize Further (Optional)

1. **Enable Brotli compression** (Vercel auto-enables)
2. **Add image caching headers** (Vercel auto-configures)
3. **Monitor API usage**:
   - Unsplash: 50 req/hour free
   - Gemini: Monitor usage in Google Cloud Console
   - Anthropic: Monitor in Anthropic Dashboard

---

## Troubleshooting

### Issue: "Environment variables not working"

**Solution:**
1. Check variable names start with `VITE_`
2. Redeploy after adding variables
3. Clear browser cache

### Issue: "Images not loading"

**Solution:**
1. Check API keys are correct
2. Check API quotas not exceeded
3. App will fallback to SVG - this is normal!

### Issue: "Build fails on Vercel"

**Solution:**
1. Check `package.json` dependencies are correct
2. Ensure `vite.config.js` exists
3. Check build command is `npm run build`
4. Output directory is `dist`

### Issue: "Slow image generation"

**Expected behavior:**
- Gemini AI images: 5-15 seconds per image
- Unsplash photos: 1-2 seconds
- SVG diagrams: Instant

---

## Cost Monitoring

### Free Tier Limits

**Vercel:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Free for hobby projects

**Unsplash:**
- ✅ 50 requests/hour
- ❌ No commercial restrictions with attribution

**Gemini:**
- ⚠️ Pay per image (~$0.02-0.05 each)
- **Recommendation**: Generate training sets once, cache them

**Anthropic:**
- ⚠️ Pay per token
- Current usage: ~$0.02-0.05 per AI interaction

### Estimated Monthly Costs

**Scenario 1: No API Keys**
- Cost: **$0/month** (everything works with SVG!)

**Scenario 2: Unsplash Only**
- Cost: **$0/month** (50 req/hour is generous)

**Scenario 3: Full Features (100 active users)**
- Unsplash: $0
- Gemini: $20-40 (if generating many training images)
- Anthropic: $20-40 (AI coaching features)
- **Total: ~$40-80/month**

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to Project → Settings → Domains
2. Add your domain (e.g., `academy.yourdomain.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~5-10 minutes)
5. Vercel auto-provisions SSL certificate

### Example DNS Settings

```
Type: CNAME
Name: academy
Value: cname.vercel-dns.com
```

---

## Analytics Setup (Optional)

### Vercel Analytics

```bash
npm install @vercel/analytics

# Add to src/main.jsx:
import { inject } from '@vercel/analytics';
inject();
```

Redeploy → See analytics in Vercel dashboard

### Google Analytics

Add to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

---

## Backup & Recovery

### Export User Data

Users can export their progress via the app:
- Click "Export Data" button
- Downloads JSON file with XP, achievements, etc.

### Backup Code

```bash
# Create backup
git tag v1.0.0
git push origin v1.0.0

# Or download ZIP
git archive -o ebay-live-academy-backup.zip HEAD
```

---

## Maintenance Schedule

**Weekly:**
- [ ] Check API usage and costs
- [ ] Review error logs (Vercel dashboard)
- [ ] Monitor user feedback

**Monthly:**
- [ ] Update dependencies: `npm update`
- [ ] Review and merge security patches
- [ ] Check bundle size hasn't grown significantly

**Quarterly:**
- [ ] Lighthouse audit for performance
- [ ] User survey for feedback
- [ ] Consider adding new features

---

## 🚀 Quick Deploy Commands

```bash
# Full deployment workflow
npm install          # Install dependencies
npm run build        # Test build locally
npm run preview      # Test production build
vercel --prod        # Deploy to production

# Or use the shortcut:
npm install && npm run build && vercel --prod
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **Unsplash API**: https://unsplash.com/documentation
- **Gemini API**: https://ai.google.dev/docs
- **Anthropic API**: https://docs.anthropic.com/

---

## Success Criteria

Deployment is successful when:

✅ Homepage loads < 2 seconds
✅ All navigation links work
✅ Images display (SVG, Unsplash, or Gemini)
✅ Mobile responsive works
✅ Language toggle functions
✅ Game modules playable
✅ No console errors
✅ PWA installable

---

**Ready to go live? Run:**

```bash
vercel --prod
```

**Your eBay Live Academy is ready! 🎉**
