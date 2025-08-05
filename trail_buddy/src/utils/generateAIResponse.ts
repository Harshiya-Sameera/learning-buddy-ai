// src/utils/generateAIResponse.ts

import { ChatMessage, Sender } from '../types';

export async function generateAIResponse(userInput: string, apiKey: string): Promise<ChatMessage> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173', // Replace with your domain in production
        'X-Title': 'LearningBuddy',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'user',
            content: userInput,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${errorText}`);
    }

    const data = await response.json();

    const aiMessage: ChatMessage = {
      id: Date.now().toString(),
      content: data.choices?.[0]?.message?.content || '🤖 No response from AI',
      sender: Sender.AI,
      timestamp: new Date().toISOString(),
    };

    return aiMessage;
  } catch (error) {
    console.error('AI API Error:', error);
    throw error;
  }
}
