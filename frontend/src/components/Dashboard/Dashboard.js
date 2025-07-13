import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { userInfo } = useAuth();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Bem-vindo ao seu Dashboard, {userInfo?.name}!</h2>
      <p>Aqui você encontrará seu progresso de aprendizado e materiais.</p>
      {/* Conteúdo do dashboard */}
    </div>
  );
};

export default Dashboard;