import JWT from "jsonwebtoken";
import AppError from "../utils/error.util.js";
import User from "../models/userModel.js";

const isloogedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated,please login again", 400));
  }
  const userDetails = await JWT.verify(token, process.env.SECRET_KEY);
  req.user = userDetails;
  next();
};

const autorizeRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role?.trim().toLowerCase();
    const allowedRoles = roles.map((r) => r.trim().toLowerCase());

    if (!allowedRoles.includes(currentUserRole)) {
      return next(
        new AppError(" You dont have permission to access the route", 403)
      );
    }
    next();
  };

const authorizeSubscriber = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Invalid User Id", 500));
    }
    const role = user.role;

    const subscriptionStatus = user?.subscription?.status;
    if (subscriptionStatus !== "Active" && role !== "ADMIN") {
      return next(new AppError("Not Authorize To access this route", 403));
    }
    next();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
export { isloogedIn, autorizeRoles, authorizeSubscriber };
