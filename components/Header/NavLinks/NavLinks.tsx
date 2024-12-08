"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types/types";
import { links } from "@/constants/data";
import RoleGate from "@/components/Login/Role/RoleGate";

const NavLinks: React.FC<{ scrolled: boolean }> = ({ scrolled }) => {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav__links">
        {links?.map((item: NavLink) => (
          <RoleGate key={item.title} allowedRoles={item.visible}>
            <Link
              className={`nav__link ${
                pathname === item.link ? "nav__link--active" : ""
              } ${scrolled ? "nav__link--scrolled" : ""}`}
              key={item.title}
              href={item.link}>
              {item.title}
            </Link>
          </RoleGate>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
