import { generateSystemPrompt, generateUserPrompt } from "../utils/prompts.mjs";
import FireworksAIService from "../API/FireworksAIService.mjs";
import { getProductInfo } from "../parser/WBParser.mjs";
import ApiError from '../error/ApiError.mjs';

class IdeasController {
    async generateIdeas(req, res, next) {
        const { price_range: priceRange, is_adult: isAdult, interests } = req.body;

        // Validate input
        if (!Array.isArray(priceRange) || priceRange.length !== 2 ||
            typeof isAdult !== 'boolean' || !Array.isArray(interests)
        ) {
            return next(ApiError.badRequest(
                'Invalid payload: missing at least one of the required fields: price_range, is_adult, interests'
            ));
        }

        try {
            // Call AI service
            const rawResponse = await FireworksAIService.createChatCompletion(
                generateSystemPrompt(),
                generateUserPrompt(interests)
            );

            // Handle non-OK status from AI API
            if (!rawResponse.ok) {
                const errText = await rawResponse.text();
                return next(ApiError.badGateway(
                    `AI service error: ${rawResponse.status} ${rawResponse.statusText} - ${errText}`
                ));
            }

            // Parse AI response and get market links from parsed ideas
            const responseData = await rawResponse.json();
            const content = responseData.choices?.[0]?.message?.content;
            if (!content) {
                return next(ApiError.internal('Unexpected AI response format'));
            }

            const stripped = content.replace(/<think>[\s\S]*?<\/think>/g, "");
            const gifts = JSON.parse(stripped).gifts;

            const productPromises = gifts.map(gift =>
                getProductInfo(gift, priceRange[0], priceRange[1], isAdult)
            );
            const data = await Promise.all(productPromises);

            return res.json(data);
        } catch (err) {
            return next(ApiError.internal('Failed to generate gift ideas'));
        }
    }
}

export default new IdeasController();
