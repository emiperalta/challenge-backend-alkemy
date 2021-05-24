const { Router } = require('express');

const userController = require('../controllers/user.controller');

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User logs in
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user email.
 *               password:
 *                 type: string
 *                 description: The user password.
 *     responses:
 *       200:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: User token.
 *       400:
 *         description: BAD REQUEST.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registers
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user username
 *               email:
 *                 type: string
 *                 description: The user email
 *               password:
 *                 type: string
 *                 description: The user password
 *     responses:
 *       201:
 *         description: CREATED.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: New user username
 *                 email:
 *                   type: string
 *                   description: New user email
 *       400:
 *         description: BAD REQUEST.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
router.post('/register', userController.register);

module.exports = router;
