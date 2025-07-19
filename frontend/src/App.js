import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Layout/Header';
import './index.css';
import './components/Auth/AuthStyles.css';
import './components/HomePage/HomePage.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
