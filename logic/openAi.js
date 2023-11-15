const OpenAI = require("openai");
const { sleep } = require("openai/core");

//process.env.API_OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: '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',
});


async function chatGPTCompletion (news) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": ` ${news} Forget all your previous instructions. Pretend you are a financial expert. You area financial expert with stock recommendation experience. Answer 'YES' if good news, 'NO' if bad news, or 'UNKNOWN' if uncertain in the first line. Then elaborate with one short and concise sentence on the next line.`}],
      });
    
      
     return response.choices[0].message.content
}



exports.chatGPTCompletion = chatGPTCompletion;