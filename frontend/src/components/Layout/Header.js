import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Link to="/" style={linkStyle}>LearnEnglishBR</Link>
      </div>
      <nav>
        <ul style={ulStyle}>
          {userInfo ? (
            <>
              <li style={liStyle}>
                <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
              </li>
              <li style={liStyle}>
                <span style={loggedInUserStyle}>Olá, {userInfo.name}!</span>
              </li>
              <li style={liStyle}>
                <button onClick={logoutHandler} style={buttonLinkStyle}>Sair</button>
              </li>
            </>
          ) : (
            <>
              <li style={liStyle}>
                <Link to="/dashboard" style={linkStyle}>Conteúdo</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  background: '#2c3e50',
  color: '#ecf0f1',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const logoStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
};

const ulStyle = {
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: 0
};

const liStyle = {
  marginLeft: '25px',
};

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  padding: '0.8rem 1.2rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  fontWeight: '500',
};

const buttonLinkStyle = {
  background: 'none',
  border: '1px solid #e74c3c',
  color: '#e74c3c',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.8rem 1.2rem',
  borderRadius: '5px',
  transition: 'all 0.3s ease',
  fontWeight: '500',
};

const loggedInUserStyle = {
  color: '#bbdefb',
  marginRight: '15px',
  fontSize: '1.1em',
};

export default Header;
