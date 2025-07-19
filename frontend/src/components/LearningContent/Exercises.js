import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Exercises = () => {
  const [allExercises, setAllExercises] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useAuth();

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const config = {
        headers: {},
      };
      if (userInfo && userInfo.token) {
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
      const { data: exercisesData } = await axios.get(`${API_URL}/materials?type=exercicio`, config);
      setAllExercises(exercisesData);

      if (userInfo && userInfo.token) {
        const { data: progressData } = await axios.get(`${API_URL}/progress`, config);
        setUserProgress(progressData);
      } else {
        setUserProgress([]);
      }
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError(err.response?.data?.message || 'Erro ao carregar exercícios ou progresso.');
    } finally {
      setLoading(false);
    }
  }, [userInfo, API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [userAnswers, setUserAnswers] = useState({});
  const [answersChecked, setAnswersChecked] = useState({});

  const handleOptionChange = (questionId, optionIndex) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const checkAnswers = async (quizId) => {
    setAnswersChecked(prevChecked => ({
      ...prevChecked,
      [quizId]: true,
    }));

    const currentQuiz = allExercises.find(ex => ex._id === quizId);
    if (currentQuiz) {
      const score = calculateScore(currentQuiz);
      const totalQuestions = currentQuiz.questions.length;

      if (userInfo && userInfo.token) {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          await axios.post(
            `${API_URL}/progress`,
            {
              materialId: quizId,
              score,
              totalQuestions,
            },
            config
          );
          fetchData();
        } catch (err) {
          console.error('Erro ao salvar progresso:', err.response?.data?.message || err.message);
        }
      } else {
        setError('Progresso não salvo. Faça login para registrar seus resultados!');
      }
    }
  };

  const resetExercise = (quizId) => {
    setUserAnswers({});
    setAnswersChecked(prevChecked => {
      const newChecked = { ...prevChecked };
      delete newChecked[quizId];
      return newChecked;
    });
    setSelectedQuizId(null);
  };

  const calculateScore = (quiz) => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      const selectedOptionIndex = userAnswers[q._id];
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
    return <p>Carregando exercícios e progresso...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  const currentQuiz = allExercises.find(ex => ex._id === selectedQuizId);

  if (selectedQuizId && currentQuiz) {
    const isChecked = answersChecked[currentQuiz._id];
    const score = isChecked ? calculateScore(currentQuiz) : 0;
    const totalQuestions = currentQuiz.questions.length;
    const allQuestionsAnswered = Object.keys(userAnswers).length === totalQuestions;

    return (
      <div>
        <h3>{currentQuiz.title} ({currentQuiz.level})</h3>
        <button onClick={() => resetExercise(currentQuiz._id)} style={backButtonStyle}>
          ← Voltar para a lista de Quizzes
        </button>
        {currentQuiz.questions && currentQuiz.questions.length > 0 ? (
          <div>
            {currentQuiz.questions.map((q, qIndex) => (
              <div key={q._id || qIndex} style={questionStyle}>
                <p><strong>{qIndex + 1}. {q.questionText}</strong></p>
                <ul style={optionsListWithRadioStyle}>
                  {q.options.map((option, optIndex) => (
                    <li key={optIndex} style={optionItemStyle}>
                      <input
                        type="radio"
                        name={`question-${q._id}`}
                        id={`q${q._id}-opt${optIndex}`}
                        checked={userAnswers[q._id] === optIndex}
                        onChange={() => handleOptionChange(q._id, optIndex)}
                        disabled={isChecked}
                      />
                      <label
                        htmlFor={`q${q._id}-opt${optIndex}`}
                        style={
                          isChecked
                            ? (option.isCorrect ? correctOptionStyle :
                               (userAnswers[q._id] === optIndex ? wrongOptionStyle : {}))
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
            {!userInfo && (
              <p style={{ color: 'red', fontSize: '0.9em', marginTop: '10px' }}>
                **Seu progresso não foi salvo.** Faça login para registrar seus resultados!
              </p>
            )}
          </div>
        )}

        {!isChecked ? (
          <button
            onClick={() => checkAnswers(currentQuiz._id)}
            style={buttonStyle}
            disabled={!allQuestionsAnswered}
          >
            Verificar Respostas
          </button>
        ) : (
          <button
            onClick={() => resetExercise(currentQuiz._id)}
            style={buttonStyle}
          >
            Reiniciar Quiz
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <h3>Escolha um Exercício</h3>
      {allExercises.length === 0 ? (
        <p>Nenhum exercício encontrado. Adicione alguns quizzes no backend.</p>
      ) : (
        <div style={quizGridStyle}>
          {allExercises.map((quiz) => {
            const isCompleted = userProgress.some(
              (p) => p.material && p.material._id === quiz._id
            );
            return (
              <div key={quiz._id} style={quizCardStyle}>
                <h4>{quiz.title}</h4>
                <p>Nível: {quiz.level}</p>
                <p>Perguntas: {quiz.questions ? quiz.questions.length : 0}</p>
                {isCompleted && (
                  <span style={completedBadgeStyle}>Feito!</span>
                )}
                <button
                  onClick={() => setSelectedQuizId(quiz._id)}
                  style={selectQuizButtonStyle}
                >
                  {isCompleted ? 'Revisar / Refazer' : 'Iniciar Quiz'}
                </button>
              </div>
            );
          })}
        </div>
      )}
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

const optionsListWithRadioStyle = {
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

const quizGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '20px',
};

const quizCardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '15px',
  backgroundColor: '#fefefe',
  boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const selectQuizButtonStyle = {
  padding: '8px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  marginTop: '10px',
  alignSelf: 'flex-start',
  transition: 'background-color 0.3s ease',
};

const completedBadgeStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '15px',
  fontSize: '0.8em',
  fontWeight: 'bold',
};

const backButtonStyle = {
  padding: '8px 15px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  marginBottom: '20px',
  transition: 'background-color 0.3s ease',
};

export default Exercises;
