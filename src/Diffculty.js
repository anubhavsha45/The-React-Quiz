function Difficulty({ dispatch }) {
  return (
    <div className="difficulty-screen">
      <h1 className="difficulty-title">Choose Your Difficulty</h1>

      <div className="difficulty-buttons">
        <button
          className="difficulty-btn easy"
          onClick={() => dispatch({ type: "easy" })}
        >
          <h2>Easy</h2>
          <p>For beginners</p>
        </button>

        <button
          className="difficulty-btn medium"
          onClick={() => dispatch({ type: "medium" })}
        >
          <h2>Medium</h2>
          <p>Balanced challenge</p>
        </button>

        <button
          className="difficulty-btn hard"
          onClick={() => dispatch({ type: "hard" })}
        >
          <h2>Hard</h2>
          <p>For advanced users</p>
        </button>
        <button
          className="difficulty-btn all"
          onClick={() => dispatch({ type: "all" })}
        >
          <h2>All</h2>
          <p>Attempt all questions</p>
        </button>
      </div>
    </div>
  );
}

export default Difficulty;
