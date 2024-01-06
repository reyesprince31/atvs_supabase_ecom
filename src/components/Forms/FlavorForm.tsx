import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FlavorValidation } from "@/lib/validation";
import { TFlavors } from "../shared/flavors/FlavorRow";

export default function FlavorForm({ data }: { data: TFlavors }) {
  const form = useForm<z.z.infer<typeof FlavorValidation>>({
    resolver: zodResolver(FlavorValidation),
    defaultValues: data ? data : {},
  });

  console.log(data);

  function onSubmit(values: z.infer<typeof FlavorValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flavor</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
