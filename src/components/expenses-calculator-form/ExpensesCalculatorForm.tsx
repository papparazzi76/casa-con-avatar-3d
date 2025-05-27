
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateExpenses } from "@/services/expensesCalculatorService";
import { CalculatorRequest } from "@/types/calculatorTypes";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { formSchema, FormValues, ExpensesCalculatorFormProps } from "./formSchema";
import { UserRoleField } from "./UserRoleField";
import { PropertyTypeField } from "./PropertyTypeField";
import { PropertyValueField } from "./PropertyValueField";
import { RegionField } from "./RegionField";
import { BuyerAgeField } from "./BuyerAgeField";
import { SellerFieldsSection } from "./SellerFieldsSection";
import { FeesSection } from "./FeesSection";

export function ExpensesCalculatorForm({
  onCalculationComplete,
}: ExpensesCalculatorFormProps) {
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "used",
      userRole: "buyer",
      propertyValue: undefined,
      region: "",
      municipality: "",
      buyerAge: undefined,
      previousPurchaseYear: new Date().getFullYear() - 5,
      previousPurchasePrice: undefined,
      includeAgencyFees: false,
      includeLegalFees: false,
    },
  });

  const propertyType = form.watch("propertyType");
  const userRole = form.watch("userRole");

  const onSubmit = async (data: FormValues) => {
    try {
      setIsCalculating(true);
      
      // Prepare the request data
      const request: CalculatorRequest = {
        propertyType: data.propertyType,
        propertyValue: data.propertyValue,
        userRole: data.userRole,
        includeAgencyFees: data.includeAgencyFees,
        includeLegalFees: data.includeLegalFees,
      };
      
      // Add region and buyer age for ITP calculations
      if (data.region) {
        request.region = data.region;
      }
      
      if (data.buyerAge && (data.userRole === 'buyer' || data.userRole === 'both')) {
        request.buyerAge = data.buyerAge;
      }
      
      // Only add plusvalía fields if they're filled and relevant
      if (data.municipality && (data.userRole === 'seller' || data.userRole === 'both') && data.propertyType === 'used') {
        request.municipality = data.municipality;
        
        if (data.previousPurchaseYear && data.previousPurchasePrice) {
          request.previousPurchaseYear = data.previousPurchaseYear;
          request.previousPurchasePrice = data.previousPurchasePrice;
        }
      }
      
      const result = await calculateExpenses(request);
      onCalculationComplete(result);
    } catch (error: any) {
      console.error("Error en el cálculo:", error);
      toast.error(error.message || "Ha ocurrido un error al realizar el cálculo");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UserRoleField form={form} />
        <PropertyTypeField form={form} />
        <PropertyValueField form={form} />

        {/* Region selection for ITP calculations */}
        {(userRole === 'buyer' || userRole === 'both') && propertyType === 'used' && (
          <RegionField form={form} />
        )}

        {/* Buyer age for ITP reductions */}
        {(userRole === 'buyer' || userRole === 'both') && (
          <BuyerAgeField form={form} />
        )}
        
        <Separator />

        {/* Seller fields section */}
        {(userRole === 'seller' || userRole === 'both') && (
          <SellerFieldsSection form={form} />
        )}

        <Separator />

        <FeesSection form={form} />

        <Button type="submit" className="w-full" disabled={isCalculating}>
          {isCalculating ? "Calculando..." : "Calcular gastos e impuestos"}
        </Button>
      </form>
    </Form>
  );
}
