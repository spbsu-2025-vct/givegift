import { Product, Favourite } from '../models/models.js'
import ApiError from '../error/ApiError.js'

class FavouritesController {
    async addFavourite(req, res, next) {
        const { userID, market_link, title, img_link, tag } = req.body
        if (!userID || !market_link || !title || !img_link) {
            return next(ApiError.badRequest('Missing at least one of the required fields: userID, market_link, title, img_link'))
        }

        try {
            // ensure product exists or create it
            const [product] = await Product.findOrCreate({
                where: { market_link },
                defaults: { title, img_link }
            })

            // prevent duplicates
            const [fav, created] = await Favourite.findOrCreate({
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
            console.error(err)
            return next(ApiError.internal('Unable to add to favourites'))
        }
    }

    async removeFavourite(req, res, next) {
        const { userID, market_link } = req.body

        if (!userID || !market_link) {
            return next(ApiError.badRequest('Missing required fields: userID or market_link'))
        }

        try {
            const product = await Product.findOne({ where: { market_link } })
            if (!product) {
                return next(ApiError.badRequest('Product not found'))
            }

            const deletedCount = await Favourite.destroy({
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
            console.error(err)
            return next(ApiError.internal('Unable to remove from favourites'))
        }
    }

    async editFavouriteTag(req, res, next) {
        const { favProduct, newTag } = req.body
        if (!favProduct?.userID || !favProduct?.market_link || newTag == null) {
            return next(ApiError.badRequest('Missing required fields: favProduct or newTag'))
        }

        try {
            const product = await Product.findOne({ where: { market_link: favProduct.market_link } })
            if (!product) {
                return next(ApiError.badRequest('Product not found'))
            }

            const [updatedRows] = await Favourite.update(
                { tag: newTag },
                {
                    where: {
                        user_id: favProduct.userID,
                        product_id: product.id
                    }
                }
            )

            if (!updatedRows) {
                return next(ApiError.badRequest('Favourite entry not found'))
            }

            return res.json({ message: 'Tag updated' })
        } catch (err) {
            console.error(err)
            return next(ApiError.internal('Unable to update favourite tag'))
        }
    }

    async fetchUserFavourites(req, res, next) {
        const { userID } = req.body
        if (!userID) {
            return next(ApiError.badRequest('Missing required field: userID'))
        }

        try {
            const favs = await Favourite.findAll({
                where: { user_id: userID },
                include: [{
                    model: Product,
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
            console.error(err)
            return next(ApiError.internal('Unable to fetch favourites'))
        }
    }
}

export default new FavouritesController()
