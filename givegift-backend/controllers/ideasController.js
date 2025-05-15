import { generateSystemPrompt, generateUserPrompt } from "../utils/prompts.js";
import FireworksAIService from "../API/FireworksAIService.js";
import { getProductInfo } from "../utils/WBParser.js";

class IdeasController {
    async generateIdeas(req, res) {
        try {
            const { price_range: priceRange, is_adult: isAdult, interests } = req.body;

            const rawResponse = await FireworksAIService.createChatCompletion(
                generateSystemPrompt(),
                generateUserPrompt(interests)
            )
            const responseData = await rawResponse.json();
            const response = responseData.choices[0].message.content
                .replace(/<think>[\s\S]*?<\/think>/g, "");
            const gifts = JSON.parse(response).gifts;

            const produtsPromises = gifts.map(gift =>
                getProductInfo(gift, priceRange[0], priceRange[1], isAdult)
            );

            const data = await Promise.all(produtsPromises);
            res.json(data)
        } catch (err) {
            console.error(err)
        }
    }

}

export default new IdeasController()
