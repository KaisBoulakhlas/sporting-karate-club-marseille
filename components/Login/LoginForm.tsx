"use client";

import { LoginFormSchema } from "@/app/schemas/LoginSchema";
import FormWrapper from "../UI/FormWrapper";
import Title from "../UI/Title";
import ButtonComponent from "../UI/ButtonComponent";
import { useLoginForm } from "@/hooks/useLoginForm";
import { toast } from "react-toastify";
import Input from "../UI/Input";
import { useLoginMutation } from "@/hooks/auth/useLoginMutation";

export function LoginForm() {
  const { mutate: login, isLoading, error } = useLoginMutation();
  const { register, handleSubmit, errors, reset, isValid } = useLoginForm();

  const onSubmit = async (values: LoginFormSchema) => {
    const result = await login({
      email: values.email,
      password: values.password,
    });

    if (result) {
      reset();
      toast.success("Connexion réussie!");
    } else if (error) {
      toast.error(error);
    }
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
        text={isLoading ? "Connexion en cours..." : "Connexion"}
        type="submit"
        className="pricing__button"
        disabled={isLoading || !isValid}
        style={{ marginTop: "1rem" }}
      />
    </FormWrapper>
  );
}
