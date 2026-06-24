"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
  plan: "free" | "pro" | "lifetime";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  subscribe: (plan: "pro" | "lifetime") => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showSubscribeModal: boolean;
  setShowSubscribeModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("promptvault_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("promptvault_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when changed
  useEffect(() => {
    if (user) {
      localStorage.setItem("promptvault_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("promptvault_user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500));
    
    // Check registered users
    const users = JSON.parse(localStorage.getItem("promptvault_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    
    if (found) {
      const userData: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        isSubscribed: found.isSubscribed || false,
        plan: found.plan || "free",
      };
      setUser(userData);
      setShowLoginModal(false);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500));
    
    // Check if already exists
    const users = JSON.parse(localStorage.getItem("promptvault_users") || "[]");
    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    
    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      isSubscribed: false,
      plan: "free",
    };
    users.push(newUser);
    localStorage.setItem("promptvault_users", JSON.stringify(users));
    
    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isSubscribed: false,
      plan: "free",
    };
    setUser(userData);
    setShowLoginModal(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("promptvault_user");
  };

  const subscribe = (plan: "pro" | "lifetime") => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      isSubscribed: true,
      plan: plan,
    };
    setUser(updatedUser);
    
    // Update in users list
    const users = JSON.parse(localStorage.getItem("promptvault_users") || "[]");
    const idx = users.findIndex((u: any) => u.id === user.id);
    if (idx >= 0) {
      users[idx].isSubscribed = true;
      users[idx].plan = plan;
      localStorage.setItem("promptvault_users", JSON.stringify(users));
    }
    
    setShowSubscribeModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        subscribe,
        showLoginModal,
        setShowLoginModal,
        showSubscribeModal,
        setShowSubscribeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
