require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');

// Crear instancia de la aplicación Express
const app = express();

// Configurar middlewares
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);

// // Ejemplo de rutas protegidas
// app.get('/api/user/dashboard', authMiddleware, (req, res) => {
//   res.json({ message: 'Bienvenido al dashboard de usuario' });
// });

// app.get('/api/admin/dashboard', authMiddleware, adminMiddleware, (req, res) => {
//   res.json({ message: 'Bienvenido al dashboard de administrador' });
// });

// Conectar a la base de datos y manejar errores
db.getConnection()
  .then(connection => {
    console.log('Conectado a la base de datos MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Iniciar el servidor
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});