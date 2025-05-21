
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";

interface PriceRangeChartProps {
  priceMin: number;
  priceSuggested: number;
  priceMax: number;
  formatCurrency: (amount: number) => string;
}

export function PriceRangeChart({
  priceMin,
  priceSuggested,
  priceMax,
  formatCurrency
}: PriceRangeChartProps) {
  const priceRangeData = [
    {
      name: "Precio mínimo",
      valor: priceMin
    },
    {
      name: "Precio sugerido",
      valor: priceSuggested
    },
    {
      name: "Precio máximo",
      valor: priceMax
    }
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-realestate-purple">{formatCurrency(payload[0].value as number)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={150}
          data={priceRangeData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `${Math.round(value / 1000)}k`} 
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="valor" 
            fill="url(#colorGradient)" 
            barSize={60} 
            radius={[4, 4, 0, 0]} 
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a2be2" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#20b2aa" stopOpacity={0.8}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
