const express = require('express');
const cors = require('cors');
require('dotenv').config();

const GeminiService = require('./gemini-service');
const llmRoutes = require('./routes/llm');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());

const geminiService = new GeminiService();

app.use('/api/llm', llmRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/stats', async (req, res) => {
  try {
    const LLMCall = require('./models/LLMCall');
    const llmCall = new LLMCall();
    const calls = await llmCall.getAll();
    
    const total = calls.length;
    const avgLatency = total > 0 
      ? Math.round(calls.reduce((sum, call) => sum + call.latency, 0) / total)
      : 0;
    
    res.json({ total, avgLatency });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, model = 'gemini-2.0-flash-001' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'missing_prompt' });
    }

    const result = await geminiService.generateContent(prompt, model);

    const LLMCall = require('./models/LLMCall');
    const llmCall = new LLMCall();

    await llmCall.create({
      prompt,
      response: result.response,
      model: result.model,
      latency: result.latency,
      parameters: { model },
      metadata: {
      }
    });
    
    res.json({
      response: result.response,
      model: result.model,
      latency: result.latency,
      status: result.status
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const LLMCall = require('./models/LLMCall');
    const llmCall = new LLMCall();
    const calls = await llmCall.getAll();
    res.json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
