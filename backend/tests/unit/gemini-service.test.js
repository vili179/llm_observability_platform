const GeminiService = require('../../gemini-service');

jest.mock('axios', () => ({
  post: jest.fn()
}));
const axios = require('axios');

describe('GeminiService - Unit Test', () => {
  let geminiService;

  beforeEach(() => {
    geminiService = new GeminiService();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  test('should initialize with correct base URL', () => {
    expect(geminiService.baseURL).toBe('https://generativelanguage.googleapis.com/v1beta/models');
  });

  test('should handle API errors gracefully', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    const result = await geminiService.generateContent('Hello');
    
    expect(result.status).toBe('error');
    expect(result.response).toContain('Error:');
    expect(result.latency).toBeGreaterThanOrEqual(0);
  });
});