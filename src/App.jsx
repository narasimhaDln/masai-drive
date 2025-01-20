import { Routes, Route } from "react-router-dom";
import SetUpQuiz from "./Components/SetUpQuiz";
import Quiz from "./Components/Quiz";
import LeaderBoard from "./Components/LeaderBoard";
import "./Styles/App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <div className="route-transition">
              <SetUpQuiz />
            </div>
          }
        />
        <Route
          path="/quiz"
          element={
            <div className="route-transition">
              <Quiz />
            </div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <div className="route-transition">
              <LeaderBoard />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
