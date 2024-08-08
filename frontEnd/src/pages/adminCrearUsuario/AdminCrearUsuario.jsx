import React, { useState } from 'react';

function AdminCrearUsuario() {
  const [tipoUsuario, setTipoUsuario] = useState('cliente');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  function handleTipoUsuario(tipo) {
    setTipoUsuario(tipo);
  }

  async function crearUsuario(formData) {
    if (!formData.usuario || !formData.contrasena) {
      alert("Usuario o contraseña vacia");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9._-]{5,}$/;
    if (!usernameRegex.test(formData.usuario)) {
      alert("Nombre de usuario no válido. Debe tener al menos 5 caracteres y puede contener letras, números, guiones bajos, guiones y puntos.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    if (!passwordRegex.test(formData.contrasena)) {
      alert("Contraseña no válida. Debe tener al menos 9 caracteres, una mayúscula, un número y un caracter especial.");
      return;
    }

    const url = "http://localhost:3000/api/adminCrearUsuarios/";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.usuario,
          password: formData.contrasena,
          rol: formData.tipoUsuario
        })
      });

      if (response.status === 200) {
        alert("Usuario creado exitosamente");
        setUsuario('');
        setContrasena('');
        setTipoUsuario('cliente');
      } else if (response.status === 401) {
        alert("Usuario ya existente");
      } else {
        alert("Error creando usuario");
      }
    } catch (error) {
      console.error('Error en la creación de usuario:', error);
      alert("Error creando usuario");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (tipoUsuario === 'admin') {
      const confirmAdmin = window.confirm("¿Estás seguro de que deseas crear un usuario administrador?");
      if (!confirmAdmin) {
        return;
      }
    }
    crearUsuario({ usuario, contrasena, tipoUsuario });
  }

  return (
    <>
      <div className="admin-crear-usuario-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="text"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <h3>Tipo de Usuario</h3>
          <div>
            <button
              type="button"
              className={`crear-usuario-button-tipo-cliente ${tipoUsuario === "admin" ? "crear-usuario-button-tipo-cliente-activo" : ""}`}
              onClick={() => handleTipoUsuario("admin")}
            >
              ● Admin
            </button>
            <button
              type="button"
              className={`crear-usuario-button-tipo-cliente ${tipoUsuario === "cliente" ? "crear-usuario-button-tipo-cliente-activo" : ""}`}
              onClick={() => handleTipoUsuario("cliente")}
            >
              ● Cliente
            </button>
          </div>
          <button type="submit" name="button" value="submit" className='admin-crear-usuario-button'>Crear</button>
        </form>
      </div>
    </>
  );
}

export default AdminCrearUsuario;