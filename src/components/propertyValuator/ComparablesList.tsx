
import { ExternalLink } from "lucide-react";
import { ComparableProperty } from "@/services/propertyValuator";

interface ComparablesListProps {
  comparables: ComparableProperty[];
  formatCurrency: (amount: number) => string;
}

export function ComparablesList({ comparables, formatCurrency }: ComparablesListProps) {
  return (
    <div className="space-y-3 mt-6">
      {comparables.map((comparable, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
          <div>
            <p className="font-medium capitalize">{comparable.fuente}</p>
            <p className="text-sm text-gray-600">
              {comparable.superficie_m2}m² - {formatCurrency(comparable.precio_m2)}/m²
            </p>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-3">{formatCurrency(comparable.precio)}</span>
            <a 
              href={comparable.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 text-gray-600 hover:text-realestate-purple rounded-full hover:bg-gray-100"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
