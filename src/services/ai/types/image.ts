
export interface ImageEditStep {
  tool: string;
  params: Record<string, string | number>;
}

export interface ImageEditPlan {
  description: string;
  expected_result?: string;
  staging_style?: string;
  steps: ImageEditStep[];
}
