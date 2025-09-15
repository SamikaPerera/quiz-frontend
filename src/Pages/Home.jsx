import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid cols-2">
      <div className="card">
        <h2>Welcome to QuizApp</h2>
        <p>Sign in as Admin to manage tournaments, or browse and play as a player.</p>
        <div style={{ display:"flex", gap:12, marginTop:12 }}>
          <Link className="btn primary" to="/tournaments">Browse Tournaments</Link>
          <Link className="btn" to="/login">Login</Link>
        </div>
      </div>
      <div className="card">
        <h3>How it works</h3>
        <ol>
          <li>Admin creates a tournament</li>
          <li>Players select a tournament and take the quiz</li>
          <li>Get your score and review answers</li>
        </ol>
      </div>
    </div>
  );
}
