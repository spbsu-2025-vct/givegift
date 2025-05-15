import { Interest } from '../models/models.js'

class InterestController {
    async get_all_interests(_req, res) {
        const interests = await Interest.findAll({ attributes: ['name'], raw: true })
        const names = interests.map(i => i.name)
        res.json(names)
    }
}

export default new InterestController() 