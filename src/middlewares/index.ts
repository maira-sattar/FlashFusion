import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import formidable from "formidable";
import AppError from "utils/AppError";

export const dataCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024,
    });
    const [fields, files] = await form.parse(req);

    let fieldData: any = {};

    Object.keys(fields).map((key) => {
      if (fields[key]) {
        fieldData[key] = fields[key][0];
      }
    });

    const data = {
      ...req.params,
      ...req.body,
      ...req.query,
      ...fieldData,
      ...files,
    };
    req.body = data;
  } catch (error) {
    next(error);
  } finally {
    next();
  }
};

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    code: 0,
    message: err.message.replace(/\n/g, " ") || "Internal Server Error",
  });
};
