import path from "path";
import fs from "fs";
import { productSchema } from "../schema/productSchema";
import AppError from "../utils/AppError";
import { asyncHandler } from "../utils/catchAsync";
import { prisma } from "../index";
import { generateSlug, successResponse } from "../utils/index";
import { url } from "inspector";

const addProduct = asyncHandler(async (req, res, next) => {
  const { error, value } = productSchema.validate(req.body);

  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const images = value.image;
  let imageData = [] as { url: string; image_type: string }[];

  // Use a for...of loop with async/await
  for (const [i, image] of images.entries()) {
    const splitArray = image.originalFilename.split(".");
    const type = splitArray[splitArray.length - 1];

    // Create a unique filename
    const fileName = `${Date.now()}-${i}.${type}`;
    console.log(fileName);

    const filePath = path.join(
      __dirname,
      "../../public/images/product/",
      fileName
    );

    try {
      // Wait for the file to be copied using fs.promises
      await fs.promises.copyFile(image.filepath, filePath);

      // Push data after a successful copy
      imageData.push({
        url: "/images/product/" + fileName,
        image_type: "product",
      });

      console.log("Successfully saved the image:", fileName);

      await fs.promises.unlink(image.filepath);
    } catch (e: any) {
      console.error(`Error processing file ${fileName}:`, e.message);
      return next(new AppError(e.message, 400));
    }
  }
  // const filePath = path.join(
  //   __dirname,
  //   "../../public/images/category/",
  //   image.originalFilename
  // );
  // fs.copyFile(image.filepath, filePath, (e) => {
  //   if (e) {
  //     throw new AppError(e.message, 400);
  //   }
  //   console.log("successfully saved the image");
  // });
  // fs.unlink(image.filepath, (e) => {
  //   if (e) {
  //     throw new AppError(e.message, 400);
  //   }
  // });

  let product = await prisma.product.create({
    data: {
      name: value.name,
      slug: "temp-slug",
      description: value.description,
      currency: value.currency,
      categoryId: value.categoryId,
      stockQuantity: value.stock,
      isActive: value.is_active,
      variants: {
        createMany: {
          data: value.price,
        },
      },
      images: {
        createMany: {
          data: imageData,
        },

        // create: [
        //   {
        //     image_type: "png",
        //     url: `http://localhost:9000/images/product/${images.originalFilename}`,
        //   },
        // ],
      },
    },
    include: {
      images: true,
      category: true,
    },
  });
  const slug = await generateSlug(value.name, value.id);
  product = await prisma.product.update({
    where: { id: product.id },
    data: {
      slug,

      variants: {
        create: {
          label: value.label,
          price: value.price,
        },
      },
    },

    include: {
      images: true,
      category: true,
      variants: true,
    },
  });
  res.status(200).send(successResponse("product successfully added", product));
});

const getAllProduct = asyncHandler(async (req, res, next) => {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  res.status(200).send(successResponse("Product Detail", products));
});

const getProDetails = asyncHandler(async (req, res, next) => {});

const delProducts = asyncHandler(async (req, res, next) => {});
const updateProducts = asyncHandler(async (req, res, next) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const id = parseInt(req.params.id);
  let product = await prisma.product.update({
    where: { id: id },
    data: {
      name: value.name,
      slug: value.slug,
      description: value.description,
      currency: value.currency,
      categoryId: value.categoryId,
      stockQuantity: value.stock,
      isActive: value.is_active,
      images: value.image,
      variants: value.variants,
    },

    include: {
      images: true,
      category: true,
      variants: true,
    },
  });
  res
    .status(200)
    .send(successResponse("Product successfully updated", product));
});
export const products = {
  addProduct,
  getAllProduct,

  getProDetails,
  delProducts,
  updateProducts,
};
