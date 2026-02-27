const axios = require('axios');
require('dotenv').config();

async function diagnose() {
  console.log('=== GEMINI API DIAGNOSTICS ===\n');
  
  console.log('1. API Key present:', !!process.env.GEMINI_API_KEY);
  console.log('   Key starts with:', process.env.GEMINI_API_KEY?.substring(0, 15) + '...');
  
  console.log('\n2. Testing basic API connection...');
  try {
    const response = await axios({
      method: 'GET',
      url: `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
      timeout: 5000
    });
    console.log('   ✅ Models endpoint works!');
    console.log('   Available models:', response.data.models?.map(m => m.name).slice(0, 3));
  } catch (error) {
    console.log('   ❌ Models endpoint failed:');
    console.log('   Status:', error.response?.status);
    console.log('   Data:', JSON.stringify(error.response?.data, null, 2));
  }
  
  console.log('\n3. Testing minimal generate request...');
  try {
    const response = await axios({
      method: 'POST',
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${process.env.GEMINI_API_KEY}`,
      data: {
        contents: [{
          parts: [{
            text: "Hi"
          }]
        }]
      },
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('   ✅ Generate endpoint works!');
    console.log('   Response:', response.data.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (error) {
    console.log('   ❌ Generate endpoint failed:');
    console.log('   Status:', error.response?.status);
    console.log('   Data:', JSON.stringify(error.response?.data, null, 2));
  }
}

diagnose();
