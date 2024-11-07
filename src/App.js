import { useState, useEffect } from 'react'; // Assure-toi que useState est bien importé
import './App.css';
import Home from './component/quiz/quizhome';
import Quiz from './component/quiz/quiz';
import Result from './component/quiz/quizresult';

function App() {
  const [currentView, setCurrentView] = useState('home'); // State pour gérer la vue actuelle
  const [selectedModule, setSelectedModule] = useState(''); // State pour stocker le module sélectionné
  const [score, setScore] = useState(0); // State pour suivre le score
  const [totalQuestions, setTotalQuestions] = useState(0); // State pour suivre le nombre de questions

  const handleModuleSelect = (module) => {
    setSelectedModule(module); // Définir le module sélectionné
    setCurrentView('quiz'); // Passer à la vue "quiz"
  };

  const handleQuizFinish = (finalScore, total) => {
    setScore(finalScore); 
    setTotalQuestions(total); 
    setCurrentView('result'); // Passer à la vue "resultat"
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onModuleSelect={handleModuleSelect} />;
      case 'quiz':
        return <Quiz module={selectedModule} onQuizFinish={handleQuizFinish} />;
      case 'result':
        return <Result score={score} totalQuestions={totalQuestions} />;
      default:
        return <Home onModuleSelect={handleModuleSelect} />;
    }
  };

  return (
    <div>
      {renderView()}
    </div>
  );
}

export default App;
