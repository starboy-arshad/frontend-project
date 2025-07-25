import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);

  const login = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);
    localStorage.setItem("jwt", jwt);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
  };
  return (
    <AuthContext.Provider value={{token, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
