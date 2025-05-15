import { Router } from 'express'
import ideasController from '../controllers/ideasController.js'
const router = Router()

router.post('/generate', ideasController.generateIdeas)

export default router
