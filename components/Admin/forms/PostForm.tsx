"use client";

import React, { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import Input from "@/components/UI/Input";
import { postSchema, PostFormSchema } from "@/app/schemas/postFormSchema";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import { createPost, updatePost } from "@/actions/admin/actionsForm";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const PostForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register: formPost,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: data,
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [fileSrc, setFileSrc] = useState("");

  const onSubmit = async (values: PostFormSchema) => {
    try {
      const payload = {
        ...values,
      };

      startTransition(() => {
        if (type === "create") {
          createPost(payload)
            .then(async (data) => {
              if (data?.error) {
                toast.error(data?.error);
              } else {
                toast.success("L'article a bien été créé !");
                setOpen(false);
                router.refresh();
              }
            })
            .catch(() => {
              toast.error("An unexpected error occurred!");
            });
        } else {
          updatePost(payload)
            .then(async (data) => {
              if (data?.error) {
                toast.error(data?.error);
              } else {
                toast.success("L'article a bien été modifié !");
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

  useEffect(() => {
    if (data?.imageUrl) {
      setFileSrc(data.imageUrl);
    }
  }, [data]);

  console.log("IMAGE", isValid);
  console.log("values", getValues());
  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="user-form__title">
        {type === "create" ? "Créer un nouvel article" : "Modifier l'article"}
      </h1>
      <div className="user-form__fields">
        <div className="user-form__containerField">
          <Input
            label="Titre"
            {...formPost("title")}
            errorMessage={errors?.title?.message}
            clLabel="user-form__label"
          />
          <Input
            label="Description"
            {...formPost("summary")}
            clLabel="user-form__label"
            errorMessage={errors?.summary?.message}
          />
        </div>
        <div className="user-form__containerField">
          <div className="input-wrapper">
            <CldUploadWidget
              uploadPreset="sportingkarate"
              options={{
                folder: "articles",
                resourceType: "image",
                clientAllowedFormats: ["png", "jpeg", "jpg"],
              }}
              onSuccess={(result: any, { widget }) => {
                setFileSrc(result.info?.secure_url);
                setValue("imageUrl", result.info?.secure_url);
                trigger(["imageUrl"]);
                widget.close();
              }}>
              {({ open }) => (
                <div className="upload" onClick={() => open()}>
                  {fileSrc ? (
                    <Image
                      src={fileSrc}
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
                  <span>
                    {fileSrc ? "Changer la photo" : "Upload une image"}
                  </span>
                </div>
              )}
            </CldUploadWidget>
            {fileSrc && (
              <div className="gallery-form__preview">
                <Image
                  src={fileSrc}
                  alt="Aperçu de l'image"
                  width={100}
                  height={100}
                  className="gallery-form__image-preview"
                />
              </div>
            )}
            {errors.imageUrl && (
              <p className="user-form__error">{errors.imageUrl.message}</p>
            )}
          </div>
        </div>
        <div className="user-form__containerField">
          <ReactQuill
            value={getValues("content")}
            onChange={(value) => {
              const cleanedValue = value === "<p><br></p>" ? "" : value;
              setValue("content", cleanedValue, { shouldValidate: true });
            }}
            theme="snow"
            modules={modules}
          />
          {errors.content && (
            <p className="user-form__error">{errors.content.message}</p>
          )}
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

export default PostForm;
