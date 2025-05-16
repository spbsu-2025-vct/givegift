import { generateSystemPrompt, generateUserPrompt } from "../utils/prompts.js";
import FireworksAIService from "../API/FireworksAIService.js";
import { getProductInfo } from "../utils/WBParser.js";
import ApiError from '../error/ApiError.js';

class IdeasController {
    async generateIdeas(req, res, next) {
        const { price_range: priceRange, is_adult: isAdult, interests } = req.body;

        // Validate input
        if (!Array.isArray(priceRange) || priceRange.length !== 2 ||
            typeof isAdult !== 'boolean' || !Array.isArray(interests)
        ) {
            return next(ApiError.badRequest(
                'Invalid payload: price_range (array of two numbers), is_adult (boolean), and interests (array) are required'
            ));
        }

        try {
            // // Call AI service
            // const rawResponse = await FireworksAIService.createChatCompletion(
            //     generateSystemPrompt(),
            //     generateUserPrompt(interests)
            // );

            // // Handle non-OK status from AI API
            // if (!rawResponse.ok) {
            //     const errText = await rawResponse.text();
            //     return next(ApiError.badGateway(
            //         `AI service error: ${rawResponse.status} ${rawResponse.statusText} - ${errText}`
            //     ));
            // }

            // // Parse AI response and get market links from parsed ideas
            // const responseData = await rawResponse.json();
            // const content = responseData.choices?.[0]?.message?.content;
            // if (!content) {
            //     return next(ApiError.internal('Unexpected AI response format'));
            // }

            // const stripped = content.replace(/<think>[\s\S]*?<\/think>/g, "");
            // const gifts = JSON.parse(stripped).gifts;

            // const productPromises = gifts.map(gift =>
            //     getProductInfo(gift, priceRange[0], priceRange[1], isAdult)
            // );
            // const data = await Promise.all(productPromises);

            // TODO: замокал для экономии
            const data = [
                {
                    market_link: 'https://www.wildberries.ru/catalog/258805225/detail.aspx',
                    title: 'Бюро расследования судеб',
                    img_link: 'https://basket-16.wbbasket.ru/vol2588/part258805/258805225/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/259184851/detail.aspx',
                    title: 'Набор для вышивания гладью с пяльцами',
                    img_link: 'https://basket-16.wbbasket.ru/vol2591/part259184/259184851/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/374256822/detail.aspx',
                    title: 'Футболка однотонная с известной цитатой Путина',
                    img_link: 'https://basket-19.wbbasket.ru/vol3742/part374256/374256822/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/214028865/detail.aspx',
                    title: 'История искусства как история духа сборник',
                    img_link: 'https://basket-14.wbbasket.ru/vol2140/part214028/214028865/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/176041639/detail.aspx',
                    title: 'Подушка декоративная для дома с цветами 40х40 см',
                    img_link: 'https://basket-12.wbbasket.ru/vol1760/part176041/176041639/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/213063284/detail.aspx',
                    title: 'Органайзер для хранения ниток',
                    img_link: 'https://basket-14.wbbasket.ru/vol2130/part213063/213063284/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/175736247/detail.aspx',
                    title: 'Семейный фотоальбом 10х15',
                    img_link: 'https://basket-12.wbbasket.ru/vol1757/part175736/175736247/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/364231919/detail.aspx',
                    title: 'Чернов Календарь исторических дат России 6-11 класс',
                    img_link: 'https://basket-19.wbbasket.ru/vol3642/part364231/364231919/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/341161920/detail.aspx',
                    title: 'Ночник-светильник рыбки с пультом',
                    img_link: 'https://basket-19.wbbasket.ru/vol3411/part341161/341161920/images/big/1.webp'
                },
                {
                    market_link: 'https://www.wildberries.ru/catalog/4332552/detail.aspx',
                    title: 'Головоломки со словами игра в слова для развития речи детей',
                    img_link: 'https://basket-01.wbbasket.ru/vol43/part4332/4332552/images/big/1.webp'
                }
            ]

            return res.json(data);

        } catch (err) {
            console.error(err);
            return next(ApiError.internal('Failed to generate gift ideas'));
        }
    }
}

export default new IdeasController();
