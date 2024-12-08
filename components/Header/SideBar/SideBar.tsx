import Link from "next/link";
import React from "react";
import { NavLink, ToggleProps } from "@/types/types";
import { AiOutlineClose } from "react-icons/ai";
import { links } from "@/constants/data";
import { useCycle, motion } from "framer-motion";
import SideNavigation from "./SideNavigation";
import { MenuToggle } from "./MenuToggle";

const sidebar = {
  open: {
    clipPath: `circle(1000px at 0px 0px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(0px at 40px 53px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const SideBar: React.FC = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const closeSidebar = () => {
    if (isOpen) toggleOpen();
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      className="sidebar">
      <motion.div
        className="sidebar__background"
        variants={sidebar}
        onClick={closeSidebar}
      />
      <SideNavigation closeSidebar={closeSidebar} />
      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default SideBar;
