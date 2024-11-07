import React from 'react';
import './Result.css';

const Result = ({ score, totalQuestions }) => {
  const resultColor = score >= 15 ? 'text-green' : 'text-red'; 

  return (
    <div className="result-container">
      <h2 className="result-header">Félicitations!</h2>
      <p className={`result-score ${resultColor}`}>
        Votre score est de {score}/{totalQuestions}
      </p>
      {score >= 15 ? (
        <p className="result-message text-green">Bravo, vous avez réussi !</p>
      ) : (
        <p className="result-message text-red">Essayez encore.</p>
      )}
    </div>
  );
};

export default Result;
