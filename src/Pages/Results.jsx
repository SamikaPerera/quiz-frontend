import { useLocation, Link } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const score = state?.score ?? 0;
  const total = state?.total ?? 0;

  return (
    <div className="card" style={{maxWidth:480}}>
      <h2>Your Results</h2>
      <p style={{fontSize:24}}><strong>{score}</strong> / {total}</p>
      <div style={{display:"flex", gap:8}}>
        <Link className="btn" to="/tournaments">Back to Tournaments</Link>
        <Link className="btn" to="/">Home</Link>
      </div>
    </div>
  );
}
