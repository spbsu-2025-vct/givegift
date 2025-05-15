
export default class FireworksAIService {

    static async createChatCompletion(systemPrompt, userPrompt, model = "accounts/fireworks/models/qwen3-30b-a3b") {
        return await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`
            },
            body: JSON.stringify({
                model: model,
                max_tokens: 600,
                top_p: 1,
                top_k: 40,
                presence_penalty: 0,
                frequency_penalty: 0,
                temperature: 0.6,
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ]
            })
        })
    }
}