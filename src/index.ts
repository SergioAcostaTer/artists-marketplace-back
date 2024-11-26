import express, { Express } from "express";
import { join } from "path";
import "dotenv/config";

import {
  corsMiddleware,
  notFoundMiddleware,
  authMiddleware,
} from "./middlewares";
import { router } from "./routes";
import { mongoose } from "./dataSources";
import cookieParser from "cookie-parser";
import { logger } from "./infrastructure/logger";

require("dotenv").config();

mongoose.run();

const app: Express = express();

// Static files
app.use(
  join("/", process.env.STORAGE_PATH || ""),
  express.static(join(__dirname, process.env.STORAGE_PATH || ""))
);

// File size limit
app.use(
  express.json({ limit: "10mb" }),
  express.urlencoded({ limit: "10mb", extended: true })
);

// CORS middleware should be applied before others
app.use(corsMiddleware);

// Other middlewares
app.use(cookieParser());
app.use(authMiddleware);

// Routes
process.env.NODE_ENV === "development"
  ? app.use("/api", router)
  : app.use("/", router);

// Not found middleware
app.use(notFoundMiddleware);

// Start server
app.listen(process.env.APP_PORT, () => {
  logger.log({
    level: "info",
    message: `Server is running on ${process.env.APP_URL}`,
  });
});
