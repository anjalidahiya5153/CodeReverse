require('dotenv').config({ path: './src/.env' });
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Define error templates array to avoid repeats
const errorTemplates = [
    "Missing semicolon:\nint main() {\n    int x = 10\n    return 0;\n}",
    "Incorrect logical operator:\nint main() {\n    int age = 18;\n    if (age > 18) {\n        cout << \"Adult\";\n    }\n    return 0;\n}",
    "Missing parenthesis:\nint main() {\n    int a = 5, b = 10;\n    if a > b {\n        cout << \"a is greater than b\";\n    }\n    return 0;\n}",
    "Incorrect bracket usage:\nint main() {\n    int numbers[] = {1, 2, 3, 4, 5};\n    for(int i = 0; i < 5; i++ {\n        cout << numbers[i] << endl;\n    }\n    return 0;\n}",
    "Misplaced return statement:\nint main() {\n    int calculateSum(int a, int b) {\n        return a + b;\n    }\n    return 0;\n    cout << calculateSum(5, 10);\n}",
    "Uninitialized variable:\nint main() {\n    int a;\n    cout << a;\n    return 0;\n}",
    "Assignment instead of comparison:\nint main() {\n    int a = 5, b = 10;\n    if (a = b) {\n        cout << \"a equals b\";\n    }\n    return 0;\n}",
    "Missing header file:\nint main() {\n    cout << \"Hello, world!\";\n    return 0;\n}\n// Note: Missing #include <iostream>",
    "Using an undefined variable:\nint main() {\n    int a = 10;\n    cout << b;\n    return 0;\n}",
    "Extra comma in initializer list:\nint main() {\n    int arr[] = {1, 2, 3, };\n    return 0;\n}"
  ];
  
const key = process.env.API_KEY;
if (!key) {
  console.error("API_KEY is not defined in the environment variables");
}

const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 300
    }
  });
  
  const errorHistory = new Set();
  const MAX_HISTORY = 20;
  const MAX_ATTEMPTS = 5;
    const TEMPLATE_COOLDOWN = 20;
  let templateHistory = [];
  
  function chooseTemplateIndex() {
    const availableIndices = [];
    for (let i = 0; i < errorTemplates.length; i++) {
      if (!templateHistory.includes(i)) {
        availableIndices.push(i);
      }
    }
    if (availableIndices.length === 0) {
      templateHistory = [];
      for (let i = 0; i < errorTemplates.length; i++) {
        availableIndices.push(i);
      }
    }
    const chosenIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    templateHistory.push(chosenIndex);
    if (templateHistory.length > TEMPLATE_COOLDOWN) {
      templateHistory.shift();
    }
    return chosenIndex;
  }
  
  async function generateUniqueErrorCode(attempt = 0) {
    const templateIndex = chooseTemplateIndex();
    const template = errorTemplates[templateIndex];
    const recentErrors = Array.from(errorHistory).join('\n');
    
    const recentErrorsText = recentErrors
      ? `Please do not generate any code snippet matching any of these errors:\n${recentErrors}\n`
      : '';
    
    const prompt = `${recentErrorsText}
  Based on the following template:
  ${template}
  Generate a new C++ code snippet with a single, simple, and meaningful error. Ensure that the error is unique and varied, and avoid trivial or overly common mistakes (for example, do not simply repeat missing semicolons or redundant braces). Do not repeat any error types from previous outputs. Return only the code snippet with no additional text or explanation. Make sure that the code snippet has an error.`;
    
    try {
      const result = await model.generateContent(prompt);
      const rawCode = await (await result.response).text();
      const code = cleanCode(rawCode);
      const hash = hashcode(code);
  
      if (errorHistory.has(hash) && attempt < MAX_ATTEMPTS) {
        return generateUniqueErrorCode(attempt + 1);
      }
  
      updateErrorHistory(hash);
      return code;
    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  }
  
  function cleanCode(code) {
    return code.replace(/```cpp/g, '')
               .replace(/```/g, '')
               .replace(/\/\/.*$/gm, '')
               .trim();
  }
  
  function hashcode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash;
  }
  
  function updateErrorHistory(hash) {
    errorHistory.add(hash);
    if (errorHistory.size > MAX_HISTORY) {
      const oldest = Array.from(errorHistory)[0];
      errorHistory.delete(oldest);
    }
  }
  
  function cleanResponseText(text) {
    let cleaned = text.replace(/^\s*```(?:json)?\s*/, '');
    cleaned = cleaned
      .split('\n')
      .filter(line => line.trim() !== '```')
      .join('\n');
    return cleaned.trim();
  }
  
  router.get('/generate-error', async (req, res) => {
    console.log("Request made to generate error code");
    try {
      const errorCode = await generateUniqueErrorCode();
      res.json({ 
        errorCode,
        hint: "Find and fix the single logical error in the code"
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to generate unique error code",
        details: error.message
      });
    }
  });
  

router.post('/validate', async (req, res) => {
    console.log("Request made to validate code");

  try {
    const { code, solution } = req.body;
    if (!code || !solution) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const prompt = `Original Code:\n${code}\n\nModified Code:\n${solution}\n\nAnalysis:
1. Was the original error fixed correctly?
2. Are there new errors introduced?
3. Is the solution optimal?

Answer format (JSON):
{
  "correct": boolean,
  "feedback": string,
  "improvements": string[]
}`;
    console.log("Prompt sent to AI:", prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = await response.text();
    // console.log("Raw AI Response Text:", responseText);
    responseText = cleanResponseText(responseText);
    // console.log("Cleaned AI Response Text:", responseText);
    try {
      const parsedResponse = JSON.parse(responseText);
      res.json({
        correct: parsedResponse.correct,
        feedback: parsedResponse.feedback,
        improvements: parsedResponse.improvements || []
      });
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      res.status(500).json({
        error: "Validation failed",
        details: "Invalid response format from AI model"
      });
    }
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      error: "Validation failed",
      details: error.message
    });
  }
});

module.exports = router;
