const fs = require('fs');

console.log('=== CHECKING GEMINI-SERVICE.JS ===');
const content = fs.readFileSync('./gemini-service.js', 'utf8');
console.log('File exists:', fs.existsSync('./gemini-service.js'));

const funcMatch = content.match(/async generateContent[^{]+\{[\s\S]*?\n\}/);
if (funcMatch) {
  console.log('FOUND generateContent function:');
  console.log(funcMatch[0]);
} else {
  console.log('Function pattern not found');
}

console.log('\n=== TESTING LOADED MODULE ===');
const GeminiService = require('./gemini-service');
const service = new GeminiService();
console.log('Loaded function toString:');
console.log(service.generateContent.toString());
