"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="headerAdmin">
      <div className="headerAdmin__user-section">
        <div className="headerAdmin__user-info">
          <span className="headerAdmin__user-name">
            {session && session.data?.user.name}
          </span>
          <span className="headerAdmin__user-role">
            {session && session.data?.user.role}
          </span>
        </div>
        <Image
          src={(session && session.data?.user.image) || "/images/avatar.png"}
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
