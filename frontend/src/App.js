import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute'; 
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard'; 
import Header from './components/Layout/Header';
import './index.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rota Protegida */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* /lessons, /profile, etc. */}
          </Route>

          {/* Rotas 404 ou de erro */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;