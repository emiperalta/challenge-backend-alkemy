const { Router } = require('express');

const checkAuth = require('../utils/checkAuth');
const movieController = require('../controllers/movie.controller');

const router = Router();

router.get('/', checkAuth, movieController.getAll);
router.get('/:id', checkAuth, movieController.getOne);
router.post('/', checkAuth, movieController.addOne);
router.put('/:id', checkAuth, movieController.updateOne);
router.delete('/:id', checkAuth, movieController.deleteOne);

module.exports = router;
