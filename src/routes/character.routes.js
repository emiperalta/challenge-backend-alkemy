const { Router } = require('express');

const checkAuth = require('../utils/checkAuth');
const characterController = require('../controllers/character.controller');

const router = Router();

/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Returns a list of characters
 *     tags:
 *       - characters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Retrieve characters by  name
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Retrieve characters by age
 *       - in: query
 *         name: movies
 *         schema:
 *           type: string
 *         description: Retrieve characters by movieId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [name, image]
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The character's name
 *                   image:
 *                     type: string
 *                     description: The image of the character
 *                   movie:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           description: The character's movie title
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
router.get('/', checkAuth, characterController.getAll);

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     summary: Returns a character
 *     tags:
 *       - characters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The character ID
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
 *                   description: The character ID
 *                 name:
 *                   type: string
 *                   description: The character's name
 *                 image:
 *                   type: string
 *                   description: The image of the character
 *                 age:
 *                   type: integer
 *                   description: The age of the character
 *                 weight:
 *                   type: number
 *                   format: double
 *                   description: The weight of the character
 *                 history:
 *                   type: string
 *                   description: The character's story
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The title of the movie
 *                       image:
 *                         type: string
 *                         description: The image of the movie
 *                       creationDate:
 *                         type: string
 *                         description: The date the movie was created
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
router.get('/:id', checkAuth, characterController.getOne);

/**
 * @swagger
 * /api/characters:
 *   post:
 *     summary: Create a new character
 *     tags:
 *       - characters
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The character's name
 *               image:
 *                 type: string
 *                 description: The image of the character
 *               age:
 *                 type: string
 *                 description: The age of the character
 *               weight:
 *                 type: number
 *                 format: double
 *                 description: The weight of the character
 *               history:
 *                 type: string
 *                 description: The character's story
 *               title:
 *                 type: string
 *                 description: The movie where the character acts
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
 *                   description: The character ID
 *                 name:
 *                   type: string
 *                   description: The character's name
 *                 image:
 *                   type: string
 *                   description: The image of the character
 *                 age:
 *                   type: integer
 *                   description: The age of the character
 *                 weight:
 *                   type: number
 *                   format: double
 *                   description: The weight of the character
 *                 history:
 *                   type: string
 *                   description: The character's story
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
router.post('/', checkAuth, characterController.addOne);

/**
 * @swagger
 * /api/characters/{id}:
 *   put:
 *     summary: Update a character
 *     tags:
 *       - characters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The character ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 description: The character's name
 *               image:
 *                 type: string
 *                 description: The image of the character
 *               age:
 *                 type: integer
 *                 description: The age of the character
 *               weight:
 *                 type: number
 *                 format: double
 *                 description: The weight of the character
 *               history:
 *                 type: string
 *                 description: The character's story
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The character's name
 *                 image:
 *                   type: string
 *                   description: The image of the character
 *                 age:
 *                   type: integer
 *                   description: The age of the character
 *                 weight:
 *                   type: number
 *                   format: double
 *                   description: The weight of the character
 *                 history:
 *                   type: string
 *                   description: The character's story
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
router.put('/:id', checkAuth, characterController.updateOne);

/**
 * @swagger
 * /api/characters/{id}:
 *   delete:
 *     summary: Delete a character
 *     tags:
 *       - characters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The character ID
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
router.delete('/:id', checkAuth, characterController.deleteOne);

module.exports = router;
