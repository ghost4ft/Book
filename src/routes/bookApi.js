import express from 'express'
import bookController from '../controllers/bookController.js'
import protectedRoute from '../middlewares/auth.js'

const router = express.Router()

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Application Security"
 *               caption:
 *                 type: string
 *                 example: "Owasp Top 10"
 *               image:
 *                 type: string
 *                 example: "https://api.dicebear.com/7.x/avataaars/svg?seed=owasp"
 *               rating:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', protectedRoute, bookController.newBook)

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Number of books per page
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/', protectedRoute, bookController.showBooks)

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', protectedRoute, bookController.deleteBook)

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               caption:
 *                 type: string
 *               image:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', protectedRoute, bookController.updateBook)

/**
 * @swagger
 * /api/books/user:
 *   put:
 *     summary: Update user's book
 *     tags: [Books]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               caption:
 *                 type: string
 *               image:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: User's book updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put('/user', protectedRoute, bookController.userBook)

export default router