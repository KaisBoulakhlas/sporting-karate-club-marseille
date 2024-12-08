import React from "react";
import Link from "next/link";

const FooterBottom: React.FC = () => {
  return (
    <div className="footer__bottom">
      <ul className="footer__bottom-links">
        <li>
          <Link href="/mentions-legales">Mentions légales</Link>
        </li>
        <li>
          <Link href="/politique-de-confidentialite">
            Politique de confidentialité
          </Link>
        </li>
      </ul>
      <p>© 2024 Sporting Karaté Club. Tous droits réservés.</p>
    </div>
  );
};

export default FooterBottom;
