import { Router } from 'express'
import interestsRouter from './interestsRouter.js'
import ideasRouter from './ideasRouter.js'
import { adminJs, adminRouter } from './adminRouter.js'

const router = Router()

router.use('/interests', interestsRouter)
router.use('/ideas', ideasRouter)

router.use(adminJs.options.rootPath, adminRouter)

export default router
