"use client";

import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import Input from "@/components/UI/Input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createGalleryItem } from "@/actions/admin/actionsForm";
import {
  GalleryFormSchema,
  galleryItemSchema,
} from "@/app/schemas/galleryItemSchema";

type CloudinaryUploadResult = {
  info: {
    secure_url: string;
    resource_type: "image" | "video" | string;
  };
};

const GalleryItemForm = ({
  data,
  setOpen,
}: {
  data?: GalleryFormSchema;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register: formGallery,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<GalleryFormSchema>({
    resolver: zodResolver(galleryItemSchema),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fileSrc, setFileSrc] = useState("");
  const [fileType, setFileType] = useState<"image" | "video">();

  const handleUpload = (result: CloudinaryUploadResult) => {
    const { secure_url, resource_type } = result.info;

    if (resource_type === "image" || resource_type === "video") {
      setValue("type", resource_type);
      setValue("src", secure_url);
      trigger(["type", "src"]);
      setFileSrc(secure_url);
      setFileType(resource_type);
      toast.success("Fichier téléchargé avec succès !");
    } else {
      toast.error("Le fichier téléchargé n'est ni une image ni une vidéo.");
    }
  };

  const onSubmit = async (values: GalleryFormSchema) => {
    try {
      startTransition(() => {
        createGalleryItem(values)
          .then(async (data) => {
            if (data?.error) {
              toast.error(data?.error);
            } else {
              toast.success(
                `${
                  values.type === "image" ? "L'image" : "La vidéo"
                } a été upload!`
              );
              setOpen(false);
              router.refresh();
            }
          })
          .catch(() => {
            toast.error("An unexpected error occurred!");
          });
      });
    } catch (error) {
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="user-form__title">Ajouter une image ou une vidéo</h1>
      <div className="user-form__fields">
        <div className="user-form__containerField">
          <Input
            label="Titre"
            {...formGallery("title")}
            errorMessage={errors?.title?.message}
            clLabel="user-form__label"
          />
        </div>
        <div className="user-form__containerField">
          <div className="input-wrapper">
            <CldUploadWidget
              uploadPreset="sportingkarate"
              onSuccess={(result: any, { widget }) => {
                handleUpload(result);
                widget.close();
              }}>
              {({ open }) => (
                <div className="upload" onClick={() => open()}>
                  <Image
                    src="/images/upload.png"
                    alt="Upload placeholder"
                    width={28}
                    height={28}
                    className="upload__icon"
                  />
                  <span>
                    {fileSrc ? "Changer" : "Upload une image ou une vidéo"}
                  </span>
                </div>
              )}
            </CldUploadWidget>
            {errors.src && (
              <p className="user-form__error">{errors.src.message}</p>
            )}
            {fileSrc && (
              <div className="gallery-form__preview">
                {fileType === "image" ? (
                  <Image
                    src={fileSrc}
                    alt="Aperçu de l'image"
                    width={300}
                    height={200}
                    className="gallery-form__image-preview"
                  />
                ) : (
                  <video
                    src={fileSrc}
                    controls
                    className="gallery-form__video-preview">
                    Votre navigateur ne supporte pas la balise vidéo.
                  </video>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="user-form__button"
        disabled={isPending || !isValid}>
        {isPending ? "En cours..." : "Créer"}
      </button>
    </form>
  );
};

export default GalleryItemForm;
