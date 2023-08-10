const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const price = Joi.number();
const categoryId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const priceMin = Joi.number();
const priceMax = Joi.number();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required()
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: priceMax.when('priceMin', {
    is: Joi.number(),
    then: Joi.required()
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
}
