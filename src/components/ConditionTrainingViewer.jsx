import { useState, useEffect } from 'react';
import {
  generate360View,
  generateConditionComparison,
  generateWearExample,
  generatePracticeScenario,
  generateAuthMarkers,
  isGeminiAvailable
} from '../services/conditionTrainingImages.js';

/**
 * 360-Degree Product Viewer
 * Shows all angles of a product for comprehensive condition assessment training
 */
export function Product360Viewer({ brand, model, condition = 'good', lang = 'en' }) {
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState(0);

  const labels = {
    en: {
      loading: 'Generating 360° view...',
      generate: 'Generate 360° View',
      views: ['Front', 'Back', 'Left Side', 'Right Side', 'Interior', 'Top', 'Bottom']
    },
    jp: {
      loading: '360°ビュー生成中...',
      generate: '360°ビュー生成',
      views: ['正面', '背面', '左側面', '右側面', '内部', '上面', '底面']
    }
  };

  const t = labels[lang];

  async function handleGenerate() {
    setLoading(true);
    const result = await generate360View(model, brand, condition);
    setViews(result);
    setLoading(false);
  }

  const containerStyle = {
    background: '#f9f9f9',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '20px'
  };

  const mainImageStyle = {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    marginBottom: '20px'
  };

  const thumbnailContainerStyle = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  const thumbnailStyle = (isActive) => ({
    width: '80px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px',
    cursor: 'pointer',
    border: isActive ? '3px solid #3665F3' : '2px solid #ddd',
    transition: 'all 0.2s'
  });

  const buttonStyle = {
    background: '#3665F3',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h3>📐 360° Product View</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>
        {lang === 'jp'
          ? '全ての角度からコンディションを確認・説明する練習'
          : 'Practice describing condition from all angles'}
      </p>

      {!views.length && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? t.loading : t.generate}
        </button>
      )}

      {views.length > 0 && (
        <div>
          {/* Main view */}
          <div style={{ textAlign: 'center' }}>
            <img
              src={views[currentView]?.image}
              alt={views[currentView]?.description}
              style={mainImageStyle}
            />
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {t.views[currentView]} - {views[currentView]?.description}
            </p>
          </div>

          {/* Thumbnails */}
          <div style={thumbnailContainerStyle}>
            {views.map((view, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <img
                  src={view.image}
                  alt={view.angle}
                  style={thumbnailStyle(idx === currentView)}
                  onClick={() => setCurrentView(idx)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <p style={{ fontSize: '11px', marginTop: '5px' }}>{t.views[idx]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isGeminiAvailable() && (
        <div style={{
          background: '#fff3cd',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '15px',
          fontSize: '14px'
        }}>
          ⚠️ {lang === 'jp'
            ? 'Gemini APIキーを追加すると、実際のAI生成画像が表示されます'
            : 'Add VITE_GEMINI_API_KEY to generate real images'}
        </div>
      )}
    </div>
  );
}

/**
 * Condition Comparison Grid
 * Side-by-side comparison of different condition grades
 */
export function ConditionComparisonGrid({ brand, model, lang = 'en' }) {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const result = await generateConditionComparison(model, brand);
    setComparisons(result);
    setLoading(false);
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '10px'
  };

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '12px', marginTop: '20px' }}>
      <h3>🎯 Condition Grade Comparison</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        {lang === 'jp'
          ? '同じバッグの異なるコンディショングレードを比較'
          : 'Compare the same bag in different condition grades'}
      </p>

      {!comparisons.length && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            background: '#3665F3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading
            ? (lang === 'jp' ? '生成中...' : 'Generating...')
            : (lang === 'jp' ? '比較画像を生成' : 'Generate Comparison')}
        </button>
      )}

      <div style={gridStyle}>
        {comparisons.map((comp, idx) => (
          <div key={idx} style={cardStyle}>
            <img src={comp.image} alt={comp.label} style={imageStyle} />
            <h4 style={{ fontSize: '16px', margin: '10px 0' }}>{comp.label}</h4>
            <p style={{ fontSize: '12px', color: '#666' }}>{comp.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Wear Example Gallery
 * Shows specific wear patterns to look for and describe
 */
export function WearExampleGallery({ lang = 'en' }) {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(false);

  const wearTypes = [
    { type: 'corner-wear', label: { en: 'Corner Wear', jp: 'コーナー摩耗' } },
    { type: 'patina-light', label: { en: 'Light Patina', jp: 'ライトパティーナ' } },
    { type: 'patina-medium', label: { en: 'Medium Patina', jp: 'ミディアムパティーナ' } },
    { type: 'hardware-scratches', label: { en: 'Hardware Scratches', jp: '金具キズ' } },
    { type: 'hardware-tarnish', label: { en: 'Hardware Tarnish', jp: '金具変色' } },
    { type: 'interior-stain', label: { en: 'Interior Stain', jp: '内部染み' } },
    { type: 'leather-scuff', label: { en: 'Leather Scuff', jp: 'レザースレ' } }
  ];

  async function handleGenerate() {
    setLoading(true);
    const results = await Promise.all(
      wearTypes.map(wt => generateWearExample(wt.type))
    );
    setExamples(results.filter(r => r !== null));
    setLoading(false);
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '12px', marginTop: '20px' }}>
      <h3>🔍 Wear Pattern Examples</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        {lang === 'jp'
          ? '具体的な摩耗パターンを学ぶ - カメラで見せて説明する'
          : 'Learn specific wear patterns - Show on camera and describe'}
      </p>

      {!examples.length && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            background: '#3665F3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading
            ? (lang === 'jp' ? '生成中...' : 'Generating...')
            : (lang === 'jp' ? '摩耗例を生成' : 'Generate Examples')}
        </button>
      )}

      <div style={gridStyle}>
        {examples.map((ex, idx) => {
          const wearType = wearTypes.find(wt => wt.type === ex.type);
          return (
            <div key={idx} style={cardStyle}>
              <img src={ex.image} alt={ex.type} style={imageStyle} />
              <div style={{ padding: '15px' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>
                  {wearType?.label[lang] || ex.type}
                </h4>
                <p style={{ fontSize: '13px', color: '#666' }}>
                  {ex.severity} severity
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Practice Scenario Component
 * Interactive scenario with image + correct/incorrect descriptions
 */
export function PracticeScenarioViewer({ scenarioType, lang = 'en' }) {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  async function handleLoad() {
    setLoading(true);
    const result = await generatePracticeScenario(scenarioType);
    setScenario(result);
    setLoading(false);
  }

  useEffect(() => {
    handleLoad();
  }, [scenarioType]);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>
      {lang === 'jp' ? 'シナリオ生成中...' : 'Generating scenario...'}
    </div>;
  }

  if (!scenario) return null;

  const containerStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginTop: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  };

  const imageContainerStyle = {
    textAlign: 'center',
    marginBottom: '20px'
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const sectionStyle = {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '8px'
  };

  const correctStyle = {
    ...sectionStyle,
    background: '#d4edda',
    borderLeft: '4px solid #28a745'
  };

  const incorrectStyle = {
    ...sectionStyle,
    background: '#f8d7da',
    borderLeft: '4px solid #dc3545'
  };

  const explanationStyle = {
    ...sectionStyle,
    background: '#d1ecf1',
    borderLeft: '4px solid #0c5460'
  };

  return (
    <div style={containerStyle}>
      <h3>{scenario.title}</h3>
      <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
        {scenario.situation}
      </p>

      <div style={imageContainerStyle}>
        <img src={scenario.image} alt={scenario.title} style={imageStyle} />
      </div>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        style={{
          background: '#3665F3',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '15px'
        }}
      >
        {showAnswer
          ? (lang === 'jp' ? '答えを隠す' : 'Hide Answer')
          : (lang === 'jp' ? '答えを見る' : 'Show Answer')}
      </button>

      {showAnswer && (
        <>
          <div style={incorrectStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#721c24' }}>
              ❌ {lang === 'jp' ? '不十分な説明' : 'Insufficient Description'}
            </h4>
            <p style={{ margin: 0, fontSize: '14px' }}>
              "{scenario.incorrectDescription}"
            </p>
          </div>

          <div style={correctStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>
              ✅ {lang === 'jp' ? '正しい説明' : 'Correct Description'}
            </h4>
            <p style={{ margin: 0, fontSize: '14px' }}>
              "{scenario.correctDescription}"
            </p>
          </div>

          <div style={explanationStyle}>
            <h4 style={{ margin: '0 0 10px 0', color: '#004085' }}>
              💡 {lang === 'jp' ? '説明' : 'Explanation'}
            </h4>
            <p style={{ margin: 0, fontSize: '14px' }}>
              {scenario.explanation}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
