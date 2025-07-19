import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthStyles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login.');
    }
  };

  const handleContinueWithoutLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2 className="auth-title">Entrar</h2>
        {error && <p className="auth-error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-form-actions">
            <button type="submit" className="auth-button primary">
              Entrar
            </button>
            <button type="button" onClick={handleContinueWithoutLogin} className="auth-button secondary">
              Continuar sem Login
            </button>
          </div>
        </form>
        <div className="auth-alternative">
          Novo por aqui? <Link to="/register">Registre-se</Link>
        </div>
      </div>
      <div className="auth-background"></div>
    </div>
  );
};

export default Login;
