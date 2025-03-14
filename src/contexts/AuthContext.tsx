"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthUser } from "@/types/Auth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (newUser: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredUsers = (): AuthUser[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("users") || "[]");
};

const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!getStoredUser()
  );

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async (email: string, password: string) => {
    const users = getStoredUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const registerUser = (newUser: AuthUser) => {
    const users = getStoredUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
