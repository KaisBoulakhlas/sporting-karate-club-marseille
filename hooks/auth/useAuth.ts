"use client";

import { useEffect, useState } from "react";
import type { Session, User } from "@/lib/auth-better";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    session: null,
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const fetchSession = async () => {
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
    };

    fetchSession();
  }, []);

  return auth;
}
