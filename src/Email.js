function Email({ dispatch }) {
  return (
    <form
      className="email-form"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "email" });
      }}
    >
      <h2>Enter your email to start</h2>

      <input
        type="text"
        placeholder="Enter your first name"
        onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
      />

      <input
        type="email"
        placeholder="you@example.com"
        onChange={(e) =>
          dispatch({ type: "emailphase", payload: e.target.value })
        }
      />

      <button>Start Quiz</button>
    </form>
  );
}

export default Email;
