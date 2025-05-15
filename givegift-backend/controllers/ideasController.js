import { generateSystemPrompt, generateUserPrompt } from "../utils/prompts.js";
import FireworksAIService from "../API/FireworksAIService.js";

class IdeasController {
    async generateIdeas(req, res) {
        try {
            const rawResponse = await FireworksAIService.createChatCompletion(
                generateSystemPrompt(),
                generateUserPrompt(req.body.interests)
            )
            const responseData = await rawResponse.json();
            const response = responseData.choices[0].message.content
                .replace(/<think>[\s\S]*?<\/think>/g, "");
            const gifts = JSON.parse(response).gifts;

            res.json(gifts)
        } catch (err) {
            console.error(err)
        }
    }

}

export default new IdeasController()
