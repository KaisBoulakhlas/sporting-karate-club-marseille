"use client";
import { LogoutButton } from "@/components/Login/LogoutButton";
import RoleGate from "@/components/Login/Role/RoleGate";
import { useCurrentRole } from "@/hooks/auth/useCurrentRole";
import { UserRole } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Menu: React.FC = () => {
  const userRole = useCurrentRole();
  const pathname = usePathname();

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/images/home.png",
          label: "Accueil",
          href: "/back-office",
          visible: [UserRole.PUBLISHER, UserRole.ADMIN],
        },
        {
          icon: "/images/profile.png",
          label: "Utilisateurs",
          href: "/back-office/users",
          visible: [UserRole.ADMIN],
        },
        {
          icon: "/images/lesson.png",
          label: "Articles",
          href: "/back-office/posts",
          visible: [UserRole.PUBLISHER, UserRole.ADMIN],
        },
        {
          icon: "/images/upload.png",
          label: "Gallerie",
          href: "/back-office/gallery",
          visible: [UserRole.ADMIN],
        },
      ],
    },
  ];

  return (
    <div className="menu">
      {menuItems.map((section) => (
        <div className="menu__section" key={section.title}>
          <span className="menu__section__title">{section.title}</span>
          {section.items.map((item) => (
            <RoleGate key={item.label} allowedRoles={item.visible}>
              <Link
                href={item.href}
                className={`menu__item ${
                  pathname === item.href ? "menu__item--active" : ""
                }`}>
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="menu__item__label">{item.label}</span>
              </Link>
            </RoleGate>
          ))}
        </div>
      ))}
      <LogoutButton className="menu__item">
        <Image src="/images/logout.png" alt="" width={20} height={20} />
        <span className="menu__item__label">Se déconnecter</span>
      </LogoutButton>
    </div>
  );
};

export default Menu;
