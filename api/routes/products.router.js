const express = require('express');
const ProductsServices = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsServices();

//----------- Products --------------//
router.get('/', async (request, response) => {
  const products = await service.find();
  response.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, "params"),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const product = await service.findOne(id);
      response.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, "body"),
  async (request, response) => {
    const body = request.body;
    const newProduct = await service.create(body);
    response.status(201).json(newProduct);
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const product = await service.update(id, body);
      response.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const res = await service.delete(id);
    response.json(res);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
