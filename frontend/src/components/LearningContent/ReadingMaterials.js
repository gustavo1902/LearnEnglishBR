import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 

const ReadingMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useAuth(); 

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchReadingMaterials = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const config = {
        headers: {},
      };
      if (userInfo && userInfo.token) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }

      const { data } = await axios.get(
        `${API_URL}/materials?type=leitura`,
        config 
      );
      setMaterials(data);
    } catch (err) {
      console.error('Erro ao buscar materiais de leitura:', err);
      setError(err.response?.data?.message || 'Erro ao carregar materiais de leitura.');
    } finally {
      setLoading(false);
    }
  }, [userInfo, API_URL]);

  useEffect(() => {
    fetchReadingMaterials();
  }, [fetchReadingMaterials]);

  if (loading) {
    return <p>Carregando materiais de leitura...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  if (materials.length === 0) {
    return <p>Nenhum material de leitura encontrado. Adicione algum material no backend.</p>;
  }

  return (
    <div>
      <h3>Materiais de Leitura</h3>
      <p>Explore textos e conteúdos para aprimorar seu inglês.</p>
      <div style={materialGridStyle}>
        {materials.map((material) => (
          <div key={material._id} style={materialCardStyle}>
            <h4>{material.title} ({material.level})</h4>
            <div dangerouslySetInnerHTML={{ __html: material.content }} style={contentStyle} />
            
          </div>
        ))}
      </div>
    </div>
  );
};

const materialGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  marginTop: '20px'
};

const materialCardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const contentStyle = {
    marginTop: '15px',
    fontSize: '0.95em',
    lineHeight: '1.6',
    maxHeight: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
}

export default ReadingMaterials;