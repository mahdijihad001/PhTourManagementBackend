"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateuserZodSchema = exports.createZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.createZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name to short. Minimum 2 character long." })
        .max(50, { message: "Name cannot excees be 50 characters" }),
    email: zod_1.z.string().email({ message: "Invalid email address formate." }).toLowerCase().trim(),
    password: zod_1.z.string().min(8, { message: "Password to short. Minimun 8 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" }),
    phone: zod_1.z.string()
        .regex(/^(?:\+?880|0)(13|14|15|16|17|18|19)[0-9]{8}$/, { message: "Invalid number formate. Please try valid bangladashi number" })
        .optional(),
    address: zod_1.z.string({ invalid_type_error: "Addres must be string." }).optional()
});
exports.updateuserZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name to short. Minimum 2 character long." })
        .max(50, { message: "Name cannot excees be 50 characters" })
        .optional(),
    email: zod_1.z.string().email({ message: "Invalid email address formate." }).toLowerCase().trim().optional(),
    password: zod_1.z.string().min(8, { message: "Password to short. Minimun 8 character long." })
        .regex(/\d/, { message: "Password must be contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must be at last one speacil character" })
        .regex(/[A-Z]/, { message: "Password must be contain must be one uppercase chacacter" })
        .regex(/[a-z]/, { message: "Password must be contain at last one lowarcast character" })
        .optional(),
    phone: zod_1.z.string()
        .regex(/^(?:\+?880|0)(13|14|15|16|17|18|19)[0-9]{8}$/, { message: "Invalid number formate. Please try valid bangladashi number" })
        .optional(),
    address: zod_1.z.string({ invalid_type_error: "Addres must be string." }).optional(),
    isDeleted: zod_1.z.boolean({ invalid_type_error: "IdDeleted must be true of false" }).optional(),
    isActive: zod_1.z.enum(Object.values(user_interface_1.IsActive)).optional(),
    isVerifid: zod_1.z.boolean({ invalid_type_error: "IsVerifid must be true of false" }).optional(),
    role: zod_1.z.enum(Object.values(user_interface_1.Role)).optional(),
});
