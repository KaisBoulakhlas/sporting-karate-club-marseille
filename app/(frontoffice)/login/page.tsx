import { LoginForm } from "@/components/Login/LoginForm";
import { LoginProtection } from "@/components/Auth/LoginProtection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Se connecter",
  description: "Page de connexion de notre site web.",
};

export default function LoginPage() {
  return (
    <LoginProtection>
      <Suspense>
        <main className="login">
          <LoginForm />
        </main>
      </Suspense>
    </LoginProtection>
  );
}
