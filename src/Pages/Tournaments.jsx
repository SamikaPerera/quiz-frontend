import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { listPublicTournaments, listAdminTournaments, createTournament } from "../api/tournaments.js";
import { Link } from "react-router-dom";

export default function Tournaments() {
  const { basicAuth, isAuthenticated, logout, user } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "General Knowledge",
    category: "9",
    difficulty: "easy",
    startDate: "2025-09-20T10:00:00",
    endDate: "2025-09-21T10:00:00",
    minPassingPercent: 60,
    archived: false,
  });

  async function refresh() {
    setErr("");
    try {
      // ✅ PUBLIC list by default (no popup)
      const data = await listPublicTournaments();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) { setErr(e.message); }
  }
  useEffect(() => { refresh(); }, []);

  async function onCreate() {
    try {
      await createTournament(form, { Authorization: basicAuth || "" });
      setCreating(false);
      // Optional: show admin view after create
      const adminList = await listAdminTournaments({ Authorization: basicAuth || "" });
      setItems(Array.isArray(adminList) ? adminList : []);
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="page grid">
      <div className="card">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h2>Tournaments</h2>
          {isAuthenticated
            ? <div className="muted">Signed in as <b>{user?.username}</b> <button className="btn" onClick={logout}>Logout</button></div>
            : <Link className="btn" to="/login">Admin Sign in</Link>}
        </div>

        {err && <p style={{color:"tomato"}}>Error: {err}</p>}
        {!err && !items.length && <p>No tournaments found.</p>}
        <div className="grid">
          {items.map(t => (
            <div key={t.id} className="card">
              <h3>{t.name}</h3>
              <p>{t.category} — {t.difficulty}</p>
              <p className="muted">Start: {t.startDate} | End: {t.endDate}</p>
              <div style={{display:"flex", gap:8}}>
                <Link className="btn primary" to={`/play/${t.id}`}>Play</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAuthenticated && (
        <div className="card">
          <h2>Admin • Create Tournament</h2>
          {!creating && <button className="btn primary" onClick={()=>setCreating(true)}>New Tournament</button>}
          {creating && (
            <div className="grid">
              <input className="input" placeholder="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
              <input className="input" placeholder="category id (OpenTDB e.g. 9)" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/>
              <input className="input" placeholder="difficulty (easy|medium|hard)" value={form.difficulty} onChange={e=>setForm({...form, difficulty:e.target.value})}/>
              <input className="input" placeholder="startDate" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})}/>
              <input className="input" placeholder="endDate" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})}/>
              <input className="input" type="number" placeholder="minPassingPercent" value={form.minPassingPercent} onChange={e=>setForm({...form, minPassingPercent:Number(e.target.value)})}/>
              <label><input type="checkbox" checked={form.archived} onChange={e=>setForm({...form, archived:e.target.checked})}/> Archived</label>
              <div style={{display:"flex", gap:8}}>
                <button className="btn primary" onClick={onCreate}>Save</button>
                <button className="btn" onClick={()=>setCreating(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
