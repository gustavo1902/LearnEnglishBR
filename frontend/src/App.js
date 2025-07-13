import React from 'react';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import './components/Auth/AuthForms.css';

function App() {
  return (
    <div className="App">
      <h1>Plataforma de Aprendizado de Inglês</h1>
      <Register />
      <hr style={{ margin: '40px 0' }} />
      <Login />
    </div>
  );
}

export default App;