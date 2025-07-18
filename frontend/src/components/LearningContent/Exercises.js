import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError('');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/materials?type=exercicio`,
          config
        );
        setExercises(data);
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err);
        setError(err.response?.data?.message || 'Erro ao carregar exercícios.');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo && userInfo.token) {
      fetchExercises();
    } else {
      setError('Você precisa estar logado para ver os exercícios.');
      setLoading(false);
    }
  }, [userInfo]);

  if (loading) {
    return <p>Carregando exercícios...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  if (exercises.length === 0) {
    return <p>Nenhum exercício encontrado. Tente adicionar alguns no backend.</p>;
  }

  return (
    <div>
      <h3>Exercícios de Inglês</h3>
      {exercises.map((exercise) => (
        <div key={exercise._id} style={exerciseCardStyle}>
          <h4>{exercise.title} ({exercise.level})</h4>
          {exercise.questions && exercise.questions.length > 0 ? (
            <div>
              {exercise.questions.map((q, qIndex) => (
                <div key={qIndex} style={questionStyle}>
                  <p><strong>{qIndex + 1}. {q.questionText}</strong></p>
                  <ul style={optionsListStyle}>
                    {q.options.map((option, optIndex) => (
                      <li key={optIndex} style={optionItemStyle}>
                        <input type="radio" name={`question-${q._id}`} id={`q${q._id}-opt${optIndex}`} disabled />
                        <label htmlFor={`q${q._id}-opt${optIndex}`}>{option.optionText}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma questão disponível para este exercício.</p>
          )}
        </div>
      ))}
    </div>
  );
};

const exerciseCardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const questionStyle = {
  marginBottom: '15px'
};

const optionsListStyle = {
  listStyle: 'none',
  padding: 0
};

const optionItemStyle = {
  marginBottom: '8px'
};

export default Exercises;
