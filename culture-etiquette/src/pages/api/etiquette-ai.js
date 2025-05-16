// pages/api/etiquette-ai.js (improved error handling)

import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, userProfile } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return res.status(500).json({ 
        error: 'AI service is not configured properly',
        answer: 'I apologize, but the AI service is not configured properly. Please contact the site administrator.'
      });
    }

    console.log('API key configured, making request to OpenAI...');
    
    const openai = new OpenAIApi(configuration);

    // Build a better prompt based on user profile if available
    let systemPrompt = "You are a helpful cultural etiquette assistant. Your goal is to provide accurate and respectful advice about customs, traditions, and appropriate behavior in different cultures around the world. Be clear about whether something is appropriate or inappropriate, and explain why. Keep responses concise but informative.";
    
    if (userProfile) {
      systemPrompt += ` The user has the following profile: Purpose: ${userProfile.purpose || 'Not specified'}. Interested cultures: ${userProfile.interestedCultures?.join(', ') || 'Not specified'}. Experience level: ${userProfile.experienceLevel || 'Not specified'}. Adjust your responses to be appropriate for this background.`;
    }

    console.log('Making request to OpenAI with prompt...');

    // Make request to OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Use a faster model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 300, // Reduce token count for faster responses
    });

    console.log('Received response from OpenAI');

    // Extract and return the response
    const answer = completion.data.choices[0].message.content;
    
    return res.status(200).json({ answer });
  } catch (error) {
    // Detailed error logging
    console.error('Error in API route:', error);
    console.error('Error details:', error.response?.data || 'No additional details');
    
    // Check if it's an API key error
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        error: 'Invalid API key',
        answer: 'I apologize, but there was an issue with the AI service authentication. Please contact the site administrator.'
      });
    }
    
    // Handle rate limit errors
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        answer: 'I apologize, but we\'ve reached the AI service rate limit. Please try again in a moment.'
      });
    }
    
    // Always return a response, even for unexpected errors
    return res.status(500).json({ 
      error: 'Something went wrong',
      answer: 'I apologize, but I encountered an error processing your request. Please try again.'
    });
  }
}