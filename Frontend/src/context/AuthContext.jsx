import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("utube_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("utube_token") || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("utube_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("utube_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("utube_token", token);
    } else {
      localStorage.removeItem("utube_token");
    }
  }, [token]);

  const login = (userData, authToken = "mock-jwt-token-12345") => {
    const formattedUser = {
      id: userData.id || 1,
      name: userData.name || userData.email?.split("@")[0] || "UTube User",
      email: userData.email || "user@utube.com",
      handle: `@${(userData.name || userData.email?.split("@")[0] || "user").toLowerCase().replace(/\s+/g, "")}`,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.email || "User")}`,
    };
    setUser(formattedUser);
    setToken(authToken);
    return formattedUser;
  };

  const register = (userData) => {
    return login(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("utube_user");
    localStorage.removeItem("utube_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
