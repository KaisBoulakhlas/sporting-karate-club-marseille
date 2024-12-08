import React from "react";
import Link from "next/link";
import { links } from "@/constants/data";
import Logo from "../Header/Logo/Logo";
import RoleGate from "../Login/Role/RoleGate";

const SiteMap: React.FC = () => {
  return (
    <div className="footer__sitemap">
      <Logo />
      <ul>
        {links.map((item, index) => (
          <RoleGate key={item.title} allowedRoles={item.visible}>
            <li key={index}>
              <Link href={`/${item.link}`}>{item.title}</Link>
            </li>
          </RoleGate>
        ))}
      </ul>
    </div>
  );
};

export default SiteMap;
