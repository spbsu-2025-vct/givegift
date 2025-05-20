import favouritesController from '../controllers/favouritesController.mjs'
import { Products, Favourites } from '../models/models.mjs'
import ApiError from '../error/ApiError.mjs'

jest.mock('../models/models.mjs', () => ({
    Products: {
        findOrCreate: jest.fn(),
        findOne: jest.fn()
    },
    Favourites: {
        findOrCreate: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
}))

describe('favouritesController', () => {
    let req, res, next

    beforeEach(() => {
        req = { body: {}, query: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next = jest.fn()
    })

    describe('addFavourite', () => {
        const validBody = {
            userID: 1,
            market_link: 'link1',
            title: 'Title',
            img_link: 'Img',
            tag: 'tag1'
        }

        it('should reject invalid payloads', async () => {
            req.body = { userID: 1 }

            await favouritesController.addFavourite(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Invalid payload/)
        })

        it('should add favourite and return 201 on success', async () => {
            req.body = validBody
            Products.findOrCreate.mockResolvedValue([{ id: 10 }, true])
            const fakeFav = { id: 100, tag: 'tag1' }
            Favourites.findOrCreate.mockResolvedValue([fakeFav, true])

            await favouritesController.addFavourite(req, res, next)

            expect(Products.findOrCreate).toHaveBeenCalledWith({
                where: { market_link: 'link1' },
                defaults: { title: 'Title', img_link: 'Img' }
            })
            expect(Favourites.findOrCreate).toHaveBeenCalledWith({
                where: { user_id: 1, product_id: 10 },
                defaults: { tag: 'tag1' }
            })
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(fakeFav)
            expect(next).not.toHaveBeenCalled()
        })

        it('should return 400 if favourite already exists', async () => {
            req.body = validBody
            Products.findOrCreate.mockResolvedValue([{ id: 10 }, true])
            Favourites.findOrCreate.mockResolvedValue([{}, false])

            await favouritesController.addFavourite(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/already in your favourites/)
        })

        it('should forward internal error on exception', async () => {
            req.body = validBody
            Products.findOrCreate.mockRejectedValue(new Error('DB fail'))

            await favouritesController.addFavourite(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(500)
        })
    })

    describe('removeFavourite', () => {
        it('should reject missing required fields', async () => {
            req.query = { userID: 1 }

            await favouritesController.removeFavourite(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Missing required fields/)
        })

        it('should return 400 if product not found', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            Products.findOne.mockResolvedValue(null)

            await favouritesController.removeFavourite(req, res, next)

            expect(Products.findOne).toHaveBeenCalledWith({ where: { market_link: 'link1' } })
            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Product not found/)
        })

        it('should return 400 if favourite entry not found', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            const fakeProduct = { id: 10 }
            Products.findOne.mockResolvedValue(fakeProduct)
            Favourites.destroy.mockResolvedValue(0)

            await favouritesController.removeFavourite(req, res, next)

            expect(Favourites.destroy).toHaveBeenCalledWith({ where: { user_id: 1, product_id: 10 } })
            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Favourite entry not found/)
        })

        it('should remove favourite and return success message', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            const fakeProduct = { id: 10 }
            Products.findOne.mockResolvedValue(fakeProduct)
            Favourites.destroy.mockResolvedValue(1)

            await favouritesController.removeFavourite(req, res, next)

            expect(res.json).toHaveBeenCalledWith({ message: 'Removed from favourites' })
            expect(next).not.toHaveBeenCalled()
        })

        it('should forward internal error on exception', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            Products.findOne.mockRejectedValue(new Error('DB fail'))

            await favouritesController.removeFavourite(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(500)
        })
    })

    describe('editFavouriteTag', () => {
        it('should reject missing required fields', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            req.body = {}

            await favouritesController.editFavouriteTag(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Missing at least one of the required fields/)
        })

        it('should return 400 if product not found', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            req.body = { tag: 'newTag' }
            Products.findOne.mockResolvedValue(null)

            await favouritesController.editFavouriteTag(req, res, next)

            expect(Products.findOne).toHaveBeenCalledWith({ where: { market_link: 'link1' } })
            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Product not found/)
        })

        it('should return 400 if favourite entry not found', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            req.body = { tag: 'newTag' }
            const fakeProduct = { id: 10 }
            Products.findOne.mockResolvedValue(fakeProduct)
            Favourites.update.mockResolvedValue([0])

            await favouritesController.editFavouriteTag(req, res, next)

            expect(Favourites.update).toHaveBeenCalledWith(
                { tag: 'newTag' },
                { where: { user_id: 1, product_id: 10 } }
            )
            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Favourite entry not found/)
        })

        it('should update tag and return success message', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            req.body = { tag: 'newTag' }
            const fakeProduct = { id: 10 }
            Products.findOne.mockResolvedValue(fakeProduct)
            Favourites.update.mockResolvedValue([1])

            await favouritesController.editFavouriteTag(req, res, next)

            expect(res.json).toHaveBeenCalledWith({ message: 'Tag updated' })
            expect(next).not.toHaveBeenCalled()
        })

        it('should forward internal error on exception', async () => {
            req.query = { userID: 1, market_link: 'link1' }
            req.body = { tag: 'newTag' }
            Products.findOne.mockResolvedValue({ id: 10 })
            Favourites.update.mockRejectedValue(new Error('DB fail'))

            await favouritesController.editFavouriteTag(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(500)
        })
    })

    describe('fetchUserFavourites', () => {
        it('should reject missing userID', async () => {
            req.query = {}

            await favouritesController.fetchUserFavourites(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(400)
            expect(err.message).toMatch(/Missing required field: userID/)
        })

        it('should fetch and return favourites on success', async () => {
            req.query = { userID: 1 }
            const favs = [
                { user_id: 1, tag: 'tag1', product: { market_link: 'link1', title: 'Title1', img_link: 'Img1' } },
                { user_id: 1, tag: 'tag2', product: { market_link: 'link2', title: 'Title2', img_link: 'Img2' } }
            ]
            Favourites.findAll.mockResolvedValue(favs)

            await favouritesController.fetchUserFavourites(req, res, next)

            expect(Favourites.findAll).toHaveBeenCalledWith({
                where: { user_id: 1 },
                include: [{
                    model: Products,
                    attributes: ['market_link', 'title', 'img_link']
                }]
            })
            expect(res.json).toHaveBeenCalledWith([
                { userID: 1, tag: 'tag1', market_link: 'link1', title: 'Title1', img_link: 'Img1' },
                { userID: 1, tag: 'tag2', market_link: 'link2', title: 'Title2', img_link: 'Img2' }
            ])
            expect(next).not.toHaveBeenCalled()
        })

        it('should forward internal error on exception', async () => {
            req.query = { userID: 1 }
            Favourites.findAll.mockRejectedValue(new Error('DB fail'))

            await favouritesController.fetchUserFavourites(req, res, next)

            expect(next).toHaveBeenCalledTimes(1)
            const err = next.mock.calls[0][0]
            expect(err).toBeInstanceOf(ApiError)
            expect(err.status).toBe(500)
        })
    })
})
