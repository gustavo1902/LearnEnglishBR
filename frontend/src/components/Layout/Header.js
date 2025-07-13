import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
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
                <span style={{ color: '#fff', marginRight: '10px' }}>Olá, {userInfo.name}!</span>
              </li>
              <li style={liStyle}>
                <button onClick={logoutHandler} style={buttonLinkStyle}>Sair</button>
              </li>
            </>
          ) : (
            <>
              <li style={liStyle}><Link to="/login" style={linkStyle}>Login</Link></li>
              <li style={liStyle}><Link to="/register" style={linkStyle}>Registrar</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const ulStyle = {
  listStyle: 'none',
  display: 'flex',
  margin: 0,
  padding: 0
};

const liStyle = {
  marginLeft: '20px'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease'
};

const buttonLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease'
};

buttonLinkStyle[':hover'] = {
    backgroundColor: '#555'
};

export default Header;
