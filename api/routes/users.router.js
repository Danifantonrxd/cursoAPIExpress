const express = require('express');
const UsersServices = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const path = require("path");
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UsersServices();

router.get('/', async (request, response, next) => {
  try {
    const users = await service.find();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/mojon', (request, response) => {
  //console.log("Nueva Peticion!!");
  response.sendFile(path.join(__dirname + "/index.html"));
});


router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const users = await service.findOne(id);
      response.json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newUser = await service.create(body);
      response.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const user = await service.update(id, body);
      response.json(user);
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
