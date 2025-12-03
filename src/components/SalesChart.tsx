import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import type { ITotalSale } from "@/lib/types";
import { TrendingUp } from "lucide-react";
import React from "react";

interface SalesChartProps {
  data: ITotalSale[];
}

const SalesChart = ({ data }: SalesChartProps) => {
  const chartData = data.map((item) => ({
    date: item.day,
    sales: item.totalSale,
    displayDate: new Date(item.day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Sales Over Time
          </CardTitle>
          <CardDescription>
            No data available for the selected date range
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Sales Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Total Sales",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="displayDate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value) => [
                      `$${Number(value).toLocaleString()}`,
                      "Sales",
                    ]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(SalesChart);

