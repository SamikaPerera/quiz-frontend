import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");

  function onSubmit(e) {
    e.preventDefault();
    login(username, password);
    const role = username === "admin" ? "ADMIN" : "PLAYER";
    navigate(role === "ADMIN" ? "/tournaments" : "/");
  }

  return (
    <div className="page">
      <div className="card" style={{maxWidth:420, margin:"0 auto"}}>
        <h2>Sign in</h2>
        <p className="muted">Use admin/admin123 for full access.</p>
        <form onSubmit={onSubmit} className="grid">
          <input className="input" placeholder="Username"
                 value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="input" placeholder="Password" type="password"
                 value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
