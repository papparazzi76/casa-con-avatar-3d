
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { ComparableProperty } from "@/services/propertyValuator";

interface ComparablesChartProps {
  comparablesData: Array<{
    name: string;
    precio: number;
    precio_m2: number;
    superficie: number;
    url: string;
  }>;
  suggestedPricePerM2: number;
}

export function ComparablesChart({ comparablesData, suggestedPricePerM2 }: ComparablesChartProps) {
  return (
    <div className="h-[280px] mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={comparablesData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            yAxisId="left"
            tickFormatter={(value) => `${value}€/m²`} 
            domain={['auto', 'auto']}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${Math.round(value / 1000)}k€`} 
            domain={['auto', 'auto']}
          />
          <Tooltip />
          <Legend />
          <ReferenceLine 
            yAxisId="left"
            y={suggestedPricePerM2} 
            stroke="#8a2be2"
            strokeDasharray="3 3"
            label={{ value: "Precio sugerido", position: "insideBottomRight", fill: "#8a2be2" }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="precio_m2" 
            stroke="#20b2aa" 
            name="Precio/m²"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="precio" 
            stroke="#8a2be2" 
            name="Precio total" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
