const { Router } = require('express');

const characterController = require('../controllers/character.controller');

const router = Router();

router.get('/', characterController.getAll);
router.get('/:id', characterController.getOne);
router.post('/', characterController.addOne);
router.put('/:id', characterController.updateOne);
router.delete('/:id', characterController.deleteOne);

module.exports = router;
