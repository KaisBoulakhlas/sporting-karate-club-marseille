import Menu from "@/components/Admin/Layout/Menu";
import Navbar from "@/components/Admin/Layout/Navbar";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Espace d'administration",
  description: "L'espace d'administration de Sporting Karaté Club",
  robots: { index: false, follow: false },
};

export default function BackOfficeLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__sidebar">
        <Link href="/back-office" className="dashboard-layout__logo">
          <Image src="/images/logo.png" alt="logo" width={32} height={32} />
          <span className="dashboard-layout__logo-text">BACK-OFFICE</span>
        </Link>
        <Menu />
      </div>
      <div className="dashboard-layout__main">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
