
export type EditMode = "enhancement" | "homestaging" | "mixto";
export type DecorStyle = "nórdico" | "moderno" | "rústico" | "contemporáneo" | "minimalista" | "industrial" | "mediterráneo" | "clásico";
export type RoomType = "cocina" | "baño" | "salon" | "dormitorio" | "oficina" | "exterior" | "otra";

export interface ImageEditorState {
  selectedImage: File | null;
  imagePreview: string | null;
  isProcessing: boolean;
  editedImage: string | null;
  editMode: EditMode;
  decorStyle: DecorStyle;
  roomType: RoomType;
}
