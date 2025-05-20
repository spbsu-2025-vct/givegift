import { Products, Favourites } from '../models/models.mjs'
import ApiError from '../error/ApiError.mjs'

class FavouritesController {
    async addFavourite(req, res, next) {
        const { userID, market_link, title, img_link, tag } = req.body
        if (!userID || !market_link || !title || !img_link) {
            return next(ApiError.badRequest('Invalid payload: missing at least one of the required fields: userID, market_link, title, img_link'))
        }

        try {
            // ensure product exists or create it
            const [product] = await Products.findOrCreate({
                where: { market_link },
                defaults: { title, img_link }
            })

            // prevent duplicates
            const [fav, created] = await Favourites.findOrCreate({
                where: {
                    user_id: userID,
                    product_id: product.id
                },
                defaults: { tag }
            })

            if (!created) {
                return next(ApiError.badRequest('This product is already in your favourites'))
            }

            return res.status(201).json(fav)
        } catch (err) {
            return next(ApiError.internal('Unable to add to favourites'))
        }
    }

    async removeFavourite(req, res, next) {
        const { userID, market_link } = req.query

        if (!userID || !market_link) {
            return next(ApiError.badRequest('Missing required fields: userID or market_link'))
        }

        try {
            const product = await Products.findOne({ where: { market_link } })
            if (!product) {
                return next(ApiError.badRequest('Product not found'))
            }

            const deletedCount = await Favourites.destroy({
                where: {
                    user_id: userID,
                    product_id: product.id
                }
            })

            if (!deletedCount) {
                return next(ApiError.badRequest('Favourite entry not found'))
            }

            return res.json({ message: 'Removed from favourites' })
        } catch (err) {
            return next(ApiError.internal('Unable to remove from favourites'))
        }
    }

    async editFavouriteTag(req, res, next) {
        const { userID, market_link } = req.query
        const { tag } = req.body

        if (!userID || !market_link || !tag) {
            return next(ApiError.badRequest('Missing at least one of the required fields: userID, market_link, title, img_link, tag'))
        }

        try {
            const product = await Products.findOne({ where: { market_link: market_link } })
            if (!product) {
                return next(ApiError.badRequest('Product not found'))
            }

            const [updatedRows] = await Favourites.update(
                { tag: tag },
                {
                    where: {
                        user_id: userID,
                        product_id: product.id
                    }
                }
            )

            if (!updatedRows) {
                return next(ApiError.badRequest('Favourite entry not found'))
            }

            return res.json({ message: 'Tag updated' })
        } catch (err) {
            return next(ApiError.internal('Unable to update favourite tag'))
        }
    }

    async fetchUserFavourites(req, res, next) {
        const userID = req.query.userID
        if (!userID) {
            return next(ApiError.badRequest('Missing required field: userID'))
        }

        try {
            const favs = await Favourites.findAll({
                where: { user_id: userID },
                include: [{
                    model: Products,
                    attributes: ['market_link', 'title', 'img_link']
                }]
            })

            const result = favs.map(f => ({
                userID: f.user_id,
                tag: f.tag,
                market_link: f.product.market_link,
                title: f.product.title,
                img_link: f.product.img_link
            }))

            return res.json(result)
        } catch (err) {
            return next(ApiError.internal('Unable to fetch favourites'))
        }
    }
}

export default new FavouritesController()
