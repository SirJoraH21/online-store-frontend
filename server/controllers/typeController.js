const { Type } = require('../models/models');
const ApiError = require('../error/apiError');

class TypeContoller {
  async create(req, res, next) {
    const { name } = req.body;

    const isTypeExist = await Type.findOne({ where: { name } });
    if (isTypeExist) next(ApiError.badRequest('Such type already exist'));

    const type = await Type.create({ name });

    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();

    return res.json(types);
  }
}

module.exports = new TypeContoller();
