"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Erreur de connexion";
        setError(errorMessage);
        return null;
      }

      const data: LoginResponse = await response.json();

      // Redirect based on user role
      const redirectUrl =
        data.user.role === "ADHERENT" ? "/" : "/back-office";

      router.push(redirectUrl);
      router.refresh();

      return data;
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
