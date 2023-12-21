// types.ts
export type IFlavor = {
  flavor_code: string;
  image_url: string;
};

export type VapeProduct = {
  id: number;
  model_name: string;
  puffs_count: number;
  supplier_price: number;
  regular_price: number;
};
