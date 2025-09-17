import { Routes, Route, Link, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Tournaments from "./pages/Tournaments.jsx";
import PlayQuiz from "./pages/PlayQuiz.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <NavBar />

      <nav style={{ marginBottom: 16 }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
        <Link to="/tournaments" style={{ marginRight: 12 }}>Tournaments</Link>
        <Link to="/play/1" style={{ marginRight: 12 }}>Play Quiz</Link>
        <Link to="/results">Results</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tournaments" element={<Tournaments />} />
        {/* ✅ accept an id in the URL */}
        <Route path="/play/:tournamentId" element={<PlayQuiz />} />
        {/* optional: visiting /play without id goes to tournaments */}
        <Route path="/play" element={<Navigate to="/tournaments" replace />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
}
