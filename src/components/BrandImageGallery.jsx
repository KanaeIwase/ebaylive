import { useState, useEffect } from 'react';
import { searchImages, BRAND_IMAGE_QUERIES } from '../services/unsplash.js';
import { BAG_SHAPES, CONDITION_INDICATORS, WEAR_PATTERNS, svgToDataURL } from '../utils/bagShapeSVG.js';

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
      const query = modelName
        ? `${BRAND_IMAGE_QUERIES[brandKey]} ${modelName}`
        : BRAND_IMAGE_QUERIES[brandKey];

      try {
        const results = await searchImages(query, 6);
        setImages(results);
      } catch (error) {
        console.error('Error loading images:', error);
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
          <h4>👜 Bag Shapes Reference</h4>
          <div style={{ ...gridStyle, gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
            {Object.entries(BAG_SHAPES).map(([key, svg]) => (
              <div key={key} style={{ textAlign: 'center', padding: '10px' }}>
                <div dangerouslySetInnerHTML={{ __html: svg }} />
              </div>
            ))}
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
      stain: 'Interior Stain'
    },
    jp: {
      cornerWear: 'コーナー摩耗',
      patina: 'ヴァケッタパティーナ',
      scratches: '表面キズ',
      stain: '内部染み'
    }
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '15px',
    padding: '20px'
  };

  return (
    <div style={{ background: '#f9f9f9', borderRadius: '12px', marginTop: '20px', padding: '20px' }}>
      <h3>🔍 Condition Indicators</h3>
      <div style={gridStyle}>
        {Object.entries(CONDITION_INDICATORS).map(([key, svg]) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            <p style={{ fontSize: '12px', marginTop: '5px' }}>
              {conditionNames[lang][key]}
            </p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '30px' }}>⚠️ Common Wear Patterns</h3>
      <div style={gridStyle}>
        {Object.entries(WEAR_PATTERNS).map(([key, svg]) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            <p style={{ fontSize: '12px', marginTop: '5px' }}>
              {wearNames[lang][key]}
            </p>
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
