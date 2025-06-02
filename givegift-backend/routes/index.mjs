import { Router } from 'express'
import interestsRouter from './interestsRouter.mjs'
import ideasRouter from './ideasRouter.mjs'
import favouritesRouter from './favouritesRouter.mjs'

const router = Router()

router.use('/interests', interestsRouter)
router.use('/ideas', ideasRouter)
router.use('/favourites', favouritesRouter)

export default router
