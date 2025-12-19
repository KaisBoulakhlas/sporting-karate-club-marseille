"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import UserForm from "../forms/UserForm";
import {
  deleteGalleryItem,
  deletePost,
  deleteUser,
} from "@/actions/admin/actionsForm";
import { useRouter } from "next/navigation";
import PostForm from "../forms/PostForm";
import GalleryItemForm from "../forms/GalleryItemForm";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

interface FormModalProps {
  table: "user" | "post" | "gallery";
  type: "create" | "update" | "delete";
  data?: any;
}

const FormModal: React.FC<FormModalProps> = ({ table, type, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleDelete = async (item?: any) => {
    if (!item?.id) {
      toast.error("Id invalide.");
      return;
    }
    setIsPending(true);
    try {
      let response;

      if (table === "user") {
        response = await deleteUser(item);
        if (response?.error) {
          toast.error(response.error);
          setIsOpen(false);
          return;
        }
        toast.success("Utilisateur supprimé avec succès !");
      } else if (table === "post") {
        response = await deletePost(item);
        if (response?.error) {
          toast.error(response.error);
          setIsOpen(false);
          return;
        }
        toast.success("Article supprimé avec succès !");
      } else if (table === "gallery") {
        response = await deleteGalleryItem(item);
        if (response?.error) {
          toast.error(response.error);
          setIsOpen(false);
          return;
        }
        toast.success("Item supprimé avec succès !");
      } else {
        toast.error("Suppression non supportée pour cette table !");
        return;
      }

      setIsOpen(false);

      // Get current page from URL
      const params = new URLSearchParams(window.location.search);
      const currentPage = parseInt(params.get("page") || "1");

      // Check if we need to go back to previous page
      // This will happen after deletion when the current page might be empty
      if (currentPage > 1) {
        // Go back to previous page first, then let router.refresh handle showing correct data
        router.push(`${window.location.pathname}?page=${currentPage - 1}`);
      } else {
        router.refresh();
      }
    } catch (error) {
      setIsOpen(false);
      console.error("Erreur lors de la suppression :", error);
      toast.error("Une erreur est survenue lors de la suppression.");
    } finally {
      setIsPending(false);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "delete":
        return (
          <div className="form-modal__delete">
            <p>Êtes-vous sûre de supprimer cet élément?</p>
            <div className="form-modal__actions">
              <button
                onClick={() => handleDelete(data)}
                disabled={isPending}
                className="form-modal__button form-modal__button--confirm">
                {isPending ? "Suppression en cours..." : "Confirmer"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="form-modal__button form-modal__button--cancel">
                Annuler
              </button>
            </div>
          </div>
        );
      case "create":
      case "update":
        switch (table) {
          case "user":
            return <UserForm type={type} data={data} setOpen={setIsOpen} />;
          case "post":
            return <PostForm type={type} data={data} setOpen={setIsOpen} />;
          case "gallery":
            return <GalleryItemForm data={data} setOpen={setIsOpen} />;
          default:
            return <div>Table invalide</div>;
        }
      default:
        return <div>Action invalide</div>;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`form-modal__trigger ${
          type === "create"
            ? "form-modal__trigger--add"
            : type === "update"
            ? "form-modal__trigger--edit"
            : "form-modal__trigger--delete"
        }`}>
        {type === "create" && <FaPlus />}
        {type === "update" && <FaEdit />}
        {type === "delete" && <FaTrash />}
      </button>

      {isOpen && (
        <div className="form-modal">
          <div
            className="form-modal__backdrop"
            onClick={() => setIsOpen(false)}
          />
          <div className="form-modal__content">
            <h2 className="form-modal__title">
              {type === "create"
                ? `Créer`
                : type === "update"
                ? `Mettre à jour`
                : `Voulez-vous supprimer ?`}
            </h2>
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
