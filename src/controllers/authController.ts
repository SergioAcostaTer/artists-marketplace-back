import { jwtSign } from "../utils/jwt";
import User from "../models/User";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { clearToken, setToken } from "../utils/cookies";
import Portfolio from "@/models/Portfolio";

export const authController = {
  /**
   * Handle user sign-up.
   */
  signUp: async (req: Request, res: Response) => {
    try {
      const { email, name, profilePicture, roles } = req.body;

      if (!email || !name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Missing required fields",
          status: StatusCodes.BAD_REQUEST,
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "User already exists",
          status: StatusCodes.CONFLICT,
        });
      }

      const user = new User({
        email,
        name,
        profilePicture,
        roles: roles || ["user"],
      });

      await user.save();

      const token = jwtSign(user.id);
      if (token) {
        setToken(token, res);
      }

      return res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        status: StatusCodes.CREATED,
      });
    } catch (error) {
      console.error("SignUp Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  /**
   * Handle user sign-in.
   */
  signIn: async (req: Request, res: Response) => {
    try {
      const { email, name, profilePicture } = req.body;

      if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Missing required fields",
          status: StatusCodes.BAD_REQUEST,
        });
      }

      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          email,
          name,
          profilePicture,
          roles: ["user"],
        });

        await user.save();
      }

      const token = jwtSign(user.id);
      if (token) {
        setToken(token, res);
      }

      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      console.error("SignIn Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  /**
   * Handle user sign-out.
   */
  signOut: async (_: Request, res: Response) => {
    try {
      clearToken(res);
      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      console.error("SignOut Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },

  /**
   * Log in but if the user don't exist, create a new user and log in.
   */
  logIn: async (req: Request, res: Response) => {
    try {
      const { email, username, name, picture } = req.body;

      if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Missing required fields",
          status: StatusCodes.BAD_REQUEST,
        });
      }

      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          email,
          name,
          username,
          profilePicture: picture,
        });

        await user.save();
      }

      let portfolio = await Portfolio.findOne({ userId: user.id });
      if (!portfolio) {
        portfolio = new Portfolio({
          userId: user.id,
        });

        await portfolio.save();
      }

      const token = jwtSign(user.id);
      if (token) {
        setToken(token, res);
      }

      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
      });
    } catch (error) {
      console.error("LogIn Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
