function Progress({ index, numquestions, points, maxPossiblePoints, answer }) {
  return (
    <div className="progress">
      <progress max={numquestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong>/ {numquestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </div>
  );
}
export default Progress;
