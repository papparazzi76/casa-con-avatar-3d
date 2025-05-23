
export type EditMode = "enhancement" | "homestaging" | "mixto";
export type DecorStyle = "nórdico" | "moderno" | "rústico" | "contemporáneo" | "minimalista" | "industrial" | "mediterráneo" | "clásico" | "escandinavo";
export type RoomType = "cocina" | "bano" | "salon" | "dormitorio" | "oficina" | "exterior" | "otra";

export interface ImageEditorState {
  selectedImage: File | null;
  imagePreview: string | null;
  isProcessing: boolean;
  editedImage: string | null;
  editMode: EditMode;
  decorStyle: DecorStyle;
  roomType: RoomType;
}

export interface EditedImage {
  id: string;
  user_id: string;
  image_url: string;
  edit_mode: EditMode;
  room_type?: RoomType;
  decor_style?: DecorStyle;
  created_at: string;
}
