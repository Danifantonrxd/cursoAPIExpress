const express = require('express');
const passport = require('passport');
const AuthService = require("../services/auth.service");

const router = express.Router();
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (request, response, next) => {
    try {
      const user = request.user;
      const sign = service.signToken(user);
      response.json(sign);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/recovery',
  async (request, response, next) => {
    try {
      const { email } = request.body;
      const rta = await service.sendRecovery(email);
      response.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/change-password',
  async (request, response, next) => {
    try {
      const { token, newPassword } = request.body;
      const rta = await service.changePassword(token, newPassword);
      response.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
