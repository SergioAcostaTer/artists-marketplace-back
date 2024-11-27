import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import User, { IUser } from "../models/User";
import Portfolio from "@/models/Portfolio";
import { scrapSpotify } from "@/utils/scrapers";
import { logger } from "@/infrastructure/logger";

export const portfolioController = {
  getPortfolio: async (req: Request, res: Response) => {
    const { username } = req.query;
    logger.info(`Getting portfolio for ${username}`);
    try {
      const user = await User.findOne({ username }).lean();
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }
      const portfolio = await Portfolio.findOne({ userId: user.id }).lean();
      if (!portfolio) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Portfolio not found for this user",
        });
      }
      const response = {
        name: user.name,
        username: user.username,
        avatar: user.profilePicture || null,
        banner: portfolio.banner || null,
        mainColor: portfolio?.mainColor,
        secondaryColor: portfolio?.secondaryColor,
        socialLinks: portfolio?.socialLinks,
        userId: portfolio?.userId,
      };
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while retrieving the portfolio",
      });
    }
  },

  createPortfolio: async (req: Request, res: Response) => {
    const { spotifyUrl } = req.body;
    if (!spotifyUrl) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Spotify link is required.",
      });
    }

    try {
      const spotifyData = await scrapSpotify(spotifyUrl);

      const response = {
        name: spotifyData.name || "Unknown Name",
        profilePicture: spotifyData.profilePicture || null,
        monthlyListeners: spotifyData.monthlyListeners || "0",
        banner: spotifyData.banner || null,
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while scraping Spotify data.",
      });
    }
  },
  getMyPortfolio: async (req: Request, res: Response) => {
    const { user } = res.locals;
    try {
      const portfolio = await Portfolio.findOne({ userId: user.id }).lean();
      if (!portfolio) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Portfolio not found for this user",
        });
      }
      const response = {
        name: user.name,
        username: user.username,
        avatar: user.profilePicture || null,
        banner: portfolio.banner || null,
        mainColor: portfolio?.mainColor,
        secondaryColor: portfolio?.secondaryColor,
        socialLinks: portfolio?.socialLinks,
        userId: portfolio?.userId,
      };
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while retrieving the portfolio",
      });
    }
  },
};
