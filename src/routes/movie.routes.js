const { Router } = require('express');

const movieController = require('../controllers/movie.controller');

const router = Router();

router.get('/', movieController.getAll);
router.get('/:id', movieController.getOne);
router.post('/', movieController.addOne);
router.put('/:id', movieController.updateOne);
router.delete('/:id', movieController.deleteOne);

module.exports = router;
