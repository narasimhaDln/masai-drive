import { Routes, Route } from "react-router-dom";

import SetUpQuiz from "./Components/SetUpQuiz";
import Quiz from "./Components/Quiz";
import LeaderBoard from "./Components/LeaderBoard";
import "./Styles/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SetUpQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </>
  );
}

export default App;
