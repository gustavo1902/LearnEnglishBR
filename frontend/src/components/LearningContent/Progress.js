import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Progress = () => {
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchUserProgress = async () => {
      setLoading(true);
      setError('');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/progress`, 
          config
        );
        setUserProgress(data);
      } catch (err) {
        console.error('Erro ao buscar progresso do usuário:', err);
        setError(err.response?.data?.message || 'Erro ao carregar seu progresso.');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo && userInfo.token) {
      fetchUserProgress();
    } else {
      setError('Você precisa estar logado para ver seu progresso.');
      setLoading(false);
    }
  }, [userInfo]); 

  if (loading) {
    return <p>Carregando seu progresso...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  if (userProgress.length === 0) {
    return <p>Você ainda não completou nenhum exercício. Comece um quiz para ver seu progresso aqui!</p>;
  }

  return (
    <div>
      <h3>Meu Progresso</h3>
      <p>Aqui você pode ver o seu desempenho nos exercícios completados.</p>
      <div style={progressGridStyle}>
        {userProgress.map((progressItem) => (
          <div key={progressItem._id} style={progressCardStyle}>
            <h4>{progressItem.material?.title || 'Material Desconhecido'}</h4>
            <p>Nível: {progressItem.material?.level || 'N/A'}</p>
            <p>Tipo: {progressItem.material?.type || 'N/A'}</p>
            <p>Pontuação: <strong>{progressItem.score} / {progressItem.totalQuestions}</strong></p>
            <p>Completado em: {new Date(progressItem.completedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos básicos
const progressGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  marginTop: '20px'
};

const progressCardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '15px',
  backgroundColor: '#fefefe',
  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s ease-in-out',
};

export default Progress;