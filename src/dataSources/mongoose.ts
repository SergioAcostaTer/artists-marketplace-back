import { logger } from "../infrastructure/logger";
import { connect, connection } from "mongoose";
import winston from "winston";

export const mongoose = {
  run: async () => {
    try {
      const mongo = await connect(process.env.MONGODB_URI || "");
      logger.log({
        level: "info",
        message: "MongoDB is connected",
      });
      return mongo;
    } catch (error) {
      winston.error(error);
    }
  },

  stop: async () => {
    try {
      return await connection.destroy();
    } catch (error) {
      winston.error(error);
    }
  },
};
