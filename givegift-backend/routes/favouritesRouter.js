import { Router } from 'express'
import favouritesController from '../controllers/favouritesController.js'
const router = Router()

router.post('/add', favouritesController.addFavourite)
router.post('/remove', favouritesController.removeFavourite)
router.post('/edit_tag', favouritesController.editFavouriteTag)
router.post('/fetch', favouritesController.fetchUserFavourites) // TODO: подумай над тем, чтобы оно стало get
export default router
