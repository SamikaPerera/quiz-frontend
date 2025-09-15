import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();
  return (
    <header className="nav">
      <div className="brand"><Link to="/">QuizApp</Link></div>
      <nav className="links">
        <Link className={pathname==="/tournaments" ? "active" : ""} to="/tournaments">Tournaments</Link>
        <Link className={pathname==="/login" ? "active" : ""} to="/login">Login</Link>
      </nav>
    </header>
  );
}
