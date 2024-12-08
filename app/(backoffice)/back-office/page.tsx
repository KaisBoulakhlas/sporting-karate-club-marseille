export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div style={{ margin: "1rem", fontSize: "1.5rem" }}>
        Bienvenue sur l&apos;espace d&apos;administration de Sporting Club
        Karaté Marseille !
      </div>
    </>
  );
}
