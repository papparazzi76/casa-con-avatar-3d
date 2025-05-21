
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageEditPlan, ImageEditStep } from "@/utils/openaiService";
import { Badge } from "@/components/ui/badge";

interface EditPlanDisplayProps {
  editPlan: ImageEditPlan;
  className?: string;
}

export const EditPlanDisplay = ({ editPlan, className = "" }: EditPlanDisplayProps) => {
  if (!editPlan || !editPlan.steps || editPlan.steps.length === 0) {
    return null;
  }

  // Helper function to get color based on tool type
  const getToolColor = (tool: string): string => {
    const toolColors: Record<string, string> = {
      "exposure": "bg-yellow-100 text-yellow-800",
      "white_balance": "bg-blue-100 text-blue-800",
      "color_grade": "bg-purple-100 text-purple-800",
      "hdr": "bg-orange-100 text-orange-800",
      "denoise": "bg-green-100 text-green-800",
      "sharpen": "bg-indigo-100 text-indigo-800",
      "remove_objects": "bg-red-100 text-red-800",
      "add_furniture": "bg-teal-100 text-teal-800",
      "replace_floor": "bg-amber-100 text-amber-800",
    };

    return toolColors[tool] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Plan de edición</CardTitle>
        {editPlan.staging_style && (
          <Badge variant="outline" className="mt-1">
            Estilo: {editPlan.staging_style}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Resultado esperado:</h3>
            <p className="text-sm text-gray-600 italic">"{editPlan.expected_result}"</p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Pasos de edición:</h3>
            <ol className="space-y-2">
              {editPlan.steps.map((step: ImageEditStep, index: number) => (
                <li key={index} className="bg-muted rounded-md p-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-muted-foreground/20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <Badge className={getToolColor(step.tool)}>
                        {step.tool}
                      </Badge>
                    </div>
                    {Object.keys(step.params).length > 0 && (
                      <div className="ml-7 mt-1 text-xs">
                        <code className="bg-muted-foreground/10 rounded p-1 block whitespace-pre-wrap">
                          {JSON.stringify(step.params, null, 2)}
                        </code>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
