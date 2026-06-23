import Joi from "joi";

export const categorySchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  is_active: Joi.boolean().default(true),
  products: Joi.array(),
  image: Joi.array().required(),
});

export const updateCategorySchema = Joi.object({
  title: Joi.string().min(2).max(100),
  is_active: Joi.boolean(),
  products: Joi.array(),
  image: Joi.array(),
});
