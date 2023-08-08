const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
//const pool = require("../libs/postgres.pool");
const sequelize = require("../libs/sequelize");

class ProductsServices {

  constructor(){
    this.products = [];
    this.generate();

    /* this.pool = pool;
    this.pool.on("error", (err) => {console.error(err)}) */;
  }

  generate(size = 10){
    const limit = size;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        product_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create({ name, price, image, isBlock }) {
    const product = {
      id: faker.string.uuid(),
      name,
      price,
      image,
      isBlock
    };

    //const query = `INSERT INTO tasks (title, completed) VALUES ('${name}', ${isBlock})`;
    //const response = await this.pool.query(query);

    this.products.push(product);
    return product;
  };

  async find() {
    /* const query = "SELECT * FROM tasks";
    const response = await this.pool.query(query);
    return response.rows; */

    const query = "SELECT * FROM tasks";
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const product = this.products.find(item => item.product_id === id);

    if (!product) {
      throw boom.notFound("Product not found");
    }

    if (product.isBlock) {
      throw boom.conflict("Product is block");
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.product_id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.product_id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");;
    }

    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsServices;
