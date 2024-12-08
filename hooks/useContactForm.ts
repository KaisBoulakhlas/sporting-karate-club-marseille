import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormDataClient,
  contactFormSchemaClient,
} from "@/app/schemas/contactFormSchema";

export const useContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormDataClient>({
    resolver: zodResolver(contactFormSchemaClient),
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
    isValid,
  };
};
