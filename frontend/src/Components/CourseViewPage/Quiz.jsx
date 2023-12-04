import React, { useState } from 'react';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [showCongrats, setShowCongrats] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChoiceChange = (questionId, choice) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
  };

  const checkAnswers = () => {
    const correctAnswers = {
      1: 'Paris',
      2: 'Mars',
      3: 'Blue Whale',
      4: 'William Shakespeare',
      5: 'JavaScript',
    };

    for (const [key, value] of Object.entries(correctAnswers)) {
      if (answers[key] !== value) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    const allCorrect = checkAnswers();
    setShowCongrats(allCorrect);
    setSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setShowCongrats(false);
    setSubmitted(false);
  };

  const questions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      choices: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    },
    {
      id: 2,
      text: 'Which planet is known as the Red Planet?',
      choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    },
    {
      id: 3,
      text: 'What is the largest mammal in the world?',
      choices: ['Blue Whale', 'Elephant', 'Giraffe', 'Hippopotamus'],
    },
    {
      id: 4,
      text: 'Who wrote "Romeo and Juliet"?',
      choices: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
    },
    {
      id: 5,
      text: 'Which programming language is this quiz written in?',
      choices: ['JavaScript', 'Python', 'Java', 'C++'],
    },
  ];

  return (
    <div className='courseQuiz'>
      <div className='QuizTitle'>
        <h2>Quiz</h2>
      </div>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <ul className='choices-list'>
            {question.choices.map((choice, index) => (
              <li key={index}>
                <label>
                  <input
                    type='radio'
                    name={`question-${question.id}`}
                    value={choice}
                    checked={answers[question.id] === choice}
                    onChange={() => handleChoiceChange(question.id, choice)}
                  />
                  {choice}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="Quiz_submit-button" onClick={handleSubmit} disabled={submitted}>
        Submit
      </button>
      {showCongrats && <p>Congratulations! All answers are correct!</p>}
      {submitted && !showCongrats && (
        <button className="Quiz_retake-button" onClick={handleRetakeQuiz}>
          Retake Quiz
        </button>
      )}
    </div>
  );
};

export default Quiz;
