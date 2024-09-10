require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const config = require('./config/config');
const path = require('path');

// Importing route modules
const authRoutes = require('./routes/authRoutes');
const pantallasRoutes = require('./routes/pantallasRoutes');
const impactosRoutes = require('./routes/impactosRoutes');
const misCampanasRoutes = require('./routes/misCampanasRoutes');
const adminCampanasRoutes = require('./routes/adminCampanasRoutes'); 
const crearCampanaRoutes = require('./routes/crearCampanaRoutes'); 
const adminCrearUsuariosRoutes = require('./routes/adminCrearUsuarioRoutes');
const adminGestionPantallas = require("./routes/adminGestionPantallasRoutes");

// Create Express app instance
const app = express();

// Configure middlewares
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://cero-cinco.vercel.app/', // Allow only requests from this origin
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/pantallas', pantallasRoutes);
app.use('/api/impactos', impactosRoutes);
app.use('/api/campanas', misCampanasRoutes);
app.use('/api/adminCampanas', adminCampanasRoutes);
app.use('/api/crearCampana', crearCampanaRoutes);
app.use('/api/adminCrearUsuarios', adminCrearUsuariosRoutes);
app.use('/api/adminGestionPantallas', adminGestionPantallas);

// Connect to the database and handle errors
db.getConnection()
  .then(connection => {
    console.log('Conectado a la base de datos MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Start the server
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
