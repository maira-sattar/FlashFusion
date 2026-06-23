import Joi from "joi";

export const homePageSchema = Joi.object({
  title: Joi.string(),
  sub_title: Joi.string(),
  bannerImg: Joi.array(),
});
