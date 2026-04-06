# eBay Live Academy - Confidence-Building Design Specification

## Core Philosophy

**The Problem**: Japanese eBay Live sellers freeze on camera not from lack of knowledge, but from:
- Fear of making English mistakes publicly (恥ずかしい)
- Perfectionism delaying action
- Discomfort with self-promotion (自慢)
- Gap between internal knowledge and live second-language expression

**The Solution**: Transform the app from a reference wiki (90% reading) into an interactive confidence trainer (90% practice, 10% reference). Make failure safe here so real streams feel less scary.

## Behavioral Design Principles

### 1. Normalize Mistakes Before They Happen
- Show blooper reels from successful Japanese eBay Live sellers
- Message: "Buyers care about product knowledge and authenticity, not perfect grammar"
- Quote: "A seller who says 'this bag have small scratch here' with confidence outsells someone who freezes"

### 2. Start with Zero-Stakes Voice Practice
- Private "mirror mode" - record yourself, listen back, compare to sample
- No scoring, no judgment, no one else hears it
- Goal: Get comfortable hearing your own voice in English

### 3. Use the "Small Wins" Ladder
- Start absurdly easy: read ONE buyer name aloud
- Then describe ONE color
- Then ONE condition
- Each tiny success builds dopamine association: "I can do this"
- By mock live mode, they've already succeeded 50+ times

### 4. Reframe English Mistakes as Charm
- Japanese accent = authenticity, trust, Japan-exclusive access
- App explicitly teaches: "Your Japanese background is your brand"
- Buyers trust Japanese sellers for careful handling

### 5. Scaffolded Script Removal
- Phase 1: Show exact sentence to say
- Phase 2: Show keywords only
- Phase 3: Show situation prompt only
- Phase 4: Surprise drill with no prep
- Respects Japanese learning style preference for structure

### 6. Make First Live Stream Feel Like Graduation
- "Ready to Go Live" confidence meter fills with practice
- At 100%: "You've practiced greeting 50 buyers, described 30 conditions, answered 20 tough questions"
- Frame as proof they've already done the hard part

### 7. Address Fear of Dead Air
- Dedicated "fill the silence" trainer
- Natural fallback phrases become automatic through repetition:
  - "Let me show you another angle"
  - "Great question, let me check that for you"
  - "Thank you for waiting"

### 8. Social Proof from Peers
- Show Japanese sellers who started nervous and improved
- Anonymous data: "87% of sellers who completed this module felt more confident"
- No American influencer examples - must come from people like them

---

## Confidence-Building Mechanics

### Simulation Modes

#### Mock Live
- Countdown timer starts
- Fake buyer name appears
- Seller must greet, describe condition, or answer question OUT LOUD
- No typing - voice input or self-assessment ("Did I say it smoothly? Yes/No")
- Builds real-time pressure tolerance

#### Speed Round
- Rapid-fire prompts simulating real stream pace
- "Buyer asks about scratches → respond in English within 5 seconds"
- Builds muscle memory for instant responses

#### Curveball Mode
- Throws unexpected questions mid-flow to train composure
- Example: Buyer asks return policy while you're describing condition
- Prepares for chaotic real-stream scenarios

### Repetition Without Boredom

- **Spaced Repetition**: Phrases you stumbled on come back more often
- **Short Sessions**: 3-5 minutes so practice fits on train/breaks
- **Warm-up Mode**: 2-minute quick drill before actual streams

### Emotional Design

- **Never "Wrong!"** - Use "Almost! Here's a smoother way to say it"
- **Show Improvement**: "Last week: 8 seconds to describe conditions. Now: 4 seconds average"
- **Celebrate streaks and personal bests**, not just correct answers
- **Testimonials**: Short clips from successful Japanese eBay Live sellers

---

## Gamification Core

### Player Profile System
- XP, level, streak counter
- Visible progress everywhere
- LocalStorage persistence

### Mission-Based Structure
- Each module is a "challenge" or "mission", not info page
- Unlock system - later modules lock until earlier ones pass
- Sense of achievement with each completion

### Competitive Elements
- Leaderboard (anonymous OK)
- Badges/achievements:
  - "Mastered LV Conditions"
  - "100 Names Read"
  - "Speed Demon" (5 descriptions under 30 sec)

### Visual Game Feel
- Progress bars per module showing completion %
- Animations: confetti for correct, gentle shake for wrong
- Warm, energetic aesthetic (Duolingo-style playfulness)
- Sound effects (toggleable)

### Flow Redesign
- **Home = Game Lobby**: Show avatar, today's challenge, stats
- **Mission Briefing**: Each section starts with brief intro then jumps to interaction
- **Score Summary**: End each module with score + "try again"/"next challenge"

### Retention Hooks
- Daily challenge (rotates content)
- "Review mistakes" mode resurfaces wrong answers
- Push notification support: "Don't break your 5-day streak!"

---

## Interactive Learning Formats

### No AI Required

#### 1. Speed Auction Game
- Timed challenge: item appears with details
- Seller must call out starting bid, describe condition, close auction in 30 seconds
- Score based on speed + completeness
- Leaderboard for high scores

#### 2. Name Blast
- Buyer usernames flash on screen one by one
- Seller taps button after reading each aloud
- Track: How many in 60 seconds?
- Simple, addictive, directly useful

#### 3. Flashcard Mode
- Swipe right if you know it, left if you don't
- For vocabulary, brand names, conditions
- Spaced repetition algorithm

#### 4. Timed Quizzes
- "Name this condition in English - 5 seconds!"
- Multiple choice or voice input
- Immediate feedback with gentle corrections

#### 5. Drag-and-Drop Matching
- Brand models ↔ descriptions
- Photos of conditions ↔ English terms
- Color shades ↔ luxury fashion color names
- Gets harder as subtle differences increase (light patina vs honey patina vs dark patina)

#### 6. "What Would You Say?" Scenarios
- Situation card: "Buyer says item looks different from photo. They want partial refund."
- Three response options:
  - Too apologetic
  - Too aggressive
  - Confident and professional
- Pick one, get instant feedback
- After mastery, switches to open-ended: write your own response

#### 7. Daily 3-Minute Warm-Up
- Randomized mix:
  - One name reading
  - One condition description
  - One buyer question
- Takes exactly 3 minutes
- Designed for pre-stream ritual to calm nerves

#### 8. Audio Pronunciation Drills
- Play English vocab/phrase audio
- "Listen & Repeat" mode
- Record yourself, compare waveforms visually
- Addresses pronunciation anxiety

---

## AI-Powered Practice Modes

### 1. AI Live Stream Simulator (KILLER FEATURE)

**Setup**: Chat-style interface simulating real eBay Live stream

**How It Works**:
- Screen shows mock stream layout
- AI plays multiple buyers simultaneously
- AI-generated buyer messages roll in:
  - "How much for the Speedy 25?"
  - "Is that a real patina or a stain?"
  - "Can you show the zipper?"
- Seller types (or speaks) response
- AI reacts naturally - follows up, asks harder questions, or says "Sold!"

**Adaptive Difficulty**:
- AI adjusts based on seller performance
- Early sessions: friendly buyers
- Later sessions: skeptical buyers, rapid-fire questions, curveballs

**Technical**: Anthropic API with system prompt setting buyer persona with luxury fashion knowledge

### 2. AI Condition Describer

**Setup**: Photo of luxury item with specific wear shown

**Flow**:
1. Seller describes condition in English (typed or spoken)
2. AI evaluates:
   - Did they mention all key details?
   - Language accurate enough to prevent INAD returns?
3. AI shows model answer
4. Highlights what seller missed

**Goal**: Build skill that matters most on live streams

### 3. AI Conversation Partner

**Setup**: Free-form chat mode

**Use Cases**:
- Practice greeting buyers
- Explain shipping to US
- Handle complaints
- Describe colors

**Flow**:
1. Seller types scenario or starts conversation
2. AI responds as buyer would
3. After conversation, AI gives gentle coaching notes
4. Not corrections - suggestions like "That was clear! You could also try..."

### 4. AI Phrase Rephraser

**Setup**: Bridge Japanese thinking to English speaking

**Flow**:
1. Seller types what they want to say in Japanese
2. AI gives 3 English versions:
   - Formal
   - Casual
   - Confident/salesy
3. Seller picks most natural one
4. Practice saying it (with audio recording)

---

## Progress = Confidence

### Confidence Self-Rating
- Before/after rating at start and end of each week
- Track improvement over time
- Visualize confidence growth curve

### Ready to Go Live Checklist
- Lights up as skills are mastered
- Each item = specific milestone:
  - ✅ Greeted 50+ buyers confidently
  - ✅ Described 30+ conditions accurately
  - ✅ Answered 20+ tough questions
  - ✅ Completed 3-day streak

### Graduation Milestone
- When all core modules complete
- Shareable badge for team/social
- Celebration screen with stats summary

### Improvement Analytics
- "Last week you took 8 seconds to describe conditions. Now you average 4 seconds"
- Show personal growth, not just scores
- Emphasize speed + confidence gains

---

## Technical Implementation Notes

### AI Integration
- Use Anthropic API directly from React app
- System prompts set buyer personas
- Conversation history maintains context
- Client-side API calls (no backend needed for MVP)

### Voice Input
- Web Speech API for browser-based voice recognition
- Optional feature - can work with typing first
- Critical for true confidence building (hearing own voice)

### Data Persistence
- LocalStorage for player progress
- Export/import JSON for backup
- Future: Firebase/Supabase for cloud sync

### Animations
- Framer Motion for smooth transitions
- Confetti.js for celebrations
- Gentle micro-interactions everywhere

### Accessibility
- Keyboard navigation throughout
- Screen reader support
- High contrast mode option
- Subtitles for any video/audio content

---

## Implementation Phases

### Phase 1: Foundation ✅ COMPLETE
- Basic gamification (XP, levels, streaks)
- Game lobby homepage
- Progress tracking
- LocalStorage persistence

### Phase 2: Interactive Practice (NEXT)
- Name Blast game
- Speed Auction game
- Flashcard mode
- Drag-and-drop matching
- Daily 3-minute warm-up

### Phase 3: AI Integration
- AI Live Stream Simulator
- AI Condition Describer
- AI Conversation Partner
- AI Phrase Rephraser

### Phase 4: Polish & Retention
- Confidence self-rating tracker
- Improvement analytics dashboard
- Audio pronunciation drills
- Social proof testimonials
- Achievement badges
- Leaderboard

### Phase 5: Advanced Features
- Mock Live full simulation
- Voice input support
- Spaced repetition algorithm
- Cloud sync
- Mobile app (React Native)
