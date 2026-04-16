# Image Guide for eBay Live Academy

## Brand Logo Images ✅ COMPLETE

All brand logos now use **logo.clearbit.com** CDN service which automatically fetches high-quality logos from official brand domains.

```javascript
imageUrl:"https://logo.clearbit.com/louisvuitton.com"
```

No action needed - logos are automatically maintained!

## Model/Product Reference Images 🔄 IN PROGRESS

Product images help learners visually identify iconic bag models. Currently using Unsplash placeholders.

### Where to Add Images

Model images are defined in the `models` array for each brand:

```javascript
models:[
  { 
    name:"Speedy",
    imageUrl:"YOUR_IMAGE_URL_HERE",  // ← Add product image here
    brief:"Iconic barrel bag",
    desc:"Description...",
    // ... rest of model data
  }
]
```

### Image Requirements

- **Format**: JPG or PNG
- **Size**: 400-800px width recommended
- **Background**: Clean, white or neutral background
- **Angle**: Front-facing view showing bag clearly
- **Quality**: High resolution, clear details

### Image Hosting Options

#### Option 1: Use Public Folder (Recommended for Production)
1. Save images to `/public/images/bags/`
2. Name format: `{brand}-{model}.jpg` (e.g., `lv-speedy.jpg`)
3. Reference: `imageUrl:"/images/bags/lv-speedy.jpg"`

#### Option 2: Use Image CDN
- **Cloudinary**: Upload to cloudinary.com
- **ImgBB**: Upload to imgbb.com (free)  
- **Unsplash**: Search unsplash.com for luxury bag photos
- Reference: `imageUrl:"https://cdn-url/your-image.jpg"`

#### Option 3: Brand Official Images
- Visit official brand websites
- Right-click product images → Copy image address
- Note: May have copyright restrictions

### Priority Models to Add Images

**High Priority** (Most iconic, frequently mentioned):
- Louis Vuitton: Speedy, Neverfull, OnTheGo
- Chanel: Classic Flap, Boy Bag, 19
- Hermès: Birkin, Kelly, Constance  
- Gucci: Jackie, Dionysus, Marmont
- Prada: Galleria, Re-Edition, Cleo

**Medium Priority**:
- Dior: Lady Dior, Book Tote, Saddle
- Bottega Veneta: Pouch, Cassette, Jodie
- Fendi: Baguette, Peekaboo, Kan I

**Lower Priority**:
- Other brands and less common models

### Current Status

✅ Brand logos: 44/44 complete (using logo.clearbit.com)
🔄 Model images: 2/200+ added (Speedy, Neverfull with placeholders)

### How to Replace Placeholder Images

1. Find/save the actual product image
2. Upload to `/public/images/bags/` OR upload to image host
3. Find the model in `src/App.jsx`
4. Update the `imageUrl` field
5. Test in browser to verify image loads

### Example

```javascript
// Before (placeholder)
{ 
  name:"Speedy",
  imageUrl:"https://images.unsplash.com/photo-xxx",
  // ...
}

// After (real product image)
{ 
  name:"Speedy",
  imageUrl:"/images/bags/lv-speedy-monogram.jpg",
  // ...
}
```

## Tips

- Start with the most iconic models that sellers will encounter frequently
- Ensure consistent image style (same background type, lighting)
- Consider adding multiple angles in the future (front, side, interior)
- Keep file sizes reasonable (<200KB per image) for fast loading
