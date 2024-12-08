"use client";

import React, { useTransition } from "react";
import ButtonComponent from "../UI/ButtonComponent";
import CheckBoxComponent from "../UI/CheckBoxComponent";
import Input from "../UI/Input";
import Title from "../UI/Title";
import { ContactFormDataClient } from "@/app/schemas/contactFormSchema";
import { submitContactForm } from "@/actions/contact";
import { toast } from "react-toastify";
import { useContactForm } from "@/hooks/useContactForm";

const Form = () => {
  const { register, handleSubmit, errors, reset, isValid } = useContactForm();

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ContactFormDataClient) => {
    startTransition(() => {
      submitContactForm(data)
        .then(async (data) => {
          if (data?.error) {
            reset();
            toast.error(data?.error);
          } else {
            toast.success("Formulaire envoyé avec succès !");
          }
        })
        .catch(() => {
          toast.error("An unexpected error occurred!");
        });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact__form">
      <Title title="Nous contacter ?" />
      <div className="contact__section">
        <Input
          id="firstName"
          label="Prénom*"
          type="text"
          {...register("firstName")}
          placeholder="Prénom"
          errorMessage={errors.firstName?.message}
        />
        <Input
          id="lastName"
          label="Nom*"
          type="text"
          {...register("lastName")}
          placeholder="Nom"
          errorMessage={errors.lastName?.message}
        />
      </div>

      <div className="contact__section">
        <Input
          id="email"
          label="Email*"
          type="email"
          {...register("email")}
          placeholder="example@example.com"
          errorMessage={errors.email?.message}
        />
        <Input
          id="phone"
          label="Téléphone"
          type="string"
          {...register("phone")}
          placeholder="Votre numéro"
          errorMessage={errors.phone?.message}
        />
      </div>

      <div className="contact__section">
        <Input
          id="description"
          label="Description*"
          isTextarea={true}
          {...register("description")}
          placeholder="Entrer votre description"
          errorMessage={errors.description?.message}
        />
      </div>

      <div className="contact__section">
        <CheckBoxComponent
          id="agree"
          label="J'accepte les termes et les conditions d'utilisation"
          {...register("agree")}
          className="text-checkbox"
          errorMessage={errors.agree?.message}
        />
      </div>

      <div className="contact__section">
        <ButtonComponent
          text={isPending ? "Envoi en cours..." : "Envoyer"}
          type="submit"
          className="pricing__button"
          disabled={isPending || !isValid}
        />
      </div>
    </form>
  );
};

export default Form;
