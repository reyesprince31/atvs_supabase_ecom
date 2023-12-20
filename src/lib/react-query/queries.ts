import { useQuery } from "@tanstack/react-query";
import { getFlavors, getProducts } from "../supabase/api";
import { QUERY_KEYS } from "./queryKeys";

export const useGetProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS],
    queryFn: getProducts,
  });
};

export const useGetFlavors = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FLAVORS],
    queryFn: getFlavors,
  });
};
