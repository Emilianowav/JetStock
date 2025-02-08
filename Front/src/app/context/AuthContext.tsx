"use client";
import React, { createContext, useState, useEffect } from "react";

interface User {
  username: string;
  userType: "admin" | "operador";
}

interface AuthContextType {
  user: User | null;
  login: (username: string, userType: "admin" | "operador") => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null, // 🔴 Asegurar que no sea undefined
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
    }
  }, []);

  const login = (username: string, userType: "admin" | "operador") => {
    const newUser = { username, userType };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
