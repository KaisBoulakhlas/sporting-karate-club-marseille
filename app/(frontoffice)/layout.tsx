import { Header } from "@/components";
import Footer from "@/components/Footer/Footer";

export default function FrontOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
