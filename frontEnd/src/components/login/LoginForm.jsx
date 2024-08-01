import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('token', data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', data.admin);

        const isAdmin = localStorage.getItem('admin') === '1';
        
        if (isAdmin) {
          navigate('/AdminCampanas');
        } else {
          navigate('/miscampañas');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error del servidor. Por favor, inténtalo más tarde.');
    }
  };

  return (
    <div className="login-form-container">
      <div className='login-form-content-container'>
        <h1 className='login-title'>Acceso al Portal</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Usuario:</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className='login-form-button-container'>
              <button type="submit">Continuar</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default LoginForm;