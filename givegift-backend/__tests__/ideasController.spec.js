import ideasController from '../controllers/ideasController.mjs'
import ApiError from '../error/ApiError.mjs'
import FireworksAIService from '../API/FireworksAIService.mjs'
import { getProductInfo } from '../parser/WBParser.mjs'
import { generateSystemPrompt, generateUserPrompt } from '../utils/prompts.mjs'

jest.mock('../API/FireworksAIService.mjs', () => ({
    createChatCompletion: jest.fn()
}))

jest.mock('../parser/WBParser.mjs', () => ({
    getProductInfo: jest.fn()
}))

jest.mock('../utils/prompts.mjs', () => ({
    generateSystemPrompt: jest.fn(),
    generateUserPrompt: jest.fn()
}))

describe('generateIdeas', () => {
    let req, res, next

    beforeEach(() => {
        req = { body: {} }
        res = { json: jest.fn() }
        next = jest.fn()

        generateSystemPrompt.mockReturnValue('SYS_PROMPT')
        generateUserPrompt.mockReturnValue('USER_PROMPT')
    })

    it('should reject invalid payloads', async () => {
        req.body = { price_range: [10], is_adult: 'no', interests: 'halo im not an array!!!' }

        await ideasController.generateIdeas(req, res, next)

        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
        const err = next.mock.calls[0][0]
        expect(err).toBeInstanceOf(ApiError)
        expect(err.status).toBe(400)
        expect(err.message).toMatch(/Invalid payload/)
    })

    it('should forward a badGateway error when AI service returns not ok', async () => {
        req.body = { price_range: [5, 50], is_adult: false, interests: ['tech'] } // valid body

        FireworksAIService.createChatCompletion.mockResolvedValue({
            ok: false,
            status: 502,
            statusText: 'Bad Gateway',
            text: jest.fn().mockResolvedValue('AI down')
        })

        await ideasController.generateIdeas(req, res, next)

        expect(FireworksAIService.createChatCompletion).toHaveBeenCalledWith('SYS_PROMPT', 'USER_PROMPT')
        expect(res.json).not.toHaveBeenCalled()
        const err = next.mock.calls[0][0]
        expect(err).toBeInstanceOf(ApiError)
        expect(err.status).toBe(502)
        expect(err.message).toContain('AI service error: 502 Bad Gateway - AI down')
    })

    it('should forward internal error when AI response has invalid content', async () => {
        req.body = { price_range: [1, 20], is_adult: true, interests: ['music'] } // valid body

        FireworksAIService.createChatCompletion.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}) // empty response which is invalid
        })

        await ideasController.generateIdeas(req, res, next)

        expect(res.json).not.toHaveBeenCalled()
        const err = next.mock.calls[0][0]
        expect(err).toBeInstanceOf(ApiError)
        expect(err.status).toBe(500)
        expect(err.message).toBe('Unexpected AI response format')
    })

    it('should forward internal error when AI hallucinated and returned broken JSON as response', async () => {
        req.body = { price_range: [1, 20], is_adult: true, interests: ['music'] } // valid body

        FireworksAIService.createChatCompletion.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                choices: [{
                    message: { content: '{"incompleteJson": ' } // broken JSON
                }]
            })
        })

        await ideasController.generateIdeas(req, res, next)

        expect(res.json).not.toHaveBeenCalled()
        const err = next.mock.calls[0][0]
        expect(err).toBeInstanceOf(ApiError)
        expect(err.status).toBe(500)
        expect(err.message).toBe('Failed to generate gift ideas')
    })

    it('should return product info array on successful generation', async () => {
        req.body = { price_range: [1000, 20000], is_adult: false, interests: ['art', 'games', 'music'] }

        const fakeContent = JSON.stringify({ gifts: ['g1', 'g2'] })
        FireworksAIService.createChatCompletion.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                choices: [{ message: { content: fakeContent } }]
            })
        })

        // stripThink method in generateIdeas removes <think> tags; our content has none, but it's fine
        getProductInfo
            .mockResolvedValueOnce({ gift: 'g1', url: 'u1' })
            .mockResolvedValueOnce({ gift: 'g2', url: 'u2' })

        await ideasController.generateIdeas(req, res, next)

        expect(getProductInfo).toHaveBeenCalledTimes(2)
        expect(getProductInfo).toHaveBeenNthCalledWith(1, 'g1', 1000, 20000, false)
        expect(getProductInfo).toHaveBeenNthCalledWith(2, 'g2', 1000, 20000, false)
        expect(res.json).toHaveBeenCalledWith([
            { gift: 'g1', url: 'u1' },
            { gift: 'g2', url: 'u2' }
        ])
        expect(next).not.toHaveBeenCalled()
    })
})
