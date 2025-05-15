import { Router } from 'express'
import interestController from '../controllers/interestController.js'
const router = Router()

router.get('/get_all_interests', interestController.get_all_interests)

export default router
