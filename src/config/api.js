// API Configuration for future integrations
// このファイルは将来のAPI機能用の設定ファイルです

export const API_CONFIG = {
  // Gemini API for voice generation (音声生成用)
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta',
  },

  // Video analysis API (動画分析用)
  videoAnalysis: {
    apiKey: import.meta.env.VITE_VIDEO_API_KEY || '',
    endpoint: '/api/analyze-video', // Will be configured later
  },
}

// Feature flags (機能フラグ - 段階的にリリース)
export const FEATURES = {
  voiceGeneration: false,  // Gemini音声生成機能
  videoAnalysis: false,    // 動画分析機能
  aiCoach: false,          // AIコーチング機能
}
