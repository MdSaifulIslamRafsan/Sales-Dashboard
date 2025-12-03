import React, { type JSX } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  iconColor?: string; // optional, default color
}
const DashboardCard = ({
  title,
  value,
  icon,
  iconColor = "text-white",
}: DashboardCardProps) => {
  return (
    <Card className="flex items-center justify-center gap-4 py-8">
      <div
        className={`${iconColor} flex items-center justify-center text-4xl`}
      >
        {icon}
      </div>
      <div className="text-center space-y-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </div>
    </Card>
  );
};

export default DashboardCard;
