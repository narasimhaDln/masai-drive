import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Leaderboard.css";

function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const location = useLocation();
  const userData = location.state;

  useEffect(() => {
    const storedLeaderboard =
      JSON.parse(localStorage.getItem("leaderboard")) || [];

    if (userData) {
      storedLeaderboard.push({
        name: userData.name,
        score: userData.score,
        timestamp: new Date().toLocaleTimeString(),
      });
      storedLeaderboard.sort((a, b) => b.score - a.score);
      const topScores = storedLeaderboard.slice(0, 100);

      localStorage.setItem("leaderboard", JSON.stringify(topScores));
      setLeaderBoard(topScores);
    } else {
      setLeaderBoard(storedLeaderboard);
    }
  }, [userData]);
  const getRankClass = (index) => {
    if (index === 0) return "rank-1";
    if (index === 1) return "rank-2";
    if (index === 2) return "rank-3";
    return "";
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Quiz Champions 🏆</h1>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard.map((user, index) => (
            <tr
              key={index}
              className={
                userData && user.name === userData.name ? "new-entry" : ""
              }
            >
              <td className="rank-cell">
                {index < 3 ? (
                  <div className={getRankClass(index)}>{index + 1}</div>
                ) : (
                  index + 1
                )}
              </td>
              <td className="name-cell">{user.name}</td>
              <td className="score-cell">
                <span className="score-badge">{user.score}</span>
              </td>
              <td className="time-cell">{user.timestamp || "-"}</td>
            </tr>
          ))}
          {leaderBoard.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>
                No scores yet. Be the first to play!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;
