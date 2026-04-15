import { useState, useEffect } from 'react';
import { searchImages, BRAND_IMAGE_QUERIES } from '../services/unsplash.js';
import { BAG_SHAPES, CONDITION_INDICATORS, WEAR_PATTERNS, svgToDataURL } from '../utils/bagShapeSVG.js';
import { getBrandImage } from '../services/imageGenerator.js';
import { WEAR_PATTERN_IMAGES, CONDITION_IMAGES } from '../data/wearPatternImages.js';

/**
 * Brand Image Gallery Component
 * Shows reference images for luxury brands and bag models
 */
export function BrandImageGallery({ brandKey, modelName, showShapes = true }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function loadImages() {
      if (!brandKey) return;

      setLoading(true);

      try {
        // Get ONE brand image with variation numbers to avoid duplicates
        const imagePromises = [];
        for (let i = 0; i < 6; i++) {
          imagePromises.push(getBrandImage(brandKey, modelName, i));
        }
        const results = await Promise.all(imagePromises);

        // Format for display
        const formattedImages = results.map((img, idx) => ({
          id: `${brandKey}-${modelName || 'bag'}-${idx}`,
          url: img.src,
          thumb: img.thumb,
          alt: `${brandKey} ${modelName || 'product'} - View ${idx + 1}`,
          photographer: img.attribution,
          photographerUrl: img.attributionUrl,
          isPlaceholder: img.source === 'placeholder'
        }));

        setImages(formattedImages);
      } catch (error) {
        console.error('Error loading images:', error);
        // Show at least one placeholder
        setImages([{
          id: 'placeholder',
          url: 'data:image/svg+xml;base64,' + btoa(`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f0f0f0"/><text x="200" y="150" text-anchor="middle" font-size="16" fill="#666">No images available</text></svg>`),
          thumb: 'data:image/svg+xml;base64,' + btoa(`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f0f0f0"/><text x="200" y="150" text-anchor="middle" font-size="16" fill="#666">No images available</text></svg>`),
          alt: 'Placeholder',
          photographer: 'Add Gemini API key for images',
          isPlaceholder: true
        }]);
      }
      setLoading(false);
    }

    loadImages();
  }, [brandKey, modelName]);

  const containerStyle = {
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '12px',
    marginTop: '20px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '15px'
  };

  const imageCardStyle = {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const attributionStyle = {
    padding: '8px',
    fontSize: '11px',
    color: '#666',
    textAlign: 'center'
  };

  const modalStyle = selectedImage ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px'
  } : { display: 'none' };

  const modalImageStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '8px'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h3>📸 Reference Images</h3>

      {loading && <p>Loading images...</p>}

      <div style={gridStyle}>
        {images.map((img, idx) => (
          <div
            key={img.id}
            style={imageCardStyle}
            onClick={() => setSelectedImage(img)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img
              src={img.thumb}
              alt={img.alt}
              style={imageStyle}
            />
            {!img.isPlaceholder && (
              <div style={attributionStyle}>
                Photo by {img.photographer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bag Shape Reference (if enabled) */}
      {showShapes && (
        <div style={{ marginTop: '30px' }}>
          <h4 style={{ fontSize: '18px', marginBottom: '15px' }}>👜 Bag Shapes Reference</h4>
          <div style={{ ...gridStyle, gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {Object.entries(BAG_SHAPES).map(([key, svg]) => {
              const shapeNames = {
                tote: 'Tote',
                satchel: 'Satchel',
                hobo: 'Hobo',
                clutch: 'Clutch',
                crossbody: 'Crossbody',
                bucket: 'Bucket',
                flap: 'Flap',
                messenger: 'Messenger'
              };
              return (
                <div key={key} style={{ textAlign: 'center', padding: '15px', background: 'white', borderRadius: '8px' }}>
                  <div dangerouslySetInnerHTML={{ __html: svg }} />
                  <p style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px', color: '#333' }}>
                    {shapeNames[key] || key}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal for full-size image */}
      {selectedImage && (
        <div style={modalStyle} onClick={() => setSelectedImage(null)}>
          <button style={closeButtonStyle} onClick={() => setSelectedImage(null)}>
            ✕ Close
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.alt}
            style={modalImageStyle}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Condition Examples Gallery
 * Shows visual examples of different bag conditions
 */
export function ConditionExamplesGallery({ lang = 'en' }) {
  const conditionNames = {
    en: {
      excellent: 'Excellent',
      veryGood: 'Very Good',
      good: 'Good',
      acceptable: 'Acceptable',
      poor: 'Poor'
    },
    jp: {
      excellent: 'エクセレント',
      veryGood: 'ベリーグッド',
      good: 'グッド',
      acceptable: 'アクセプタブル',
      poor: 'プア'
    }
  };

  const wearNames = {
    en: {
      cornerWear: 'Corner Wear',
      patina: 'Vachetta Patina',
      scratches: 'Surface Scratches',
      stain: 'Interior Stain',
      hardwareWear: 'Hardware Tarnish',
      leatherCrack: 'Leather Cracking',
      waterStain: 'Water Stains',
      colorTransfer: 'Color Transfer',
      penMark: 'Pen Marks',
      stitchingIssue: 'Loose Stitching'
    },
    jp: {
      cornerWear: 'コーナー摩耗',
      patina: 'ヴァケッタパティーナ',
      scratches: '表面キズ',
      stain: '内部染み',
      hardwareWear: '金具の変色',
      leatherCrack: 'レザーのひび割れ',
      waterStain: '水シミ',
      colorTransfer: '色移り',
      penMark: 'ペン跡',
      stitchingIssue: '縫い目のほつれ'
    }
  };

  const imageCardStyle = {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const captionStyle = {
    padding: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  };

  const descStyle = {
    padding: '0 12px 12px',
    fontSize: '12px',
    color: '#666',
    lineHeight: '1.4'
  };

  return (
    <div style={{ background: '#f9f9f9', borderRadius: '12px', marginTop: '20px', padding: '20px' }}>
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>🔍 Condition Level Examples</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        {lang === 'en'
          ? 'Real examples of different condition levels - use these as reference when describing items'
          : 'コンディションレベルの実例 - 商品説明時の参考にしてください'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {Object.entries(CONDITION_IMAGES).map(([key, data]) => (
          <div key={key} style={imageCardStyle}>
            <img src={data.url} alt={data.description} style={imageStyle} />
            <div style={captionStyle}>{conditionNames[lang][key]}</div>
            <div style={descStyle}>{data.details}</div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '40px', fontSize: '20px', marginBottom: '10px' }}>⚠️ Common Wear Pattern Examples</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        {lang === 'en'
          ? 'Learn to identify and describe specific wear patterns accurately'
          : '特定の劣化パターンを正確に識別・説明する方法を学ぶ'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {Object.entries(WEAR_PATTERN_IMAGES).map(([key, data]) => (
          <div key={key} style={imageCardStyle}>
            <img src={data.url} alt={data.description} style={imageStyle} />
            <div style={captionStyle}>{wearNames[lang][key]}</div>
            <div style={descStyle}>
              <strong>{lang === 'en' ? 'Example:' : '例:'}</strong> {data.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Model Comparison Grid
 * Shows multiple bag models side-by-side for comparison
 */
export function ModelComparisonGrid({ models, lang = 'en' }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  };

  return (
    <div style={gridStyle}>
      {models.map((model, idx) => (
        <div key={idx} style={cardStyle}>
          <h4>{model.name}</h4>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
            {lang === 'jp' ? model.briefJp : model.brief}
          </p>

          {/* Size list */}
          <div style={{ fontSize: '12px', marginTop: '10px' }}>
            <strong>Sizes:</strong>
            <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
              {model.sizes?.map((size, i) => (
                <li key={i} style={{ marginBottom: '3px' }}>
                  {size.name} - {size.dim}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro tip */}
          {model.tip && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              background: '#f0f7ff',
              borderLeft: '3px solid #3665F3',
              fontSize: '12px',
              fontStyle: 'italic'
            }}>
              💡 {lang === 'jp' ? model.tipJp : model.tip}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
