import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleContinueWithoutLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div style={homePageContainerStyle}>
      <h2 style={titleStyle}>Bem-vindo à LearnEnglishBR!</h2>
      <p style={subtitleStyle}>Sua plataforma interativa para aprender e praticar inglês.</p>

      {!userInfo ? (
        <div style={optionsContainerStyle}>
          <Link to="/login" style={{ ...buttonStyle, ...loginButtonStyle }}>Entrar</Link>
          <Link to="/register" style={{ ...buttonStyle, ...registerButtonStyle }}>Registrar</Link>
          <button onClick={handleContinueWithoutLogin} style={{ ...buttonStyle, ...continueButtonStyle }}>
            Continuar sem Login
          </button>
        </div>
      ) : (
        <div style={loggedInSectionStyle}>
          <p>Você já está logado como **{userInfo.name}**.</p>
          <Link to="/dashboard" style={dashboardLinkStyle}>Ir para o Dashboard</Link>
        </div>
      )}
    </div>
  );
};

const homePageContainerStyle = {
  textAlign: 'center',
  marginTop: '80px',
  padding: '30px',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  maxWidth: '700px',
  margin: '80px auto 20px auto',
  animation: 'fadeIn 1s ease-out'
};

const titleStyle = {
  fontSize: '2.8em',
  color: '#2c3e50',
  marginBottom: '15px',
  fontWeight: '700'
};

const subtitleStyle = {
  fontSize: '1.4em',
  color: '#555',
  marginBottom: '40px'
};

const optionsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center'
};

const buttonStyle = {
  padding: '15px 30px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '1.2em',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  width: '80%',
  maxWidth: '300px',
  border: 'none',
  cursor: 'pointer'
};

const loginButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  '&:hover': {
    backgroundColor: '#0056b3'
  }
};

const registerButtonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  '&:hover': {
    backgroundColor: '#218838'
  }
};

const continueButtonStyle = {
  backgroundColor: '#6c757d',
  color: 'white',
  '&:hover': {
    backgroundColor: '#5a6268'
  }
};

const loggedInSectionStyle = {
  marginTop: '30px',
  fontSize: '1.2em',
  color: '#34495e',
};

const dashboardLinkStyle = {
  display: 'inline-block',
  marginTop: '20px',
  padding: '12px 25px',
  backgroundColor: '#17a2b8',
  color: 'white',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#138496'
  }
};
const fadeInAnimation = {
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  }
};

export default HomePage;
