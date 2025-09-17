import { api } from "./client";

// ✅ Public endpoints (no auth → no browser popup)
export function listPublicTournaments() {
  return api("/tournaments");
}
export function getQuestions(tournamentId) {
  return api(`/tournaments/${tournamentId}/questions`);
}

// 🔒 Admin endpoints (ONLY call after login, pass Authorization header)
export function listAdminTournaments(headers = {}) {
  return api("/admin/tournaments", { headers });
}
export function createTournament(payload, headers = {}) {
  return api("/admin/tournaments", { method: "POST", body: payload, headers });
}
