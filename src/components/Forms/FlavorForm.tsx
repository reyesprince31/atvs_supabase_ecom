import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlavorValidation } from "@/lib/validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateFlavor } from "@/lib/react-query/queries";
import FileUploader from "../shared/FileUploader";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// import { TFlavors } from "../shared/flavors/FlavorRow";

export default function FlavorForm() {
  const { mutateAsync: createFlavor, isPending, isSuccess } = useCreateFlavor();

  const form = useForm<z.z.infer<typeof FlavorValidation>>({
    resolver: zodResolver(FlavorValidation),
    defaultValues: {
      image_url: [],
      flavor_name: "",
      description: "",
      flavor_qty: "",
    },
  });

  function onSubmit(values: z.infer<typeof FlavorValidation>) {
    // console.log(values);

    const { flavor_qty } = values;
    try {
      const newFlavor = {
        ...values,

        flavor_qty: +flavor_qty,
      };

      createFlavor({ ...newFlavor });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create New Flavor</DialogTitle>
        <DialogDescription>
          Create new flavor to your data here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Url</FormLabel>
                <FormControl>
                  <FileUploader fieldChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flavor_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flavor name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flavor_qty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {!isSuccess && (
            <DialogClose>
              <Button type="submit" disabled={isPending}>
                Create
              </Button>
            </DialogClose>
          )}
        </form>
      </Form>
    </>
  );
}
