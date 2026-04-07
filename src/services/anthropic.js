/**
 * Anthropic Claude API Service
 * Handles AI-powered coaching and feedback for eBay Live sellers
 */

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-5-sonnet-20241022';

/**
 * Call Claude API with streaming support
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options (system, temperature, etc.)
 * @param {Function} onChunk - Callback for streaming chunks
 * @returns {Promise<string>} - Complete response text
 */
export async function callClaude(messages, options = {}, onChunk = null) {
  if (!ANTHROPIC_API_KEY || ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
    throw new Error('Anthropic API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file.');
  }

  const requestBody = {
    model: MODEL,
    max_tokens: options.maxTokens || 2048,
    temperature: options.temperature || 0.7,
    messages: messages,
    ...(options.system && { system: options.system }),
    stream: !!onChunk
  };

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Anthropic API error: ${error.error?.message || response.statusText}`);
    }

    // Handle streaming response
    if (onChunk) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                const text = parsed.delta.text;
                fullText += text;
                onChunk(text);
              }
            } catch (e) {
              // Skip malformed JSON
            }
          }
        }
      }

      return fullText;
    }

    // Handle non-streaming response
    const data = await response.json();
    return data.content[0].text;

  } catch (error) {
    console.error('Claude API call failed:', error);
    throw error;
  }
}

/**
 * AI Live Stream Simulator - Simulates buyers in a live stream
 */
export async function simulateLiveStreamBuyer(context, onChunk) {
  const system = `You are simulating a professional reseller buyer in an eBay Live luxury fashion auction.

Your role:
- Ask realistic questions about authentication, condition, measurements, shipping
- React to seller's responses naturally (follow up, say "sold!", ask for more details)
- Vary your buyer personality: sometimes skeptical, sometimes eager, sometimes just browsing
- Use short, casual messages like real live chat: "How much?", "Any stains?", "Is that authentic?"
- Japanese sellers speak English on stream, so you speak English too
- If seller gives good details, show interest: "Love it!", "DM sent!", "Sold to me!"
- If seller is vague, push for details: "Can you show the serial number?", "What about the corners?"

Keep messages SHORT (1-2 sentences max). Real live chat is fast and casual.`;

  return await callClaude(context.messages, { system, temperature: 0.8 }, onChunk);
}

/**
 * AI Condition Describer - Evaluates seller's condition descriptions
 */
export async function evaluateConditionDescription(itemDetails, sellerDescription) {
  const system = `You are an expert eBay Live coach helping Japanese sellers describe luxury fashion items to prevent INAD (Item Not As Described) returns.

Your job:
- Evaluate if the seller mentioned ALL visible issues shown in the item details
- Check if language is clear and specific enough (no vague terms like "some wear")
- Identify what was missed or could be more specific
- Give a score: Excellent (prevents INAD) / Good (mostly safe) / Needs Work (risk of returns)

Be encouraging but honest. Japanese sellers tend to be thorough but sometimes too polite/vague.`;

  const messages = [
    {
      role: 'user',
      content: `Item: ${itemDetails.item}
Visible Issues: ${itemDetails.issues.join(', ')}
Correct Condition Level: ${itemDetails.correctCondition}

Seller's Description:
"${sellerDescription}"

Evaluate this description. Did they mention all issues? Is it specific enough? What's missing?

Format your response as JSON:
{
  "score": "Excellent|Good|Needs Work",
  "feedback": "brief encouraging feedback",
  "missed": ["issue1", "issue2"],
  "vague": ["phrase that was too vague"],
  "modelAnswer": "how you would describe it"
}`
    }
  ];

  const response = await callClaude(messages, { system, temperature: 0.3 });

  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (e) {
    // Fallback if JSON parsing fails
    return {
      score: "Good",
      feedback: response,
      missed: [],
      vague: [],
      modelAnswer: ""
    };
  }
}

/**
 * AI Conversation Partner - Free-form practice conversations
 */
export async function chatAsBuyer(conversationHistory, onChunk) {
  const system = `You are a friendly but realistic luxury fashion buyer on eBay Live.

Personality:
- You're interested in authenticity and condition details
- You ask natural follow-up questions
- You're not overly formal - casual live chat style
- If seller answers well, you show interest
- If seller is unclear, you ask for clarification

After 5-7 message exchanges, end the conversation naturally and give the seller brief, encouraging coaching feedback on:
- What they did well
- One thing to improve

Keep your messages SHORT and conversational. Real buyers don't write essays in live chat.`;

  return await callClaude(conversationHistory, { system, temperature: 0.7 }, onChunk);
}

/**
 * AI Phrase Rephraser - Translate Japanese thoughts to English selling phrases
 */
export async function rephraseJapaneseToEnglish(japaneseText) {
  const system = `You are helping a Japanese eBay Live seller translate their thoughts into natural English selling phrases.

Give 3 versions:
1. Formal/Professional - More proper English
2. Casual/Friendly - How real sellers talk on live streams
3. Confident/Salesy - Persuasive without being pushy

Each version should be SHORT (1-2 sentences max). Live selling is conversational, not scripted.

Format as JSON:
{
  "formal": "...",
  "casual": "...",
  "confident": "..."
}`;

  const messages = [
    {
      role: 'user',
      content: `Japanese: ${japaneseText}

Give me 3 natural English versions for live selling.`
    }
  ];

  const response = await callClaude(messages, { system, temperature: 0.6 });

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (e) {
    return {
      formal: response,
      casual: response,
      confident: response
    };
  }
}

/**
 * Check if API key is configured
 */
export function isAPIConfigured() {
  return ANTHROPIC_API_KEY && ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here';
}
