import React from "react";
import { FaPhone, FaRegEnvelope } from "react-icons/fa";

const ContactInfo: React.FC = () => {
  return (
    <div className="footer__contact">
      <h3>Nous contacter</h3>
      <span>
        <FaRegEnvelope />{" "}
        <a href="mailto:contact@sporting-karate.com">
          contact@sporting-karate.com
        </a>
      </span>
      <span>
        <FaPhone /> <a href="tel:+33123456789">+33 1 23 45 67 89</a>
      </span>
    </div>
  );
};

export default ContactInfo;
