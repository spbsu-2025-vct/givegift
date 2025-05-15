import { Router } from 'express'
import interestRouter from './interestRouter.js'
import { adminJs, adminRouter } from './adminRouter.js'

const router = Router()

router.use('/interest', interestRouter)

router.use(adminJs.options.rootPath, adminRouter)

export default router
