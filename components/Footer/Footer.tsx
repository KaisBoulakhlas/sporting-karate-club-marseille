import React from "react";
import SiteMap from "./SiteMap";
import ContactInfo from "./ContactInfo";
import FooterBottom from "./FooterBottom";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <SiteMap />
        <ContactInfo />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
