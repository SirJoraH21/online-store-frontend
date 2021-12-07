const Router = require('express');
const userController = require('../controllers/userController');
const authMiddlware = require('../middlware/authMiddlware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddlware, userController.check);

module.exports = router;
