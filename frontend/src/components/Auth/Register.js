import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
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
        `${process.env.REACT_APP_API_URL}/auth/register`,
        { name, email, password },
        config
      );
      setMessage('Registro bem-sucedido! Por favor, faça login.');
      console.log(data); // O token virá aqui
      // Você pode querer redirecionar o usuário ou limpar o formulário
    } catch (error) {
      setMessage(error.response.data.message || 'Erro no registro.');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrar</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;