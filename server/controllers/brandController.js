const { Brand } = require('../models/models');
const ApiError = require('../error/apiError');

class BrandContoller {
  async create(req, res, next) {
    const { name } = req.body;

    const isBrandExist = await Brand.findOne({ where: { name } });
    if (isBrandExist) next(ApiError.badRequest('Such brand already exist'));

    const brand = await Brand.create({ name });

    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();

    return res.json(brands);
  }
}

module.exports = new BrandContoller();
