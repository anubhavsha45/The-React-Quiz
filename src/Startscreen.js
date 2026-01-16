function Startscreen({ numLength, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz!</h2>
      <h3>{numLength} questions to check your react mastery.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
export default Startscreen;
