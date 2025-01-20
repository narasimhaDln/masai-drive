import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SetupQuiz.css";

function SetUpQuiz() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!category) newErrors.category = "Please select a category";
    if (!difficulty) newErrors.difficulty = "Please select difficulty level";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartQuiz = () => {
    if (validateForm()) {
      const quizSetup = { name, category, difficulty };
      navigate("/quiz", { state: quizSetup });
    }
  };

  return (
    <div className={`setup-quiz ${loading ? "loading" : ""}`}>
      <h2>Setup Your Quiz</h2>

      <div className="form-group">
        <label className="form-label">Enter your Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={errors.name ? "error" : ""}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Select Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={errors.category ? "error" : ""}
        >
          <option value="">Choose a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error-message">{errors.category}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Select Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={errors.difficulty ? "error" : ""}
        >
          <option value="">Choose difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {errors.difficulty && (
          <span className="error-message">{errors.difficulty}</span>
        )}
      </div>

      <button onClick={handleStartQuiz} disabled={loading}>
        {loading ? "Loading Categories..." : "Start Quiz"}
      </button>

      {loading && <div className="loading-message">Loading categories...</div>}
    </div>
  );
}

export default SetUpQuiz;
