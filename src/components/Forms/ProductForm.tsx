import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CreateProductValidation } from "@/lib/validation";
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
  product: { productid?: number; productName: string; description: string };
  category: { categoryName?: string };
  flavor: { name: string };
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

  const isWorking = isCreating || isEditing;

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateProductValidation>>({
    resolver: zodResolver(CreateProductValidation),
    defaultValues: {
      productName: editProduct ? editProduct.product.productName : "",
      description: editProduct ? editProduct.product.description : "",
      category: editProduct?.category?.categoryName
        ? editProduct.category.categoryName
        : "",
      flavor: editProduct?.flavor?.name ? editProduct.flavor.name : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateProductValidation>) {
    try {
      const foundCategory = categories?.find(
        (item) => item.categoryName === values.category
      );

      const foundFlavor = flavors?.find((item) => item.name === values.flavor);

      const newProduct = {
        productName: values.productName,
        description: values.description,
        categoryid: values.category ? foundCategory.id : undefined,
        flavorid: values.flavor ? foundFlavor.flavorid : undefined,
      };

      if (editProduct) {
        updateNewProduct({
          newProduct: { ...newProduct },
          id: editProduct.product.productid,
        });

        setShowForm(false);
      } else {
        createNewProduct({
          ...newProduct,
        });

        setShowForm(false);
      }
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
          <Button type="submit" disabled={isWorking}>
            {editProduct ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
