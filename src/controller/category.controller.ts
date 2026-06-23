import { categorySchema, updateCategorySchema } from "../schema/catSchema";
import AppError from "../utils/AppError";
import { asyncHandler } from "../utils/catchAsync";
import { prisma } from "../index";
import { successResponse } from "../utils/index";
import fs, { truncate } from "fs";
import path from "path";

const addProdCat = asyncHandler(async (req, res, next) => {
  const { error, value } = categorySchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const image = value.image[0];

  const filePath = path.join(
    __dirname,
    "../../public/images/category/",
    image.originalFilename
  );

  fs.copyFile(image.filepath, filePath, (e) => {
    if (e) {
      throw new AppError(e.message, 400);
    }
    console.log("successfully saved the image");
  });
  fs.unlink(image.filepath, (e) => {
    if (e) {
      throw new AppError(e.message, 400);
    }
  });

  const newCat = await prisma.productCategory.create({
    data: {
      title: value.title,
      img: {
        create: {
          image_type: "png",
          url: `http://localhost:9000/images/category/${image.originalFilename}`,
        },
      },
    },
    include: {
      img: true,
    },
  });
  res.status(200).send(successResponse("Category successfully added", newCat));
});

const getAllCat = asyncHandler(async (req, res, next) => {
  const categories = await prisma.productCategory.findMany({
    include: {
      img: true,
    },
  });
  const totalRecords = await prisma.productCategory.count({});
  res
    .status(200)
    .send(successResponse("Categories Detail", { categories, totalRecords }));
});

const updateCat = asyncHandler(async (req, res, next) => {
  const { error, value } = updateCategorySchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const id = parseInt(req.params.id);

  let category = await prisma.productCategory.update({
    where: {
      id,
    },
    data: {
      title: value.title,
      is_active: value.is_active,
      img: value.img,
    },
    include: {
      img: true,
    },
  });
  res
    .status(200)
    .send(successResponse("Category updated successfully", category));
});

const delCat = asyncHandler(async (req, res, next) => {});
export const category = {
  addProdCat,
  getAllCat,
  updateCat,
};
