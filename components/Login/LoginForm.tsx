"use client";

import { useTransition } from "react";
import { LoginFormSchema } from "@/app/schemas/LoginSchema";
import { login } from "@/actions/login";
import FormWrapper from "../UI/FormWrapper";
import Title from "../UI/Title";
import ButtonComponent from "../UI/ButtonComponent";
import { useLoginForm } from "@/hooks/useLoginForm";
import { toast } from "react-toastify";
import Input from "../UI/Input";
import { useSession } from "next-auth/react";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const { register, handleSubmit, errors, reset, isValid } = useLoginForm();
  const onSubmit = (values: LoginFormSchema) => {
    startTransition(() => {
      login(values)
        .then(async (data) => {
          if (data?.error) {
            reset();
            toast.error(data?.error);
          } else {
            await update();
            toast.success("Connexion réussie!");
          }
        })
        .catch(() => {
          reset();
          toast.error("Erreur lors de la connexion.");
        });
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} className="login__form">
      <Title title="Se connecter" />
      <Input
        id="email"
        label="Email*"
        type="text"
        {...register("email")}
        placeholder="example@example.com"
        errorMessage={errors.email?.message}
      />
      <Input
        id="password"
        label="Mot de passe*"
        type="password"
        {...register("password")}
        errorMessage={errors.password?.message}
      />

      <ButtonComponent
        text={isPending ? "Connexion en cours..." : "Connexion"}
        type="submit"
        className="pricing__button"
        disabled={isPending || !isValid}
        style={{ marginTop: "1rem" }}
      />
    </FormWrapper>
  );
}
