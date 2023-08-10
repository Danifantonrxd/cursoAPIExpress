const express = require('express');
const CustomersServices = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomersServices();

router.get('/', async (request, response, next) => {
  try {
    const customers = await service.find();
    response.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const customer = await service.findOne(id);
      response.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newCustomer = await service.create(body);
      response.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const customer = await service.update(id, body);
      response.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await service.delete(id);
    response.json(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
