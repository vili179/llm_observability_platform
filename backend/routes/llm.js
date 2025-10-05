const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const LLMCall = require('../models/LLMCall');

router.post('/log', async (req, res) => {
  try {
    const { prompt, response, model, parameters, metadata } = req.body;
    
    const llmCall = new LLMCall();
    const result = await llmCall.create({
      prompt,
      response,
      model: model || 'gpt-3.5-turbo',
      parameters: parameters || {},
      metadata: metadata || {},
      status: 'success'
    });

    res.json({ 
      success: true, 
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error logging LLM call:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to log LLM call' 
    });
  }
});

router.get('/history', async (req, res) => {
  try {
    const llmCall = new LLMCall();
    const calls = await llmCall.getAll();
    
    res.json({
      success: true,
      data: calls,
      count: calls.length
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch history' 
    });
  }
});

router.get('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const llmCall = new LLMCall();
    await llmCall.connect();
    
    const call = await llmCall.collection.findOne({ 
      _id: new ObjectId(id) 
    });
    
    await llmCall.client.close();
    
    if (!call) {
      return res.status(404).json({ 
        success: false, 
        error: 'Call not found' 
      });
    }
    
    res.json({ success: true, data: call });
  } catch (error) {
    console.error('Error fetching call:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch call' 
    });
  }
});

module.exports = router;