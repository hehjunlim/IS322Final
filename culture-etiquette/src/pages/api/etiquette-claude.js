// pages/api/etiquette-claude.js

import Anthropic from '@anthropic-ai/sdk';

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
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Anthropic API key is not configured');
      return res.status(500).json({ 
        error: 'AI service is not configured properly',
        answer: 'I apologize, but the AI service is not configured properly. Please contact the site administrator.'
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Build a better prompt based on user profile if available
    let systemPrompt = "You are a helpful cultural etiquette assistant. Your goal is to provide accurate and respectful advice about customs, traditions, and appropriate behavior in different cultures around the world. Be clear about whether something is appropriate or inappropriate, and explain why. Keep responses concise but informative.";
    
    if (userProfile) {
      systemPrompt += ` The user has the following profile: Purpose: ${userProfile.purpose || 'Not specified'}. Interested cultures: ${userProfile.interestedCultures?.join(', ') || 'Not specified'}. Experience level: ${userProfile.experienceLevel || 'Not specified'}. Adjust your responses to be appropriate for this background.`;
    }

    // Make request to Anthropic
    const completion = await anthropic.completions.create({
      model: "claude-2",
      prompt: `${systemPrompt}\n\nHuman: ${message}\n\nAssistant:`,
      max_tokens_to_sample: 500,
      temperature: 0.7,
    });

    // Extract and return the response
    const answer = completion.completion;
    
    return res.status(200).json({ answer });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    
    // Check if it's an API key error
    if (error.status === 401) {
      return res.status(500).json({ 
        error: 'Invalid API key',
        answer: 'I apologize, but there was an issue with the AI service authentication. Please contact the site administrator.'
      });
    }
    
    // Handle rate limit errors
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        answer: 'I apologize, but we\'ve reached the AI service rate limit. Please try again in a moment.'
      });
    }
    
    return res.status(500).json({ 
      error: 'Something went wrong',
      answer: 'I apologize, but I encountered an error processing your request. Please try again.'
    });
  }
}