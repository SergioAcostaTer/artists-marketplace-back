import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import User, { IUser } from "../models/User";
import { logger } from "@/infrastructure/logger";

export const userController = {
  /**
   * Fetch the currently authenticated user's profile.
   */
  me: async (_: Request, res: Response) => {
    const user = res.locals.user as IUser | undefined;

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not authenticated" });
    }

    return res.status(StatusCodes.OK).json(user);
  },

  /**
   * Get a user by username.
   */
  getUser: async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
      const user = await User.findOne(
        { name: username },
        { _id: 0, __v: 0, socialId: 0 }
      );

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND,
        });
      }

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred while retrieving the user" });
    }
  },

  /**
   * Update the authenticated user's profile.
   */
  updateUser: async (req: Request, res: Response) => {
    const user = res.locals.user as IUser | undefined;

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not authenticated" });
    }

    const updates = req.body;

    try {
      await User.updateOne({ id: user.id }, { $set: updates });

      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred while updating the user" });
    }
  },
};
