import {z} from "zod";

export const createAdminvalidation = z.object({
  body: z.object({
    name: z.string().min(1, "Profile id is required"),
    email: z.string().email().min(1, "Valid email required"),
    phone: z.string().min(5, "Phone Number is required"),
    password: z.string().min(5, "Password is required"),
  })
});

export const adminLoginValidation = z.object({
  body: z.object({
    email: z.string().email().min(1, "Valid email required"),
    password: z.string().min(5, "password is required"),
  })
});

