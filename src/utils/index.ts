import { Request } from "express";
import { prisma } from "../index";
import Joi from "joi";
const SECRET_KEY = "MS793";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { asyncHandler } from "./catchAsync";

export const decryptToken = (token: string) => {
  const data = jwt.verify(token, SECRET_KEY, {});
  return data;
};

export const validateID = (req: Request): number | undefined => {
  return +req.params?.id;
};
// export const validateID = (req: Request): string | undefined => {
//   return req.params?.id;
// };

export const successResponse = (message: string, data: any) => {
  return {
    code: 1,
    message,
    data,
  };
};

export const paginationResponse = (
  message: string,
  data: any[],
  paginator: {
    currentPage: number;
    lastPage: number;
    totalRecords: number;
  }
) => {
  return {
    code: 1,
    message,
    data: {
      data,
      paginator,
    },
  };
};

export const errorResponse = (error: any, message = "Bad Request") => {
  if (error instanceof Joi.ValidationError) {
    const joiMessage = error.message;

    return {
      code: 0,
      message: joiMessage,
      data: null,
    };
  }

  return {
    code: 0,
    message,
    data: null,
  };
};

export const createToken = (val: any) => {
  return jwt.sign(val, SECRET_KEY, {
    expiresIn: "365d",
  }); //ensure the integrity of jwt
};

export const deleteToken = (value: null) => {};

export const getforgotPasswordHtmlTemplate = (otp: number) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password</title>
  </head>
  <body
    style="justify-content: space-between; text-align: center; margin: 0px 20px"
  >
    <div style="background-color: white">
      <div>
        <img
          src="../../public/images/Applogo.png"
          style="width: 150px; height: auto"
          alt=""
        />
      </div>

      <div
        style="
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding-bottom: 10px;
        "
      >
        <h3 style="color: #000000">&#9888; PASSWORD RESET</h3>

        <div>
          <p>
            Seems like you forgot your password for
            <a href="#" style="color: #ff5722; text-decoration: none"
              >NovaMart.com </a
            >. If yes, enter this OTP on password reset page. This code will be
            valid for 5 minutes.
          </p>

          <h1>${otp}</h1>
          <p style="font-size: 12px; color: #969595">
            If you do not request this code. Simpy ignore this email and do not
            share it with anyone.
          </p>
        </div>
      </div>

      <div style="color: #969595; padding: 10px 0px">
        <a href="#">
          <img
            src="https://pngimg.com/uploads/twitter/twitter_PNG20.png"
            alt="Twitter"
            width="40"
            height="40"
          />
        </a>

        <a href="#">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYTLRluQ369jRaRaYBdh65haTY6eG_Agozg&s"
            alt="LinkedIn"
            width="40"
            height="40"
          />
        </a>
        <p>
          Copyright © 2025
          <br />
          If you donot wish to receive this email.
          <a href="#" style="color: #46ccd8; text-decoration: none"
            >unsubscribe here</a
          >.
        </p>
      </div>
    </div>
  </body>
</html>

`;
};

export const getHtmlTemplate = (
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    is_active: boolean;
    role: any;
    email_verified_at: Date | null;
    created_at: Date;
    updated_at: Date;
  },
  hash: string
) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification Link</title>
  </head>
  <body
    style="justify-content: space-between; text-align: center; margin: 0px 20px"
  >
    <div style="background-color: white">
      <div>
        <img
          src="../../public/images/Applogo.png"
          style="width: 150px; height: auto"
          alt=""
        />
      </div>

      <div
        style="
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding-bottom: 10px;
        "
      >
        <div
          style="
            background: linear-gradient(135deg, #7195d4, #146d88);
            padding-top: 20px;
            padding-bottom: 20px;
          "
        >
          <img
            style="width: 100px; height: auto"
            src="../../public/images/verify_email.png"
            alt=""
          />
        </div>

        <h3 style="color: #000000">Verify your email address</h3>

        <div>
          <p>
            Hey ${user.name}, Welcome to
            <a href="/" style="color: #ff5722; text-decoration: none"
              >NovaMart.com
            </a>
          </p>
          <p>
            Please click the button below to confirm your email address and
            activate your account.
          </p>

          <a
            href="http://localhost:9000/api/verify/user/${
              user.email
            }/${encodeURIComponent(hash)}"
            style="
              background: linear-gradient(135deg, #7195d4, #146d88);
              border: none;
              color: #ffffff;
              font-weight: bold;
              padding: 5px 15px;
              border-radius: 4px;
              text-decoration: none;
            "
          >
            Verify Email
          </a>
          <p style="font-size: 12px; color: #969595">
            If you do not request this code. Simpy ignore this email and do not
            click on this button.
          </p>
        </div>
      </div>

      <div style="color: #969595; padding: 10px 0px">
        <a href="#">
          <img
            src="https://pngimg.com/uploads/twitter/twitter_PNG20.png"
            alt="Twitter"
            width="40"
            height="40"
          />
        </a>

        <a href="#">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYTLRluQ369jRaRaYBdh65haTY6eG_Agozg&s"
            alt="LinkedIn"
            width="40"
            height="40"
          />
        </a>
        <p>
          Copyright © 2025
          <br />
          If you donot wish to receive this email.
          <a href="#" style="color: #46ccd8; text-decoration: none"
            >unsubscribe here</a
          >.
        </p>
      </div>
    </div>
  </body>
</html>


`;
};

export const generateSlug = async (name: string, id: number) => {
  const base = slugify(name, { lower: true, strict: true });
  let slug = base;
  let counter = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${base}-${counter++}`;
  }
  return slug;
};

// export const imageData = asyncHandler(async(next)=>{
//     let imageData = [] as { url: string; image_type: string }[];

//     // Use a for...of loop with async/await
//     for (const [i, image] of images.entries()) {
//       const splitArray = image.originalFilename.split(".");
//       const type = splitArray[splitArray.length - 1];

//       // Create a unique filename
//       const fileName = `${Date.now()}-${i}.${type}`;
//       console.log(fileName);

//       const filePath = path.join(
//         __dirname,
//         "../../public/images/home/",
//         fileName
//       );

//       try {
//         // Wait for the file to be copied using fs.promises
//         await fs.promises.copyFile(image.filepath, filePath);

//         // Push data after a successful copy
//         imageData.push({
//           url: "/images/home/" + fileName,
//           image_type: "banner",
//         });

//         console.log("Successfully saved the image:", fileName);

//         await fs.promises.unlink(image.filepath);
//       } catch (e: any) {
//         console.error(`Error processing file ${fileName}:`, e.message);
//         return next(new AppError(e.message, 400));
//       }
//     }
// })
