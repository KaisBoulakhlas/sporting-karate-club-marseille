import { LoginForm } from "@/components/Login/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <main className="login">
        <LoginForm />
      </main>
    </Suspense>
  );
}
