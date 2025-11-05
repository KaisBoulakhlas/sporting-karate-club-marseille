"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
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
      const response = await signUp.email(payload);

      if (response.error) {
        setError(response.error.message || "Erreur d'inscription");
        return null;
      }

      if (response.data?.user) {
        // Auto redirect après inscription réussie
        router.push("/");
        router.refresh();

        return {
          user: response.data.user as User,
          message: "Inscription réussie",
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
