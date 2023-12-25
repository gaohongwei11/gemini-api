const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai')
const MODEL_NAME = 'gemini-pro'
const API_KEY = 'AIzaSyCgtc9C7r-aVJkwhVTGsJGByl8-TbkbOps'
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: MODEL_NAME })

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
  }
]
const chat = model.startChat(
  generationConfig,
  safetySettings
)
// gemini
const run = async (params) => {
  console.log(params)
  return new Promise(async (resolve, reject) => {
    const msg = params.msg;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const conversationHistory = await model.getConversationHistory();
    resolve({
      conversationHistory,
      response: response.text()
    })
  })
}

module.exports = {
  run
}