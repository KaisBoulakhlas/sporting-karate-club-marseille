"use client";

import React from "react";
import Image from "next/image";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: number;
  trendLabel?: string;
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  bgColor = "$brand-light",
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        {icon && (
          <div className="stat-card__icon">
            <Image src={icon} alt={title} width={24} height={24} />
          </div>
        )}
        <span className="stat-card__title">{title}</span>
      </div>
      <div className="stat-card__content">
        <p className="stat-card__value">{value}</p>
        {trend !== undefined && (
          <span className={`stat-card__trend ${trend >= 0 ? "stat-card__trend--up" : "stat-card__trend--down"}`}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      {trendLabel && <p className="stat-card__label">{trendLabel}</p>}
    </div>
  );
};

export default StatCard;
