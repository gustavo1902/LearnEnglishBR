import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const PrivateRoute = () => {
  const { userInfo } = useAuth(); 

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;