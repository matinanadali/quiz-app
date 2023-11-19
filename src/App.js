import React, { useState } from 'react';
import Quiz from './Quiz';
import Lectures from './Lectures';

const App = () => {
    const [Questions, setQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const handleBackToLecturesClick = () => {
    setShowQuiz(false);
  };

  const handleViewQuiz = (selectedQuestions) => {
setQuestions(selectedQuestions);
    setShowQuiz(true);
  };

  return (
    <div className='app'>
      {showQuiz ? (
        <Quiz onBackToLecturesClick={handleBackToLecturesClick} questions={Questions} />
      ) : (
        <Lectures onShowQuizClick={handleViewQuiz} />
      )}
    </div>
  );
};

export default App;