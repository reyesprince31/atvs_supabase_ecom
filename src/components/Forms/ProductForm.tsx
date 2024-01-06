import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ProductValidation } from "@/lib/validation";
import {
  useCreateProduct,
  useEditProduct,
  useGetCategory,
  useGetFlavors,
} from "@/lib/react-query/queries";

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
import { Dispatch } from "react";

interface PropsEdit {
  product_id?: number;
  product_name: string;
  description: string;
  category_name: string;
  flavor_name: string;
}

const ProductForm = ({
  editProduct,
  setShowForm,
}: {
  editProduct?: PropsEdit;
  setShowForm: Dispatch<boolean>;
}) => {
  const { mutate: createNewProduct, isPending: isCreating } =
    useCreateProduct();
  const { mutate: updateNewProduct, isPending: isEditing } = useEditProduct();
  const { data: flavors } = useGetFlavors();
  const { data: categories } = useGetCategory();

  console.log(editProduct);

  const isWorking = isCreating || isEditing;

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: editProduct
      ? {
          ...editProduct,
        }
      : {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProductValidation>) {
    // console.log(values);
    try {
      const { category_name, flavor_name, product_name, description } = values;

      const categoryId = categories?.find(
        (item) => item.category_name === category_name
      )?.category_id;

      const flavorId = flavors?.find(
        (item) => item.flavor_name === flavor_name
      )?.flavor_id;

      const newProduct = {
        product_name,
        description,
        flavor_id: flavorId,
        category_id: categoryId,
      };

      // console.log(newProduct);

      if (editProduct) {
        updateNewProduct({
          newProduct: { ...newProduct },
          id: editProduct.product_id,
        });

        setShowForm(false);
      } else {
        createNewProduct({ ...newProduct });
      }

      form.reset();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="product_name"
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
            name="flavor_name"
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
          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>

                <CategorySelect field={field} />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end gap-2">
            <Button type="submit" disabled={isWorking}>
              {editProduct ? "Update" : "Create"}
            </Button>
            <Button
              type="reset"
              variant="outline"
              onClick={() => setShowForm(false)}
              disabled={isWorking}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
