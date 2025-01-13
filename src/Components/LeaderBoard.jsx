import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Leaderboard.css";
function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const location = useLocation();
  const userData = location.state;
  useEffect(() => {
    const storeadLeaderboard =
      JSON.parse(localStorage.getItem("leaderboard")) || [];
    if (userData) {
      storeadLeaderboard.push({
        name: userData.name,
        score: userData.score,
      });
      storeadLeaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem("leaderboard", JSON.stringify(storeadLeaderboard));
    }
    setLeaderBoard(storeadLeaderboard);
  }, [userData]);
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;
