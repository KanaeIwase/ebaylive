import { useState, useRef, useEffect } from 'react';
import { simulateLiveStreamBuyer, evaluateConditionDescription, chatAsBuyer, rephraseJapaneseToEnglish, isAPIConfigured } from '../services/anthropic';

/**
 * AI Live Stream Simulator
 * Practice selling with realistic AI buyers
 */
export function AILiveStreamSimulator({ lang = 'en' }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentItem, setCurrentItem] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const startNewSession = () => {
    const item = prompt(lang === 'en'
      ? 'What item are you selling? (e.g., "Louis Vuitton Speedy 30, good condition")'
      : '何を販売していますか？（例：「ルイ・ヴィトン スピーディ30、良好な状態」）'
    );

    if (!item) return;

    setCurrentItem(item);
    setMessages([
      {
        role: 'system',
        content: `${lang === 'en' ? 'Started live stream with:' : 'ライブ配信開始：'} ${item}`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    const userMsg = {
      role: 'seller',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsStreaming(true);
    setStreamingText('');

    const conversationContext = {
      messages: [
        { role: 'user', content: `Item being sold: ${currentItem}` },
        ...messages.filter(m => m.role !== 'system').map(m => ({
          role: m.role === 'seller' ? 'user' : 'assistant',
          content: m.content
        })),
        { role: 'user', content: inputMessage }
      ]
    };

    try {
      const response = await simulateLiveStreamBuyer(conversationContext, (chunk) => {
        setStreamingText(prev => prev + chunk);
      });

      setMessages(prev => [...prev, {
        role: 'buyer',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setStreamingText('');
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: `Error: ${error.message}`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsStreaming(false);
    }
  };

  if (!isAPIConfigured()) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#FFF3CD', borderRadius: '12px', border: '2px solid #FFC107' }}>
        <h3>⚠️ {lang === 'en' ? 'API Key Required' : 'APIキーが必要'}</h3>
        <p style={{ color: '#856404', marginTop: '16px' }}>
          {lang === 'en'
            ? 'Add VITE_ANTHROPIC_API_KEY to your .env file to use AI practice features.'
            : 'AI練習機能を使用するには、.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。'}
        </p>
      </div>
    );
  }

  const containerStyle = {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    border: '2px solid #E5E7EB',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const chatBoxStyle = {
    background: '#F9FAFB',
    borderRadius: '8px',
    padding: '16px',
    minHeight: '400px',
    maxHeight: '500px',
    overflowY: 'auto',
    marginBottom: '16px',
    border: '1px solid #E5E7EB'
  };

  const messageStyle = (role) => ({
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '12px',
    maxWidth: '80%',
    marginLeft: role === 'seller' ? 'auto' : '0',
    marginRight: role === 'seller' ? '0' : 'auto',
    background: role === 'seller' ? '#3665F3' : role === 'buyer' ? '#FFFFFF' : '#FEF3C7',
    color: role === 'seller' ? '#FFFFFF' : '#191919',
    border: role === 'buyer' ? '1px solid #E5E7EB' : 'none',
    boxShadow: role !== 'system' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
  });

  const inputContainerStyle = {
    display: 'flex',
    gap: '12px'
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #E5E7EB',
    fontSize: '15px',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    background: '#3665F3',
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
        🎥 {lang === 'en' ? 'AI Live Stream Simulator' : 'AIライブ配信シミュレーター'}
      </h2>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        {lang === 'en'
          ? 'Practice selling to realistic AI buyers. They will ask questions, negotiate, and react to your responses.'
          : 'リアルなAIバイヤーに販売練習。質問、交渉、反応をシミュレート。'}
      </p>

      {!currentItem ? (
        <button onClick={startNewSession} style={buttonStyle}>
          {lang === 'en' ? '🚀 Start Live Stream' : '🚀 ライブ配信開始'}
        </button>
      ) : (
        <>
          <div style={{ background: '#F0F9FF', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #BAE6FD' }}>
            <strong>{lang === 'en' ? 'Now Selling:' : '販売中：'}</strong> {currentItem}
          </div>

          <div style={chatBoxStyle}>
            {messages.map((msg, idx) => (
              <div key={idx} style={messageStyle(msg.role)}>
                <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>
                  {msg.role === 'seller' ? (lang === 'en' ? 'You' : 'あなた') :
                   msg.role === 'buyer' ? (lang === 'en' ? 'Buyer' : 'バイヤー') :
                   (lang === 'en' ? 'System' : 'システム')} • {msg.timestamp}
                </div>
                <div style={{ fontSize: '15px' }}>{msg.content}</div>
              </div>
            ))}

            {streamingText && (
              <div style={messageStyle('buyer')}>
                <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>
                  {lang === 'en' ? 'Buyer' : 'バイヤー'} • {new Date().toLocaleTimeString()}
                </div>
                <div style={{ fontSize: '15px' }}>{streamingText}</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div style={inputContainerStyle}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={lang === 'en' ? 'Type your message...' : 'メッセージを入力...'}
              style={inputStyle}
              disabled={isStreaming}
            />
            <button onClick={sendMessage} disabled={isStreaming} style={buttonStyle}>
              {isStreaming ? '⏳' : '📤'} {lang === 'en' ? 'Send' : '送信'}
            </button>
          </div>

          <button
            onClick={startNewSession}
            style={{ ...buttonStyle, background: '#6B7280', marginTop: '12px', width: '100%' }}
          >
            {lang === 'en' ? '🔄 Start New Session' : '🔄 新しいセッション開始'}
          </button>
        </>
      )}
    </div>
  );
}

/**
 * AI Condition Evaluator
 * Get AI feedback on your condition descriptions
 */
export function AIConditionEvaluator({ lang = 'en' }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [description, setDescription] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const practiceItems = [
    {
      item: "Louis Vuitton Speedy 30",
      issues: ["Corner wear on all four corners", "Light patina on handles", "Interior clean, no stains", "Hardware shows minor tarnish"],
      correctCondition: "Very Good"
    },
    {
      item: "Chanel Classic Flap",
      issues: ["Quilting intact, no sagging", "Chain shows light scratches", "Turnlock slightly loose", "Minor scuffing on back"],
      correctCondition: "Good"
    },
    {
      item: "Hermès Birkin 35",
      issues: ["Pristine clemence leather", "Hardware unscratched", "Sangles never used", "Includes all accessories"],
      correctCondition: "Excellent"
    }
  ];

  const handleEvaluate = async () => {
    if (!description.trim() || !selectedItem) return;

    setIsEvaluating(true);
    try {
      const result = await evaluateConditionDescription(selectedItem, description);
      setEvaluation(result);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsEvaluating(false);
    }
  };

  if (!isAPIConfigured()) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#FFF3CD', borderRadius: '12px', border: '2px solid #FFC107' }}>
        <h3>⚠️ {lang === 'en' ? 'API Key Required' : 'APIキーが必要'}</h3>
        <p style={{ color: '#856404', marginTop: '16px' }}>
          {lang === 'en'
            ? 'Add VITE_ANTHROPIC_API_KEY to your .env file to use AI practice features.'
            : 'AI練習機能を使用するには、.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。'}
        </p>
      </div>
    );
  }

  const scoreColors = {
    'Excellent': '#10B981',
    'Good': '#F59E0B',
    'Needs Work': '#EF4444'
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '2px solid #E5E7EB', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
        ✅ {lang === 'en' ? 'AI Condition Evaluator' : 'AIコンディション評価者'}
      </h2>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        {lang === 'en'
          ? 'Describe an item and get instant AI feedback on your description quality.'
          : 'アイテムを説明してAIから即座にフィードバックを受け取る。'}
      </p>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>
          {lang === 'en' ? 'Choose a practice item:' : '練習アイテムを選択：'}
        </label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {practiceItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedItem(item)}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: selectedItem === item ? '#3665F3' : '#E5E7EB',
                background: selectedItem === item ? '#EEF2FF' : 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {item.item}
            </button>
          ))}
        </div>
      </div>

      {selectedItem && (
        <>
          <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>
              {lang === 'en' ? 'Item Details (what you see on camera):' : 'アイテム詳細（カメラで見えるもの）：'}
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {selectedItem.issues.map((issue, idx) => (
                <li key={idx} style={{ color: '#4B5563', marginBottom: '4px' }}>{issue}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
              {lang === 'en' ? 'Your Description:' : 'あなたの説明：'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === 'en'
                ? 'Describe this item as you would on eBay Live...'
                : 'eBay Liveでの説明を入力...'}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #E5E7EB',
                fontSize: '15px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !description.trim()}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#3665F3',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {isEvaluating ? '⏳ Evaluating...' : `✨ ${lang === 'en' ? 'Get AI Feedback' : 'AIフィードバック取得'}`}
          </button>
        </>
      )}

      {evaluation && (
        <div style={{ marginTop: '24px', padding: '20px', background: '#F9FAFB', borderRadius: '12px', border: '2px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: scoreColors[evaluation.score],
              color: 'white',
              fontWeight: '700',
              fontSize: '18px'
            }}>
              {evaluation.score}
            </div>
            <div style={{ flex: 1, fontSize: '15px', color: '#4B5563' }}>
              {evaluation.feedback}
            </div>
          </div>

          {evaluation.missed && evaluation.missed.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '600', color: '#EF4444', marginBottom: '8px' }}>
                ❌ {lang === 'en' ? 'You Missed:' : '見落とし：'}
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#4B5563' }}>
                {evaluation.missed.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.vague && evaluation.vague.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '600', color: '#F59E0B', marginBottom: '8px' }}>
                ⚠️ {lang === 'en' ? 'Too Vague:' : '曖昧：'}
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#4B5563' }}>
                {evaluation.vague.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.modelAnswer && (
            <div>
              <div style={{ fontWeight: '600', color: '#10B981', marginBottom: '8px' }}>
                ✅ {lang === 'en' ? 'Model Answer:' : '模範解答：'}
              </div>
              <div style={{
                padding: '12px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #D1FAE5',
                color: '#065F46',
                fontStyle: 'italic'
              }}>
                "{evaluation.modelAnswer}"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * AI Conversation Partner
 * Free-form practice conversations
 */
export function AIConversationPartner({ lang = 'en' }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  const startNewConversation = () => {
    setMessages([{
      role: 'assistant',
      content: lang === 'en'
        ? "Hey! I'm browsing your live stream. What are you selling today?"
        : "こんにちは！あなたのライブ配信を見ています。今日は何を販売していますか？",
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    const userMsg = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsStreaming(true);
    setStreamingText('');

    try {
      const conversationHistory = messages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await chatAsBuyer(conversationHistory, (chunk) => {
        setStreamingText(prev => prev + chunk);
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setStreamingText('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsStreaming(false);
    }
  };

  if (!isAPIConfigured()) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#FFF3CD', borderRadius: '12px', border: '2px solid #FFC107' }}>
        <h3>⚠️ {lang === 'en' ? 'API Key Required' : 'APIキーが必要'}</h3>
        <p style={{ color: '#856404', marginTop: '16px' }}>
          {lang === 'en'
            ? 'Add VITE_ANTHROPIC_API_KEY to your .env file to use AI practice features.'
            : 'AI練習機能を使用するには、.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '2px solid #E5E7EB', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
        💬 {lang === 'en' ? 'AI Conversation Partner' : 'AI会話パートナー'}
      </h2>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        {lang === 'en'
          ? 'Practice free-form conversations with an AI buyer. Get coaching feedback after the conversation.'
          : 'AIバイヤーとフリーフォームの会話を練習。会話後にコーチングフィードバック。'}
      </p>

      {messages.length === 0 ? (
        <button
          onClick={startNewConversation}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: '#3665F3',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          🚀 {lang === 'en' ? 'Start Conversation' : '会話を開始'}
        </button>
      ) : (
        <>
          <div style={{
            background: '#F9FAFB',
            borderRadius: '8px',
            padding: '16px',
            minHeight: '400px',
            maxHeight: '500px',
            overflowY: 'auto',
            marginBottom: '16px',
            border: '1px solid #E5E7EB'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '12px',
                maxWidth: '80%',
                marginLeft: msg.role === 'user' ? 'auto' : '0',
                marginRight: msg.role === 'user' ? '0' : 'auto',
                background: msg.role === 'user' ? '#3665F3' : '#FFFFFF',
                color: msg.role === 'user' ? '#FFFFFF' : '#191919',
                border: msg.role === 'assistant' ? '1px solid #E5E7EB' : 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>
                  {msg.role === 'user' ? (lang === 'en' ? 'You' : 'あなた') : (lang === 'en' ? 'Buyer' : 'バイヤー')} • {msg.timestamp}
                </div>
                <div style={{ fontSize: '15px' }}>{msg.content}</div>
              </div>
            ))}

            {streamingText && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '12px',
                maxWidth: '80%',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>
                  {lang === 'en' ? 'Buyer' : 'バイヤー'} • {new Date().toLocaleTimeString()}
                </div>
                <div style={{ fontSize: '15px' }}>{streamingText}</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={lang === 'en' ? 'Type your response...' : '返信を入力...'}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #E5E7EB',
                fontSize: '15px',
                outline: 'none'
              }}
              disabled={isStreaming}
            />
            <button
              onClick={sendMessage}
              disabled={isStreaming}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                background: '#3665F3',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {isStreaming ? '⏳' : '📤'}
            </button>
          </div>

          <button
            onClick={startNewConversation}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#6B7280',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              marginTop: '12px'
            }}
          >
            🔄 {lang === 'en' ? 'Start New Conversation' : '新しい会話を開始'}
          </button>
        </>
      )}
    </div>
  );
}

/**
 * AI Phrase Translator
 * Translate Japanese thoughts to English selling phrases
 */
export function AIPhraseTranslator({ lang = 'en' }) {
  const [japaneseText, setJapaneseText] = useState('');
  const [translations, setTranslations] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!japaneseText.trim()) return;

    setIsTranslating(true);
    try {
      const result = await rephraseJapaneseToEnglish(japaneseText);
      setTranslations(result);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const examplePhrases = [
    "このバッグは角に少し擦れがありますが、全体的にとても良い状態です",
    "金具に軽い傷がありますが、機能は完璧です",
    "ヴィンテージ品なので、経年変化による色の変化があります"
  ];

  if (!isAPIConfigured()) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#FFF3CD', borderRadius: '12px', border: '2px solid #FFC107' }}>
        <h3>⚠️ {lang === 'en' ? 'API Key Required' : 'APIキーが必要'}</h3>
        <p style={{ color: '#856404', marginTop: '16px' }}>
          {lang === 'en'
            ? 'Add VITE_ANTHROPIC_API_KEY to your .env file to use AI practice features.'
            : 'AI練習機能を使用するには、.envファイルにVITE_ANTHROPIC_API_KEYを追加してください。'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '2px solid #E5E7EB', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
        🌐 {lang === 'en' ? 'AI Phrase Translator' : 'AIフレーズ翻訳'}
      </h2>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        {lang === 'en'
          ? 'Type what you want to say in Japanese, get 3 natural English versions for live selling.'
          : '日本語で言いたいことを入力し、ライブ販売用の3つの自然な英語バージョンを取得。'}
      </p>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
          {lang === 'en' ? 'Japanese Input:' : '日本語入力：'}
        </label>
        <textarea
          value={japaneseText}
          onChange={(e) => setJapaneseText(e.target.value)}
          placeholder={lang === 'en'
            ? 'Enter Japanese text...'
            : '日本語テキストを入力...'}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #E5E7EB',
            fontSize: '15px',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
          {lang === 'en' ? 'Quick examples:' : '例文：'}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {examplePhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => setJapaneseText(phrase)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                background: 'white',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {phrase.substring(0, 20)}...
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleTranslate}
        disabled={isTranslating || !japaneseText.trim()}
        style={{
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          background: '#3665F3',
          color: 'white',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        {isTranslating ? '⏳ Translating...' : `✨ ${lang === 'en' ? 'Get 3 English Versions' : '3つの英語バージョン取得'}`}
      </button>

      {translations && (
        <div style={{ marginTop: '24px' }}>
          <div style={{ marginBottom: '16px', padding: '16px', background: '#EEF2FF', borderRadius: '8px', borderLeft: '4px solid #6366F1' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#4338CA', marginBottom: '8px' }}>
              📘 {lang === 'en' ? 'Formal / Professional' : 'フォーマル/プロフェッショナル'}
            </div>
            <div style={{ fontSize: '15px', color: '#1E293B' }}>
              "{translations.formal}"
            </div>
          </div>

          <div style={{ marginBottom: '16px', padding: '16px', background: '#FEF3C7', borderRadius: '8px', borderLeft: '4px solid #F59E0B' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#B45309', marginBottom: '8px' }}>
              😊 {lang === 'en' ? 'Casual / Friendly' : 'カジュアル/フレンドリー'}
            </div>
            <div style={{ fontSize: '15px', color: '#1E293B' }}>
              "{translations.casual}"
            </div>
          </div>

          <div style={{ padding: '16px', background: '#D1FAE5', borderRadius: '8px', borderLeft: '4px solid #10B981' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#065F46', marginBottom: '8px' }}>
              💪 {lang === 'en' ? 'Confident / Salesy' : '自信/セールス'}
            </div>
            <div style={{ fontSize: '15px', color: '#1E293B' }}>
              "{translations.confident}"
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
