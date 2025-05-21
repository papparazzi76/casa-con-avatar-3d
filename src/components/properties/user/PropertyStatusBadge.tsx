
import { Badge } from "@/components/ui/badge";

interface PropertyStatusBadgeProps {
  status: string;
}

export function PropertyStatusBadge({ status }: PropertyStatusBadgeProps) {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Activo</Badge>;
    case "sold":
      return <Badge variant="destructive">Vendido</Badge>;
    case "rented":
      return <Badge variant="destructive">Alquilado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
