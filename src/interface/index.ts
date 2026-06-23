import { Result_2 } from "@prisma/client/runtime/library";
import { Request } from "express";
import { boolean, date } from "joi";

export interface IHTTPError extends Error {
  // because default Error class does not have status code
  statusCode: number;
}

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UserRequest extends Request {
  user: {
    id: number;
    name: string;
    email: string;
    password: String;
    phone: string;
    is_active: boolean;
    role: string;
  } & {
    _v: number;
  };
}

export interface CatRequest extends Request {
  category: {};
}
