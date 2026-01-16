function Nextquestion({ answer, dispatch, index, numLength }) {
  if (answer === null) return;
  if (index < numLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextquestion" })}
      >
        Next
      </button>
    );
  if (index === numLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        finished
      </button>
    );
}
export default Nextquestion;
