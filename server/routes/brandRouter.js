const Router = require('express');
const brandController = require('../controllers/brandController');
const checkRole = require('../middlware/checkRoleMiddlware');

const router = new Router();

router.post('/', checkRole('admin'), brandController.create);
router.get('/', brandController.getAll);

module.exports = router;
