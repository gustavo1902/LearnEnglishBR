import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useAuth();
  const [userAnswers, setUserAnswers] = useState({});
  const [answersChecked, setAnswersChecked] = useState({});

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

  const handleOptionChange = (exerciseId, questionId, optionIndex) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [exerciseId]: {
        ...prevAnswers[exerciseId],
        [questionId]: optionIndex,
      },
    }));
  };

  const checkAnswers = (exerciseId) => {
    setAnswersChecked(prevChecked => ({
      ...prevChecked,
      [exerciseId]: true,
    }));
  };

  const resetExercise = (exerciseId) => {
    setUserAnswers(prevAnswers => {
      const newAnswers = { ...prevAnswers };
      delete newAnswers[exerciseId];
      return newAnswers;
    });
    setAnswersChecked(prevChecked => {
      const newChecked = { ...prevChecked };
      delete newChecked[exerciseId];
      return newChecked;
    });
  };

  const calculateScore = (exercise) => {
    let correctCount = 0;
    exercise.questions.forEach(q => {
      const selectedOptionIndex = userAnswers[exercise._id]?.[q._id];
      const correctOption = q.options.find(opt => opt.isCorrect);

      if (selectedOptionIndex !== undefined && correctOption) {
        if (q.options[selectedOptionIndex].optionText === correctOption.optionText) {
          correctCount++;
        }
      }
    });
    return correctCount;
  };

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
      {exercises.map((exercise) => {
        const isChecked = answersChecked[exercise._id];
        const score = isChecked ? calculateScore(exercise) : 0;
        const totalQuestions = exercise.questions.length;

        return (
          <div key={exercise._id} style={exerciseCardStyle}>
            <h4>{exercise.title} ({exercise.level})</h4>
            {exercise.questions && exercise.questions.length > 0 ? (
              <div>
                {exercise.questions.map((q, qIndex) => (
                  <div key={q._id || qIndex} style={questionStyle}>
                    <p><strong>{qIndex + 1}. {q.questionText}</strong></p>
                    <ul style={optionsListStyle}>
                      {q.options.map((option, optIndex) => (
                        <li key={optIndex} style={optionItemStyle}>
                          <input
                            type="radio"
                            name={`question-${exercise._id}-${q._id}`}
                            id={`q${q._id}-opt${optIndex}`}
                            checked={userAnswers[exercise._id]?.[q._id] === optIndex}
                            onChange={() => handleOptionChange(exercise._id, q._id, optIndex)}
                            disabled={isChecked}
                          />
                          <label
                            htmlFor={`q${q._id}-opt${optIndex}`}
                            style={
                              isChecked
                                ? (option.isCorrect ? correctOptionStyle :
                                   (userAnswers[exercise._id]?.[q._id] === optIndex ? wrongOptionStyle : {}))
                                : {}
                            }
                          >
                            {option.optionText}
                          </label>
                        </li>
                      ))}
                    </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma questão disponível para este exercício.</p>
          )}

          {isChecked && (
            <div style={resultStyle}>
              <p>Você acertou: {score} de {totalQuestions} perguntas.</p>
            </div>
          )}

          {!isChecked ? (
            <button
              onClick={() => checkAnswers(exercise._id)}
              style={buttonStyle}
              disabled={!userAnswers[exercise._id] || Object.keys(userAnswers[exercise._id]).length !== totalQuestions}
            >
              Verificar Respostas
            </button>
          ) : (
            <button
              onClick={() => resetExercise(exercise._id)}
              style={buttonStyle}
            >
              Reiniciar Quiz
            </button>
          )}
        </div>
        );
      })}
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

const correctOptionStyle = {
  color: 'green',
  fontWeight: 'bold'
};

const wrongOptionStyle = {
  color: 'red',
  fontWeight: 'bold',
  textDecoration: 'line-through'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
  transition: 'background-color 0.3s ease',
};

const resultStyle = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#e9ffe9',
  border: '1px solid #c8e6c9',
  borderRadius: '5px',
  fontWeight: 'bold',
  textAlign: 'center'
};

export default Exercises;
