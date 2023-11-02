import { useState } from 'react';
import _questions from './data';

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
const questions = shuffle(_questions);
export default function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState(-1);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (option, i) => {
    setSelectedOptionIndex(i);
    setSelectedOption(option);
  };

  // console.log(selectedOptionIndex);
  console.log(currentQuestion);

  const handleAnswerButtonClick = () => {
    console.log('inn');
    setSelectedOptionIndex(-1);
    if (selectedOption === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const resetQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOptionIndex(-1);
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
          <button onClick={resetQuiz}>Reset Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <ul className="answer-section">
            {questions[currentQuestion].options.map((option, i) => (
              <li
                onClick={() => handleAnswerOptionClick(option, i)}
                key={option}
                className={i === selectedOptionIndex ? 'active' : ''}
              >
                {option}
              </li>
            ))}
            <button onClick={handleAnswerButtonClick}>Submit</button>
          </ul>
        </>
      )}
    </div>
  );
}
