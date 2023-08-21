function Result({ score, totalScore, onReset }) {
  const highScore = JSON.parse(localStorage.getItem("highScore")) || 0;
  if (highScore <= score) {
    localStorage.setItem("highScore", score);
  }
  return (
    <>
      <p className="result">
        <span>🤦&zwj;</span> You scored <strong>{score}</strong> out of{" "}
        {totalScore} ({Math.ceil((score * 100) / totalScore)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points) </p>
      <button className="btn btn-ui" onClick={onReset}>
        Restart quiz
      </button>
    </>
  );
}

export default Result;
