// utils/api-timeout.js

/**
 * Creates a promise that rejects after a specified timeout
 * @param {number} ms - Timeout in milliseconds
 * @returns {Promise} A promise that rejects after the timeout
 */
export const createTimeout = (ms) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timed out after ${ms}ms`));
      }, ms);
    });
  };
  
  /**
   * Executes a promise with a timeout
   * @param {Promise} promise - The promise to execute
   * @param {number} timeoutMs - Timeout in milliseconds
   * @returns {Promise} A promise that resolves with the result or rejects with an error
   */
  export const withTimeout = (promise, timeoutMs = 15000) => {
    return Promise.race([
      promise,
      createTimeout(timeoutMs)
    ]);
  };
  
  /**
   * Creates a simplified API response for faster answers (less detail)
   * @param {string} question - The user's question
   * @returns {string} A simplified response
   */
  export const generateQuickResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Quick responses for common questions
    if (lowerQuestion.includes('tip') && lowerQuestion.includes('japan')) {
      return "Tipping is generally not appropriate in Japan. In fact, it may be considered confusing or even rude in some settings.";
    }
    
    if (lowerQuestion.includes('bow') && lowerQuestion.includes('japan')) {
      return "Bowing is appropriate and expected in Japan. The depth and duration of the bow depends on the formality of the situation.";
    }
  
    if (lowerQuestion.includes('left hand') && (lowerQuestion.includes('middle east') || lowerQuestion.includes('arab'))) {
      return "Using your left hand for eating or giving items is generally considered inappropriate in Middle Eastern cultures, as the left hand is traditionally associated with bathroom hygiene.";
    }
    
    // Default response when no quick answer is available
    return null;
  };