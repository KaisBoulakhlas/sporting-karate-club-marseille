"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const TableSearch = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const value = inputRef.current?.value || "";

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="table-search">
      <button
        type="button"
        onClick={handleSearch}
        className="table-search__button">
        <Image src="/images/search.png" alt="" width={14} height={14} />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Rechercher..."
        className="table-search__input"
      />
    </form>
  );
};

export default TableSearch;
