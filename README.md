# Global Etiquette Guide - AI Integration

This README explains how to set up and use the AI integration for your Global Etiquette Guide application.

## Overview

The application integrates with AI services to provide cultural etiquette advice to users. The integration is designed to be flexible, allowing you to choose between OpenAI's GPT models or Anthropic's Claude models.

## Setup Instructions

### 1. API Keys

You need to obtain API keys for at least one of the supported AI services:

- **OpenAI API Key**: Sign up at [OpenAI Platform](https://platform.openai.com/)
- **Anthropic API Key**: Sign up at [Anthropic API](https://console.anthropic.com/)

### 2. Environment Configuration

Create a `.env.local` file in the root of your project with the following variables:

```
# OpenAI API Key (GPT-3.5 or GPT-4)
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic API Key (Claude) - Optional alternative
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Set to "openai" or "anthropic" based on which service you want to use
NEXT_PUBLIC_AI_SERVICE=openai
```

### 3. Install Required Packages

Run the following command to install the necessary packages:

```bash
npm install openai @anthropic-ai/sdk
```

## Components Overview

The AI integration consists of several key components:

### 1. API Routes

- `/api/etiquette-ai.js`: Handles requests to the OpenAI API
- `/api/etiquette-claude.js`: Handles requests to the Anthropic Claude API

### 2. React Components

- `SimpleEtiquetteAI.js`: Main AI chat component for the dedicated AI assistant page
- `SimpleEtiquetteAIEmbed.js`: Lightweight version for embedding on the homepage

### 3. Utility Functions

- `utils/ai-service.js`: Provides utilities for selecting and using the appropriate AI service

## How It Works

1. When a user sends a message in the chat interface, the message is sent to the appropriate API endpoint based on your configuration.
2. The API route formats the user message with a system prompt that guides the AI to provide cultural etiquette advice.
3. If the user has a profile, their profile information is included to personalize the response.
4. The AI's response is parsed and analyzed to determine if an action is considered appropriate or inappropriate in the cultural context.
5. The response is displayed in the chat interface with appropriate visual indicators.

## Customization

### System Prompts

You can customize the system prompts in the API route files to adjust how the AI responds. The current prompt instructs the AI to provide cultural etiquette advice and be clear about whether something is appropriate or inappropriate.

### Response Analysis

The `determineAppropriateness` function in the `SimpleEtiquetteAI` component analyzes responses to determine if something is appropriate or inappropriate. You can modify this function to improve the analysis.

### UI Customization

The UI components are styled using CSS modules. You can customize the appearance by modifying the respective CSS files.

## Deployment Notes

When deploying your application, make sure to:

1. Set up environment variables on your hosting platform
2. Verify that your API keys have the necessary permissions and quotas
3. Consider rate limiting to prevent excessive API usage

## Troubleshooting

- **API Key Issues**: If you encounter authentication errors, verify that your API keys are correct and properly configured.
- **Rate Limiting**: If you hit rate limits, consider implementing a queue system or increasing your quota.
- **Response Formatting**: If responses are not being properly analyzed, check the `determineAppropriateness` function and adjust it as needed.

## Extending the Integration

You can extend the AI integration by:

1. Adding support for additional AI services
2. Implementing more structured prompts for specific types of cultural advice
3. Adding features like conversation history storage or response caching
4. Integrating with cultural databases for more accurate information