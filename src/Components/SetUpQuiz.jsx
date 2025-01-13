import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SetupQuiz.css";

function SetUpQuiz() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories)) // Corrected typo here
      .catch((error) => console.log("error", error));
  }, []);

  const handleStartQuiz = () => {
    if (!name || !category || !difficulty) {
      alert("please fill out all fields");
      return;
    }
    const quizSetup = { name, category, difficulty };
    navigate("/quiz", { state: quizSetup });
  };

  return (
    <div className="setup-quiz">
      <h1>setup your Quiz</h1>
      <div>
        <label>Enter your Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Select Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
}

export default SetUpQuiz;
