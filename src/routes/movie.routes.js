const { Router } = require('express');

const checkAuth = require('../utils/checkAuth');
const movieController = require('../controllers/movie.controller');

const router = Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Returns a movie list
 *     security:
 *       bearerAuth:
 *         in: header
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     responses:
 *       200:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The movie title
 *                   image:
 *                     type: string
 *                     description: The movie image
 *                   creationDate:
 *                     type: string
 *                     description: The movie creation date
 */
router.get('/', checkAuth, movieController.getAll);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Returns a movie
 */
router.get('/:id', checkAuth, movieController.getOne);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 */
router.post('/', checkAuth, movieController.addOne);

/**
 * @swagger
 * /api/movies:
 *   put:
 *     summary: Update a movie
 */
router.put('/:id', checkAuth, movieController.updateOne);

/**
 * @swagger
 * /api/movies:
 *   delete:
 *     summary: Delete a movie
 */
router.delete('/:id', checkAuth, movieController.deleteOne);

module.exports = router;
