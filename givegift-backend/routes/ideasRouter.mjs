import { Router } from 'express'
import ideasController from '../controllers/ideasController.mjs'
const router = Router()

router.post('/generate', ideasController.generateIdeas)

export default router
