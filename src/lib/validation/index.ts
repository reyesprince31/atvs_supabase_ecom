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
  productName: z
    .string()
    .min(2, { message: "Name must be atleast 2 characters." }),
  description: z
    .string()
    .min(3, { message: "description must be atleast 3 characters." })
    .max(2500, { message: "Maximum of 2500 characters" }),
  category: z.string().min(2),
  flavor: z.string().min(2),
});

export const FlavorValidation = z.object({
  name: z.string().min(2, { message: "Name must be atleast 2 characters." }),
  quantity: z.number(),
  price: z.number(),
  imageurl: z.string(),
});
