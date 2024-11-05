// routes/authRoutes.js
const express = require('express');
const { userSignupSchema } = require('../controllers/middlewares/schema/validationsSchema');
const validate = require('../controllers/middlewares/validate/validate');
const { signup, login, refreshToken } = require('../controllers/authController');
const router = express.Router();

// Ruta de registro que usa el middleware de validación
router.post('/signup', validate(userSignupSchema), signup);

module.exports = router;
router.post('/login', login);
router.post('/refresh-token', refreshToken);

module.exports = router;


