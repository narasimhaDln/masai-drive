import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Quiz.css";
function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const quizSetup = location.state;
  useEffect(() => {
    if (!quizSetup) {
      navigate("/");
      return;
    }
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${quizSetup.category}&difficulty=${quizSetup.difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data.res));
    setLoading(false).catch((error) => console.log("error", error));
  }, [quizSetup, navigate]);
  const handleAnswer = (answer) => {
    const currentQUestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQUestion.correct_answer;
    setUserAnswers([...userAnswers, answer]);
    if (isCorrect) setScore(score + 1);
  };
  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };
  const handleSubmit = () => {
    navigate("/leaderboard", { state: { name: quizSetup.name, score } });
  };
  if (loading) {
    return <p>Loading questions......</p>;
  }
  return (
    <div className="quiz">
      {questions.length > 0 && (
        <h2>
          Question {currentQuestionIndex + 1} of{questions.length}
        </h2>
      )}
      {questions[currentQuestionIndex] && (
        <div>
          <p>{questions[currentQuestionIndex].question}</p>
          {questions[currentQuestionIndex].incorrect_answer
            .concat(questions[currentQuestionIndex].correct_answer)
            .sort(() => Math.random() - 0.5)
            .map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          ;
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
          <button onClick={handlePrevious} disabled={currentQuestionIndex <= 0}>
            Previous
          </button>
          <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
