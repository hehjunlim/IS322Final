// components/SimpleEtiquetteAIEmbed.js

import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/SimpleEtiquetteAIEmbed.module.css';

// A simpler, more lightweight version of the SimpleEtiquetteAI component for embedding
const SimpleEtiquetteAIEmbed = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Add initial greeting when component mounts
  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Ask me any question about cultural etiquette around the world!',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call API endpoint
      const response = await fetch('/api/etiquette-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputValue,
          userProfile: localStorage.getItem('userProfile') 
            ? JSON.parse(localStorage.getItem('userProfile')) 
            : null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error:', err);
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple predefined questions for the embed
  const quickQuestions = [
    "Is it rude to tip in Japan?",
    "How do I greet someone in Dubai?"
  ];

  return (
    <div className={styles.embedContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            <div className={styles.messageContent}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className={styles.quickQuestions}>
          {quickQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => {
                setInputValue(q);
                setTimeout(() => handleSendMessage(), 50);
              }}
              className={styles.quickButton}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSendMessage} className={styles.inputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          className={styles.inputField}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={styles.sendButton}
          disabled={isLoading || !inputValue.trim()}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default SimpleEtiquetteAIEmbed;