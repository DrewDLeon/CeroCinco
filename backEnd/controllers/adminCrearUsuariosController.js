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
  },
  getAll: async (req, res) => {
    try {
      const users = await tbl_usuarios.getAll();
      res.status(200).json(users);

    } catch (error) {
      res.status(500).json({message: "Error recolectando usuarios"})
    }
  },
  updateUser: async (req, res) => {  // Nueva función para actualizar un usuario
    const userId = req.params.id;
    const { usuario, contra, admin } = req.body;

    if (!usuario || !contra || admin === undefined) {
      return res.status(400).json({ message: "Usuario, contraseña, y rol son requeridos." });
    }

    try {
      const user = await tbl_usuarios.findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      await tbl_usuarios.updateUser(userId, usuario, contra, admin);
      res.status(200).json({ message: 'Usuario actualizado exitosamente.' });

    } catch (error) {
      console.error('Error actualizando usuario:', error);
      res.status(500).json({ message: "Error actualizando usuario." });
    }
  },
  deleteUser: async (req, res) => { // Nueva función para eliminar un usuario
    const userId = req.params.id;

    try {
      const user = await tbl_usuarios.findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      await tbl_usuarios.deleteUser(userId);
      res.status(200).json({ message: 'Usuario eliminado exitosamente.' });

    } catch (error) {
      console.error('Error eliminando usuario:', error);
      res.status(500).json({ message: "Error eliminando usuario." });
    }
  }
}

module.exports = adminCrearUsuariosController;