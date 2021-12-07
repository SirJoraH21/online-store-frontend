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

  async delete(req, res, next) {
    const { id } = req.params;

    if (!id) res.json({ message: 'id query parameter is missed' });

    const type = await Type.findOne({ where: { id } });
    if (!type) next(ApiError.badRequest(`Type with id:${id} didn't exist`));

    await type.destroy();
    return res.status(200).json({ message: `Type ${type.name} was deleted` });
  }
}

module.exports = new TypeContoller();
