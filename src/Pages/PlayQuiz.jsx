import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

/** Mock: replace with real GET /api/tournaments/{id}/questions when available */
function useMockQuestions(tournamentId) {
  return useMemo(() => ([
    { id: 1, text: `Q1 for tournament ${tournamentId}`, options: [
      { id: 11, text: "Option A", correct: true },
      { id: 12, text: "Option B", correct: false },
      { id: 13, text: "Option C", correct: false },
      { id: 14, text: "Option D", correct: false },
    ]},
    { id: 2, text: "Q2: 2 + 2 = ?", options: [
      { id: 21, text: "3", correct: false },
      { id: 22, text: "4", correct: true },
      { id: 23, text: "22", correct: false },
      { id: 24, text: "5", correct: false },
    ]},
  ]), [tournamentId]);
}

export default function PlayQuiz() {
  const { tournamentId } = useParams();
  const questions = useMockQuestions(tournamentId);
  const [answers, setAnswers] = useState({});
  const nav = useNavigate();

  function select(qid, oid) {
    setAnswers(a => ({ ...a, [qid]: oid }));
  }

  function submit() {
    let score = 0;
    questions.forEach(q => {
      const picked = answers[q.id];
      const ok = q.options.find(o => o.id === picked)?.correct;
      if (ok) score += 1;
    });
    nav("/results", { state: { score, total: questions.length } });
  }

  return (
    <div className="grid">
      <div className="card">
        <h2>Play Quiz — Tournament #{tournamentId}</h2>
        {questions.map(q => (
          <div key={q.id} className="card">
            <strong>{q.text}</strong>
            <div style={{display:"grid", gap:8, marginTop:8}}>
              {q.options.map(o => {
                const selected = answers[q.id] === o.id;
                return (
                  <button
                    key={o.id}
                    className={"btn " + (selected ? "primary" : "")}
                    onClick={() => select(q.id, o.id)}
                  >
                    {o.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <button className="btn primary" onClick={submit}>Submit Answers</button>
      </div>
    </div>
  );
}
