# 🎯 eBay Live Academy

**Interactive learning platform for mastering eBay Live luxury fashion sales**

Game-based training for Japanese sellers targeting professional reseller buyers. Build confidence in live streaming, product expertise, and B2B communication.

---

## ✨ Features

### 📚 **Core Knowledge Base**
- **Luxury Brand Knowledge** — Deep-dive into Louis Vuitton, Chanel, Hermès, Gucci models with sizes, authentication markers, and rare items
- **Live Selling Strategies** — 6-step framework for exposure, retention, and engagement
- **eBay Live Policy** — Compliance guidelines and best practices
- **Professional Vocabulary** — 100+ essential terms with spoken examples

### 🎮 **7 Interactive Practice Games**
1. **Name Blast** — Read buyer usernames at speed (60-second challenge)
2. **Speed Auction** — Describe items and announce bids in 30 seconds
3. **Condition Description** — Accurately assess luxury item conditions
4. **What Would You Say?** — Respond to buyer scenarios
5. **Flashcard Mode** — Memorize conditions, brands, and materials
6. **Matching Game** — Connect brands, conditions, and colors
7. **Daily Warm-Up** — 3-minute pre-stream confidence booster

### 🤖 **AI-Powered Features** (Claude Integration)
1. **AI Live Stream Simulator** — Practice with realistic AI buyers in real-time
2. **AI Condition Evaluator** — Get feedback on your condition descriptions
3. **AI Conversation Partner** — Free-form chat practice with AI buyer
4. **AI Phrase Translator** — Japanese → English with 3 style options (formal/casual/confident)

### 🏆 **Gamification & Progress Tracking**
- **XP System** — Earn points and level up
- **Achievement Badges** — 10 unlockable achievements
- **Streak Tracking** — Daily practice rewards
- **Confidence Tracker** — Weekly self-rating with trend analysis
- **Improvement Analytics** — See your growth over time
- **Ready to Go Live Checklist** — Dynamic readiness percentage

### 📱 **Modern UX Features**
- **Progressive Web App** — Install on mobile like a native app
- **Offline Support** — Works without internet after first load
- **Voice Input Mode** — Hands-free practice with Web Speech API
- **Keyboard Shortcuts** — Power user navigation (Space/Enter)
- **Sound Effects** — Audio feedback for achievements and interactions
- **Data Export/Import** — Backup and restore your progress
- **Fully Bilingual** — Switch between English and Japanese

---

## 🚀 Quick Start

### For Users (No coding needed)

**Option 1: Web Browser**
1. Open http://localhost:3000/ (or deployed URL)
2. Switch language (EN/JP) in top right
3. Start learning!

**Option 2: Install as App (Mobile/Desktop)**
1. Open the site in your browser
2. Look for "Add to Home Screen" or "Install App"
3. Launch from your home screen like any other app

### For Developers

```bash
# Clone repository
git clone https://github.com/yourusername/ebay-live-game.git
cd ebay-live-game

# Install dependencies
npm install

# Add API key for AI features (optional)
cp .env.example .env
# Edit .env and add your Anthropic API key

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Requirements:**
- Node.js 18+
- Anthropic API key (for AI features only)

---

## 📦 What's Included

```
ebay-live-game/
├── src/
│   ├── App.jsx              # Main application (6,500+ lines)
│   ├── main.jsx             # Entry point with service worker registration
│   ├── services/
│   │   └── anthropic.js     # Claude API integration
│   └── utils/
│       └── sounds.js        # Web Audio API sound effects
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker for offline support
│   └── icon.svg            # App icon
├── index.html              # HTML with PWA meta tags
├── .env.example            # Environment variable template
├── DEPLOYMENT.md           # Production deployment guide
└── README.md               # This file
```

---

## 🎓 Learning Path

### For Beginners:
1. **Start with Luxury Brands** → Learn product knowledge
2. **Read Live Selling Strategies** → Understand the framework
3. **Practice with Name Blast** → Build confidence
4. **Try AI Simulator** → Experience realistic interactions

### For Intermediate:
1. **Complete all 7 practice games** → Master core skills
2. **Use AI Condition Evaluator** → Improve descriptions
3. **Track your confidence weekly** → Monitor growth
4. **Aim for 100% readiness** → Complete all checklist items

### For Advanced:
1. **Use voice mode** → Simulate real live streams
2. **Practice daily warm-ups** → Maintain skills
3. **Export your data** → Track long-term progress
4. **Compete for high scores** → Speed and accuracy

---

## 🌟 Unique Value

**Unlike generic live selling courses**, eBay Live Academy:

✅ **Specialized for luxury fashion** — Authentication, condition assessment, INAD prevention  
✅ **B2B focused** — Professional reseller buyers, not consumer shoppers  
✅ **Bilingual by design** — Japanese sellers → English-speaking market  
✅ **AI-powered practice** — Real-time simulation, not just videos  
✅ **Gamified learning** — Engaging, measurable progress  
✅ **Production-ready** — PWA, offline support, mobile-optimized

---

## 🔧 Technical Stack

- **Framework**: React 18 with hooks
- **Build Tool**: Vite 5
- **AI Integration**: Anthropic Claude 3.5 Sonnet API
- **Speech**: Web Speech API (voice input)
- **Audio**: Web Audio API (sound effects)
- **Storage**: LocalStorage (player progress)
- **PWA**: Service Worker + Manifest
- **Styling**: Inline React styles (no CSS files)
- **Deployment**: Static site (Vercel/Netlify ready)

**Bundle Size**: ~360KB (~123KB gzipped)

---

## 📊 Project Stats

- **Total Components**: 35+ interactive components
- **Lines of Code**: 6,500+ (main App.jsx)
- **Languages**: Fully bilingual (EN/JP)
- **Games**: 7 interactive practice drills
- **AI Features**: 4 Claude-powered tools
- **Badges**: 10 unlockable achievements
- **Vocabulary Terms**: 100+ professional terms
- **Brand Models**: 20+ luxury models with detailed specs

---

## 🔐 Environment Setup

### Required Environment Variables:

```bash
# .env file (for local development)
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Get an API key**: https://console.anthropic.com/

**For production deployment**, add the same variable to your hosting service's environment settings (Vercel, Netlify, etc.).

**Note**: AI features will show an error if the API key is not configured, but all other features work without it.

---

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide including:

- Vercel deployment (recommended)
- Netlify deployment
- Docker deployment
- AWS S3 + CloudFront
- Environment variable configuration
- PWA testing checklist
- Performance optimization
- Security considerations
- Cost estimates

**Quick Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

---

## 🎯 Roadmap

### ✅ Completed (Phases 1-6)
- Core knowledge base
- 7 interactive practice games
- AI integration with Claude
- Gamification (XP, badges, streaks)
- PWA with offline support
- Voice input mode
- Keyboard shortcuts
- Sound effects
- Data export/import

### 🔮 Future Enhancements (Optional)
- [ ] Cloud sync for cross-device progress
- [ ] Leaderboard and community features
- [ ] Video analysis tools
- [ ] More AI practice scenarios
- [ ] Multi-language support (Korean, Chinese)
- [ ] Admin dashboard for educators
- [ ] Integration with eBay Live API

---

## 🤝 Contributing

Contributions welcome! Here's how to help:

1. **Report bugs** → Open an issue with details
2. **Suggest features** → Describe use case and benefit
3. **Add content** → More brands, scenarios, vocabulary
4. **Translate** → Help expand to more languages
5. **Improve AI prompts** → Better training scenarios

**Code contributions:**
```bash
# Fork the repo
# Create a branch
git checkout -b feature/your-feature

# Make changes and commit
git commit -m "Add your feature"

# Push and create PR
git push origin feature/your-feature
```

---

## 📝 About

**Created by**: Kanae Iwase  
**Purpose**: Train Japanese eBay Live sellers for US luxury fashion market  
**Built with**: Claude Code (AI pair programming)  
**License**: Open source for educational and commercial use

**Target Users**:
- eBay Live sellers (Japan → US market)
- Luxury fashion live commerce professionals
- B2B reseller-focused sellers
- Live streaming educators and trainers

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ebay-live-game/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ebay-live-game/discussions)
- **Documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API Docs**: [Anthropic Documentation](https://docs.anthropic.com/)

---

## 📄 License

MIT License - Free for educational and commercial use.

Attribution appreciated but not required. If you use this to train your team or build a similar product, consider:
- Starring the repo ⭐
- Sharing your improvements via PR
- Linking back to this project

---

## 🙏 Acknowledgments

- **eBay Japan** — For supporting seller education
- **Anthropic** — For Claude AI API
- **Live commerce community** — For insights and feedback
- **React team** — For amazing framework
- **Vite team** — For fast build tooling

---

**Built with ❤️, AI collaboration, and real-world live selling experience**

🎯 **Ready to master eBay Live?** → `npm run dev`
