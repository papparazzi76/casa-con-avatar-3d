
import { useState } from "react";
import { ExpensesCalculatorForm } from "@/components/ExpensesCalculatorForm";
import { ExpensesCalculatorResult } from "@/components/ExpensesCalculatorResult";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CalculationResult } from "@/types/calculatorTypes";

const ExpensesCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculationComplete = (calculationResult: CalculationResult) => {
    setResult(calculationResult);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Calculadora de Gastos e Impuestos Inmobiliarios
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ExpensesCalculatorForm onCalculationComplete={handleCalculationComplete} />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
            {result ? (
              <ExpensesCalculatorResult result={result} />
            ) : (
              <p className="text-gray-500">
                Complete el formulario para ver el cálculo detallado de gastos e impuestos.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpensesCalculator;
