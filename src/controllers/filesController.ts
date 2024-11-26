import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import minioClient from "../lib/minioClient";
import multer from "multer";
import { logger } from "../infrastructure/logger";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const upload = multer();

export const filesController = {
  uploadFile: async (req: Request, res: Response) => {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        logger.error("Error during file upload:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }

      try {
        const file = req.file;
        if (!file) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: ReasonPhrases.BAD_REQUEST,
            status: StatusCodes.BAD_REQUEST,
          });
        }

        const bucketName = "studio-images";
        const objectName = `${uuidv4()}-${file.originalname}`;
        const buffer = file.buffer;

        await minioClient.putObject(bucketName, objectName, buffer, file.size);

        const url = `http://${
          process.env.MINIO_ENDPOINT || "localhost"
        }:9000/${bucketName}/${objectName}`;
        return res.status(StatusCodes.OK).json({ url });
      } catch (error) {
        logger.error("Error uploading file:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    });
  },
};
