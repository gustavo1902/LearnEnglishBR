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
              <li style={loggedInUserContainerStyle}>
                <span style={loggedInUserTextStyle}>Olá, {userInfo.name}!</span>
                <button onClick={logoutHandler} style={buttonLinkStyle}>Sair</button>
              </li>
            </>
          ) : (
            <>
            
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
  padding: 0,
  alignItems: 'center',
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
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const loggedInUserContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '25px',
  gap: '10px',
};

const loggedInUserTextStyle = {
  color: '#bbdefb',
  fontSize: '1.1em',
};

export default Header;
