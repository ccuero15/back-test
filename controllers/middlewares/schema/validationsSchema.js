const Joi = require('joi');

const userSignupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(), // Validación de correo electrónico
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword'); // Asegura que la confirmación coincida con la contraseña

module.exports = { userSignupSchema };


