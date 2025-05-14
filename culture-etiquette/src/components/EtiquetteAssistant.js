import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/EtiquetteAssistant.module.css';

const EtiquetteAssistant = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickQuestions, setQuickQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);
      
      // Generate personalized quick questions based on user interests
      const questions = generateQuickQuestions(parsedProfile);
      setQuickQuestions(questions);
    }

    // Initial greeting
    setMessages([{
      id: 1,
      sender: 'assistant',
      text: `Hello! I'm your Cultural Etiquette Assistant. I can help you understand if something is appropriate or inappropriate in different cultures. What would you like to know?`,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateQuickQuestions = (profile) => {
    const questions = [];
    
    if (profile.interestedCultures?.includes('Japanese')) {
      questions.push("Is it appropriate to tip in Japan?");
      questions.push("How should I exchange business cards in Japan?");
    }
    
    if (profile.interestedCultures?.includes('Middle Eastern')) {
      questions.push("Is it okay to use my left hand for eating in the Middle East?");
      questions.push("What should I wear when visiting a mosque?");
    }
    
    if (profile.interestedCultures?.includes('French')) {
      questions.push("When should I say 'tu' vs 'vous' in France?");
      questions.push("Is it rude to ask for a doggy bag in France?");
    }
    
    // Add general questions
    questions.push("What are universal gestures to avoid?");
    questions.push("How do I politely decline food in different cultures?");
    
    return questions.slice(0, 6); // Return max 6 questions
  };

  const getCulturalAdvice = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Simulate AI responses based on keywords
    if (lowerQuestion.includes('tip') && lowerQuestion.includes('japan')) {
      return {
        appropriate: false,
        response: "Tipping is generally NOT appropriate in Japan. It can even be considered insulting. Japanese service workers take pride in their work and see good service as their duty, not something that requires extra payment. If you leave money on the table, staff might chase after you thinking you forgot it!",
        alternatives: "Instead of tipping, show appreciation by: 1) Saying 'gochisousama deshita' after a meal, 2) Bowing slightly when thanking someone, 3) Being polite and respectful."
      };
    }
    
    if (lowerQuestion.includes('business card') && lowerQuestion.includes('japan')) {
      return {
        appropriate: true,
        response: "Exchanging business cards (meishi) in Japan requires specific etiquette: 1) Present with both hands, 2) Bow slightly while offering, 3) Receive with both hands, 4) Study the card briefly before putting it away carefully (never in back pocket), 5) Place received cards on the table during meetings, arranged by seniority.",
        tips: "Have cards printed in Japanese on one side if possible. Include your title clearly. Higher quality cards make a better impression."
      };
    }
    
    if (lowerQuestion.includes('left hand') && (lowerQuestion.includes('middle east') || lowerQuestion.includes('arab'))) {
      return {
        appropriate: false,
        response: "Using your left hand for eating, greeting, or passing items is considered inappropriate in Middle Eastern cultures. The left hand is traditionally associated with personal hygiene and considered unclean.",
        alternatives: "Always use your right hand for: eating, shaking hands, giving/receiving items, and touching food. If you're left-handed, make an effort to adapt in formal settings."
      };
    }
    
    if (lowerQuestion.includes('mosque') && lowerQuestion.includes('wear')) {
      return {
        appropriate: true,
        response: "When visiting a mosque, modest dress is essential. Women should cover their hair, arms, and legs. Men should wear long pants and shirts with sleeves. Remove shoes before entering.",
        specifics: "Women: Bring a headscarf, wear loose-fitting clothes. Men: Avoid shorts and sleeveless shirts. Both: No revealing clothing, remove shoes at entrance."
      };
    }
    
    if (lowerQuestion.includes('tu') && lowerQuestion.includes('vous')) {
      return {
        appropriate: true,
        response: "'Vous' is the formal 'you' used with strangers, elderly people, and in professional settings. 'Tu' is informal, used with friends, family, and children. When in doubt, use 'vous' until invited to use 'tu'.",
        tips: "Start with 'vous' in business settings. Wait for French speakers to suggest 'tu' ('on peut se tutoyer?'). With people clearly younger, 'tu' is usually fine."
      };
    }
    
    // Default response for unrecognized questions
    return {
      appropriate: null,
      response: "I'd be happy to help you with that cultural etiquette question. Could you be more specific about which culture or country you're asking about? For example, you could ask about dining etiquette in China, business greetings in Germany, or gift-giving in India.",
      suggestion: "Try asking about specific situations like: 'Is it appropriate to shake hands in Thailand?' or 'How should I dress for a business meeting in Saudi Arabia?'"
    };
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const advice = getCulturalAdvice(text);
      const assistantMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: advice.response,
        appropriate: advice.appropriate,
        extras: advice.alternatives || advice.tips || advice.specifics || advice.suggestion,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Save conversation to localStorage
      const conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
      conversations.push({ question: text, answer: advice, timestamp: new Date() });
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className={styles.assistantHeader}>
        <h1>Cultural Etiquette Assistant</h1>
        <p>Ask me anything about cultural appropriateness and etiquette</p>
      </div>
      
      {/* Quick Questions */}
      {quickQuestions.length > 0 && messages.length === 1 && (
        <div className={styles.quickQuestions}>
          <h3>Quick Questions Based on Your Interests:</h3>
          <div className={styles.questionGrid}>
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className={styles.quickQuestionBtn}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat Messages */}
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            <div className={styles.messageContent}>
              {message.sender === 'assistant' && message.appropriate !== null && (
                <div className={styles.appropriatenessIndicator}>
                  {message.appropriate ? (
                    <span className={styles.appropriate}>
                      <i className="fas fa-check-circle"></i> Appropriate
                    </span>
                  ) : (
                    <span className={styles.inappropriate}>
                      <i className="fas fa-times-circle"></i> Not Appropriate
                    </span>
                  )}
                </div>
              )}
              <p>{message.text}</p>
              {message.extras && (
                <div className={styles.extraInfo}>
                  <p>{message.extras}</p>
                </div>
              )}
            </div>
            <div className={styles.messageTime}>
              {message.timestamp.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
        {isTyping && (
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
      
      {/* Input Area */}
      <div className={styles.inputArea}>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about cultural etiquette..."
              className={styles.messageInput}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!inputValue.trim() || isTyping}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
      
      {/* Profile CTA */}
      {!userProfile && (
        <div className={styles.profileCta}>
          <p>Want personalized cultural insights?</p>
          <button onClick={() => router.push('/profile-setup')}>
            Create Your Profile
          </button>
        </div>
      )}
    </>
  );
};

export default EtiquetteAssistant;

// Streamlined version for embedding
export const EtiquetteAssistantEmbed = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initial greeting
    setMessages([{
      id: 1,
      sender: 'assistant',
      text: `Hello! Ask me any question about cultural etiquette and I'll help you understand what's appropriate or inappropriate.`,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getCulturalAdvice = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Enhanced responses for common questions
    if (lowerQuestion.includes('bow') && (lowerQuestion.includes('japan') || lowerQuestion.includes('japanese'))) {
      return {
        appropriate: true,
        response: "Bowing is very appropriate in Japan! The depth and duration depend on the situation: 1) Casual greeting: 15° bow (eshaku), 2) Respectful greeting or thanks: 30° bow (keirei), 3) Deep apology or formal occasion: 45° bow (saikeirei). Hold for 1-2 seconds. As a foreigner, a slight bow shows respect and is always appreciated.",
        tips: "Don't bow while walking. Stop, bow properly, then continue. Maintain eye contact before and after, but not during the bow."
      };
    }
    
    if (lowerQuestion.includes('shake') && lowerQuestion.includes('hand') && (lowerQuestion.includes('muslim') || lowerQuestion.includes('islam'))) {
      return {
        appropriate: false,
        response: "Handshakes between opposite genders are often inappropriate in Muslim cultures. Many Muslims prefer not to shake hands with the opposite gender for religious reasons. Wait for them to extend their hand first.",
        alternatives: "Instead: 1) Place your right hand over your heart with a slight nod, 2) Say 'As-salaam alaikum' (peace be upon you), 3) For same gender, handshakes are usually fine."
      };
    }
    
    if (lowerQuestion.includes('wine') && lowerQuestion.includes('gift') && lowerQuestion.includes('france')) {
      return {
        appropriate: true,
        response: "Wine is an excellent gift in France, but choose wisely! Bring a good quality wine, not the cheapest option. If invited to dinner, wine or flowers are traditional.",
        tips: "For wine: choose something from your country or a good French wine (€15+). For flowers: avoid chrysanthemums (funeral flowers) and red carnations (bad luck)."
      };
    }
    
    if (lowerQuestion.includes('business card') && (lowerQuestion.includes('china') || lowerQuestion.includes('chinese'))) {
      return {
        appropriate: true,
        response: "Business card exchange in China requires both hands! Present and receive cards with both hands, study it briefly, then place it respectfully on the table or in a card case (never in back pocket).",
        tips: "Have cards printed with Chinese on one side. Include your title and company clearly. Higher quality cards show respect."
      };
    }
    
    // Default response
    return {
      appropriate: null,
      response: "I can help you with that cultural question. For the most accurate guidance, please specify: 1) Which country/culture, 2) The specific situation (business, social, dining, etc.)",
      suggestion: "Try questions like: 'Is it appropriate to tip in Japan?', 'How should I greet someone in Dubai?', or 'What should I wear to a business meeting in Germany?'"
    };
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response (no history saving in embed version)
    setTimeout(() => {
      const advice = getCulturalAdvice(text);
      const assistantMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: advice.response,
        appropriate: advice.appropriate,
        extras: advice.alternatives || advice.tips || advice.suggestion,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.embedContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === 'user' ? styles.userMessage : styles.assistantMessage
            }`}
          >
            <div className={styles.messageContent}>
              {message.sender === 'assistant' && message.appropriate !== null && (
                <div className={styles.appropriatenessIndicator}>
                  {message.appropriate ? (
                    <span className={styles.appropriate}>
                      <i className="fas fa-check-circle"></i> Appropriate
                    </span>
                  ) : (
                    <span className={styles.inappropriate}>
                      <i className="fas fa-times-circle"></i> Not Appropriate
                    </span>
                  )}
                </div>
              )}
              <p>{message.text}</p>
              {message.extras && (
                <div className={styles.extraInfo}>
                  <p>{message.extras}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
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
      
      <div className={styles.inputArea}>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about cultural etiquette..."
              className={styles.messageInput}
              autoFocus
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!inputValue.trim() || isTyping}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};