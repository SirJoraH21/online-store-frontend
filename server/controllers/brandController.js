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

  async delete(req, res, next) {
    const { id } = req.params;

    if (!id) res.json({ message: 'id query parameter is missed' });

    const brand = await Brand.findOne({ where: { id } });
    if (!brand) next(ApiError.badRequest(`Brand with id:${id} didn't exist`));

    await brand.destroy();
    return res.status(200).json({ message: `Brand ${brand.name} was deleted` });
  }
}

module.exports = new BrandContoller();
