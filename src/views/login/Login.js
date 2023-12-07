// Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'Admin123!') {
      navigate('/movies');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className={`${styles.body} ${styles.loginContainer}`}>
      <div className={styles['login-container']}>
        <h2>Login</h2>
        <label>Username: </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;