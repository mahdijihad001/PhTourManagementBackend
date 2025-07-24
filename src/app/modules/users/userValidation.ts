import { z } from "zod";
import { IsActive, Role } from "./user.interface";

export const createZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name to short. Minimum 2 character long." })
        .max(50, { message: "Name cannot excees be 50 characters" }),
    email: z.string().email({ message: "Invalid email address formate." }).toLowerCase().trim(),
    password: z.string().min(8, { message: "Password to short. Minimun 8 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" })
    ,
    phone: z.string()
        .regex(/^(?:\+?880|0)(13|14|15|16|17|18|19)[0-9]{8}$/, { message: "Invalid number formate. Please try valid bangladashi number" })
        .optional(),
    address: z.string({ invalid_type_error: "Addres must be string." }).optional()
});


export const updateuserZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name to short. Minimum 2 character long." })
        .max(50, { message: "Name cannot excees be 50 characters" })
        .optional(),
    email: z.string().email({ message: "Invalid email address formate." }).toLowerCase().trim().optional(),
    password: z.string().min(8, { message: "Password to short. Minimun 8 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" })
        .optional()
    ,
    phone: z.string()
        .regex(/^(?:\+?880|0)(13|14|15|16|17|18|19)[0-9]{8}$/, { message: "Invalid number formate. Please try valid bangladashi number" })
        .optional(),
    address: z.string({ invalid_type_error: "Addres must be string." }).optional(),
    isDeleted: z.boolean({ invalid_type_error: "IdDeleted must be true of false" }).optional(),
    isActive: z.enum(Object.values(IsActive) as [string]).optional(),
    isVerifid: z.boolean({ invalid_type_error: "IsVerifid must be true of false" }).optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
});