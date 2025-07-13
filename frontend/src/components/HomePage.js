import React from 'react';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Bem-vindo à Plataforma de Aprendizado de Inglês!</h2>
      <p>Comece a aprender agora mesmo.</p>
      <p>Faça <a href="/login">Login</a> ou <a href="/register">Registre-se</a> para acessar os materiais.</p>
    </div>
  );
};

export default HomePage;