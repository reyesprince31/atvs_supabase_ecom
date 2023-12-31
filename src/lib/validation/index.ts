import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const ProductValidation = z.object({
  product_name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters." }),
  description: z
    .string()
    .min(3, { message: "description must be atleast 3 characters." })
    .max(2500, { message: "Maximum of 2500 characters" }),
  category_name: z.string().min(2),
  flavor_name: z.string().min(2),
});

export const FlavorValidation = z.object({
  image_url: z.custom<File[]>(),
  flavor_name: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters." }),
  description: z
    .string()
    .min(3, { message: "description must be atleast 3 characters." })
    .max(2500, { message: "Maximum of 2500 characters" }),
  flavor_qty: z.string().min(1),
});
