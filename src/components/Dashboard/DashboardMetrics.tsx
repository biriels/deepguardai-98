
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Edit2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function DashboardMetrics() {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState([
    {
      title: "Total Revenue",
      value: "$48,724.63",
      change: "+12.5%",
      positive: true,
      editing: false,
      tempValue: "$48,724.63",
    },
    {
      title: "Total Transactions",
      value: "1,482",
      change: "+8.2%",
      positive: true,
      editing: false,
      tempValue: "1,482",
    },
    {
      title: "Average Transaction",
      value: "$32.88",
      change: "+2.4%",
      positive: true,
      editing: false,
      tempValue: "$32.88",
    },
    {
      title: "Conversion Rate",
      value: "3.42%",
      change: "-0.5%",
      positive: false,
      editing: false,
      tempValue: "3.42%",
    },
  ]);

  const handleEditToggle = (index: number) => {
    const newMetrics = [...metrics];
    newMetrics[index].editing = !newMetrics[index].editing;
    if (newMetrics[index].editing) {
      newMetrics[index].tempValue = newMetrics[index].value;
    }
    setMetrics(newMetrics);
  };

  const handleValueChange = (index: number, value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index].tempValue = value;
    setMetrics(newMetrics);
  };

  const handleSaveValue = (index: number) => {
    const newMetrics = [...metrics];
    newMetrics[index].value = newMetrics[index].tempValue;
    newMetrics[index].editing = false;
    setMetrics(newMetrics);

    toast({
      title: "Metric Updated",
      description: `${newMetrics[index].title} has been updated to ${newMetrics[index].value}`,
    });
  };

  const randomizeMetrics = () => {
    const randomizeValue = (isPercentage = false, isDollar = false) => {
      const baseValue = Math.random() * 100;
      if (isPercentage) {
        return `${baseValue.toFixed(2)}%`;
      } else if (isDollar) {
        return `$${(baseValue * 1000).toFixed(2)}`;
      }
      return `${Math.round(baseValue * 100)}`;
    };

    const newMetrics = metrics.map(metric => {
      const isPercentage = metric.value.includes("%");
      const isDollar = metric.value.includes("$");
      
      const randomValue = randomizeValue(isPercentage, isDollar);
      const randomChange = `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 10).toFixed(1)}%`;
      const isPositive = randomChange.startsWith("+");
      
      return {
        ...metric,
        value: randomValue,
        change: randomChange,
        positive: isPositive,
        editing: false,
        tempValue: randomValue
      };
    });

    setMetrics(newMetrics);
    
    toast({
      title: "Metrics Refreshed",
      description: "All metrics have been updated with new data",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" variant="outline" onClick={randomizeMetrics}>
          Refresh Metrics
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={metric.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6" 
                onClick={() => metric.editing ? handleSaveValue(index) : handleEditToggle(index)}
              >
                {metric.editing ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {metric.editing ? (
                <Input 
                  value={metric.tempValue} 
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  className="text-xl font-bold h-8 py-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveValue(index);
                    }
                  }}
                />
              ) : (
                <div className="text-2xl font-bold">{metric.value}</div>
              )}
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
    </div>
  );
}
