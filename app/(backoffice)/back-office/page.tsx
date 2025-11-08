"use client";

import StatCard from "@/components/Admin/StatCard";

export default function Home() {
  // Mock data - replace with real data from your API
  const stats = [
    {
      title: "Total Clients",
      value: "124",
      icon: "/images/profile.png",
      trend: 12,
      trendLabel: "vs last month",
    },
    {
      title: "Members",
      value: "65",
      icon: "/images/profile.png",
      trend: 8,
      trendLabel: "active members",
    },
    {
      title: "New/Returning",
      value: "23/102",
      icon: "/images/lesson.png",
      trend: 5,
      trendLabel: "new registrations",
    },
    {
      title: "Active Members",
      value: "9 now",
      icon: "/images/home.png",
      trend: 3,
      trendLabel: "this month",
    },
  ];

  return (
    <div className="admin-content">
      <h1 className="admin-page-title">Tableau de bord</h1>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="admin-welcome">
        <h2>Bienvenue sur l&apos;espace d&apos;administration</h2>
        <p>Bienvenue sur l&apos;espace d&apos;administration de Sporting Club Karaté Marseille !</p>
        <p>Utilisez le menu latéral pour naviguer vers les sections de gestion.</p>
      </div>
    </div>
  );
}
