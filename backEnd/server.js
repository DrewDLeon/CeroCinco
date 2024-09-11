require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const config = require('./config/config');
const path = require('path');
const https = require('https');
const fs = require('fs');

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
  origin: '*', // Allow only requests from this origin
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

// HTTPS options
const httpsOptions = {
  cert: fs.readFileSync('/etc/letsencrypt/live/167-172-145-139.nip.io/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/167-172-145-139.nip.io/privkey.pem')
};

// Create HTTPS server
const PORT = config.PORT || 3000;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});

// Optional: Redirect HTTP to HTTPS
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80, () => {
  console.log('Servidor HTTP redirigiendo a HTTPS en el puerto 80');
});