import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFlavor,
  createProduct,
  deleteFlavor,
  deleteProduct,
  getCategory,
  getFlavors,
  getProducts,
  updateProduct,
} from "../supabase/api";
import { QUERY_KEYS } from "./queryKeys";
import { IProduct } from "@/types";
import { useToast } from "@/components/ui/use-toast";

//Create Queries
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

export const useGetCategory = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORY],
    queryFn: getCategory,
  });
};

//Delete Queries
export const useDeleteProduct = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast({ title: "Product has been deleted successfully!" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS],
      });
    },
  });
};

export const useDeleteFlavor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFlavor,
    onSuccess: () => {
      toast({ title: "Flavor has been deleted successfully!" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FLAVORS],
      });
    },
  });
};

//Create Queries

export const useCreateProduct = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast({ title: "Product has been created successfully!" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS],
      });
    },
  });
};

export const useCreateFlavor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFlavor,
    onSuccess: () => {
      toast({ title: "Flavor has been created successfully!" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FLAVORS],
      });
    },
  });
};

//Update Queries
export const useEditProduct = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      newProduct,
      id,
    }: {
      newProduct: IProduct;
      id: number | undefined;
    }) => updateProduct(newProduct, id),
    onSuccess: () => {
      toast({ title: "Product has been updated successfully!" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PRODUCTS],
      });
    },
  });
};
