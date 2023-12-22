import { VapeProduct } from "@/types";
import supabase from "./config";

export const getProducts = async () => {
  try {
    const { data: Products, error } = await supabase
      .from("products")
      .select(`*`);

    if (error) throw Error;

    return Products;
  } catch (error) {
    console.log(error);
  }
};

export const getFlavors = async () => {
  try {
    const { data: Flavors, error } = await supabase.from("flavors").select("*");

    if (error) throw Error;

    return Flavors;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (product_id: number) => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product_id);

    if (error) throw Error;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (newProduct: VapeProduct) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select();

    if (error) throw Error;

    return data;
  } catch (error) {
    console.log(error);
  }
};
