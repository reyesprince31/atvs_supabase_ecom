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
  productid?: number;
  productName: string;
  description: string;
  categoryid?: number;
  flavorid?: number;
};

export type ICategory = {
  id: number;
  categoryName: string;
  puffsCount?: number;
};

export type IFlavor = {
  flavorid?: number;
  name: string;
  stockquantity: number;
  price: number;
  imageurl: string;
};
