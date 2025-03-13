"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AuthUser } from "@/types/Auth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  usersDb: AuthUser[];
  login: (email: string, password: string) => Promise<void>;
  registerUser: (newUser: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usersDb, setUsersDb] = useState<AuthUser[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      setUsersDb(storedUsers);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
  }, []);

  const registerUser = (newUser: AuthUser) => {
    const updatedUsers = [...usersDb, newUser];
    setUsersDb(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = async (email: string, password: string) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = storedUsers.find((u: AuthUser) => u.email === email);

    if (!foundUser) {
      throw new Error("User not found.");
    }

    if (foundUser.password !== password) {
      throw new Error("Incorrect password.");
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, usersDb, login, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
