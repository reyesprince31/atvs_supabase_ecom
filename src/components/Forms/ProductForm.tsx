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
import { IProduct } from "@/types";

interface PropsEdit {
  product: IProduct;
  category: { categoryName: string };
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
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
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
  async function onSubmit(values: z.infer<typeof ProductValidation>) {
    try {
      const { category, flavor, productName, description } = values;

      const categoryId = categories?.find(
        (item) => item.categoryName === category
      ).id;

      const flavorId = flavors?.find((item) => item.name === flavor).flavorid;

      const newProduct = {
        productName,
        description,
        categoryid: category ? categoryId : undefined,
        flavorid: flavor ? flavorId : undefined,
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

        form.reset();
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
