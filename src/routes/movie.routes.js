const { Router } = require('express');

const checkAuth = require('../utils/checkAuth');
const movieController = require('../controllers/movie.controller');

const router = Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Returns a movie list
 *     tags:
 *       - movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Retrieve movies by title
 *       - in: query
 *         name: genre
 *         schema:
 *           type: integer
 *         description: Retrieve movies by genreId
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Retrieve movies by order (asc or desc)
 *     responses:
 *       200:
 *         description: OK
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
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/', checkAuth, movieController.getAll);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Returns a movie
 *     tags:
 *       - movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The movie ID
 *                 title:
 *                   type: string
 *                   description: The movie title
 *                 image:
 *                   type: string
 *                   description: The movie image
 *                 creationDate:
 *                   type: string
 *                   description: The movie creation date
 *                 qualification:
 *                   type: integer
 *                   description: The movie qualification
 *                 genre:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The movie genre
 *                 characters:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                          description: The name of the movie character
 *                        image:
 *                          type: string
 *                          description: The image of the movie character
 *                        history:
 *                          type: string
 *                          description: The history of the movie character
 *       404:
 *         description: NOT FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/:id', checkAuth, movieController.getOne);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags:
 *       - movies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The movie title
 *               image:
 *                 type: string
 *                 description: The movie image
 *               creationDate:
 *                 type: string
 *                 description: The movie creation date
 *               qualification:
 *                 type: integer
 *                 description: The movie qualification
 *               genreId:
 *                 type: integer
 *                 description: The genre ID of the movie
 *     responses:
 *       201:
 *         description: CREATED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created movie
 *                 title:
 *                   type: string
 *                   description: The title of the created movie
 *                 image:
 *                   type: string
 *                   description: The image of the created movie
 *                 creationDate:
 *                   type: string
 *                   description: The creation date of the created movie
 *                 qualification:
 *                   type: integer
 *                   description: The qualification of the created movie
 *                 genre:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The genre of the created movie
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/', checkAuth, movieController.addOne);

/**
 * @swagger
 * /api/movies:
 *   put:
 *     summary: Update a movie
 *     tags:
 *       - movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the movie
 *               image:
 *                 type: string
 *                 description: The updated image of the movie
 *               creationDate:
 *                 type: string
 *                 description: The updated creation date of the movie
 *               qualification:
 *                 type: integer
 *                 description: The updated qualification of the movie
 *               genreId:
 *                 type: integer
 *                 description: The updated genre ID of the movie
 *     responses:
 *       200:
 *         description: OK
 *         //TODO: finish this
 *       404:
 *         description: NOT FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       403:
 *         description: NOT ALLOWED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                    type: string
 *                    description: Error message
 */
router.put('/:id', checkAuth, movieController.updateOne);

/**
 * @swagger
 * /api/movies:
 *   delete:
 *     summary: Delete a movie
 *     tags:
 *       - movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: DELETED
 *       404:
 *         description: NOT FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       403:
 *         description: NOT ALLOWED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                    type: string
 *                    description: Error message
 */
router.delete('/:id', checkAuth, movieController.deleteOne);

module.exports = router;
