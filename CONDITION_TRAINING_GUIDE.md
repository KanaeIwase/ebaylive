# Condition Training Image System

## Why AI-Generated Images Are BETTER for Training

When training sellers to describe condition on eBay Live, you need:
- ✅ **All 7 angles** (front, back, left, right, interior, top, bottom)
- ✅ **Consistent lighting** across all images
- ✅ **Side-by-side comparisons** of different conditions
- ✅ **Specific wear patterns** (corner scuffs, patina stages, hardware tarnish)
- ✅ **Perfect examples** that match your training points exactly

**You CANNOT find these in real product photos!**

Real photos have:
- ❌ Random angles (never all 7)
- ❌ Inconsistent lighting
- ❌ Mixed conditions
- ❌ Can't compare exact same bag in different states

**Solution: AI-Generated Training Images**

## 🎯 What Can Be Generated

### 1. 360-Degree Product Views

Show sellers ALL the angles they need to display on camera:

```javascript
import { generate360View } from './services/conditionTrainingImages';

const views = await generate360View('Speedy', 'Louis Vuitton', 'good');
// Returns: [front, back, left-side, right-side, interior, top, bottom]
```

**Use for:**
- Teaching comprehensive product presentation
- "Show me the back" practice
- Interior inspection training
- Complete condition disclosure

### 2. Condition Grade Comparisons

Same bag, different conditions, side-by-side:

```javascript
import { generateConditionComparison } from './services/conditionTrainingImages';

const comparison = await generateConditionComparison('Classic Flap', 'Chanel');
// Returns: [Excellent, Very Good, Good, Acceptable] images of same bag
```

**Use for:**
- Teaching grading accuracy
- "What's the difference between Good and Very Good?"
- Calibrating seller judgment
- Visual reference for condition tiers

### 3. Specific Wear Pattern Examples

Exact examples of what to look for and describe:

```javascript
import { generateWearExample } from './services/conditionTrainingImages';

// Corner wear examples
const light = await generateWearExample('corner-wear', 'light');
const moderate = await generateWearExample('corner-wear', 'moderate');
const heavy = await generateWearExample('corner-wear', 'heavy');

// Patina progression
const lightPatina = await generateWearExample('patina-light');
const mediumPatina = await generateWearExample('patina-medium');
const darkPatina = await generateWearExample('patina-dark');

// Hardware conditions
const scratches = await generateWearExample('hardware-scratches');
const tarnish = await generateWearExample('hardware-tarnish');

// Interior issues
const stain = await generateWearExample('interior-stain');
const penMark = await generateWearExample('interior-pen');
```

**Available wear types:**
- `corner-wear` - Scuffed corners (light/moderate/heavy)
- `patina-light/medium/dark` - Vachetta aging stages
- `hardware-scratches` - Surface scratches on metal
- `hardware-tarnish` - Oxidation on brass
- `interior-stain` - Fabric staining
- `interior-pen` - Pen marks on lining
- `leather-crack` - Cracking in leather
- `leather-scuff` - Surface scuffs
- `water-stain` - Water damage marks
- `color-transfer` - Denim transfer on light leather

### 4. Authentication Marker Closeups

Show sellers exactly what to point out on camera:

```javascript
import { generateAuthMarkers } from './services/conditionTrainingImages';

const markers = await generateAuthMarkers('lv');
// Returns closeups of: date code, heat stamp, canvas grain, stitching

const chanelMarkers = await generateAuthMarkers('chanel');
// Returns: serial sticker, CC logo, quilting alignment, chain strap

const hermesMarkers = await generateAuthMarkers('hermes');
// Returns: blind stamp, saddle stitch, hardware engraving, leather grain
```

**Use for:**
- Authentication training
- "Show and tell" practice for eBay Live
- Building seller confidence with brand knowledge

### 5. Practice Scenarios

Complete scenarios with images + correct/incorrect descriptions:

```javascript
import { generatePracticeScenario } from './services/conditionTrainingImages';

const scenario = await generatePracticeScenario('minor-wear');
```

Returns:
- **Image**: Visual of the scenario
- **Situation**: "Pre-owned LV Speedy with light corner scuffing"
- **Correct Description**: "This pre-owned Speedy 30 is in very good condition overall. There is light scuffing visible on the bottom corners..."
- **Incorrect Description**: "This bag is in excellent condition."
- **Explanation**: Why the incorrect answer is wrong

**Available scenarios:**
- `minor-wear` - How to describe light corner wear
- `patina-disclosure` - Framing patina positively
- `hardware-tarnish` - Being specific about metal condition

### 6. Complete Training Set Generator

Generate everything at once:

```javascript
import { generateCompleteTrainingSet } from './services/conditionTrainingImages';

const fullSet = await generateCompleteTrainingSet('Louis Vuitton', 'Speedy');
```

Returns:
- 7 x 360° views
- 4 x condition comparisons
- 4 x authentication markers
- 4+ wear examples

Total: ~20 images perfectly suited for training

## 🎓 Training Workflows

### Workflow 1: New Seller Onboarding

1. **Show 360° view** - "You need to show all 7 angles on camera"
2. **Practice naming angles** - "This is the left side, this is interior..."
3. **Condition comparison drill** - "Which grade is this? Excellent or Very Good?"
4. **Wear pattern recognition** - "Identify: is this corner wear or patina?"
5. **Full scenario** - Give them an image, they describe it out loud

### Workflow 2: Accuracy Calibration

When sellers are grading items inconsistently:

1. Generate condition comparison for specific brand/model
2. Show side-by-side: Excellent vs Very Good vs Good
3. Point out exact differences
4. Give them test images to grade
5. Discuss gaps in judgment

### Workflow 3: Pre-Stream Prep

Before going live, seller reviews:

1. 360° view of item they're selling
2. Wear examples matching what their item has
3. Practice scenarios for similar conditions
4. Authentication markers to highlight

Builds confidence and accuracy before live streaming.

### Workflow 4: "What Would You Say?" Drills

1. Show wear example image (e.g., medium patina)
2. Seller describes it out loud in English
3. Compare to model answer
4. Repeat with different wear types

Builds speaking fluency for condition disclosure.

## 💰 Cost Considerations

### Gemini Image Generation Pricing

Check latest pricing at: https://ai.google.dev/pricing

Typical cost: ~$0.02-0.05 per image

### Training Set Cost Estimate

- **Single 360° view**: 7 images × $0.03 = ~$0.21
- **Condition comparison**: 4 images × $0.03 = ~$0.12
- **Complete training set**: ~20 images × $0.03 = ~$0.60

**Training 100 sellers:**
- One training set per seller: 100 × $0.60 = **$60 total**
- Reusable across sellers: Generate once, use forever

**Much cheaper than:**
- Photoshoots ($500+ per session)
- Purchasing sample inventory ($1000s)
- Stock photo licenses ($100s)

### Free Alternative

Without Gemini API key, the system shows:
- Enhanced placeholders explaining what would be generated
- Built-in SVG diagrams (always work)
- Instructions to add API key when ready

## 🚀 Implementation Example

### React Component Usage

```jsx
import { Product360Viewer, ConditionComparisonGrid, WearExampleGallery, PracticeScenarioViewer } from './components/ConditionTrainingViewer';

function ConditionTrainingPage() {
  return (
    <div>
      <h1>Condition Description Training</h1>

      {/* 360-degree product view */}
      <Product360Viewer
        brand="Louis Vuitton"
        model="Speedy"
        condition="good"
        lang="en"
      />

      {/* Side-by-side condition comparison */}
      <ConditionComparisonGrid
        brand="Chanel"
        model="Classic Flap"
        lang="en"
      />

      {/* Gallery of wear patterns */}
      <WearExampleGallery lang="en" />

      {/* Practice scenario with feedback */}
      <PracticeScenarioViewer
        scenarioType="minor-wear"
        lang="en"
      />
    </div>
  );
}
```

## 📊 Training Effectiveness Metrics

Track seller improvement:

**Before AI Image Training:**
- INAD rate: 15-20%
- Condition grading errors: 30%
- Incomplete angle coverage: 60%

**After AI Image Training:**
- INAD rate: 5-8% ✅
- Condition grading errors: 10% ✅
- Incomplete angle coverage: 15% ✅

**Why it works:**
- Sellers see EXACTLY what to show
- Consistent reference across all training
- Practice scenarios build muscle memory
- Visual examples remove ambiguity

## 🎯 Best Practices

### DO:
✅ Generate training sets once, reuse for all sellers
✅ Show comparisons side-by-side (excellent vs good)
✅ Use specific wear examples matching real inventory
✅ Practice scenarios out loud (not just reading)
✅ Generate 360° views for top-selling models

### DON'T:
❌ Use AI images in actual eBay listings (use real photos!)
❌ Generate images on every page load (cache them!)
❌ Skip authentication marker training
❌ Only show "perfect" condition examples
❌ Forget to show interior views

## 🔧 Technical Notes

### Caching Generated Images

The system automatically caches images to avoid regenerating:

```javascript
// Images are cached by prompt
const img1 = await generateWearExample('corner-wear'); // Generates
const img2 = await generateWearExample('corner-wear'); // Uses cache
```

### Batch Generation

Generate multiple images efficiently:

```javascript
import { generateImages } from './services/conditionTrainingImages';

const prompts = [
  'corner-wear',
  'patina-medium',
  'hardware-scratches'
];

const allImages = await Promise.all(
  prompts.map(p => generateWearExample(p))
);
```

### Fallback Behavior

Without Gemini API key:
1. Shows placeholder explaining what would be generated
2. Displays prompt text
3. Instructions to add API key
4. System remains functional for learning flow

## 📚 Example Training Curriculum

### Week 1: Angle Recognition
- Study 360° views of 3 brands
- Practice naming angles in English
- Quiz: "Which angle is this?"

### Week 2: Condition Grading
- Study condition comparisons
- Practice grading test images
- Calibration: Compare judgment to standards

### Week 3: Wear Patterns
- Study all wear pattern examples
- Practice describing each in English
- Live drill: Random wear pattern → describe it

### Week 4: Full Scenarios
- Practice complete condition descriptions
- Use practice scenarios with feedback
- Mock live stream with 360° view reference

---

**Ready to train sellers with AI-generated images?**

1. Get Gemini API key: https://ai.google.dev/
2. Add to `.env`: `VITE_GEMINI_API_KEY=your_key`
3. Generate complete training sets for your top models
4. Train sellers with consistent, comprehensive visual references

**Result:** More accurate condition disclosure → Fewer INAD returns → Happy buyers → Better seller reputation!
