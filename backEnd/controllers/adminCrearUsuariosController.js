const tbl_usuarios = require("../models/tbl_usuarios")

const adminCrearUsuariosController =  {
  createUser: async (req, res) => {
    const { username, password, rol } = req.body;

    if (!username || !password || !rol) {
      return res.status(400).json({ message: "Username, password, and role are required." });
    }

    try {
      const user = await tbl_usuarios.findUserByUsername(username);

      if (user) {
        return res.status(401).json({ message: 'Usuario ya existente' });
      }

      const newUser = await tbl_usuarios.createUser(username, password, rol);
      res.status(200).json(newUser);

    } catch (error) {
      console.error('Error en la creación de usuario:', error);
      res.status(500).json({ message: "Error creando usuario" });
    }
  }
}

module.exports = adminCrearUsuariosController;