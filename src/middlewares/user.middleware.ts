import { decryptToken } from "../utils/index";
import { prisma } from "../index";
import { asyncHandler } from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { UserRequest } from "interface";

export const withAuthentication = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw next(new AppError("Unauthenticated Request by backend", 401));
  }

  const data: any = decryptToken(token);
  if (!data) {
    throw next(new AppError("Unauthenticated Request for data", 401));
  }
  const user = await prisma.user.findUnique({
    where: { id: data.id },
  });
  if (!user) {
    throw next(
      new AppError("User doesnot exist try registering the user", 404)
    );
  }
  (req as any).user = user;

  next();
});

export const withAccess = asyncHandler(async (req, res, next) => {
  if ((req as UserRequest).user.role == "ADMIN") {
    return next();
  }

  return next(new AppError("Unauthorized Access", 403));
});
