import React, { useState, useEffect } from 'react';
import questionsData from './quizquestions.json';
import { Line } from 'rc-progress';
import css from './quiz.css';

const Quiz = ({ module }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20);

  useEffect(() => {
    const moduleQuestions = questionsData[module] || [];
    
    if (moduleQuestions.length > 0) {
      const shuffledQuestions = moduleQuestions.sort(() => 0.5 - Math.random());
      const uniqueQuestions = shuffledQuestions.slice(0, Math.min(30, shuffledQuestions.length));
      setQuestions(uniqueQuestions);
    }
  }, [module]);

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setTimeRemaining(20); 
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAnswer(false); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1); 
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1); 
    } else {
      setIsFinished(true); 
    }
  };

  if (isFinished) {
    const message = score > 15 ? "Félicitations ! Vous avez réussi." : "Réessayer !";
    const messageClass = score > 15 ? "success-message" : "fail-message";

    return (
      <div className="score-container">
        <h2>Votre score final est : {score}/{questions.length}</h2>
        <h3 className={messageClass}>{message}</h3>
        <button onClick={() => window.location.reload()}>Recommencer</button>
      </div>
    ); 
  }

  const timerWidth = (timeRemaining / 20) * 100; 
  const timerColor = timeRemaining <= 7 ? 'red' : 'green';
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <img src="/OFPPT quiz -Logo.jpg" alt="OFPPT Logo" className="quiz-logo" />
      
      <div className="progress-bar-container">
        <Line 
          percent={progressPercentage} 
          strokeWidth="4" 
          strokeColor="#4CAF50" 
        />
        <p>{Math.round(progressPercentage)}% terminé</p>
      </div>

      <h1>Question {currentQuestionIndex + 1}/{questions.length}</h1>
      <p>{questions[currentQuestionIndex]?.question}</p> 

      <div className="timer-container">
        <div 
          className="timer-bar" 
          style={{ 
            width: `${timerWidth}%`,
            backgroundColor: timerColor 
          }} 
        ></div>
        <div className="timer-text">{timeRemaining} secondes</div>
      </div>

      {questions[currentQuestionIndex]?.answers.map((answer, index) => (
        <button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
          {answer.text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
