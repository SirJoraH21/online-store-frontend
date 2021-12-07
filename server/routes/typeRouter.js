const Router = require('express');
const typeController = require('../controllers/typeController');
const checkRole = require('../middlware/checkRoleMiddlware');

const router = new Router();

router.post('/', checkRole('admin'), typeController.create);
router.get('/', typeController.getAll);
router.delete('/:id', checkRole('admin'), typeController.delete);

module.exports = router;
