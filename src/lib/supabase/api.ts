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
