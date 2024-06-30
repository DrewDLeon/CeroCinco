import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'

function LoginForm() {
  const navigate = useNavigate();

  function fakeLogin() {
    navigate('/MisCampañas')
  }


  return (
    <div className="login-form-container">
      <div className='login-form-content-container'>
        <h1 className='login-title'>Acceso al Portal</h1>
          <form>
            <div className="form-group">
              <label htmlFor="username">Usuario:</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className='login-form-button-container'>
              <button type="submit" onClick={fakeLogin}>Continuar</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default LoginForm;