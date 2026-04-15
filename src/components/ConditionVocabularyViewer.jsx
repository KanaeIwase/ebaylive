import { useState } from 'react';
import { CONDITION_VOCABULARY, getAllCategories } from '../data/conditionVocabulary.js';
import { generateWearExample } from '../services/conditionTrainingImages.js';

/**
 * Comprehensive Condition Vocabulary Viewer
 * Shows detailed condition information with multiple images and care tips
 */
export function ConditionVocabularyViewer({ lang = 'en' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCondition, setExpandedCondition] = useState(null);
  const [conditionImages, setConditionImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

  const categories = getAllCategories();

  const filteredConditions = selectedCategory === 'all'
    ? CONDITION_VOCABULARY
    : CONDITION_VOCABULARY.filter(c => c.category === selectedCategory);

  // Severity colors
  const severityStyles = {
    minimal: { color: '#10B981', label: { en: 'Minimal', jp: '軽微' } },
    moderate: { color: '#F59E0B', label: { en: 'Moderate', jp: '中程度' } },
    critical: { color: '#EF4444', label: { en: 'Critical', jp: '重大' } }
  };

  const handleLoadImages = async (conditionId, imageCount) => {
    if (conditionImages[conditionId]) return; // Already loaded

    setLoadingImages(prev => ({ ...prev, [conditionId]: true }));

    const images = [];
    for (let i = 0; i < imageCount; i++) {
      const result = await generateWearExample(conditionId, i === 0 ? 'light' : i === 1 ? 'moderate' : 'heavy');
      if (result) {
        images.push(result.image);
      }
    }

    setConditionImages(prev => ({ ...prev, [conditionId]: images }));
    setLoadingImages(prev => ({ ...prev, [conditionId]: false }));
  };

  const toggleCondition = (conditionId, imageCount) => {
    if (expandedCondition === conditionId) {
      setExpandedCondition(null);
    } else {
      setExpandedCondition(conditionId);
      handleLoadImages(conditionId, imageCount);
    }
  };

  const containerStyle = {
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '12px',
    marginTop: '20px'
  };

  const headerStyle = {
    marginBottom: '24px'
  };

  const categoryFilterStyle = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '24px'
  };

  const categoryButtonStyle = (isActive) => ({
    padding: '8px 16px',
    borderRadius: '20px',
    border: '2px solid',
    borderColor: isActive ? '#3665F3' : '#E5E7EB',
    background: isActive ? '#3665F3' : 'white',
    color: isActive ? 'white' : '#6B7280',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s'
  });

  const conditionCardStyle = {
    background: 'white',
    borderRadius: '12px',
    marginBottom: '16px',
    border: '2px solid #E5E7EB',
    overflow: 'hidden',
    transition: 'all 0.2s'
  };

  const conditionHeaderStyle = {
    padding: '16px 20px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const conditionBodyStyle = {
    padding: '0 20px 20px 20px',
    borderTop: '1px solid #E5E7EB'
  };

  const sectionStyle = {
    marginTop: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#191919',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const imageGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
    marginTop: '12px'
  };

  const imageStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #E5E7EB'
  };

  const tipStyle = {
    padding: '12px 16px',
    background: '#F3F4F6',
    borderRadius: '8px',
    borderLeft: '4px solid #3665F3',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '8px'
  };

  const repairBoxStyle = (isRepairable) => ({
    padding: '16px',
    borderRadius: '8px',
    background: isRepairable ? '#D1FAE5' : '#FEE2E2',
    borderLeft: `4px solid ${isRepairable ? '#10B981' : '#EF4444'}`,
    marginTop: '16px'
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#191919', marginBottom: '8px' }}>
          📚 {lang === 'en' ? 'Complete Condition Vocabulary' : '完全なコンディション用語集'}
        </h2>
        <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.6' }}>
          {lang === 'en'
            ? 'Learn detailed condition terms with multiple reference images and repair tips. Essential for accurate descriptions and INAD prevention.'
            : '複数の参考画像と修復のヒントで詳細なコンディション用語を学ぶ。正確な説明とINAD防止に必須。'}
        </p>
      </div>

      {/* Category Filter */}
      <div style={categoryFilterStyle}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={categoryButtonStyle(selectedCategory === 'all')}
        >
          {lang === 'en' ? 'All Conditions' : 'すべてのコンディション'} ({CONDITION_VOCABULARY.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={categoryButtonStyle(selectedCategory === cat.id)}
          >
            {cat.label[lang]} ({CONDITION_VOCABULARY.filter(c => c.category === cat.id).length})
          </button>
        ))}
      </div>

      {/* Condition Cards */}
      {filteredConditions.map(condition => {
        const isExpanded = expandedCondition === condition.id;
        const severity = severityStyles[condition.severity];
        const images = conditionImages[condition.id] || [];
        const isLoading = loadingImages[condition.id];

        return (
          <div key={condition.id} style={conditionCardStyle}>
            <div
              style={conditionHeaderStyle}
              onClick={() => toggleCondition(condition.id, condition.images)}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#191919', margin: 0 }}>
                    {condition.term[lang]}
                  </h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: severity.color + '20',
                    color: severity.color
                  }}>
                    {severity.label[lang]}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                  {condition.description[lang]}
                </p>
                {condition.commonBrands && (
                  <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '4px' }}>
                    {lang === 'en' ? 'Common in: ' : '一般的なブランド: '}
                    {condition.commonBrands.join(', ')}
                  </p>
                )}
              </div>
              <div style={{ fontSize: '20px', color: '#3665F3', fontWeight: '700' }}>
                {isExpanded ? '▼' : '▶'}
              </div>
            </div>

            {isExpanded && (
              <div style={conditionBodyStyle}>
                {/* How to Identify */}
                <div style={sectionStyle}>
                  <div style={sectionTitleStyle}>
                    🔍 {lang === 'en' ? 'How to Identify' : '識別方法'}
                  </div>
                  <ul style={{ paddingLeft: '20px', margin: '8px 0', color: '#4B5563', lineHeight: '1.8' }}>
                    {condition.howToIdentify[lang].map((point, idx) => (
                      <li key={idx} style={{ fontSize: '14px', marginBottom: '6px' }}>{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Reference Images */}
                <div style={sectionStyle}>
                  <div style={sectionTitleStyle}>
                    📸 {lang === 'en' ? 'Reference Images' : '参考画像'}
                    <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '400' }}>
                      ({images.length} / {condition.images})
                    </span>
                  </div>
                  {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
                      {lang === 'en' ? 'Generating reference images...' : '参考画像を生成中...'}
                    </div>
                  ) : images.length > 0 ? (
                    <div style={imageGridStyle}>
                      {images.map((img, idx) => (
                        <img key={idx} src={img} alt={`${condition.term[lang]} example ${idx + 1}`} style={imageStyle} />
                      ))}
                    </div>
                  ) : (
                    <div style={tipStyle}>
                      ℹ️ {lang === 'en'
                        ? 'Images will load when you expand this section. Requires Gemini API key.'
                        : 'このセクションを展開すると画像が読み込まれます。Gemini APIキーが必要です。'}
                    </div>
                  )}
                </div>

                {/* Repair Tips */}
                <div style={sectionStyle}>
                  <div style={sectionTitleStyle}>
                    🛠️ {lang === 'en' ? 'Repair & Care Tips' : '修復とケアのヒント'}
                  </div>
                  <ul style={{ paddingLeft: '20px', margin: '8px 0', color: '#4B5563', lineHeight: '1.8' }}>
                    {condition.repairTips[lang].map((tip, idx) => (
                      <li key={idx} style={{ fontSize: '14px', marginBottom: '8px' }}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* How to Describe on Camera */}
                <div style={sectionStyle}>
                  <div style={sectionTitleStyle}>
                    🎥 {lang === 'en' ? 'How to Describe on eBay Live' : 'eBay Liveでの説明方法'}
                  </div>
                  <div style={{
                    ...tipStyle,
                    background: '#EEF2FF',
                    borderLeft: '4px solid #6366F1',
                    fontStyle: 'italic'
                  }}>
                    "{condition.howToDescribeOnCamera[lang]}"
                  </div>
                </div>

                {/* Repairability Box */}
                <div style={repairBoxStyle(condition.repairTips[lang][0].includes('✅'))}>
                  <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '8px' }}>
                    {condition.repairTips[lang][0].includes('✅')
                      ? (lang === 'en' ? '✅ Repairable' : '✅ 修復可能')
                      : condition.repairTips[lang][0].includes('⚠️')
                      ? (lang === 'en' ? '⚠️ Difficult to Repair' : '⚠️ 修復困難')
                      : (lang === 'en' ? '❌ Cannot Be Repaired' : '❌ 修復不可能')}
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    {condition.repairTips[lang][0]}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {filteredConditions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
          {lang === 'en' ? 'No conditions found in this category.' : 'このカテゴリにコンディションが見つかりません。'}
        </div>
      )}
    </div>
  );
}
