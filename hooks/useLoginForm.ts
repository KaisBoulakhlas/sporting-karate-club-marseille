import { LoginFormSchema, LoginSchema } from '@/app/schemas/LoginSchema';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
    isValid
  };
};
