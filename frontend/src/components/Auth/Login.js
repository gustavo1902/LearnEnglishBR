import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthStyles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, userInfo } = useAuth(); 
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

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

  return (
    <div className="auth-simple-container">
      <h2 className="auth-title">Entrar na Sua Conta</h2>
      {error && <p className="auth-error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form-simple">
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
        <div className="auth-form-actions-simple">
          <button type="submit" className="auth-button primary">
            Entrar
          </button>
        </div>
      </form>
      <div className="auth-alternative">
        Não tem uma conta? <Link to="/register">Crie uma aqui</Link>
      </div>
    </div>
  );
};

export default Login;
