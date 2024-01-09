import { IFlavor, IProduct } from "@/types";
import supabase, { supabaseUrl } from "./config";

export const getProducts = async () => {
  try {
    const { data: Products, error } = await supabase
      .from("Products")
      .select("*");

    if (error) throw error;
    return Products;
  } catch (error) {
    console.log(error);
  }
};

export const getFlavors = async () => {
  try {
    const { data: Flavors, error } = await supabase.from("Flavors").select("*");

    if (error) throw new Error("Error fetching flavors");

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

//Delete APi's

export const deleteProduct = async (id: number) => {
  try {
    const { error } = await supabase
      .from("Products")
      .delete()
      .eq("product_id", id);

    if (error) throw Error;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFlavor = async (id: number) => {
  try {
    const { error } = await supabase
      .from("Flavors")
      .delete()
      .eq("flavor_id", id);

    if (error) throw Error;
  } catch (error) {
    console.log(error);
  }
};

//Create APi's

export const uploadImage = async (path: string, newImage: File) => {
  try {
    const { data: Image, error } = await supabase.storage
      .from("media")
      .upload(path, newImage);

    if (error) throw Error;

    return Image;
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

export const createFlavor = async (newFlavor: IFlavor) => {
  const imageName = `${crypto.randomUUID()}-${
    newFlavor.image_url[0].name
  }`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/media/${imageName}`;

  try {
    const uploadedImage = await uploadImage(imageName, newFlavor.image_url[0]);

    if (!uploadedImage) {
      await supabase
        .from("Products")
        .delete()
        .eq("product_id", newFlavor.flavor_id);

      throw new Error("Failed to upload image, New Flavor was not created!");
    }

    const { data: NewFlavor, error } = await supabase
      .from("Flavors")
      .insert([{ ...newFlavor, image_url: imagePath }])
      .select();

    if (error) throw Error;

    return NewFlavor;
  } catch (error) {
    console.log(error, "ayaw");
  }
};

//UPDATE APi's

export const updateProduct = async (
  newProduct: IProduct,
  id: number | undefined
) => {
  console.log(newProduct, id);

  try {
    const { data: NewProduct, error } = await supabase
      .from("Products")
      .update([newProduct])
      .eq("product_id", id)
      .select();

    if (error) throw Error;

    return NewProduct;
  } catch (error) {
    console.log(error, "ayaw");
  }
};
