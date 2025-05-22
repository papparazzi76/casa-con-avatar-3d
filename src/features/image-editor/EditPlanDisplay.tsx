
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageEditPlan } from "@/services/ai";

interface EditPlanDisplayProps {
  editPlan: ImageEditPlan;
  className?: string;
}

export const EditPlanDisplay = ({ editPlan, className = "" }: EditPlanDisplayProps) => {
  if (!editPlan || !editPlan.steps || editPlan.steps.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Plan de edición</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Resultado esperado:</h4>
          <p className="text-sm text-muted-foreground">{editPlan.expected_result}</p>
        </div>

        {editPlan.staging_style && (
          <div>
            <h4 className="font-medium mb-2">Estilo de diseño:</h4>
            <Badge variant="secondary">{editPlan.staging_style}</Badge>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2">Pasos de edición:</h4>
          <ol className="list-decimal pl-5 space-y-2">
            {editPlan.steps.map((step, index) => (
              <li key={index} className="text-sm">
                <span className="font-semibold">{step.tool}</span>: 
                <span className="text-muted-foreground">
                  {Object.entries(step.params)
                    .map(([key, value]) => ` ${key}: ${value}`)
                    .join(', ')}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
