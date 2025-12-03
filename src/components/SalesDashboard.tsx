import type { ISalesResponse } from "@/lib/types";

import { FaDollarSign, FaCalendarAlt, FaChartLine, FaShoppingCart } from "react-icons/fa";
import DashboardCard from "./card/DashboardCard";





const SalesDashboard = ({ salesData }: { salesData: ISalesResponse }) => {
  const totalRevenue = salesData.results.TotalSales.reduce((acc, d) => acc + d.totalSale, 0);
  const daysInRange = salesData.results.TotalSales.length;
  const avgDailySales = daysInRange > 0 ? Math.round(totalRevenue / daysInRange) : 0;
  const salesOnPage = salesData.results.Sales.length;

  const cards = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <FaDollarSign />,
      iconColor: "text-yellow-400",
    },
    {
      title: "Days in Range",
      value: daysInRange,
      icon: <FaCalendarAlt />,
      iconColor: "text-blue-400",
    },
    {
      title: "Avg Daily Sales",
      value: `$${avgDailySales.toLocaleString()}`,
      icon: <FaChartLine />,
      iconColor: "text-green-400",
    },
    {
      title: "Sales on Page",
      value: salesOnPage,
      icon: <FaShoppingCart />,
      iconColor: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards?.map((card, index) => (
        <DashboardCard
          key={index}
          title={card?.title}
          value={card?.value}
          icon={card?.icon}
          iconColor={card?.iconColor}
        />
      ))}
    </div>
  );
};

export default SalesDashboard;
