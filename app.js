const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const errorHandler = require('./controllers/middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true, methods:['*'] }));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
