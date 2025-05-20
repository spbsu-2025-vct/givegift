
import interestsController from '../controllers/interestsController.mjs'
import { Interests } from '../models/models.mjs'
import ApiError from '../error/ApiError.mjs'

jest.mock('../models/models.mjs', () => ({
    Interests: {
        findAll: jest.fn()
    }
}))

describe('getAllInterests', () => {
    let req, res, next

    beforeEach(() => {
        req = {}
        res = {
            json: jest.fn()
        }
        next = jest.fn()
    })

    it('should return a list of interest names on success', async () => {
        Interests.findAll.mockResolvedValue([
            { name: 'sports' },
            { name: 'music' },
            { name: 'travel' }
        ])

        await interestsController.get_all_interests(req, res, next)

        expect(Interests.findAll).toHaveBeenCalledWith({ attributes: ['name'], raw: true });
        expect(res.json).toHaveBeenCalledWith(['sports', 'music', 'travel'])
        expect(next).not.toHaveBeenCalled()
    })

    it('should call next with an ApiError when findAll throws', async () => {
        const dbError = new Error('database down')
        Interests.findAll.mockRejectedValue(dbError)

        await interestsController.get_all_interests(req, res, next)

        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalledTimes(1)
        const errArg = next.mock.calls[0][0]
        expect(errArg).toBeInstanceOf(ApiError)
        expect(errArg.message).toBe('Failed to fetch interests')
        expect(errArg.status).toBe(500)
    })
})

