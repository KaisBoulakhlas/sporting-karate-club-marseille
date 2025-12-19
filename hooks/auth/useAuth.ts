"use client";

import { useEffect, useState, useCallback } from "react";
import type { Session, User } from "@/lib/auth-better";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Simple event emitter to notify all useAuth hooks of changes
const authChangeListeners: Set<() => void> = new Set();

export function notifyAuthChange() {
  authChangeListeners.forEach(listener => listener());
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    session: null,
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/get-session");
      if (response.ok) {
        const data = await response.json();
        setAuth({
          session: data,
          user: data?.user || null,
          isLoading: false,
          isAuthenticated: !!data?.user,
        });
      } else {
        setAuth({
          session: null,
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setAuth({
        session: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    // Fetch session on mount
    fetchSession();

    // Listen for auth changes (e.g., logout)
    const handleAuthChange = () => {
      fetchSession();
    };

    authChangeListeners.add(handleAuthChange);

    return () => {
      authChangeListeners.delete(handleAuthChange);
    };
  }, [fetchSession]);

  return auth;
}
