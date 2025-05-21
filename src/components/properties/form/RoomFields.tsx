
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface RoomFieldsProps {
  control: Control<any>;
}

export function RoomFields({ control }: RoomFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="rooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Habitaciones*</FormLabel>
            <FormControl>
              <Input type="number" min="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Baños*</FormLabel>
            <FormControl>
              <Input type="number" min="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
