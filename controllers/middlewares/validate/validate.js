// middlewares/validate.js
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            // Formatea los errores para devolverlos en un array
            const errorDetails = error.details.map(err => err.message);
            return res.status(400).json({ errors: errorDetails });
        }
        next();
    };
};

module.exports = validate;