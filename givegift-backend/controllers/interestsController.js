import { Interests } from '../models/models.js'
import ApiError from '../error/ApiError.js'

class InterestController {
    async get_all_interests(_req, res, next) {
        try {
            const interests = await Interests.findAll({
                attributes: ['name'],
                raw: true
            })

            const names = interests.map(i => i.name)
            return res.json(names)
        } catch (err) {
            console.error(err)
            return next(ApiError.internal('Failed to fetch interests'))
        }
    }
}

export default new InterestController()
