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
