import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  
  const login = (username, password) => {
    const hardcodedUser = { username: "admin", password: "1234" };
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
      setUser({ username });
      localStorage.setItem("user", JSON.stringify({ username }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
