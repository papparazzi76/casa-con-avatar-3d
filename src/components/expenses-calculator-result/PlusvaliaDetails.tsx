
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlusvaliaDetailsProps {
  details: string;
}

export function PlusvaliaDetails({ details }: PlusvaliaDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Desglose de la Plusvalía Municipal</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{details}</p>
      </CardContent>
    </Card>
  );
}
