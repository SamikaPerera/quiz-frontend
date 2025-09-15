import { api } from "./client";

// During dev we call admin endpoints (they’re protected):
export function listTournaments(headers = {}) {
  return api("/admin/tournaments", { headers });
}
export function createTournament(payload, headers = {}) {
  return api("/admin/tournaments", { method: "POST", body: payload, headers });
}
