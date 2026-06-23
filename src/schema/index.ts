import Joi from "joi";

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.number().required(),
  password: Joi.string().min(6).required(),
});
export const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().default("USER"),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  phone: Joi.number(),
});

export const manageUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  role: Joi.string().valid("USER", "ADMIN"),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string().min(6).optional(),
  address_title: Joi.string(),
  postal_code: Joi.string(),
  city: Joi.string(),
  address: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const paginationSchema = Joi.object({
  q: Joi.string().optional().default(""),
  page: Joi.number().optional().default(1),
  limit: Joi.number().optional().default(5),
});

export const userVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
  hash: Joi.string().required(),
});
