// Gemini API Service for Voice Generation
// 音声生成用のGemini APIサービス

import { API_CONFIG } from '../config/api.js'

/**
 * Generate voice using Gemini API
 * Gemini APIを使って音声を生成
 *
 * @param {string} text - Text to convert to speech (音声に変換するテキスト)
 * @param {string} language - Language code (言語コード: 'en' or 'ja')
 * @returns {Promise<Blob>} Audio blob
 */
export async function generateVoice(text, language = 'en') {
  // TODO: Implement Gemini API integration
  // まだ実装していません - 将来追加予定

  console.log('Voice generation requested:', { text, language })

  throw new Error('Voice generation not yet implemented. Gemini API integration coming soon.')
}

/**
 * Analyze pronunciation
 * 発音を分析
 *
 * @param {Blob} audioBlob - Recorded audio (録音した音声)
 * @param {string} expectedText - Expected text (期待されるテキスト)
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzePronunciation(audioBlob, expectedText) {
  // TODO: Implement pronunciation analysis
  // まだ実装していません - 将来追加予定

  console.log('Pronunciation analysis requested:', { expectedText })

  throw new Error('Pronunciation analysis not yet implemented.')
}
