
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";

// Interfaces para procesamiento de imágenes
export interface ImageProcessingOptions {
  image: File;
  editMode: EditMode;
  roomType: RoomType;
  decorStyle?: DecorStyle;
}

export interface ImageEditStep {
  tool: string;
  params: Record<string, any>;
}

export interface ImageEditPlan {
  steps: ImageEditStep[];
  staging_style?: string;
  expected_result: string;
}

export interface ImageEditResponse {
  success: boolean;
  error_message: string;
  edit_plan: ImageEditPlan | null;
}

export interface ProcessImageResult {
  imageUrl: string;
  editPlan: ImageEditPlan | null;
}
