const boom = require("@hapi/boom");
const { Op } = require("sequelize")
const { models } = require("../libs/sequelize");

class ProductsServices {

  constructor(){}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      where: {}
    }
    const { limit, offset } = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if(price){
      options.where.price = price
    }

    const { priceMin, priceMax } = query;
    if(priceMin && priceMax){
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if(!product){
      throw boom.notFound("user not found");
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsServices;
