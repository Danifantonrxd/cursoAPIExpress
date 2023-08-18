const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const CategoriesServices = require('../services/categories.service');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoriesServices();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer', 'seller'),
  async (request, response) => {
    const categories = await service.find();
    response.json(categories);
  },
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer', 'seller'),
  validatorHandler(getCategorySchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const category = await service.findOne(id);
      response.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newCategoy = await service.create(body);
      response.status(201).json(newCategoy);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const category = await service.update(id, body);
      response.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const res = await service.delete(id);
      response.json(res);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
