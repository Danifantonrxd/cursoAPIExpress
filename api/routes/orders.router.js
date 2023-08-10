const express = require('express');

const OrderService = require('../services/orders.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
	getOrderSchema,
	createOrderSchema,
  addItemSchema
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (request, response) => {
  const orders = await service.find();
  response.json(orders);
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
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

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newProduct = await service.create(body);
      response.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newItem = await service.addItem(body);
      response.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
