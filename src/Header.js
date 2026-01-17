function Header({ name }) {
  return (
    <header className="app-header">
      <p className="welcome-big">Welcome, {name} 👋</p>

      <div className="brand">
        <img className="logo" src="logo192.png" alt="React logo" />
        <h1 className="app-title">THE REACT QUIZ</h1>
      </div>
    </header>
  );
}

export default Header;
