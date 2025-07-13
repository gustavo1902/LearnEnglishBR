import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password },
        config
      );
      setMessage('Login bem-sucedido!');
      console.log(data); // O token virá aqui
      localStorage.setItem('userInfo', JSON.stringify(data)); // Armazena info do usuário (incluindo token)
      // Você pode querer redirecionar o usuário para o dashboard
    } catch (error) {
      setMessage(error.response.data.message || 'Erro no login.');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;