import { Router } from 'express'
import interestsController from '../controllers/interestsController.js'
const router = Router()

router.get('/all', interestsController.get_all_interests)

export default router
