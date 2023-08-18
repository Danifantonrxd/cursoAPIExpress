const express = require('express');
const passport = require('passport');
const OrderService = require("../services/orders.service");

const router = express.Router();
const service = new OrderService();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (request, response, next) => {
    try {
      const user = request.user;
      const orders = await service.findByUser(user.sub);
      response.json(orders)
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
