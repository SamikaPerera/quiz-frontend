import { createContext, useContext, useMemo, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // { username, role }
  const [creds, setCreds] = useState(null);   // { username, password }

  const login = (username, password) => {
    const role = username === "admin" ? "ADMIN" : "PLAYER";
    setUser({ username, role });
    setCreds({ username, password });
  };
  const logout = () => { setUser(null); setCreds(null); };

  const basicAuth = useMemo(() => {
    if (!creds) return null;
    return "Basic " + btoa(`${creds.username}:${creds.password}`);
  }, [creds]);

  return (
    <AuthCtx.Provider value={{
      user, isAuthenticated: !!user, basicAuth, login, logout
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() { return useContext(AuthCtx); }
