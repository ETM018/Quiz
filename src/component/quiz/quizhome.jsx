import React from 'react';

const Home = ({ onModuleSelect }) => {
  return (
    <div>
      <h1>Bienvenue dans OFPPT.QUIZ !</h1>
      <img src="/OFPPT quiz -Logo.jpg" alt="OFPPT Logo" className="quiz-logo" />
      <p>Veuillez choisir un module :</p>
      <button onClick={() => onModuleSelect('francais')}>Français</button>
      <button onClick={() => onModuleSelect('laravel')}>Laravel</button>
      <button onClick={() => onModuleSelect('react')}>React</button>
      <button onClick={() => onModuleSelect('agile')}>Agile</button>
    </div>
  );
};

export default Home;
