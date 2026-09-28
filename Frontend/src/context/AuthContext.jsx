import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("utube_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("utube_token"));

  useEffect(() => {
    if (user) localStorage.setItem("utube_user", JSON.stringify(user));
    else localStorage.removeItem("utube_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("utube_token", token);
    else localStorage.removeItem("utube_token");
  }, [token]);

  const login = (userData, authToken) => {
    const name = userData.displayName || userData.name || userData.username || "UTube User";
    const email = userData.email || "";
    const formatted = {
      id: userData.id,
      name,
      email,
      username: userData.username,
      handle: `@${(userData.username || name).toLowerCase().replace(/\s+/g, "")}`,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email || name)}`,
    };
    setUser(formatted);
    if (authToken) setToken(authToken);
    return formatted;
  };

  const register = async (userData) => {
    return login(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user && !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
