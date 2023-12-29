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

export const deleteProduct = async (product_id: number) => {
  try {
    const { error } = await supabase
      .from("Products")
      .delete()
      .eq("id", product_id);

    if (error) throw Error;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (newProduct: IProduct) => {
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
