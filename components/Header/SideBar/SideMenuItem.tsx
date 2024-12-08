"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

type Links = {
  title: string;
  link?: string;
  onClick?: () => void;
  closeSidebar: () => void;
};

const SideMenuItem: React.FC<Links> = ({
  title,
  link,
  onClick,
  closeSidebar,
}) => {
  const pathname = usePathname();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    closeSidebar();
  };

  return (
    <motion.li
      className={`sidebar__link ${
        pathname === link ? "sidebar__link--active" : ""
      }`}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}>
      {link ? <Link href={link}>{title}</Link> : <span>{title}</span>}
    </motion.li>
  );
};

export default SideMenuItem;
