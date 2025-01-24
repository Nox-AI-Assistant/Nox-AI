import { OpenAI } from 'openai';
import { config } from '../config/index.js';

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey
    });
    // Store conversation history per user
    this.userConversations = new Map();
  }

  async generateResponse(userMessage, userId) {
    try {
      // Get or create user's conversation history
      if (!this.userConversations.has(userId)) {
        this.userConversations.set(userId, []);
      }
      const conversationHistory = this.userConversations.get(userId);

      // Add user message to history
      conversationHistory.push({
        role: "user",
        content: userMessage
      });

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are NOX, an intelligent and helpful virtual assistant. Respond naturally and concisely in English only."
          },
          ...conversationHistory
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      const response = completion.choices[0].message.content;
      
      // Add assistant response to history
      conversationHistory.push({
        role: "assistant",
        content: response
      });

      // Keep conversation history manageable
      if (conversationHistory.length > 10) {
        this.userConversations.set(userId, conversationHistory.slice(-10));
      }

      return response;
    } catch (error) {
      console.error('OpenAI Error:', error);
      return "Sorry, I encountered an error. Please try again.";
    }
  }

  // Clean up user's conversation history when they disconnect
  cleanupUser(userId) {
    this.userConversations.delete(userId);
  }
}

// Create singleton instance
export const openAIService = new OpenAIService();