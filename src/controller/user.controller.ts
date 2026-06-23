import type { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

import {
  createToken,
  getforgotPasswordHtmlTemplate,
  getHtmlTemplate,
  paginationResponse,
  successResponse,
  validateID,
} from "../utils/index";
import {
  forgotPasswordSchema,
  loginSchema,
  manageUserSchema,
  paginationSchema,
  resetPasswordSchema,
  updateUserSchema,
  userSchema,
  userVerificationSchema,
} from "../schema/index";
import { prisma } from "../index";

import { asyncHandler } from "../utils/catchAsync";
import AppError from "../utils/AppError";

import { UserRequest } from "interface";

const deleteAccount = asyncHandler(async (req, res, next) => {
  const id = validateID(req);
  if (!id) {
    throw next(new AppError("id is required", 400));
  }
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).send({ message: "Account Successfully deleted" });
});
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { error, value } = forgotPasswordSchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const isUser = await prisma.user.findFirst({
    where: { email: value.email },
  });
  if (!isUser) {
    throw next(new AppError("User does not exist", 404));
  }
  const random = Math.floor(Math.random() * 900000) + 100000;

  await prisma.otp.create({
    data: {
      code: random,
      expires_at: new Date(Date.now() + 5 * 60 * 1000),
      user_email: value.email,
    },
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sattarmaira2005@gmail.com",
      pass: "kunx jofz dokb jeiw",
    },
  });

  await transporter.sendMail({
    from: "sattarmaira2005@gmail.com",
    to: value.email,
    subject: "Password Reset",
    html: getforgotPasswordHtmlTemplate(random),
  });

  res.send(successResponse("Check your email an otp is sent to you", null));
});

const getUsers = asyncHandler(async (req, res, next) => {
  const { error, value } = paginationSchema.validate(req.body);

  if (error) {
    throw next(new AppError(error.message, 400));
  }

  const { page, limit, q } = value;

  const user = await prisma.user.findMany({
    where: {
      name: {
        startsWith: q,
      },
    },
    take: limit,
    skip: (page - 1) * limit,
  });
  const totalRecords = await prisma.user.count({});
  res.status(200).send(
    paginationResponse("Successfully Fetched Users", user, {
      currentPage: page,
      lastPage: Math.ceil(totalRecords / limit),
      totalRecords,
    })
  );
});

const logIn = asyncHandler(async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const isUser = await prisma.user.findFirst({
    where: { email: value.email },
  });

  if (!isUser) {
    throw next(new AppError("User does not exist", 404));
  }

  const checkPass = await bcrypt.compare(value.password, isUser.password);
  if (!checkPass) {
    throw next(new AppError("Incorrect Password or Email", 404));
  }
  if (!isUser.email_verified_at) {
    throw next(new AppError("Please verify your email before logging in", 403));
  }
  if (!isUser.is_active) {
    throw next(new AppError("Your account has been blocked.", 403));
  }
  delete (isUser as any).password;

  const token = createToken(isUser);

  res
    .status(200)
    .send(successResponse("Successfully login", { ...isUser, token }));
});

// const logOut = asyncHandler(async (req, res, next) => {
//   jwt.TokenExpiredError
//   // const token = req.headers.authorization?.split(" ")[1];
//   // if(token){
//   //   prisma.user.update({

//   //   }),
//   // }
// });
const manageUser = asyncHandler(async (req, res, next) => {
  const id = validateID(req);

  const { value, error } = manageUserSchema.validate(req.body);

  if (error) {
    throw next(new AppError(error.message, 404));
  }

  if (value.email) {
    const isUser = await prisma.user.findFirst({
      where: {
        AND: {
          id: {
            not: id,
          },
          email: {
            equals: value.email,
          },
        },
      },
    });
    if (isUser) {
      throw next(new AppError("Email already taken", 400));
    }
  }

  const user = (req as UserRequest).user;
  let updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: value.name,
      email: value.email,
      role: value.role,
      password: value.password,
    },
  });
  res
    .status(200)
    .send(successResponse("Data Successfully updated", updateUser));
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { error, value } = resetPasswordSchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }

  const otpRecord = await prisma.otp.findUnique({
    where: {
      user_email: value.email,
      code: value.token,
    },
  });
  if (!otpRecord) {
    throw next(new AppError("Wrong OTP(One-Time-Password)", 422));
  }
  const hashPassword = await bcrypt.hash(value.password, 5);

  const [, updateUser] = await prisma.$transaction([
    prisma.otp.delete({
      where: {
        user_email: value.email,
        code: value.token,
      },
    }),
    prisma.user.update({
      where: {
        email: value.email,
      },
      data: {
        password: hashPassword,
        updated_at: new Date(),
      },
    }),
  ]);

  delete (updateUser as any).password;

  res
    .status(200)
    .send(successResponse("Password Reset Successfully", updateUser));
});

const signUp = asyncHandler(async (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const isUser = await prisma.user.findFirst({
    where: { email: value.email },
  });
  if (isUser) {
    throw next(new AppError("Email Already Taken", 400));
  }
  const encryptedPass = await bcrypt.hash(value.password, 5);
  const existingHash = await prisma.hash.findUnique({
    where: { email: value.email },
  });
  if (!existingHash) {
    await prisma.hash.create({
      data: {
        email: value.email,
        hash: encryptedPass,
        created_at: new Date(),
      },
    });
  }
  const newUser = await prisma.user.create({
    data: {
      ...value,
      phone: JSON.stringify(value.phone),
      password: encryptedPass,
    },
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sattarmaira2005@gmail.com",
      pass: "kunx jofz dokb jeiw",
    },
  });

  await transporter.sendMail({
    from: "sattarmaira2005@gmail.com",
    to: value.email,
    subject: "Verify Email Address for FlashFusion",
    html: getHtmlTemplate(newUser, encryptedPass),
  });

  const token = createToken(newUser);

  delete (newUser as any).password;
  res
    .status(200)
    .send(
      successResponse(
        "User Successfully Registered See you email for verification",
        { ...newUser, token }
      )
    );
});

const update = asyncHandler(async (req, res) => {
  const user = (req as UserRequest).user;
  res.send(user);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { error, value } = updateUserSchema.validate(req.body);
  if (error) {
    throw next(new AppError(error.message, 400));
  }
  const user = (req as UserRequest).user;
  let updateUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: value.name,
    },
  });
  res
    .status(200)
    .send(successResponse("Data Successfully updated", updateUser));
});

const verifyUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = {
      ...req.params,
    };
    const { error, value } = userVerificationSchema.validate(data);
    if (error) {
      throw next(new AppError(error.message, 400));
    }
    //match the hash with in hash table

    const isVerified = await prisma.hash.findUnique({
      where: {
        email: value.email,
        hash: value.hash,
      },
    });

    if (!isVerified) {
      res.render("verified", { updateUser: false });

      return;
    }
    const now = new Date();
    const diffHours =
      (now.getTime() - isVerified.created_at.getTime()) / (1000 * 60 * 60);
    if (diffHours > 1) {
      res.render("verified.", { updateUser: false });
      return;
    }

    let updateUser = await prisma.user.update({
      where: {
        email: value.email,
        password: value.hash,
      },
      data: {
        email_verified_at: new Date(),
      },
    });
    await prisma.hash.delete({
      where: {
        email: value.email,
        hash: value.hash,
      },
    });

    res.render("verified", { updateUser });
  }
);

export const user = {
  deleteAccount,
  forgotPassword,
  getUsers,
  logIn,

  manageUser,
  resetPassword,
  signUp,
  update,
  updateUser,
  verifyUser,
};
