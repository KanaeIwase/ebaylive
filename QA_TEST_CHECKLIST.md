# ✅ QA Testing Checklist - eBay Live Academy

**Test Date:** 2026-04-09  
**Dev Server:** http://localhost:3000  
**Tester:** Kanae Iwase

---

## 🔧 Pre-Test Setup

- [x] Gemini API key added to `.env`
- [x] Dependencies installed (`npm install`)
- [x] Build successful (`npm run build`)
- [x] Dev server running (`npm run dev`)
- [ ] Browser console open (F12) to check for errors

---

## 📱 Basic Navigation & UI

### Home Page
- [ ] Home page loads without errors
- [ ] Player stats visible (Level, XP, Badges)
- [ ] No console errors on page load

### Language Switching
- [ ] Click EN/JP toggle in top right
- [ ] UI text changes to Japanese
- [ ] Click again to switch back to English
- [ ] No errors in console

### Sidebar Navigation
- [ ] Click "Luxury Brands" → Page loads
- [ ] Click "Live Selling Strategies" → Page loads
- [ ] Click "eBay Live Policy" → Page loads
- [ ] Click "Vocabulary" → Page loads
- [ ] Click each practice game link → All load correctly
- [ ] Click "Player Stats" → Dashboard loads

---

## 🎮 Practice Games Testing

### 1. Name Blast
- [ ] Click "Name Blast" in sidebar
- [ ] Click "Start Game" button
- [ ] Usernames appear on screen
- [ ] 60-second timer counts down
- [ ] Read names out loud (manual test)
- [ ] Timer reaches 0 and game ends
- [ ] XP awarded at the end
- [ ] No errors in console

### 2. Speed Auction
- [ ] Click "Speed Auction"
- [ ] Click "Start Game"
- [ ] Item appears with image
- [ ] 30-second timer counts down
- [ ] Describe item out loud (manual test)
- [ ] Timer ends, shows feedback
- [ ] XP awarded
- [ ] No errors in console

### 3. Condition Description
- [ ] Click "Condition Description"
- [ ] Item with condition details appears
- [ ] Text input field visible
- [ ] Type a description
- [ ] Click "Submit"
- [ ] Feedback appears (correct/incorrect)
- [ ] XP awarded
- [ ] No errors in console

### 4. What Would You Say?
- [ ] Click "What Would You Say?"
- [ ] Scenario appears
- [ ] Multiple choice options visible
- [ ] Click an option
- [ ] Feedback shows (correct/wrong)
- [ ] XP awarded
- [ ] No errors in console

### 5. Flashcard Mode
- [ ] Click "Flashcard Mode"
- [ ] Choose a deck (Conditions/Brands/Materials)
- [ ] Card appears with question
- [ ] Click "Show Answer"
- [ ] Answer reveals
- [ ] Click "Next Card"
- [ ] New card appears
- [ ] No errors in console

### 6. Matching Game
- [ ] Click "Matching Game"
- [ ] Grid of items appears
- [ ] Click first item (highlights)
- [ ] Click second item
- [ ] If match: items disappear
- [ ] If no match: items flip back
- [ ] Complete all matches
- [ ] XP awarded
- [ ] No errors in console

### 7. Daily Warm-Up
- [ ] Click "Daily Warm-Up"
- [ ] 3-minute challenge starts
- [ ] Tasks appear sequentially
- [ ] Complete tasks
- [ ] Timer counts down
- [ ] Challenge ends
- [ ] XP awarded
- [ ] No errors in console

---

## 🎨 Image Generation Features (Gemini API)

### Brand Knowledge Page - Image Generation
- [ ] Navigate to "Luxury Brands" → Click "Louis Vuitton"
- [ ] Scroll to model details (e.g., "Speedy")
- [ ] Look for "Generate 360° View" button
- [ ] Click button
- [ ] Loading indicator appears
- [ ] Images generate (7 angles) OR graceful error message
- [ ] **Check browser console for API errors**
- [ ] If error, note the error message

### Condition Training Images
- [ ] Navigate to "Vocabulary" page
- [ ] Scroll to condition training section
- [ ] Click "Generate Condition Comparison"
- [ ] Loading indicator appears
- [ ] Images generate OR graceful error message
- [ ] **Check console for Gemini API response**
- [ ] Images should show different condition levels

### Wear Pattern Examples
- [ ] On Vocabulary page
- [ ] Find "Wear Patterns" section
- [ ] Click "Generate Wear Example"
- [ ] Images generate OR fallback to SVG diagrams
- [ ] **Check console for any errors**

### Fallback Behavior (If API Fails)
- [ ] If Gemini API fails, app should show:
  - SVG diagrams (built-in)
  - OR placeholder with message
  - NO app crash or blank screen
  - Error message is user-friendly

---

## 🏆 Gamification Features

### XP & Leveling
- [ ] Complete any practice game
- [ ] XP bar increases
- [ ] Level up notification appears (if leveled up)
- [ ] XP persists after page refresh

### Badges
- [ ] Navigate to "Player Stats"
- [ ] View badges section
- [ ] Complete actions to unlock badges
- [ ] Badge unlock animation appears
- [ ] Badge shows in collection

### Streaks
- [ ] Check streak counter in stats
- [ ] Play daily to maintain streak
- [ ] Streak number increases correctly

### Analytics
- [ ] Navigate to "Improvement Analytics"
- [ ] Graphs and charts display
- [ ] Data reflects your practice history
- [ ] No errors in console

---

## 🗣️ Voice & Accessibility Features

### Voice Input Mode (Chrome/Edge only)
- [ ] Find voice input toggle
- [ ] Click to enable
- [ ] Microphone permission requested
- [ ] Grant permission
- [ ] Speak into microphone
- [ ] Text appears on screen
- [ ] No errors in console

### Keyboard Shortcuts
- [ ] Press Space bar → Action triggers
- [ ] Press Enter → Confirmation
- [ ] Shortcuts work as expected

---

## 💾 Data Management

### Export Data
- [ ] Navigate to Settings/Data
- [ ] Click "Export Data"
- [ ] JSON file downloads
- [ ] File contains player stats

### Import Data
- [ ] Click "Import Data"
- [ ] Select previously exported file
- [ ] Data loads successfully
- [ ] Stats restored correctly

### Reset Data
- [ ] Click "Reset All Data"
- [ ] Confirmation dialog appears
- [ ] Confirm reset
- [ ] All data cleared
- [ ] App returns to initial state

---

## 🌐 Browser Compatibility

### Chrome/Edge
- [ ] All features work
- [ ] Voice input works
- [ ] No console errors

### Firefox
- [ ] Core features work
- [ ] Voice input gracefully disabled
- [ ] No critical errors

### Safari (macOS/iOS)
- [ ] Core features work
- [ ] Voice input gracefully disabled
- [ ] Mobile responsive

---

## 📱 Mobile Responsiveness

### Mobile View (Chrome DevTools)
- [ ] Press F12 → Toggle device toolbar
- [ ] Select iPhone/Android
- [ ] All pages render correctly
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] No horizontal scroll
- [ ] Images scale properly

---

## 🐛 Error Handling

### API Errors
- [ ] If Gemini API fails → Graceful error message
- [ ] If image fails to load → Fallback placeholder
- [ ] No white screen of death
- [ ] User can continue using app

### Network Errors
- [ ] Disconnect internet
- [ ] Offline features still work (PWA)
- [ ] Online features show friendly error
- [ ] App doesn't crash

---

## ✅ Critical Pass/Fail Criteria

### MUST PASS (Blockers)
- [ ] No JavaScript errors on initial load
- [ ] All 7 practice games playable
- [ ] Navigation works between all pages
- [ ] Language switching works
- [ ] XP system awards points
- [ ] App builds without errors

### SHOULD PASS (Important)
- [ ] Gemini API generates images OR shows graceful fallback
- [ ] Mobile responsive on phone screens
- [ ] Voice input works in Chrome/Edge
- [ ] Data export/import works

### NICE TO HAVE (Non-blocking)
- [ ] Sound effects play
- [ ] Animations smooth
- [ ] PWA installable

---

## 🚫 Known Issues to Check

1. **Gemini API Rate Limits**
   - Free tier: 15 requests/minute
   - If you test too fast, API may return rate limit error
   - Wait 1 minute and try again

2. **Browser Console Warnings**
   - Some warnings are OK (React dev mode)
   - Critical errors should be zero

3. **Image Generation Timing**
   - Gemini takes 5-10 seconds per image
   - Don't spam the generate button

---

## 📝 Test Results

### Gemini API Test Result:
- [ ] ✅ Images generated successfully
- [ ] ⚠️ API error but graceful fallback works
- [ ] ❌ App crashed (BLOCKER - do not deploy)

**Error message (if any):**
```
[Paste console error here]
```

### Overall QA Status:
- [ ] ✅ PASS - Ready to deploy
- [ ] ⚠️ PASS WITH WARNINGS - Can deploy with notes
- [ ] ❌ FAIL - Must fix before deploy

---

## 🚀 Deployment Approval

Only deploy if:
1. All MUST PASS items checked ✅
2. No critical console errors
3. All 7 practice games work
4. Gemini API works OR gracefully falls back

**Final Approval:**
- [ ] I have tested all critical features
- [ ] I approve deployment to production
- [ ] I understand what features require API keys

**Tester Signature:** ________________  
**Date:** 2026-04-09

---

## 📞 If Issues Found

1. **Stop the dev server:** Press Ctrl+C in terminal
2. **Note the error** in console (screenshot if needed)
3. **Report to Claude** with specific error message
4. **Do NOT deploy** until fixed

---

**Next Step After QA Passes:**
```bash
# Deploy to Vercel
cd /mnt/c/Users/kiwase/Documents/Claude/ebay-live-game
vercel --prod
```
