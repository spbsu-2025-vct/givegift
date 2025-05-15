const Router = require('express')
const router = new Router()

const interestRouter = require('./interestRouter')

router.use('/interest', interestRouter)

module.exports = router