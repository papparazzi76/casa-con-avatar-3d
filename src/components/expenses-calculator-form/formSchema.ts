
import { z } from "zod";

export const formSchema = z.object({
  propertyType: z.enum(["new", "used"]),
  propertyValue: z.number().min(1, "El valor debe ser mayor que 0"),
  userRole: z.enum(["buyer", "seller", "both"]),
  region: z.string().optional(),
  municipality: z.string().optional(),
  buyerAge: z.number().min(18).max(120).optional(),
  previousPurchaseYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
  previousPurchasePrice: z.number().min(1, "El valor debe ser mayor que 0").optional(),
  includeAgencyFees: z.boolean().default(false),
  includeLegalFees: z.boolean().default(false),
});

export type FormValues = z.infer<typeof formSchema>;

export interface ExpensesCalculatorFormProps {
  onCalculationComplete: (result: any) => void;
}
