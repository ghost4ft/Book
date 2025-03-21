import express from 'express'
import bookController from '../controllers/bookController.js'
import protectedRoute from '../middlewares/auth.js'

const router = express.Router()
router.post('/', protectedRoute,bookController.newBook)
router.get('/', protectedRoute,bookController.showBooks)
router.delete('/:id', protectedRoute,bookController.deleteBook)
router.put('/:id', protectedRoute,bookController.updateBook)
router.put('/user', protectedRoute,bookController.userBook)

export default router