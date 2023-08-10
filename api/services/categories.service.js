const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class CategoriesServices {

  constructor(){}

  async create(data) {
    const newCategoy = await models.Category.create(data);
    return newCategoy;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category){
      throw boom.notFound("user not found");
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const response = await category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoriesServices;
