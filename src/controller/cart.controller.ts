import { asyncHandler } from "utils/catchAsync";

const getCartItems = asyncHandler(async (req, res, next) => {});

const addCartItem = asyncHandler(async (req, res, next) => {});

const updateCartItem = asyncHandler(async (req, res, next) => {});

const removeCartItem = asyncHandler(async (req, res, next) => {});

export const cart = {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
};
