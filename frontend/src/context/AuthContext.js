import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password },
        config
      );
      setUserInfo(data); 
      return data;
    } catch (error) {
      throw error.response.data.message || 'Erro no login.';
    }
  };

  const register = async (name, email, password) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      { name, email, password },
      config
    );
    setUserInfo(data); 
    return data;
    } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Erro no registro.';
    throw new Error(message); 
    }
  };

  // Função de logout
  const logout = () => {
    setUserInfo(null); 
  };

  // O valor que será fornecido a todos os componentes filhos
  const value = {
    userInfo,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};