
import { formatCurrency } from "./formatters";

interface ResultRowProps {
  label: string;
  amount: number;
  explanation?: string;
}

export function ResultRow({ label, amount, explanation }: ResultRowProps) {
  return (
    <div className="flex flex-col py-2">
      <div className="flex justify-between">
        <span>{label}</span>
        <span className="font-medium">{formatCurrency(amount)}</span>
      </div>
      {explanation && (
        <div className="text-xs text-gray-600 mt-1 ml-0">
          {explanation}
        </div>
      )}
    </div>
  );
}
