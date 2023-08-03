const express = require('express');
const CategoriesServices = require('../services/categories.service');

const router = express.Router();
const service = new CategoriesServices();

router.get('/', async (request, response) => {
  const categories = await service.find();
  response.json(categories);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const categorie = await service.findOne(id);
  response.json(categorie);
});

router.get('/:categorieId/products/:productId', async (request, response) => {
  const { categorieId, productId } = request.params;
  response.json({
    categorieId,
    productId,
  });
});

router.post('/', async (request, response) => {
  const body = request.body;
  const newCategoy = await service.create(body);
  response.status(201).json(newCategoy);
});

router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const category = await service.update(id, body);
    response.json(category);
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
