const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./route/product');
//const inventoryRoutes = require('./routes/inventoryRoutes');
//const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Rutas principales
//app.use('/auth', authRoutes);
app.use('/productos', productRoutes);
//app.use('/inventarios', inventoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

