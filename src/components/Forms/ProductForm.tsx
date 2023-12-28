import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { CreateProductValidation } from "@/lib/validation";
import { useCreateProduct } from "@/lib/react-query/queries";

const ProductForm = () => {
  const { mutate: createNewProduct, isPending } = useCreateProduct();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateProductValidation>>({
    resolver: zodResolver(CreateProductValidation),
    defaultValues: {
      model_name: "",
      puffs_count: "",
      supplier_price: "",
      regular_price: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateProductValidation>) {
    console.log(values);

    // createNewProduct({
    //   ...values,
    //   model_name,
    //   puffs_count: Number(puffs_count),
    //   supplier_price: Number(supplier_price),
    //   regular_price: Number(regular_price),
    // });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="model_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="puffs_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puffs</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplier_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regular_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regular Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
