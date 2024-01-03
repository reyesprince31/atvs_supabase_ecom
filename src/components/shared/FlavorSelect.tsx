import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetFlavors } from "@/lib/react-query/queries";
import { SelectSeparator } from "@radix-ui/react-select";
import { Button } from "../ui/button";

interface FlavorSelectProps {
  field: {
    onChange: (value: string) => void; // Assuming onChange takes a string argument
    value: string; // Assuming value is a string
  };
}

export function FlavorSelect({ field }: FlavorSelectProps) {
  const { data: getFlavor, isLoading } = useGetFlavors();

  if (isLoading) return;

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a flavor" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {getFlavor?.map((item) => (
            <SelectItem key={item.flavorid} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
