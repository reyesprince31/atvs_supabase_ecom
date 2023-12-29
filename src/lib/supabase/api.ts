import { IProduct } from "@/types";
import supabase from "./config";

export const getProducts = async () => {
  try {
    const { data: Products, error } = await supabase
      .from("Products")
      .select("*");

    if (error) throw Error;

    return Products;
  } catch (error) {
    console.log(error);
  }
};

export const getFlavors = async () => {
  try {
    const { data: Flavors, error } = await supabase.from("Flavors").select("*");

    if (error) throw Error;

    return Flavors;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const { data: Category, error } = await supabase
      .from("Category")
      .select("*");

    if (error) throw Error;

    return Category;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productid: number) => {
  try {
    const { error } = await supabase
      .from("Products")
      .delete()
      .eq("productid", productid);

    if (error) throw Error;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (newProduct: IProduct) => {
  console.log(newProduct);
  try {
    const { data: NewProduct, error } = await supabase
      .from("Products")
      .insert([newProduct])
      .select();

    if (error) throw Error;

    return NewProduct;
  } catch (error) {
    console.log(error, "ayaw");
  }
};

export const updateProduct = async (
  newProduct: IProduct,
  id: number | undefined
) => {
  console.log(newProduct, id);

  try {
    const { data: NewProduct, error } = await supabase
      .from("Products")
      .update([newProduct])
      .eq("productid", id)
      .select();

    if (error) throw Error;

    return NewProduct;
  } catch (error) {
    console.log(error, "ayaw");
  }
};
