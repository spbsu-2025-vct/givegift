import { Router } from 'express'
import interestsRouter from './interestsRouter.js'
import ideasRouter from './ideasRouter.js'
import favouritesRouter from './favouritesRouter.js'
import { adminJs, adminRouter } from './adminRouter.js'

const router = Router()

router.use('/interests', interestsRouter)
router.use('/ideas', ideasRouter)
router.use('/favourites', favouritesRouter)

router.use(adminJs.options.rootPath, adminRouter)

export default router
