import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleContinueWithoutLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="homepage-container">
      <div className="homepage-form-section">
        <h2 className="homepage-welcome-title">Bem-vindo à LearnEnglishBR!</h2>
        <p className="homepage-subtitle">Sua plataforma interativa para aprender e praticar inglês.</p>

        {!userInfo ? (
          <div className="homepage-actions">
            <Link to="/login" className="homepage-button homepage-button-login">Entrar</Link>
            <Link to="/register" className="homepage-button homepage-button-register">Registrar</Link>
            <button onClick={handleContinueWithoutLogin} className="homepage-button homepage-button-continue">
              Continuar sem Login
            </button>
          </div>
        ) : (
          <div className="homepage-logged-in-message">
            <p>Você já está logado como <strong>{userInfo.name}</strong>.</p>
            <Link to="/dashboard" className="homepage-button homepage-button-dashboard">Ir para o Dashboard</Link>
          </div>
        )}
      </div>
      <div className="homepage-image-section">
        
      </div>
    </div>
  );
};

export default HomePage;
