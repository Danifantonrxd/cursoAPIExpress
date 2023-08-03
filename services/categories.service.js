const { faker } = require("@faker-js/faker");

class CategoriesServices {

  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(size = 10){
    const limit = size;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        category_id: faker.string.uuid(),
        name: faker.commerce.department(),
        products: []
      })
    }
  }

  async create({ name, products }) {
    const user = {
      category_id: faker.string.uuid(),
      name,
      products
    };
    this.users.push(user);
    return user;
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    return this.categories.find(item => item.category_id === id);
  }

  async update(id, changes) {
    const index = this.categories.find(item => item.category_id === id);
    if(index === -1){
      throw new Error("User not found");
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }

    return this.users[index]
  }

  async delete(id) {
    const index = this.categories.find(item => item.category_id === id);
    if (index === -1) {
      throw new Error("User not found");
    }

    this.categories.splice(index, 1);
    return { id };
  }

}

module.exports = CategoriesServices;
