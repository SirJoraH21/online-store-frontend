const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => jwt.sign(
  { id, email, role },
  process.env.SECRET_KEY,
  { expiresIn: '8h' },
);

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) next(ApiError.badRequest('Incorrect email or password'));

    const candidate = await User.findOne({ where: { email } });
    if (candidate) next(ApiError.badRequest('User with such email already registred'));

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) next(ApiError.badRequest('User with this email did not exist'));

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) next(ApiError.badRequest('Wrong password'));
    const token = generateJwt(user.id, email, user.role);

    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}
module.exports = new UserController();
