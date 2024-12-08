"use client";

import React, { useState, useEffect } from "react";
import { NavLinks, Logo, AuthLink, SideBar } from "@/components";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        console.log("trueeee");
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <Logo scrolled={scrolled} />
      <NavLinks scrolled={scrolled} />
      <AuthLink handleClick={handleClick} scrolled={scrolled} />
      <SideBar />
    </header>
  );
};

export default Header;
