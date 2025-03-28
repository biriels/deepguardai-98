
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardMetrics() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$48,724.63",
      change: "+12.5%",
      positive: true,
    },
    {
      title: "Total Transactions",
      value: "1,482",
      change: "+8.2%",
      positive: true,
    },
    {
      title: "Average Transaction",
      value: "$32.88",
      change: "+2.4%",
      positive: true,
    },
    {
      title: "Conversion Rate",
      value: "3.42%",
      change: "-0.5%",
      positive: false,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center mt-1">
              <span
                className={`inline-flex items-center ${
                  metric.positive ? "text-green-600" : "text-red-600"
                } text-sm font-medium`}
              >
                {metric.positive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                {metric.change}
              </span>
              <span className="text-gray-500 text-xs ml-1.5">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
