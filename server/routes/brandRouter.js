const Router = require('express');
const brandController = require('../controllers/brandController');
const checkRole = require('../middlware/checkRoleMiddlware');

const router = new Router();

router.post('/', checkRole('admin'), brandController.create);
router.get('/', brandController.getAll);
router.delete('/:id', checkRole('admin'), brandController.delete);

module.exports = router;
