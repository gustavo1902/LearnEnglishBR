import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import HomePage from './components/HomePage'; 
import Header from './components/Layout/Header'; 
import './index.css'; 

function App() {
  return (
    <Router>
      <Header /> {}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} exact /> {/* Página inicial */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Outras rotas */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;