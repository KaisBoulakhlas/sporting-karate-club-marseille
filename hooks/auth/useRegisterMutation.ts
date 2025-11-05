"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/auth-better";

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  firstName: string;
}

interface RegisterResponse {
  user: User;
  message?: string;
}

export function useRegisterMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const mutate = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Erreur d'inscription";
        setError(errorMessage);
        return null;
      }

      const data: RegisterResponse = await response.json();

      // Auto redirect après inscription réussie
      router.push("/");
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
