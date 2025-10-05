const axios = require('axios');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
  }

  async generateContent(prompt, model = 'gemini-2.0-flash-001') {
    const startTime = Date.now();
    
    try {
      const response = await axios.post(
        `${this.baseURL}/${model}:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      const latency = Date.now() - startTime;
      const responseText = response.data.candidates[0].content.parts[0].text;

      return {
        response: responseText,
        latency,
        model,
        status: 'success'
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      return {
        response: `Error: ${error.message}`,
        latency,
        model,
        status: 'error'
      };
    }
  }
}

module.exports = GeminiService;