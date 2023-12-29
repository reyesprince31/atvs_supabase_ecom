import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CreateProductValidation } from "@/lib/validation";
import { useCreateProduct } from "@/lib/react-query/queries";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { FlavorSelect } from "../shared/FlavorSelect";
import { CategorySelect } from "../shared/CategorySelect";

const ProductForm = () => {
  const { mutate: createNewProduct, isPending } = useCreateProduct();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateProductValidation>>({
    resolver: zodResolver(CreateProductValidation),
    defaultValues: {
      productName: "",
      description: "",
      category: "",
      flavor: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateProductValidation>) {
    const newProduct = {
      productName: values.productName,
      description: values.description,
      categoryid: +values.category,
      flavorid: +values.flavor,
    };

    createNewProduct({
      ...newProduct,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productName"
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <CategorySelect field={field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flavor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flavor</FormLabel>
              <FormControl>
                <FlavorSelect field={field} />
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
