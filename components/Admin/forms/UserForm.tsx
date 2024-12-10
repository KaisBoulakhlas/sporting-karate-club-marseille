"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import {
  UserSchema,
  userSchema,
  UserUpdateSchema,
  userUpdateSchema,
} from "@/app/schemas/userFormSchema";
import Input from "@/components/UI/Input";
import { update, register } from "@/actions/admin/actionsForm";
import { UserRole } from "@prisma/client";
import Image from "next/image";

const UserForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update" | "delete";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const schema = type === "create" ? userSchema : userUpdateSchema;

  type FormType = typeof schema extends typeof userSchema
    ? UserSchema
    : UserUpdateSchema;

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      password: "",
    },
  });

  const [image, setImage] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (data?.image) {
      setImage(data.image);
    }
  }, [data]);

  const onSubmit = async (values: FormType) => {
    try {
      const payload = {
        ...values,
        image,
        ...(values.password ? { password: values.password } : {}),
      };
      startTransition(() => {
        if (type === "create") {
          register(payload as UserSchema)
            .then(async (data) => {
              if (data?.error) {
                toast.error(data?.error);
              } else {
                toast.success("L'utilisateur a bien été créé !");
                setOpen(false);
                router.refresh();
              }
            })
            .catch(() => {
              toast.error("An unexpected error occurred!");
            });
        } else {
          update(payload as UserUpdateSchema)
            .then(async (data) => {
              if (data?.error) {
                toast.error(data?.error);
              } else {
                toast.success("L'utilisateur a bien été modifié !");
                setOpen(false);
                router.refresh();
              }
            })
            .catch(() => {
              toast.error("An unexpected error occurred!");
            });
        }
      });
    } catch (error) {
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="user-form__title">
        {type === "create"
          ? "Créer un nouvel utilisateur"
          : "Mettre à jour un utilisateur"}
      </h1>
      <span className="user-form__subtitle">
        Information de l&apos;utilisateur
      </span>
      <div className="user-form__fields">
        <div className="user-form__containerField">
          <Input
            label="Prénom"
            clLabel="user-form__label"
            {...formRegister("firstName")}
            errorMessage={errors?.firstName?.message}
          />
          <Input
            label="Nom"
            clLabel="user-form__label"
            {...formRegister("name")}
            errorMessage={errors?.name?.message}
          />
        </div>
        <div className="user-form__containerField">
          <Input
            label="Email"
            clLabel="user-form__label"
            {...formRegister("email")}
            errorMessage={errors?.email?.message}
          />
          <Input
            label="Password"
            clLabel="user-form__label"
            type="password"
            {...formRegister("password")}
            errorMessage={errors?.password?.message}
          />
        </div>
        <div className="user-form__containerField">
          <div className="input-wrapper">
            <label className="user-form__label">Rôle</label>
            <select {...formRegister("role")} className="user-form__select">
              {Object.values(UserRole).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors?.role && (
              <span className="user-form__error">{errors.role.message}</span>
            )}
          </div>
          <div className="input-wrapper">
            <CldUploadWidget
              uploadPreset="sportingkarate"
              options={{
                folder: "users",
                resourceType: "image",
                clientAllowedFormats: ["png", "jpeg", "jpg"],
              }}
              onSuccess={(result: any, { widget }) => {
                setImage(result.info?.secure_url);
                widget.close();
              }}>
              {({ open }) => (
                <div className="upload" onClick={() => open()}>
                  {image ? (
                    <Image
                      src={image}
                      alt="Uploaded image"
                      width={28}
                      height={28}
                      className="upload__icon"
                    />
                  ) : (
                    <Image
                      src="/images/upload.png"
                      alt="Upload placeholder"
                      width={28}
                      height={28}
                      className="upload__icon"
                    />
                  )}
                  <span>{image ? "Changer la photo" : "Upload une image"}</span>
                </div>
              )}
            </CldUploadWidget>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="user-form__button"
        disabled={isPending || !isValid}>
        {type === "create"
          ? isPending
            ? "En cours..."
            : "Créer"
          : isPending
          ? "En cours..."
          : "Mettre à jour"}
      </button>
    </form>
  );
};

export default UserForm;
