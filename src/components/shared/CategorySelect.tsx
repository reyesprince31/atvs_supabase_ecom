import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategory } from "@/lib/react-query/queries";

interface CategorySelectProps {
  field: {
    onChange: (value: string) => void; // Assuming onChange takes a string argument
    value: string; // Assuming value is a string
  };
}

export function CategorySelect({ field }: CategorySelectProps) {
  const { data: getCategory, isLoading } = useGetCategory();

  if (isLoading) return;

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {getCategory?.map((item) => (
            <SelectItem key={item.category_id} value={item.category_name}>
              {item.category_name}
            </SelectItem>
          ))}

          <SelectSeparator />
          <SelectItem value="add">Add Category</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
