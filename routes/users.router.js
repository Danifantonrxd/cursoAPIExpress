const express = require('express');
const UsersServices = require('../services/users.service');

const router = express.Router();
const service = new UsersServices();

router.get('/', async (request, response) => {
  const users = await service.find();
  response.json(users);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const users = await service.findOne(id);
  response.json(users);
});

router.post('/', async (request, response) => {
  const body = request.body;
  const newUser = await service.create(body);
  response.status(201).json(newUser);
});

router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const user = await service.update(id, body);
    response.json(user);
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
  }
});

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
