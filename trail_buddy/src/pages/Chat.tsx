// src/components/Chat.tsx

import React, { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../utils/generateAIResponse';
import { ChatMessage, Sender } from '../types';
import { Send, Bot, User } from 'lucide-react';

const API_KEY = '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';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmed = inputMessage.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: trimmed,
      sender: Sender.User,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(trimmed, API_KEY);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: '❌ Error getting AI response. Please try again later.',
          sender: Sender.AI,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div
      className="chat-container min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: 'url(/Bot.jpg)' }}
    >
      <div className="chat-box h-[600px] overflow-y-auto border rounded-lg p-4 bg-white bg-opacity-30 shadow-inner max-w-3xl mx-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`my-2 flex ${msg.sender === Sender.User ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-3 rounded-lg max-w-md text-sm ${
                msg.sender === Sender.User ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
              }`}
            >
              <div className="flex items-center gap-1 mb-1 text-gray-600 text-xs">
                {msg.sender === Sender.User ? <User size={14} /> : <Bot size={14} />}
                {msg.sender}
              </div>
              <p className="text-gray-800">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-sm text-gray-500 italic my-2">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex gap-2 items-center mt-4 max-w-3xl mx-auto">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
