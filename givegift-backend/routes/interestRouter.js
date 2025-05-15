const Router = require('express')
const router = new Router()

router.get('/get_all_interests', async (req, res) => {
    res.json({ message: "all works!" })
})

module.exports = router