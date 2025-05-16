import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/EtiquetteAssistant.module.css';

const SimpleEtiquetteAI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Add initial greeting when component mounts
  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Hello! I can help with cultural etiquette questions. Ask me about customs, traditions, or appropriate behavior in any country or culture.',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to the bottom when messages change
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
    setError(null);

    try {
      // Call your API endpoint that interfaces with the AI service
      const response = await fetch('/api/etiquette-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputValue,
          // You can add user profile info here if available
          userProfile: localStorage.getItem('userProfile') 
            ? JSON.parse(localStorage.getItem('userProfile')) 
            : null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI service');
      }

      const data = await response.json();
      
      // Process response to determine if something is appropriate/inappropriate
      // This is a simple implementation - you could add more analysis in the API
      const isAppropriate = determineAppropriateness(data.answer);
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.answer,
        appropriate: isAppropriate.appropriate,
        explanation: isAppropriate.explanation,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error calling AI service:', err);
      setError('Sorry, I had trouble connecting to the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Simple function to analyze response for appropriateness indicators
  // In a real app, you would have the AI structured response include this info
  const determineAppropriateness = (text) => {
    const lowerText = text.toLowerCase();
    
    // Check for clear appropriate/inappropriate indicators
    if (
      lowerText.includes('not appropriate') || 
      lowerText.includes('inappropriate') || 
      lowerText.includes('avoid') || 
      lowerText.includes('offensive') ||
      lowerText.includes('disrespectful') ||
      lowerText.includes('taboo')
    ) {
      return { 
        appropriate: false,
        explanation: 'This may not be appropriate in this cultural context.'
      };
    } else if (
      lowerText.includes('is appropriate') || 
      lowerText.includes('well-received') || 
      lowerText.includes('customary') || 
      lowerText.includes('acceptable') ||
      lowerText.includes('common practice') ||
      lowerText.includes('expected')
    ) {
      return { 
        appropriate: true,
        explanation: 'This is generally appropriate in this cultural context.'
      };
    }
    
    // Default case when appropriateness is unclear
    return { appropriate: null };
  };

  // Suggested quick questions for users
  const quickQuestions = [
    "Is tipping expected in Japan?",
    "How should I greet someone in France?",
    "Is it rude to use my left hand in Middle East?",
    "What gift should I avoid in China?"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    // Use setTimeout to ensure the input value is set before submission
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            {message.role === 'assistant' && message.appropriate !== undefined && (
              <div className={styles.appropriatenessIndicator}>
                {message.appropriate === true ? (
                  <span className={styles.appropriate}>
                    <i className="fas fa-check-circle"></i> Appropriate
                  </span>
                ) : message.appropriate === false ? (
                  <span className={styles.inappropriate}>
                    <i className="fas fa-times-circle"></i> Not Appropriate
                  </span>
                ) : null}
              </div>
            )}
            <div className={styles.messageContent}>
              <p>{message.content}</p>
              {message.explanation && (
                <div className={styles.explanation}>
                  <p>{message.explanation}</p>
                </div>
              )}
            </div>
            <div className={styles.messageTime}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
        
        {error && (
          <div className={`${styles.message} ${styles.errorMessage}`}>
            <p>{error}</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className={styles.quickQuestions}>
          <h3>Try asking about:</h3>
          <div className={styles.quickButtonsContainer}>
            {quickQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => setInputValue(q)}
                className={styles.quickButton}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className={styles.inputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about cultural etiquette..."
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

export default SimpleEtiquetteAI;