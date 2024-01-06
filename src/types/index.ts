// types.ts

export type VapeProduct = {
  productid: number;
  name: string;
  description: string;
  Flavors: {
    flavorid?: number;
    name: string;
    stockquantity: number;
    price: number;
    imageurl: string;
  };
};

export type IProduct = {
  product_id?: number;
  product_name: string;
  description: string;
  flavor_id: number | undefined;
  category_id: number | undefined;
};

export type ICategory = {
  category_id: number;
  category_name: string;
  puffs_count: number;
  cost_price: number;
  sale_price: number;
};

export type IFlavor = {
  flavor_id: number;
  flavor_name: string;
  description: string;
  image_url: string;
  flavor_qty: number;
};
