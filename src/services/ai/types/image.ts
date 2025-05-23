
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

// Add missing types
export interface ImageProcessingOptions {
  image: File;
  editMode: string;
  roomType: string;
  decorStyle?: string;
}

export interface ProcessImageResult {
  imageUrl: string;
  editPlan: ImageEditPlan | null;
}

export interface ImageEditResponse {
  success: boolean;
  error_message?: string;
  edit_plan: ImageEditPlan | null;
}
