"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/auth/useAuth";
import { useLogoutMutation } from "@/hooks/auth/useLogoutMutation";
import { UserRole } from "@prisma/client";
import SideMenuItem from "./SideMenuItem";
import RoleGate from "@/components/Login/Role/RoleGate";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const SideNavigation = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const { isAuthenticated } = useAuth();
  const { mutate: logout } = useLogoutMutation();

  const links = [
    { title: "Blog", link: "/blog", visible: [] },
    { title: "Gallerie", link: "/gallerie", visible: [] },
    { title: "Cours", link: "/cours", visible: [] },
    { title: "Contact", link: "/contact", visible: [] },
    ...(isAuthenticated
      ? [
          {
            title: "Back-office",
            link: "/back-office",
            visible: [UserRole.ADMIN, UserRole.PUBLISHER],
          },
          {
            title: "Déconnexion",
            onClick: async () => {
              await logout();
            },
            visible: [],
          },
        ]
      : [{ title: "Connexion", link: "/login", visible: [] }]),
  ];

  return (
    <motion.ul className="sidebar__links" variants={variants}>
      {links.map((item) => (
        <RoleGate key={item.title} allowedRoles={item.visible}>
          <SideMenuItem
            {...item}
            key={item.title}
            closeSidebar={closeSidebar}
          />
        </RoleGate>
      ))}
    </motion.ul>
  );
};

export default SideNavigation;
