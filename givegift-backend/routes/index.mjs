import { Router } from 'express'
import interestsRouter from './interestsRouter.mjs'
import ideasRouter from './ideasRouter.mjs'
import favouritesRouter from './favouritesRouter.mjs'
import { adminJs, adminRouter } from './adminRouter.mjs'

const router = Router()

router.use('/interests', interestsRouter)
router.use('/ideas', ideasRouter)
router.use('/favourites', favouritesRouter)

router.use(adminJs.options.rootPath, adminRouter)

export default router
