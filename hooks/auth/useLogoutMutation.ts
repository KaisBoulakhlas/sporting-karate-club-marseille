"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export function useLogoutMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const mutate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signOut();

      if (response.error) {
        setError(response.error.message || "Erreur de déconnexion");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(message);
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
