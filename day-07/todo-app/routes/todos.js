const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', todoController.getAll);
router.post('/', todoController.create);
router.get('/:id', todoController.getOne);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.remove);

module.exports = router;
