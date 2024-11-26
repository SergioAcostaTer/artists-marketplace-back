import cors from "cors";
import { StatusCodes } from "http-status-codes";

export const corsMiddleware = cors({
  origin: ["http://localhost:3000", "https://studiohub.es", "http//localhost:8000", "http://192.168.1.133:8000"],
  // origin: "*",
  optionsSuccessStatus: StatusCodes.OK,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Specify the headers you need
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify the methods you need
});
