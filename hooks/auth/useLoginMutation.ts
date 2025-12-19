"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import type { User } from "@/lib/auth-better";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  message?: string;
}

export function useLoginMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const mutate = async (payload: LoginPayload): Promise<LoginResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn.email(payload);

      if (response.error) {
        setError(response.error.message || "Erreur de connexion");
        return null;
      }

      if (response.data?.user) {
        let user = response.data.user as any;

        await new Promise(resolve => setTimeout(resolve, 300));

        try {
          const sessionResponse = await fetch("/api/auth/get-session");
          if (sessionResponse.ok) {
            const sessionData = await sessionResponse.json();
            if (sessionData?.user?.role) {
              user = sessionData.user;
            }
          }
        } catch (e) {
        }

        if (user?.role === "ADHERENT") {
          window.location.href = "/";
        } else {
          router.replace("/back-office");
        }

        return {
          user: user as User,
          message: "Connexion réussie",
        };
      }

      return null;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
  };
}
