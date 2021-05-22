const { Router } = require('express');

const checkAuth = require('../utils/checkAuth');
const characterController = require('../controllers/character.controller');

const router = Router();

router.get('/', checkAuth, characterController.getAll);
router.get('/:id', checkAuth, characterController.getOne);
router.post('/', checkAuth, characterController.addOne);
router.put('/:id', checkAuth, characterController.updateOne);
router.delete('/:id', checkAuth, characterController.deleteOne);

module.exports = router;
