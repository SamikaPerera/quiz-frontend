import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { listTournaments, createTournament } from "../api/tournaments.js";
import { Link } from "react-router-dom";

export default function Tournaments() {
  const { basicAuth, isAuthenticated, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "Spring Challenge",
    category: "General",
    difficulty: "EASY",
    startDate: "2025-09-20T10:00:00",
    endDate: "2025-09-21T10:00:00",
    minPassingPercent: 60,
    archived: false,
  });

  async function refresh() {
    setErr("");
    try {
      const data = await listTournaments({ Authorization: basicAuth || "" });
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => { refresh(); }, [basicAuth]);

  async function onCreate() {
    try {
      await createTournament(form, { Authorization: basicAuth || "" });
      setCreating(false);
      refresh();
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="grid">
      <div className="card">
        <h2>Tournaments</h2>
        {err && <p style={{color:"tomato"}}>Error: {err}</p>}
        {!err && !items.length && <p>No tournaments found.</p>}
        <div className="grid">
          {items.map(t => (
            <div key={t.id} className="card">
              <h3>{t.name}</h3>
              <p>{t.category} — {t.difficulty}</p>
              <p style={{opacity:.7}}>Start: {t.startDate} | End: {t.endDate}</p>
              <div style={{display:"flex", gap:8}}>
                <Link className="btn primary" to={`/play/${t.id}`}>Play</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h2>Admin Tools</h2>
          {isAuthenticated
            ? <button className="btn" onClick={logout}>Logout</button>
            : <p style={{opacity:.7}}>Sign in to create a tournament</p>
          }
        </div>

        {isAuthenticated && (
          <>
            {!creating && <button className="btn primary" onClick={()=>setCreating(true)}>Create Tournament</button>}
            {creating && (
              <div className="grid">
                <input className="input" placeholder="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
                <input className="input" placeholder="category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/>
                <input className="input" placeholder="difficulty" value={form.difficulty} onChange={e=>setForm({...form, difficulty:e.target.value})}/>
                <input className="input" placeholder="startDate" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})}/>
                <input className="input" placeholder="endDate" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})}/>
                <input className="input" type="number" placeholder="minPassingPercent" value={form.minPassingPercent}
                       onChange={e=>setForm({...form, minPassingPercent:Number(e.target.value)})}/>
                <label>
                  <input type="checkbox" checked={form.archived} onChange={e=>setForm({...form, archived:e.target.checked})}/>
                  {" "}Archived
                </label>
                <div style={{display:"flex", gap:8}}>
                  <button className="btn primary" onClick={onCreate}>Save</button>
                  <button className="btn" onClick={()=>setCreating(false)}>Cancel</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
