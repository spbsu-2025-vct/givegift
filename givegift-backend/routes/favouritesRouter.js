import { Router } from 'express'
import favouritesController from '../controllers/favouritesController.js'
const router = Router()

router.post('/add', favouritesController.addFavourite)
router.delete('/remove', favouritesController.removeFavourite)
router.patch('/edit_tag', favouritesController.editFavouriteTag)
router.get('/fetch', favouritesController.fetchUserFavourites)
export default router
