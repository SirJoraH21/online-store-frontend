const Router = require('express');
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middlware/checkRoleMiddlware');

const router = new Router();

router.post('/', checkRole('admin'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;
