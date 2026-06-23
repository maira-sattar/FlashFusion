import { asyncHandler } from "utils/catchAsync";

const createOrder = asyncHandler(async (req, res, next) => {});

const getUserOrders = asyncHandler(async (req, res, next) => {});
const getOrderById = asyncHandler(async (req, res, next) => {});
const updateOrderStatus = asyncHandler(async (req, res, next) => {});

export const order = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
};
