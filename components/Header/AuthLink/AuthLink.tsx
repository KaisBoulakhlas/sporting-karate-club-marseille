"use client";

import React from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/Login/LogoutButton";

const AuthLink: React.FC<{ handleClick: () => void; scrolled: boolean }> = ({
  handleClick,
  scrolled,
}) => {
  const session = useSession();

  return (
    <div className={`auth ${scrolled ? "auth--scrolled" : ""}`}>
      {session.data?.user ? (
        <LogoutButton>
          <span className="auth__link">Déconnexion</span>
        </LogoutButton>
      ) : (
        <Link href="/login" className="auth__link">
          Connexion
        </Link>
      )}

      {/* <FaBars className="auth__toggle" onClick={handleClick} /> */}
    </div>
  );
};

export default AuthLink;
