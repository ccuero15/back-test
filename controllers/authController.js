const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar Token
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Crear y guardar el nuevo usuario
        const user = new User({ username, password, email});
        await user.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error); // Pasamos el error al middleware de manejo de errores
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req);
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(403).json({ message: "Refresh token es requerido" });

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(403).json({ message: "Token inválido" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user._id.toString() !== decoded.id) {
                return res.status(403).json({ message: "Token inválido" });
            }

            const newAccessToken = generateAccessToken(user);
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar el token", error });
    }
};
