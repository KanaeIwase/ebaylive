# eBay Live Academy - Deployment Guide

Complete guide for deploying the eBay Live Academy to production.

## Prerequisites

- Node.js 18+ installed
- Anthropic API key (for AI features)
- Hosting service account (Vercel, Netlify, or similar)

## Configuration

### 1. Environment Variables

Create a `.env` file in the project root:

```bash
# Anthropic API Key (required for AI features)
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Important:** Never commit `.env` to version control. The `.env.example` file shows the required format.

### 2. API Key Setup

1. Get an Anthropic API key from https://console.anthropic.com/
2. Add it to your `.env` file
3. For production deployment, add it to your hosting service's environment variables

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (test locally)
npm run build

# Preview production build
npm run preview
```

Development server runs at: http://localhost:3000/

## Production Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add Environment Variables:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add `VITE_ANTHROPIC_API_KEY` with your API key
   - Redeploy for changes to take effect

4. **Custom Domain (Optional):**
   - Go to Project → Settings → Domains
   - Add your custom domain and follow DNS instructions

### Option 2: Netlify

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Deploy:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod
   ```

3. **Environment Variables:**
   - Go to Site Settings → Build & Deploy → Environment
   - Add `VITE_ANTHROPIC_API_KEY`

### Option 3: GitHub Pages

1. **Add to `vite.config.js`:**
   ```js
   export default defineConfig({
     base: '/ebay-live-game/', // Your repo name
     // ... other config
   })
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   # Push dist folder to gh-pages branch
   ```

### Option 4: AWS S3 + CloudFront

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder to S3 bucket**

3. **Configure CloudFront distribution**

4. **Environment variables:** Use AWS Lambda@Edge for injection

### Option 5: Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_ANTHROPIC_API_KEY
ENV VITE_ANTHROPIC_API_KEY=$VITE_ANTHROPIC_API_KEY

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Deploy:
```bash
docker build --build-arg VITE_ANTHROPIC_API_KEY=your_key -t ebay-live-academy .
docker run -p 80:80 ebay-live-academy
```

## PWA Configuration

The app is configured as a Progressive Web App:

- **manifest.json** - App metadata for installation
- **Service Worker** - Offline functionality
- **Icons** - App icons (located in `public/`)

### Testing PWA

1. Build and serve production build:
   ```bash
   npm run build
   npm run preview
   ```

2. Open Chrome DevTools → Application → Service Workers
3. Check "Offline" and verify app still works
4. Test "Add to Home Screen" on mobile

## Performance Optimization

### Already Implemented:
- ✅ Code splitting with React lazy loading
- ✅ Service worker caching
- ✅ Gzip compression
- ✅ Optimized bundle size (~122KB gzipped)

### Additional Optimizations:

1. **Enable CDN:**
   - Most hosting services provide this automatically
   - Vercel/Netlify have global CDN by default

2. **Compression:**
   - Brotli compression (Vercel/Netlify enable automatically)

3. **Image Optimization:**
   - Currently using emoji and SVG (already optimal)
   - If adding images, use WebP format

## Security Considerations

### API Key Security:
- ✅ API key stored in environment variables (not in code)
- ✅ .env file excluded from git
- ⚠️ Client-side apps expose API keys to users
  
**For production, consider:**
- Using a backend proxy to hide API key
- Implementing rate limiting
- Adding user authentication
- Setting up API key rotation

### Content Security Policy (CSP):

Add to your hosting headers:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.anthropic.com
```

## Monitoring & Analytics

### Recommended Tools:

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics** - Add to index.html
3. **Sentry** - Error tracking
4. **Plausible** - Privacy-friendly analytics

### Adding Google Analytics:

Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

## Testing Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Build completes without errors
- [ ] All AI features work with real API key
- [ ] PWA installable on mobile
- [ ] Offline mode works after first load
- [ ] Voice mode works in supported browsers
- [ ] Data export/import works
- [ ] Keyboard shortcuts function correctly
- [ ] Sound effects play (with volume on)
- [ ] Mobile responsive on various screen sizes
- [ ] Works in Chrome, Safari, Firefox, Edge

## Troubleshooting

### Issue: "Anthropic API key not configured"
- **Solution:** Add `VITE_ANTHROPIC_API_KEY` to environment variables and rebuild

### Issue: Service Worker not updating
- **Solution:** Change `CACHE_NAME` in `public/sw.js` and redeploy

### Issue: Voice mode not working
- **Solution:** Voice recognition only works in Chrome/Edge and requires HTTPS in production

### Issue: Build fails
- **Solution:** 
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npm run build
  ```

### Issue: Large bundle size warning
- **Current size is ~360KB (~123KB gzipped)** - This is normal for a React app with AI features
- Anthropic SDK and React are the largest dependencies

## Updating the App

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Install new dependencies:**
   ```bash
   npm install
   ```

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Deploy:**
   ```bash
   vercel --prod  # or your deployment command
   ```

## Cost Estimation

### Hosting (Vercel/Netlify Free Tier):
- ✅ Free for small-medium traffic
- Bandwidth: Usually 100GB/month free
- Build minutes: Usually 300-400 minutes/month free

### Anthropic API Costs:
- Model: Claude 3.5 Sonnet
- Input: $3 per million tokens
- Output: $15 per million tokens

**Estimated usage per user session:**
- AI Live Stream: ~2,000 tokens (~$0.03)
- Condition Evaluator: ~1,500 tokens (~$0.02)
- Conversation Partner: ~3,000 tokens (~$0.05)
- Phrase Rephraser: ~500 tokens (~$0.01)

**Monthly estimate (100 active users):**
- ~$20-50/month depending on AI feature usage

## Support & Maintenance

### Regular Maintenance Tasks:

1. **Weekly:**
   - Monitor API usage and costs
   - Check error logs

2. **Monthly:**
   - Update dependencies (`npm update`)
   - Review and merge security patches
   - Check PWA functionality

3. **Quarterly:**
   - Review user feedback
   - Plan new features
   - Performance audit

### Getting Help:

- **Issues:** Report at GitHub repository
- **Anthropic API:** https://docs.anthropic.com/
- **Vercel Support:** https://vercel.com/support
- **React Documentation:** https://react.dev/

## License & Credits

Built with:
- React 18
- Vite 5
- Anthropic Claude API
- Web Speech API
- Web Audio API

---

**Ready to deploy?** Choose your hosting platform and follow the steps above. Good luck! 🚀
