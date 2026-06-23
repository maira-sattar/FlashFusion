import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  description: Joi.string().max(2000),
  price: Joi.number().positive().precision(2),
  currency: Joi.string().length(3).uppercase().default("PKR"),
  categoryId: Joi.number().integer().positive(),
  discountId: Joi.number().integer().positive().allow(null).optional(),
  stock: Joi.number().integer().min(0).default(0),
  isActive: Joi.boolean().default(true),
  image: Joi.array(),
  label: Joi.string(),
});
