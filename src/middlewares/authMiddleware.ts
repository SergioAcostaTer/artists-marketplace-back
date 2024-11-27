import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../utils/jwt";
import User from "../models/User";
import { logger } from "../infrastructure/logger";
import { clearToken } from "../utils/cookies";
import { StatusCodes } from "http-status-codes";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const token =
      req.cookies["token"] ||
      (req.headers["authorization"]?.startsWith("Bearer ")
        ? req.headers["authorization"].split(" ")[1]
        : null);

    if (!token) {
      logger.info("No authentication token provided");
      return next();
    }

    const decoded = jwtVerify(token);
    if (!decoded || !decoded.id) {
      logger.info("Invalid or missing token claims");

      clearToken(res);

      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: "Invalid or missing token claims",
          status: StatusCodes.UNAUTHORIZED,
        })
        .end();
    }

    const user = await User.findOne(
      { id: decoded.id },
      { _id: 0, __v: 0 }
    ).lean();

    if (!user) {
      logger.info(`No user found for username: ${decoded.id}`);
      clearToken(res);
      return next();
    }

    res.locals.user = user;

    logger.info(`User ${user.email} authenticated successfully`);

    return next();
  } catch (error: any) {
    logger.error("Error in authentication middleware:", error);

    clearToken(res);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Internal server error",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
      .end();
  }
};
