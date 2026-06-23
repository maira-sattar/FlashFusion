import { prisma } from "../index";
import { asyncHandler } from "../utils/catchAsync";
import fs from "fs";
import path from "path";
import { homePageSchema } from "../schema/homePageSchema";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/index";

const createHomePage = asyncHandler(async (req, res, next) => {
  const { error, value } = homePageSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.message, 400));
  }

  const images = value.bannerImg as any[];

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
      "../../public/images/home/",
      fileName
    );

    try {
      // Wait for the file to be copied using fs.promises
      await fs.promises.copyFile(image.filepath, filePath);

      // Push data after a successful copy
      imageData.push({
        url: "/images/home/" + fileName,
        image_type: "banner",
      });

      console.log("Successfully saved the image:", fileName);

      await fs.promises.unlink(image.filepath);
    } catch (e: any) {
      console.error(`Error processing file ${fileName}:`, e.message);
      return next(new AppError(e.message, 400));
    }
  }

  const newHomePage = await prisma.home.create({
    data: {
      title: value.title,
      sub_title: value.sub_title,
      bannerImg: {
        createMany: {
          data: imageData,
        },
      },
    },
    include: {
      bannerImg: true,
    },
  });

  res
    .status(200)
    .send(successResponse("Home Page successfully added", newHomePage));
});

const getHomePage = asyncHandler(async (req, res, next) => {
  let home = await prisma.home.findMany({
    include: {
      bannerImg: true,
    },
  });

  res.status(200).send(successResponse("Homies Page", home));
});

export const home = {
  createHomePage,
  getHomePage,
};
