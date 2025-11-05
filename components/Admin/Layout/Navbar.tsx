"use client";
import { useAuth } from "@/hooks/auth/useAuth";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="headerAdmin">
      <div className="headerAdmin__user-section">
        <div className="headerAdmin__user-info">
          <span className="headerAdmin__user-name">
            {user?.name}
          </span>
          <span className="headerAdmin__user-role">
            {user?.role}
          </span>
        </div>
        <Image
          src={(user?.image) || "/images/avatar.png"}
          alt="User avatar"
          width={36}
          height={36}
          className="headerAdmin__avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
